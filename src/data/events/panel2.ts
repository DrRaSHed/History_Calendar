import type { HistoricalEvent } from '../../types/timeline';
import { streamY } from '../../lib/ribbonGeometry';

/** Panel II — Classical Eras & Axial Age (500 BCE – 1000 CE) */
export const panelTwoEvents: HistoricalEvent[] = [
  {
    id: 'axial-age-china',
    year: -500,
    yearLabel: 'c. 500 BCE',
    civilizationId: 'eastAsia',
    streamYPosition: streamY('eastAsia', -500),
    title: 'The Axial Age in China: Confucius & Laozi',
    shortSnippet:
      'Amid the fragmenting Zhou order, Confucius teaches ethics and ritual, while traditions attributed to Laozi explore the Dao.',
    importance: 'monumental',
    iconType: 'scroll',
    storytelling: {
      heroQuote:
        'When you know a thing, to hold that you know it; and when you do not know a thing, to allow that you do not know it — this is knowledge.',
      heroQuoteAttribution: 'Confucius, Analects 2.17, trans. James Legge (1861)',
      synopsis:
        'In the late Spring and Autumn period, as the Zhou kings’ authority faded and rival states competed, Confucius (Kongzi, c. 551–479 BCE) taught that social harmony rested on virtue, ritual propriety and learning. The Daodejing, attributed to the figure known as Laozi, offered a contrasting vision of yielding, simplicity and the Dao. Both became foundational to East Asian thought, and both texts reached their known forms over generations.',
      beats: [
        {
          id: 'ax-1',
          timestampSubtitle: 'A kingdom in pieces, c. 550 BCE',
          narrativeChunk:
            'The Zhou king still reigns at Luoyang, but real power lies with dukes and ministerial clans who fight, scheme and annex one another. In the small state of Lu, a boy named Kong Qiu grows up studying the rites and odes of an earlier, idealised Zhou.',
          audioVoiceoverHint: 'Calm narration over a restless backdrop.',
        },
        {
          id: 'ax-2',
          timestampSubtitle: 'The teacher, c. 500 BCE',
          narrativeChunk:
            'Kongzi holds modest offices, then travels among the states seeking a ruler who will govern by virtue rather than force. He accepts students regardless of wealth. His conversations on ren (humaneness), li (ritual propriety) and the junzi (the exemplary person) will be gathered by later disciples into the Analects.',
          audioVoiceoverHint: 'Patient, conversational, a teacher’s cadence.',
          artifactCaption: 'Bamboo slips — the writing medium of the age. The Analects circulated in several versions before the Han.',
        },
        {
          id: 'ax-3',
          timestampSubtitle: 'The Old Master',
          narrativeChunk:
            'Tradition tells of Lao Dan, an archivist of the Zhou court, who left a short book of about five thousand characters as he departed for the west. Modern scholars doubt a single author wrote it. Its verses praise water, which overcomes the hard by being soft, and rulers who govern best by doing least.',
          audioVoiceoverHint: 'Soft, spare, with long pauses.',
          artifactCaption: 'Guodian bamboo slips (c. 300 BCE), excavated in Hubei in 1993, hold the earliest known Laozi material.',
        },
        {
          id: 'ax-4',
          timestampSubtitle: 'An age of sages',
          narrativeChunk:
            'The philosopher Karl Jaspers later called these centuries the "Axial Age", when Greece, Israel, Iran, India and China produced thinkers whose questions still shape the world. In China the "Hundred Schools" — Confucians, Mohists, Daoists, Legalists — argued over how to live and how to rule.',
          audioVoiceoverHint: 'Expansive, comparative, closing.',
        },
      ],
      historiographyPerspective:
        'Chinese tradition long revered Confucius as the transmitter of ancient wisdom, and from the Han dynasty his teachings anchored state orthodoxy. In the twentieth century, May Fourth reformers and later the Cultural Revolution attacked Confucianism as feudal, while recent decades have seen official and popular revival. Philologists debate how much of the Analects reflects Confucius himself — Bruce and Taeko Brooks argue for accretion over two centuries — and whether Laozi was a historical person at all. Jaspers’s "Axial Age" remains influential but is criticised as too neat or Eurocentric in origin; others defend it as a useful comparative lens.',
      perspectives: [
        { lens: 'Confucian tradition', view: 'Confucius as moral exemplar who revived Zhou culture, emphasising family, education and humane government.' },
        { lens: 'Textual criticism', view: 'Both the Analects and the Daodejing are seen as composite texts compiled by later communities; excavated manuscripts reveal variant versions.' },
        { lens: 'Comparative history', view: 'Supporters of the Axial Age link parallel developments to urbanisation and literacy; critics argue the parallels are overstated and the timing uneven.' },
      ],
      consensus:
        'Confucius lived c. 551–479 BCE in the state of Lu; the Analects records teachings attributed to him; and a version of the Daodejing existed by about 300 BCE, as the Guodian manuscripts show.',
      keyFigures: [
        { name: 'Confucius (Kongzi)', kind: 'person', role: 'Teacher and thinker of the state of Lu', dates: 'c. 551–479 BCE' },
        { name: 'Laozi', kind: 'person', role: 'Traditional author of the Daodejing; historicity uncertain', dates: 'trad. 6th century BCE' },
        { name: 'The Analects (Lunyu)', kind: 'text', role: 'Sayings and dialogues of Confucius compiled by disciples' },
        { name: 'Guodian slips', kind: 'artifact', role: 'Bamboo manuscripts from a tomb in Hubei, c. 300 BCE' },
      ],
      sources: [
        { title: 'The Analects', authorOrInstitution: 'Confucius, trans. D. C. Lau · Penguin Classics', yearPublished: 1979, sourceType: 'primary' },
        { title: "Lao Tzu's Tao Te Ching: A Translation of the Startling New Documents Found at Guodian", authorOrInstitution: 'Robert G. Henricks · Columbia University Press', yearPublished: 2000, sourceType: 'primary' },
        { title: 'The World of Thought in Ancient China', authorOrInstitution: 'Benjamin I. Schwartz · Belknap Press of Harvard University Press', yearPublished: 1985, sourceType: 'secondary' },
        { title: 'The Original Analects: Sayings of Confucius and His Successors', authorOrInstitution: 'E. Bruce Brooks & A. Taeko Brooks · Columbia University Press', yearPublished: 1998, sourceType: 'academic' },
        { title: 'The Axial Age and Its Consequences', authorOrInstitution: 'Robert N. Bellah & Hans Joas (eds.) · Harvard University Press', yearPublished: 2012, sourceType: 'academic' },
        { title: 'The Origin and Goal of History (Vom Ursprung und Ziel der Geschichte)', authorOrInstitution: 'Karl Jaspers', yearPublished: 1949, sourceType: 'secondary' },
      ],
    },
  },
  {
    id: 'library-of-alexandria',
    year: -280,
    yearLabel: 'c. 280 BCE',
    civilizationId: 'nile',
    streamYPosition: streamY('nile', -280),
    title: 'The Library of Alexandria Founded',
    shortSnippet:
      'The Ptolemaic kings of Egypt gather scholars and scrolls in Alexandria, aiming to collect the knowledge of the known world.',
    importance: 'major',
    iconType: 'library',
    storytelling: {
      heroQuote: '…for the purpose of collecting together, as far as he possibly could, all the books in the world.',
      heroQuoteAttribution: 'Letter of Aristeas §9, trans. R. H. Charles (1913)',
      synopsis:
        'Within a generation of Alexander the Great’s death, Ptolemy I and his son Ptolemy II built a research institution in their new capital: the Mouseion, or shrine of the Muses, with its great library. Scholars there edited Homer, measured the Earth and catalogued Greek literature. The library declined over centuries — through lost patronage, purges, fire and war — rather than in a single catastrophe.',
      beats: [
        {
          id: 'la-1',
          timestampSubtitle: 'A new city by the sea, 331 BCE',
          narrativeChunk:
            'Alexander founds a city on a strip of land between Lake Mareotis and the Mediterranean. After his death, his general Ptolemy takes Egypt and makes Alexandria his capital — a Greek-speaking royal city that is also home to Egyptians and a large Jewish community.',
          audioVoiceoverHint: 'Bright, maritime.',
        },
        {
          id: 'la-2',
          timestampSubtitle: 'The house of the Muses, c. 280 BCE',
          narrativeChunk:
            'Under the first Ptolemies, scholars live and dine at royal expense in the Mouseion. Ships docking in the harbour were said to have their books copied — the originals kept, the copies returned. Ancient estimates of the collection range from tens of thousands to hundreds of thousands of scrolls; no figure is certain.',
          audioVoiceoverHint: 'Wry on the ship anecdote; careful on numbers.',
        },
        {
          id: 'la-3',
          timestampSubtitle: 'Measuring the world',
          narrativeChunk:
            'Here Eratosthenes estimates the Earth’s circumference from noon shadows at Syene and Alexandria. Callimachus compiles the Pinakes, a vast catalogue of Greek authors. Herophilus studies human anatomy, and scholars prepare the edited texts of Homer that shape every later copy.',
          audioVoiceoverHint: 'Energetic, a roll-call of minds.',
          artifactCaption: 'A papyrus roll from Ptolemaic Egypt — the medium in which the library’s holdings were kept.',
        },
        {
          id: 'la-4',
          timestampSubtitle: 'A slow fading, 48 BCE – 391 CE',
          narrativeChunk:
            'In 48 BCE, during Julius Caesar’s war in Alexandria, fire destroyed warehouses near the harbour — possibly including books. Earlier purges of scholars, Roman-era neglect, fighting in the palace quarter in the 270s CE and the destruction of the Serapeum in 391 all took their toll. A story of a final burning by Arab conquerors appears only centuries later and is doubted by most historians.',
          audioVoiceoverHint: 'Sober, careful with blame.',
        },
      ],
      historiographyPerspective:
        'The Library’s destruction became a potent symbol, and different eras blamed different villains: Caesar’s soldiers, Christian zealots or the Arab conquest. Historians such as Roger Bagnall stress that ancient evidence about the Library is thin and often legendary — even its size is unknown — and that its decline was gradual, driven by the loss of royal patronage. Egypt and UNESCO founded the Bibliotheca Alexandrina, opened in 2002, as a modern homage. Today the Library is often invoked in debates about preserving knowledge, sometimes in ways that oversimplify its history.',
      perspectives: [
        { lens: 'Royal patronage', view: 'The Library served Ptolemaic prestige, competing with rivals such as Pergamon and legitimising Macedonian rule in Egypt.' },
        { lens: 'Scholarly legacy', view: 'Its lasting contribution lay in methods — textual criticism, cataloguing, empirical science — passed on to Roman, Byzantine and Islamic scholarship.' },
        { lens: 'Myth-making', view: 'Narratives of a single cataclysmic fire have served religious and political polemics from antiquity to today.' },
      ],
      consensus:
        'The Library was founded under the early Ptolemies, flourished in the third and second centuries BCE, and declined over several centuries rather than in one fire.',
      keyFigures: [
        { name: 'Ptolemy I Soter', kind: 'person', role: 'Macedonian general who founded the dynasty and the Mouseion', dates: 'c. 367–282 BCE' },
        { name: 'Demetrius of Phalerum', kind: 'person', role: 'Athenian statesman credited with advising on the Library', dates: 'c. 350–280 BCE' },
        { name: 'Eratosthenes', kind: 'person', role: 'Head librarian who estimated the Earth’s circumference', dates: 'c. 276–194 BCE' },
        { name: 'Callimachus', kind: 'person', role: 'Poet who compiled the Pinakes catalogue', dates: 'c. 310–240 BCE' },
      ],
      sources: [
        { title: 'Alexandria: Library of Dreams', authorOrInstitution: 'Roger S. Bagnall · Proceedings of the American Philosophical Society 146(4)', yearPublished: 2002, sourceType: 'academic' },
        { title: 'The Life and Fate of the Ancient Library of Alexandria', authorOrInstitution: 'Mostafa El-Abbadi · UNESCO/UNDP', yearPublished: 1990, sourceType: 'secondary' },
        { title: 'The Library of Alexandria: Centre of Learning in the Ancient World', authorOrInstitution: 'Roy MacLeod (ed.) · I. B. Tauris', yearPublished: 2000, sourceType: 'secondary' },
        { title: 'The Letter of Aristeas', authorOrInstitution: 'trans. R. H. Charles', yearPublished: 1913, sourceType: 'primary' },
        { title: 'Geography, Book 17.1.8', authorOrInstitution: 'Strabo', yearPublished: 'c. 20 CE', sourceType: 'primary' },
      ],
    },
  },
  {
    id: 'vesuvius-79',
    year: 79,
    yearLabel: '79 CE',
    civilizationId: 'europe',
    streamYPosition: streamY('europe', 79),
    title: 'The Eruption of Mount Vesuvius',
    shortSnippet:
      'Vesuvius buries Pompeii, Herculaneum and neighbouring towns, preserving a snapshot of Roman life beneath ash and pumice.',
    importance: 'regional',
    iconType: 'volcano',
    storytelling: {
      heroQuote: 'You could hear the shrieks of women, the wailing of infants, and the shouting of men.',
      heroQuoteAttribution: 'Pliny the Younger, Letters 6.20, trans. Betty Radice',
      synopsis:
        'In 79 CE, Mount Vesuvius erupted after centuries of quiet. A towering column rained pumice on Pompeii for hours; then pyroclastic surges — avalanches of superheated gas and ash — swept over Herculaneum, Pompeii and the surrounding countryside. Thousands died, and the deposits preserved houses, frescoes, food and human remains with extraordinary fidelity.',
      beats: [
        {
          id: 've-1',
          timestampSubtitle: 'A quiet mountain, 62 CE',
          narrativeChunk:
            'Romans grow vines on Vesuvius’ fertile slopes, unaware it is a volcano. In 62 or 63 CE a powerful earthquake damages Pompeii; years later, repairs are still under way. Small tremors continue, and few read them as warnings.',
          audioVoiceoverHint: 'Pastoral, with a faint undertow of unease.',
        },
        {
          id: 've-2',
          timestampSubtitle: 'The column rises, 79 CE',
          narrativeChunk:
            'In the early afternoon the mountain splits open. Across the Bay of Naples at Misenum, seventeen-year-old Pliny watches a cloud shaped like an umbrella pine. His uncle, Pliny the Elder — admiral and naturalist — launches warships to rescue people at the foot of the mountain.',
          audioVoiceoverHint: 'Rising urgency.',
        },
        {
          id: 've-3',
          timestampSubtitle: 'The surges, before dawn',
          narrativeChunk:
            'Through the night, falling pumice collapses roofs in Pompeii. Before dawn the first surge reaches Herculaneum, where hundreds sheltering in boat sheds by the shore die almost instantly. By morning, surges overwhelm Pompeii. Pliny the Elder dies on the beach at Stabiae.',
          audioVoiceoverHint: 'Hushed, grave. Do not dramatise.',
          artifactCaption: 'Plaster casts of victims, made by filling voids in the ash — a technique introduced by Giuseppe Fiorelli in 1863.',
        },
        {
          id: 've-4',
          timestampSubtitle: 'Which day? A new clue, 2018',
          narrativeChunk:
            'Medieval copies of Pliny’s letter give the date as 24 August. But autumn fruits, braziers and heavier clothing hinted otherwise, and in 2018 a charcoal inscription dated 17 October was found in a house under renovation — suggesting the eruption came later, perhaps around 24 October 79 CE.',
          audioVoiceoverHint: 'Investigative, a detective’s tone.',
        },
      ],
      historiographyPerspective:
        'Pliny the Younger’s two letters to Tacitus are the only eyewitness account and the origin of volcanology’s "Plinian eruption" category. Since excavations began in the 1740s under Bourbon rule, Pompeii has been read as a moral lesson, a romantic ruin, a window on everyday Roman life and a laboratory for archaeological method. Historians now stress what the "frozen moment" hides: many inhabitants fled, the town had been changing for decades, and early excavators removed objects without records. Debate continues over the exact date and over how victims died — by heat shock, asphyxiation or both.',
      perspectives: [
        { lens: 'Volcanology', view: 'Studies of the deposits (Sigurdsson and colleagues, 1985) reconstructed the eruption in phases: a Plinian column, then pyroclastic density currents.' },
        { lens: 'Everyday life', view: 'Graffiti, election notices and bakeries reveal ordinary people — enslaved and freed, women and men — often absent from elite texts.' },
        { lens: 'Heritage ethics', view: 'Archaeologists weigh excavation against conservation; large areas are deliberately left unexcavated for future techniques.' },
      ],
      consensus:
        'The eruption of 79 CE destroyed Pompeii, Herculaneum, Stabiae and Oplontis; Pliny’s letters are reliable in outline; and an autumn date is increasingly favoured over 24 August.',
      keyFigures: [
        { name: 'Pliny the Younger', kind: 'person', role: 'Eyewitness who described the eruption to Tacitus', dates: 'c. 61–113 CE' },
        { name: 'Pliny the Elder', kind: 'person', role: 'Naturalist and fleet commander who died attempting a rescue', dates: '23/24–79 CE' },
        { name: 'Giuseppe Fiorelli', kind: 'person', role: 'Archaeologist who pioneered plaster casts of victims', dates: '1823–1896' },
        { name: 'Herculaneum boat sheds', kind: 'place', role: 'Where the remains of some 300 people were found in the 1980s–90s' },
      ],
      sources: [
        { title: 'Letters 6.16 and 6.20 (to Tacitus)', authorOrInstitution: 'Pliny the Younger', yearPublished: 'c. 106–107 CE', sourceType: 'primary' },
        { title: 'Pompeii: The Life of a Roman Town', authorOrInstitution: 'Mary Beard · Profile Books', yearPublished: 2008, sourceType: 'secondary' },
        { title: 'The Eruption of Vesuvius in A.D. 79', authorOrInstitution: 'H. Sigurdsson, S. Carey, W. Cornell & T. Pescatore · National Geographic Research 1(3)', yearPublished: 1985, sourceType: 'academic' },
        { title: 'Lethal Thermal Impact at Periphery of Pyroclastic Surges: Evidences at Pompeii', authorOrInstitution: 'G. Mastrolorenzo, P. Petrone, L. Pappalardo & F. M. Guarino · PLoS ONE 5(6)', yearPublished: 2010, sourceType: 'academic' },
        { title: 'Parco Archeologico di Pompei', authorOrInstitution: 'Italian Ministry of Culture', url: 'https://pompeiisites.org', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'house-of-wisdom',
    year: 830,
    yearLabel: 'c. 830 CE',
    civilizationId: 'persia',
    streamYPosition: streamY('persia', 830),
    title: 'The House of Wisdom in Baghdad',
    shortSnippet:
      'In Abbasid Baghdad, scholars translate Greek, Persian and Indian works into Arabic and build new sciences, from algebra to optics.',
    importance: 'major',
    iconType: 'book',
    storytelling: {
      heroQuote: 'We ought not to be ashamed of appreciating the truth and of acquiring it wherever it comes from…',
      heroQuoteAttribution: 'al-Kindi, On First Philosophy, trans. Alfred L. Ivry (1974)',
      synopsis:
        'Under the Abbasid caliphs, especially al-Maʾmun (r. 813–833), Baghdad became the centre of a translation movement that rendered Greek philosophy, medicine and mathematics — along with Persian and Sanskrit works — into Arabic. The Bayt al-Hikma, or House of Wisdom, was a palace library and scholarly institution within this world. Scholars such as al-Khwarizmi and al-Kindi built on these sources to create original work.',
      beats: [
        {
          id: 'hw-1',
          timestampSubtitle: 'The round city, 762 CE',
          narrativeChunk:
            'Caliph al-Mansur founds Baghdad on the Tigris, its circular walls enclosing palace and mosque. Near the old Sasanian capital and linked by river and caravan to India, China and the Mediterranean, the city quickly grows into one of the largest in the world.',
          audioVoiceoverHint: 'Grand, architectural.',
        },
        {
          id: 'hw-2',
          timestampSubtitle: 'Paper and patronage',
          narrativeChunk:
            'Papermaking, learned from Central Asia, makes books cheaper. The court, officials and wealthy families commission translations: Galen’s medicine, Euclid’s geometry, Ptolemy’s astronomy, Aristotle’s logic. Translators such as Hunayn ibn Ishaq, a Christian physician, refine careful sense-for-sense methods.',
          audioVoiceoverHint: 'Bustling, scholarly.',
          artifactCaption: 'An Arabic manuscript of Euclid’s Elements — one of many Greek works studied through Arabic translation.',
        },
        {
          id: 'hw-3',
          timestampSubtitle: 'Restoring and balancing, c. 820 CE',
          narrativeChunk:
            'Muhammad ibn Musa al-Khwarizmi, working under al-Maʾmun’s patronage, writes a treatise on solving equations by al-jabr, "restoring" — giving algebra its name. Another of his works spreads Indian numerals westward, and his own name, Latinised, gives us the word "algorithm".',
          audioVoiceoverHint: 'Delighted, revelatory.',
        },
        {
          id: 'hw-4',
          timestampSubtitle: 'Measuring the heavens',
          narrativeChunk:
            'Al-Maʾmun sponsors observatories in Baghdad and Damascus and an expedition to measure a degree of latitude in the Syrian desert. The Banu Musa brothers write on ingenious mechanical devices, and al-Kindi, "the philosopher of the Arabs", weaves Greek philosophy into Islamic thought.',
          audioVoiceoverHint: 'Expansive, starlit.',
        },
      ],
      historiographyPerspective:
        'Popular histories often picture the House of Wisdom as a grand academy that single-handedly "saved" Greek learning for Europe. Historians such as Dimitri Gutas argue that the Bayt al-Hikma was primarily a palace library and archive, and that the translation movement was driven by Abbasid society as a whole — administrators, physicians, astrologers and theologians — with its own intellectual agendas. George Saliba and others emphasise original contributions, not mere preservation, and question narratives that treat Islamic science as a bridge to the European Renaissance. The Mongol sack of Baghdad in 1258 is often cast as the end of the House of Wisdom, though scholarship by then flourished in many other centres.',
      perspectives: [
        { lens: 'Transmission', view: 'Arabic translations preserved Greek texts later rendered into Latin in Iberia and Sicily, feeding medieval European learning.' },
        { lens: 'Abbasid society', view: 'Gutas stresses political and social motives: dynastic legitimacy, practical needs in medicine and astronomy, and theological debate.' },
        { lens: 'Original science', view: 'Algebra, optics and new planetary models show advances well beyond Greek sources, continuing for centuries after Baghdad’s golden age.' },
      ],
      consensus:
        'Ninth-century Baghdad hosted a sustained translation movement and major original scholarship under Abbasid patronage; the precise nature of the Bayt al-Hikma as an institution remains debated.',
      keyFigures: [
        { name: 'al-Maʾmun', kind: 'person', role: 'Abbasid caliph and major patron of scholarship', dates: 'r. 813–833 CE' },
        { name: 'Muhammad ibn Musa al-Khwarizmi', kind: 'person', role: 'Mathematician and astronomer whose work named algebra', dates: 'c. 780–850 CE' },
        { name: 'Hunayn ibn Ishaq', kind: 'person', role: 'Physician and translator of Galen and Hippocrates', dates: '809–873 CE' },
        { name: 'al-Kindi', kind: 'person', role: 'Philosopher and polymath', dates: 'c. 801–873 CE' },
      ],
      sources: [
        { title: 'Greek Thought, Arabic Culture: The Graeco-Arabic Translation Movement in Baghdad and Early ʿAbbāsid Society', authorOrInstitution: 'Dimitri Gutas · Routledge', yearPublished: 1998, sourceType: 'academic' },
        { title: 'Islamic Science and the Making of the European Renaissance', authorOrInstitution: 'George Saliba · MIT Press', yearPublished: 2007, sourceType: 'academic' },
        { title: 'The House of Wisdom: How Arabic Science Saved Ancient Knowledge and Gave Us the Renaissance', authorOrInstitution: 'Jim Al-Khalili · Penguin Press', yearPublished: 2011, sourceType: 'secondary' },
        { title: 'Kitab al-Fihrist', authorOrInstitution: 'Ibn al-Nadim', yearPublished: '987 CE', sourceType: 'primary' },
        { title: "al-Kitab al-mukhtasar fi hisab al-jabr wa'l-muqabala", authorOrInstitution: 'Muhammad ibn Musa al-Khwarizmi', yearPublished: 'c. 820 CE', sourceType: 'primary' },
      ],
    },
  },
];
