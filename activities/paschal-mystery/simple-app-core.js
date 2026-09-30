const STORAGE_KEY = "hre4m.paschal.simple.v1";
const STEPS = [
  {title:"1. What is lost?", sub:"Make an initial judgement."},
  {title:"2. Follow the consequences", sub:"Build one clear chain."},
  {title:"3. Check the evidence", sub:"Separate evidence from a misleading claim."},
  {title:"4. Defend your conclusion", sub:"Answer an objection and prepare to speak."}
];
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const wordCount = s => String(s||"").trim().split(/\s+/).filter(Boolean).length;
let selectedEvent = "Resurrection";
let toastTimer;
let state = loadState();
let view = state ? "game" : "home";

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    if(!EVENTS.includes(parsed.event)) return null;
    return parsed;
  }catch{return null;}
}
function save(){
  if(!state) return;
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}
  const s=$("[data-save]"); if(s) s.textContent="Saved on this device";
}
function toast(msg){
  const el=$("#toast"); if(!el) return;
  el.textContent=msg; el.hidden=false;
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.hidden=true,3200);
}
function makeState(){
  return {
    version:1, team:"", period:"", event:selectedEvent, stage:0, done:[],
    stage1Choice:"", stage1Why:"",
    chain:[null,null,null], chainWhy:"",
    misleading:"", evidenceStrong:"", evidenceWhy:"",
    concession:"", correction:"", linkedEvents:[], synthesis:"",
    timer:{phase:0,remaining:90,running:false,end:0}
  };
}
function header(){
  return `<header class="header"><div class="wrap header-inner">
    <button class="brand" data-action="home" aria-label="Return to activity home">
      <span class="mark">†</span><span><strong>THE BROKEN CHAIN</strong><small>HRE4M1 / PASCHAL MYSTERY</small></span>
    </button>
    <div class="header-actions">
      <button class="btn subtle" data-action="guide"><span class="hide-mobile">Activity </span>Guide</button>
      ${state?'<button class="btn subtle" data-action="restart">Restart</button>':""}
    </div>
  </div></header>`;
}
function footer(){
  return `<footer class="footer"><div class="wrap"><span>HRE4M1 · Paschal Mystery Challenge</span><span>Based on class notes and NRSV-CE Scripture passages.</span></div></footer>`;
}
function render(){
  const app=$("#app");
  app.innerHTML=header()+(view==="home"?home():game())+footer();
  bindCommon();
  if(view==="game") bindGame();
  updateTimer();
}
function home(){
  return `<main class="wrap">
    <section class="hero">
      <div>
        <p class="eyebrow">A four-step theological challenge</p>
        <h1>Break one link.<br><em>See what changes.</em></h1>
        <p class="lead">The Paschal Mystery is one saving mystery made up of four connected events: the Passion, Death, Resurrection, and Ascension of Jesus. Your group will imagine that one event is missing and investigate what that would change in the Christian understanding of salvation.</p>
        <div class="notice"><strong>This is a thought experiment.</strong> You are not ranking the four events or rewriting Christian belief. You are using a “what if?” question to understand why the events belong together.</div>
      </div>
      <div class="hero-card">
        <p class="eyebrow">The whole mystery</p>
        <div class="chain">${OVERVIEW.map((x,i)=>`${i?'<span class="chain-arrow">→</span>':""}<span class="chain-item">${x.name}</span>`).join("")}</div>
        <div class="divider"></div>
        <p class="small muted">In the class notes, the four events form one movement from self-giving and sacrifice to victory, glory, and mission. The purpose of this activity is to trace those connections.</p>
      </div>
    </section>
    <section class="section">
      <p class="eyebrow">What you will do</p>
      <div class="intro-grid">
        <div class="intro-card"><span>01</span><h3>What is lost?</h3><p>Choose the consequence your group thinks matters most and explain your first impression.</p></div>
        <div class="intro-card"><span>02</span><h3>Follow the consequences</h3><p>Build one three-part chain showing how the missing event affects Christian belief.</p></div>
        <div class="intro-card"><span>03</span><h3>Check the evidence</h3><p>Read three short evidence cards, identify the misleading claim, and choose your strongest support.</p></div>
        <div class="intro-card"><span>04</span><h3>Defend your conclusion</h3><p>Respond to an objection, connect the other events, then make a 90-second group defence.</p></div>
      </div>
    </section>
    <section class="section">
      <p class="eyebrow">Choose your missing event</p>
      <h2>Your teacher may assign one.</h2>
      <div class="event-grid">
        ${OVERVIEW.map(x=>`<button class="event-btn" data-event="${x.name}" aria-pressed="${selectedEvent===x.name}"><strong>${x.name}</strong><span>${x.text}</span></button>`).join("")}
      </div>
      <div class="setup">
        <form id="startForm">
          <div class="fields">
            <label class="field"><span class="field-title">Team name</span><input id="teamName" maxlength="50" required placeholder="Choose a team name"></label>
            <label class="field"><span class="field-title">Period</span><select id="period"><option value="">Select period</option>${[1,2,3,4,5].map(n=>`<option value="${n}">Period ${n}</option>`).join("")}</select></label>
          </div>
          <div class="actions" style="margin-top:18px">
            <button class="btn primary" type="submit">Begin ${selectedEvent} challenge →</button>
            ${state?'<button class="btn" type="button" data-action="resume">Resume saved team</button>':""}
          </div>
        </form>
      </div>
    </section>
  </main>`;
}
function progress(){
  const completed=state.done.length;
  return `<div class="progress-wrap">
    <div class="progress-head"><span class="eyebrow" style="margin:0">${esc(state.team)} · ${state.event}</span><span class="saved" data-save>Saved on this device</span></div>
    <div class="progress"><span style="width:${Math.min(100,(completed+(state.stage<4?.35:0))/4*100)}%"></span></div>
  </div>
  <div class="step-tabs">${STEPS.map((s,i)=>`<button class="step-tab ${state.stage===i?"active":""} ${state.done.includes(i)?"done":""}" data-step="${i}" ${i>0&&!state.done.includes(i-1)&&!state.done.includes(i)?"disabled":""}>${s.title}</button>`).join("")}</div>`;
}
function roomHeader(i){
  return `<div class="room-head"><p class="eyebrow">Step ${i+1} of 4</p><h2>${STEPS[i].title.replace(/^\d\.\s*/,"")}</h2><p class="lead">${STEPS[i].sub}</p></div>`;
}
function game(){
  const d=EVENT_DATA[state.event];
  if(state.stage===4) return `<main class="wrap game">${progress()}${defenceScreen(d)}</main>`;
  return `<main class="wrap game">${progress()}<div id="room">${state.stage===0?stage1(d):state.stage===1?stage2(d):state.stage===2?stage3(d):stage4(d)}</div></main>`;
}
function textArea(key,title,placeholder,min){
  const val=esc(state[key]||"");
  return `<label class="field" style="margin-top:18px"><span class="field-title">${title}</span><textarea data-field="${key}" data-min="${min}" placeholder="${esc(placeholder)}">${val}</textarea><span class="word-count" data-count="${key}">${wordCount(state[key])} words · minimum ${min}</span></label>`;
}
function stage1(d){
  return `${roomHeader(0)}
    <div class="panel gold"><p class="eyebrow">Your missing event</p><p class="brief"><strong>${state.event}</strong>: ${d.short}</p></div>
    <div class="panel">
      <h3>${d.missingQuestion}</h3>
      <p class="small muted">This is your starting judgement. It can change after you examine the evidence.</p>
      <div class="choice-grid">${d.stage1Choices.map(c=>`<button class="choice" data-choice="stage1" data-value="${esc(c)}" aria-pressed="${state.stage1Choice===c}">${c}</button>`).join("")}</div>
      ${textArea("stage1Why","Why did your group choose this?","Explain your reasoning in 2–3 sentences.",15)}
    </div>
    ${stageFooter(0)}`;
}
function chainOptions(d,type){
  const correct=type==="direct"?d.directChoice:type==="belief"?d.beliefChoice:d.resultChoice;
  const wrong=type==="direct"?d.distractDirect:type==="belief"?d.distractBelief:d.distractResult;
  const idx=EVENTS.indexOf(state.event);
  const pos=(idx+(type==="direct"?0:type==="belief"?1:2))%3;
  const arr=[...wrong]; arr.splice(pos,0,correct);
  return arr.map(v=>`<option value="${esc(v)}" ${state.chain[type==="direct"?0:type==="belief"?1:2]===v?"selected":""}>${v}</option>`).join("");
}
function stage2(d){
  return `${roomHeader(1)}
    <div class="panel">
      <p class="eyebrow">Build one clear chain</p>
      <p class="small muted">Choose the most direct connection in each box. The point is not to find every possible consequence; it is to show one defensible line of reasoning.</p>
      <div class="chain-builder">
        <div class="chain-box"><span class="chain-label">1 · What is directly missing?</span><select data-chain="0"><option value="">Choose one</option>${chainOptions(d,"direct")}</select></div>
        <div class="connector"></div>
        <div class="chain-box"><span class="chain-label">2 · Which Christian meaning is affected?</span><select data-chain="1"><option value="">Choose one</option>${chainOptions(d,"belief")}</select></div>
        <div class="connector"></div>
        <div class="chain-box"><span class="chain-label">3 · What becomes harder to explain?</span><select data-chain="2"><option value="">Choose one</option>${chainOptions(d,"result")}</select></div>
      </div>
      ${textArea("chainWhy","Explain the arrows.","Why does the first idea lead to the second, and the second to the third?",25)}
      <div id="chainCheck" class="checklist">${chainChecklist(d)}</div>
    </div>
    ${stageFooter(1)}`;
}
function chainChecklist(d){
  const checks=[
    ["Box 1",state.chain[0]===d.directChoice],
    ["Box 2",state.chain[1]===d.beliefChoice],
    ["Box 3",state.chain[2]===d.resultChoice],
    ["Explanation",wordCount(state.chainWhy)>=25]
  ];
  return checks.map(([label,ok])=>`<div class="check ${ok?"ok":""}"><span class="dot">${ok?"✓":"○"}</span><span>${label}: ${ok?"ready":"not complete yet"}</span></div>`).join("");
}
function stage3(d){
  return `${roomHeader(2)}
    <div class="panel"><p class="eyebrow">Three cards · one misleading claim</p><h3>Which card does not fit what we discussed in class?</h3><p class="small muted">Read all three. First identify the misleading claim. Then choose which of the other two cards best supports your group’s argument.</p></div>
    <div class="evidence-grid">
      ${d.evidence.map(e=>`<article class="evidence"><span class="tag">Card ${e.id}</span><h3>${e.title}</h3><p>${e.body}</p><small>${e.ref}</small><button class="choice" data-evidence-misleading="${e.id}" aria-pressed="${state.misleading===e.id}">Mark as misleading</button></article>`).join("")}
    </div>
    <div class="panel" style="margin-top:18px">
      <label class="field"><span class="field-title">Which accurate card is your strongest evidence?</span><select data-field-select="evidenceStrong"><option value="">Choose Card A or B</option>${d.evidence.filter(e=>!e.misleading).map(e=>`<option value="${e.id}" ${state.evidenceStrong===e.id?"selected":""}>Card ${e.id}: ${e.title}</option>`).join("")}</select></label>
      ${textArea("evidenceWhy","Why is this evidence useful?","Explain how it supports your group’s argument about the missing event.",20)}
    </div>
    ${stageFooter(2)}`;
}
function stage4(d){
  const others=EVENTS.filter(e=>e!==state.event);
  return `${roomHeader(3)}
    <div class="panel gold"><p class="eyebrow">The challenge</p><p class="brief">“${d.skeptic}”</p></div>
    <div class="panel">
      ${textArea("concession","What does this statement get partly right?","Acknowledge one fair point before you disagree.",12)}
      ${textArea("correction","What does the statement misunderstand?","Use your consequence chain and evidence to answer the objection.",25)}
      <div class="divider"></div>
      <h3>Reconnect the broken chain.</h3>
      <p class="small muted">${d.otherPrompt} Select exactly two, then explain how your missing event connects to them.</p>
      <div class="other-events">${others.map(e=>`<button class="event-chip" data-link-event="${e}" aria-pressed="${state.linkedEvents.includes(e)}">${e}</button>`).join("")}</div>
      ${textArea("synthesis","Explain the two connections.","Show why the Paschal Mystery is one connected saving mystery rather than four unrelated events.",25)}
    </div>
    ${stageFooter(3)}`;
}
function stageFooter(i){
  return `<div id="stageError"></div><div class="footer-actions">
    <button class="btn" data-action="back" ${i===0?"disabled":""}>← Back</button>
    <button class="btn primary" data-action="continue">${i===3?"Prepare 90-second defence":"Continue"} →</button>
  </div>`;
}
function defenceScreen(d){
  const ev=d.evidence.find(x=>x.id===state.evidenceStrong);
  return `<div class="room-head"><p class="eyebrow">Group defence</p><h2>Make your case in 90 seconds.</h2><p class="lead">${d.defence}</p></div>
    <div class="summary-card">
      <p class="eyebrow">Your speaking outline</p>
      <div class="summary-grid">
        <div class="summary-item"><span>1 · Initial claim</span><p>${esc(state.stage1Choice)}<br>${esc(state.stage1Why)}</p></div>
        <div class="summary-item"><span>2 · Consequence chain</span><p>${esc(state.chain[0])} → ${esc(state.chain[1])} → ${esc(state.chain[2])}</p></div>
        <div class="summary-item"><span>3 · Evidence</span><p>Card ${esc(state.evidenceStrong)}${ev?": "+esc(ev.title):""}<br>${esc(state.evidenceWhy)}</p></div>
        <div class="summary-item"><span>4 · Answer the challenge</span><p>${esc(state.correction)}<br><br>${esc(state.synthesis)}</p></div>
      </div>
    </div>
    ${timerCard()}
    <div class="actions" style="margin-top:18px"><button class="btn primary" data-action="download">Download team notes</button><button class="btn" data-action="restart">Start a new team</button></div>`;
}
function timerCard(){
  const t=state.timer, labels=["90-second defence","30-second question","30-second response"], durations=[90,30,30];
  return `<div class="timer-card" id="timerCard">
    <div class="timer-tabs">${labels.map((x,i)=>`<button class="timer-tab" data-timer-phase="${i}" aria-pressed="${t.phase===i}">${x}</button>`).join("")}</div>
    <div class="timer-phase">${labels[t.phase]}</div>
    <div class="timer-display" data-timer-display>${formatTime(timerRemaining())}</div>
    <div class="actions" style="justify-content:center"><button class="btn primary" data-action="timer-toggle">${t.running?"Pause":"Start"}</button><button class="btn" data-action="timer-reset">Reset</button><button class="btn" data-action="timer-next">Next phase →</button></div>
    <p class="fine" style="margin-top:14px">The timer is only a presentation guide. It does not affect a mark.</p>
  </div>`;
}
