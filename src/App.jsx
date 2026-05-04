import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Compass, ScrollText, BookMarked, GraduationCap, Search, Check, AlertCircle, X, ArrowRight, ArrowLeft, Sparkles, ChevronRight, ChevronDown, Library } from 'lucide-react';

// ==========================================================================
// DATA
// ==========================================================================

const CLUSTERS = {
  God:       { name: 'God',       label: 'On God',         accent: '#1e3a5f', soft: '#e8edf4', tag: '#1e3a5f' },
  Christ:    { name: 'Christ',    label: 'On Christ',      accent: '#8b4513', soft: '#f5ead6', tag: '#a0522d' },
  Humanity:  { name: 'Humanity',  label: 'On Humanity',    accent: '#3d5a3d', soft: '#e3ebd9', tag: '#4a6b4a' },
  Morality:  { name: 'Morality',  label: 'On Morality',    accent: '#4a3d5e', soft: '#e7dff0', tag: '#5d4d76' },
};

const LESSONS = [
  { id: '1.1', cluster: 'God', title: 'The Existence of God',
    question: 'Can the existence of God be reasoned to from the world we observe?',
    summary: 'Faith and science are not at war. They look at the same reality from different angles. This lesson explores three classic arguments for God: from the universe (cosmological), from design (teleological), and from morality.',
    bigIdeas: ['Faith and reason as two wings', 'Cosmological argument', 'Teleological argument', 'Moral argument', 'Fine-tuning of the universe'],
    scripture: ['Genesis 1:1', 'Romans 1:20', 'Romans 2:15', 'Hebrews 11:3', 'Psalm 19:1'],
  },
  { id: '1.2', cluster: 'God', title: 'Causation Theory',
    question: 'If every effect has a cause, what is the first cause, and how do divine and created causes relate?',
    summary: 'Christianity teaches God is the First Cause behind everything. But this does not turn humans into puppets. God works through real created causes including natural laws and human free will. Both are simultaneously true.',
    bigIdeas: ['First Cause / Uncaused Cause', 'Primary vs. Secondary Causation', 'Free Will as causal power', 'Divine Providence'],
    scripture: ['Genesis 1:1', 'Genesis 1:3', 'Acts 17:28', 'Romans 8:28'],
  },
  { id: '1.3', cluster: 'God', title: 'The Nature of God',
    question: 'Who is the God Christianity proclaims, and how can one God be Trinity?',
    summary: 'God is one, beyond all things (transcendent), yet present in all things (immanent), and a Trinity of three Persons in eternal love. The divine attributes (holy, all-knowing, all-powerful, personal) all converge in one truth: God is love.',
    bigIdeas: ['Monotheism', 'Transcendence and Immanence', 'Trinity', 'Divine Attributes', 'God is Love', 'Personal God'],
    scripture: ['Deuteronomy 6:4', 'Isaiah 6:3', 'Psalm 113:4', 'Psalm 139:7-10', 'Matthew 28:19', '1 John 4:8', 'John 3:16'],
  },
  { id: '1.4', cluster: 'Christ', title: 'The Incarnation',
    question: 'What does it mean that the Son of God became fully human while remaining fully divine?',
    summary: 'In Jesus, God took on human flesh. Jesus is one Person with two natures (fully God and fully man). This union is called the hypostatic union. The Word became flesh and lived among us.',
    bigIdeas: ['Incarnation', 'Hypostatic Union', "Mary's fiat"],
    scripture: ['John 1:1-14', 'Luke 1:26-38', 'Philippians 2:5-11', 'Colossians 1:15-20'],
  },
  { id: '1.5', cluster: 'Christ', title: 'The Paschal Mystery',
    question: 'How do Jesus\' Passion, Death, Resurrection, and Ascension save humanity?',
    summary: 'The Paschal Mystery is one event with four parts: Passion, Death, Resurrection, Ascension. Christ freely accepted suffering, offered the perfect sacrifice, conquered death, and opened heaven for us. This is the heart of Christian salvation.',
    bigIdeas: ['Paschal Mystery', 'Passion of Christ', 'Resurrection', 'Sacrifice of the New Covenant', 'Ascension'],
    scripture: ['Matthew 26-28', 'John 3:16-17', 'John 10:18', 'John 19:30', 'Romans 5:8', '1 Corinthians 15:3-8', 'Isaiah 53:5'],
  },
  { id: '1.6', cluster: 'Christ', title: 'One True Baptism',
    question: 'What does Baptism actually do, and why does the Church speak of one Baptism?',
    summary: 'Baptism is the gateway sacrament. It cleanses sin, gives new life as a child of God, and marks the soul permanently. Because the seal cannot be erased, Baptism is never repeated. There is one Lord, one faith, one Baptism.',
    bigIdeas: ['Baptism as sacrament', 'Indelible Spiritual Mark', 'Baptism of Desire and Blood', 'Trinitarian Formula', 'Unity of Baptism'],
    scripture: ['Matthew 28:19', 'John 3:5', 'Mark 16:16', 'Ephesians 4:5', '1 Corinthians 12:13', 'Titus 3:5', '2 Corinthians 5:17'],
  },
  { id: '1.7', cluster: 'Christ', title: 'Jesus: Prophet, King, Priest',
    question: 'How does Christ fulfill the threefold anointed mission, and how do the baptized share in it?',
    summary: 'Christ is the Anointed One. He is High Priest (offering himself in sacrifice), King (whose kingdom is service), and Prophet (the Word made flesh). Through Baptism, every Christian shares in this threefold mission.',
    bigIdeas: ['Triple Munera', 'Christ as High Priest', 'Christ as King (Servant Kingship)', 'Christ as Prophet'],
    scripture: ['Luke 4:18', 'John 18:36', 'Matthew 20:28', 'Hebrews 7:25', 'Hebrews 9:11-12', 'John 14:9', '1 Peter 2:9'],
  },
  { id: '1.8', cluster: 'Humanity', title: 'What Does It Mean to Be Human?',
    question: 'What gives every human being inherent dignity, and what is humanity for?',
    summary: 'Humans are made in the image of God (Imago Dei). This means we have intellect, free will, and the capacity for relationship. Every human life is sacred from conception to natural death. Each of us has a vocation, a unique calling.',
    bigIdeas: ['Imago Dei', 'Sanctity of Human Life', 'Human Dignity', 'Vocation', 'Need for Redemption'],
    scripture: ['Genesis 1:26-27', 'Genesis 2:7', 'Matthew 22:37-39', 'Matthew 25:40', 'Ephesians 2:10', '2 Corinthians 5:17'],
  },
  { id: '1.9', cluster: 'Humanity', title: 'The Soul: Immortal Essence',
    question: 'What is the human soul, and what difference does its immortality make for how we live?',
    summary: 'The soul is the spiritual principle that makes a human body alive and human. Body and soul together form one nature. The soul is immortal: when you die, you continue. This gives every human life eternal weight.',
    bigIdeas: ['Soul as Form of the Body', 'Body-Soul Unity', 'Immortality of the Soul', 'Eternal Destiny', 'Restless Heart (Augustine)'],
    scripture: ['Genesis 2:7', 'Matthew 10:28', 'Mark 8:36', 'Hebrews 4:12', 'Matthew 6:20'],
  },
  { id: '1.10', cluster: 'Morality', title: 'Faith and Reason',
    question: 'How do faith and reason work together rather than against each other?',
    summary: 'Faith and reason are like two wings on which we rise to truth. Reason can take you to the doorstep of God; faith carries you across. Truth cannot contradict truth, because all truth comes from God.',
    bigIdeas: ['Truth Cannot Contradict Truth', 'Faith as Theological Virtue', 'Reason as Natural Light', 'Preambles of Faith', 'Fides et Ratio'],
    scripture: ['Hebrews 11:1', 'John 20:24-29', 'Romans 1:20', 'Romans 12:2'],
  },
  { id: '1.11', cluster: 'Morality', title: 'Catholic Moral Objective Truth',
    question: 'Are some moral truths binding on everyone regardless of culture or opinion?',
    summary: 'Some moral truths are objective. They are true everywhere and for everyone, because they are rooted in God\'s unchanging nature. We know them through Scripture, Tradition, and Natural Law.',
    bigIdeas: ['Objective Moral Truth', 'Moral Relativism rejected', 'Three Pillars of Moral Knowledge', 'Natural Law', 'Intrinsic Evil'],
    scripture: ['Genesis 1:1', 'Romans 2:14-15', 'Exodus 20', 'Matthew 22:37-39'],
  },
  { id: '1.12', cluster: 'Morality', title: 'Conscience, Morality, and Ethics',
    question: 'How do conscience, morality, and ethics work together to guide right action?',
    summary: 'Conscience is the inner voice that applies moral truth to specific situations. It must be formed through Scripture, prayer, and Church teaching to be reliable. Morality is what you live; ethics is the systematic study of why.',
    bigIdeas: ['Conscience', 'Well-Formed Conscience', 'Morality vs. Ethics', 'Virtue Formation', 'Sheep and Goats Judgment'],
    scripture: ['Romans 2:14-16', 'John 14:15', 'Matthew 25:31-46', 'Acts 5:29'],
  },
];

