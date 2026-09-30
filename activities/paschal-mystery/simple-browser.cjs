const { chromium } = require('playwright');
const http = require('node:http');

(async()=>{
  const { buildPaschalArchive } = await import('./build.mjs');
  const html = buildPaschalArchive();
  const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html; charset=utf-8'});
    res.end(html);
  });
  await new Promise(r=>server.listen(4179,'127.0.0.1',r));
  const browser = await chromium.launch({headless:true});
  const events=['Passion','Death','Resurrection','Ascension'];
  const filler='This choice matters because removing the event changes how Christians understand salvation and the relationship between the connected Paschal events.';
  const chainText='The first idea leads to the second because the missing event carries a specific theological meaning, and that changed meaning affects the Christian explanation that follows from it.';
  const evidenceText='This evidence directly supports our argument because it explains the theological meaning of the event and shows why removing it changes the larger Paschal Mystery.';
  const concession='The objection is partly fair because some teachings and events would still remain in the thought experiment.';
  const correction='However, it misses the specific saving meaning of this event and how that meaning connects with the other parts of the Paschal Mystery.';
  const synthesis='These two events connect with our missing event because the Paschal Mystery moves through sacrifice, victory, glory, and mission as one united saving action.';

  for(const event of events){
    const ctx=await browser.newContext({viewport:{width:1280,height:900}});
    const page=await ctx.newPage();
    await page.goto('http://127.0.0.1:4179/');
    await page.locator('[data-event="'+event+'"]').click();
    await page.fill('#teamName','QA '+event);
    await page.selectOption('#period','3');
    await page.locator('#startForm button[type="submit"]').click();

    await page.locator('[data-choice="stage1"]').first().click();
    await page.fill('[data-field="stage1Why"]',filler);
    await page.locator('[data-action="continue"]').click();

    const correct=await page.evaluate(()=>({direct:EVENT_DATA[state.event].directChoice,belief:EVENT_DATA[state.event].beliefChoice,result:EVENT_DATA[state.event].resultChoice}));
    await page.selectOption('[data-chain="0"]',{label:correct.direct});
    await page.selectOption('[data-chain="1"]',{label:correct.belief});
    await page.selectOption('[data-chain="2"]',{label:correct.result});
    await page.fill('[data-field="chainWhy"]',chainText);
    await page.locator('[data-action="continue"]').click();

    const misleading=await page.evaluate(()=>EVENT_DATA[state.event].evidence.find(e=>e.misleading).id);
    await page.locator('[data-evidence-misleading="'+misleading+'"]').click();
    await page.selectOption('[data-field-select="evidenceStrong"]','A');
    await page.fill('[data-field="evidenceWhy"]',evidenceText);
    await page.locator('[data-action="continue"]').click();

    await page.fill('[data-field="concession"]',concession);
    await page.fill('[data-field="correction"]',correction);
    await page.locator('[data-link-event]').nth(0).click();
    await page.locator('[data-link-event]').nth(1).click();
    await page.fill('[data-field="synthesis"]',synthesis);
    await page.locator('[data-action="continue"]').click();

    if(!(await page.getByText('Make your case in 90 seconds.').isVisible())) throw new Error(event+' did not reach defence');
    if((await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth))) throw new Error(event+' desktop overflow');
    await page.setViewportSize({width:375,height:800});
    if((await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth))) throw new Error(event+' mobile overflow');
    await page.reload();
    if(!(await page.getByText('Make your case in 90 seconds.').isVisible())) throw new Error(event+' save did not restore');
    await ctx.close();
  }

  const ctx=await browser.newContext();
  const page=await ctx.newPage();
  await page.goto('http://127.0.0.1:4179/');
  await page.locator('[data-event="Resurrection"]').click();
  await page.fill('#teamName','Wrong-chain QA');
  await page.locator('#startForm button[type="submit"]').click();
  await page.locator('[data-choice="stage1"]').first().click();
  await page.fill('[data-field="stage1Why"]',filler);
  await page.locator('[data-action="continue"]').click();
  await page.selectOption('[data-chain="0"]',{index:1});
  await page.fill('[data-field="chainWhy"]',chainText);
  await page.locator('[data-action="continue"]').click();
  if(!(await page.locator('.notice.error').isVisible())) throw new Error('Wrong chain did not show a clear error');

  await browser.close();
  server.close();
  console.log('Simplified Paschal Mystery browser checks passed.');
})().catch(err=>{console.error(err);process.exit(1);});
