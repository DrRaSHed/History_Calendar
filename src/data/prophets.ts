/**
 * Prophets in Jewish and Islamic tradition, drawn as a thin thread through the Levant & Arabia lane.
 *
 * `tradition` records who counts the figure *as a prophet*: 'both', 'jewish' (rabbinic tradition) or 'islam'.
 * Dates are traditional and approximate — before the monarchy they follow the Jewish Anno Mundi reckoning
 * (Seder Olam), or the order of the Qurʾanic narrative where neither tradition gives a date; from David on
 * they follow conventional historical estimates. Most cannot be verified historically.
 */
import type { Bi } from './extras/types';

export type Tradition = 'both' | 'jewish' | 'islam';

export interface Prophet {
  id: string;
  /** Year used to place the marker on the chart (negative = BCE). */
  year: number;
  name: Bi;
  when: Bi;
  tradition: Tradition;
  note?: Bi;
  /** Labelled first (and drawn on top) where markers crowd together. */
  major?: boolean;
}

/** Vertical position (percent of the chart area): between the Nile and Mesopotamia lanes — the Levant & Arabia. */
export const PROPHETS_LANE = 44.5;

export const TRADITION_COLOR: Record<Tradition, string> = {
  both: '#A8863A',
  jewish: '#2F5D8A',
  islam: '#2E7D4F',
};