const CONCEPTS = [
  { id: 'faith-reason', name: 'Faith and Reason', lesson: '1.1', cluster: 'God',
    short: 'Faith and reason are two wings on which we rise to truth. They never truly contradict each other.',
    why: 'This is the foundation of the whole unit. If faith and reason are enemies, none of the rest holds together.' },
  { id: 'cosmological', name: 'Cosmological Argument', lesson: '1.1', cluster: 'God',
    short: 'Argument from the existence of the universe to a First Cause beyond it.',
    why: 'The Big Bang itself suggests a beginning, which suggests a Beginner.' },
  { id: 'teleological', name: 'Teleological Argument', lesson: '1.1', cluster: 'God',
    short: 'Argument from the order, design, and purpose in nature to an Intelligent Designer.',
    why: 'DNA, fine-tuning, and ecosystems show staggering specificity that resists "random chance" explanations.' },
  { id: 'moral-arg', name: 'Moral Argument', lesson: '1.1', cluster: 'God',
    short: 'If objective moral truths exist, there must be a Moral Lawgiver. That Lawgiver is God.',
    why: 'Universal moral instincts (justice is good, cruelty is evil) are hard to explain by physics alone.' },
  { id: 'first-cause', name: 'First Cause', lesson: '1.2', cluster: 'God',
    short: 'God as the source of all causes, who is not himself caused.',
    why: 'Every chain of causes either goes back forever or terminates somewhere. Catholic thought says it terminates in God.' },
  { id: 'primary-secondary', name: 'Primary vs. Secondary Causation', lesson: '1.2', cluster: 'God',
    short: 'God works as primary cause through real created (secondary) causes, including natural laws and human choices.',
    why: 'This is why God being sovereign and you being free are both true at the same time.' },
  { id: 'free-will', name: 'Free Will', lesson: '1.2', cluster: 'God',
    short: 'The God-given power to make choices that produce real effects in the world.',
    why: 'Without free will, love is impossible. Love must be freely given.' },
  { id: 'providence', name: 'Divine Providence', lesson: '1.2', cluster: 'God',
    short: 'God\'s loving direction of all things toward good ends.',
    why: 'God is not a watchmaker who walked away. He is actively involved.' },
  { id: 'monotheism', name: 'Monotheism', lesson: '1.3', cluster: 'God',
    short: 'Belief in one God, the Creator of all.',
    why: 'There is only one true God, even though that God is Trinity.' },
  { id: 'transcendence', name: 'Transcendence', lesson: '1.3', cluster: 'God',
    short: 'God is wholly beyond and above creation.',
    why: 'God is not the biggest thing in the universe. He is fundamentally beyond it.' },
  { id: 'immanence', name: 'Immanence', lesson: '1.3', cluster: 'God',
    short: 'God is also present and active within creation.',
    why: 'God is not far away. Scripture says he is "closer to us than we are to ourselves."' },
  { id: 'trinity', name: 'Trinity', lesson: '1.3', cluster: 'God',
    short: 'One God in three Persons: Father, Son, and Holy Spirit.',
    why: 'This is the central mystery of Christian faith. Because God is Trinity, God is love in his very being.' },
  { id: 'divine-attrs', name: 'Divine Attributes', lesson: '1.3', cluster: 'God',
    short: 'Holiness, omnipresence, omniscience, omnipotence, and personal nature.',
    why: 'These are not separate things God has. They are different angles on who God is.' },
  { id: 'god-is-love', name: 'God is Love', lesson: '1.3', cluster: 'God',
    short: 'Love is central to who God is. Every other attribute is exercised in love.',
    why: '1 John 4:8 puts it bluntly: God is love. The Cross is proof.' },
  { id: 'personal-god', name: 'Personal God', lesson: '1.3', cluster: 'God',
    short: 'God is a "Someone" who knows, wills, and loves, not an impersonal force.',
    why: 'Prayer is conversation, not magic. Because God is personal, you can have a relationship with him.' },
  { id: 'incarnation', name: 'Incarnation', lesson: '1.4', cluster: 'Christ',
    short: 'The Son of God became human in Jesus Christ. The Word became flesh.',
    why: 'Christianity stands or falls on this. If Jesus is just a teacher, none of it works.' },
  { id: 'hypostatic', name: 'Hypostatic Union', lesson: '1.4', cluster: 'Christ',
    short: 'Jesus is one Person with two natures: fully God and fully human.',
    why: 'Jesus is not half-God, half-man. He is fully both, without either being diluted.' },
  { id: 'paschal-mystery', name: 'Paschal Mystery', lesson: '1.5', cluster: 'Christ',
    short: 'Christ\'s Passion, Death, Resurrection, and Ascension as one saving event.',
    why: 'You cannot understand Christianity without this. Every Mass makes this present.' },
  { id: 'passion', name: 'Passion of Christ', lesson: '1.5', cluster: 'Christ',
    short: 'The suffering Jesus freely accepted in his final hours, out of love.',
    why: 'Jesus did not die because he was caught. He chose to die.' },
  { id: 'resurrection', name: 'Resurrection', lesson: '1.5', cluster: 'Christ',
    short: 'Christ rose bodily from the dead on the third day.',
    why: 'Without the Resurrection, the Cross is just a tragedy. With it, the Cross is victory.' },
  { id: 'sacrifice-nc', name: 'Sacrifice of the New Covenant', lesson: '1.5', cluster: 'Christ',
    short: 'Christ\'s once-for-all self-offering on the Cross, fulfilling all earlier sacrifices.',
    why: 'No more animal sacrifices. One perfect offering, made present in every Eucharist.' },
  { id: 'baptism', name: 'Baptism', lesson: '1.6', cluster: 'Christ',
    short: 'The first sacrament, where you are cleansed of sin, reborn as God\'s child, and joined to the Church.',
    why: 'Jesus said "unless one is born of water and the Spirit." This is what he meant.' },
  { id: 'indelible-mark', name: 'Indelible Mark', lesson: '1.6', cluster: 'Christ',
    short: 'A permanent spiritual seal placed on the soul at Baptism. Cannot be undone.',
    why: 'Even if someone leaves the faith, the seal remains. This is why Baptism is never repeated.' },
  { id: 'one-baptism', name: 'One True Baptism', lesson: '1.6', cluster: 'Christ',
    short: 'Baptism is one sacrament shared across Christian denominations when validly performed.',
    why: '"One Lord, one faith, one Baptism." Even when Christians are divided, Baptism unites us.' },
  { id: 'triple-munera', name: 'Triple Munera (Priest, Prophet, King)', lesson: '1.7', cluster: 'Christ',
    short: 'Christ\'s threefold mission as priest, prophet, and king. Every baptized person shares in it.',
    why: 'Your Baptism actually gives you a share in Christ\'s job. This is why you are anointed with oil.' },
  { id: 'high-priest', name: 'Christ as High Priest', lesson: '1.7', cluster: 'Christ',
    short: 'Christ as the eternal priest who offers himself as the perfect sacrifice.',
    why: 'No human priest could pay the price for sin. Christ, both God and man, can.' },
  { id: 'servant-king', name: 'Servant Kingship', lesson: '1.7', cluster: 'Christ',
    short: 'Christ reigns by serving. "I came not to be served but to serve."',
    why: 'Jesus flips the cultural script. Real authority looks like washing feet.' },
  { id: 'prophet-word', name: 'Christ as Prophet', lesson: '1.7', cluster: 'Christ',
    short: 'Christ surpasses all prophets. He does not just speak God\'s word, he is the Word.',
    why: '"Whoever has seen me has seen the Father." Jesus is God\'s message in person.' },
  { id: 'imago-dei', name: 'Imago Dei', lesson: '1.8', cluster: 'Humanity',
    short: 'Every human is made in the image and likeness of God.',
    why: 'This is the basis for all human dignity and human rights. Your worth is not earned. It is given.' },
  { id: 'sanctity-life', name: 'Sanctity of Human Life', lesson: '1.8', cluster: 'Humanity',
    short: 'Every human life is sacred from conception to natural death.',
    why: 'You are not a thing. You are a someone, and so is every person you meet.' },
  { id: 'human-dignity', name: 'Human Dignity', lesson: '1.8', cluster: 'Humanity',
    short: 'The innate worth of every person, which cannot be lost.',
    why: 'Even a person who has done terrible things still has dignity. That is why we still owe them justice and love.' },
  { id: 'vocation', name: 'Vocation', lesson: '1.8', cluster: 'Humanity',
    short: 'God\'s personal call on your life. Your primary call is to love. Your specific call is unique.',
    why: 'You are not random. You were thought of, and you have something only you can do.' },
  { id: 'redemption-need', name: 'Need for Redemption', lesson: '1.8', cluster: 'Humanity',
    short: 'Humans cannot fix sin alone. We need a Savior.',
    why: 'Self-improvement has limits. Redemption is what self-improvement cannot reach.' },
  { id: 'soul-form', name: 'Soul as Form of the Body', lesson: '1.9', cluster: 'Humanity',
    short: 'The soul is what makes the body alive and human. Aquinas\'s definition.',
    why: 'You are not a soul trapped in a body. You are body and soul together as one.' },
  { id: 'body-soul', name: 'Body-Soul Unity', lesson: '1.9', cluster: 'Humanity',
    short: 'Humans are one nature: body and soul together.',
    why: 'Care for your body matters. So does care for your soul. They are not separate projects.' },
  { id: 'immortality', name: 'Immortality of the Soul', lesson: '1.9', cluster: 'Humanity',
    short: 'The soul does not die when the body dies.',
    why: 'Your story does not end at death. That changes the weight of the choices you make now.' },
  { id: 'eternal-destiny', name: 'Eternal Destiny', lesson: '1.9', cluster: 'Humanity',
    short: 'Each soul, after death, faces judgment leading to heaven or hell.',
    why: 'God respects your freedom forever. Heaven is the natural fulfillment of saying yes to him.' },
  { id: 'restless-heart', name: 'Restless Heart', lesson: '1.9', cluster: 'Humanity',
    short: 'Augustine: "Our hearts are restless until they rest in you."',
    why: 'Nothing in this world fully satisfies the soul. That ache is a clue, not a flaw.' },
  { id: 'truth-truth', name: 'Truth Cannot Contradict Truth', lesson: '1.10', cluster: 'Morality',
    short: 'All truth comes from God. So truths of faith and truths of reason cannot ultimately conflict.',
    why: 'If you find a real conflict, one of the two is being misread. The Church teaches: dig deeper.' },
  { id: 'faith-virtue', name: 'Faith as Theological Virtue', lesson: '1.10', cluster: 'Morality',
    short: 'Faith is a gift from God that lets us trust his revelation.',
    why: 'Faith is not pretending you have evidence. It is trust based on the trustworthiness of God.' },
  { id: 'reason-light', name: 'Reason as Natural Light', lesson: '1.10', cluster: 'Morality',
    short: 'The human capacity to think and reach truth, including knowledge of God\'s existence.',
    why: 'Catholic faith respects your mind. You are supposed to think.' },
  { id: 'preambles', name: 'Preambles of Faith', lesson: '1.10', cluster: 'Morality',
    short: 'Truths reachable by reason alone (e.g., God exists) that prepare the way for faith.',
    why: 'Reason gets you to the doorstep. Faith carries you across.' },
  { id: 'objective-moral', name: 'Objective Moral Truth', lesson: '1.11', cluster: 'Morality',
    short: 'Some moral truths are true for everyone, everywhere, regardless of opinion.',
    why: 'If morality were just opinion, you could not say slavery was wrong. You could only say you preferred otherwise.' },
  { id: 'relativism', name: 'Moral Relativism (rejected)', lesson: '1.11', cluster: 'Morality',
    short: 'The view that right and wrong are decided by individuals or cultures. Catholicism rejects this.',
    why: 'Tolerance of error is not the same as tolerance of persons. We can love people while disagreeing with them.' },
  { id: 'three-pillars', name: 'Three Pillars of Moral Knowledge', lesson: '1.11', cluster: 'Morality',
    short: 'Scripture, Tradition/Magisterium, and Natural Law.',
    why: 'These three sources work together. They never contradict, because they all point to the same God.' },
  { id: 'natural-law', name: 'Natural Law', lesson: '1.11', cluster: 'Morality',
    short: 'Moral truths knowable by human reason, written into our God-given nature.',
    why: 'You do not need to be Catholic to know that murder is wrong. That is natural law speaking.' },
  { id: 'intrinsic-evil', name: 'Intrinsic Evil', lesson: '1.11', cluster: 'Morality',
    short: 'An act that is wrong in itself, regardless of motive or context.',
    why: 'Some acts are always wrong. Good intentions do not change that.' },
  { id: 'conscience', name: 'Conscience', lesson: '1.12', cluster: 'Morality',
    short: 'The God-given inner judgment that applies moral truth to a specific situation.',
    why: 'Conscience is not a feeling. It is a faculty. It can be sharp, dull, or misinformed.' },
  { id: 'well-formed', name: 'Well-Formed Conscience', lesson: '1.12', cluster: 'Morality',
    short: 'A conscience educated by Scripture, Holy Spirit, Church teaching, prayer, and counsel.',
    why: '"Follow your conscience" only works if your conscience is actually formed. Otherwise it just confirms whatever you already wanted.' },
  { id: 'morality-ethics', name: 'Morality vs. Ethics', lesson: '1.12', cluster: 'Morality',
    short: 'Morality is what you live. Ethics is the systematic study of why.',
    why: 'Both matter. You need habits AND the ability to think through hard cases.' },
];

