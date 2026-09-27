import { Post, VideoNews, Category, ReporterApplication, Reporter, IdCardRecord, ContactMessage, AdvertisementEnquiry, SiteSettings } from '../types/index';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Uttar Pradesh', nameHindi: 'उत्तर प्रदेश', slug: 'uttar-pradesh', description: 'उत्तर प्रदेश की प्रमुख एवं ताज़ा खबरें', order: 1, color: '#C8102E' },
  { id: 'cat-2', name: 'Prayagraj', nameHindi: 'प्रयागराज', slug: 'prayagraj', description: 'प्रयागराज जनपद, संगम और स्थानीय समाचार', order: 2, color: '#990000' },
  { id: 'cat-3', name: 'India', nameHindi: 'देश / राष्ट्रीय', slug: 'india', description: 'भारत और राष्ट्रीय स्तर की महत्वपूर्ण खबरें', order: 3, color: '#D32F2F' },
  { id: 'cat-4', name: 'Politics', nameHindi: 'राजनीति', slug: 'politics', description: 'राजनीतिक हलचल, चुनाव और नीतिगत निर्णय', order: 4, color: '#B71C1C' },
  { id: 'cat-5', name: 'Crime', nameHindi: 'अपराध', slug: 'crime', description: 'कानून व्यवस्था और पुलिस प्रशासन से जुड़े समाचार', order: 5, color: '#880E4F' },
  { id: 'cat-6', name: 'Business', nameHindi: 'व्यापार / अर्थव्यवस्था', slug: 'business', description: 'बाजार, अर्थव्यवस्था और उद्योग जगत', order: 6, color: '#1B5E20' },
  { id: 'cat-7', name: 'Sports', nameHindi: 'खेल', slug: 'sports', description: 'क्रिकेट और अन्य खेल जगत की प्रमुख खबरें', order: 7, color: '#0D47A1' },
  { id: 'cat-8', name: 'Entertainment', nameHindi: 'मनोरंजन', slug: 'entertainment', description: 'सिनेमा, संस्कृति और मनोरंजन संसार', order: 8, color: '#4A148C' },
  { id: 'cat-9', name: 'Technology', nameHindi: 'तकनीक', slug: 'technology', description: 'डिजिटल इंडिया, गैजेट्स और विज्ञान', order: 9, color: '#006064' },
  { id: 'cat-10', name: 'Education', nameHindi: 'शिक्षा / रोज़गार', slug: 'education', description: 'परीक्षाएं, परिणाम, भर्तियां एवं छात्र कल्याण', order: 10, color: '#E65100' },
  { id: 'cat-11', name: 'Health', nameHindi: 'स्वास्थ्य', slug: 'health', description: 'चिकित्सा, सेहत और जनस्वास्थ्य अपडेट्स', order: 11, color: '#004D40' },
  { id: 'cat-12', name: 'World', nameHindi: 'दुनिया', slug: 'world', description: 'अंतर्राष्ट्रीय संबंध और वैश्विक घटनाएं', order: 12, color: '#263238' },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Prayagraj Mahakumbh: Mega Infrastructure Works Reach Final Stage, Sangam Area Upgraded with Smart Facilities',
    titleHindi: 'प्रयागराज महाकुंभ: संगम क्षेत्र में स्मार्ट सुविधाओं का विस्तार, बुनियादी ढांचा कार्य अंतिम चरण में',
    slug: 'prayagraj-mahakumbh-infrastructure-sangam-smart-facilities',
    category: 'Prayagraj',
    categorySlug: 'prayagraj',
    description: 'संगम नगरी प्रयागराज में आगामी महाकुंभ को लेकर सुरक्षा, घाटों के सौंदर्यीकरण और आधुनिक यात्री शेड का निर्माण कार्य 95% पूरा हो चुका है। प्रशासन ने श्रद्धालुओं की सुविधा हेतु नई गाइडलाइंस जारी की हैं।',
    content: `### प्रयागराज से विशेष रिपोर्ट — पार्थ न्यूज़

प्रयागराज में त्रिवेणी संगम के तट पर महाकुंभ की भव्य तैयारियों के तहत चल रहे सभी प्रमुख निर्माण व उन्नयन कार्य अपने अंतिम चरण में पहुंच गए हैं। मंडलायुक्त और पुलिस आयुक्त ने संयुक्त रूप से संगम नोज़, परेड ग्राउंड, अरैल घाट और झूंसी क्षेत्र का विस्तृत निरीक्षण किया।

#### मुख्य आकर्षण एवं आधुनिक सुविधाएं:
- **स्मार्ट नेविगेशन कियोस्क:** संगम क्षेत्र में 120 से अधिक डिजिटल सूचना केंद्र स्थापित किए गए हैं, जहां श्रद्धालु रूट मैप और घाटों की जानकारी प्राप्त कर सकेंगे।
- **सुरक्षा के पुख्ता इंतजाम:** आर्टिफिशियल इंटेलिजेंस (AI) आधारित 1400 से अधिक सीसीटीवी कैमरों की मदद से 24x7 क्राउड मैनेजमेंट की निगरानी होगी।
- **अस्थायी पुल और पक्के घाट:** गंगा और यमुना पर 30 से अधिक पीपा पुलों और 14 नए पक्के स्नान घाटों का विस्तार किया गया है।

> *"पार्थ न्यूज़ सदैव ज़मीनी हकीकत को सामने लाने के लिए प्रतिबद्ध है। श्रद्धालुओं की सुरक्षा और सुगमता ही महाकुंभ का मुख्य संकल्प है।"* — **वरिष्ठ संवाददाता, प्रयागराज ब्यूरो**

प्रशासन ने स्पष्ट किया है कि संगम जाने वाले सभी प्रमुख मार्गों पर विशेष ई-बस सेवा और बैटरी चलित रिक्शा की व्यवस्था सुनिश्चित की गई है।`,
    featuredImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'अमित कुमार शर्मा (Amit Sharma)',
    reporterRole: 'वरिष्ठ ब्यूरो प्रमुख, प्रयागराज',
    tags: ['Prayagraj', 'Mahakumbh', 'Sangam', 'UP News', 'Infrastructure'],
    status: 'published',
    featured: true,
    breaking: true,
    views: 14820,
    readTimeMinutes: 4,
    publishedAt: '2026-09-06T03:15:00.000Z',
    createdAt: '2026-09-06T03:00:00.000Z',
    updatedAt: '2026-09-06T03:15:00.000Z',
    seoTitle: 'Prayagraj Mahakumbh Latest Updates - Parth News',
    seoDescription: 'Read the latest updates on Prayagraj Mahakumbh preparations, Sangam ghat facilities and administration guidelines.',
    seoKeywords: 'Prayagraj, Mahakumbh, Sangam, UP Police, Parth News Hindi'
  },
  {
    id: 'post-2',
    title: 'Allahabad High Court Landmark Ruling: Directs Strict Timebound Redressal for Citizen Public Grievances in UP',
    titleHindi: 'इलाहाबाद हाईकोर्ट का ऐतिहासिक फैसला: जनसमस्याओं के निस्तारण हेतु अधिकारियों के लिए समयसीमा तय',
    slug: 'allahabad-high-court-ruling-public-grievances-timebound',
    category: 'Uttar Pradesh',
    categorySlug: 'uttar-pradesh',
    description: 'इलाहाबाद उच्च न्यायालय ने एक जनहित याचिका पर सुनवाई करते हुए राज्य के सभी जिलाधिकारियों को आम नागरिकों की शिकायतों का 15 कार्यदिवसों के भीतर समाधान करने का कड़ा निर्देश दिया है।',
    content: `### इलाहाबाद उच्च न्यायालय, प्रयागराज — विशेष विधिक समाचार

इलाहाबाद हाईकोर्ट की खंडपीठ ने उत्तर प्रदेश में प्रशासनिक जवाबदेही तय करने की दिशा में एक ऐतिहासिक दिशा-निर्देश जारी किया है। न्यायालय ने कहा कि लोकतंत्र में आम नागरिक की पीड़ा को अनसुना करना संविधान के अनुच्छेद 21 का उल्लंघन है।

#### अदालत के प्रमुख निर्देश:
1. प्रत्येक जनपद में **नोडल जनसुनवाई अधिकारी** की नियुक्ति सुनिश्चित हो।
2. बिजली, सड़क, पानी और राशन कार्ड से संबंधित आवेदनों पर 15 दिनों में लिखित रिपोर्ट दी जाए।
3. शिकायतकर्ता को असंतुष्टि की दशा में द्वितीय अपील का पारदर्शी पोर्टल उपलब्ध कराया जाए।

न्यायालय ने राज्य सरकार के मुख्य सचिव को 4 सप्ताह के भीतर अनुपालन शपथपत्र दाखिल करने का निर्देश दिया है।`,
    featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'राकेश नारायण त्रिवेदी (Rakesh Trivedi)',
    reporterRole: 'विधिक संवाददाता, हाईकोर्ट ब्यूरो',
    tags: ['Allahabad High Court', 'Prayagraj', 'Uttar Pradesh', 'Legal News', 'Governance'],
    status: 'published',
    featured: true,
    breaking: false,
    views: 9240,
    readTimeMinutes: 3,
    publishedAt: '2026-09-05T18:30:00.000Z',
    createdAt: '2026-09-05T18:00:00.000Z',
    updatedAt: '2026-09-05T18:30:00.000Z',
  },
  {
    id: 'post-3',
    title: 'National Expressway Corridor: 6 New Green Expressways Approved to Connect Eastern UP and Industrial Hubs',
    titleHindi: 'राष्ट्रीय एक्सप्रेसवे कॉरिडोर: पूर्वांचल को औद्योगिक केंद्रों से जोड़ने वाले 6 नए ग्रीन एक्सप्रेसवे को मंजूरी',
    slug: 'national-expressway-corridor-eastern-up-industrial-connectivity',
    category: 'India',
    categorySlug: 'india',
    description: 'केंद्रीय सड़क परिवहन मंत्रालय ने उत्तर प्रदेश और बिहार सीमा को राष्ट्रीय राजधानी क्षेत्र से तीव्र गति से जोड़ने हेतु 45,000 करोड़ रुपये के नए कॉरिडोर पैकेज को हरी झंडी दी।',
    content: `### नई दिल्ली / लखनऊ — राष्ट्रीय आर्थिक व अवसंरचना समाचार

केंद्रीय मंत्रिमंडल की आर्थिक मामलों की समिति (CCEA) ने देश के सबसे बड़े मल्टी-मॉडल लॉजिस्टिक नेटवर्क के विस्तार को मंजूरी दी है। इस योजना के तहत उत्तर प्रदेश के प्रयागराज, वाराणसी, गोरखपुर और अयोध्या को सीधे प्रमुख बंदरगाहों और मालवहन गलियारों से जोड़ा जाएगा।

#### परियोजना की मुख्य विशेषताएं:
- यात्रा समय में 40% तक की कमी।
- सभी एक्सप्रेसवे पर सोलर पावर्ड एलईडी और इलेक्ट्रिक वाहन (EV) चार्जिंग स्टेशन्स।
- स्थानीय किसानों एवं एमएसएमई इकाइयों के उत्पादों के त्वरित परिवहन हेतु विशेष फ्रेट लेन।`,
    featuredImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'प्रिया सिंह (Priya Singh)',
    reporterRole: 'राष्ट्रीय संवाददाता, नई दिल्ली',
    tags: ['Expressway', 'Infrastructure', 'India', 'UP Economy', 'Transportation'],
    status: 'published',
    featured: false,
    breaking: false,
    views: 7410,
    readTimeMinutes: 4,
    publishedAt: '2026-09-05T14:10:00.000Z',
    createdAt: '2026-09-05T13:50:00.000Z',
    updatedAt: '2026-09-05T14:10:00.000Z',
  },
  {
    id: 'post-4',
    title: 'UP Police Cyber Cell Busts Multi-State Online Investment Fraud Racket, ₹18 Crore Frozen in Bank Accounts',
    titleHindi: 'यूपी पुलिस साइबर सेल की बड़ी कार्रवाई: अंतरराज्यीय ऑनलाइन निवेश ठगी गिरोह का भंडाफोड़, 18 करोड़ सीज',
    slug: 'up-police-cyber-cell-busts-investment-fraud-racket',
    category: 'Crime',
    categorySlug: 'crime',
    description: 'लखनऊ और प्रयागराज साइबर थाने की संयुक्त टीम ने फर्जी ट्रेडिंग ऐप के जरिए देशभर के सैकड़ों लोगों को चूना लगाने वाले 7 आरोपियों को गिरफ्तार किया।',
    content: `### अपराध विशेष — पार्थ न्यूज़ पड़ताल

उत्तर प्रदेश पुलिस की स्पेशल टास्क फोर्स (STF) और राज्य साइबर क्राइम सेल ने एक संगठित अंतरराष्ट्रीय गिरोह का पर्दाफाश किया है जो सोशल मीडिया विज्ञापनों और फर्जी टेलीग्राम चैनल्स के जरिए 'दोगुने रिटर्न' का झांसा देकर ठगी कर रहा था।

#### पुलिस की आम जनता से अपील:
- किसी भी अनधिकृत ऐप या व्हाट्सएप ग्रुप पर निवेश सुझावों पर विश्वास न करें।
- वित्तीय धोखाधड़ी की स्थिति में तत्काल राष्ट्रीय हेल्पलाइन नंबर **1930** पर कॉल करें।
- पार्थ न्यूज़ की विशेष साइबर सुरक्षा सीरीज के तहत हम नियमित जागरूकता संदेश प्रसारित कर रहे हैं।`,
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'विकास कुमार यादव (Vikas Yadav)',
    reporterRole: 'अपराध संवाददाता, लखनऊ ब्यूरो',
    tags: ['Cyber Crime', 'UP Police', 'Fraud Bust', 'Crime News', 'Safety'],
    status: 'published',
    featured: false,
    breaking: false,
    views: 6580,
    readTimeMinutes: 3,
    publishedAt: '2026-09-05T10:00:00.000Z',
    createdAt: '2026-09-05T09:40:00.000Z',
    updatedAt: '2026-09-05T10:00:00.000Z',
  },
  {
    id: 'post-5',
    title: 'Cricket Team Selection: UP Talent Selected for National Squad Ahead of Upcoming Championship Series',
    titleHindi: 'क्रिकेट: उत्तर प्रदेश के होनहार युवा खिलाड़ी का राष्ट्रीय टीम में चयन, खेल जगत में उत्साह की लहर',
    slug: 'cricket-team-selection-up-young-talent-national-squad',
    category: 'Sports',
    categorySlug: 'sports',
    description: 'रणजी ट्रॉफी में शानदार प्रदर्शन के बाद प्रयागराज और कानपुर के उभरते तेज गेंदबाज को राष्ट्रीय चयन समिति ने अंतरराष्ट्रीय दौरे के लिए चुना है।',
    content: `### खेल समाचार — पार्थ न्यूज़ स्पोर्ट्स डेस्क

भारतीय क्रिकेट कंट्रोल बोर्ड (BCCI) की चयन समिति ने आगामी श्रृंखला हेतु 15 सदस्यीय टीम की घोषणा कर दी है। उत्तर प्रदेश क्रिकेट एसोसिएशन (UPCA) के प्रमुख खिलाड़ियों में से एक को उनकी असाधारण गति और स्विंग गेंदबाजी के दम पर भारतीय सीनियर टीम का टिकट मिला है।

स्थानीय खेल प्रेमियों और क्लब कोचों ने मिठाई बांटकर खुशी का इजहार किया। खिलाड़ी ने पार्थ न्यूज़ से खास बातचीत में कहा कि यह उनके परिवार, कोच और उत्तर प्रदेश की धरती के आशीर्वाद का परिणाम है।`,
    featuredImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'सौरभ बाजपेयी (Saurabh Bajpai)',
    reporterRole: 'स्पोर्ट्स डेस्क हेड',
    tags: ['Cricket', 'Sports', 'UP Cricket', 'BCCI', 'Prayagraj Sports'],
    status: 'published',
    featured: false,
    breaking: false,
    views: 5210,
    readTimeMinutes: 2,
    publishedAt: '2026-09-04T16:00:00.000Z',
    createdAt: '2026-09-04T15:30:00.000Z',
    updatedAt: '2026-09-04T16:00:00.000Z',
  },
  {
    id: 'post-6',
    title: 'Digital Education Revolution: 15,000 Smart Classrooms Inaugurated Across Government Schools in UP',
    titleHindi: 'डिजिटल शिक्षा क्रांति: उत्तर प्रदेश के प्राथमिक एवं माध्यमिक विद्यालयों में 15,000 स्मार्ट क्लासरूम का शुभारंभ',
    slug: 'digital-education-revolution-smart-classrooms-up-schools',
    category: 'Education',
    categorySlug: 'education',
    description: 'बेसिक शिक्षा परिषद ने ग्रामीण अंचलों के छात्र-छात्राओं को आधुनिक ऑडियो-विजुअल तकनीक से पढ़ाने हेतु व्यापक पहल शुरू की है।',
    content: `### शिक्षा व समाज — पार्थ न्यूज़ ब्यूरो

उत्तर प्रदेश सरकार के बेसिक शिक्षा विभाग ने राज्यभर के ग्रामीण विद्यालयों में आधुनिक इंटरएक्टिव डिजिटल बोर्ड और स्टेम लैब्स का उद्घाटन किया है। इस पहल से लाखों ग्रामीण बच्चों को राष्ट्रीय स्तर की गुणवत्तापूर्ण शिक्षा सुलभ होगी।

विशेषज्ञों का मानना है कि डिजिटल माध्यम से सीखने की गति में 35% का सकारात्मक सुधार देखा गया है।`,
    featuredImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'डॉ. अनुराधा शुक्ला (Dr. Anuradha Shukla)',
    reporterRole: 'शिक्षा एवं शोध संवाददाता',
    tags: ['Education', 'Smart Classroom', 'UP Schools', 'Digital India', 'Students'],
    status: 'published',
    featured: false,
    breaking: false,
    views: 4890,
    readTimeMinutes: 3,
    publishedAt: '2026-09-04T11:20:00.000Z',
    createdAt: '2026-09-04T11:00:00.000Z',
    updatedAt: '2026-09-04T11:20:00.000Z',
  }
];

