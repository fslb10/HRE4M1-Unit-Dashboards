import assert from 'node:assert/strict';
import {damageMapChecks} from './damage-map-fix.mjs';
const events = ['Passion','Death','Resurrection','Ascension'];
const scenario = {map:{valid:[[0,0,0],[1,1,1]]}};
const text = 'This explanation uses the evidence from our investigation to explain why this specific connection follows in the account.';
function team(event='Passion') {
  return {event, map:[1,1,0], done:[0,1], stage:2, digits:['6','4','8','1'],
    forms:{mapWhy1:text,mapWhy2:text,mapOther:events.filter(e=>e!==event).slice(0,2).join(' and ')+' '+text}};
}
let assertions = 0;
for (const event of events) {
  for (const a of [0,1]) for (const b of [0,1]) for (const c of [0,1]) {
    const s=team(event);s.map=[a,b,c];
    assert.ok(damageMapChecks(s,scenario,events).every(x=>x.ok)); assertions++;
  }
  for (let i=0;i<3;i++) for (const bad of [null,2,4,'0',undefined]) {
    const s=team(event);s.map[i]=bad;
    const error=damageMapChecks(s,scenario,events).find(x=>!x.ok);
    assert.equal(error.target,'[data-map="'+i+'"]'); assertions++;
  }
}
const s=team();const snapshot=JSON.stringify(s);
assert.ok(damageMapChecks(s,scenario,events).every(x=>x.ok));
assert.equal(JSON.stringify(s),snapshot); assertions+=2;
for (const [field,minimum] of [['mapWhy1',15],['mapWhy2',15],['mapOther',20]]) {
  const t=team();t.forms[field]='brief response';
  const error=damageMapChecks(t,scenario,events).find(x=>!x.ok);
  assert.equal(error.target,'[data-field="'+field+'"]');assert.match(error.message,new RegExp('at least '+minimum)); assertions+=2;
}
const boundary=team();boundary.forms.mapWhy1=Array(15).fill('word').join(' ');
assert.ok(damageMapChecks(boundary,scenario,events).every(x=>x.ok));assertions++;
const one=team();one.forms.mapOther='Passion and Death '+text;
assert.ok(!damageMapChecks(one,scenario,events).at(-1).ok);assertions++;
const caseTest=team();caseTest.forms.mapOther='DEATH and RESURRECTION '+text;
assert.ok(damageMapChecks(caseTest,scenario,events).every(x=>x.ok));assertions++;
const substr=team();substr.forms.mapOther='deathless resurrectionist '+text;
assert.ok(!damageMapChecks(substr,scenario,events).at(-1).ok);assertions++;
console.log('Damage Map checks passed:',assertions,'assertions, all four scenarios, screenshot combination [1,1,0], distractors, missing writing, and unchanged saved state.');
