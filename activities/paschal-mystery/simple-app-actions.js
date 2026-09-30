function bindCommon(){
  $$("[data-action]").forEach(b=>b.addEventListener("click",()=>handleAction(b.dataset.action)));
  $$("[data-event]").forEach(b=>b.addEventListener("click",()=>{selectedEvent=b.dataset.event;render();}));
  const form=$("#startForm");
  if(form) form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=$("#teamName").value.trim();
    if(!name){$("#teamName").focus();return;}
    const start=()=>{
      state=makeState();
      state.team=name;
      state.period=$("#period").value;
      state.event=selectedEvent;
      view="game";
      save(); render(); window.scrollTo({top:0,behavior:"smooth"});
    };
    if(state && !confirm("Start a new team and replace the saved progress on this device?")) return;
    start();
  });
}
function bindGame(){
  $("[data-step]").forEach(b=>b.addEventListener("click",()=>{const n=Number(b.dataset.step);if(!b.disabled){state.stage=n;save();render();window.scrollTo({top:0,behavior:"smooth"});}}));
  $("[data-choice='stage1']").forEach(b=>b.addEventListener("click",()=>{
    state.stage1Choice=b.dataset.value; save();
    $$("[data-choice='stage1']").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
  }));
  $$("[data-field]").forEach(el=>el.addEventListener("input",()=>{
    state[el.dataset.field]=el.value; save(); updateCounts();
    if(state.stage===1) updateChainChecklist();
  }));
  $$("[data-field-select]").forEach(el=>el.addEventListener("change",()=>{state[el.dataset.fieldSelect]=el.value;save();}));
  $$("[data-chain]").forEach(el=>el.addEventListener("change",()=>{
    state.chain[Number(el.dataset.chain)]=el.value||null; save(); updateChainChecklist();
  }));
  $$("[data-evidence-misleading]").forEach(b=>b.addEventListener("click",()=>{
    state.misleading=b.dataset.evidenceMisleading; save();
    $$("[data-evidence-misleading]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
  }));
  $$("[data-link-event]").forEach(b=>b.addEventListener("click",()=>{
    const e=b.dataset.linkEvent;
    if(state.linkedEvents.includes(e)) state.linkedEvents=state.linkedEvents.filter(x=>x!==e);
    else if(state.linkedEvents.length<2) state.linkedEvents.push(e);
    else {toast("Choose exactly two events. Deselect one before choosing another.");return;}
    save();
    $$("[data-link-event]").forEach(x=>x.setAttribute("aria-pressed",String(state.linkedEvents.includes(x.dataset.linkEvent))));
  }));
  $$("[data-timer-phase]").forEach(b=>b.addEventListener("click",()=>{
    state.timer.phase=Number(b.dataset.timerPhase); state.timer.running=false;
    state.timer.remaining=[90,30,30][state.timer.phase]; save(); render();
  }));
  updateCounts();
}
function updateCounts(){
  $$("[data-count]").forEach(el=>{
    const key=el.dataset.count;
    const input=$(`[data-field="${key}"]`);
    if(input) el.textContent=`${wordCount(input.value)} words · minimum ${input.dataset.min}`;
  });
}
function updateChainChecklist(){
  const el=$("#chainCheck");
  if(el) el.innerHTML=chainChecklist(EVENT_DATA[state.event]);
}
function error(msg){
  const box=$("#stageError");
  if(box){box.innerHTML=`<div class="notice error">${esc(msg)}</div>`;box.scrollIntoView({behavior:"smooth",block:"center"});}
}
function clearError(){const box=$("#stageError");if(box)box.innerHTML="";}
function validateStage(){
  const d=EVENT_DATA[state.event], s=state.stage;
  clearError();
  if(s===0){
    if(!state.stage1Choice) return error("Choose one consequence before continuing."),false;
    if(wordCount(state.stage1Why)<15) return error("Explain your choice in at least 15 words."),false;
  }
  if(s===1){
    const labels=["Box 1: what is directly missing","Box 2: which Christian meaning is affected","Box 3: what becomes harder to explain"];
    const correct=[d.directChoice,d.beliefChoice,d.resultChoice];
    for(let i=0;i<3;i++){
      if(!state.chain[i]) return error(`Complete ${labels[i]}.`),false;
      if(state.chain[i]!==correct[i]) return error(`Reconsider ${labels[i]}. Choose the most direct connection supported by the class notes.`),false;
    }
    if(wordCount(state.chainWhy)<25) return error("Explain the arrows in at least 25 words."),false;
  }
  if(s===2){
    const bad=d.evidence.find(e=>e.misleading);
    if(!state.misleading) return error("Mark one card as the misleading claim."),false;
    if(state.misleading!==bad.id) return error("Re-read the three cards. The misleading card is the one that contradicts what was discussed in class."),false;
    if(!state.evidenceStrong) return error("Choose your strongest accurate evidence card."),false;
    if(wordCount(state.evidenceWhy)<20) return error("Explain why your evidence is useful in at least 20 words."),false;
  }
  if(s===3){
    if(wordCount(state.concession)<12) return error("Acknowledge one fair point in at least 12 words."),false;
    if(wordCount(state.correction)<25) return error("Explain what the objection misunderstands in at least 25 words."),false;
    if(state.linkedEvents.length!==2) return error("Select exactly two other Paschal events to reconnect the chain."),false;
    if(wordCount(state.synthesis)<25) return error("Explain the two connections in at least 25 words."),false;
  }
  return true;
}
function continueStage(){
  if(!validateStage()) return;
  if(!state.done.includes(state.stage)) state.done.push(state.stage);
  if(state.stage<3){state.stage++;save();render();window.scrollTo({top:0,behavior:"smooth"});}
  else {state.stage=4;save();render();window.scrollTo({top:0,behavior:"smooth"});}
}
function handleAction(action){
  if(action==="home"){view="home";render();window.scrollTo({top:0,behavior:"smooth"});}
  else if(action==="resume"&&state){view="game";render();window.scrollTo({top:0,behavior:"smooth"});}
  else if(action==="back"&&state.stage>0){state.stage--;save();render();window.scrollTo({top:0,behavior:"smooth"});}
  else if(action==="continue") continueStage();
  else if(action==="guide") openGuide();
  else if(action==="restart"){
    if(!confirm("Start over? This clears the saved team on this device.")) return;
    try{localStorage.removeItem(STORAGE_KEY);}catch{}
    state=null; view="home"; render(); window.scrollTo({top:0,behavior:"smooth"});
  }
  else if(action==="timer-toggle") toggleTimer();
  else if(action==="timer-reset"){state.timer.running=false;state.timer.remaining=[90,30,30][state.timer.phase];save();render();}
  else if(action==="timer-next"){state.timer.phase=(state.timer.phase+1)%3;state.timer.running=false;state.timer.remaining=[90,30,30][state.timer.phase];save();render();}
  else if(action==="download") downloadReport();
}
function openGuide(){
  const d=$("#dialog");
  d.innerHTML=`<div class="modal-head"><h3>Activity guide</h3><button class="btn subtle" id="closeDialog">Close</button></div>
    <div class="modal-body">
      <p><strong>The idea:</strong> The Passion, Death, Resurrection, and Ascension form one Paschal Mystery. Your group imagines one event is missing so you can see more clearly how the events connect.</p>
      <div class="guide-list">
        <div class="guide-item"><span class="guide-num">1</span><div><strong>What is lost?</strong><p class="small muted">Make an initial judgement and explain it. You are allowed to change your mind later.</p></div></div>
        <div class="guide-item"><span class="guide-num">2</span><div><strong>Follow the consequences.</strong><p class="small muted">Build one direct chain: what is missing → which Christian meaning is affected → what becomes harder to explain.</p></div></div>
        <div class="guide-item"><span class="guide-num">3</span><div><strong>Check the evidence.</strong><p class="small muted">Read three cards, identify the misleading claim, and choose your strongest supporting evidence.</p></div></div>
        <div class="guide-item"><span class="guide-num">4</span><div><strong>Defend your conclusion.</strong><p class="small muted">Answer a challenge, reconnect your event to two others, then make a 90-second group defence.</p></div></div>
      </div>
      <div class="notice"><strong>Important:</strong> This is a thought experiment. You are not deciding which Paschal event is “best,” and you are not inventing new Church teaching.</div>
      <p class="fine">Content is based on the Paschal Mystery material discussed in class and the linked NRSV-CE passages.</p>
    </div>`;
  d.showModal();
  $("#closeDialog").onclick=()=>d.close();
}
function formatTime(s){
  s=Math.max(0,Math.ceil(Number(s)||0));
  return `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
}
function timerRemaining(){
  if(!state?.timer) return 0;
  return state.timer.running?Math.max(0,(state.timer.end-Date.now())/1000):state.timer.remaining;
}
function toggleTimer(){
  if(!state) return;
  const t=state.timer;
  if(t.running){t.remaining=timerRemaining();t.running=false;}
  else {if(t.remaining<=0)t.remaining=[90,30,30][t.phase];t.end=Date.now()+t.remaining*1000;t.running=true;}
  save();render();
}
function updateTimer(){
  if(!state?.timer||view!=="game"||state.stage!==4)return;
  const left=timerRemaining(),el=$("[data-timer-display]");
  if(el)el.textContent=formatTime(left);
  if(state.timer.running&&left<=0){state.timer.running=false;state.timer.remaining=0;save();toast("Time.");render();}
}
function report(){
  const d=EVENT_DATA[state.event];
  const ev=d.evidence.find(x=>x.id===state.evidenceStrong);
  return `THE BROKEN CHAIN
HRE4M1 · PASCHAL MYSTERY CHALLENGE

Team: ${state.team}
Period: ${state.period||"not provided"}
Missing event: ${state.event}

1. WHAT IS LOST?
Initial choice: ${state.stage1Choice}
Reason: ${state.stage1Why}

2. FOLLOW THE CONSEQUENCES
${state.chain[0]}
→ ${state.chain[1]}
→ ${state.chain[2]}
Explanation: ${state.chainWhy}

3. CHECK THE EVIDENCE
Misleading card: ${state.misleading}
Strongest evidence: Card ${state.evidenceStrong}${ev?" · "+ev.title:""}
Reason: ${state.evidenceWhy}

4. DEFEND YOUR CONCLUSION
Fair point in the objection: ${state.concession}
What the objection misunderstands: ${state.correction}
Other events connected: ${state.linkedEvents.join(", ")}
Why the events connect: ${state.synthesis}

Class source: Paschal Mystery notes and NRSV-CE Scripture passages.
`;
}
function downloadReport(){
  const blob=new Blob([report()],{type:"text/plain;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);
  a.download=`broken-chain-${state.team.replace(/[^a-z0-9]+/gi,"-").toLowerCase()||"team"}.txt`;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),3000);
  toast("Team notes downloaded.");
}
window.addEventListener("beforeunload",()=>{if(state?.timer?.running){state.timer.remaining=timerRemaining();state.timer.running=false;save();}});
setInterval(updateTimer,250);
render();
