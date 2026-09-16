// ============================================================
//  CCAO-F PREP PORTAL — main.js
//  Parses all 10 exam markdown files, renders interactive
//  exam player, knowledge base, dashboard & score tracker.
// ============================================================

// ---------- META ----------
const EXAMS_META = [
  { id:1,  name:'Practice Exam 1',  theme:'Standard Balanced — All Domains',                         diff:'Medium'    },
  { id:2,  name:'Practice Exam 2',  theme:'General Coverage, Fresh Scenarios',                        diff:'Medium'    },
  { id:3,  name:'Practice Exam 3',  theme:'Governance & Ethics Heavy',                                diff:'Medium'    },
  { id:4,  name:'Practice Exam 4',  theme:'Prompting Techniques & Output Quality',                    diff:'Medium'    },
  { id:5,  name:'Practice Exam 5',  theme:'Workflow Integration & Solution Design',                   diff:'Medium'    },
  { id:6,  name:'Practice Exam 6',  theme:'Configuration, Knowledge Mgmt & Model Selection',          diff:'Medium'    },
  { id:7,  name:'Practice Exam 7',  theme:'Troubleshooting & Optimization — Harder',                 diff:'Hard'      },
  { id:8,  name:'Practice Exam 8',  theme:'Enterprise Scenarios (Healthcare, Finance, Legal)',         diff:'Hard'      },
  { id:9,  name:'Practice Exam 9',  theme:'Mixed Difficulty — Easy / Medium / Hard Labeled',          diff:'Mixed'     },
  { id:10, name:'Practice Exam 10', theme:'🔥 Final Mock — Hardest, Score Interpretation',           diff:'Expert'    },
];

const DOMAINS = [
  'Output Evaluation & Validation',
  'Workflow Integration & Solution Design',
  'Governance, Risk & Responsible Use',
  'Prompting & Task Execution',
  'Product & Model Selection',
  'Configuration & Knowledge Management',
  'Troubleshooting & Optimization',
];

const DOMAIN_WEIGHTS = [21,16,15,14,12,12,10];
const DOMAIN_COLORS = ['#6384ff','#a78bfa','#34d399','#fbbf24','#f87171','#60a5fa','#fb923c'];

// ---------- STATE ----------
let state = {
  page: 'dashboard',
  examId: null,
  questions: [],
  current: 0,
  answers: {},
  flagged: new Set(),
  timeLeft: 7200,
  timerInterval: null,
  examSubmitted: false,
  reviewMode: false,
  examStartTime: null,
};

// ---------- SCORES ----------
const getScores = () => { try { return JSON.parse(localStorage.getItem('ccaof_v2') || '{}'); } catch { return {}; } };
const saveScore = (id, data) => { const s = getScores(); s[id] = data; localStorage.setItem('ccaof_v2', JSON.stringify(s)); };
const clearAllScores = () => { localStorage.removeItem('ccaof_v2'); };

// ============================================================
//  MARKDOWN EXAM PARSER
//  Parses our specific markdown format into structured Q objects
// ============================================================
// Helper to equalize distractor lengths so longest option isn't obvious
function equalizeOptionText(text, targetLen, domain) {
  text = text.trim();
  if (text.length >= targetLen * 0.8) return text;

  const expansions = {
    'Output Evaluation': [
      ' strictly adhering to quality assurance thresholds and compliance guidelines.',
      ' based on historical benchmark datasets and automated validation rules.',
      ' to verify that hallucination rates remain below critical enterprise limits.',
      ' while maintaining standardized documentation for audit log tracking.'
    ],
    'Workflow Integration': [
      ' integrated through standard asynchronous middleware with fallback mechanisms.',
      ' ensuring seamless interoperability across legacy enterprise system pipelines.',
      ' maintaining strict separation of concerns between UI components and LLM services.',
      ' optimizing throughput metrics while keeping infrastructure overhead low.'
    ],
    'Governance': [
      ' in strict compliance with corporate data governance and privacy policies.',
      ' ensuring zero retention of sensitive customer information across system logs.',
      ' maintaining explicit human oversight protocols for high-stakes decisions.',
      ' validated against enterprise risk assessment frameworks before deployment.'
    ],
    'Prompting': [
      ' using structured XML tags to clearly isolate context from task directives.',
      ' ensuring explicit constraints are defined for edge case handling.',
      ' incorporating zero-shot formatting guidelines to guide the model response.',
      ' leveraging system prompt instructions for persistent role enforcement.'
    ],
    'Model Selection': [
      ' evaluating latency, token cost, and contextual reasoning tradeoffs.',
      ' ensuring appropriate resource allocation based on task complexity metrics.',
      ' matching throughput capacity with peak enterprise user traffic requirements.',
      ' selecting the model variant optimized specifically for structured data outputs.'
    ],
    'Configuration': [
      ' specifying parameters explicitly in the API request configuration body.',
      ' aligning context window management with vector search retrieval limits.',
      ' enforcing strict temperature controls to ensure deterministic execution.',
      ' managing version control and document chunking parameters across team projects.'
    ],
    'Troubleshooting': [
      ' applying exponential backoff retry strategies to handle transient API limits.',
      ' analyzing root cause logs to distinguish between prompt ambiguity and model limits.',
      ' refining system prompt constraints to prevent false positive refusal triggers.',
      ' monitoring error response codes to trigger automated failover procedures.'
    ]
  };

  const domainKey = Object.keys(expansions).find(k => (domain || '').includes(k)) || 'Governance';
  const pool = expansions[domainKey];
  const addition = pool[Math.floor((text.length + domainKey.length) % pool.length)];

  if (!text.endsWith('.')) text += '.';
  return text + addition;
}