export const prophets: Prophet[] = [
  {
    id: 'adam',
    major: true,
    year: -3760,
    name: ['Adam', 'آدم'],
    when: ['epoch of the Hebrew calendar, 3761 BCE', 'بداية التقويم العبري، ٣٧٦١ ق.م'],
    tradition: 'islam',
    note: ['The first prophet in Islam; in Judaism the first human, not counted among the prophets.', 'أول الأنبياء في الإسلام؛ وفي اليهودية هو أول البشر ولا يُعدّ من الأنبياء.'],
  },
  {
    id: 'idris',
    year: -3139,
    name: ['Idris (Enoch)', 'إدريس (أخنوخ)'],
    when: ['c. 3100 BCE by traditional reckoning', 'حوالي ٣١٠٠ ق.م بحسب الحساب التقليدي'],
    tradition: 'islam',
    note: ['Often identified with Enoch, who in the Hebrew Bible “walked with God”.', 'يُطابَق غالبًا مع أخنوخ الذي «سار مع الله» في التوراة.'],
  },
  {
    id: 'noah',
    major: true,
    year: -2105,
    name: ['Noah', 'نوح'],
    when: ['the Flood, 2105 BCE in Jewish reckoning', 'الطوفان سنة ٢١٠٥ ق.م في الحساب اليهودي'],
    tradition: 'islam',
    note: ['A prophet in Islam; in Judaism the righteous survivor of the Flood.', 'نبي في الإسلام؛ وفي اليهودية هو الرجل الصالح الناجي من الطوفان.'],
  },
  {
    id: 'hud',
    year: -2000,
    name: ['Hud', 'هود'],
    when: ['no historical date', 'لا يُعرف له تاريخ'],
    tradition: 'islam',
    note: ['Sent to the people of ʿĀd in Arabia; placed between Noah and Abraham, as in the Qurʾanic narrative.', 'أُرسل إلى قوم عاد في جزيرة العرب؛ وموضعه هنا بين نوح وإبراهيم بحسب ترتيب القصص القرآني.'],
  },
  {
    id: 'salih',
    year: -1950,
    name: ['Salih', 'صالح'],
    when: ['no historical date', 'لا يُعرف له تاريخ'],
    tradition: 'islam',
    note: ['Sent to Thamūd, a people tradition links with al-Ḥijr in north-west Arabia; placed as in the Qurʾanic narrative.', 'أُرسل إلى ثمود الذين يربطهم التراث بالحِجر في شمال غرب الجزيرة؛ وموضعه بحسب ترتيب القصص القرآني.'],
  },
  {
    id: 'abraham',
    major: true,
    year: -1812,
    name: ['Abraham', 'إبراهيم'],
    when: ['born 1812 BCE in Jewish tradition; c. 2000–1800 BCE in modern estimates', 'وُلد ١٨١٢ ق.م في التقليد اليهودي؛ وحوالي ٢٠٠٠–١٨٠٠ ق.م في التقديرات الحديثة'],
    tradition: 'both',
    note: ['Patriarch of both traditions — Khalīl Allāh, “the Friend of God”.', 'أبو الأنبياء في التقليدين — خليل الله.'],
  },
  {
    id: 'lot',
    year: -1790,
    name: ['Lot', 'لوط'],
    when: ['in the time of Abraham', 'في زمن إبراهيم'],
    tradition: 'islam',
    note: ['A prophet in Islam; in the Hebrew Bible, Abraham’s nephew.', 'نبي في الإسلام؛ وفي التوراة هو ابن أخي إبراهيم.'],
  },
  {
    id: 'ishmael',
    year: -1726,
    name: ['Ishmael', 'إسماعيل'],
    when: ['born c. 1726 BCE (traditional)', 'وُلد حوالي ١٧٢٦ ق.م (تقليديًا)'],
    tradition: 'islam',
    note: ['A prophet in Islam and ancestor of the Arabs; in the Hebrew Bible, Abraham’s elder son.', 'نبي في الإسلام وجدّ العرب؛ وفي التوراة هو الابن الأكبر لإبراهيم.'],
  },
  {
    id: 'isaac',
    year: -1712,
    name: ['Isaac', 'إسحاق'],
    when: ['born 1712 BCE (traditional)', 'وُلد ١٧١٢ ق.م (تقليديًا)'],
    tradition: 'both',
  },
  {
    id: 'jacob',
    year: -1652,
    name: ['Jacob (Israel)', 'يعقوب (إسرائيل)'],
    when: ['born 1652 BCE (traditional)', 'وُلد ١٦٥٢ ق.م (تقليديًا)'],
    tradition: 'both',
  },
  {
    id: 'joseph',
    year: -1562,
    name: ['Joseph', 'يوسف'],
    when: ['born 1562 BCE (traditional)', 'وُلد ١٥٦٢ ق.م (تقليديًا)'],
    tradition: 'islam',
    note: ['A prophet in Islam (Sūrat Yūsuf); in Judaism a revered son of Jacob, not counted among the prophets.', 'نبي في الإسلام (سورة يوسف)؛ وفي اليهودية ابن يعقوب المُبجَّل ولا يُعدّ من الأنبياء.'],
  },
  {
    id: 'job',
    year: -1400,
    name: ['Job', 'أيوب'],
    when: ['era uncertain', 'عصره غير معروف'],
    tradition: 'both',
    note: ['The Talmud counts him among the prophets to the nations, and its sages disagree on his era.', 'يعدّه التلمود من الأنبياء المُرسَلين إلى الأمم، ويختلف حكماؤه في زمنه.'],
  },
  {
    id: 'miriam',
    year: -1345,
    name: ['Miriam', 'مريم أخت موسى'],
    when: ['in the time of Moses', 'في زمن موسى'],
    tradition: 'jewish',
    note: ['Sister of Moses; one of the seven prophetesses of Jewish tradition.', 'أخت موسى؛ وإحدى النبيّات السبع في التقليد اليهودي.'],
  },
  {
    id: 'aaron',
    year: -1330,
    name: ['Aaron', 'هارون'],
    when: ['in the time of Moses', 'في زمن موسى'],
    tradition: 'both',
  },
  {
    id: 'moses',
    major: true,
    year: -1313,
    name: ['Moses', 'موسى'],
    when: ['Exodus 1313 BCE in Jewish tradition; often placed in the 13th century BCE', 'الخروج ١٣١٣ ق.م في التقليد اليهودي؛ ويُرجَّح كثيرًا في القرن ١٣ ق.م'],
    tradition: 'both',
    note: ['Kalīm Allāh; in Judaism the greatest of the prophets.', 'كليم الله؛ وفي اليهودية هو أعظم الأنبياء.'],
  },
  {
    id: 'shuayb',
    year: -1295,
    name: ['Shuʿayb', 'شعيب'],
    when: ['in the time of Moses (traditional)', 'في زمن موسى (تقليديًا)'],
    tradition: 'islam',
    note: ['Sent to Madyan (Midian); some traditions identify him with Jethro.', 'أُرسل إلى أهل مدين؛ ويطابقه بعضهم مع يثرون.'],
  },
  {
    id: 'joshua',
    year: -1273,
    name: ['Joshua', 'يوشع'],
    when: ['c. 1270 BCE (traditional)', 'حوالي ١٢٧٠ ق.م (تقليديًا)'],
    tradition: 'jewish',
    note: ['Moses’ successor; Islamic tradition also honours him as Yūshaʿ ibn Nūn.', 'خليفة موسى؛ ويُكرِّمه التراث الإسلامي أيضًا باسم يوشع بن نون.'],
  },
  {
    id: 'deborah',
    year: -1150,
    name: ['Deborah', 'دبورة'],
    when: ['c. 12th century BCE', 'حوالي القرن ١٢ ق.م'],
    tradition: 'jewish',
    note: ['Prophetess and judge of Israel.', 'نبيّة وقاضية في بني إسرائيل.'],
  },
  {
    id: 'samuel',
    year: -1070,
    name: ['Samuel', 'صموئيل'],
    when: ['c. 11th century BCE', 'حوالي القرن ١١ ق.م'],
    tradition: 'jewish',
    note: ['Muslim commentators identify him with the prophet of Qurʾan 2:246 (Shamwīl).', 'يرى مفسرون مسلمون أنه النبي المذكور في سورة البقرة (٢٤٦) باسم شمويل.'],
  },
  {
    id: 'david',
    major: true,
    year: -1000,
    name: ['David', 'داود'],
    when: ['reigned c. 1010–970 BCE', 'حكم حوالي ١٠١٠–٩٧٠ ق.م'],
    tradition: 'both',
    note: ['King and psalmist; the Zabūr (Psalms) is attributed to him.', 'ملك وصاحب المزامير، ويُنسب إليه الزبور.'],
  },
  {
    id: 'nathan',
    year: -985,
    name: ['Nathan', 'ناثان'],
    when: ['at the court of David', 'في بلاط داود'],
    tradition: 'jewish',
  },
  {
    id: 'solomon',
    major: true,
    year: -950,
    name: ['Solomon', 'سليمان'],
    when: ['reigned c. 970–931 BCE', 'حكم حوالي ٩٧٠–٩٣١ ق.م'],
    tradition: 'both',
    note: ['Builder of the First Temple in Jerusalem.', 'باني الهيكل الأول في القدس.'],
  },
  {
    id: 'elijah',
    year: -860,
    name: ['Elijah', 'إلياس'],
    when: ['c. 9th century BCE', 'حوالي القرن ٩ ق.م'],
    tradition: 'both',
  },
  {
    id: 'elisha',
    year: -830,
    name: ['Elisha', 'اليسع'],
    when: ['c. 9th century BCE', 'حوالي القرن ٩ ق.م'],
    tradition: 'both',
  },
  {
    id: 'jonah',
    year: -785,
    name: ['Jonah', 'يونس'],
    when: ['c. 8th century BCE', 'حوالي القرن ٨ ق.م'],
    tradition: 'both',
  },
  {
    id: 'amos',
    year: -760,
    name: ['Amos', 'عاموس'],
    when: ['c. 760 BCE', 'حوالي ٧٦٠ ق.م'],
    tradition: 'jewish',
  },
  {
    id: 'hosea',
    year: -748,
    name: ['Hosea', 'هوشع'],
    when: ['c. 750 BCE', 'حوالي ٧٥٠ ق.م'],
    tradition: 'jewish',
  },
  {
    id: 'isaiah',
    year: -725,
    name: ['Isaiah', 'إشعياء'],
    when: ['c. 740–700 BCE', 'حوالي ٧٤٠–٧٠٠ ق.م'],
    tradition: 'jewish',
  },
  {
    id: 'huldah',
    year: -622,
    name: ['Huldah', 'خلدة'],
    when: ['622 BCE, under King Josiah', '٦٢٢ ق.م في عهد الملك يوشيا'],
    tradition: 'jewish',
    note: ['One of the seven prophetesses of Jewish tradition.', 'إحدى النبيّات السبع في التقليد اليهودي.'],
  },
  {
    id: 'jeremiah',
    year: -605,
    name: ['Jeremiah', 'إرميا'],
    when: ['c. 627–586 BCE', 'حوالي ٦٢٧–٥٨٦ ق.م'],
    tradition: 'jewish',
  },
  {
    id: 'ezekiel',
    year: -585,
    name: ['Ezekiel', 'حزقيال'],
    when: ['in the Babylonian exile, c. 593–571 BCE', 'في السبي البابلي، حوالي ٥٩٣–٥٧١ ق.م'],
    tradition: 'jewish',
  },
  {
    id: 'haggai',
    year: -520,
    name: ['Haggai & Zechariah', 'حجّي وزكريا بن برخيا'],
    when: ['520 BCE, rebuilding the Temple', '٥٢٠ ق.م وقت إعادة بناء الهيكل'],
    tradition: 'jewish',
  },
  {
    id: 'malachi',
    year: -450,
    name: ['Malachi', 'ملاخي'],
    when: ['c. 5th century BCE', 'حوالي القرن ٥ ق.م'],
    tradition: 'jewish',
    note: ['In Jewish tradition the last of the prophets; prophecy then ceases.', 'آخر الأنبياء في التقليد اليهودي، وبعده انقطعت النبوة.'],
  },
  {
    id: 'zakariya',
    year: -15,
    name: ['Zakariyya', 'زكريا'],
    when: ['late 1st century BCE', 'أواخر القرن ١ ق.م'],
    tradition: 'islam',
    note: ['Father of John the Baptist — a different person from the Hebrew prophet Zechariah.', 'والد يحيى — وهو غير النبي زكريا المذكور في التوراة.'],
  },
  {
    id: 'yahya',
    year: 25,
    name: ['Yahya (John the Baptist)', 'يحيى'],
    when: ['early 1st century CE', 'أوائل القرن ١ م'],
    tradition: 'islam',
  },
  {
    id: 'isa',
    major: true,
    year: 30,
    name: ['ʿĪsā (Jesus)', 'عيسى'],
    when: ['c. 4 BCE – c. 30 CE', 'حوالي ٤ ق.م – ٣٠ م'],
    tradition: 'islam',
    note: ['A prophet in Islam; Judaism does not count him among the prophets.', 'نبي في الإسلام؛ ولا تعدّه اليهودية من الأنبياء.'],
  },
  {
    id: 'muhammad',
    major: true,
    year: 610,
    name: ['Muhammad', 'محمد'],
    when: ['born c. 570; revelation from 610; died 632 CE', 'وُلد حوالي ٥٧٠، ونزل عليه الوحي سنة ٦١٠، وتوفي ٦٣٢ م'],
    tradition: 'islam',
    note: ['The Seal of the Prophets in Islam.', 'خاتم الأنبياء في الإسلام.'],
  },
];

/** Span of the thread: from the first figure to the death of Muhammad. */
export const PROPHETS_SPAN = { start: prophets[0].year, end: 632 };
