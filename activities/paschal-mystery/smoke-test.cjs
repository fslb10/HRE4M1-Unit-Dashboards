const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const BASE = process.env.TEST_URL || 'http://127.0.0.1:8765';
const explanation = 'The evidence shows that the saving meaning changes because these events are connected rather than independent moments. We must explain this particular consequence carefully and avoid claiming that every other event disappears from the account.';
const connections = 'The Passion expresses free self giving and leads to Death, while the Resurrection reveals victory over death and the Ascension brings Christ in His glorified humanity into the presence of the Father. These connected events explain the one saving action and show why we cannot reduce this account to a moral example alone.';
(async () => {
 const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 for (const event of ['Passion','Death','Resurrection','Ascension']) {
  const context=await browser.newContext({viewport:{width:event==='Resurrection'?390:1365,height:960},reducedMotion:'reduce',acceptDownloads:true});
  const page=await context.newPage(); const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  const response=await page.goto(BASE); assert.equal(response.status(),200);
  await page.locator(`[data-case="${event}"]`).click();
  await page.locator('#teamName').fill('Browser test '+event);
  await page.locator('#period').selectOption('3'); await page.locator('#duration').selectOption('0');
  await page.locator('#startForm [type="submit"]').click();
  const title=()=>page.locator('#roomTitle').innerText();
  const fill=(k,v=explanation)=>page.locator(`[data-field="${k}"]`).fill(v);
  const next=async t=>{await page.locator('[data-action="complete"]').click();assert.equal(await title(),t);};
  assert.equal(await title(),'Initial diagnosis');
  assert(await page.locator('[data-stage="2"]').isDisabled());
  await page.locator('[data-action="complete"]').click(); assert.match(await page.locator('#roomFeedback').innerText(),/every belief/);
  for(let i=0;i<10;i++)await page.locator(`[data-belief="${i}"][data-value="Damaged"]`).click();
  await fill('prediction');await page.locator('[data-confidence="Fairly confident"]').click();await next('Evidence vault');
  await page.locator('[data-action="hint"]').click();assert.equal(await page.evaluate(()=>state.hints),2);
  await page.locator('[data-action="hint"]').click();assert.equal(await page.evaluate(()=>state.hints),2);
  await page.reload();await page.locator('[data-action="resume"]').click();assert.equal(await title(),'Evidence vault');
  const cards=await page.evaluate(()=>SCENARIOS[state.event].evidence.map(c=>({id:c.id,kind:c.kind})));
  for(const c of cards){await page.locator(`[data-open="${c.id}"]`).click();await page.locator(`[data-evidence="${c.id}"][data-kind="${c.kind}"]`).click();}
  await page.locator('[data-action="check-evidence"]').click();assert.match(await page.locator('#roomFeedback').innerText(),/All six/);
  const ev=cards.filter(c=>c.kind==='evidence').map(c=>c.id);
  await page.locator('[data-field="strongEvidence"]').selectOption(ev[0]);await page.locator('[data-field="secondEvidence"]').selectOption(ev[1]);await fill('evidenceReason');await next('Damage map');
  for(let i=0;i<3;i++)await page.locator(`[data-map="${i}"]`).selectOption(i===0?'2':'0');
  await fill('mapWhy1');await fill('mapWhy2');await fill('mapOther',connections);await page.locator('[data-action="complete"]').click();assert.match(await page.locator('#roomFeedback').innerText(),/one supported path/);
  for(let i=0;i<3;i++)await page.locator(`[data-map="${i}"]`).selectOption(event==='Ascension'?'1':'0');
  await next('Contradiction files');
  const correct=await page.evaluate(()=>SCENARIOS[state.event].records.map(r=>r.answer));
  for(let i=0;i<2;i++){await page.locator(`[data-record="${i}"][data-line="${correct[i]}"]`).click();await fill('repair'+i);}
  await next('The skeptic');await page.locator('[data-position="Partly agree"]').click();await fill('concession');await fill('rebuttal',explanation+' '+connections);await page.locator('[data-field="rebuttalEvidence"]').selectOption(ev[0]);await page.locator('[data-priority="Hope"]').click();await fill('priorityReason');await next('Team challenge');
  await page.locator('[data-field="recipient"]').selectOption(event==='Passion'?'Ascension':'Passion');await page.locator('[data-action="suggest-challenge"]').click();await page.locator('[data-check="challengeDelivered"]').check();await next('Final vault');
  for(let i=0;i<10;i++)await page.locator(`[data-belief="${i}"][data-value="Collapses"]`).click();
  await fill('revision');await fill('unity',connections);await page.locator('[data-check="reviewed"]').check();await fill('code','0000');await page.locator('[data-action="complete"]').click();assert.match(await page.locator('#roomFeedback').innerText(),/digits do not match/);
  await fill('code',await page.evaluate(()=>state.digits.join('')));await next('Group defence');assert.equal(await page.evaluate(()=>state.done.length),7);
  assert.equal(await page.locator('[data-timer-clock]').innerText(),'01:30');await page.locator('[data-action="timer-toggle"]').click();assert(await page.evaluate(()=>state.timer.running));await page.waitForTimeout(1100);assert.notEqual(await page.locator('[data-timer-clock]').innerText(),'01:30');await page.locator('[data-action="timer-toggle"]').click();
  await page.locator('[data-timer-phase="1"]').click();assert.equal(await page.locator('[data-timer-clock]').innerText(),'00:30');await page.locator('[data-timer-extended]').check();assert.equal(await page.locator('[data-timer-clock]').innerText(),'00:45');
  await page.locator('[data-action="finish"]').click();assert.equal(await page.evaluate(()=>state.done.length),8);
  const dl=page.waitForEvent('download');await page.locator('#room [data-action="export"]').click();assert((await dl).suggestedFilename().endsWith('-report.txt'));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.reload();await page.locator('[data-action="resume"]').click();assert.equal(await title(),'Group defence');assert.equal(await page.evaluate(()=>state.done.length),8);
  assert.equal(errors.length,0,errors.join('\n'));
  results.push({event,result:'PASS',nativeLocalStorageReload:true,mobile:event==='Resurrection',browserErrors:errors});
  await context.close();
 }
 const p=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await p.goto(BASE+'?classroom=1');assert.equal(await p.locator('h1').innerText(),'Bring the pieces together.');for(const ev of ['Passion','Death','Resurrection','Ascension'])await p.locator(`[data-restore="${ev}"]`).click();assert.equal(await p.evaluate(()=>teacher.restored.length),4);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.close();
 await browser.close();console.log(JSON.stringify({results,classroom:'PASS'},null,2));
})().catch(e=>{console.error(e);process.exit(1);});
