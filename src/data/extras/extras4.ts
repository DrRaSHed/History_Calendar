import type { Extras } from './types';

/** Panel IV — infographic details. */
export const extrasPanelFour: Record<string, Extras> = {
  'influenza-1918': {
    place: ['Worldwide — first documented clusters in Kansas, France and elsewhere', 'العالم كله — أولى البؤر الموثقة في كانساس وفرنسا وأماكن أخرى'],
    coords: null,
    stats: [
      { v: ['≈500 million', '≈500 مليون'], l: ['people infected (about a third of humanity)', 'شخص اتصابوا (تقريبًا تلت البشرية)'] },
      { v: ['17–50 million+', '17–50 مليون أو أكتر'], l: ['estimated deaths', 'وفيات مقدّرة'] },
      { v: ['3', '3'], l: ['waves between 1918 and 1920', 'موجات بين 1918 و1920'] },
      { v: ['12 years', '12 سنة'], l: ['drop in US life expectancy in 1918 (≈51 → ≈39)', 'انخفاض متوسط العمر المتوقع في أمريكا سنة 1918 (≈51 ← ≈39)'] },
    ],
    compare: {
      title: ['Deaths in context', 'الوفيات في سياقها'],
      unit: ['million', 'مليون'],
      note: ['Rough estimates. The 1918 range is 17–50+ million; the Black Death range is 75–200 million.', 'تقديرات تقريبية. ومدى 1918 بين 17 و50 مليون أو أكتر؛ ومدى الموت الأسود بين 75 و200 مليون.'],
      items: [
        { l: ['COVID-19 (reported to WHO)', 'كوفيد-19 (المبلَّغ لمنظمة الصحة)'], n: 7 },
        { l: ['World War I (military + civilian)', 'الحرب العالمية الأولى (عسكريون ومدنيون)'], n: 20 },
        { l: ['1918 influenza (upper range)', 'إنفلونزا 1918 (الحد الأعلى)'], n: 50, hi: true },
        { l: ['Black Death (low estimate)', 'الموت الأسود (التقدير الأدنى)'], n: 75 },
      ],
    },
    steps: [
      { y: ['Mar 1918', 'مارس 1918'], l: ['Outbreak at Camp Funston, Kansas', 'تفشٍّ في معسكر فانستون، كانساس'] },
      { y: ['Spring 1918', 'ربيع 1918'], l: ['A mild first wave spreads with troops', 'موجة أولى خفيفة بتنتشر مع الجنود'] },
      { y: ['Aug–Oct 1918', 'أغسطس–أكتوبر 1918'], l: ['A deadly second wave erupts across three continents', 'موجة تانية قاتلة بتنفجر في تلات قارات'] },
      { y: ['Oct 1918', 'أكتوبر 1918'], l: ['Deadliest month; San Francisco orders masks', 'أفتك شهر، وسان فرانسيسكو بتفرض الكمامات'] },
      { y: ['1919', '1919'], l: ['The third wave', 'الموجة التالتة'] },
      { y: ['2005', '2005'], l: ['The virus is reconstructed from preserved tissue', 'إعادة بناء الفيروس من أنسجة محفوظة'] },
    ],
    facts: [
      ['It was called the “Spanish flu” only because neutral Spain reported it openly during wartime censorship.', 'اتسمّت «الإنفلونزا الإسبانية» بس لأن إسبانيا المحايدة هي اللي أعلنت عنها وسط رقابة الحرب.'],
      ['Unusually, it killed many healthy young adults.', 'وبشكل غير معتاد، قتلت شباب أصحاء كتير.'],
      ['Samoa shows how quarantine mattered: Western Samoa lost about a fifth of its people; American Samoa, which quarantined, had no deaths.', 'ساموا بتوري أهمية الحجر: ساموا الغربية فقدت حوالي الخُمس، وساموا الأمريكية اللي حجرت ما سجّلتش وفيات.'],
    ],
    legacy: [
      'The 1918 pandemic still shapes pandemic planning, vaccine research and public-health history — and reminds us that how societies respond matters as much as the virus.',
      'جائحة 1918 لسه بتشكّل خطط مواجهة الأوبئة وأبحاث اللقاحات وتاريخ الصحة العامة — وبتفكّرنا إن رد فعل المجتمعات مهم زي الفيروس نفسه.',
    ],
  },

  'trinity-test': {
    place: ['Jornada del Muerto, New Mexico, USA', 'خورنادا ديل مويرتو، نيو مكسيكو، أمريكا'],
    coords: [33.677, -106.475],
    stats: [
      { v: ['5:29 a.m.', '5:29 صباحًا'], l: ['time of the detonation, 16 July 1945', 'وقت التفجير، 16 يوليو 1945'] },
      { v: ['≈21–25 kt', '≈21–25 كيلوطن'], l: ['explosive yield, in thousands of tonnes of TNT', 'قوة الانفجار بآلاف الأطنان من ت.ن.ت'] },
      { v: ['30 m', '30 م'], l: ['height of the steel tower holding the device', 'ارتفاع البرج الصلب اللي عليه الجهاز'] },
      { v: ['≈130,000', '≈130,000'], l: ['people employed by the Manhattan Project at its peak', 'شخص اشتغلوا في مشروع مانهاتن في ذروته'] },
    ],
    steps: [
      { y: ['1938', '1938'], l: ['Nuclear fission is discovered', 'اكتشاف الانشطار النووي'] },
      { y: ['1939', '1939'], l: ['The Einstein–Szilard letter to Roosevelt', 'رسالة أينشتاين–سيلارد لروزفلت'] },
      { y: ['Dec 1942', 'ديسمبر 1942'], l: ['First controlled chain reaction, Chicago', 'أول تفاعل متسلسل متحكَّم فيه، شيكاغو'] },
      { y: ['16 Jul 1945', '16 يوليو 1945'], l: ['The Trinity test', 'تجربة ترينيتي'] },
      { y: ['6 & 9 Aug 1945', '6 و9 أغسطس 1945'], l: ['Hiroshima and Nagasaki', 'هيروشيما وناغازاكي'] },
      { y: ['1968', '1968'], l: ['The Non-Proliferation Treaty opens for signature', 'فتح باب التوقيع على معاهدة حظر الانتشار النووي'] },
    ],
    facts: [
      ['Oppenheimer reportedly named the test “Trinity”, inspired by a poem by John Donne.', 'يُقال إن أوبنهايمر سمّى التجربة «ترينيتي» تأثرًا بقصيدة لجون دون.'],
      ['Enrico Fermi estimated the blast by dropping scraps of paper and watching how far the shockwave carried them.', 'إنريكو فيرمي قدّر قوة الانفجار برمي قصاصات ورق وملاحظة المسافة اللي نقلتها بيها موجة الصدمة.'],
      ['Trinitite, the green glass left behind, is mildly radioactive.', 'الترينيتيت، الزجاج الأخضر اللي اتبقى، فيه إشعاع خفيف.'],
    ],
    legacy: [
      'Trinity opened the nuclear age — arms races, treaties, nuclear power and a permanent debate about responsibility. The test site is now a National Historic Landmark, open to visitors only a couple of days each year.',
      'ترينيتي فتحت العصر النووي — سباقات تسلح ومعاهدات وطاقة نووية ونقاش دايم عن المسؤولية. وموقع التجربة دلوقتي معلم تاريخي وطني، وبيفتح للزوار يومين بس في السنة.',
    ],
  },

  'apollo-11': {
    place: ['Sea of Tranquility, the Moon', 'بحر الهدوء، القمر'],
    coords: [0.674, 23.473],
    body: 'moon',
    stats: [
      { v: ['384,400 km', '384,400 كم'], l: ['average distance from Earth to the Moon', 'متوسط المسافة بين الأرض والقمر'] },
      { v: ['21.5 kg', '21.5 كجم'], l: ['of lunar samples brought back', 'من العينات القمرية اتجابت'] },
      { v: ['2 h 31 min', 'ساعتين و31 دقيقة'], l: ['moonwalk of Armstrong and Aldrin', 'مدة سير أرمسترونغ وألدرين على القمر'] },
      { v: ['≈600 million', '≈600 مليون'], l: ['people estimated to have watched live', 'شخص يُقدَّر إنهم شافوا الهبوط مباشر'] },
    ],
    compare: {
      title: ['Moon rock returned', 'صخور القمر المرجَعة'],
      unit: ['kg', 'كجم'],
      note: ['Sample mass returned by each landing mission.', 'كتلة العينات اللي رجّعتها كل مهمة هبوط.'],
      items: [
        { l: ['Apollo 11', 'أبولو 11'], n: 21.5, hi: true },
        { l: ['Apollo 12', 'أبولو 12'], n: 34.3 },
        { l: ['Apollo 14', 'أبولو 14'], n: 42.3 },
        { l: ['Apollo 15', 'أبولو 15'], n: 77.3 },
        { l: ['Apollo 16', 'أبولو 16'], n: 95.7 },
        { l: ['Apollo 17', 'أبولو 17'], n: 110.5 },
      ],
    },
    steps: [
      { y: ['1957', '1957'], l: ['Sputnik launches the Space Race', 'سبوتنيك بيبدأ سباق الفضاء'] },
      { y: ['1961', '1961'], l: ['Gagarin orbits Earth; Kennedy sets the Moon goal', 'غاغارين بيدور حوالين الأرض وكينيدي بيحدد هدف القمر'] },
      { y: ['27 Jan 1967', '27 يناير 1967'], l: ['The Apollo 1 fire kills three astronauts', 'حريق أبولو 1 بيقتل تلات رواد'] },
      { y: ['16 Jul 1969', '16 يوليو 1969'], l: ['Apollo 11 launches', 'إطلاق أبولو 11'] },
      { y: ['20 Jul 1969', '20 يوليو 1969'], l: ['Eagle lands in the Sea of Tranquility', '«إيغل» بتهبط في بحر الهدوء'] },
      { y: ['24 Jul 1969', '24 يوليو 1969'], l: ['Splashdown in the Pacific', 'هبوط في المحيط الهادئ'] },
    ],
    facts: [
      ['Michael Collins was alone in lunar orbit, out of radio contact for about 48 minutes of each 2-hour orbit.', 'مايكل كولينز كان لوحده في مدار القمر ومن غير اتصال لاسلكي حوالي 48 دقيقة في كل دورة ساعتين.'],
      ['The guidance computer had about 4 KB of working memory.', 'كمبيوتر التوجيه كان عنده حوالي 4 كيلوبايت ذاكرة عمل.'],
      ["Aldrin later said the flag was knocked over by the ascent engine's exhaust.", 'ألدرين قال بعدين إن علم القمر وقع من عادم محرك الصعود.'],
    ],
    legacy: [
      'Apollo showed what coordinated science and engineering could do — and its photographs of Earth as a small blue marble helped shape modern environmental thinking.',
      'أبولو وريّت إيه اللي يقدر العلم والهندسة المنسّقين يعملوه — وصورها للأرض ككرة زرقاء صغيرة ساعدت في تشكيل التفكير البيئي الحديث.',
    ],
  },

  'human-genome': {
    place: ['Worldwide — about 20 centres in six countries', 'العالم كله — حوالي 20 مركزًا في ست دول'],
    coords: null,
    stats: [
      { v: ['≈3.1 billion', '≈3.1 مليار'], l: ['base pairs of DNA in the human genome', 'زوج قواعد في الجينوم البشري'] },
      { v: ['≈20,000', '≈20,000'], l: ['protein-coding genes', 'جين مشفّر للبروتين'] },
      { v: ['13 years', '13 سنة'], l: ['of the project (1990–2003)', 'عمر المشروع (1990–2003)'] },
      { v: ['99.9%', '99.9%'], l: ['of DNA shared between any two people', 'من الحمض النووي مشترك بين أي شخصين'] },
    ],
    compare: {
      title: ['Genome sizes', 'أحجام الجينومات'],
      unit: ['billion base pairs', 'مليار زوج قواعد'],
      note: ['Approximate haploid genome sizes.', 'أحجام تقريبية للجينوم الأحادي.'],
      items: [
        { l: ['Fruit fly', 'ذبابة الفاكهة'], n: 0.14 },
        { l: ['Maize', 'الذرة'], n: 2.4 },
        { l: ['Mouse', 'الفأر'], n: 2.7 },
        { l: ['Human', 'الإنسان'], n: 3.1, hi: true },
        { l: ['Bread wheat', 'القمح'], n: 16 },
      ],
    },
    steps: [
      { y: ['1953', '1953'], l: ['The double-helix structure is described', 'وصف التركيب اللولبي المزدوج'] },
      { y: ['1977', '1977'], l: ['Sanger develops DNA sequencing', 'سانغر بيطوّر طريقة تسلسل الحمض النووي'] },
      { y: ['1990', '1990'], l: ['The Human Genome Project launches', 'انطلاق مشروع الجينوم البشري'] },
      { y: ['1996', '1996'], l: ['Bermuda Principles: share data openly', 'مبادئ برمودا: مشاركة البيانات علنًا'] },
      { y: ['Jun 2000', 'يونيو 2000'], l: ['A draft is announced at the White House', 'إعلان المسودة في البيت الأبيض'] },
      { y: ['Apr 2003', 'أبريل 2003'], l: ['The project is declared essentially complete', 'إعلان المشروع مكتملًا تقريبًا'] },
      { y: ['2022', '2022'], l: ['The first truly complete sequence is published', 'نشر أول تسلسل كامل حقًّا'] },
    ],
    facts: [
      ['Stretched out, the DNA in a single human cell would be about two metres long.', 'لو اتمدّ الحمض النووي في خلية واحدة، هيبقى طوله حوالي متران.'],
      ['The whole genome would fit on a single CD — about 750 megabytes.', 'الجينوم كله ممكن يتحط على سي دي واحد — حوالي 750 ميجابايت.'],
      ['The first genome cost about US$2.7 billion; today one can be sequenced for a few hundred dollars.', 'أول جينوم كلّف حوالي 2.7 مليار دولار؛ والنهارده ممكن يتسلسل بكام مئة دولار.'],
    ],
    legacy: [
      'Reading the genome made precision medicine, ancient-DNA studies and rapid pathogen tracking possible — and raised new questions about privacy, fairness and who benefits.',
      'قراءة الجينوم فتحت الطب الدقيق ودراسات الحمض النووي القديم وتتبّع مسببات الأمراض بسرعة — وطرحت أسئلة جديدة عن الخصوصية والعدالة ومين المستفيد.',
    ],
  },
};
