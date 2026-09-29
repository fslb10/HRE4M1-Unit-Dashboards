/* Student-facing wording revision. The class-note concepts, scenario IDs and answer indices are preserved for existing saves. */
const CLARITY_VERSION='2026-09-29.2';
const EVENT_HELP={
 Passion:'Jesus’ suffering at the end of His earthly life, including His willing acceptance of the Cross.',
 Death:'Jesus truly died on the Cross, giving His life for humanity.',
 Resurrection:'Jesus rose bodily from the dead into glorified life, overcoming death.',
 Ascension:'The risen Jesus entered the Father’s glory in His humanity. This connects with Christian hope and the Church’s continuing mission.'
};
STEPS.splice(0,8,'Make a prediction','Investigate the evidence','Connect the ideas','Check the claims','Answer the skeptic','Question another team','Restore the whole picture','Group defence');
STEP_DESCS.splice(0,8,'What might change if your event were missing?','Find information that helps explain why your event matters.','Build a diagram showing how one consequence leads to another.','Find and correct a mistaken statement in each explanation.','Respond to an objection using what you have learned.','Ask a different group a question about its reasoning.','Revisit your prediction and explain how all four events belong together.','Explain your conclusion in 90 seconds, then answer a question.');
ROLE_NAMES.splice(0,4,'Recorder','Evidence reader','Connection checker','Discussion leader');
ROLE_DESCS.splice(0,4,'Records the group’s shared answers. Rotate who uses the device.','Reads the information cards and Bible passages aloud.','Asks why each consequence follows from the previous idea.','Makes sure everyone contributes and helps organize the final defence.');
const CASE_BRIEF={
 Passion:'Imagine that Jesus’ Passion did not happen, while His Death and Resurrection remain in this thought experiment. What would be lost from the Christian understanding of His willing suffering, love, and self-gift?',
 Death:'Imagine that Jesus suffered but never truly died. What would be lost from the Christian understanding of His sacrifice? What problem would this create for the claim that He rose from the dead?',
 Resurrection:'Imagine that Jesus suffered and died, but did not rise from the dead. How would that affect the Christian understanding of salvation, victory over death, and eternal life?',
 Ascension:'Imagine that Jesus suffered, died, and rose, but did not ascend to the Father. What would be lost from the Christian understanding of His heavenly glory, continuing work, and the Church’s mission?'
};
const CARD_WORDING={
 Passion:[
 'In Gethsemane, Jesus faced anguish and prayed in obedience to the Father. He willingly accepted suffering in love.',
 'Jesus describes laying down His life freely. His sacrifice is more than something done to Him: it is also His willing gift.',
 'Jesus’ Passion and Death reveal the cost of sin and the depth of God’s love. His suffering is connected with His willing sacrifice for humanity.',
 'After Jesus died, Joseph of Arimathea provided a tomb for His burial.',
 'Jesus’ Ascension took place forty days after His Resurrection.',
 'Pain automatically saves other people. The more a person suffers, the more people that suffering saves, regardless of love or free choice.'
 ],
 Death:[
 'Jesus truly died and was buried. His Resurrection was not simply recovery from an injury or a temporary loss of consciousness.',
 'Jesus’ Death is His unique sacrifice for sins. His gift of His life brings forgiveness and reconciliation with God.',
 'Baptism is connected with sharing in Christ’s Death and Resurrection: dying to sin and rising to new life with Him.',
 'The apostles watched Jesus ascend and were then addressed by angels.',
 'The risen Jesus appeared to His followers on several occasions.',
 'Jesus never died, but He nevertheless rose from the dead. These two claims mean the same thing as the Christian teaching about His Death and Resurrection.'
 ],
 Resurrection:[
 'In 1 Corinthians 15, Paul asks what would follow if Christ had not been raised. He connects the Resurrection with Christian faith, freedom from sin, and hope for those who have died.',
 'Jesus’ Resurrection is not a return to ordinary mortal life. He rises in glorified humanity, opening the hope of sharing His risen life.',
 'The Resurrection changes how Christians understand the Cross: Jesus’ Death is not the final defeat. The crucified Jesus is proclaimed as the risen Lord.',
 'Joseph of Arimathea provided the tomb in which Jesus was buried.',
 'The Stations of the Cross are a devotion through which Christians remember Jesus’ Passion.',
 'The Resurrection means only that the disciples kept Jesus’ memory alive. It makes no claim that He bodily rose from the dead.'
 ],
 Ascension:[
 'At the Ascension, Jesus’ glorified humanity enters the Father’s presence. In Christ, humanity is brought into heavenly glory.',
 'Jesus continues to act as High Priest and intercessor in the Father’s presence. The Ascension is not abandonment of humanity.',
 'Acts 1 connects Jesus’ Ascension with the promise of the Holy Spirit and the disciples’ call to be witnesses. Heavenly hope and the Church’s work on earth belong together.',
 'Joseph of Arimathea helped with Jesus’ burial before the Resurrection.',
 'Jesus rose on the third day after His Crucifixion.',
 'At the Ascension, Jesus stopped being human and stopped caring about the world. His relationship with humanity ended.'
 ]
};
const CLAIM_SETS={
 Passion:[
  {context:'Someone has written an explanation of Jesus’ Passion. One of the three statements misrepresents His willing self-gift.',title:'Suffering and free choice',lines:['During His Passion, Jesus experienced real suffering.','Because other people caused His suffering, Jesus could not freely choose to give Himself in love.','His willing acceptance of suffering helps Christians understand His Death as loving obedience.']},
  {context:'Now consider what follows in your imaginary missing-Passion scenario. One statement claims more than the scenario supports.',title:'What can we conclude?',lines:['The Passion shows Jesus experiencing human suffering.','The Incarnation means that God the Son truly became human.','If the Passion did not happen, it would follow that Jesus had never become human.']}
 ],
 Death:[
  {context:'Someone is explaining the relationship between Jesus’ Death and Resurrection. Find the statement that does not make sense.',title:'Rising from what?',lines:['Resurrection from the dead involves someone who has truly died.','Jesus rose from the dead even though He never actually died.','Rising from death is different from recovering after losing consciousness.']},
  {context:'A group is considering what would be lost if Jesus never died. Check whether each statement follows from the Christian understanding of His sacrifice.',title:'More than an unfortunate ending',lines:['Jesus’ Death is understood as a freely offered gift of His life.','Christians connect His sacrifice on the Cross with forgiveness and reconciliation with God.','Removing His Death would leave that explanation of His sacrifice completely unchanged.']}
 ],
 Resurrection:[
  {context:'Someone has prepared this explanation of the Resurrection. One statement confuses remembering Jesus with proclaiming that He is risen.',title:'A memory or a risen life?',lines:['Jesus’ teaching can be remembered by His followers.','The Resurrection means only that people remembered Jesus, not that He bodily rose from the dead.','Christians proclaim that Jesus rose into glorified life.']},
  {context:'A group is considering Christian hope in a scenario without the Resurrection. One statement makes an unfair conclusion about other people.',title:'Which kind of hope?',lines:['Christian hope of sharing Christ’s risen life is grounded in His Resurrection.','Without the Resurrection, this particular foundation of Christian hope would be lost.','Therefore, people who do not believe in the Resurrection cannot have hope or act morally.']}
 ],
 Ascension:[
  {context:'Someone has written an explanation of the Ascension. One statement contradicts what Christians mean by Christ’s glorified humanity and continuing care.',title:'Glory or abandonment?',lines:['At the Ascension, Jesus entered the Father’s glory in His humanity.','Christians understand Jesus as continuing to intercede for humanity.','The Ascension means Jesus discarded His humanity and stopped caring about the world.']},
  {context:'Now consider your imaginary missing-Ascension scenario. Find the statement that incorrectly erases events that the scenario still includes.',title:'What remains, and what is missing?',lines:['In this scenario, Jesus’ Passion, Death, and Resurrection still happen.','If the Ascension is removed, the Passion, Death, and Resurrection must also be erased.','The group still needs to explain what the Ascension contributes to the whole Paschal Mystery.']}
 ]
};
function plainClassText(value){return String(value)
 .replace(/The course explicitly teaches/g,'As discussed in class, Christians believe')
 .replace(/The course explicitly states/g,'As discussed in class,')
 .replace(/The course (?:says|presents|describes|connects|links|emphasizes)/g,'Our class notes explain')
 .replace(/the course’s account/g,'the explanation discussed in class')
 .replace(/the course’s/g,'our class notes’')
 .replace(/the course/g,'our class notes')
 .replace(/The course/g,'Our class notes')
 .replace(/the archive’s explanation/g,'the explanation')
 .replace(/in this archive/g,'in this imagined scenario')
 .replace(/in the archive/g,'in this imagined scenario')
 .replace(/from the archive/g,'from the imagined scenario')
 .replace(/The account loses/g,'The imagined scenario no longer includes')
 .replace(/The account no longer contains/g,'The imagined scenario no longer includes')
 .replace(/the account’s connection/g,'the connection')
 .replace(/The archive/g,'The imagined scenario');}