// Connections: A "depends on" / "grounds" / etc. B
const CONNECTIONS = [
  { a: 'imago-dei', rel: 'grounds', b: 'objective-moral', why: 'Because we are made in God\'s image, moral truth is built into human nature itself.' },
  { a: 'imago-dei', rel: 'grounds', b: 'reason-light', why: 'Reason is part of how we image God. Your mind is a divine gift.' },
  { a: 'imago-dei', rel: 'grounds', b: 'free-will', why: 'Free will is one of the spiritual capacities by which you image God.' },
  { a: 'trinity', rel: 'grounds', b: 'imago-dei', why: 'God is communion. We image him by being made for relationship.' },
  { a: 'god-is-love', rel: 'fulfills', b: 'paschal-mystery', why: 'The Cross is the most concrete proof of the claim that God is love.' },
  { a: 'trinity', rel: 'depends on', b: 'incarnation', why: 'We know God is Trinity because the Son was sent. Without the Incarnation, this stays hidden.' },
  { a: 'incarnation', rel: 'fulfills', b: 'immanence', why: 'God\'s presence in creation reaches its peak in the Word becoming flesh.' },
  { a: 'hypostatic', rel: 'depends on', b: 'high-priest', why: 'Only because Jesus is fully God AND fully man can he be the perfect mediator.' },
  { a: 'paschal-mystery', rel: 'grounds', b: 'baptism', why: 'Baptism applies Christ\'s saving work to your soul personally.' },
  { a: 'paschal-mystery', rel: 'fulfills', b: 'redemption-need', why: 'Humans cannot save themselves. The Paschal Mystery is the divine answer.' },
  { a: 'triple-munera', rel: 'depends on', b: 'baptism', why: 'You share in Christ\'s mission because you are baptized.' },
  { a: 'prophet-word', rel: 'fulfills', b: 'faith-virtue', why: 'Faith responds to a personal God who reveals himself. The ultimate revelation is Christ, the Word.' },
  { a: 'soul-form', rel: 'grounds', b: 'sanctity-life', why: 'Each soul is created directly by God. That is why every life is inviolable.' },
  { a: 'immortality', rel: 'grounds', b: 'eternal-destiny', why: 'If the soul did not survive death, your final destiny would have no subject.' },
  { a: 'free-will', rel: 'grounds', b: 'conscience', why: 'Conscience presupposes freedom. Without it, moral responsibility makes no sense.' },
  { a: 'natural-law', rel: 'depends on', b: 'reason-light', why: 'Natural law is moral truth knowable by reason. No reason, no natural law.' },
  { a: 'truth-truth', rel: 'grounds', b: 'three-pillars', why: 'Scripture, Tradition, and Natural Law all reach the same truth because they all come from one God.' },
  { a: 'moral-arg', rel: 'depends on', b: 'objective-moral', why: 'The moral argument for God needs there to be real moral truth. 1.11 supplies the content.' },
  { a: 'conscience', rel: 'depends on', b: 'natural-law', why: 'Conscience applies natural law to a specific moment. Without the law, conscience has nothing to apply.' },
  { a: 'well-formed', rel: 'depends on', b: 'three-pillars', why: 'Scripture, Tradition, and Natural Law are the formation tools.' },
  { a: 'cosmological', rel: 'illustrates', b: 'first-cause', why: 'The cosmological argument is one way of getting to the conclusion: there must be a First Cause.' },
  { a: 'faith-reason', rel: 'illustrates', b: 'truth-truth', why: '1.1 introduces the partnership; 1.10 names it as a principle.' },
  { a: 'personal-god', rel: 'grounds', b: 'vocation', why: 'A vocation requires someone to call you. Only a personal God can call.' },
  { a: 'resurrection', rel: 'grounds', b: 'eternal-destiny', why: 'Christian hope rests on Christ rising. Without it, talk of heaven is just speculation.' },
  { a: 'redemption-need', rel: 'fulfills', b: 'sacrifice-nc', why: 'The wound (sin) is met by the cure (Christ\'s once-for-all sacrifice).' },
  { a: 'reason-light', rel: 'fulfills', b: 'imago-dei', why: '1.10 develops what reason actually does. 1.8 names the gift.' },
];