// Randomize and balance answer positions evenly (25% A, 25% B, 25% C, 25% D)
function shuffleAndBalanceQuestions(questions) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const targetLetters = ['A', 'B', 'C', 'D'];

  return questions.map((q, qIdx) => {
    if (!q.options || q.options.length === 0) return q;

    const parsed = q.options.map(opt => {
      const match = opt.match(/^([A-E])[\.\)]\s*(.+)/);
      if (match) {
        const l = match[1];
        const t = match[2].trim();
        const isAns = q.answer.includes(l);
        return { text: t, isAns };
      }
      return { text: opt.replace(/^[A-E][\.\)]\s*/, ''), isAns: false };
    });

    // Equalize option lengths for this question
    const maxLen = Math.max(...parsed.map(o => o.text.length));
    parsed.forEach(o => {
      if (o.text.length < maxLen * 0.8) {
        o.text = equalizeOptionText(o.text, maxLen, q.domain);
      }
    });

    const isSingle = q.type === 'single' && q.answer.length === 1 && parsed.length >= 4;
    let finalOptsList = [];
    let finalAnsLetters = [];

    if (isSingle) {
      // Deterministic uniform rotation: 0=A, 1=B, 2=C, 3=D across all questions
      const targetPos = qIdx % 4;
      const targetLetter = targetLetters[targetPos];
      const targetIdx = targetPos;

      const correctOpt = parsed.find(o => o.isAns) || parsed[0];
      const incorrectOpts = parsed.filter(o => o !== correctOpt);

      finalOptsList = new Array(4);
      finalOptsList[targetIdx] = correctOpt;

      let incCount = 0;
      for (let k = 0; k < 4; k++) {
        if (k !== targetIdx) {
          finalOptsList[k] = incorrectOpts[incCount++] || { text: 'N/A', isAns: false };
        }
      }

      if (parsed.length > 4) {
        finalOptsList.push(...incorrectOpts.slice(incCount));
      }
      finalAnsLetters = [targetLetter];
    } else {
      // Multi-select or non-standard options: shuffle randomly
      const shuffled = [...parsed];
      for (let k = shuffled.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [shuffled[k], shuffled[j]] = [shuffled[j], shuffled[k]];
      }
      shuffled.forEach((item, kIdx) => {
        const l = letters[kIdx];
        if (item.isAns) finalAnsLetters.push(l);
      });
      finalOptsList = shuffled;
    }

    const finalOptions = finalOptsList.map((item, kIdx) => `${letters[kIdx]}) ${item.text}`);

    return {
      ...q,
      options: finalOptions,
      answer: finalAnsLetters
    };
  });
}

function parseExamMd(md) {
  const lines = md.split('\n');
  const answerKeyStart = lines.findIndex(l => /^---\s*$/.test(l.trim()) || /^##\s*Answer/i.test(l.trim()) || /^#\s*Answer/i.test(l.trim()));
  const answerMap = {};
  const explanationMap = {};

  if (answerKeyStart > -1) {
    const keyLines = lines.slice(answerKeyStart);
    let curQ = null, expLines = [];
    for (let l of keyLines) {
      const line = l.trim();
      const m = line.match(/^(\d+)[\.\)]\s*(?:\*\*)?([A-E,\s]+)(?:\*\*)?/i) ||
                line.match(/^(?:\*\*)?Q?(\d+)[\.\:\)]?\s*(?:\(.*?\)\:?)?\s*([A-E,\s]+)(?:\*\*)?[\.\:]?/i) ||
                line.match(/^\*\*Q?(\d+)[\.\:]?\s*([A-E,\s]+)[\.\:]?\*\*/i);
      if (m && !line.startsWith('##') && !line.startsWith('---') && !line.startsWith('#')) {
        if (curQ !== null && expLines.length) explanationMap[curQ] = expLines.join(' ').trim();
        curQ = parseInt(m[1]);
        answerMap[curQ] = m[2].replace(/\s+/g,'').split(',').map(x=>x.trim().toUpperCase()).filter(Boolean);
        expLines = [];
      } else if (curQ !== null && line.startsWith('Explanation:')) {
        expLines.push(line.replace(/^Explanation:\s*/,''));
      } else if (curQ !== null && line && !line.startsWith('**') && !line.startsWith('#') && !line.startsWith('---')) {
        expLines.push(line);
      }
    }
    if (curQ !== null && expLines.length) explanationMap[curQ] = expLines.join(' ').trim();
  }

  const bodyLines = answerKeyStart > -1 ? lines.slice(0, answerKeyStart) : lines;
  const questions = [];
  let i = 0, curDomain = 'General Domain';

  while (i < bodyLines.length) {
    const line = bodyLines[i].trim();
    if (line.startsWith('*(Domain:') || /^###?\s*Domain/i.test(line) || /^##\s*Questions/i.test(line)) {
      const dMatch = line.match(/\*\(Domain:\s*(.+?)\)\*/i) || line.match(/^###?\s*(?:Domain\s*\d+:?\s*)?(.+)/i);
      if (dMatch) curDomain = dMatch[1].replace(/\(Q\d+.*?\)/i,'').replace(/\(\d+%\)/,'').trim();
      i++; continue;
    }

    const qMatch = line.match(/^(?:\*\*)?Q?(\d+)[\.\)]?\s*(?:\((.*?)\)\:?)?\s*(?:\(Select\s+(?:ONE|TWO|THREE)\)\s*)?(?:\*\*)?\s*(?:\*(.*?)\*)?\s*(?:\((?:Easy|Medium|Hard)\)\s*)?(.*)/i);
    if (qMatch && !line.startsWith('---') && !line.startsWith('#') && !line.startsWith('*Note')) {
      const qNum = parseInt(qMatch[1]);
      let qText = (qMatch[4] || qMatch[2] || '').trim();
      let inlineDomain = (qMatch[3] || (qMatch[2] && qMatch[2].includes('Domain') ? qMatch[2] : '')).trim();
      if (inlineDomain) curDomain = inlineDomain;

      i++;
      if (!qText && i < bodyLines.length) {
        qText = bodyLines[i].trim();
        i++;
      }

      let type = /select\s+two/i.test(line) ? 'multi2' : /select\s+three/i.test(line) ? 'multi3' : 'single';
      if (/select\s+two/i.test(qText)) type = 'multi2';
      if (/select\s+three/i.test(qText)) type = 'multi3';

      qText = qText.replace(/^\(Select\s+(ONE|TWO|THREE)\)\s*/i,'').replace(/\(Select\s+(ONE|TWO|THREE)\)\s*$/i,'').replace(/^\*\*/,'').replace(/\*\*$/,'').trim();

      const options = [];
      while (i < bodyLines.length) {
        const ol = bodyLines[i].trim();
        if (/^[A-E][\.\)]/.test(ol)) {
          options.push(ol);
          i++;
        } else if (!ol || ol.startsWith('*(Domain:') || /^###?\s*Domain/i.test(ol) || /^(?:\*\*)?(\d+)[\.\)]/.test(ol) || /^(?:\*\*)?Q\d+/.test(ol)) {
          break;
        } else {
          if (options.length > 0) options[options.length - 1] += ' ' + ol;
          i++;
        }
      }

      if (options.length >= 4) {
        const domainFull = DOMAINS.find(d => d.toLowerCase().includes(curDomain.toLowerCase().split('&')[0].trim().toLowerCase().substring(0, 8))) || curDomain;
        questions.push({ num: qNum, q: qText, type, domain: domainFull, options, answer: answerMap[qNum] || [], explanation: explanationMap[qNum] || '' });
      }
      continue;
    }
    i++;
  }

  questions.sort((a,b) => a.num - b.num);
  return shuffleAndBalanceQuestions(questions);
}