export const INITIAL_ARTICLES: Post[] = [
  {
    id: 'art-1',
    title: 'Editorial Opinion: The Evolution of Digital Journalism and the Sacred Duty of Ground-Level Truth',
    titleHindi: 'संपादकीय विश्लेषण: डिजिटल पत्रकारिता का नया दौर और ज़मीनी सच के प्रति हमारी जवाबदेही',
    slug: 'editorial-evolution-digital-journalism-ground-truth',
    category: 'Politics',
    categorySlug: 'politics',
    description: 'सोशल मीडिया के शोरगुल और सनसनीखेज हेडलाइंस के बीच पार्थ न्यूज़ क्यों निष्पक्षता और ज़मीनी रिपोर्टिंग को सर्वोच्च प्राथमिकता देता है।',
    content: `### सच के साथ, एक कदम आगे — प्रधान संपादक का दृष्टिकोण

आज जब सूचना का प्रवाह सेकंडों में हो रहा है, तब सबसे बड़ा संकट यह है कि क्या प्राप्त जानकारी सत्य है या केवल प्रचार? पत्रकारिता केवल तथ्यों का संग्रह नहीं, बल्कि समाज के अंतिम व्यक्ति की आवाज़ को सत्ता के गलियारों तक पहुंचाने का पवित्र माध्यम है।

#### पार्थ न्यूज़ के चार मूल स्तंभ:
1. **सत्यापन सर्वोपरि:** किसी भी खबर को बिना ठोस प्रमाण और ज़मीनी जांच के प्रसारित न करना।
2. **संवाददाता सशक्तिकरण:** ग्रामीण एवं कस्बाई क्षेत्रों के कर्मठ पत्रकारों को पहचान और डिजिटल सुरक्षा प्रदान करना।
3. **जनपक्षधरता:** लोकहित के मुद्दों पर निष्पक्ष व निर्भीक रुख अपनाना।
4. **पारदर्शिता:** पाठकों के प्रति पूर्ण निष्ठा और त्रुटियों का तत्काल सुधार।

हमारा संकल्प है: **"सच के साथ, एक कदम आगे"**।`,
    featuredImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'प्रधान संपादक मंडल (Editorial Board)',
    reporterRole: 'मुख्य संपादक, पार्थ न्यूज़',
    tags: ['Editorial', 'Journalism', 'Truth', 'Media Ethics', 'Parth News'],
    status: 'published',
    featured: true,
    breaking: false,
    views: 8930,
    readTimeMinutes: 5,
    publishedAt: '2026-09-05T08:00:00.000Z',
    createdAt: '2026-09-05T07:30:00.000Z',
    updatedAt: '2026-09-05T08:00:00.000Z',
  },
  {
    id: 'art-2',
    title: 'Purvanchal Industrial Renaissance: How Expressway Corridors Are Reshaping Local Economy and Employment',
    titleHindi: 'पूर्वांचल का औद्योगिक पुनर्जागरण: एक्सप्रेसवे गलियारे कैसे बदल रहे हैं स्थानीय अर्थव्यवस्था की तस्वीर',
    slug: 'purvanchal-industrial-renaissance-expressways-employment',
    category: 'Business',
    categorySlug: 'business',
    description: 'कृषि आधारित अर्थव्यवस्था से एग्रो-प्रोसेसिंग और विनिर्माण हब बनने की ओर अग्रसर पूर्वी उत्तर प्रदेश का गहन आर्थिक विश्लेषण।',
    content: `### आर्थिक समीक्षा — पार्थ न्यूज़ रिसर्च डेस्क

पूर्वांचल एक्सप्रेसवे, बुंदेलखंड एक्सप्रेसवे और निर्माणाधीन गंगा एक्सप्रेसवे ने उत्तर प्रदेश के आंतरिक जनपदों की तस्वीर बदल दी है। प्रयागराज, मिर्जापुर, भदोही और जौनपुर के पारंपरिक शिल्पों को अब वैश्विक बाजार तक सीधी पहुंच मिल रही है।

#### विकास के प्रमुख सूचकांक:
- स्थानीय गोदामों व वेयरहाउसिंग क्षेत्र में 140% की वृद्धि।
- महिला स्वयं सहायता समूहों द्वारा निर्मित उत्पादों की ई-कॉमर्स बिक्री में रिकॉर्ड उछाल।
- युवाओं के लिए गृह जनपद में ही प्रत्यक्ष रोज़गार के अवसर सृजित।`,
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'डॉ. के. पी. मिश्रा (Dr. K.P. Mishra)',
    reporterRole: 'वरिष्ठ आर्थिक विश्लेषक',
    tags: ['Economy', 'Purvanchal', 'MSME', 'Employment', 'Industrial Growth'],
    status: 'published',
    featured: false,
    breaking: false,
    views: 4320,
    readTimeMinutes: 4,
    publishedAt: '2026-09-03T12:00:00.000Z',
    createdAt: '2026-09-03T11:30:00.000Z',
    updatedAt: '2026-09-03T12:00:00.000Z',
  }
];