const SCRIPTURES = [
  { ref: 'Genesis 1:1', testament: 'OT', lessons: ['1.1', '1.2', '1.11'], cluster: 'God', what: 'God as Creator. Universe has a beginning. God\'s authority over the moral order.' },
  { ref: 'Genesis 1:26-27', testament: 'OT', lessons: ['1.8'], cluster: 'Humanity', what: 'Humans created in God\'s image and likeness (Imago Dei).' },
  { ref: 'Genesis 2:7', testament: 'OT', lessons: ['1.8', '1.9'], cluster: 'Humanity', what: 'God breathes life into man. Foundation for the soul\'s direct creation by God.' },
  { ref: 'Genesis 22 (Aqedah)', testament: 'OT', lessons: ['1.10'], cluster: 'Morality', what: 'Abraham\'s faith in God\'s command. Model of trust beyond what reason can see.' },
  { ref: 'Exodus 20', testament: 'OT', lessons: ['1.8', '1.11'], cluster: 'Cross', what: 'The Ten Commandments. Basic moral framework.' },
  { ref: 'Deuteronomy 6:4 (Shema)', testament: 'OT', lessons: ['1.3'], cluster: 'God', what: '"Hear, O Israel: the LORD is our God, the LORD alone." Foundation of monotheism.' },
  { ref: 'Psalm 19:1', testament: 'OT', lessons: ['1.1'], cluster: 'God', what: '"The heavens declare the glory of God." Teleological argument basis.' },
  { ref: 'Psalm 23', testament: 'OT', lessons: ['1.3'], cluster: 'God', what: '"The Lord is my shepherd." Personal nature of God.' },
  { ref: 'Psalm 113:4', testament: 'OT', lessons: ['1.3'], cluster: 'God', what: 'God\'s glory above the heavens. Transcendence.' },
  { ref: 'Psalm 139:7-10', testament: 'OT', lessons: ['1.3'], cluster: 'God', what: '"Where can I go from your Spirit?" Omnipresence.' },
  { ref: 'Isaiah 6:3', testament: 'OT', lessons: ['1.3'], cluster: 'God', what: '"Holy, holy, holy is the Lord of hosts." Holiness.' },
  { ref: 'Isaiah 53:5', testament: 'OT', lessons: ['1.5'], cluster: 'Christ', what: '"He was wounded for our transgressions." Suffering Servant fulfilled in Christ.' },
  { ref: 'Matthew 10:28', testament: 'NT', lessons: ['1.9'], cluster: 'Humanity', what: '"Do not fear those who kill the body but cannot kill the soul." The soul endures.' },
  { ref: 'Matthew 20:28', testament: 'NT', lessons: ['1.7'], cluster: 'Christ', what: '"The Son of Man came not to be served but to serve." Servant kingship.' },
  { ref: 'Matthew 22:37-39', testament: 'NT', lessons: ['1.3', '1.8', '1.11'], cluster: 'Cross', what: 'Greatest commandments: love God, love neighbor.' },
  { ref: 'Matthew 25:31-46 (Sheep and Goats)', testament: 'NT', lessons: ['1.12'], cluster: 'Morality', what: 'How we treated "the least of these" is how we treated Christ.' },
  { ref: 'Matthew 26-28', testament: 'NT', lessons: ['1.5'], cluster: 'Christ', what: 'Passion, Death, Resurrection narrative.' },
  { ref: 'Matthew 28:19', testament: 'NT', lessons: ['1.3', '1.6'], cluster: 'Cross', what: '"Make disciples of all nations, baptizing them..." Trinitarian formula.' },
  { ref: 'Mark 8:36', testament: 'NT', lessons: ['1.9'], cluster: 'Humanity', what: '"What will it profit a man if he gains the whole world and forfeits his soul?"' },
  { ref: 'Luke 4:18', testament: 'NT', lessons: ['1.7'], cluster: 'Christ', what: '"The Spirit of the Lord is upon me, because he has anointed me." Triple munera.' },
  { ref: 'John 1:1-14', testament: 'NT', lessons: ['1.4', '1.7'], cluster: 'Christ', what: '"In the beginning was the Word... the Word became flesh." Incarnation.' },
  { ref: 'John 3:5', testament: 'NT', lessons: ['1.6'], cluster: 'Christ', what: '"Unless one is born of water and the Spirit." Necessity of Baptism.' },
  { ref: 'John 3:16-17', testament: 'NT', lessons: ['1.3', '1.5', '1.8'], cluster: 'Cross', what: '"God so loved the world that he gave his only Son."' },
  { ref: 'John 10:14-18', testament: 'NT', lessons: ['1.3', '1.5', '1.8'], cluster: 'Cross', what: 'Good Shepherd. "I lay down my life of my own accord."' },
  { ref: 'John 14:9', testament: 'NT', lessons: ['1.3', '1.7'], cluster: 'Cross', what: '"Whoever has seen me has seen the Father."' },
  { ref: 'John 14:15', testament: 'NT', lessons: ['1.12'], cluster: 'Morality', what: '"If you love me, keep my commandments."' },
  { ref: 'John 18:36', testament: 'NT', lessons: ['1.7'], cluster: 'Christ', what: '"My kingdom is not of this world."' },
  { ref: 'John 19:30', testament: 'NT', lessons: ['1.5'], cluster: 'Christ', what: '"It is finished." Mission completed at the Cross.' },
  { ref: 'John 20:24-29 (Thomas)', testament: 'NT', lessons: ['1.10'], cluster: 'Morality', what: '"Blessed are those who have not seen and yet have believed."' },
  { ref: 'Romans 1:20', testament: 'NT', lessons: ['1.1', '1.10'], cluster: 'Cross', what: 'God\'s invisible nature perceived through what is made.' },
  { ref: 'Romans 2:14-16', testament: 'NT', lessons: ['1.1', '1.11', '1.12'], cluster: 'Cross', what: 'Law written on the heart. Conscience bears witness.' },
  { ref: 'Romans 5:8', testament: 'NT', lessons: ['1.3', '1.5'], cluster: 'Cross', what: '"While we were still sinners Christ died for us." Unconditional love.' },
  { ref: '1 Corinthians 15:3-8', testament: 'NT', lessons: ['1.5'], cluster: 'Christ', what: 'Catalog of Resurrection appearances.' },
  { ref: '2 Corinthians 5:17', testament: 'NT', lessons: ['1.6', '1.8'], cluster: 'Cross', what: '"If anyone is in Christ, he is a new creation." Baptismal regeneration.' },
  { ref: 'Ephesians 2:10', testament: 'NT', lessons: ['1.8'], cluster: 'Humanity', what: '"God\'s handiwork, created in Christ Jesus for good works." Vocation.' },
  { ref: 'Ephesians 4:5', testament: 'NT', lessons: ['1.6'], cluster: 'Christ', what: '"One Lord, one faith, one Baptism." Unity of Baptism.' },
  { ref: 'Philippians 2:5-11', testament: 'NT', lessons: ['1.4'], cluster: 'Christ', what: 'Christ emptied himself, taking the form of a servant. Incarnation as kenosis.' },
  { ref: 'Hebrews 7:25', testament: 'NT', lessons: ['1.7'], cluster: 'Christ', what: '"He lives forever to make intercession." Christ\'s continuing priesthood.' },
  { ref: 'Hebrews 11:1', testament: 'NT', lessons: ['1.10'], cluster: 'Morality', what: '"Faith is the assurance of things hoped for, the conviction of things not seen."' },
  { ref: '1 Peter 2:9', testament: 'NT', lessons: ['1.7'], cluster: 'Christ', what: '"You are a chosen race, a royal priesthood." Triple munera for the baptized.' },
  { ref: '1 John 4:8, 16', testament: 'NT', lessons: ['1.3'], cluster: 'God', what: '"God is love."' },
];

