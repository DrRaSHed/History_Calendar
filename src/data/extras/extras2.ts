import type { Extras } from './types';

/** Panel II — infographic details. */
export const extrasPanelTwo: Record<string, Extras> = {
  'axial-age-china': {
    place: ['Qufu, Shandong, China', 'تشيوفو، شاندونغ، الصين'],
    coords: [35.597, 116.987],
    stats: [
      { v: ['≈72', '≈72'], l: ["years — Confucius's lifespan (551–479 BCE)", 'سنة — عمر كونفوشيوس (551–479 ق.م)'] },
      { v: ['20', '20'], l: ['books in the Analects', 'كتابًا في «الحوارات»'] },
      { v: ['81', '81'], l: ['short chapters in the Daodejing (≈5,000 characters)', 'فصلًا قصيرًا في «داو دي جينغ» (≈5,000 حرف)'] },
      { v: ['100', '100'], l: ['“schools” of thought — a traditional round number', '«مدرسة» فكرية — رقم تقليدي تقريبي'] },
    ],
    steps: [
      { y: ['551 BCE', '551 ق.م'], l: ['Confucius is born in the state of Lu', 'ميلاد كونفوشيوس في دولة لو'] },
      { y: ['c. 500 BCE', 'نحو 500 ق.م'], l: ['Teaches students and travels among the states', 'بيعلّم تلاميذه ويتنقّل بين الدول'] },
      { y: ['479 BCE', '479 ق.م'], l: ['Confucius dies', 'وفاة كونفوشيوس'] },
      { y: ['c. 300 BCE', 'نحو 300 ق.م'], l: ['Guodian slips: the earliest Laozi text', 'شرائح غوديان: أقدم نص للاو تسي'] },
      { y: ['136 BCE', '136 ق.م'], l: ['Han Emperor Wu elevates Confucian learning at court', 'الإمبراطور وو من الهان بيرفع التعليم الكونفوشيوسي في البلاط'] },
      { y: ['1993', '1993'], l: ['The Guodian manuscripts are excavated', 'اكتشاف مخطوطات غوديان'] },
    ],
    facts: [
      ['Confucius did not write the Analects — his students compiled it.', 'كونفوشيوس ما كتبش «الحوارات» — تلاميذه جمعوها.'],
      ['A version of the “golden rule” appears in Analects 15.24: do not impose on others what you would not want for yourself.', 'نسخة من «القاعدة الذهبية» موجودة في «الحوارات» 15.24: ما لا تحبه لنفسك لا تفرضه على غيرك.'],
      ['The Daodejing is among the most translated books in the world.', '«داو دي جينغ» من أكتر الكتب اللي اتترجمت في العالم.'],
    ],
    legacy: [
      'Confucian ideas about family, learning and public duty — and Daoist ideas about harmony with nature — still shape life, ethics and art across East Asia.',
      'أفكار كونفوشيوس عن الأسرة والتعلّم والواجب العام — وأفكار الطاوية عن الانسجام مع الطبيعة — لسه بتشكّل الحياة والأخلاق والفن في شرق آسيا.',
    ],
  },

  'library-of-alexandria': {
    place: ['Alexandria, Egypt', 'الإسكندرية، مصر'],
    coords: [31.2, 29.919],
    stats: [
      { v: ['40,000–700,000', '40,000–700,000'], l: ['scrolls claimed by ancient sources (uncertain)', 'لفافة تذكرها المصادر القديمة (غير مؤكدة)'] },
      { v: ['120', '120'], l: ["books in Callimachus's catalogue, the Pinakes", 'كتابًا في فهرس كاليماخوس «البيناكس»'] },
      { v: ['≈40,000 km', '≈40,000 كم'], l: ["Eratosthenes's estimate of the Earth's circumference (true value 40,075 km)", 'تقدير إراتوستينس لمحيط الأرض (القيمة الحقيقية 40,075 كم)'] },
      { v: ['≈8 million', '≈8 مليون'], l: ['volumes the modern Bibliotheca Alexandrina can hold', 'مجلد تقدر مكتبة الإسكندرية الجديدة تستوعبها'] },
    ],
    compare: {
      title: ['Reported holdings of ancient libraries', 'مقتنيات مكتبات قديمة (كما تُروى)'],
      unit: ['scrolls / tablets', 'لفافة / لوح'],
      note: ['Ancient claims — rough and uncertain. Alexandria’s figures range from 40,000 to 700,000.', 'أرقام قديمة تقريبية وغير مؤكدة. وأرقام الإسكندرية بين 40,000 و700,000.'],
      items: [
        { l: ['Alexandria (Tzetzes)', 'الإسكندرية (تزيتزيس)'], n: 490000, hi: true },
        { l: ['Pergamon (Plutarch)', 'برغامون (بلوتارخ)'], n: 200000 },
        { l: ['Nineveh, Ashurbanipal (tablets)', 'نينوى، آشور بانيبال (ألواح)'], n: 30000 },
        { l: ['Library of Celsus, Ephesus', 'مكتبة سلسوس، أفسس'], n: 12000 },
      ],
    },
    steps: [
      { y: ['331 BCE', '331 ق.م'], l: ['Alexander founds the city', 'الإسكندر بيؤسس المدينة'] },
      { y: ['c. 295–280 BCE', 'نحو 295–280 ق.م'], l: ['Ptolemy I and II establish the Mouseion and library', 'بطليموس الأول والتاني بيؤسسوا الموسيون والمكتبة'] },
      { y: ['c. 240 BCE', 'نحو 240 ق.م'], l: ['Eratosthenes measures the Earth', 'إراتوستينس بيقيس الأرض'] },
      { y: ['48 BCE', '48 ق.م'], l: ["Fire during Caesar's war in Alexandria", 'حريق أثناء حرب قيصر في الإسكندرية'] },
      { y: ['391 CE', '391 م'], l: ['The Serapeum is destroyed', 'هدم السيرابيوم'] },
      { y: ['2002', '2002'], l: ['The Bibliotheca Alexandrina opens', 'افتتاح مكتبة الإسكندرية الجديدة'] },
    ],
    facts: [
      ['Ships entering the harbour were said to have their books copied — the library kept the originals.', 'قيل إن السفن اللي بتدخل الميناء كانت بتتنسخ كتبها — والمكتبة بتحتفظ بالأصل.'],
      ["Eratosthenes used a stick's noon shadow in two cities to estimate the Earth's size.", 'إراتوستينس استخدم ظل عصا وقت الضهر في مدينتين عشان يقدّر حجم الأرض.'],
      ['The Pharos lighthouse, one of the Seven Wonders, was finished around the same time (c. 280 BCE).', 'فنار الإسكندرية، من عجائب الدنيا السبع، خلص تقريبًا في نفس الوقت (نحو 280 ق.م).'],
    ],
    legacy: [
      "The Library became a lasting symbol of the hope of gathering all knowledge in one place — and of how fragile that hope can be. Egypt's modern Bibliotheca Alexandrina, opened in 2002, carries the idea forward.",
      'المكتبة بقت رمز دايم لحلم جمع كل المعرفة في مكان واحد — ولهشاشة الحلم ده. ومكتبة الإسكندرية الجديدة اللي افتتحتها مصر سنة 2002 بتكمل الفكرة.',
    ],
  },

  'vesuvius-79': {
    place: ['Bay of Naples, Italy', 'خليج نابولي، إيطاليا'],
    coords: [40.822, 14.426],
    stats: [
      { v: ['≈33 km', '≈33 كم'], l: ['height of the eruption column', 'ارتفاع عمود الثوران'] },
      { v: ['11,000+', 'أكتر من 11,000'], l: ['estimated inhabitants of Pompeii', 'عدد سكان بومبي المقدّر'] },
      { v: ['4–6 m', '4–6 م'], l: ['depth of ash and pumice over Pompeii', 'عمق الرماد والخفاف فوق بومبي'] },
      { v: ['≈1,150', '≈1,150'], l: ['bodies found at Pompeii', 'جثة اتلاقت في بومبي'] },
    ],
    compare: {
      title: ['Eruption column heights', 'ارتفاع أعمدة الثوران'],
      unit: ['km', 'كم'],
      note: ['Approximate heights reached by famous eruptions.', 'ارتفاعات تقريبية لثورانات مشهورة.'],
      items: [
        { l: ['Mount St. Helens (1980)', 'سانت هيلينز (1980)'], n: 24 },
        { l: ['Vesuvius (79 CE)', 'فيزوف (79 م)'], n: 33, hi: true },
        { l: ['Pinatubo (1991)', 'بيناتوبو (1991)'], n: 35 },
        { l: ['Tambora (1815)', 'تامبورا (1815)'], n: 43 },
      ],
    },
    steps: [
      { y: ['62/63 CE', '62/63 م'], l: ['A strong earthquake damages Pompeii', 'زلزال قوي بيدمّر بومبي'] },
      { y: ['79 CE, afternoon', '79 م، بعد الضهر'], l: ['The Plinian column rises; pumice falls', 'العمود بيرتفع والخفاف بينزل'] },
      { y: ['79 CE, night', '79 م، بالليل'], l: ['Roofs collapse under the pumice', 'الأسقف بتنهار تحت الخفاف'] },
      { y: ['next dawn', 'فجر اليوم التالي'], l: ['Surges bury Herculaneum, then Pompeii', 'الموجات بتدفن هركولانيوم وبعدها بومبي'] },
      { y: ['1748', '1748'], l: ['Systematic excavations begin', 'بداية الحفائر المنظّمة'] },
      { y: ['2018', '2018'], l: ['A charcoal inscription points to an October date', 'نقش بالفحم بيلمّح لتاريخ في أكتوبر'] },
    ],
    facts: [
      ['At Herculaneum, carbonised scrolls from the Villa of the Papyri are now being read with X-rays and AI.', 'في هركولانيوم، لفائف متفحمة من فيلا البرديات بتتقرا دلوقتي بالأشعة السينية والذكاء الاصطناعي.'],
      ["Pompeii's walls carry thousands of graffiti — election slogans, insults and love notes.", 'جدران بومبي عليها آلاف الكتابات — شعارات انتخابات وشتايم ورسايل حب.'],
      ['The eyewitness, Pliny the Younger, was 17 and wrote his account decades later.', 'بليني الأصغر شاهد العيان كان عنده 17 سنة وكتب روايته بعدها بعقود.'],
    ],
    legacy: [
      'Pompeii and Herculaneum gave us the richest snapshot of Roman daily life — and the word “Plinian” for the biggest explosive eruptions. Hundreds of thousands of people still live in Vesuvius’s shadow.',
      'بومبي وهركولانيوم أدونا أغنى لقطة من حياة الرومان اليومية — وكلمة «بليني» لأعنف الثورانات المتفجرة. ولحد النهارده مئات الآلاف عايشين في ظل فيزوف.',
    ],
  },

  'house-of-wisdom': {
    place: ['Baghdad, Iraq', 'بغداد، العراق'],
    coords: [33.315, 44.366],
    stats: [
      { v: ['762 CE', '762 م'], l: ['Baghdad is founded by al-Mansur', 'تأسيس بغداد على يد المنصور'] },
      { v: ['≈1 million', '≈مليون'], l: ['estimated population at its peak', 'تقدير عدد السكان في الذروة'] },
      { v: ['≈200 years', '≈200 سنة'], l: ['of the Greek–Arabic translation movement', 'عمر حركة الترجمة من اليونانية للعربية'] },
      { v: ['c. 820 CE', 'نحو 820 م'], l: ['al-Khwarizmi writes the treatise that names algebra', 'الخوارزمي بيكتب الرسالة اللي سمّت الجبر'] },
    ],
    steps: [
      { y: ['762', '762'], l: ['Baghdad is founded on the Tigris', 'تأسيس بغداد على دجلة'] },
      { y: ['786–809', '786–809'], l: ["Harun al-Rashid's reign: manuscripts are collected", 'عهد هارون الرشيد: جمع المخطوطات'] },
      { y: ['813–833', '813–833'], l: ["al-Ma'mun patronises translation and science", 'المأمون يرعى الترجمة والعلم'] },
      { y: ['c. 820', 'نحو 820'], l: ["al-Khwarizmi's book on al-jabr and al-muqabala", 'كتاب الخوارزمي في الجبر والمقابلة'] },
      { y: ['873', '873'], l: ['Hunayn ibn Ishaq dies after translating Galen and more', 'وفاة حنين بن إسحاق بعد ترجمة جالينوس وغيره'] },
      { y: ['1258', '1258'], l: ['The Mongol sack of Baghdad', 'سقوط بغداد بيد المغول'] },
    ],
    facts: [
      ['The word “algorithm” comes from al-Khwarizmi’s Latinised name, Algoritmi.', 'كلمة «خوارزمية» (algorithm) جاية من اسم الخوارزمي بعد ما اتلتّن: Algoritmi.'],
      ['According to tradition, papermaking reached Baghdad after the Battle of Talas (751).', 'حسب الرواية التقليدية، صناعة الورق وصلت بغداد بعد معركة طلاس (751).'],
      ['Words like algebra, zenith, azimuth and zero came into European languages through Arabic.', 'كلمات زي algebra وzenith وazimuth وzero دخلت اللغات الأوروبية عن طريق العربية.'],
    ],
    legacy: [
      "Baghdad's scholars handed on Greek, Persian and Indian knowledge — and added their own algebra, optics, medicine and astronomy. Their books fed the universities of medieval Europe.",
      'علماء بغداد نقلوا المعرفة اليونانية والفارسية والهندية — وزادوا عليها جبرهم وبصرياتهم وطبهم وفلكهم. وكتبهم غذّت جامعات أوروبا في العصور الوسطى.',
    ],
  },
};