const examCache = {};
async function fetchExam(id) {
  if (examCache[id]) return examCache[id];
  const padded = String(id).padStart(2, '0');
  const res = await fetch(`/exams/exam_${padded}.md`);
  if (!res.ok) throw new Error(`Cannot load exam ${id}`);
  const md = await res.text();
  const questions = parseExamMd(md);
  examCache[id] = questions;
  return questions;
}

const kbCache = {};
async function fetchKBSection(filename) {
  if (kbCache[filename]) return kbCache[filename];
  const res = await fetch(`/exams/${filename}`);
  if (!res.ok) throw new Error(`Cannot load ${filename}`);
  kbCache[filename] = await res.text();
  return kbCache[filename];
}

// ============================================================
//  ROUTER / PAGE MANAGER
// ============================================================
function showPage(name) {
  state.page = name;
  document.querySelectorAll('.nav-link').forEach(b => {
    b.classList.toggle('active', b.dataset.page === name);
  });
  renderPage();
}

function renderPage() {
  const app = document.getElementById('app');
  switch(state.page) {
    case 'dashboard': renderDashboard(app); break;
    case 'exams':     renderExamsPage(app); break;
    case 'player':    renderPlayerPage(app); break;
    case 'results':   renderResultsPage(app); break;
    case 'knowledge': renderKnowledgePage(app); break;
    case 'scores':    renderScoresPage(app); break;
  }
}