export const INITIAL_VIDEOS: VideoNews[] = [
  {
    id: 'vid-1',
    title: 'Special Ground Report: Historic Transformation of Sangam Ghats Ahead of Mega Event in Prayagraj',
    titleHindi: 'ग्राउंड रिपोर्ट: संगम नगरी प्रयागराज के घाटों का कायाकल्प, देखें पार्थ न्यूज़ की खास पड़ताल',
    slug: 'ground-report-sangam-ghats-transformation-prayagraj',
    description: 'पार्थ न्यूज़ की टीम ने संगम नोज़ और अरैल तट से दिखाई सीधी तस्वीरें। जानिए नए रिवरफ्रंट और यात्री सुविधाओं की ज़मीनी हकीकत।',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    category: 'Prayagraj',
    categorySlug: 'prayagraj',
    reporterName: 'अमित कुमार शर्मा',
    duration: '08:45',
    tags: ['Ground Report', 'Prayagraj', 'Sangam', 'Video News', 'Parth News Video'],
    views: 24500,
    featured: true,
    publishedAt: '2026-09-06T02:00:00.000Z',
    createdAt: '2026-09-06T01:45:00.000Z',
  },
  {
    id: 'vid-2',
    title: 'Crime Bulletin: How UP Police Cyber Cell Cracked the 18-Crore Digital Arrest Scheme',
    titleHindi: 'क्राइम बुलेटिन: डिजिटल अरेस्ट के नाम पर 18 करोड़ ठगने वाले अंतरराष्ट्रीय गिरोह का कैसे हुआ पर्दाफाश?',
    slug: 'crime-bulletin-cyber-cell-digital-arrest-bust',
    description: 'साइबर ठगों की नई कार्यप्रणाली और पुलिस द्वारा की गई हाई-टेक ट्रैकिंग की पूरी इनसाइड स्टोरी।',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'Crime',
    categorySlug: 'crime',
    reporterName: 'विकास कुमार यादव',
    duration: '06:18',
    tags: ['Cyber Crime', 'UP Police', 'Video Bulletin', 'Investigation'],
    views: 18900,
    featured: false,
    publishedAt: '2026-09-05T15:00:00.000Z',
    createdAt: '2026-09-05T14:30:00.000Z',
  },
  {
    id: 'vid-3',
    title: 'Technology & Youth: Smart Classrooms Bringing High-End Science Labs to Rural UP Students',
    titleHindi: 'तकनीक और युवा: ग्रामीण विद्यालयों में स्मार्ट क्लासरूम से खिल रहे विज्ञान के सितारे',
    slug: 'technology-youth-smart-classrooms-rural-up',
    description: 'गांवों के प्राथमिक विद्यालयों में बच्चों के हाथों में डिजिटल टैबलेट और 3डी मॉडल्स से पढ़ाई का अनोखा अनुभव।',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    category: 'Education',
    categorySlug: 'education',
    reporterName: 'डॉ. अनुराधा शुक्ला',
    duration: '05:32',
    tags: ['Digital Education', 'Rural India', 'Smart Schools', 'Special Report'],
    views: 12400,
    featured: false,
    publishedAt: '2026-09-04T14:00:00.000Z',
    createdAt: '2026-09-04T13:40:00.000Z',
  }
];