const VIEWS = [
  { id: 'home',     label: 'Overview',         icon: Library },
  { id: 'lessons',  label: 'Lessons',          icon: BookOpen },
  { id: 'concepts', label: 'Concept Explorer', icon: Compass },
  { id: 'scripture',label: 'Scripture',        icon: ScrollText },
  { id: 'glossary', label: 'My Glossary',      icon: GraduationCap },
];

// ==========================================================================
// HOOKS
// ==========================================================================

function useStudyState() {
  const [understood, setUnderstood] = useState(new Set());
  const [needsReview, setNeedsReview] = useState(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const u = await window.storage.get('hre4m1.understood');
        if (u && u.value) setUnderstood(new Set(JSON.parse(u.value)));
      } catch (e) { /* not set yet */ }
      try {
        const r = await window.storage.get('hre4m1.review');
        if (r && r.value) setNeedsReview(new Set(JSON.parse(r.value)));
      } catch (e) { /* not set yet */ }
      setLoaded(true);
    })();
  }, []);

  const persist = async (key, set) => {
    try { await window.storage.set(`hre4m1.${key}`, JSON.stringify([...set])); } catch (e) {}
  };

  const markUnderstood = (id) => {
    const u = new Set(understood); u.add(id); setUnderstood(u); persist('understood', u);
    const r = new Set(needsReview); r.delete(id); setNeedsReview(r); persist('review', r);
  };
  const markReview = (id) => {
    const r = new Set(needsReview); r.add(id); setNeedsReview(r); persist('review', r);
    const u = new Set(understood); u.delete(id); setUnderstood(u); persist('understood', u);
  };
  const clearStatus = (id) => {
    const u = new Set(understood); u.delete(id); setUnderstood(u); persist('understood', u);
    const r = new Set(needsReview); r.delete(id); setNeedsReview(r); persist('review', r);
  };
  const reset = () => {
    setUnderstood(new Set()); persist('understood', new Set());
    setNeedsReview(new Set()); persist('review', new Set());
  };

  return { understood, needsReview, markUnderstood, markReview, clearStatus, reset, loaded };
}

// ==========================================================================
// SHARED UI
// ==========================================================================

const ClusterPill = ({ cluster, size = 'sm' }) => {
  const c = CLUSTERS[cluster] || { label: cluster, accent: '#888', soft: '#eee' };
  const px = size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';
  return (
    <span className={`${px} rounded-full uppercase tracking-[0.18em] font-semibold`}
          style={{ backgroundColor: c.soft, color: c.accent }}>
      {c.label || cluster}
    </span>
  );
};

const LessonNumber = ({ id, cluster }) => {
  const c = CLUSTERS[cluster];
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: c.accent }}>Unit</span>
      <span className="font-serif text-lg leading-none" style={{ color: c.accent }}>{id}</span>
    </div>
  );
};