// ============================================================
//  DASHBOARD
// ============================================================
function renderDashboard(app) {
  const scores = getScores();
  const taken = Object.keys(scores).length;
  const allScaled = Object.values(scores).map(s => s.scaled);
  const best = allScaled.length ? Math.max(...allScaled) : null;
  const avg = allScaled.length ? Math.round(allScaled.reduce((a,b)=>a+b,0)/allScaled.length) : null;
  const passes = allScaled.filter(s => s >= 720).length;

  app.innerHTML = `
  <div class="page active" id="page-dashboard">
    <div class="hero">
      <div class="hero-title">Claude Certified<br/><span>Associate – Foundations</span></div>
      <p class="hero-sub">Official Enterprise Master Prep Portal for the CCAO-F Certification Exam. Master practical prompting, AI governance, solution design, model selection, and troubleshooting with 10 full-length practice exams and deep-dive domain study guides.</p>
      
      <div class="badge-row">
        <span class="badge g">✅ 60 Scenario Questions</span>
        <span class="badge b">⏱ 120 Min Duration</span>
        <span class="badge p">🎯 720/1,000 Passing Score</span>
        <span class="badge o">🌐 Pearson VUE Proctored</span>
        <span class="badge g">💳 $99 USD Exam Fee</span>
        <span class="badge b">📅 12-Month Certification</span>
      </div>

      <!-- Quick Metrics Tracker -->
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">📝</div><div class="stat-value">${taken} / 10</div><div class="stat-label">Exams Attempted</div></div>
        <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-value">${best ?? '—'}</div><div class="stat-label">Best Scaled Score</div></div>
        <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-value">${avg ?? '—'}</div><div class="stat-label">Average Score</div></div>
        <div class="stat-card"><div class="stat-icon">🏆</div><div class="stat-value">${passes}</div><div class="stat-label">Exams Passed (720+)</div></div>
        <div class="stat-card"><div class="stat-icon">❓</div><div class="stat-value">600</div><div class="stat-label">Balanced Questions</div></div>
      </div>

      <!-- About Certification Section -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-title">📖 About the CCAO-F Certification</div>
        <div style="font-size:14px;line-height:1.75;color:var(--text2);display:flex;flex-direction:column;gap:14px">
          <p>The <strong>Claude Certified Associate – Foundations (CCAO-F)</strong> is Anthropic's flagship industry credential validating professional expertise in engineering solutions, evaluating outputs, enforcing enterprise governance, and managing production workflows powered by the <strong>Claude 3 and 3.5 model family</strong> (Haiku, Sonnet, Opus).</p>
          <p>Unlike pure recall exams, CCAO-F assesses <strong>practical decision-making in realistic business scenarios</strong>. Candidates are tested on selecting optimal model tiers, structuring robust prompts, safeguarding corporate PII/PHI data, designing Retrieval-Augmented Generation (RAG) architectures, and establishing Human-in-the-Loop (HITL) quality gates.</p>
        </div>
      </div>

      <!-- Target Roles & Competency Grid -->
      <div class="two-col" style="margin-bottom: 24px;">
        <div class="card">
          <div class="card-title">🎯 Target Audience & Roles</div>
          <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;line-height:1.6;color:var(--text2)">
            <div><strong style="color:var(--accent)">✍️ Prompt Engineers & AI Practitioners</strong><br/>Crafting system prompts, Chain-of-Thought directives, XML delimiters, and few-shot formatting templates.</div>
            <div><strong style="color:var(--accent2)">💼 Solutions Architects & PMs</strong><br/>Designing enterprise AI workflows, selecting model tiers (Haiku vs. Sonnet vs. Opus), and calculating ROI.</div>
            <div><strong style="color:var(--accent3)">🛡️ Governance & Compliance Officers</strong><br/>Enforcing Constitutional AI, HIPAA BAA compliance, GDPR data privacy, and Zero Data Retention policies.</div>
            <div><strong style="color:var(--warning)">💻 Developers & Integration Engineers</strong><br/>Interfacing with Anthropic API, implementing tool use/function calling, RAG pipelines, and error retries.</div>
            <div><strong style="color:var(--danger)">📊 Business Analysts & QA Leads</strong><br/>Building evaluation rubrics, auditing LLM-as-a-judge outputs, and setting up HITL verification tiers.</div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">💡 5 Golden Exam Rules (Memorise These!)</div>
          <div style="display:flex;flex-direction:column;gap:13px;font-size:13px;line-height:1.6;color:var(--text2)">
            <div><strong style="color:var(--accent)">Rule 1 — Human Accountability Principle</strong><br/>Claude assists; humans decide. High-stakes legal, medical, and financial outputs <strong>ALWAYS require mandatory human expert review</strong>.</div>
            <div><strong style="color:var(--accent2)">Rule 2 — Model Tier Selection Matrix</strong><br/>🚀 <strong>Haiku</strong> = Speed & Scale &nbsp;|&nbsp; ⚖️ <strong>Sonnet</strong> = Balanced Enterprise Workhorse &nbsp;|&nbsp; 🧠 <strong>Opus</strong> = Deep Multi-Step Reasoning</div>
            <div><strong style="color:var(--accent3)">Rule 3 — Governance & Privacy Priority</strong><br/>Regulated data (PHI/HIPAA) requires <strong>Enterprise Tier + signed BAA</strong>. Free/Pro tiers are never compliant for protected data.</div>
            <div><strong style="color:var(--warning)">Rule 4 — Standard Prompt Architecture</strong><br/><code style="font-family:var(--mono);font-size:11px">Role + Context + Task + Constraints + Format + XML Tags</code></div>
            <div><strong style="color:var(--danger)">Rule 5 — Hallucination Mitigation</strong><br/>Primary defense is <strong>Grounding</strong>: provide source text in <code>&lt;context&gt;</code> and instruct Claude to cite verbatim.</div>
          </div>
        </div>
      </div>

      <!-- Domain Weights & Study Spec -->
      <div class="two-col" style="margin-bottom: 28px;">
        <div class="card">
          <div class="card-title">📊 7-Domain Exam Specification</div>
          <div class="domain-bars">
            ${DOMAINS.map((d,i) => `
              <div class="domain-item">
                <div class="domain-item-header">
                  <span class="domain-name">${d}</span>
                  <span class="domain-pct">${DOMAIN_WEIGHTS[i]}%</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width:${DOMAIN_WEIGHTS[i]*4}%;background:linear-gradient(90deg,${DOMAIN_COLORS[i]},${DOMAIN_COLORS[(i+1)%DOMAIN_COLORS.length]})"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-title">🗺️ Recommended Study Roadmap</div>
          <div style="display:flex;flex-direction:column;gap:14px;font-size:13px;line-height:1.6;color:var(--text2)">
            <div><strong style="color:var(--accent)">Step 1 — Read the Knowledge Base (35,000+ words)</strong><br/>Explore the <strong>📚 Knowledge Base</strong> tab in the navigation bar to read comprehensive study notes across all 7 domains.</div>
            <div><strong style="color:var(--accent2)">Step 2 — Memorise the Master Cheat Sheet</strong><br/>Study model selection tables, API parameters (<code>temperature</code>, <code>max_tokens</code>), and governance compliance tiers.</div>
            <div><strong style="color:var(--accent3)">Step 3 — Take all 10 Simulated Practice Exams</strong><br/>Navigate to <strong>📝 Practice Exams</strong> to complete 600 scenario-based questions with length-equalized options and randomized answer keys.</div>
            <div><strong style="color:var(--warning)">Step 4 — Review Explanations & Track Progress</strong><br/>Check your domain mastery Breakdown on the <strong>🏆 My Scores</strong> tab to target weak areas before exam day.</div>
          </div>
        </div>
      </div>

      <!-- Practice Exams Launchpad -->
      <div class="section-title" style="display:flex;align-items:center;justify-content:space-between">
        <span>📝 Practice Examinations Launchpad</span>
        <button class="btn btn-outline" style="font-size:12px;padding:6px 14px" onclick="showPage('exams')">View All 10 Exams →</button>
      </div>
      
      <div class="exam-grid">
        ${EXAMS_META.map(e => examCard(e, scores[e.id])).join('')}
      </div>
    </div>
  </div>`;
}

// ============================================================
//  EXAMS PAGE
// ============================================================
function renderExamsPage(app) {
  const scores = getScores();
  app.innerHTML = `
  <div class="page active">
    <div style="max-width:1100px;margin:0 auto;padding:40px 24px;">
      <div class="section-title">All 10 Practice Examinations</div>
      <div class="exam-grid">
        ${EXAMS_META.map(e => examCard(e, scores[e.id])).join('')}
      </div>
    </div>
  </div>`;
}

function examCard(meta, saved) {
  const hasSaved = saved !== undefined;
  const diffClass = { 'Hard':'hard','Expert':'expert','Mixed':'mixed','Medium':'medium','Medium-Hard':'hard' }[meta.diff] || 'easy';
  return `
  <div class="exam-card ${hasSaved?'done':''}" onclick="startExam(${meta.id})">
    ${hasSaved ? `<div class="exam-saved-score">${saved.scaled}/1000</div>` : ''}
    <div class="exam-num-label">Exam ${meta.id} of 10</div>
    <div class="exam-card-title">${meta.name}</div>
    <div class="exam-card-theme">${meta.theme}</div>
    <div class="exam-card-meta">
      <span class="tag">60 Questions</span>
      <span class="tag">120 min</span>
      <span class="tag ${diffClass}">${meta.diff}</span>
      ${hasSaved ? `<span class="tag ${saved.passed?'easy':'hard'}">${saved.passed?'✅ Passed':'❌ Failed'}</span>` : ''}
    </div>
    <button class="start-btn">${hasSaved ? '🔄 Retake' : '▶ Start Exam'}</button>
  </div>`;
}

// ============================================================
//  START EXAM
// ============================================================
window.startExam = async function(id) {
  showLoading(true);
  try {
    const questions = await fetchExam(id);
    if (!questions.length) { showToast('Could not parse exam questions. Check file.', 'err'); showLoading(false); return; }

    state.examId = id;
    state.questions = questions;
    state.current = 0;
    state.answers = {};
    state.flagged = new Set();
    state.timeLeft = 7200;
    state.examSubmitted = false;
    state.reviewMode = false;
    state.examStartTime = Date.now();

    showLoading(false);
    state.page = 'player';
    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    renderPage();
    startTimer();
  } catch(e) {
    showLoading(false);
    showToast('Error loading exam: ' + e.message, 'err');
  }
};

// ============================================================
//  PLAYER PAGE
// ============================================================
function renderPlayerPage(app) {
  const meta = EXAMS_META[state.examId - 1];
  app.innerHTML = `
  <div class="page active" id="page-player">
    <div class="player-header">
      <div class="player-header-inner">
        <div>
          <div class="player-title-sm">${meta.name}</div>
          <div class="player-sub" id="player-sub">Question 1 of ${state.questions.length}</div>
        </div>
        <div class="timer-wrap">
          <div class="timer" id="timer">02:00:00</div>
          <button class="btn btn-outline" style="font-size:12px;padding:7px 12px" onclick="confirmSubmit()">Submit</button>
          <button class="btn btn-ghost" style="font-size:12px;padding:7px 12px" onclick="confirmExit()">✕ Exit</button>
        </div>
      </div>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" id="pb" style="width:0%"></div>
    </div>
    <div class="player-body" id="player-body">
      <div class="q-nav" id="q-nav"></div>
      <div id="q-card-wrap"></div>
      <div class="q-actions">
        <button class="btn btn-ghost" id="flag-btn" onclick="toggleFlag()">🚩 Flag for Review</button>
        <div class="btn-group">
          <button class="btn btn-outline" id="prev-btn" onclick="prevQ()" disabled>← Prev</button>
          <button class="btn btn-primary" id="next-btn" onclick="nextQ()">Next →</button>
        </div>
      </div>
    </div>
  </div>`;

  renderQNav();
  renderQuestion();
}

function renderQNav() {
  const nav = document.getElementById('q-nav');
  if (!nav) return;
  nav.innerHTML = state.questions.map((_,i) => {
    let cls = 'q-dot';
    if (i === state.current) cls += ' current';
    else if (state.reviewMode) cls += isCorrect(i) ? ' correct' : ' incorrect';
    else if (state.flagged.has(i)) cls += ' flagged';
    else if (state.answers[i]) cls += ' answered';
    return `<div class="${cls}" onclick="jumpTo(${i})">${i+1}</div>`;
  }).join('');

  const answered = Object.keys(state.answers).length;
  const pb = document.getElementById('pb');
  if (pb) pb.style.width = `${(answered / state.questions.length) * 100}%`;

  const sub = document.getElementById('player-sub');
  if (sub) sub.textContent = `Question ${state.current+1} of ${state.questions.length} · ${answered} answered`;
}

function renderQuestion() {
  const wrap = document.getElementById('q-card-wrap');
  if (!wrap) return;
  const q = state.questions[state.current];
  if (!q) return;

  const selectCount = q.type === 'multi2' ? 2 : q.type === 'multi3' ? 3 : 1;
  const isMulti = selectCount > 1;
  const userAns = state.answers[state.current] || [];

  const opts = q.options.map(opt => {
    const letter = opt[0];
    const text = opt.slice(2).trim(); // remove "A) "
    const selected = userAns.includes(letter);
    let cls = 'option';
    if (selected) cls += ' selected';
    if (state.reviewMode) {
      cls += ' disabled';
      if (q.answer.includes(letter)) cls += ' reveal-correct';
      else if (selected) cls += ' reveal-wrong';
    }
    return `<div class="${cls}" ${state.reviewMode ? '' : `onclick="selectOpt('${letter}')"`}>
      <div class="opt-key">${letter}</div>
      <div>${text}</div>
    </div>`;
  }).join('');

  let explain = '';
  if (state.reviewMode && q.explanation) {
    const ok = isCorrect(state.current);
    explain = `<div class="explain-box ${ok?'ok':'bad'}">
      <strong>${ok ? '✅ Correct!' : `❌ Incorrect — Correct Answer: ${q.answer.join(', ')}`}</strong>
      ${q.explanation}
    </div>`;
  }

  wrap.innerHTML = `
  <div class="q-card">
    <div class="q-meta">
      <span class="q-num-label">Q${q.num}</span>
      <span class="domain-chip">${q.domain}</span>
      <span class="type-chip">${isMulti ? `Select ${selectCount}` : 'Select ONE'}</span>
    </div>
    <div class="q-text">${q.q}</div>
    <div class="options">${opts}</div>
    ${explain}
  </div>`;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const flagBtn = document.getElementById('flag-btn');
  if (prevBtn) prevBtn.disabled = state.current === 0;
  if (nextBtn) nextBtn.textContent = state.current === state.questions.length - 1 ? 'Finish →' : 'Next →';
  if (flagBtn) flagBtn.textContent = state.flagged.has(state.current) ? '🏳 Unflag' : '🚩 Flag for Review';

  renderQNav();
}

window.selectOpt = function(letter) {
  const q = state.questions[state.current];
  const selectCount = q.type === 'multi2' ? 2 : q.type === 'multi3' ? 3 : 1;
  if (!state.answers[state.current]) state.answers[state.current] = [];
  const arr = state.answers[state.current];
  const idx = arr.indexOf(letter);
  if (idx > -1) {
    arr.splice(idx, 1);
  } else {
    if (selectCount === 1) state.answers[state.current] = [letter];
    else if (arr.length < selectCount) arr.push(letter);
    else { showToast(`Select only ${selectCount} options for this question`, 'err'); return; }
  }
  renderQuestion();
};

window.jumpTo = function(i) { state.current = i; renderQuestion(); };
window.prevQ = function() { if (state.current > 0) { state.current--; renderQuestion(); } };
window.nextQ = function() {
  if (state.current < state.questions.length - 1) { state.current++; renderQuestion(); }
  else confirmSubmit();
};
window.toggleFlag = function() {
  if (state.flagged.has(state.current)) state.flagged.delete(state.current);
  else state.flagged.add(state.current);
  renderQuestion();
};

function isCorrect(i) {
  const q = state.questions[i];
  const u = state.answers[i];
  if (!u || !u.length) return false;
  return [...q.answer].sort().join() === [...u].sort().join();
}

// ============================================================
//  TIMER
// ============================================================
function startTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimer();
    if (state.timeLeft <= 0) { clearInterval(state.timerInterval); doSubmit(); }
  }, 1000);
  updateTimer();
}

function updateTimer() {
  const el = document.getElementById('timer');
  if (!el) return;
  const h = Math.floor(state.timeLeft / 3600);
  const m = Math.floor((state.timeLeft % 3600) / 60);
  const s = state.timeLeft % 60;
  el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  el.className = 'timer';
  if (state.timeLeft < 600) el.classList.add('danger');
  else if (state.timeLeft < 1800) el.classList.add('warn');
}
const pad = n => String(n).padStart(2,'0');

// ============================================================
//  SUBMIT
// ============================================================
window.confirmSubmit = function() {
  const answered = Object.keys(state.answers).length;
  const total = state.questions.length;
  const unanswered = total - answered;
  openModal(
    'Submit Exam?',
    unanswered > 0
      ? `You have ${unanswered} unanswered question(s). Unanswered questions will be scored as incorrect. Submit now?`
      : 'Are you ready to submit your exam and see your results?',
    doSubmit
  );
};

window.confirmExit = function() {
  openModal('Exit Exam?', 'Your progress will NOT be saved. Are you sure?', () => {
    clearInterval(state.timerInterval);
    showPage('exams');
  });
};

function doSubmit() {
  if (state.examSubmitted) return;
  state.examSubmitted = true;
  clearInterval(state.timerInterval);

  const total = state.questions.length;
  let correct = 0;
  const domStats = {};
  DOMAINS.forEach(d => { domStats[d] = { c:0, t:0 }; });

  state.questions.forEach((q,i) => {
    const d = q.domain;
    const matched = DOMAINS.find(dom => dom.toLowerCase().includes(d.toLowerCase().substring(0,8))) || d;
    if (!domStats[matched]) domStats[matched] = { c:0, t:0 };
    domStats[matched].t++;
    if (isCorrect(i)) { correct++; domStats[matched].c++; }
  });

  const scaled = Math.round((correct / total) * 1000);
  const passed = scaled >= 720;
  const timeUsed = 7200 - state.timeLeft;
  const timeStr = `${Math.floor(timeUsed/60)}m ${timeUsed%60}s`;

  saveScore(state.examId, {
    raw: correct, total, scaled, passed,
    date: new Date().toLocaleDateString('en-IN'),
    timeUsed: timeStr,
    theme: EXAMS_META[state.examId-1].theme,
    domStats,
  });

  state.page = 'results';
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  renderResultsPage(document.getElementById('app'), { correct, total, scaled, passed, timeStr, domStats });
}

// ============================================================
//  RESULTS PAGE
// ============================================================
function renderResultsPage(app, data) {
  if (!data) {
    // Reload from saved scores
    const saved = getScores()[state.examId];
    if (!saved) { showPage('exams'); return; }
    data = { correct: saved.raw, total: saved.total, scaled: saved.scaled, passed: saved.passed, timeStr: saved.timeUsed, domStats: saved.domStats || {} };
  }
  const { correct, total, scaled, passed, timeStr, domStats } = data;
  const pct = Math.round((correct/total)*100);

  // SVG ring
  const r = 52, circ = 2 * Math.PI * r;
  const dashOffset = circ - (circ * scaled / 1000);

  const domRows = DOMAINS.map((d,i) => {
    const st = domStats[d] || {c:0,t:0};
    const dpct = st.t ? Math.round((st.c/st.t)*100) : 0;
    const col = dpct>=70?'var(--accent3)':dpct>=50?'var(--warning)':'var(--danger)';
    return `
    <div class="dr-row">
      <div class="dr-name">${d}</div>
      <div class="dr-fraction">${st.c}/${st.t}</div>
      <div class="dr-bar"><div class="dr-bar-fill" style="width:${dpct}%;background:${col}"></div></div>
      <div class="dr-pct" style="color:${col}">${dpct}%</div>
    </div>`;
  }).join('');

  const meta = EXAMS_META[state.examId - 1];

  app.innerHTML = `
  <div class="page active">
    <div class="results-wrap">
      <div class="results-hero">
        <div class="score-ring">
          <svg viewBox="0 0 120 120">
            <circle class="score-ring-bg" cx="60" cy="60" r="${r}"/>
            <circle class="score-ring-fill" cx="60" cy="60" r="${r}"
              stroke="url(#rg)" stroke-dasharray="${circ}" stroke-dashoffset="${dashOffset}"/>
            <defs>
              <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#6384ff"/>
                <stop offset="100%" style="stop-color:#a78bfa"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="score-ring-text">
            <div class="score-ring-num">${scaled}</div>
            <div class="score-ring-denom">/1000</div>
          </div>
        </div>
        <div class="result-title">${meta.name}</div>
        <div class="result-sub">You answered <strong>${correct} of ${total}</strong> correctly (${pct}%) · Time used: ${timeStr}</div>
        <div><span class="pass-pill ${passed?'pass':'fail'}">${passed ? '🎉 PASSED — Score ≥ 720' : '📚 Not Passed — Score < 720'}</span></div>
        <div class="result-actions">
          <button class="btn btn-primary" onclick="reviewMode()">🔍 Review Answers</button>
          <button class="btn btn-outline" onclick="showPage('exams')">📝 Take Another Exam</button>
          <button class="btn btn-outline" onclick="showPage('scores')">🏆 All Scores</button>
        </div>
      </div>

      <div class="section-title">Performance by Domain</div>
      <div class="domain-results">${domRows}</div>

      ${scaled < 720 ? `
      <div class="card" style="border-color:rgba(251,191,36,0.2);background:rgba(251,191,36,0.04);">
        <div class="card-title" style="color:var(--warning)">📖 Study Recommendations</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.7">
          ${DOMAINS.filter((_,i)=>{const st=domStats[_]||{c:0,t:0};return st.t&&(st.c/st.t)<0.6;}).map(d=>`<div>• Re-read the <strong style="color:var(--text)">${d}</strong> section in the Knowledge Base and retake a domain-focused exam.</div>`).join('') || '<div>Keep practicing — you\'re getting close!</div>'}
        </div>
      </div>` : `
      <div class="card" style="border-color:rgba(52,211,153,0.2);background:rgba(52,211,153,0.04);">
        <div class="card-title" style="color:var(--accent3)">🎉 You're Exam Ready!</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.7">Your score of <strong>${scaled}/1000</strong> is above the passing threshold. Practice a few more exams to build confidence, then schedule your real exam through <strong>Pearson VUE</strong>.</div>
      </div>`}
    </div>
  </div>`;
}

window.reviewMode = function() {
  state.reviewMode = true;
  state.current = 0;
  state.page = 'player';
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  renderPage();
  // Override timer display
  const timerEl = document.getElementById('timer');
  if (timerEl) { timerEl.textContent = 'REVIEW'; timerEl.style.fontSize = '13px'; }
};

// ============================================================
//  KNOWLEDGE BASE PAGE
// ============================================================
const KB_SECTIONS = [
  { key:'overview', label:'Exam Overview',              icon:'📋', pct:'',    file: null },
  { key:'d1',       label:'D1: Output Evaluation',      icon:'🔍', pct:'21%', file:'kb_d1.md' },
  { key:'d2',       label:'D2: Workflow Integration',   icon:'⚙️', pct:'16%', file:'kb_d2.md' },
  { key:'d3',       label:'D3: Governance & Risk',      icon:'🛡️', pct:'15%', file:'kb_d3.md' },
  { key:'d4',       label:'D4: Prompting',              icon:'✍️', pct:'14%', file:'kb_d4.md' },
  { key:'d5',       label:'D5: Model Selection',        icon:'🤖', pct:'12%', file:'kb_d5.md' },
  { key:'d6',       label:'D6: Configuration',          icon:'🔧', pct:'12%', file:'kb_d6.md' },
  { key:'d7',       label:'D7: Troubleshooting',        icon:'🩺', pct:'10%', file:'kb_d7.md' },
  { key:'full',     label:'📄 Full Master Guide',       icon:'📚', pct:'',    file:'knowledge_base.md' },
  { key:'cheat',    label:'⚡ Cheat Sheet',             icon:'⚡', pct:'',    file: 'cheat.md' },
];

// KB_CONTENT: overview is inline; domain files and cheat sheet are loaded dynamically from /exams/
const KB_CONTENT = {
  overview: `
    <h2>Exam Overview</h2>
    <div class="wt">CCAO-F — Claude Certified Associate Foundations</div>
    <table class="kb-table">
      <tr><th>Feature</th><th>Details</th></tr>
      <tr><td>Format</td><td>Multiple-choice &amp; Multiple-response</td></tr>
      <tr><td>Questions</td><td><strong>60</strong></td></tr>
      <tr><td>Duration</td><td><strong>120 minutes</strong></td></tr>
      <tr><td>Passing Score</td><td><strong>720 / 1,000</strong> (Scaled Score)</td></tr>
      <tr><td>Delivery</td><td>Pearson VUE — online proctored or test centre</td></tr>
      <tr><td>Cost</td><td>~$99 USD</td></tr>
      <tr><td>Validity</td><td>12 months from pass date</td></tr>
    </table>
    <div class="kb-tip note"><span class="kb-tip-label">📌 What the exam tests</span>Judgment and practical application in realistic business scenarios. You are NOT being tested on pure recall — you must select the <strong>BEST</strong> action given specific context, constraints, and risk levels.</div>

    <h3>Domain Weight Distribution</h3>
    <table class="kb-table">
      <tr><th>#</th><th>Domain</th><th>Weight</th><th>Est. Questions</th></tr>
      <tr><td>D1</td><td>Output Evaluation &amp; Validation</td><td><strong>21%</strong></td><td>~13</td></tr>
      <tr><td>D2</td><td>Workflow Integration &amp; Solution Design</td><td><strong>16%</strong></td><td>~10</td></tr>
      <tr><td>D3</td><td>Governance, Risk &amp; Responsible Use</td><td><strong>15%</strong></td><td>~9</td></tr>
      <tr><td>D4</td><td>Prompting &amp; Task Execution</td><td><strong>14%</strong></td><td>~8</td></tr>
      <tr><td>D5</td><td>Product &amp; Model Selection</td><td><strong>12%</strong></td><td>~7</td></tr>
      <tr><td>D6</td><td>Configuration &amp; Knowledge Management</td><td><strong>12%</strong></td><td>~7</td></tr>
      <tr><td>D7</td><td>Troubleshooting &amp; Optimisation</td><td><strong>10%</strong></td><td>~6</td></tr>
    </table>

    <h3>💡 5 Golden Rules (Memorise These)</h3>
    <table class="kb-table">
      <tr><th>Rule</th><th>Principle</th><th>Exam Implication</th></tr>
      <tr><td><strong>1</strong></td><td>Humans are ALWAYS accountable</td><td>Claude assists; it never decides for high-stakes matters</td></tr>
      <tr><td><strong>2</strong></td><td>Model = Haiku (Speed) / Sonnet (Balance) / Opus (Complex)</td><td>Match model to task complexity and cost tolerance</td></tr>
      <tr><td><strong>3</strong></td><td>Governance &gt; Efficiency</td><td>When in doubt, always choose the safer, compliant option</td></tr>
      <tr><td><strong>4</strong></td><td>Best Prompt = Role + Context + Task + Constraints + Format</td><td>Missing components = lower quality outputs</td></tr>
      <tr><td><strong>5</strong></td><td>Primary hallucination defence = Grounding</td><td>Provide source text; instruct Claude to cite only it</td></tr>
    </table>

    <h3>🎓 Study Strategy</h3>
    <ul>
      <li><strong>Week 1:</strong> Read D1 (Output Evaluation) and D3 (Governance) — highest combined weight (36%)</li>
      <li><strong>Week 2:</strong> Study D4 (Prompting) and D2 (Workflow) — highly practical topics</li>
      <li><strong>Week 3:</strong> Cover D5 (Models), D6 (Config), D7 (Troubleshooting)</li>
      <li><strong>Week 4:</strong> Take all 10 practice exams, review wrong answers, revisit weak domains</li>
      <li><strong>Exam Day:</strong> When unsure, ask yourself: (a) Does this protect the human? (b) Is there human oversight? (c) Is the data handled appropriately?</li>
    </ul>
    <div class="kb-tip tip"><span class="kb-tip-label">✅ Click any domain in the sidebar</span>Each domain tab loads a comprehensive, deep-dive study chapter written specifically for this exam. Every chapter contains definitions, frameworks, tables, worked examples, exam traps, and exam tips.</div>
  `,
};


function renderKnowledgePage(app) {
  app.innerHTML = `
  <div class="page active" id="page-knowledge">
    <div class="kb-layout">
      <div class="kb-sidebar">
        <div class="kb-sidebar-label">Study Sections</div>
        ${KB_SECTIONS.map(s => `
          <div class="kb-nav-item" id="kbnav-${s.key}" onclick="showKB('${s.key}')">
            <span>${s.icon}</span><span>${s.label}</span>
            ${s.pct ? `<span class="kb-nav-pct">${s.pct}</span>` : ''}
          </div>`).join('')}
      </div>
      <div class="kb-content" id="kb-content">
        <div class="kb-section active" id="kbs-current"><div class="loading-placeholder">Loading overview...</div></div>
      </div>
    </div>
  </div>`;

  showKB('overview');
}

window.showKB = async function(key) {
  document.querySelectorAll('.kb-nav-item').forEach(el => el.classList.remove('active'));
  const ni = document.getElementById('kbnav-' + key);
  if (ni) ni.classList.add('active');

  const container = document.getElementById('kb-content');
  if (!container) return;

  // Check if already cached in DOM
  const cacheKey = 'rendered_' + key;
  if (window._kbRendered && window._kbRendered[cacheKey]) {
    container.innerHTML = window._kbRendered[cacheKey];
    return;
  }

  // Static (inline) content
  if (KB_CONTENT[key]) {
    const html = `<div class="kb-section active">${KB_CONTENT[key]}</div>`;
    container.innerHTML = html;
    if (!window._kbRendered) window._kbRendered = {};
    window._kbRendered[cacheKey] = html;
    return;
  }

  // Find the section config
  const section = KB_SECTIONS.find(s => s.key === key);
  if (section && section.file) {
    container.innerHTML = `<div class="kb-section active"><div style="color:var(--text3);font-size:13px;padding:30px;text-align:center"><div class="loading-spinner" style="margin:0 auto 12px"></div>Loading ${section.label}...</div></div>`;
    try {
      const md = await fetchKBSection(section.file);
      const html = `<div class="kb-section active"><div class="md-view">${mdToHtml(md)}</div></div>`;
      container.innerHTML = html;
      if (!window._kbRendered) window._kbRendered = {};
      window._kbRendered[cacheKey] = html;
    } catch(e) {
      container.innerHTML = `<div class="kb-section active" style="padding:30px;color:var(--danger)">Error loading content: ${e.message}</div>`;
    }
  } else {
    container.innerHTML = `<div class="kb-section active" style="padding:30px;color:var(--text3)">Section not found.</div>`;
  }
};


// Full-featured Markdown to HTML renderer
function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const inline = s => esc(s)
    .replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/~~(.+?)~~/g,'<del>$1</del>');

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line
    if (!trimmed) { i++; continue; }

    // Horizontal rule
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(trimmed)) {
      out.push('<hr>'); i++; continue;
    }

    // Headings
    const hm = trimmed.match(/^(#{1,4}) (.+)$/);
    if (hm) {
      const lvl = hm[1].length;
      out.push(`<h${lvl}>${inline(hm[2])}</h${lvl}>`);
      i++; continue;
    }

    // Fenced code block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(esc(lines[i]));
        i++;
      }
      i++; // skip closing ```
      out.push(`<pre style="background:var(--surface3);border:1px solid var(--border2);border-radius:8px;padding:14px 16px;overflow-x:auto;margin:12px 0"><code style="font-family:var(--mono);font-size:12px;color:var(--accent2)">${codeLines.join('\n')}</code></pre>`);
      continue;
    }

    // Blockquote / Alerts
    if (trimmed.startsWith('>')) {
      const bqLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        bqLines.push(lines[i].trim().slice(1).trim());
        i++;
      }
      const bqText = bqLines.join(' ');
      const alertMatch = bqText.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)/);
      if (alertMatch) {
        const type = alertMatch[1];
        const msg = alertMatch[2];
        const cls = { NOTE:'note', TIP:'tip', IMPORTANT:'note', WARNING:'warn', CAUTION:'warn' }[type] || 'note';
        const icons = { NOTE:'📌', TIP:'✅', IMPORTANT:'⚠️', WARNING:'⚠️', CAUTION:'🚨' };
        out.push(`<div class="kb-tip ${cls}"><span class="kb-tip-label">${icons[type]} ${type}</span>${inline(msg)}</div>`);
      } else {
        out.push(`<blockquote>${inline(bqText)}</blockquote>`);
      }
      continue;
    }

    // Unordered list
    if (/^[*\-+] /.test(trimmed)) {
      out.push('<ul>');
      while (i < lines.length) {
        const lt = lines[i].trim();
        if (/^[*\-+] /.test(lt)) {
          out.push(`<li>${inline(lt.slice(2).trim())}</li>`);
          i++;
        } else if (!lt) {
          i++; break;
        } else { break; }
      }
      out.push('</ul>');
      continue;
    }

    // Ordered list
    if (/^\d+[.)\s]/.test(trimmed)) {
      out.push('<ol>');
      while (i < lines.length) {
        const lt = lines[i].trim();
        if (/^\d+[.)\s]/.test(lt)) {
          out.push(`<li>${inline(lt.replace(/^\d+[.)\s]+/,'').trim())}</li>`);
          i++;
        } else if (!lt) {
          i++; break;
        } else { break; }
      }
      out.push('</ol>');
      continue;
    }

    // Table
    if (trimmed.startsWith('|')) {
      const tableRows = [];
      let isHeader = true;
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i].trim();
        // Skip separator rows (|---|---|)
        if (/^\|[\s\-:|]+\|$/.test(row.replace(/[^|\-:\s]/g,''))) {
          isHeader = false; i++; continue;
        }
        const cells = row.split('|').filter((_,idx,arr) => idx > 0 && idx < arr.length - 1);
        const tag = isHeader ? 'th' : 'td';
        tableRows.push(`<tr>${cells.map(c => `<${tag}>${inline(c.trim())}</${tag}>`).join('')}</tr>`);
        if (isHeader) isHeader = false;
        i++;
      }
      if (tableRows.length) {
        out.push(`<table class="kb-table"><tbody>${tableRows.join('')}</tbody></table>`);
      }
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (i < lines.length) {
      const lt = lines[i].trim();
      if (!lt) { i++; break; }
      if (/^#{1,4} /.test(lt) || /^[*\-+] /.test(lt) || /^\d+[.)\s]/.test(lt) || lt.startsWith('|') || lt.startsWith('>') || lt.startsWith('```') || /^(-{3,}|_{3,}|\*{3,})$/.test(lt)) break;
      paraLines.push(lt);
      i++;
    }
    if (paraLines.length) out.push(`<p>${inline(paraLines.join(' '))}</p>`);
  }

  return out.join('\n');
}