export const INITIAL_REPORTER_APPLICATIONS: ReporterApplication[] = [
  {
    id: 'app-1',
    applicationNumber: 'PN-REP-2026-00001',
    fullName: 'अमित कुमार शर्मा (Amit Kumar Sharma)',
    fatherName: 'श्री राम शरण शर्मा',
    dob: '1992-06-15',
    mobile: '+91 98390 12345',
    email: 'amit.sharma.reporter@gmail.com',
    address: 'मकान संख्या 45/2, टैगोर टाउन',
    city: 'Prayagraj',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    pincode: '211002',
    education: 'Post Graduate in Mass Communication & Journalism (Allahabad University)',
    experience: '8 Years in Print & Digital Media Journalism',
    previousOrganization: 'Dainik Jagran / Local News Bureau',
    reason: 'पार्थ न्यूज़ के सत्यनिष्ठ पत्रकारिता के ध्येय वाक्य "सच के साथ, एक कदम आगे" से प्रेरित होकर प्रयागराज मंडल की जनसमस्याओं को निष्पक्षता से प्रस्तुत करना चाहता हूँ।',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    status: 'approved',
    submittedAt: '2026-08-15T10:00:00.000Z',
    reviewedAt: '2026-08-18T14:30:00.000Z',
    reviewedBy: 'Chief Editor, Parth News',
    generatedReporterId: 'PN-RPT-00001'
  },
  {
    id: 'app-2',
    applicationNumber: 'PN-REP-2026-00002',
    fullName: 'सुरेश प्रताप सिंह (Suresh Pratap Singh)',
    fatherName: 'श्री वीरेंद्र प्रताप सिंह',
    dob: '1996-09-20',
    mobile: '+91 94150 98765',
    email: 'suresh.singh.up@gmail.com',
    address: 'ग्राम व पोस्ट - हंडिया, तहसील हंडिया',
    city: 'Handia',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    pincode: '221503',
    education: 'Bachelor of Arts (BA), Diploma in Digital Media',
    experience: '3 Years Rural Ground Reporter',
    previousOrganization: 'Gramin Khabar Digital',
    reason: 'ग्रामीण अंचल के किसानों, युवाओं और विकास कार्यों की ज़मीनी हकीकत को प्रमुखता से डिजिटल प्लेटफॉर्म पर लाने हेतु।',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    status: 'under_review',
    submittedAt: '2026-09-02T09:15:00.000Z',
  },
  {
    id: 'app-3',
    applicationNumber: 'PN-REP-2026-00003',
    fullName: 'नेहा वर्मा (Neha Verma)',
    fatherName: 'श्री आलोक कुमार वर्मा',
    dob: '1998-12-05',
    mobile: '+91 87654 32109',
    email: 'neha.verma.journalism@gmail.com',
    address: 'फ्लैट न. 302, गोमती नगर विस्तार',
    city: 'Lucknow',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226010',
    education: 'MA in Journalism & Mass Communication (BBDU Lucknow)',
    experience: '4 Years Anchor & Video Journalist',
    previousOrganization: 'City Live News TV',
    reason: 'उत्तर प्रदेश की राजनीति और सांस्कृतिक धरोहर पर वीडियो डाक्यूमेंट्री एवं इन-डेप्थ रिपोर्टिंग प्रस्तुत करने के लिए।',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    status: 'pending',
    submittedAt: '2026-09-05T16:40:00.000Z',
  },
  {
    id: 'app-4',
    applicationNumber: 'PN-REP-2026-00004',
    fullName: 'राहुल कुमार गुप्ता (Rahul Kumar Gupta)',
    fatherName: 'श्री के. सी. गुप्ता',
    dob: '2001-04-10',
    mobile: '+91 99887 76655',
    email: 'rahul.gupta@gmail.com',
    address: 'चौक, वाराणसी',
    city: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221001',
    education: '12th Pass',
    experience: 'No formal media experience',
    reason: 'Want to try news reporting.',
    profilePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    status: 'rejected',
    submittedAt: '2026-08-25T11:00:00.000Z',
    reviewedAt: '2026-08-27T10:00:00.000Z',
    reviewedBy: 'Admin Editorial Panel',
    rejectionReason: 'पत्रकारिता का न्यूनतम शैक्षणिक अनुभव एवं आवश्यक अर्हता अपूर्ण पाई गई।'
  }
];

