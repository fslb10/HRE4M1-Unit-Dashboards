/**
 * Small, deterministic repair over the checksum-verified classroom release.
 * Keeps every saved state/key and all evidence wording intact. The map checks
 * supported individual choices; the teacher evaluates the links students write.
 */
import { Script } from 'node:vm';

export function damageMapChecks(team, scenario, events) {
  const form = team.forms || {};
  const count = value => String(value || '').trim().split(/\s+/).filter(Boolean).length;
  const names = ['Direct consequence', 'Belief under pressure', 'Effect on explanation or practice'];
  const checks = names.map((name, i) => {
    const value = team.map?.[i];
    const selected = Number.isInteger(value);
    const supported = selected && scenario.map.valid.some(path => path[i] === value);
    return {ok: supported, target: '[data-map="' + i + '"]',
      label: name + (supported ? ': supported idea selected' : selected ? ': reconsider this choice' : ': select an idea'),
      message: selected
        ? 'Reconsider dropdown ' + (i + 1) + ' (' + name + '). That option makes a claim the case does not support. Your other selections and writing are still saved.'
        : 'Choose an option in dropdown ' + (i + 1) + ' (' + name + ').'};
  });
  for (const [key, minimum, label] of [
    ['mapWhy1', 15, 'First link explanation'],
    ['mapWhy2', 15, 'Second link explanation'],
    ['mapOther', 20, 'Connection to two other events']
  ]) {
    const total = count(form[key]);
    checks.push({ok: total >= minimum, target: '[data-field="' + key + '"]',
      label: label + ': ' + total + ' / ' + minimum + ' words minimum',
      message: 'Complete "' + label + '" below the map. It currently has ' + total + ' words and requires at least ' + minimum + '. This is a completeness check, not a grade.'});
  }
  const named = events.filter(event => event !== team.event && new RegExp('\\b' + event + '\\b', 'i').test(form.mapOther || ''));
  checks.push({ok: named.length >= 2, target: '[data-field="mapOther"]',
    label: 'Two OTHER events named: ' + (named.length ? named.join(', ') : 'none yet'),
    message: 'In the final explanation below the map, name at least TWO other Paschal events and explain their connections. Choose from ' + events.filter(event => event !== team.event).join(', ') + '.'});
  return checks;
}

function mapChecklistHTML() {
  const checks = damageMapChecks(state, SCENARIOS[state.event], EVENT_NAMES);
  const ready = checks.every(check => check.ok);
  return '<h3 id="mapChecklistTitle">' + (ready ? 'Ready to recover Seal II' : 'Before you recover Seal II') + '</h3>' +
    '<p class="fine muted">Complete the three dropdowns and all three written explanations. Different combinations of supported ideas are allowed. Explain why each link follows; your teacher reviews that reasoning.</p>' +
    checks.map(check => '<p class="fine" style="margin:7px 0"><span class="' + (check.ok ? 'gold' : 'muted') + '">' + (check.ok ? '✓ ' : '○ ') + esc(check.label) + '</span></p>').join('');
}

function updateMapChecklist() {
  if (view !== 'game' || state?.stage !== 2) return;
  const panel = document.getElementById('mapChecklist');
  if (panel) panel.innerHTML = mapChecklistHTML();
  const checks = damageMapChecks(state, SCENARIOS[state.event], EVENT_NAMES);
  for (const target of new Set(checks.map(check => check.target))) {
    const element = document.querySelector(target);
    if (checks.filter(check => check.target === target).every(check => check.ok)) element?.removeAttribute('aria-invalid');
  }
  for (const [key, minimum] of [['mapWhy1', 15], ['mapWhy2', 15], ['mapOther', 20]]) {
    const counter = document.querySelector('[data-count-for="' + key + '"]');
    if (counter) counter.textContent = words(state.forms[key]) + ' words · minimum ' + minimum;
  }
}

export function applyDamageMapFix(html) {
  let result = html;
  const replace = (oldText, newText) => {
    const at = result.indexOf(oldText);
    if (at < 0 || result.indexOf(oldText, at + oldText.length) !== -1) {
      throw new Error('Damage Map patch anchor changed: ' + oldText.slice(0, 90));
    }
    result = result.slice(0, at) + newText + result.slice(at + oldText.length);
  };
  // Fail closed if a future base release changes these boundaries.
  const from = result.indexOf(' if(n===2){');
  const to = result.indexOf('\n if(n===3){', from);
  if (from < 0 || to < from || !result.slice(from, to).includes('s.map.valid.some')) throw new Error('Damage Map validation branch not found.');
  replace(result.slice(from, to), ` if(n===2){const issue=damageMapChecks(state,s,EVENT_NAMES).find(check=>!check.ok);if(issue){fail(issue.message);const control=document.querySelector(issue.target);control?.setAttribute('aria-invalid','true');control?.focus({preventScroll:true});control?.scrollIntoView({behavior:'smooth',block:'center'});return;}}`);
  replace('Build a chain that answers “because of this, what follows?” The room contains two supported paths and several overclaims. Choose one coherent path, then explain its links.',
    'Build a chain that answers “because of this, what follows?” Choose supported ideas and avoid overclaims. More than one combination is possible. Complete all THREE explanations below the map to recover Seal II; your teacher reviews how well you justify the links.');
  const field = "${textfield('mapOther','Connect your missing event to TWO other Paschal events.','Name both other events and explain the relationships.',20)}</fieldset>";
  replace(field, field + '<section class="panel spaced" id="mapChecklist" aria-labelledby="mapChecklistTitle">${mapChecklistHTML()}</section>');
  replace('if(c)c.textContent=`${words(el.value)} words`;', 'if(c)c.textContent=`${words(el.value)} words`;if(state.stage===2)updateMapChecklist();');
  replace("el.closest('.map-layer').classList.toggle('active',el.value!=='');", "el.closest('.map-layer').classList.toggle('active',el.value!=='');updateMapChecklist();");
  replace(' if(state.stage===7)bindTimers();', ' if(state.stage===2)updateMapChecklist();\n if(state.stage===7)bindTimers();');
  replace('each case has two coherent paths, following either its first or second theme in the teaching notes. Choices are shuffled. Use the course evidence to match a direct consequence with its corresponding belief and practical effect. Other arguments can be discussed with the teacher.',
    'the map accepts combinations of supported ideas rather than only two exact sequences. It still rejects the distractor overclaims. Students must explain both links and connect two other events. The checklist checks completion, not whether the argument is sound; evaluate the written reasons during the defence.');
  replace('Choose one theme and stay with it: a direct loss must lead to the matching belief, then to a matching practical effect. Reject options that erase unrelated earlier events or overclaim about other people. Explain WHY each arrow follows.',
    'A direct loss should lead to an affected belief and then a practical effect. You may connect supported ideas in more than one way, but explain WHY each arrow follows. Reject overclaims. Complete both link explanations (15 words each) and the final connection (20 words, naming two OTHER events).');
  const helpers = [damageMapChecks, mapChecklistHTML, updateMapChecklist].map(fn => fn.toString()).join('\n');
  replace('\n</script></body></html>', '\n' + helpers + '\n</script></body></html>');
  replace('<head>', '<head><meta name="paschal-map-fix" content="2026-09-29.1">');
  const script = result.slice(result.indexOf('<script>') + 8, result.lastIndexOf('</script>'));
  new Script(script, {filename:'paschal-mystery.html'});
  return result;
}
