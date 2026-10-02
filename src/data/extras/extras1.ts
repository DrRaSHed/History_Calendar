import type { Extras } from './types';

/** Panel I — infographic details. Figures are rounded and drawn from the sources listed on each event. */
export const extrasPanelOne: Record<string, Extras> = {
  'gobekli-tepe': {
    place: ['Şanlıurfa Province, south-eastern Türkiye', 'محافظة شانلي أورفا، جنوب شرق تركيا'],
    coords: [37.223, 38.922],
    stats: [
      { v: ['≈11,500', '≈11,500'], l: ['years since the first enclosures were raised', 'سنة مرّت على بناء أولى الحلقات'] },
      { v: ['5.5 m', '5.5 م'], l: ['height of the tallest pillars in Enclosure D', 'ارتفاع أطول الأعمدة في الحلقة د'] },
      { v: ['≈20', '≈20'], l: ['enclosures estimated by geophysical survey', 'حلقة مقدَّرة بالمسح الجيوفيزيائي'] },
      { v: ['≈1,500', '≈1,500'], l: ['years the monuments were in use (c. 9500–8000 BCE)', 'سنة استُخدمت فيها الحلقات (نحو 9500–8000 ق.م)'] },
    ],
    compare: {
      title: ['How old is it?', 'كام سنة عمره؟'],
      unit: ['years', 'سنة'],
      note: ['Approximate age in years before 2026.', 'العمر التقريبي بالسنين حتى 2026.'],
      items: [
        { l: ['Göbekli Tepe (c. 9500 BCE)', 'غوبكلي تبه (نحو 9500 ق.م)'], n: 11500, hi: true },
        { l: ['Jericho tower (c. 8000 BCE)', 'برج أريحا (نحو 8000 ق.م)'], n: 10000 },
        { l: ['Stonehenge (c. 3000 BCE)', 'ستونهنج (نحو 3000 ق.م)'], n: 5000 },
        { l: ['Great Pyramid (c. 2560 BCE)', 'الهرم الأكبر (نحو 2560 ق.م)'], n: 4600 },
        { l: ['Parthenon (447 BCE)', 'البارثينون (447 ق.م)'], n: 2500 },
      ],
    },
    steps: [
      { y: ['c. 9600 BCE', 'نحو 9600 ق.م'], l: ['The Ice Age ends; foragers gather on the ridge', 'العصر الجليدي بينتهي والصيادين بيتجمعوا على التلّة'] },
      { y: ['c. 9500 BCE', 'نحو 9500 ق.م'], l: ['The first T-shaped pillars are raised', 'أولى أعمدة الـ T بتتنصب'] },
      { y: ['c. 8000 BCE', 'نحو 8000 ق.م'], l: ['The enclosures are buried', 'الحلقات بتتدفن'] },
      { y: ['1994', '1994'], l: ['Klaus Schmidt recognises the site', 'كلاوس شميت بيتعرف على أهمية الموقع'] },
      { y: ['2018', '2018'], l: ['UNESCO World Heritage listing', 'إدراجه في التراث العالمي لليونسكو'] },
    ],
    facts: [
      ['Built before pottery, metal tools or the wheel — everything was carved with flint.', 'اتبنى قبل الفخار وقبل أدوات المعدن وقبل العجلة — وكل حاجة فيه اتنحتت بأدوات الصوان.'],
      ['The pillars may be stylised people: some have carved arms, hands, belts and loincloths.', 'الأعمدة غالبًا بتمثّل بني آدمين بشكل رمزي: بعضها ليه دراعات وإيدين وحزام ومئزر منحوتين.'],
      ['It is more than twice as old as Stonehenge.', 'عمره أكتر من ضعف عمر ستونهنج.'],
    ],
    legacy: [
      'Göbekli Tepe forced archaeologists to rethink the order of events: communal building and ritual may have come before farming and towns, not after. Excavations continue, and nearby sites such as Karahan Tepe show it was part of a wider tradition.',
      'غوبكلي تبه خلّى علماء الآثار يعيدوا ترتيب الأحداث: يمكن البناء الجماعي والطقوس سبقوا الزراعة والمدن مش جم بعدها. والحفائر لسه شغّالة، ومواقع قريبة زي كاراهان تبه بتوري إنه كان جزء من تقليد أوسع.',
    ],
  },

  'great-pyramid': {
    place: ['Giza Plateau, Egypt', 'هضبة الجيزة، مصر'],
    coords: [29.979, 31.134],
    stats: [
      { v: ['146.6 m', '146.6 م'], l: ['original height (about 138.5 m today)', 'الارتفاع الأصلي (حوالي 138.5 م النهارده)'] },
      { v: ['≈2.3 million', '≈2.3 مليون'], l: ['stone blocks', 'كتلة حجرية'] },
      { v: ['≈20 years', '≈20 سنة'], l: ['estimated building time', 'مدة البناء المقدّرة'] },
      { v: ['230 m', '230 م'], l: ['length of each base side', 'طول ضلع القاعدة'] },
    ],
    compare: {
      title: ['Height in metres', 'الارتفاع بالمتر'],
      unit: ['m', 'م'],
      note: ['The Great Pyramid at its original height.', 'الهرم الأكبر بارتفاعه الأصلي.'],
      items: [
        { l: ['Great Pyramid (c. 2560 BCE)', 'الهرم الأكبر (نحو 2560 ق.م)'], n: 146.6, hi: true },
        { l: ['Lincoln Cathedral spire (c. 1311)', 'برج كاتدرائية لينكولن (نحو 1311 م)'], n: 160 },
        { l: ['Eiffel Tower (1889)', 'برج إيفل (1889)'], n: 330 },
        { l: ['Burj Khalifa (2010)', 'برج خليفة (2010)'], n: 828 },
      ],
    },
    steps: [
      { y: ['c. 2600 BCE', 'نحو 2600 ق.م'], l: ["Sneferu's pyramids at Meidum and Dahshur", 'أهرامات سنفرو في ميدوم ودهشور'] },
      { y: ['c. 2580 BCE', 'نحو 2580 ق.م'], l: ["Work begins on Khufu's pyramid at Giza", 'بداية العمل في هرم خوفو بالجيزة'] },
      { y: ['c. 2560 BCE', 'نحو 2560 ق.م'], l: ["Merer's crew ferries limestone from Tura", 'فريق مرر بينقل الحجر الجيري من طرة'] },
      { y: ['c. 2540 BCE', 'نحو 2540 ق.م'], l: ["Khafre's pyramid and the Great Sphinx follow", 'هرم خفرع وأبو الهول بيجوا بعده'] },
      { y: ['2013', '2013'], l: ["Merer's papyri found at Wadi al-Jarf", 'العثور على برديات مرر في وادي الجرف'] },
    ],
    facts: [
      ['For about 3,800 years it was the tallest human-made structure on Earth.', 'فضل لقرابة 3,800 سنة أعلى مبنى صنعه الإنسان على الأرض.'],
      ['Its sides face the cardinal directions within about one-twentieth of a degree.', 'أضلاعه متجهة للجهات الأصلية بدقة تقل عن جزء من عشرين من الدرجة.'],
      ['It is the oldest of the Seven Wonders of the Ancient World — and the only one still standing.', 'هو أقدم عجائب الدنيا السبع في العالم القديم — والوحيد اللي لسه واقف.'],
    ],
    legacy: [
      "The pyramid still anchors Egypt's identity and heritage tourism, and new finds — from workers' towns to Merer's logbook — keep revealing how a whole society was organised to build it.",
      'الهرم لسه عنوان هوية مصر وسياحتها الأثرية، والاكتشافات الجديدة — من مدينة العمال ليوميات مرر — بتكشف إزاي مجتمع كامل اتنظّم عشان يبنيه.',
    ],
  },

  'mohenjo-daro': {
    place: ['Sindh Province, Pakistan', 'إقليم السند، باكستان'],
    coords: [27.329, 68.135],
    stats: [
      { v: ['>1 million km²', 'أكتر من مليون كم²'], l: ['area covered by the Indus civilisation', 'المساحة اللي غطتها حضارة السند'] },
      { v: ['30,000–40,000', '30,000–40,000'], l: ['estimated inhabitants of Mohenjo-daro', 'عدد سكان موهينجو-دارو المقدّر'] },
      { v: ['4 : 2 : 1', '4 : 2 : 1'], l: ['standard brick proportions across the cities', 'نسبة أبعاد الطوب الموحّدة في كل المدن'] },
      { v: ['≈700', '≈700'], l: ['wells reported at Mohenjo-daro', 'بئر مسجّلة في موهينجو-دارو'] },
    ],
    steps: [
      { y: ['c. 7000 BCE', 'نحو 7000 ق.م'], l: ['Farming villages at Mehrgarh', 'قرى زراعية في مهرغار'] },
      { y: ['c. 2600 BCE', 'نحو 2600 ق.م'], l: ['The Mature Harappan phase begins', 'بداية المرحلة الهارابية الناضجة'] },
      { y: ['c. 2500 BCE', 'نحو 2500 ق.م'], l: ['Mohenjo-daro at its height', 'موهينجو-دارو في أوجها'] },
      { y: ['c. 1900 BCE', 'نحو 1900 ق.م'], l: ['Gradual de-urbanisation begins', 'بداية التراجع التدريجي للمدن'] },
      { y: ['1924', '1924'], l: ['John Marshall announces the civilisation', 'جون مارشال بيعلن اكتشاف الحضارة'] },
      { y: ['1980', '1980'], l: ['UNESCO World Heritage listing', 'إدراجها في التراث العالمي لليونسكو'] },
    ],
    facts: [
      ["“Mohenjo-daro” is a modern Sindhi name often translated “Mound of the Dead” — the ancient name is unknown.", 'اسم «موهينجو-دارو» حديث بلغة السند ومعناه الشائع «تلّ الموتى» — واسمها القديم مجهول.'],
      ['Covered drains had inspection holes for cleaning, more than 4,000 years ago.', 'المجاري المغطاة كان فيها فتحات للتفتيش والتنظيف من أكتر من 4,000 سنة.'],
      ['No palaces, royal tombs or monumental statues of rulers have been found.', 'ما اتلاقاش قصور ولا مقابر ملكية ولا تماثيل ضخمة لحكام.'],
    ],
    legacy: [
      'Indus city planning, drainage and standard weights still impress engineers. Its script is undeciphered, so the people who built it remain silent in their own words.',
      'تخطيط مدن السند وصرفها وأوزانها الموحّدة لسه بتبهر المهندسين. وكتابتها لسه مش مفكوكة، فأصحابها لسه ساكتين بلسانهم هم.',
    ],
  },

  'code-of-hammurabi': {
    place: ['Babylon, Iraq (the stele was found at Susa, Iran)', 'بابل، العراق (والمسلّة اتلاقت في سوسة، إيران)'],
    coords: [32.536, 44.421],
    stats: [
      { v: ['≈282', '≈282'], l: ['legal provisions on the stele', 'مادة قانونية على المسلّة'] },
      { v: ['2.25 m', '2.25 م'], l: ['height of the basalt stele', 'ارتفاع مسلّة البازلت'] },
      { v: ['≈3,800', '≈3,800'], l: ['years old', 'سنة هو عمرها'] },
      { v: ['≈42', '≈42'], l: ["years of Hammurabi's reign", 'سنة هي مدة حكم حمورابي'] },
    ],
    compare: {
      title: ['Ancient law collections', 'مجموعات قوانين قديمة'],
      unit: ['years', 'سنة'],
      note: ['Approximate age in years before 2026.', 'العمر التقريبي بالسنين حتى 2026.'],
      items: [
        { l: ['Laws of Ur-Nammu (c. 2100 BCE)', 'قوانين أور-نمو (نحو 2100 ق.م)'], n: 4100 },
        { l: ['Laws of Lipit-Ishtar (c. 1930 BCE)', 'قوانين ليبيت-عشتار (نحو 1930 ق.م)'], n: 3950 },
        { l: ['Hammurabi (c. 1750 BCE)', 'حمورابي (نحو 1750 ق.م)'], n: 3775, hi: true },
        { l: ['Hittite Laws (c. 1600 BCE)', 'القوانين الحثية (نحو 1600 ق.م)'], n: 3600 },
        { l: ['Twelve Tables, Rome (451 BCE)', 'الألواح الاثنا عشر، روما (451 ق.م)'], n: 2475 },
      ],
    },
    steps: [
      { y: ['c. 2100 BCE', 'نحو 2100 ق.م'], l: ['Ur-Nammu issues the earliest known law collection', 'أور-نمو بيصدر أقدم مجموعة قوانين معروفة'] },
      { y: ['1792 BCE', '1792 ق.م'], l: ['Hammurabi becomes king of Babylon', 'حمورابي بيصير ملك بابل'] },
      { y: ['1763 BCE', '1763 ق.م'], l: ['Defeats Larsa and unites most of Mesopotamia', 'بيهزم لارسا ويوحّد معظم بلاد الرافدين'] },
      { y: ['late reign', 'أواخر حكمه'], l: ['The law stele is set up in Babylon', 'المسلّة بتنتصب في بابل'] },
      { y: ['c. 1158 BCE', 'نحو 1158 ق.م'], l: ['Carried to Susa as war booty', 'بتتشال لسوسة كغنيمة حرب'] },
      { y: ['1901–02', '1901–1902'], l: ['Found by French excavators; now in the Louvre', 'بيلاقوها الآثاريين الفرنسيين، وهي دلوقتي في اللوفر'] },
    ],
    facts: [
      ['Law 1: accuse someone of murder without proof, and the accuser is put to death.', 'المادة 1: اللي يتهم حد بالقتل من غير دليل، يتقتل هو.'],
      ["Law 229: if a builder's house collapses and kills its owner, the builder is put to death.", 'المادة 229: لو بيت بناه بنّاء وقع ومات صاحبه، البنّاء بيتعدم.'],
      ['Scribes kept copying the text for more than a thousand years.', 'الكتبة فضلوا ينسخوا النص أكتر من ألف سنة.'],
    ],
    legacy: [
      "The stele stands for the idea that law should be public and written down — though Hammurabi's own laws were far from equal. Hammurabi is among the lawgivers honoured in the frieze of the US Supreme Court.",
      'المسلّة بتمثّل فكرة إن القانون لازم يبقى معلن ومكتوب — مع إن قوانين حمورابي نفسها كانت بعيدة عن المساواة. وحمورابي بين المشرّعين المكرَّمين في إفريز المحكمة العليا الأمريكية.',
    ],
  },

  'shang-oracle-bones': {
    place: ['Yinxu, Anyang, Henan, China', 'يينشو، آنيانغ، خنان، الصين'],
    coords: [36.127, 114.31],
    stats: [
      { v: ['over 100,000', 'أكتر من 100,000'], l: ['inscribed bone and shell fragments found', 'قطعة عظم وصدف منقوشة اتلاقت'] },
      { v: ['≈4,500', '≈4,500'], l: ['different characters recorded', 'علامة مختلفة مسجّلة'] },
      { v: ['about a third', 'حوالي الثلث'], l: ['of those characters deciphered so far', 'من العلامات دي اتفكّت لحد دلوقتي'] },
      { v: ['≈250', '≈250'], l: ['years the late Shang capital Yin was occupied', 'سنة استمرت فيها عاصمة شانغ المتأخرة يين'] },
    ],
    compare: {
      title: ['Early writing systems', 'أنظمة كتابة قديمة'],
      unit: ['years', 'سنة'],
      note: ['Approximate age of the earliest surviving examples.', 'العمر التقريبي لأقدم أمثلة باقية.'],
      items: [
        { l: ['Sumerian cuneiform (c. 3400 BCE)', 'الكتابة المسمارية السومرية (نحو 3400 ق.م)'], n: 5400 },
        { l: ['Egyptian hieroglyphs (c. 3200 BCE)', 'الهيروغليفية المصرية (نحو 3200 ق.م)'], n: 5200 },
        { l: ['Indus script (c. 2600 BCE)', 'كتابة السند (نحو 2600 ق.م)'], n: 4600 },
        { l: ['Chinese oracle-bone script (c. 1250 BCE)', 'كتابة عظام التنبؤ الصينية (نحو 1250 ق.م)'], n: 3300, hi: true },
        { l: ['Maya script (c. 300 BCE)', 'كتابة المايا (نحو 300 ق.م)'], n: 2300 },
      ],
    },
    steps: [
      { y: ['c. 1300 BCE', 'نحو 1300 ق.م'], l: ['The Shang capital moves to Yin', 'عاصمة شانغ بتنتقل ليين'] },
      { y: ['c. 1250 BCE', 'نحو 1250 ق.م'], l: ["Wu Ding's court makes most inscriptions", 'بلاط وو دينغ بيعمل معظم النقوش'] },
      { y: ['1899', '1899'], l: ['Wang Yirong recognises the script', 'وانغ يي رونغ بيتعرف على الخط'] },
      { y: ['1928', '1928'], l: ['Excavations begin at Anyang', 'بدء الحفائر في آنيانغ'] },
      { y: ['1976', '1976'], l: ['The tomb of Fu Hao is found intact', 'العثور على قبر فو هاو سليم'] },
      { y: ['2006', '2006'], l: ['Yinxu becomes a World Heritage Site', 'يينشو بتبقى موقع تراث عالمي'] },
    ],
    facts: [
      ['Questions covered everything from harvests and war to toothaches and childbirth.', 'الأسئلة غطّت كل حاجة، من المحاصيل والحرب لوجع الأسنان والولادة.'],
      ['Some characters are still recognisable today, such as 日 (sun), 月 (moon) and 馬 (horse).', 'فيه حروف لسه بنعرفها النهارده، زي 日 (الشمس) و月 (القمر) و馬 (الحصان).'],
      ['Farmers once sold the bones as “dragon bones” for medicine.', 'الفلاحين كانوا بيبيعوا العظام كـ«عظام تنين» للدوا.'],
    ],
    legacy: [
      'Oracle-bone script is the direct ancestor of Chinese writing, which has been in continuous use for over three thousand years.',
      'كتابة عظام التنبؤ هي الجد المباشر للكتابة الصينية، اللي مستخدمة بشكل متواصل من أكتر من تلات آلاف سنة.',
    ],
  },

  'olmec-san-lorenzo': {
    place: ['San Lorenzo, Veracruz, Mexico', 'سان لورينزو، فيراكروز، المكسيك'],
    coords: [17.724, -94.753],
    stats: [
      { v: ['17', '17'], l: ['colossal heads known, across four sites', 'رأسًا ضخمًا معروفة في أربعة مواقع'] },
      { v: ['6–50 t', '6–50 طن'], l: ['weight of the colossal heads', 'وزن الرؤوس الضخمة'] },
      { v: ['over 50 km', 'أكتر من 50 كم'], l: ['distance the basalt was hauled', 'المسافة اللي اتنقل بيها البازلت'] },
      { v: ['c. 1200 BCE', 'نحو 1200 ق.م'], l: ['San Lorenzo rises to prominence', 'بداية صعود سان لورينزو'] },
    ],
    compare: {
      title: ['Colossal heads by site', 'الرؤوس الضخمة حسب الموقع'],
      unit: ['heads', 'رؤوس'],
      items: [
        { l: ['San Lorenzo', 'سان لورينزو'], n: 10, hi: true },
        { l: ['La Venta', 'لا فينتا'], n: 4 },
        { l: ['Tres Zapotes', 'تريس سابوتس'], n: 2 },
        { l: ['La Cobata', 'لا كوباتا'], n: 1 },
      ],
    },
    steps: [
      { y: ['c. 1600 BCE', 'نحو 1600 ق.م'], l: ['Offerings at the El Manatí spring', 'قرابين عند نبع إل ماناتي'] },
      { y: ['c. 1200 BCE', 'نحو 1200 ق.م'], l: ['The San Lorenzo plateau is built up', 'بناء هضبة سان لورينزو'] },
      { y: ['c. 900 BCE', 'نحو 900 ق.م'], l: ['San Lorenzo declines; La Venta rises', 'تراجع سان لورينزو وصعود لا فينتا'] },
      { y: ['c. 400 BCE', 'نحو 400 ق.م'], l: ['La Venta is abandoned', 'هجر لا فينتا'] },
      { y: ['1862', '1862'], l: ['First colossal head found at Tres Zapotes', 'العثور على أول رأس ضخم في تريس سابوتس'] },
      { y: ['1938–46', '1938–1946'], l: ["Stirling's expeditions", 'بعثات ستيرلنغ'] },
    ],
    facts: [
      ['No two heads have the same face — they look like portraits.', 'مفيش رأسين ليهم نفس الوجه — شكلهم صور شخصية.'],
      ['Some heads were re-carved from earlier thrones.', 'بعض الرؤوس اتنحتت من عروش أقدم.'],
      ['“Olmec” means “rubber people” in Nahuatl — the name the Aztecs gave to later inhabitants of the region.', '«أولمك» معناها «أهل المطاط» بالناواتل — الاسم اللي سمّى بيه الأزتك السكان اللي جم بعدهم في المنطقة.'],
    ],
    legacy: [
      'The Olmec set patterns in monumental art, ritual and rulership that later Mesoamerican societies built on — even as scholars debate how direct the influence was.',
      'الأولمك حطّوا أنماط في الفن النصبي والطقوس والحكم بنت عليها مجتمعات أمريكا الوسطى اللي بعدهم — حتى لو الباحثين بيتناقشوا في مدى مباشرة التأثير.',
    ],
  },
};
