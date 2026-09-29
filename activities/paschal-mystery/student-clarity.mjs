import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Script } from 'node:vm';
const directory=dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(join(directory,name),'utf8');
export function applyStudentClarity(html){
 let result=html;
 const rename=['header','footer','home','teacherPage','room','textfield','ratings','diagnosisRoom','evidenceRoom','mapRoom','recordRoom','skepticRoom','challengeRoom','finalRoom','damageMapChecks','mapChecklistHTML','updateMapChecklist','bindRoom','complete','action','report'];
 for(const name of rename){const pattern=new RegExp('function '+name+'\\(', 'g');const matches=[...result.matchAll(pattern)];if(matches.length!==1)throw Error('Student clarity expected one function '+name+', found '+matches.length);result=result.replace(pattern,'function legacy'+name.charAt(0).toUpperCase()+name.slice(1)+'(');}
 const startup='setInterval(updateTimers,200);\nrender();';
 if(result.split(startup).length!==2)throw Error('Student clarity startup anchor changed.');
 result=result.replace(startup,'setInterval(updateTimers,200);');
 const enhancement=['student-copy.js','student-guide.js','student-rooms.js','student-interactions.js'].map(read).join('\n');
 const closing=result.lastIndexOf('</script>');if(closing<0)throw Error('Missing application script.');
 result=result.slice(0,closing)+'\n'+enhancement.replaceAll('</script','<\\/script')+'\nrender();\n'+result.slice(closing);
 result=result.replace('<head>','<head><meta name="paschal-student-clarity" content="2026-09-29.2">');
 result=result.replace('Ask your teacher for the paper version of “If One Piece Is Missing.”','Ask your teacher for help opening the activity.');
 const css=`.guide-events{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:22px 0}.guide-events article{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:20px}.guide-events h3{font-size:19px;margin:7px 0 10px}.student-guide>h3{margin-top:26px}.student-guide p{max-width:80ch}.task-brief{border:1px solid var(--line);border-left:3px solid var(--gold);background:var(--panel);padding:20px 24px;border-radius:6px;margin:0 0 24px}.task-brief h3{font-size:18px;margin-bottom:8px}.task-brief ol{margin:12px 0 0;padding-left:23px;font-size:14px}.task-brief li{margin:8px 0;padding-left:5px}.event-choices{border:1px solid var(--line);border-radius:6px;background:var(--panel);padding:18px}.event-choice{display:flex;align-items:center;gap:9px;border:1px solid var(--line);padding:10px 14px;border-radius:5px;cursor:pointer;min-height:46px}.event-choice:has(input:checked){border-color:var(--gold);color:var(--gold);background:var(--gold-dark)}.selected-claim{padding:12px 15px;margin-top:16px;background:var(--card);border-left:3px solid var(--gold);font-size:13px}.case-reminder{display:flex;gap:8px;align-items:center;flex-wrap:wrap;color:var(--muted);font-size:13px}.case-reminder strong{color:var(--gold)}[data-inline-task-error]{scroll-margin-top:100px}textarea[aria-invalid=true],select[aria-invalid=true]{border-color:var(--red)}@media(max-width:740px){.guide-events{grid-template-columns:minmax(0,1fr)}.task-brief{padding:18px}.header-actions .btn{min-width:40px}.rating-options{flex-wrap:wrap}.rating-option{min-width:85px}.event-choice{font-size:13px}}`;
 result=result.replace('</head>','<style id="student-clarity-style">'+css+'</style></head>');
 const script=result.slice(result.indexOf('<script>')+8,result.lastIndexOf('</script>'));
 new Script(script,{filename:'paschal-student-clarity.js'});
 for(const id of ['studentGuide','connectionsTitle','data-event-selection','selected-claim'])if(!result.includes(id))throw Error('Missing student clarity interface: '+id);
 return result;
}
