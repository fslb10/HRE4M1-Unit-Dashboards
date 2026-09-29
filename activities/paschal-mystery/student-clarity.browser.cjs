const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
(async()=>{
 const {buildPaschalArchive}=await import('./build.mjs');
 const html=buildPaschalArchive();fs.mkdirSync('test-output',{recursive:true});fs.writeFileSync('test-output/paschal-mystery.html',html);
 const server=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});res.end(html);});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const url='http://127.0.0.1:'+server.address().port+'/paschal-mystery.html';
 const browser=await chromium.launch({headless:true});const results=[];
 const response='This explanation uses the evidence to connect the missing event with the belief being discussed. The selected ideas affect one another, so they must be explained together rather than treated as separate facts. We can support the relationship using the example discussed in class and explain why the consequence follows.';
 const events=['Passion','Death','Resurrection','Ascension'];
 try{
 for(const event of events){
  const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);await page.waitForSelector('#studentGuide');
  assert.match(await page.locator('#studentGuide').innerText(),/One event, four tasks/);
  assert.doesNotMatch(await page.locator('body').innerText(),/If One Piece Is Missing|Original assignment|the course links/i);
  if(event==='Passion')await page.screenshot({path:'test-output/home-student-guide.png',fullPage:true});
  await page.locator('[data-case="'+event+'"]').click();await page.locator('#teamName').fill('QA '+event);await page.locator('#period').selectOption('2');await page.locator('#duration').selectOption('0');
  await page.locator('#startForm button[type=submit]').click();assert.equal(await page.evaluate('state'),null,'Orientation acknowledgement must precede a new game');
  await page.locator('#understandMission').check();await page.locator('#startForm button[type=submit]').click();
  async function stage(n){assert.equal(await page.evaluate('state.stage'),n);assert.equal(errors.length,0,errors.join('\n'));}
  async function fill(k,text=response){await page.locator('[data-field="'+k+'"]').fill(text);}
  async function next(n){await page.locator('#room [data-action="complete"]').click();await stage(n);}
  await stage(0);
  for(let i=0;i<10;i++)await page.locator('[data-rating="diagnosis"][data-belief="'+i+'"][data-value="Damaged"]').click();
  await fill('prediction');await page.locator('[data-confidence="Fairly confident"]').click();await next(1);
  const prefix={Passion:'P',Death:'D',Resurrection:'R',Ascension:'A'}[event];
  for(let i=1;i<=6;i++){await page.locator('[data-open="'+prefix+i+'"]').click();await page.locator('[data-evidence="'+prefix+i+'"][data-kind="'+(i<=3?'evidence':i<=5?'context':'misleading')+'"]').click();}
  await page.locator('[data-field="strongEvidence"]').selectOption(prefix+'1');await page.locator('[data-field="secondEvidence"]').selectOption(prefix+'2');await fill('evidenceReason');await next(2);
  for(let i=0;i<3;i++)await page.locator('[data-map="'+i+'"]').selectOption(i===2?'0':'1');
  await fill('mapWhy1');await fill('mapWhy2');await fill('mapOther');
  // Intentionally no exact event names in the prose: progression must depend on visible checkboxes instead.
  assert.ok(!events.some(e=>response.toLowerCase().includes(e.toLowerCase())));
  await page.locator('#room [data-action="complete"]').click();await stage(2);assert.match(await page.locator('#roomFeedback').innerText(),/checkboxes/);
  const other=events.filter(e=>e!==event);for(const e of other.slice(0,2))await page.locator('[data-event-selection="linkedEvents"][value="'+e+'"]').check();
  assert.equal(await page.locator('#mapChecklistTitle').innerText(),'Ready to open Seal II');
  const before=await page.evaluate('JSON.stringify({forms:state.forms,digits:state.digits,linkedEvents:state.linkedEvents})');
  await page.reload();await page.locator('[data-action="resume"]').first().click();await stage(2);assert.equal(await page.evaluate('JSON.stringify({forms:state.forms,digits:state.digits,linkedEvents:state.linkedEvents})'),before);
  if(event==='Passion')await page.screenshot({path:'test-output/connections-diagram.png',fullPage:true});await next(3);
  const text=await page.locator('#room').innerText();assert.doesNotMatch(text,/repair the second|repair the third|the course|original assignment/i);assert.match(text,/S[eE][lL][eE][cC][tT]|Click/);
  const answers=await page.evaluate('SCENARIOS[state.event].records.map(r=>r.answer)');
  // Incorrect choices cannot open the seal; no answer index is supplied by the error.
  await page.locator('[data-record="0"][data-line="'+((answers[0]+1)%3)+'"]').click();await page.locator('#room [data-action="complete"]').click();await stage(3);assert.doesNotMatch(await page.locator('#roomFeedback').innerText(),/select statement [123]|sentence [123] is wrong/i);
  for(let i=0;i<2;i++){await page.locator('[data-record="'+i+'"][data-line="'+answers[i]+'"]').click();await fill('repair'+i);assert.match(await page.locator('[data-selected-claim="'+i+'"]').innerText(),/You selected statement/);}
  if(event==='Passion')await page.screenshot({path:'test-output/check-the-claims.png',fullPage:true});await next(4);
  await page.locator('[data-position="Partly agree"]').click();await fill('concession');await fill('rebuttal');await page.locator('[data-field="rebuttalEvidence"]').selectOption(prefix+'1');await page.locator('[data-priority="Hope"]').click();await fill('priorityReason');await next(5);
  await page.locator('[data-field="recipient"]').selectOption(other[0]);await fill('challenge');await page.locator('[data-check="challengeDelivered"]').check();await next(6);
  for(let i=0;i<10;i++)await page.locator('[data-rating="finalRatings"][data-belief="'+i+'"][data-value="Damaged"]').click();await fill('revision');await fill('unity');
  await page.locator('[data-check="reviewed"]').check();await fill('code',await page.evaluate('state.digits.join("")'));
  await page.locator('#room [data-action="complete"]').click();await stage(6);assert.match(await page.locator('#roomFeedback').innerText(),/checkboxes/);
  for(const e of events)await page.locator('[data-event-selection="unityEvents"][value="'+e+'"]').check();await next(7);
  assert.equal(await page.locator('[data-timer-clock]').innerText(),'01:30');await page.locator('[data-timer-extended]').check();assert.equal(await page.locator('[data-timer-clock]').innerText(),'02:00');await page.locator('[data-timer-phase="1"]').click();assert.equal(await page.locator('[data-timer-clock]').innerText(),'00:45');
  const report=await page.evaluate('report()');assert.doesNotMatch(report,/If One Piece Is Missing|resource pack|teacher-supplied/i);assert.match(report,/OTHER EVENTS SELECTED FOR CONNECTIONS/);
  // Legacy format: same storage key, no added arrays. Existing prose and digits must remain intact.
  await page.evaluate(()=>{state.stage=2;state.done=[0,1];delete state.linkedEvents;delete state.unityEvents;state.forms.mapOther='Death and Resurrection are connected with the event our group is investigating because each helps explain the meaning of the whole saving action.';writeState();});
  const legacy=await page.evaluate('JSON.stringify({forms:state.forms,digits:state.digits})');await page.reload();await page.locator('[data-action="resume"]').first().click();await stage(2);assert.equal(await page.evaluate('JSON.stringify({forms:state.forms,digits:state.digits})'),legacy);
  assert.equal(errors.length,0,errors.join('\n'));results.push(event+': all eight stages, neutral prompts, explicit event choices, timers and legacy-save preservation passed');await context.close();
 }
 const mobile=await browser.newContext({viewport:{width:375,height:812},isMobile:true,reducedMotion:'reduce'}),p=await mobile.newPage();await p.goto(url);await p.waitForSelector('#studentGuide');assert.ok(await p.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'Mobile page must not overflow horizontally');await p.screenshot({path:'test-output/mobile-guide.png',fullPage:true});await p.locator('[data-action="help"]').click();await p.waitForSelector('#dialog[open]');assert.match(await p.locator('#dialog').innerText(),/One event, four tasks/);await p.locator('#dialogClose').click();await p.goto(url+'?classroom=1');await p.waitForSelector('.teacher-page');assert.doesNotMatch(await p.locator('body').innerText(),/Original assignment questions|If One Piece Is Missing/i);results.push('375px mobile guide, guide dialog and classroom mode passed');await mobile.close();
 fs.writeFileSync('test-output/results.txt',results.join('\n')+'\n');console.log(results.join('\n'));
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