for(const event of EVENT_NAMES){
 const s=SCENARIOS[event];s.briefing=CASE_BRIEF[event];
 s.evidence.forEach((card,i)=>{card.body=CARD_WORDING[event][i];card.source=card.kind==='misleading'?'A statement to evaluate using your class notes.':'Class notes: the Paschal Mystery (summary).';card.feedback=plainClassText(card.feedback);});
 s.records.forEach((record,i)=>{Object.assign(record,CLAIM_SETS[event][i]);record.task='Select the mistaken statement. Rewrite it accurately, then explain why your correction matters. Use a specific idea from the information cards or class notes.';record.guide=plainClassText(record.guide);});
 for(const key of ['consequences','beliefs','life','prompts'])s.map[key]=s.map[key].map(plainClassText);
 s.map.explanation=plainClassText(s.map.explanation);
 for(const key of ['focus','nuance','skeptic','concession','responseGuide','priority','challenge','defence','teacher'])s[key]=plainClassText(s[key]);
}
SCENARIOS.Passion.map.consequences[0]='Jesus’ willing acceptance of suffering is missing';
SCENARIOS.Passion.map.beliefs[1]='Christians lose this example of God entering human suffering';
SCENARIOS.Passion.map.life[0]='People could describe the Cross only as a tragedy, overlooking His willing self-gift';
SCENARIOS.Death.map.beliefs[1]='The explanation of sacrifice and reconciliation with God is disrupted';
SCENARIOS.Ascension.map.consequences[0]='Jesus’ glorified humanity entering the Father’s presence is missing';
SCENARIOS.Ascension.map.consequences[1]='The link between His Ascension, the promised Spirit, and the call to witness is missing';
HINTS[1]='Start with the question above the cards. Three cards directly help answer it, two provide true background details, and one contains a misleading claim. A true fact is not always the strongest evidence for this particular question.';
HINTS[2]='Read the three boxes as one sentence: “Without this event, ___; this affects ___; so ___.” Explain both arrows. Then select two OTHER Paschal events using the checkboxes and explain their connections in the final response.';
HINTS[3]='Check each statement against the information cards and class notes. Look for a contradiction, a misleading definition, or a conclusion that goes too far. Select only the mistaken statement, then correct that statement and explain why.';
HINTS[4]='An objection can contain a fair observation and still reach the wrong conclusion. Acknowledge the fair part, then explain what it leaves out. Support your answer with a specific evidence card.';
function ensureClarityState(){
 if(!state)return;
 if(!Array.isArray(state.linkedEvents))state.linkedEvents=EVENT_NAMES.filter(e=>e!==state.event&&String(state.forms.mapOther||'').toLowerCase().includes(e.toLowerCase()));
 state.linkedEvents=[...new Set(state.linkedEvents.filter(e=>EVENT_NAMES.includes(e)&&e!==state.event))];
 if(!Array.isArray(state.unityEvents))state.unityEvents=EVENT_NAMES.filter(e=>String(state.forms.unity||'').toLowerCase().includes(e.toLowerCase()));
 state.unityEvents=[...new Set(state.unityEvents.filter(e=>EVENT_NAMES.includes(e)))];
}
ensureClarityState();