export const INITIAL_REPORTERS: Reporter[] = [
  {
    id: 'rep-1',
    reporterId: 'PN-RPT-00001',
    applicationNumber: 'PN-REP-2026-00001',
    name: 'अमित कुमार शर्मा (Amit Kumar Sharma)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    designation: 'SENIOR REPORTER / BUREAU CHIEF',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    mobile: '+91 98390 12345',
    email: 'amit.sharma.reporter@gmail.com',
    status: 'active',
    issueDate: '2026-08-18',
    validUntil: '2027-08-17',
    createdAt: '2026-08-18T14:30:00.000Z'
  },
  {
    id: 'rep-2',
    reporterId: 'PN-RPT-00002',
    applicationNumber: 'PN-REP-2026-00000',
    name: 'राकेश नारायण त्रिवेदी (Rakesh Trivedi)',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    designation: 'LEGAL CORRESPONDENT / HIGH COURT',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    mobile: '+91 94500 54321',
    email: 'rakesh.trivedi.law@gmail.com',
    status: 'active',
    issueDate: '2026-07-01',
    validUntil: '2027-06-30',
    createdAt: '2026-07-01T10:00:00.000Z'
  }
];

export const INITIAL_ID_CARDS: IdCardRecord[] = [
  {
    id: 'card-1',
    reporterId: 'PN-RPT-00001',
    reporterName: 'अमित कुमार शर्मा (Amit Kumar Sharma)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    designation: 'SENIOR REPORTER / BUREAU CHIEF',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    issueDate: '2026-08-18',
    validUntil: '2027-08-17',
    status: 'active',
    verificationUrl: '/verify-reporter/PN-RPT-00001'
  },
  {
    id: 'card-2',
    reporterId: 'PN-RPT-00002',
    reporterName: 'राकेश नारायण त्रिवेदी (Rakesh Trivedi)',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    designation: 'LEGAL CORRESPONDENT / HIGH COURT',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    issueDate: '2026-07-01',
    validUntil: '2027-06-30',
    status: 'active',
    verificationUrl: '/verify-reporter/PN-RPT-00002'
  }
];

