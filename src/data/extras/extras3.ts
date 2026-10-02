import type { Extras } from './types';

/** Panel III — infographic details. */
export const extrasPanelThree: Record<string, Extras> = {
  'mansa-musa': {
    place: ['Timbuktu, Mali (route: Mali → Cairo → Mecca)', 'تمبكتو، مالي (الطريق: مالي ← القاهرة ← مكة)'],
    coords: [16.773, -3.007],
    stats: [
      { v: ['over 6,000 km', 'أكتر من 6,000 كم'], l: ['one-way journey to Mecca', 'رحلة الذهاب لمكة'] },
      { v: ['≈60,000', '≈60,000'], l: ['travellers, as reported by al-ʿUmari', 'مسافر، حسب ما نقل العمري'] },
      { v: ['≈1 year', '≈سنة'], l: ['the pilgrimage took (1324–25)', 'هي مدة الحج (1324–1325)'] },
      { v: ['1375', '1375'], l: ['the Catalan Atlas shows Musa holding gold', 'الأطلس الكتالاني بيصوّر موسى ماسك ذهب'] },
    ],
    steps: [
      { y: ['c. 1235', 'نحو 1235'], l: ['Sundiata founds the Mali Empire', 'سونجاتا بيؤسس إمبراطورية مالي'] },
      { y: ['c. 1312', 'نحو 1312'], l: ['Musa becomes mansa', 'موسى بيصير منسا'] },
      { y: ['1324', '1324'], l: ['Sets out for Mecca; reaches Cairo in July', 'بيتحرك لمكة ويوصل القاهرة في يوليو'] },
      { y: ['c. 1327', 'نحو 1327'], l: ['Djinguereber Mosque built in Timbuktu', 'بناء جامع جينغاريبر في تمبكتو'] },
      { y: ['1352–53', '1352–1353'], l: ['Ibn Battuta visits Mali', 'ابن بطوطة بيزور مالي'] },
      { y: ['1375', '1375'], l: ['The Catalan Atlas depicts “Musse Melly”', 'الأطلس الكتالاني بيصوّر «Musse Melly»'] },
    ],
    facts: [
      ["Cairo's gold market reportedly took years to recover from Musa's spending.", 'سوق الذهب في القاهرة اتقال إنه احتاج سنين يتعافى من إنفاق موسى.'],
      ['“Mansa” means king or emperor in the Mandinka language.', '«منسا» معناها ملك أو إمبراطور بلغة الماندينكا.'],
      ['The Catalan Atlas labels him “Musse Melly” and calls him the richest and noblest lord of the land.', 'الأطلس الكتالاني كاتب اسمه «Musse Melly» وبيقول عليه أغنى وأنبل سيد في المنطقة.'],
    ],
    legacy: [
      "Mali's wealth and learning put West Africa on the map of the medieval world; Timbuktu's private libraries still hold hundreds of thousands of manuscripts (estimated).",
      'ثروة مالي وعلمها حطّوا غرب أفريقيا على خريطة العالم في العصور الوسطى؛ ومكتبات تمبكتو الخاصة لسه فيها مئات الآلاف من المخطوطات (تقدير).',
    ],
  },

  'gutenberg-press': {
    place: ['Mainz, Germany', 'ماينتس، ألمانيا'],
    coords: [49.993, 8.247],
    stats: [
      { v: ['≈180', '≈180'], l: ['copies of the Bible printed (≈49 survive)', 'نسخة من الإنجيل اتطبعت (بقي منها ≈49)'] },
      { v: ['≈1,280', '≈1,280'], l: ['pages in the two-volume Bible', 'صفحة في الإنجيل ذي المجلدين'] },
      { v: ['≈250', '≈250'], l: ['European towns with presses by 1500', 'بلدة أوروبية فيها مطابع بحلول 1500'] },
      { v: ['≈20 million', '≈20 مليون'], l: ['books printed in Europe by 1500 (est.)', 'كتاب اتطبع في أوروبا بحلول 1500 (تقدير)'] },
    ],
    steps: [
      { y: ['1439', '1439'], l: ["A Strasbourg lawsuit mentions Gutenberg's secret work", 'دعوى ستراسبورغ بتذكر شغل غوتنبرغ السري'] },
      { y: ['c. 1440–50', 'نحو 1440–1450'], l: ['Type mould, ink and press perfected in Mainz', 'تطوير قالب الحروف والحبر والمكبس في ماينتس'] },
      { y: ['c. 1455', 'نحو 1455'], l: ['The 42-line Bible is printed', 'طباعة إنجيل الـ42 سطرًا'] },
      { y: ['1455', '1455'], l: ['Fust sues and takes over the workshop', 'فوست بيرفع دعوى ويستولي على الورشة'] },
      { y: ['1465', '1465'], l: ['First presses in Italy (Subiaco)', 'أول مطابع في إيطاليا (سوبياكو)'] },
      { y: ['1476', '1476'], l: ['William Caxton prints in England', 'وليم كاكستون بيطبع في إنجلترا'] },
    ],
    facts: [
      ["The Korean Jikji of 1377, printed with metal type, is about 78 years older than Gutenberg's Bible.", '«جيكجي» الكوري سنة 1377، المطبوع بحروف معدنية، أقدم من إنجيل غوتنبرغ بحوالي 78 سنة.'],
      ['“Type metal” — lead, tin and antimony — is still the basis of traditional typefounding.', '«معدن الحروف» — رصاص وقصدير وإثمد — لسه أساس سباكة الحروف التقليدية.'],
      ['A scribe might need a year or more to copy one Bible; a press could print many copies in the same time.', 'الناسخ ممكن يحتاج سنة أو أكتر لنسخ إنجيل واحد؛ والمطبعة تقدر تطبع نسخ كتير في نفس الوقت.'],
    ],
    legacy: [
      'Cheap, uniform books spread ideas faster than ever — from Reformation pamphlets to scientific treatises — and laid the groundwork for mass literacy and modern publishing.',
      'الكتب الرخيصة الموحّدة نشرت الأفكار أسرع من أي وقت — من كتيبات الإصلاح لرسائل العلم — ومهّدت لانتشار القراءة والنشر الحديث.',
    ],
  },

  'fall-of-tenochtitlan': {
    place: ['Mexico City (ancient Tenochtitlan), Mexico', 'مدينة مكسيكو (تينوشتيتلان قديمًا)'],
    coords: [19.433, -99.133],
    stats: [
      { v: ['≈200,000', '≈200,000'], l: ['inhabitants in 1519 (est.)', 'نسمة سنة 1519 (تقدير)'] },
      { v: ['3', '3'], l: ['great causeways linking the island to the mainland', 'جسور كبيرة بتربط الجزيرة بالبر'] },
      { v: ['≈900', '≈900'], l: ['Spanish soldiers in the final assault (est.)', 'جندي إسباني في الهجوم الأخير (تقدير)'] },
      { v: ['≈3 months', '≈3 شهور'], l: ['of siege, May–August 1521', 'مدة الحصار، مايو–أغسطس 1521'] },
    ],
    compare: {
      title: ['Big cities around 1500', 'مدن كبرى حوالي 1500'],
      unit: ['thousand people', 'ألف نسمة'],
      note: ['Rough scholarly estimates of population.', 'تقديرات تقريبية للسكان.'],
      items: [
        { l: ['Beijing', 'بكين'], n: 672 },
        { l: ['Vijayanagara', 'فيجاياناجارا'], n: 500 },
        { l: ['Cairo', 'القاهرة'], n: 400 },
        { l: ['Tenochtitlan (1519)', 'تينوشتيتلان (1519)'], n: 200, hi: true },
        { l: ['Paris', 'باريس'], n: 185 },
      ],
    },
    steps: [
      { y: ['c. 1325', 'نحو 1325'], l: ['The city is founded on a lake island', 'تأسيس المدينة على جزيرة في بحيرة'] },
      { y: ['1428', '1428'], l: ['The Triple Alliance forms', 'تكوّن الحلف الثلاثي'] },
      { y: ['Nov 1519', 'نوفمبر 1519'], l: ['Cortés enters the city', 'كورتيس بيدخل المدينة'] },
      { y: ['May–Jun 1520', 'مايو–يونيو 1520'], l: ['Toxcatl massacre; the Spaniards flee', 'مذبحة توكسكاتل وهروب الإسبان'] },
      { y: ['1520', '1520'], l: ['Smallpox sweeps the valley', 'الجدري بيكتسح الوادي'] },
      { y: ['13 Aug 1521', '13 أغسطس 1521'], l: ['Cuauhtémoc is captured', 'أسر كواوتيموك'] },
    ],
    facts: [
      ['In 1978, electricity workers digging in Mexico City found the great Coyolxauhqui stone — and the Templo Mayor.', 'سنة 1978، عمال كهرباء بيحفروا في مدينة مكسيكو لقوا حجر كويولشاوكي العظيم — ومعاه المعبد الأكبر.'],
      ['Mexico City still sinks because it is built on a drained lake bed.', 'مدينة مكسيكو لسه بتغوص لأنها مبنية على قاع بحيرة اتنشّفت.'],
      ['The name “Mexico” comes from the Mexica people.', 'اسم «المكسيك» جاي من شعب المكسيكا.'],
    ],
    legacy: [
      'Mexico City stands on Tenochtitlan’s ruins; Nahuatl is still spoken by over a million people; and the conquest remains a living question in Mexican identity.',
      'مدينة مكسيكو واقفة على أنقاض تينوشتيتلان؛ والناواتل لسه بيتكلمها أكتر من مليون شخص؛ والفتح لسه سؤال حي في الهوية المكسيكية.',
    ],
  },

  'galileo-telescope': {
    place: ['Padua and Venice, Italy', 'بادوفا والبندقية، إيطاليا'],
    coords: [45.406, 11.877],
    stats: [
      { v: ['≈20×', '≈20×'], l: ["magnification of Galileo's best telescope", 'تكبير أفضل تلسكوب عند غاليليو'] },
      { v: ['4', '4'], l: ['moons of Jupiter seen in January 1610', 'أقمار للمشتري شافها في يناير 1610'] },
      { v: ['550', '550'], l: ['copies in the first printing of Sidereus Nuncius', 'نسخة في الطبعة الأولى من «الرسول النجمي»'] },
      { v: ['9 years', '9 سنين'], l: ['under house arrest (1633–42)', 'تحت الإقامة الجبرية (1633–1642)'] },
    ],
    compare: {
      title: ['Magnification', 'قوة التكبير'],
      unit: ['×', '×'],
      note: ['Approximate magnification of each instrument.', 'قوة تكبير تقريبية لكل أداة.'],
      items: [
        { l: ['Naked eye', 'العين المجرّدة'], n: 1 },
        { l: ['Dutch spyglass (1608)', 'المنظار الهولندي (1608)'], n: 3 },
        { l: ['Galileo, Aug 1609', 'غاليليو، أغسطس 1609'], n: 8 },
        { l: ['Galileo, late 1609', 'غاليليو، أواخر 1609'], n: 20, hi: true },
      ],
    },
    steps: [
      { y: ['1608', '1608'], l: ['Lipperhey seeks a patent for the spyglass', 'ليبرهي بيطلب براءة للمنظار'] },
      { y: ['Aug 1609', 'أغسطس 1609'], l: ['Galileo demonstrates an 8× telescope in Venice', 'غاليليو بيعرض تلسكوب 8× في البندقية'] },
      { y: ['Nov–Dec 1609', 'نوفمبر–ديسمبر 1609'], l: ["He observes the Moon's mountains", 'بيرصد جبال القمر'] },
      { y: ['7 Jan 1610', '7 يناير 1610'], l: ['First sees three moons near Jupiter', 'بيشوف أول تلات أقمار قرب المشتري'] },
      { y: ['Mar 1610', 'مارس 1610'], l: ['Sidereus Nuncius is published', 'نشر «الرسول النجمي»'] },
      { y: ['1633', '1633'], l: ['Trial by the Inquisition', 'محاكمة محاكم التفتيش'] },
    ],
    facts: [
      ['The moons we call Io, Europa, Ganymede and Callisto got their names from Simon Marius — Galileo called them the “Medicean Stars”.', 'الأقمار اللي بنسميها آيو ويوروبا وغانيميد وكاليستو اسمها من سيمون ماريوس — وغاليليو كان بيسميها «النجوم الميديتشية».'],
      ['Galileo ground his own lenses.', 'غاليليو كان بيصقل عدساته بنفسه.'],
      ['In 1992 the Catholic Church acknowledged errors in handling his case.', 'في 1992 اعترفت الكنيسة الكاثوليكية بأخطاء في التعامل مع قضيته.'],
    ],
    legacy: [
      "Pointing a lens at the sky changed what counts as evidence in science. Space telescopes — including those that study Jupiter's moons today — are Galileo's heirs.",
      'توجيه عدسة للسماء غيّر معنى الدليل في العلم. والتلسكوبات الفضائية — منها اللي بتدرس أقمار المشتري النهارده — ورثة غاليليو.',
    ],
  },

  'industrial-revolution': {
    place: ['Soho Manufactory, Birmingham, England', 'مصنع سوهو، برمنغهام، إنجلترا'],
    coords: [52.5, -1.93],
    stats: [
      { v: ['≈¼', '≈¼'], l: ['of the coal a Newcomen engine needed', 'من الفحم اللي كان بيحتاجه محرك نيوكومن'] },
      { v: ['≈450', '≈450'], l: ['Boulton & Watt engines built by 1800', 'محرك صنعته بولتون وواط حتى 1800'] },
      { v: ['1769', '1769'], l: ["Watt's separate-condenser patent", 'براءة واط للمكثّف المنفصل'] },
      { v: ['33,000', '33,000'], l: ['foot-pounds per minute — Watt’s “horsepower”', 'رطل-قدم في الدقيقة — «الحصان البخاري» عند واط'] },
    ],
    compare: {
      title: ["Britain's coal output", 'إنتاج بريطانيا من الفحم'],
      unit: ['million tonnes', 'مليون طن'],
      note: ['Approximate annual output.', 'إنتاج سنوي تقريبي.'],
      items: [
        { l: ['1700', '1700'], n: 3 },
        { l: ['1750', '1750'], n: 5 },
        { l: ['1800', '1800'], n: 11, hi: true },
        { l: ['1850', '1850'], n: 50 },
        { l: ['1900', '1900'], n: 225 },
      ],
    },
    steps: [
      { y: ['1712', '1712'], l: ["Newcomen's atmospheric engine", 'محرك نيوكومن الجوي'] },
      { y: ['1769', '1769'], l: ['Watt patents the separate condenser', 'واط بيسجّل براءة المكثّف المنفصل'] },
      { y: ['1776', '1776'], l: ['The first Boulton & Watt engines go to work', 'أول محركات بولتون وواط بتشتغل'] },
      { y: ['1781', '1781'], l: ['A rotary-motion patent opens the way to factories', 'براءة الحركة الدوّارة بتفتح الطريق للمصانع'] },
      { y: ['1825', '1825'], l: ['The Stockton–Darlington railway opens', 'افتتاح سكة ستوكتون–دارلنغتون'] },
      { y: ['1833', '1833'], l: ['The Factory Act limits child labour in textile mills', 'قانون المصانع بيحدّ من تشغيل الأطفال في مصانع النسيج'] },
    ],
    facts: [
      ['The unit of power, the watt, is named after James Watt.', 'وحدة القدرة «الوات» اسمها على اسم جيمس واط.'],
      ['Watt coined “horsepower” to sell engines to people who used horses.', 'واط ابتكر مصطلح «الحصان البخاري» عشان يبيع محركاته لناس كانت بتستخدم الخيل.'],
      ["Britain's coal output grew roughly twenty-fold between 1800 and 1900.", 'إنتاج بريطانيا من الفحم زاد حوالي عشرين ضعف بين 1800 و1900.'],
    ],
    legacy: [
      'The shift to fossil-fuelled industry created modern wealth, cities and global trade — and the carbon emissions that now drive climate change.',
      'التحول للصناعة بالوقود الأحفوري صنع الثروة والمدن والتجارة العالمية الحديثة — وكمان انبعاثات الكربون اللي بتحرّك تغيّر المناخ النهارده.',
    ],
  },

  'rosetta-stone': {
    place: ['Rashid (Rosetta), Egypt', 'رشيد، مصر'],
    coords: [31.404, 30.417],
    stats: [
      { v: ['≈760 kg', '≈760 كجم'], l: ['weight of the stone', 'وزن الحجر'] },
      { v: ['3 scripts', '3 كتابات'], l: ['hieroglyphic, Demotic and Greek — in two languages', 'هيروغليفية وديموطيقية ويونانية — بلغتين'] },
      { v: ['23', '23'], l: ['years from discovery (1799) to decipherment (1822)', 'سنة من الاكتشاف (1799) لفك الرموز (1822)'] },
      { v: ['196 BCE', '196 ق.م'], l: ['date of the Memphis decree', 'تاريخ مرسوم منف'] },
    ],
    compare: {
      title: ['Lines of text that survive', 'سطور النص الباقية'],
      unit: ['lines', 'سطر'],
      note: ['Per script, on the stone as it survives today.', 'في كل كتابة، على الحجر كما هو باقٍ النهارده.'],
      items: [
        { l: ['Greek', 'اليونانية'], n: 54 },
        { l: ['Demotic', 'الديموطيقية'], n: 32 },
        { l: ['Hieroglyphic', 'الهيروغليفية'], n: 14, hi: true },
      ],
    },
    steps: [
      { y: ['196 BCE', '196 ق.م'], l: ['Priests at Memphis issue the decree', 'كهنة منف بيصدروا المرسوم'] },
      { y: ['Jul 1799', 'يوليو 1799'], l: ['Found at Fort Julien near Rashid', 'العثور عليه في حصن جوليان قرب رشيد'] },
      { y: ['1801', '1801'], l: ['Passes to Britain under the Capitulation of Alexandria', 'بينتقل لبريطانيا بمعاهدة استسلام الإسكندرية'] },
      { y: ['1814', '1814'], l: ['Thomas Young reads parts of the Demotic', 'توماس يونغ بيقرا أجزاء من الديموطيقية'] },
      { y: ['27 Sep 1822', '27 سبتمبر 1822'], l: ['Champollion announces the decipherment', 'شامبليون بيعلن فك الرموز'] },
      { y: ['1824', '1824'], l: ['Précis du système hiéroglyphique is published', 'نشر «موجز النظام الهيروغليفي»'] },
    ],
    facts: [
      ['British soldiers painted “Captured in Egypt by the British Army in 1801” on its side.', 'جنود بريطانيين دهنوا على جنب الحجر «اتأخد في مصر بواسطة الجيش البريطاني سنة 1801».'],
      ['No one could read hieroglyphs for about 1,400 years — the last dated inscription is from 394 CE.', 'محدش قدر يقرا الهيروغليفية حوالي 1,400 سنة — وآخر نقش مؤرخ منها سنة 394 م.'],
      ['It is among the most visited objects in the British Museum.', 'هو من أكتر القطع زيارة في المتحف البريطاني.'],
    ],
    legacy: [
      "Because of the Stone, ancient Egypt's voices can be read again — from temple walls to private letters. Its place in London remains a debated question of heritage and ownership.",
      'بفضل الحجر، أصوات مصر القديمة بقت تتقرا تاني — من جدران المعابد لحد الرسايل الخاصة. ومكانه في لندن لسه سؤال مفتوح عن التراث والملكية.',
    ],
  },
};