const SectionHeader = ({ kicker, title, subtitle }) => (
  <div className="mb-8">
    {kicker && <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-stone-500 mb-3">{kicker}</div>}
    <h1 className="font-serif text-4xl md:text-5xl leading-tight text-stone-900 mb-3">{title}</h1>
    {subtitle && <p className="text-stone-600 max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

// ==========================================================================
// VIEW: HOME (OVERVIEW)
// ==========================================================================

function HomeView({ go, study }) {
  const stats = useMemo(() => {
    const total = CONCEPTS.length;
    const understood = CONCEPTS.filter(c => study.understood.has(c.id)).length;
    const review = CONCEPTS.filter(c => study.needsReview.has(c.id)).length;
    const pct = total ? Math.round((understood / total) * 100) : 0;
    return { total, understood, review, pct };
  }, [study]);

  const lessonsByCluster = useMemo(() => {
    const map = {};
    Object.keys(CLUSTERS).forEach(k => { map[k] = LESSONS.filter(l => l.cluster === k); });
    return map;
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <div className="text-[11px] uppercase tracking-[0.3em] font-semibold text-stone-500 mb-3">HRE4M1 . Grade 12 Religion</div>
        <h1 className="font-serif text-5xl md:text-6xl leading-[0.95] text-stone-900 mb-4">
          Unit 1
          <span className="block italic font-normal text-stone-500 mt-1">A Guide for the Curious</span>
        </h1>
        <p className="text-stone-600 max-w-xl leading-relaxed">
          Twelve lessons. Four big questions. One unit that ties them together. Use this as your study companion: explore concepts, search scripture, and track what you understand.
        </p>
      </div>

      {study.loaded && (
        <div className="mb-12 grid grid-cols-3 gap-3 md:gap-6 max-w-2xl">
          <div className="border border-stone-200 bg-white px-4 py-5 md:px-6 md:py-7">
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 mb-1">Concepts</div>
            <div className="font-serif text-3xl md:text-4xl text-stone-900">{stats.total}</div>
          </div>
          <div className="border border-stone-200 bg-white px-4 py-5 md:px-6 md:py-7">
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 mb-1">Understood</div>
            <div className="font-serif text-3xl md:text-4xl" style={{ color: '#3d5a3d' }}>{stats.understood}</div>
          </div>
          <div className="border border-stone-200 bg-white px-4 py-5 md:px-6 md:py-7">
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 mb-1">To Review</div>
            <div className="font-serif text-3xl md:text-4xl" style={{ color: '#8b4513' }}>{stats.review}</div>
          </div>
        </div>
      )}

      <div className="space-y-px mb-16">
        {Object.entries(CLUSTERS).map(([key, cluster]) => {
          const lessons = lessonsByCluster[key];
          return (
            <div key={key}
                 className="group bg-white border border-stone-200 hover:shadow-md transition-shadow"
                 style={{ borderLeftWidth: '4px', borderLeftColor: cluster.accent }}>
              <div className="p-5 md:p-7">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-1" style={{ color: cluster.accent }}>
                      {lessons.length} lessons
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-stone-900">{cluster.label}</h3>
                  </div>
                  <div className="font-serif italic text-stone-400 text-lg hidden md:block">
                    {lessons[0].id} . {lessons[lessons.length - 1].id}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {lessons.map(l => (
                    <button key={l.id}
                            onClick={() => go({ view: 'lessons', payload: l.id })}
                            className="flex items-baseline gap-3 text-left py-1.5 hover:bg-stone-50 px-2 -mx-2 transition-colors group/item">
                      <span className="font-mono text-xs text-stone-400 tabular-nums shrink-0 mt-0.5">{l.id}</span>
                      <span className="text-stone-700 group-hover/item:text-stone-900 leading-snug">{l.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-stone-300 pt-10">
        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-stone-500 mb-4">Where to Start</div>
        <div className="grid md:grid-cols-2 gap-4">
          <button onClick={() => go({ view: 'concepts' })}
                  className="text-left p-6 bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <Compass className="w-6 h-6" />
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 opacity-50 group-hover:opacity-100 transition-all" />
            </div>
            <div className="font-serif text-2xl mb-2">Explore Connections</div>
            <div className="text-stone-300 text-sm leading-relaxed">
              The killer feature. Tap any concept and see what it depends on, what depends on it, and where it shows up in scripture.
            </div>
          </button>
          <button onClick={() => go({ view: 'glossary' })}
                  className="text-left p-6 bg-white border border-stone-300 hover:border-stone-900 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <GraduationCap className="w-6 h-6 text-stone-700" />
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 opacity-50 group-hover:opacity-100 transition-all text-stone-700" />
            </div>
            <div className="font-serif text-2xl mb-2 text-stone-900">Build Your Glossary</div>
            <div className="text-stone-600 text-sm leading-relaxed">
              Mark each concept as understood or needs review. Your progress saves automatically and is here next time.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// VIEW: LESSONS
// ==========================================================================

function LessonsView({ payload, go }) {
  const [openId, setOpenId] = useState(payload || null);

  useEffect(() => { if (payload) setOpenId(payload); }, [payload]);

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader
        kicker="Twelve Lessons"
        title="The Unit, Lesson by Lesson"
        subtitle="Tap any lesson to expand. Every lesson has a core question, the big ideas, and the scripture you need to know."
      />

      <div className="border-t border-stone-200">
        {LESSONS.map((l, idx) => {
          const c = CLUSTERS[l.cluster];
          const isOpen = openId === l.id;
          return (
            <div key={l.id} className="border-b border-stone-200">
              <button onClick={() => setOpenId(isOpen ? null : l.id)}
                      className="w-full text-left py-5 md:py-6 hover:bg-white transition-colors flex items-center gap-5 group">
                <div className="shrink-0 w-12 md:w-16">
                  <div className="font-mono text-xs text-stone-400 mb-1">{l.id}</div>
                  <div className="h-1 w-6" style={{ backgroundColor: c.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-xl md:text-2xl text-stone-900 leading-tight mb-1">{l.title}</div>
                  <div className="text-sm text-stone-500 italic line-clamp-1 md:line-clamp-none">{l.question}</div>
                </div>
                <ChevronDown className={`w-5 h-5 text-stone-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="pb-8 pl-0 md:pl-[5.25rem] pr-2 animate-fadeIn">
                  <div className="bg-white border border-stone-200 p-5 md:p-7" style={{ borderLeftWidth: '3px', borderLeftColor: c.accent }}>
                    <div className="mb-5">
                      <ClusterPill cluster={l.cluster} />
                    </div>

                    <div className="font-serif text-xl md:text-2xl italic text-stone-900 mb-5 leading-snug">
                      "{l.question}"
                    </div>

                    <p className="text-stone-700 leading-relaxed mb-7">{l.summary}</p>

                    <div className="grid md:grid-cols-2 gap-7">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-500 mb-3">Big Ideas</div>
                        <ul className="space-y-2">
                          {l.bigIdeas.map((idea, i) => (
                            <li key={i} className="flex items-start gap-2 text-stone-800 text-sm leading-snug">
                              <span className="font-mono text-stone-400 text-xs mt-1">0{i+1}</span>
                              <span>{idea}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-500 mb-3">Scripture</div>
                        <div className="flex flex-wrap gap-1.5">
                          {l.scripture.map((s, i) => (
                            <button key={i}
                                    onClick={() => go({ view: 'scripture', payload: s })}
                                    className="text-xs px-2.5 py-1 border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-colors text-stone-700 italic">
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 pt-5 border-t border-stone-200 flex flex-wrap gap-3">
                      <button onClick={() => go({ view: 'concepts', payload: { lesson: l.id } })}
                              className="text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5">
                        Explore concepts in this lesson <ArrowRight className="w-3 h-3" />
                      </button>
                      {idx < LESSONS.length - 1 && (
                        <button onClick={() => setOpenId(LESSONS[idx + 1].id)}
                                className="text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5 ml-auto">
                          Next lesson <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================================================
// VIEW: CONCEPT EXPLORER
// ==========================================================================

function ConceptExplorerView({ payload, go, study }) {
  const initialId = (payload && payload.id) || (payload && payload.lesson ? CONCEPTS.find(c => c.lesson === payload.lesson)?.id : null) || CONCEPTS[0].id;
  const [activeId, setActiveId] = useState(initialId);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [lessonFilter, setLessonFilter] = useState(payload && payload.lesson ? payload.lesson : null);

  useEffect(() => {
    if (payload && payload.id) setActiveId(payload.id);
    if (payload && payload.lesson) {
      setLessonFilter(payload.lesson);
      const c = CONCEPTS.find(x => x.lesson === payload.lesson);
      if (c) setActiveId(c.id);
    }
  }, [payload]);

  const active = CONCEPTS.find(c => c.id === activeId);
  const activeCluster = active ? CLUSTERS[active.cluster] : null;

  // Connections involving the active concept
  const dependsOn = CONNECTIONS.filter(c => c.a === activeId && (c.rel === 'depends on' || c.rel === 'illustrates'));
  const grounds = CONNECTIONS.filter(c => c.a === activeId && (c.rel === 'grounds' || c.rel === 'fulfills'));
  const groundedBy = CONNECTIONS.filter(c => c.b === activeId && (c.rel === 'grounds' || c.rel === 'fulfills'));
  const dependedOnBy = CONNECTIONS.filter(c => c.b === activeId && (c.rel === 'depends on' || c.rel === 'illustrates'));

  // Scriptures that mention this lesson
  const relatedScripture = SCRIPTURES.filter(s => active && s.lessons.includes(active.lesson));

  const filteredConcepts = CONCEPTS.filter(c => {
    if (filter !== 'all' && c.cluster !== filter) return false;
    if (lessonFilter && c.lesson !== lessonFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.short.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const ConceptChip = ({ id, label, why, rel }) => {
    const c = CONCEPTS.find(x => x.id === id);
    if (!c) return null;
    const cl = CLUSTERS[c.cluster];
    return (
      <button onClick={() => setActiveId(id)}
              className="text-left bg-white border border-stone-200 hover:border-stone-900 p-4 transition-colors group block w-full">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="font-serif text-base text-stone-900 leading-tight">{c.name}</div>
          <ClusterPill cluster={c.cluster} />
        </div>
        {rel && (
          <div className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: cl.accent }}>
            {rel}
          </div>
        )}
        <div className="text-xs text-stone-600 leading-relaxed italic">{why}</div>
        <div className="mt-2 text-[10px] text-stone-400 font-mono">From {c.lesson}</div>
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        kicker="Concept Explorer"
        title="See How Everything Connects"
        subtitle="Tap any concept to see what it builds on and what builds on it. The connections are the architecture of the unit."
      />

      <div className="grid lg:grid-cols-[300px_1fr] gap-6 lg:gap-10">

        {/* Sidebar: concept list */}
        <div className="lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-hidden flex flex-col">
          <div className="space-y-3 mb-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search concepts..."
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 bg-white text-sm focus:outline-none focus:border-stone-900"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setFilter('all')}
                      className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border ${filter === 'all' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 text-stone-600 hover:border-stone-900'}`}>
                All
              </button>
              {Object.entries(CLUSTERS).map(([k, c]) => (
                <button key={k} onClick={() => setFilter(filter === k ? 'all' : k)}
                        className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border transition-colors`}
                        style={filter === k
                          ? { backgroundColor: c.accent, borderColor: c.accent, color: 'white' }
                          : { borderColor: '#d6d3d1', color: c.accent }}>
                  {k}
                </button>
              ))}
            </div>
            {lessonFilter && (
              <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 text-xs">
                <span className="text-stone-600">Lesson {lessonFilter} only</span>
                <button onClick={() => setLessonFilter(null)} className="ml-auto text-stone-500 hover:text-stone-900">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:overflow-y-auto lg:flex-1 space-y-1 pr-1 -mr-1">
            {filteredConcepts.map(c => {
              const isActive = c.id === activeId;
              const isUnderstood = study.understood.has(c.id);
              const needsR = study.needsReview.has(c.id);
              const cl = CLUSTERS[c.cluster];
              return (
                <button key={c.id} onClick={() => setActiveId(c.id)}
                        className={`w-full text-left px-3 py-2.5 transition-colors flex items-start gap-2.5 ${isActive ? 'bg-stone-900 text-white' : 'hover:bg-white'}`}>
                  <div className="w-1 self-stretch shrink-0 mt-1" style={{ backgroundColor: isActive ? '#fff' : cl.accent }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm leading-snug">{c.name}</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${isActive ? 'text-stone-400' : 'text-stone-400'}`}>{c.lesson}</div>
                  </div>
                  {isUnderstood && <Check className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: isActive ? '#86efac' : '#3d5a3d' }} />}
                  {needsR && <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: isActive ? '#fdba74' : '#8b4513' }} />}
                </button>
              );
            })}
            {filteredConcepts.length === 0 && (
              <div className="text-sm text-stone-500 italic p-4 text-center">No concepts match.</div>
            )}
          </div>
        </div>

        {/* Main: active concept */}
        <div>
          {active && (
            <div>
              <div className="bg-white border-l-4 p-6 md:p-10 mb-6" style={{ borderLeftColor: activeCluster.accent }}>
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <ClusterPill cluster={active.cluster} size="md" />
                  <button onClick={() => go({ view: 'lessons', payload: active.lesson })}
                          className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 hover:text-stone-900">
                    From Lesson {active.lesson} <ArrowRight className="w-3 h-3 inline ml-0.5" />
                  </button>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 leading-tight">{active.name}</h2>
                <p className="text-stone-700 text-lg leading-relaxed mb-5">{active.short}</p>
                <div className="border-t border-stone-200 pt-5">
                  <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 mb-2">Why It Matters</div>
                  <p className="font-serif text-lg italic text-stone-800 leading-relaxed">{active.why}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-stone-200 flex gap-2 flex-wrap">
                  <button onClick={() => study.markUnderstood(active.id)}
                          className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 border transition-colors ${study.understood.has(active.id) ? 'bg-emerald-900 text-white border-emerald-900' : 'border-stone-300 text-stone-700 hover:border-emerald-900 hover:text-emerald-900'}`}>
                    <Check className="w-3.5 h-3.5 inline mr-1.5" /> I understand this
                  </button>
                  <button onClick={() => study.markReview(active.id)}
                          className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 border transition-colors ${study.needsReview.has(active.id) ? 'bg-amber-900 text-white border-amber-900' : 'border-stone-300 text-stone-700 hover:border-amber-900 hover:text-amber-900'}`}>
                    <AlertCircle className="w-3.5 h-3.5 inline mr-1.5" /> Need to review
                  </button>
                </div>
              </div>

              {/* Connections */}
              <div className="space-y-6">
                {(groundedBy.length > 0 || dependsOn.length > 0) && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 mb-3 flex items-center gap-2">
                      <ArrowLeft className="w-3 h-3" /> Builds on these
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {groundedBy.map(c => <ConceptChip key={`gb-${c.a}`} id={c.a} why={c.why} rel={c.rel} />)}
                      {dependsOn.map(c => <ConceptChip key={`do-${c.b}`} id={c.b} why={c.why} rel={c.rel} />)}
                    </div>
                  </div>
                )}

                {(grounds.length > 0 || dependedOnBy.length > 0) && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 mb-3 flex items-center gap-2">
                      Leads to these <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {grounds.map(c => <ConceptChip key={`g-${c.b}`} id={c.b} why={c.why} rel={c.rel} />)}
                      {dependedOnBy.map(c => <ConceptChip key={`db-${c.a}`} id={c.a} why={c.why} rel={c.rel} />)}
                    </div>
                  </div>
                )}

                {groundedBy.length === 0 && dependsOn.length === 0 && grounds.length === 0 && dependedOnBy.length === 0 && (
                  <div className="bg-stone-100 p-6 text-stone-600 text-sm italic">
                    This concept stands on its own in the unit. It is foundational, or it is part of a list that does not have explicit cross-lesson links yet.
                  </div>
                )}

                {relatedScripture.length > 0 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 mb-3 flex items-center gap-2">
                      <ScrollText className="w-3 h-3" /> Scripture from this lesson
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedScripture.map((s, i) => (
                        <button key={i} onClick={() => go({ view: 'scripture', payload: s.ref })}
                                className="text-xs px-2.5 py-1 border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-colors text-stone-700 italic">
                          {s.ref}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// VIEW: SCRIPTURE
// ==========================================================================

function ScriptureView({ payload, go }) {
  const [search, setSearch] = useState('');
  const [testament, setTestament] = useState('all');
  const [lessonFilter, setLessonFilter] = useState('all');
  const [highlighted, setHighlighted] = useState(payload || null);

  useEffect(() => {
    if (payload) {
      setHighlighted(payload);
      const el = document.getElementById(`scripture-${payload}`);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }, [payload]);

  const filtered = SCRIPTURES.filter(s => {
    if (testament !== 'all' && s.testament !== testament) return false;
    if (lessonFilter !== 'all' && !s.lessons.includes(lessonFilter)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!s.ref.toLowerCase().includes(q) && !s.what.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader
        kicker="Scripture Map"
        title="Every Bible Passage in Unit 1"
        subtitle="Search by book, filter by lesson, or scan by testament. Each passage shows what it grounds in the unit."
      />

      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search by reference or topic..."
                 className="w-full pl-9 pr-3 py-3 border border-stone-300 bg-white focus:outline-none focus:border-stone-900" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['all', 'OT', 'NT'].map(t => (
            <button key={t} onClick={() => setTestament(t)}
                    className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 border transition-colors ${testament === t ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 text-stone-600 hover:border-stone-900'}`}>
              {t === 'all' ? 'All' : t === 'OT' ? 'Old Testament' : 'New Testament'}
            </button>
          ))}
          <select value={lessonFilter} onChange={e => setLessonFilter(e.target.value)}
                  className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 border border-stone-300 text-stone-600 bg-white">
            <option value="all">All lessons</option>
            {LESSONS.map(l => <option key={l.id} value={l.id}>Lesson {l.id}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(s => {
          const isHighlighted = highlighted === s.ref;
          const cl = CLUSTERS[s.cluster] || { accent: '#666', soft: '#eee' };
          return (
            <div key={s.ref} id={`scripture-${s.ref}`}
                 className={`bg-white border p-5 transition-all ${isHighlighted ? 'border-stone-900 shadow-lg' : 'border-stone-200'}`}
                 style={{ borderLeftWidth: '3px', borderLeftColor: cl.accent }}>
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-xl text-stone-900">{s.ref}</span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-stone-500">{s.testament}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.lessons.map(l => (
                    <button key={l} onClick={() => go({ view: 'lessons', payload: l })}
                            className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-600 transition-colors">
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">{s.what}</p>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-stone-100 p-8 text-center text-stone-500 italic">No passages match your filters.</div>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// VIEW: GLOSSARY (with self-check)
// ==========================================================================

function GlossaryView({ go, study }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | review | understood | unmarked

  const stats = useMemo(() => ({
    total: CONCEPTS.length,
    understood: CONCEPTS.filter(c => study.understood.has(c.id)).length,
    review: CONCEPTS.filter(c => study.needsReview.has(c.id)).length,
    unmarked: CONCEPTS.filter(c => !study.understood.has(c.id) && !study.needsReview.has(c.id)).length,
  }), [study]);

  const filtered = CONCEPTS.filter(c => {
    if (filter === 'review' && !study.needsReview.has(c.id)) return false;
    if (filter === 'understood' && !study.understood.has(c.id)) return false;
    if (filter === 'unmarked' && (study.understood.has(c.id) || study.needsReview.has(c.id))) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.short.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader
        kicker="My Glossary"
        title="Track What You Know"
        subtitle="Mark each concept as understood or needs review. Your progress saves automatically. Use the 'Needs review' filter when you study for the test."
      />

      <div className="grid grid-cols-4 gap-2 md:gap-3 mb-8">
        {[
          { id: 'all',        label: 'All',        count: stats.total,      color: '#1c1917' },
          { id: 'understood', label: 'Understood', count: stats.understood, color: '#3d5a3d' },
          { id: 'review',     label: 'Review',     count: stats.review,     color: '#8b4513' },
          { id: 'unmarked',   label: 'Unmarked',   count: stats.unmarked,   color: '#78716c' },
        ].map(b => (
          <button key={b.id} onClick={() => setFilter(b.id)}
                  className={`p-3 md:p-5 border text-left transition-all ${filter === b.id ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-900'}`}>
            <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: filter === b.id ? '#a8a29e' : b.color }}>{b.label}</div>
            <div className="font-serif text-2xl md:text-3xl">{b.count}</div>
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
               placeholder="Search the glossary..."
               className="w-full pl-9 pr-3 py-3 border border-stone-300 bg-white focus:outline-none focus:border-stone-900" />
      </div>

      <div className="space-y-2">
        {filtered.map(c => {
          const cl = CLUSTERS[c.cluster];
          const isU = study.understood.has(c.id);
          const isR = study.needsReview.has(c.id);
          return (
            <div key={c.id}
                 className="bg-white border border-stone-200 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:gap-5 md:items-start"
                 style={{ borderLeftWidth: '3px', borderLeftColor: cl.accent }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2.5 flex-wrap mb-1.5">
                  <button onClick={() => go({ view: 'concepts', payload: { id: c.id } })}
                          className="font-serif text-xl text-stone-900 hover:underline text-left">
                    {c.name}
                  </button>
                  <span className="text-[10px] font-mono text-stone-400">{c.lesson}</span>
                  <ClusterPill cluster={c.cluster} />
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{c.short}</p>
              </div>
              <div className="flex gap-1.5 shrink-0 md:flex-col md:gap-1">
                <button onClick={() => isU ? study.clearStatus(c.id) : study.markUnderstood(c.id)}
                        title="I understand this"
                        className={`p-2 border transition-colors ${isU ? 'bg-emerald-900 text-white border-emerald-900' : 'border-stone-300 text-stone-500 hover:border-emerald-900 hover:text-emerald-900'}`}>
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => isR ? study.clearStatus(c.id) : study.markReview(c.id)}
                        title="Need to review"
                        className={`p-2 border transition-colors ${isR ? 'bg-amber-900 text-white border-amber-900' : 'border-stone-300 text-stone-500 hover:border-amber-900 hover:text-amber-900'}`}>
                  <AlertCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-stone-100 p-8 text-center text-stone-500 italic">No concepts match.</div>
        )}
      </div>

      {(stats.understood + stats.review) > 0 && (
        <div className="mt-10 pt-6 border-t border-stone-200">
          <button onClick={() => { if (confirm('Reset all your progress? This cannot be undone.')) study.reset(); }}
                  className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-stone-900">
            Reset all progress
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// APP SHELL
// ==========================================================================

export default function App() {
  const [view, setView] = useState('home');
  const [payload, setPayload] = useState(null);
  const study = useStudyState();

  const go = ({ view: v, payload: p }) => {
    setView(v);
    setPayload(p || null);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2', color: '#1c1917' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        body, html, #root { background-color: #faf7f2; }
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; }
        .font-sans, body { font-family: 'Lora', Georgia, serif; }
        .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div className="lg:grid lg:grid-cols-[240px_1fr] min-h-screen">

        {/* Sidebar (desktop) / Top bar (mobile) */}
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-stone-200 lg:bg-white/40 lg:backdrop-blur-sm">
          <div className="hidden lg:flex lg:flex-col lg:h-full p-7">
            <div className="mb-10">
              <div className="text-[10px] uppercase tracking-[0.3em] font-semibold text-stone-500 mb-1">HRE4M1</div>
              <div className="font-serif text-3xl leading-none text-stone-900">Unit 1</div>
              <div className="font-serif italic text-stone-500 text-sm mt-1">Study Companion</div>
            </div>

            <nav className="flex flex-col gap-1">
              {VIEWS.map(v => {
                const Icon = v.icon;
                const active = view === v.id;
                return (
                  <button key={v.id} onClick={() => go({ view: v.id })}
                          className={`flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${active ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-700'}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{v.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-stone-200 text-[10px] text-stone-400 leading-relaxed">
              Your progress saves to this browser. Click any concept to explore.
            </div>
          </div>

          {/* Mobile top bar */}
          <div className="lg:hidden bg-white border-b border-stone-200 px-5 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <div className="text-[9px] uppercase tracking-[0.3em] font-semibold text-stone-500">HRE4M1</div>
              <div className="font-serif text-xl text-stone-900 leading-none mt-0.5">Unit 1</div>
            </div>
            <Sparkles className="w-4 h-4 text-stone-400" />
          </div>
        </aside>

        {/* Main */}
        <main className="px-5 md:px-10 lg:px-12 py-8 md:py-12 pb-32 lg:pb-12">
          {view === 'home'      && <HomeView go={go} study={study} />}
          {view === 'lessons'   && <LessonsView payload={payload} go={go} />}
          {view === 'concepts'  && <ConceptExplorerView payload={payload} go={go} study={study} />}
          {view === 'scripture' && <ScriptureView payload={payload} go={go} />}
          {view === 'glossary'  && <GlossaryView go={go} study={study} />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 grid grid-cols-5 z-20">
        {VIEWS.map(v => {
          const Icon = v.icon;
          const active = view === v.id;
          return (
            <button key={v.id} onClick={() => go({ view: v.id })}
                    className={`flex flex-col items-center gap-0.5 py-2.5 transition-colors ${active ? 'text-stone-900' : 'text-stone-400'}`}>
              <Icon className="w-4 h-4" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">{v.label.split(' ')[0]}</span>
              {active && <div className="absolute top-0 h-0.5 w-8 bg-stone-900" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