export const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'con-1',
    name: 'दीपक कुमार सिंह',
    email: 'deepak.singh@gmail.com',
    phone: '+91 98765 43210',
    subject: 'प्रयागराज सिविल लाइंस में सड़क सुधार संबंधी सूचना',
    message: 'सिविल लाइंस में एमजी मार्ग पर जल निगम के कार्य के पश्चात सड़क की मरम्मत अधूरी है। कृपया इसे अपने प्रतिष्ठित अखबार में स्थान दें।',
    createdAt: '2026-09-05T16:00:00.000Z',
    read: false
  }
];

export const INITIAL_AD_ENQUIRIES: AdvertisementEnquiry[] = [
  {
    id: 'ad-1',
    businessName: 'प्रयाग रियल एस्टेट एंड डेवलपर्स',
    contactPerson: 'राजीव मेहरोत्रा',
    email: 'rajiv.mehrotra@prayaginfra.com',
    phone: '+91 99350 11223',
    adType: 'Homepage Banner & Sponsored Story',
    budget: '₹50,000 - ₹1,00,000 / Month',
    message: 'हम आगामी महाकुंभ क्षेत्र में नए प्रीमियम आवास प्रोजेक्ट का विज्ञापन पार्थ न्यूज़ के मुख्य पृष्ठ और वीडियो बुलेटिन में देना चाहते हैं।',
    createdAt: '2026-09-04T15:20:00.000Z',
    status: 'new'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'PARTH NEWS',
  siteUrl: 'https://parthnews.in',
  tagline: 'सच के साथ, एक कदम आगे',
  taglineHindi: 'सच के साथ, एक कदम आगे',
  contactEmail: 'editor@parthnews.in',
  contactPhone: '+91 9981065457',
  whatsappNumber: '+91 9981065457',
  address: 'अखाई मार्केट, अदालत के सामने मुंगावली जिला अशोकनगर मध्यप्रदेश',
  headBureau: 'मुख्यालय ब्यूरो: अखाई मार्केट, अदालत के सामने मुंगावली, जिला अशोकनगर (म.प्र.)',
  prayagrajBureau: 'अखाई मार्केट, अदालत के सामने मुंगावली, जिला अशोकनगर (म.प्र.)',
  channelHead: 'राजीव राय',
  channelHeadDesignation: 'चैनल हेड (Channel Head)',
  breakingNewsEnabled: true,
  breakingNewsText: '🔴 पार्थ न्यूज़: सच के साथ, एक कदम आगे • निष्पक्ष, निर्भीक और जनसरोकारी डिजिटल पत्रकारिता',
  socialLinks: {
    facebook: 'https://www.facebook.com/profile.php?id=61595037170119',
    twitter: 'https://x.com/ParthNewsLive',
    youtube: 'https://youtube.com/@ParthNewsLive',
    instagram: 'https://www.instagram.com/_hemantt12/',
    telegram: 'https://t.me/ParthNewsAlerts'
  },
  editorName: 'राजीव राय (Channel Head)',
  editorDesignation: 'चैनल हेड (Channel Head)'
};
