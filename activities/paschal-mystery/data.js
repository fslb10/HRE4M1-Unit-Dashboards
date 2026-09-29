/* Course content is paraphrased from HRE4M1, Unit 1.5 (resource pack pp. 37–44).
   Scripture links open the NRSV-CE. Invented archive claims are labelled as puzzle material. */
const EVENT_NAMES=['Passion','Death','Resurrection','Ascension'];
const BELIEFS=['Salvation','Forgiveness of sins','Victory over sin','Victory over death','Eternal life','Christian hope','Jesus’ identity','The Church’s mission','The meaning of suffering','Relationship with God'];
const RATINGS=['Unchanged','Damaged','Collapses'];
const STEPS=['Initial diagnosis','Evidence vault','Damage map','Contradiction files','The skeptic','Team challenge','Final vault','Group defence'];
const STEP_DESCS=['Predict the consequences','Separate evidence from noise','Trace what follows','Repair the record','Defend a difficult claim','Put another argument to the test','Reconsider. Reconnect. Restore.','90 seconds to make your case'];
const ROLE_NAMES=['Archivist','Scripture analyst','Connection analyst','Defender'];
const ROLE_DESCS=['Operates the device and records the team’s decisions.','Checks passages and explains why evidence matters.','Traces consequences and tests the links between them.','Organizes the argument; everyone helps answer challenges.'];
const COURSE='HRE4M1 resource pack, Unit 1.5';
const SCENARIOS={
 Passion:{
  label:'The cost of love',subtitle:'The suffering before the Cross has vanished.',symbol:'branch',
  briefing:'The archive retains Jesus’ Death, Resurrection, and Ascension, but the account of His Passion has disappeared. Investigate what is lost from the Christian understanding of His willing suffering and self-gift.',
  nuance:'The Passion culminates in Jesus’ Death. Separating them here is an analytical exercise, not a claim that they are independent events.',
  focus:'Why does Christ’s willing suffering matter to the meaning of His saving Death?',
  sources:'pp. 37–40',
  evidence:[
   {id:'P1',title:'The choice in the garden',body:'In Gethsemane, Jesus experiences anguish and prays in obedience to the Father. The course presents His Passion as suffering He freely accepts in love, not simply something that happens to Him.',source:COURSE+', pp. 38–39 (paraphrase)',passage:'Luke 22:39-46',kind:'evidence',feedback:'This directly supports the connection between suffering, freedom, obedience, and self-gift.'},
   {id:'P2',title:'A life freely given',body:'Jesus describes laying down His life willingly. The course uses this to distinguish His sacrifice from being only a tragic victim of circumstances.',source:COURSE+', p. 39 (paraphrase)',passage:'John 10:17-18',kind:'evidence',feedback:'Voluntary self-giving directly addresses what the Passion contributes to the meaning of His Death.'},
   {id:'P3',title:'Love that holds nothing back',body:'The Passion and Death together reveal the cost of sin and the depth of divine love. The course connects Christ’s willing suffering to His sacrifice for humanity.',source:COURSE+', pp. 39–40 (paraphrase)',passage:'John 15:12-13',kind:'evidence',feedback:'This is direct support for the focus question: the Passion reveals the love expressed in the Cross.'},
   {id:'P4',title:'A detail from the burial',body:'Joseph of Arimathea provides a tomb after Jesus dies. This is a detail of the burial account, rather than an explanation of His willing suffering before death.',source:COURSE+', p. 39 (paraphrase)',passage:'John 19:38-42',kind:'context',feedback:'True background information, but this detail does not directly explain willing suffering and self-gift.'},
   {id:'P5',title:'Forty days later',body:'The course places the Ascension forty days after the Resurrection. This identifies the sequence and timing of a later event.',source:COURSE+', p. 42 (paraphrase)',passage:'Acts 1:1-3',kind:'context',feedback:'Useful background for the whole sequence, not direct evidence about the meaning of the Passion.'},
   {id:'P6',title:'Pain is the saving power',body:'The more pain someone experiences, the more that pain automatically saves other people. Love and free self-giving are not important.',source:'Invented archive claim. This is NOT a quotation or Church teaching.',kind:'misleading',feedback:'The course emphasizes Christ’s unique, loving self-gift. It does not teach that pain automatically saves or that suffering should be sought for its own sake.'}
  ],
  map:{
   consequences:['The account loses Jesus’ willing acceptance of suffering','The cost of His self-giving becomes harder to explain','His words about love are erased from history'],
   beliefs:['The meaning of His Death as loving obedience is obscured','Christian reflection on suffering loses this concrete reference','The Resurrection becomes ordinary resuscitation'],
   life:['The Cross could be reduced to a tragedy without explaining His free self-gift','A class cannot use the Passion to explain how Christ enters suffering in love','Everyone must seek pain to imitate Jesus'],
   valid:[[0,0,0],[1,1,1]],
   prompts:['What has been removed from the account?','Which Christian meaning is affected by that loss?','How would that change the explanation someone gives?'],
   explanation:'The Passion reveals the willing love expressed in the Death of Christ. Without it, the archive’s explanation of sacrifice, obedience, and the meaning of suffering is damaged. Connect this to the Resurrection rather than treating suffering as the final word.'
  },
  records:[
   {id:'PX1',lines:['The archive still records Jesus’ Death.','His suffering was forced on Him, so His free self-giving has no place in the Christian explanation.','The group must distinguish an execution from the meaning of sacrifice.'],answer:1,task:'Repair the second sentence. Explain how freedom and love change the meaning of the suffering described in the Passion.',guide:'Use P1 or P2. The Passion is not presented as suffering with no willing response of love.'},
   {id:'PX2',lines:['The course links the Passion to the Death of Jesus.','The Resurrection is still listed in this damaged archive.','Removing the Passion proves that Jesus was never human.'],answer:2,task:'Repair the overclaim. Name a particular loss without pretending the Incarnation has also disappeared.',guide:'A missing account of the Passion damages our explanation of His suffering and self-gift; it is not evidence that He never became human.'}
  ],
  skeptic:'Jesus still died and rose. The suffering before His Death adds emotion, but no important theological meaning.',
  concession:'Which part of the skeptic’s observation about the remaining events is fair?',
  responseGuide:'Acknowledge that Death and Resurrection remain in the exercise. Explain what the Passion reveals about the willing love and obedience involved.',
  priority:'You are repairing a short explanation of the Cross for younger students. Which topic needs clarification first, and what would be misleading without the Passion?',
  challenge:'If Jesus’ Death remains in your archive, how can you explain it as a willing gift rather than only an execution?',
  defence:'Show why the Passion is more than the sad introduction to the Cross. Connect willing suffering to Death and to the victory of the Resurrection.',
  teacher:'Look for free self-gift, obedience, and love (pp. 38–40). Do not reward claims that pain is inherently good or that removing the Passion erases the Incarnation. The Passion and Death overlap; the exercise isolates aspects for analysis.'
 },
 Death:{
  label:'A life truly given',subtitle:'The Cross no longer ends in death.',symbol:'cross',
  briefing:'Jesus’ suffering remains in the archive, and later entries still announce a Resurrection and Ascension. But His Death has disappeared. Your team must find the contradictions and explain what the Cross means in the account studied in class.',
  nuance:'Ask what follows within the Christian account we studied. Do not turn the exercise into a claim that God has no freedom to save in any other conceivable way.',
  focus:'Why does the reality of Jesus’ Death matter to sacrifice, salvation, and Resurrection?',
  sources:'pp. 37–41',
  evidence:[
   {id:'D1',title:'He truly died',body:'The course explicitly states that Jesus truly died and was buried. Resurrection is therefore not recovery from an injury or the continuation of an uninterrupted earthly life.',source:COURSE+', pp. 39–40 (paraphrase)',passage:'John 19:28-37',kind:'evidence',feedback:'This directly establishes the reality of Death that the Resurrection presupposes.'},
   {id:'D2',title:'The sacrifice of the Cross',body:'Jesus’ Death is presented as His unique, once-for-all sacrifice for sins, bringing forgiveness and reconciliation with God.',source:COURSE+', p. 39 (paraphrase)',passage:'Romans 5:6-11',kind:'evidence',feedback:'The saving meaning of His Death is directly relevant, not merely the fact that it happened.'},
   {id:'D3',title:'Death and new life belong together',body:'The course connects Baptism to participation in Christ’s Death and Resurrection: dying to sin and rising to new life with Him.',source:COURSE+', pp. 41–42 (paraphrase)',passage:'Romans 6:3-4',kind:'evidence',feedback:'This directly links the reality of Death with Resurrection and the Christian understanding of new life.'},
   {id:'D4',title:'Where the apostles stand',body:'The course describes the apostles watching as Jesus ascends and then being addressed by angels. This supplies setting for a later event.',source:COURSE+', p. 42 (paraphrase)',passage:'Acts 1:9-11',kind:'context',feedback:'True context for the Ascension, but this location detail does not directly explain Jesus’ Death as sacrifice.'},
   {id:'D5',title:'A list of appearances',body:'The course names several people to whom the risen Jesus appears. Naming the witnesses is a historical detail, rather than a direct explanation of the saving meaning of His Death.',source:COURSE+', p. 40 (paraphrase)',passage:'1 Corinthians 15:5-8',kind:'context',feedback:'Background for the Resurrection. The card’s focus on names does not directly explain the role of Death in sacrifice or salvation.'},
   {id:'D6',title:'No death necessary for resurrection',body:'Jesus never died at all. Nevertheless, His Resurrection is literally His rising from the dead. These two statements are fully consistent.',source:'Invented archive claim. This is NOT a quotation or Church teaching.',kind:'misleading',feedback:'A resurrection from death presupposes death. This claim contradicts itself and the course’s explicit statement that Jesus truly died.'}
  ],
  map:{
   consequences:['Jesus never enters the reality of human death in this archive','The Cross is no longer recorded as His gift of life unto death','The disciples could never remember His teaching'],
   beliefs:['The later claim of Resurrection from death becomes incoherent','The course’s account of sacrifice and reconciliation is disrupted','The Ascension would become Jesus’ birth'],
   life:['A student cannot explain what Jesus rose from','A class cannot explain forgiveness through the sacrifice of the Cross as taught','All moral duties automatically disappear'],
   valid:[[0,0,0],[1,1,1]],
   prompts:['What does removing Death mean?','Which claim directly depends on that reality?','What could a Christian explanation no longer say coherently?'],
   explanation:'Death is real in the account, not a near-death experience. The course links His self-giving on the Cross to reconciliation with God and connects Death inseparably with Resurrection. Identify both the logical and the saving significance.'
  },
  records:[
   {id:'DX1',lines:['The archive records Jesus’ suffering.','Jesus rose from the dead although He never actually died.','The group is testing the relationship between the entries.'],answer:1,task:'Repair the contradiction. Explain what Resurrection from death presupposes.',guide:'Use D1 and D6. Recovery and resurrection from the dead are not the same claim.'},
   {id:'DX2',lines:['The course presents the Cross as self-giving love.','Jesus’ Death is described as a sacrifice for sins.','That saving meaning is unchanged even when the Death offered on the Cross is deleted.'],answer:2,task:'Replace the overclaim with a careful explanation of what is lost from the account of forgiveness and reconciliation.',guide:'Use D2. Do not jump from “the course’s account is disrupted” to speculation about everything God could possibly do.'}
  ],
  skeptic:'Jesus could still be an inspiring teacher without dying. His Death is unnecessary to everything Christians mean by salvation.',
  concession:'What can you fairly concede about moral teaching while still challenging the conclusion about salvation?',
  responseGuide:'Distinguish moral inspiration from the course’s claims about sacrifice, reconciliation, and rising from the dead.',
  priority:'A younger class is told that Jesus’ Death was just an unfortunate ending. Which topic would you clarify first to explain its saving meaning?',
  challenge:'If Jesus never truly died, what exactly does “rose from the dead” mean in your reconstructed account?',
  defence:'Explain both what is logically broken and what is lost from the saving meaning of the Cross. Connect Death to Passion and Resurrection.',
  teacher:'Look for real death, a freely offered sacrifice, reconciliation, and the logical dependence of resurrection from death (pp. 39–42). Distinguish an inspiring teacher from the full Christian account of salvation.'
 },
 Resurrection:{
  label:'Death is not the end',subtitle:'The tomb never opens.',symbol:'tomb',
  briefing:'The Passion and Death remain. Later entries still refer to Christian hope, new life, and the risen Lord. But the Resurrection has disappeared. Find which claims lose their foundation and show how the damage spreads.',
  nuance:'We are investigating Christian hope grounded in Christ’s victory. This is not a claim that people without this belief cannot feel hope, act morally, or live meaningful lives.',
  focus:'Why is the Resurrection more than an inspiring ending to Jesus’ story?',
  sources:'pp. 37–42',
  evidence:[
   {id:'R1',title:'Paul’s difficult counterfactual',body:'Paul connects the Resurrection directly with Christian preaching, faith, and freedom from sin. The course uses his argument to explain why removing the Resurrection changes more than a celebration.',source:COURSE+', p. 41; Scripture study prompt (paraphrase)',passage:'1 Corinthians 15:12-22',kind:'evidence',feedback:'This directly tests the consequences of no Resurrection for Christian faith, salvation, and hope.'},
   {id:'R2',title:'Not just resuscitation',body:'The course distinguishes Christ’s Resurrection from returning to ordinary mortal life. His humanity is glorified, opening the hope of a new, risen life for those who belong to Him.',source:COURSE+', pp. 40–41 (paraphrase)',passage:'1 Corinthians 15:20-22',kind:'evidence',feedback:'This directly explains the distinctive victory over death, not merely recovery or survival.'},
   {id:'R3',title:'The Cross and the victory',body:'The course says the Resurrection reveals the Cross as a path to glory rather than a final defeat. Christian proclamation is about the crucified Jesus who is risen Lord.',source:COURSE+', pp. 41–42 (paraphrase)',passage:'Luke 24:26-27',kind:'evidence',feedback:'This directly joins the meaning of Death to Resurrection and the Church’s proclamation.'},
   {id:'R4',title:'The owner of the tomb',body:'Joseph of Arimathea provides the tomb in which Jesus is buried. The detail identifies the burial location, not the theological meaning of rising to glorified life.',source:COURSE+', p. 39 (paraphrase)',passage:'John 19:38-42',kind:'context',feedback:'Useful narrative context, but ownership of the tomb does not explain what the Resurrection accomplishes.'},
   {id:'R5',title:'A devotional route',body:'The course describes the Stations of the Cross as a way to remember the Passion. Listing the stations supplies devotional background rather than an argument about the Resurrection.',source:COURSE+', p. 39 (paraphrase)',kind:'context',feedback:'Background, not false information. A list of stations by itself does not answer this room’s focus question.'},
   {id:'R6',title:'Only a memory survives',body:'The Resurrection means only that the disciples remembered Jesus fondly. The course makes no claim that Jesus bodily rose or that death was conquered.',source:'Invented archive claim. This is NOT a quotation or Church teaching.',kind:'misleading',feedback:'The course explicitly teaches a bodily, glorified Resurrection, not merely a lasting memory.'}
  ],
  map:{
   consequences:['The account no longer contains Christ’s risen victory over death','The crucified Jesus is no longer encountered as risen Lord in the archive','All human beings lose the capacity to hope'],
   beliefs:['The Christian promise of sharing His risen life loses its foundation in this event','The apostolic announcement that Jesus is risen becomes unsupported','Jesus’ moral teaching never existed'],
   life:['A Christian explanation of eternal life must be radically reconsidered','The Church cannot preach the same Easter message from these records','No one can perform any good action'],
   valid:[[0,0,0],[1,1,1]],
   prompts:['What is directly missing?','Which specifically Christian belief is affected?','How would proclamation or practice change?'],
   explanation:'The course connects Resurrection with victory over death, faith in Christ, and the hope of sharing His risen life. Moral teachings could still be remembered, but that is not the same as the full proclamation of the risen Lord.'
  },
  records:[
   {id:'RX1',lines:['The archive records that Jesus suffered and died.','There is no Resurrection, but the archive still proves that Jesus is alive in glorified bodily life.','His moral teachings could still be remembered.'],answer:1,task:'Repair the unsupported claim. Explain the difference between remembering Jesus and proclaiming Him risen.',guide:'Use R1 and R2. Keep the claim about bodily risen life distinct from inspiration or memory.'},
   {id:'RX2',lines:['The course grounds Christian hope in the risen Christ.','Removing the Resurrection affects this specifically Christian foundation.','Therefore no non-Christian person can have hope or act morally.'],answer:2,task:'Repair the overreach. Explain which kind of hope is being examined without making a claim about everyone else.',guide:'A consequence for a Christian theological claim is not a judgement about the character or experiences of people with other beliefs.'}
  ],
  skeptic:'Jesus taught love of neighbour. Those teachings can still inspire people, so Christianity would lose nothing essential without the Resurrection.',
  concession:'What is reasonable about the skeptic’s claim that teachings can still inspire people?',
  responseGuide:'Acknowledge the value of moral teaching. Then distinguish it from salvation, victory over death, and the hope of sharing Christ’s risen life.',
  priority:'A school display has room for only one urgently corrected explanation before class begins. Which topic is most affected by the missing Resurrection, and why?',
  challenge:'What is the difference between a community inspired by a dead teacher and a Church proclaiming the risen Lord?',
  defence:'Connect the Resurrection to the meaning of Death and to the Ascension of the risen Christ. Show why Christian hope is more than positive thinking.',
  teacher:'Look for 1 Corinthians 15, real glorified life rather than resuscitation, victory over death, the meaning of the Cross, and Christian hope (pp. 40–42). Do not accept claims that other people cannot hope or live morally.'
 },
 Ascension:{
  label:'Humanity in glory',subtitle:'The return to the Father is missing.',symbol:'rise',
  briefing:'The archive retains the Passion, Death, and Resurrection. The Ascension has disappeared. Your task is harder than saying “the sequence is incomplete”: explain the meaning of Christ’s exaltation, His humanity with the Father, and the Church’s mission.',
  nuance:'Do not assume the earlier events are erased or that the Church’s mission began from nothing at the Ascension. Identify what this event adds to the unified account.',
  focus:'What does the Ascension reveal beyond the fact that Jesus has risen?',
  sources:'pp. 42–44',
  evidence:[
   {id:'A1',title:'Our humanity with the Father',body:'The course describes the Ascension as the entrance of Jesus’ glorified humanity into the Father’s presence. In Christ, humanity is brought into heavenly glory.',source:COURSE+', pp. 43–44 (paraphrase)',passage:'Hebrews 9:24',kind:'evidence',feedback:'This directly identifies a theological meaning beyond simply ending visible appearances.'},
   {id:'A2',title:'Priest and advocate',body:'Jesus is presented as our High Priest and intercessor in the Father’s presence. His Ascension is not abandonment, but is linked to His continuing work on our behalf.',source:COURSE+', pp. 43–44 (paraphrase)',passage:'Hebrews 9:24-28',kind:'evidence',feedback:'Intercession explains His ongoing role and directly challenges the idea that He simply goes away.'},
   {id:'A3',title:'Witnesses, not spectators',body:'The Ascension account is connected with the promise of the Holy Spirit and the disciples’ calling to be witnesses. The course joins heavenly hope with the Church’s ongoing mission on earth.',source:COURSE+', pp. 43–44 (paraphrase)',passage:'Acts 1:6-11',kind:'evidence',feedback:'This directly connects the Ascension with mission and the promised Spirit without erasing the earlier calling of the disciples.'},
   {id:'A4',title:'A name in the burial record',body:'Joseph of Arimathea is named in the course’s account of Jesus’ burial. This identifies a person involved before the Resurrection.',source:COURSE+', p. 39 (paraphrase)',passage:'John 19:38-42',kind:'context',feedback:'A true narrative detail, but it does not directly explain the Ascension’s meaning.'},
   {id:'A5',title:'The third day',body:'The course places the Resurrection on the third day after the Crucifixion. The timing identifies that earlier event.',source:COURSE+', p. 40 (paraphrase)',passage:'Luke 24:1-7',kind:'context',feedback:'Background for the sequence. This timing alone does not explain exaltation, intercession, or mission.'},
   {id:'A6',title:'Humanity left behind',body:'At the Ascension, Jesus discards His humanity and stops caring about the world. His mission and presence have ended.',source:'Invented archive claim. This is NOT a quotation or Church teaching.',kind:'misleading',feedback:'The course explicitly affirms His glorified humanity, intercession, and continuing presence and mission. Ascension is not abandonment.'}
  ],
  map:{
   consequences:['The account loses the entrance of Christ’s glorified humanity into heavenly glory','The Ascension setting of the call to witness and promise of the Spirit is missing','The Resurrection is automatically undone'],
   beliefs:['Hope of following Christ into the Father’s presence loses this particular foundation','The account’s connection between exaltation and the Church’s mission is disrupted','Jesus must stop being human in order to reign'],
   life:['A Christian explanation of our heavenly destiny lacks an important part of the story','A class must reconsider how it explains Christ’s continuing work through His Church','There can never have been any earlier call to discipleship'],
   valid:[[0,0,0],[1,1,1]],
   prompts:['What specifically disappears, beyond the final step?','Which belief loses support from this event?','What would a Christian explanation need to reconsider?'],
   explanation:'The Ascension reveals Christ’s glorified humanity with the Father, His intercession and reign, and the Church’s mission in the promised Spirit. The earlier saving events remain in the thought experiment, but their fullness is not exhausted by “Jesus came back to life.”'
  },
  records:[
   {id:'AX1',lines:['The course says the risen Christ enters heavenly glory.','He brings His glorified humanity into the Father’s presence.','He therefore leaves His humanity behind and has no ongoing relationship with the world.'],answer:2,task:'Repair the contradiction. Explain how the Ascension concerns glorified humanity and ongoing intercession, not abandonment.',guide:'Use A1 and A2. Jesus’ humanity is not discarded.'},
   {id:'AX2',lines:['The archive retains the Passion, Death, and Resurrection.','Deleting the Ascension means that none of those earlier events happened and that the disciples were never called.','The group must explain the specific contribution of the Ascension.'],answer:1,task:'Repair the overclaim. Keep the earlier events while explaining a genuine loss concerning glory, intercession, or mission.',guide:'Do more than say “step four is missing,” but do not erase everything that came before it.'}
  ],
  skeptic:'The important part is that Jesus rose. The Ascension is only a departure scene, so it adds nothing to salvation or the Church’s life.',
  concession:'What can you acknowledge about the importance of the Resurrection without accepting “only a departure scene”?',
  responseGuide:'Explain glorified humanity in the Father’s presence, intercession, and the continuing mission of the Church. Identify connections, not a ranking of events.',
  priority:'A younger class thinks the Ascension means Jesus abandoned everyone. Which topic would you explain first, and how would you connect it to His continuing presence?',
  challenge:'What does the Ascension say about humanity’s destiny that “Jesus is alive again” does not fully explain?',
  defence:'Go beyond “the fourth step is missing.” Connect the Ascension to the Resurrection of the same Jesus who suffered and died, and explain glory, intercession, and mission.',
  teacher:'Look for glorified humanity with the Father, intercession, reign, hope of following Christ, and the Spirit-empowered mission (pp. 42–44). Reject both “nothing changes” and “all earlier events disappear.”'
 }
};
const HINTS={
 1:'Read the focus question carefully. Three cards directly answer it, two offer true but less relevant background, and one invents a claim that contradicts the course. “Background” does not mean false.',
 2:'Choose one theme and stay with it: a direct loss must lead to the matching belief, then to a matching practical effect. Reject options that erase unrelated earlier events or overclaim about other people. Explain WHY each arrow follows.',
 3:'Each file has one faulty sentence. Compare it with the course evidence, then replace the overclaim or contradiction with a precise statement. Do not erase events that your scenario retains.',
 4:'Start by conceding a reasonable observation. Then show why the conclusion goes too far. Name an evidence card and connect your event to another Paschal event. Your argument, not agreement with a button, is what matters.'
};