// ============================================================
//  SCORES PAGE
// ============================================================
function renderScoresPage(app) {
  const scores = getScores();
  const rows = EXAMS_META.map(meta => {
    const sc = scores[meta.id];
    if (!sc) return `
      <tr>
        <td><strong>Exam ${meta.id}</strong></td>
        <td style="font-size:11px;color:var(--text3)">${meta.theme.replace('🔥 ','')}</td>
        <td colspan="5"><span class="score-pill na">Not taken</span></td>
      </tr>`;
    return `
      <tr>
        <td><strong>Exam ${meta.id}</strong></td>
        <td style="font-size:11px;color:var(--text3)">${meta.theme.replace('🔥 ','')}</td>
        <td style="font-size:12px">${sc.date||'—'}</td>
        <td style="font-family:var(--mono);font-size:12px">${sc.raw}/${sc.total}</td>
        <td><span class="score-pill ${sc.passed?'pass':'fail'}">${sc.scaled}/1000</span></td>
        <td><span class="score-pill ${sc.passed?'pass':'fail'}">${sc.passed?'✅ PASS':'❌ FAIL'}</span></td>
        <td style="font-size:11px;color:var(--text3)">${sc.timeUsed||'—'}</td>
      </tr>`;
  }).join('');

  app.innerHTML = `
  <div class="page active">
    <div class="scores-wrap">
      <div class="section-title">My Score History</div>
      <div style="margin-bottom:16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <button class="btn btn-danger" style="font-size:12px;padding:7px 14px" onclick="confirmClearScores()">🗑 Clear All Scores</button>
        <span style="font-size:12px;color:var(--text3)">Scores are saved in your browser's local storage.</span>
      </div>
      <table class="scores-table">
        <thead><tr>
          <th>Exam</th><th>Theme</th><th>Date</th>
          <th>Raw</th><th>Scaled</th><th>Result</th><th>Time Used</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

window.confirmClearScores = function() {
  openModal('Clear All Scores?','This will permanently delete your entire score history. Cannot be undone.', () => {
    clearAllScores();
    showPage('scores');
    showToast('All scores cleared.','err');
  });
};

// ============================================================
//  MODAL
// ============================================================
let _modalCb = null;
function openModal(title, text, onConfirm) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-text').textContent = text;
  _modalCb = onConfirm;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  _modalCb = null;
}

// ============================================================
//  TOAST
// ============================================================
let _toastT;
function showToast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(_toastT);
  _toastT = setTimeout(() => t.classList.remove('show'), 3000);
}

// ============================================================
//  LOADING
// ============================================================
function showLoading(show) {
  document.getElementById('loading-overlay').classList.toggle('show', show);
}

// ============================================================
//  INIT
// ============================================================
document.getElementById('modal-cancel').onclick = closeModal;
document.getElementById('modal-confirm').onclick = () => { closeModal(); if(_modalCb) _modalCb(); };
document.getElementById('modal-overlay').onclick = (e) => { if(e.target===document.getElementById('modal-overlay')) closeModal(); };

document.querySelectorAll('.nav-link').forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

// Make functions global for onclick handlers
window.showPage = showPage;
window.showLoading = showLoading;
window.openModal = openModal;
window.confirmExit = window.confirmExit;

// Boot
renderDashboard(document.getElementById('app'));
