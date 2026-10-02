import type { HistoricalEvent } from '../../types/timeline';
import { streamY } from '../../lib/ribbonGeometry';

/** Panel III — Age of Interchange & Revolutions (1000 – 1914 CE) */
export const panelThreeEvents: HistoricalEvent[] = [
  {
    id: 'mansa-musa',
    year: 1324,
    yearLabel: '1324 CE',
    civilizationId: 'westAfrica',
    streamYPosition: streamY('westAfrica', 1324),
    title: "Mansa Musa's Pilgrimage & the Mali Empire",
    shortSnippet:
      "Mali's ruler crosses the Sahara to Mecca with a vast retinue and so much gold that his visit is remembered in Cairo for years.",
    importance: 'major',
    iconType: 'coins',
    storytelling: {
      heroQuote: 'They are seldom unjust, and have a greater abhorrence of injustice than any other people.',
      heroQuoteAttribution: 'Ibn Battuta, on the people of Mali (1352–53), trans. H. A. R. Gibb',
      synopsis:
        'In 1324–25, Mansa Musa of Mali made the hajj to Mecca, passing through Cairo with thousands of attendants and a great quantity of gold. Arabic writers recorded that his generosity depressed the value of gold in Cairo. The journey announced West Africa’s wealth to the Mediterranean world; on his return, Musa sponsored mosques and scholarship in cities such as Timbuktu.',
      beats: [
        {
          id: 'mm-1',
          timestampSubtitle: 'Heirs of Sundiata, c. 1235',
          narrativeChunk:
            'Mali rose under Sundiata Keita, whose story is preserved in an epic performed by griots (jeliw) to this day. Its wealth came from the goldfields of Bambuk and Bure and from controlling the trade that carried gold north across the Sahara in exchange for salt, copper, cloth and books.',
          audioVoiceoverHint: 'Rhythmic, in the spirit of an oral epic.',
        },
        {
          id: 'mm-2',
          timestampSubtitle: 'The road to Mecca, 1324',
          narrativeChunk:
            'Musa sets out with a retinue reported in the thousands and camels laden with gold. In Cairo he meets the Mamluk sultan al-Nasir Muhammad. Writers such as al-ʿUmari, who spoke with Cairenes years later, describe lavish gifts and purchases — and a gold market that took years to recover.',
          audioVoiceoverHint: 'Splendid, procession-like.',
        },
        {
          id: 'mm-3',
          timestampSubtitle: 'Mosques of earth, 1325 onward',
          narrativeChunk:
            'Musa returns with scholars and an Andalusian poet and architect, Abu Ishaq al-Sahili, associated with the Djinguereber Mosque in Timbuktu. Over the following centuries, Timbuktu becomes a hub of Islamic learning whose manuscript libraries survive today.',
          audioVoiceoverHint: 'Warm, respectful.',
          artifactCaption: 'Djinguereber Mosque, Timbuktu — earth and timber, renewed through communal replastering.',
        },
        {
          id: 'mm-4',
          timestampSubtitle: 'On the map of the world, 1375',
          narrativeChunk:
            'Half a century later, the Catalan Atlas, made in Majorca, shows a crowned African king holding a golden nugget, described as the richest and noblest lord of the region — Musa as European mapmakers imagined him. Mali’s image as a land of gold would shape European ambitions in Africa.',
          audioVoiceoverHint: 'Reflective, slightly ominous at the close.',
          artifactCaption: 'Catalan Atlas (1375), attributed to Abraham Cresques — Bibliothèque nationale de France.',
        },
      ],
      historiographyPerspective:
        'Most of what is known about the pilgrimage comes from Arabic writers in Egypt and North Africa, such as al-ʿUmari and Ibn Khaldun, and from Ibn Battuta’s later visit to Mali. West African oral traditions, transmitted by griots, centre Sundiata more than Musa and preserve different priorities. Popular claims that Musa was the "richest person in history" cannot be verified and compare poorly across eras; historians focus instead on how Mali’s trade, Islam and statecraft worked. Scholars such as Michael Gomez place Mali within a long history of West African empire-building that colonial-era scholarship often overlooked.',
      perspectives: [
        { lens: 'Arabic chronicles', view: 'Present Musa as a pious, generous Muslim ruler whose gold impressed — and unsettled — Cairo’s markets.' },
        { lens: 'Oral tradition', view: 'Griot narratives centre the founding hero Sundiata and Mande social institutions, offering a perspective distinct from external written sources.' },
        { lens: 'Global economy', view: 'Historians link West African gold to the medieval Mediterranean economy; much of the gold circulating in North Africa and Europe came from the Sahel.' },
      ],
      consensus:
        'Mansa Musa ruled Mali in the early fourteenth century, made the hajj in 1324–25, and his stay in Cairo was widely recorded; Mali was among the largest and wealthiest states of its time.',
      keyFigures: [
        { name: 'Mansa Musa', kind: 'person', role: 'Ruler (mansa) of the Mali Empire', dates: 'r. c. 1312–1337' },
        { name: 'Sundiata Keita', kind: 'person', role: 'Founder of the Mali Empire, hero of the Sunjata epic', dates: 'c. 1217–1255' },
        { name: 'Abu Ishaq al-Sahili', kind: 'person', role: 'Andalusian poet and architect who travelled to Mali with Musa', dates: 'd. 1346' },
        { name: 'Catalan Atlas', kind: 'artifact', role: '1375 world map depicting Musa; Bibliothèque nationale de France' },
      ],
      sources: [
        { title: 'Corpus of Early Arabic Sources for West African History', authorOrInstitution: 'N. Levtzion & J. F. P. Hopkins (eds.) · Cambridge University Press', yearPublished: 1981, sourceType: 'primary' },
        { title: 'African Dominion: A New History of Empire in Early and Medieval West Africa', authorOrInstitution: 'Michael A. Gomez · Princeton University Press', yearPublished: 2018, sourceType: 'academic' },
        { title: 'Caravans of Gold, Fragments in Time: Art, Culture, and Exchange across Medieval Saharan Africa', authorOrInstitution: 'Kathleen Bickford Berzock (ed.) · Block Museum / Princeton University Press', yearPublished: 2019, sourceType: 'archaeological' },
        { title: 'The Travels (Rihla)', authorOrInstitution: 'Ibn Battuta', yearPublished: 1355, sourceType: 'primary' },
        { title: 'Atlas catalan', authorOrInstitution: 'Bibliothèque nationale de France', yearPublished: 1375, sourceType: 'primary' },
      ],
    },
  },
  {
    id: 'gutenberg-press',
    year: 1440,
    yearLabel: 'c. 1440 CE',
    civilizationId: 'europe',
    streamYPosition: streamY('europe', 1440),
    title: "Gutenberg's Movable-Type Press",
    shortSnippet:
      'In Mainz, Johannes Gutenberg combines cast metal type, oil-based ink and a screw press — launching mass printing in Europe.',
    importance: 'monumental',
    iconType: 'press',
    storytelling: {
      heroQuote: '…printing, gunpowder, and the magnet… have changed the whole face and state of things throughout the world.',
      heroQuoteAttribution: 'Francis Bacon, Novum Organum (1620)',
      synopsis:
        'Around 1440, the goldsmith Johannes Gutenberg began developing a printing system built on cast metal type, a hand mould to produce it precisely, oil-based ink and an adapted screw press. By about 1455 his Mainz workshop had completed a Latin Bible. Within fifty years, presses operated in more than 250 European towns, producing millions of books.',
      beats: [
        {
          id: 'gu-1',
          timestampSubtitle: 'Secrets in Strasbourg, 1439',
          narrativeChunk:
            'Records of a 1439 lawsuit in Strasbourg mention Gutenberg’s partners, a secret enterprise, a press and mysterious "forms". The goldsmith from Mainz is experimenting with something new — and borrowing heavily to fund it.',
          audioVoiceoverHint: 'Conspiratorial, intrigued.',
        },
        {
          id: 'gu-2',
          timestampSubtitle: 'The type mould, c. 1440–1450',
          narrativeChunk:
            'Gutenberg’s key insight is a hand-held mould that casts thousands of identical letters from an alloy of lead, tin and antimony. Each letter can be set, inked, printed and reused. Oil-based ink clings to metal, and a press adapted from wine and paper making delivers even pressure.',
          audioVoiceoverHint: 'Mechanical, rhythmic — like a press at work.',
          artifactCaption: 'Reconstruction of Gutenberg’s press at the Gutenberg-Museum, Mainz.',
        },
        {
          id: 'gu-3',
          timestampSubtitle: 'The Bible, c. 1455',
          narrativeChunk:
            'Some 180 copies of a two-column Latin Bible are printed, on paper and on vellum; about 49 survive, at least in part. Their dense black letters imitate the finest manuscript hands. Soon after, Gutenberg’s financier Johann Fust sues him and takes over much of the workshop.',
          audioVoiceoverHint: 'Admiring, then a wry turn.',
        },
        {
          id: 'gu-4',
          timestampSubtitle: 'A world in print',
          narrativeChunk:
            'Printing spreads along trade routes — Venice, Paris, Kraków, Seville. Pamphlets of the Reformation, scientific books and cheap broadsides reach new readers. Printing in East Asia was far older: woodblock printing in Tang China, Bi Sheng’s movable type in the 1040s, and Korea’s metal-type Jikji of 1377.',
          audioVoiceoverHint: 'Expansive, globally framed.',
        },
      ],
      historiographyPerspective:
        'Elizabeth Eisenstein’s influential 1979 study argued that print was an "agent of change" that made the Renaissance, Reformation and Scientific Revolution possible by fixing and multiplying texts. Adrian Johns and others countered that early print was unstable, often pirated and slow to earn trust, and that its effects depended on social institutions, not technology alone. Historians of East Asia stress that printing, including movable type, had a long earlier history in China and Korea; whether any knowledge of it reached Europe is unproven. Most scholars credit Gutenberg with an independent system particularly well suited to alphabetic scripts.',
      perspectives: [
        { lens: 'Print revolution', view: 'Eisenstein: standardisation, dissemination and preservation transformed European intellectual life.' },
        { lens: 'Social construction', view: 'Johns: the credibility of printed knowledge had to be built through licensing, authorship and new reading practices.' },
        { lens: 'Global history', view: 'Tsien Tsuen-hsuin and others document earlier Chinese and Korean printing; small alphabets made metal type especially efficient in Europe.' },
      ],
      consensus:
        'Gutenberg developed a practical system for printing with movable metal type in Mainz c. 1440–1455, and printing spread rapidly through Europe after 1460.',
      keyFigures: [
        { name: 'Johannes Gutenberg', kind: 'person', role: 'Goldsmith and inventor of the Mainz printing system', dates: 'c. 1400–1468' },
        { name: 'Johann Fust', kind: 'person', role: 'Financier who took over the workshop after a 1455 lawsuit', dates: 'c. 1400–1466' },
        { name: 'Gutenberg Bible', kind: 'artifact', role: '42-line Latin Bible, c. 1455; about 49 copies survive' },
        { name: 'Jikji', kind: 'text', role: 'Korean Buddhist text printed with metal type in 1377; Bibliothèque nationale de France' },
      ],
      sources: [
        { title: 'The Printing Press as an Agent of Change', authorOrInstitution: 'Elizabeth L. Eisenstein · Cambridge University Press', yearPublished: 1979, sourceType: 'academic' },
        { title: 'The Nature of the Book: Print and Knowledge in the Making', authorOrInstitution: 'Adrian Johns · University of Chicago Press', yearPublished: 1998, sourceType: 'academic' },
        { title: 'Paper and Printing (Science and Civilisation in China, vol. 5, pt. 1)', authorOrInstitution: 'Tsien Tsuen-hsuin · Cambridge University Press', yearPublished: 1985, sourceType: 'academic' },
        { title: 'Gutenberg Bible and reconstructed workshop', authorOrInstitution: 'Gutenberg-Museum Mainz', url: 'https://www.gutenberg-museum.de', sourceType: 'archaeological' },
        { title: 'Gutenberg Bible (vellum copy)', authorOrInstitution: 'Library of Congress, Rare Book and Special Collections', sourceType: 'primary' },
      ],
    },
  },
  {
    id: 'fall-of-tenochtitlan',
    year: 1521,
    yearLabel: '1521 CE',
    civilizationId: 'americas',
    streamYPosition: streamY('americas', 1521),
    title: 'The Fall of Tenochtitlan',
    shortSnippet:
      'After a months-long siege by Spanish forces and tens of thousands of Indigenous allies, the Mexica capital falls on 13 August 1521.',
    importance: 'monumental',
    iconType: 'temple-pyramid',
    storytelling: {
      heroQuote: 'Broken spears lie in the roads; we have torn our hair in our grief.',
      heroQuoteAttribution: 'Nahuatl elegy, c. 1528, in Miguel León-Portilla, The Broken Spears',
      synopsis:
        'Tenochtitlan, the island capital of the Mexica, was among the largest cities in the world when Hernán Cortés arrived in 1519. Its fall in 1521 came from a siege that combined Spanish steel, horses and boats with the decisive participation of Tlaxcalan and other Indigenous allies — and a smallpox epidemic that killed many inhabitants, including the ruler Cuitláhuac. It opened three centuries of Spanish colonial rule.',
      beats: [
        {
          id: 'tn-1',
          timestampSubtitle: 'The city on the lake, 1519',
          narrativeChunk:
            'Causeways link the island city to the shore. Perhaps 200,000 people live among canals, chinampa gardens and markets that astonish Spanish visitors. At its heart rises the Templo Mayor, with twin shrines to Huitzilopochtli and Tlaloc.',
          audioVoiceoverHint: 'Awed, panoramic.',
        },
        {
          id: 'tn-2',
          timestampSubtitle: 'Guests and hostages, 1519–1520',
          narrativeChunk:
            'Motecuhzoma II receives Cortés and his men, who soon hold him captive. In 1520 a massacre during the festival of Toxcatl sparks an uprising. Motecuhzoma dies in disputed circumstances, and the Spaniards flee by night, losing many men and much plunder.',
          audioVoiceoverHint: 'Tense, escalating.',
        },
        {
          id: 'tn-3',
          timestampSubtitle: 'Smallpox and alliance, 1520–1521',
          narrativeChunk:
            'Smallpox, carried from the Caribbean, sweeps the Valley of Mexico, killing Motecuhzoma’s successor Cuitláhuac. Tlaxcala, a long-standing enemy of the Mexica, and many other city-states join the Spanish and supply most of the soldiers. Brigantines built for the lake cut off food and water.',
          audioVoiceoverHint: 'Grave, steady.',
          artifactCaption: 'Florentine Codex, Book XII — Nahua artists depict the smallpox epidemic of 1520.',
        },
        {
          id: 'tn-4',
          timestampSubtitle: 'The siege ends, 13 August 1521',
          narrativeChunk:
            'After some three months of fighting street by street, the last ruler, Cuauhtémoc, is captured. The city lies in ruins. On its rubble the Spanish build Mexico City — while Nahua communities endure, adapt and record their own accounts of the conquest in Nahuatl.',
          audioVoiceoverHint: 'Mournful but resilient at the close.',
        },
      ],
      historiographyPerspective:
        'For centuries the conquest was told through Cortés’s letters and Bernal Díaz’s memoir as a tale of a few hundred Spaniards toppling an empire. Historians such as Matthew Restall and Ross Hassig emphasise that the war was fought largely by Indigenous armies pursuing their own aims, and they question myths such as the Mexica taking Cortés for the god Quetzalcoatl — a story that appears only in later sources. Nahuatl accounts, including Book XII of the Florentine Codex and those gathered by Miguel León-Portilla, preserve the perspective of the defeated. In Mexico the conquest remains a contested foundation story in politics and public memory.',
      perspectives: [
        { lens: 'Spanish accounts', view: 'Cortés and Díaz emphasise strategy, faith and courage — texts written in part to win royal favour and reward.' },
        { lens: 'Indigenous accounts', view: 'Nahua texts describe omens, massacres and grief, and the roles of particular communities, often to secure their status under colonial rule.' },
        { lens: 'New Conquest History', view: 'Restall, Townsend and others stress alliances, disease and the continuity of Indigenous societies after 1521.' },
      ],
      consensus:
        'Tenochtitlan fell on 13 August 1521 after a siege in which Indigenous allies played a decisive role and epidemic disease devastated the city’s defenders.',
      keyFigures: [
        { name: 'Motecuhzoma II', kind: 'person', role: 'Huey tlatoani (ruler) of Tenochtitlan', dates: 'r. 1502–1520' },
        { name: 'Cuauhtémoc', kind: 'person', role: 'Last Mexica ruler, who led the city’s defence', dates: 'c. 1497–1525' },
        { name: 'Hernán Cortés', kind: 'person', role: 'Commander of the Spanish expedition', dates: '1485–1547' },
        { name: 'Malintzin (La Malinche)', kind: 'person', role: 'Nahua interpreter and intermediary', dates: 'c. 1500–c. 1529' },
      ],
      sources: [
        { title: 'Florentine Codex (General History of the Things of New Spain), Book XII', authorOrInstitution: 'Bernardino de Sahagún and Nahua collaborators', yearPublished: 'c. 1577', url: 'https://florentinecodex.getty.edu', sourceType: 'primary' },
        { title: 'The Broken Spears: The Aztec Account of the Conquest of Mexico', authorOrInstitution: 'Miguel León-Portilla (ed.) · Beacon Press', yearPublished: 1962, sourceType: 'primary' },
        { title: 'Letters from Mexico (Cartas de relación)', authorOrInstitution: 'Hernán Cortés', yearPublished: '1519–1526', sourceType: 'primary' },
        { title: 'Seven Myths of the Spanish Conquest', authorOrInstitution: 'Matthew Restall · Oxford University Press', yearPublished: 2003, sourceType: 'academic' },
        { title: 'Fifth Sun: A New History of the Aztecs', authorOrInstitution: 'Camilla Townsend · Oxford University Press', yearPublished: 2019, sourceType: 'secondary' },
        { title: 'Proyecto Templo Mayor', authorOrInstitution: 'Instituto Nacional de Antropología e Historia (INAH)', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'galileo-telescope',
    year: 1610,
    yearLabel: '1610 CE',
    civilizationId: 'europe',
    streamYPosition: streamY('europe', 1610),
    title: "Galileo's Telescopic Discoveries",
    shortSnippet:
      'Turning an improved telescope to the sky, Galileo reports mountains on the Moon, countless stars and four moons circling Jupiter.',
    importance: 'major',
    iconType: 'telescope',
    storytelling: {
      heroQuote: '…not smooth, uniform, and precisely spherical… but uneven, rough, and full of cavities and prominences.',
      heroQuoteAttribution: 'Galileo Galilei on the Moon, Sidereus Nuncius (1610), trans. Albert Van Helden',
      synopsis:
        'In 1609, after hearing of a Dutch spyglass, Galileo Galilei built telescopes magnifying up to about twenty times. In March 1610 he published Sidereus Nuncius (The Starry Messenger), describing the Moon’s rugged surface, the many stars of the Milky Way and four satellites of Jupiter. These observations fuelled debate over the Copernican system and led, eventually, to his trial in 1633.',
      beats: [
        {
          id: 'gl-1',
          timestampSubtitle: 'A Dutch rumour, 1608–1609',
          narrativeChunk:
            'In 1608 the spectacle-maker Hans Lipperhey seeks a patent in the Netherlands for a device that makes distant things appear near. News spreads fast. In Padua, the mathematics professor Galileo grinds his own lenses and soon surpasses the originals.',
          audioVoiceoverHint: 'Quick, curious.',
        },
        {
          id: 'gl-2',
          timestampSubtitle: 'Mountains on the Moon, late 1609',
          narrativeChunk:
            'Watching the boundary between light and dark on the Moon, Galileo sees points of light appear in the shadow — peaks catching the sunrise. The Moon, he concludes, has mountains and valleys like the Earth. In England, Thomas Harriot had sketched the Moon through a telescope months earlier, but did not publish.',
          audioVoiceoverHint: 'Hushed, nocturnal.',
          artifactCaption: 'Galileo’s ink-wash studies of the Moon (1609) — Biblioteca Nazionale Centrale, Florence.',
        },
        {
          id: 'gl-3',
          timestampSubtitle: 'The Medicean Stars, January 1610',
          narrativeChunk:
            'Night after night, Galileo records three, then four small "stars" near Jupiter that move with it — and around it. He names them the Medicean Stars after hoped-for patrons, the Medici. A planet with its own moons undermines the idea that everything circles the Earth.',
          audioVoiceoverHint: 'Mounting excitement.',
        },
        {
          id: 'gl-4',
          timestampSubtitle: 'From messenger to trial, 1610–1633',
          narrativeChunk:
            'Sidereus Nuncius sells out and wins Galileo a court post in Florence. Later he observes the phases of Venus, strengthening his support for Copernicus. In 1616 the Church declares heliocentrism contrary to Scripture; in 1633, after his Dialogue, the Inquisition condemns Galileo to house arrest for the rest of his life.',
          audioVoiceoverHint: 'Measured, sober.',
        },
      ],
      historiographyPerspective:
        'Galileo’s story has often been told as a clash between science and religion, with Galileo as martyr. Historians such as Maurice Finocchiaro and Mario Biagioli show a more complex picture: court patronage, personal rivalries, genuine scientific uncertainty — Tycho Brahe’s geo-heliocentric model also fitted the new observations — and the Counter-Reformation context. In 1992, following a commission convened by Pope John Paul II, the Catholic Church acknowledged errors in the handling of the case. Scholars also stress that telescopic astronomy was a Europe-wide endeavour, with Harriot, Simon Marius and others observing at the same time.',
      perspectives: [
        { lens: 'Science and religion', view: 'The traditional "conflict thesis" reads the trial as emblematic of dogma resisting evidence.' },
        { lens: 'Patronage and power', view: 'Biagioli and others emphasise court culture and how Galileo built scientific authority through the Medici.' },
        { lens: 'Evidence in context', view: 'In 1610 the observations did not yet decisively prove Earth’s motion; stronger evidence, such as stellar aberration (1729), came later.' },
      ],
      consensus:
        'Galileo’s 1609–1610 observations, published in Sidereus Nuncius, were accurate and transformative; the 1633 condemnation arose from a mix of theology, politics and personal conflict.',
      keyFigures: [
        { name: 'Galileo Galilei', kind: 'person', role: 'Mathematician, astronomer and natural philosopher', dates: '1564–1642' },
        { name: 'Sidereus Nuncius', kind: 'text', role: 'Short Latin treatise published in Venice, March 1610' },
        { name: 'Thomas Harriot', kind: 'person', role: 'English mathematician who drew the Moon through a telescope in 1609', dates: 'c. 1560–1621' },
        { name: 'Galileo’s telescopes', kind: 'artifact', role: 'Two surviving instruments at the Museo Galileo, Florence' },
      ],
      sources: [
        { title: 'Sidereus Nuncius, or The Sidereal Messenger', authorOrInstitution: 'Galileo Galilei, trans. Albert Van Helden · University of Chicago Press', yearPublished: 1989, sourceType: 'primary' },
        { title: 'The Galileo Affair: A Documentary History', authorOrInstitution: 'Maurice A. Finocchiaro · University of California Press', yearPublished: 1989, sourceType: 'primary' },
        { title: 'Galileo, Courtier: The Practice of Science in the Culture of Absolutism', authorOrInstitution: 'Mario Biagioli · University of Chicago Press', yearPublished: 1993, sourceType: 'academic' },
        { title: 'Galileo: Watcher of the Skies', authorOrInstitution: 'David Wootton · Yale University Press', yearPublished: 2010, sourceType: 'secondary' },
        { title: 'Galileo’s telescopes and instruments', authorOrInstitution: 'Museo Galileo, Florence', url: 'https://www.museogalileo.it', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'industrial-revolution',
    year: 1776,
    yearLabel: '1776 CE',
    civilizationId: 'europe',
    streamYPosition: streamY('europe', 1776),
    title: 'The Industrial Revolution & the Steam Engine',
    shortSnippet:
      'Boulton & Watt install their first commercial steam engines as Britain begins a shift to fossil-fuel power and mechanised production.',
    importance: 'monumental',
    iconType: 'factory',
    storytelling: {
      heroQuote: 'I sell here, Sir, what all the world desires to have — POWER.',
      heroQuoteAttribution: 'Matthew Boulton to James Boswell at the Soho Manufactory, 1776',
      synopsis:
        'In 1776 the first engines built to James Watt’s improved design — with a separate condenser that greatly reduced fuel use — went to work pumping water and blowing furnaces. Watt’s engines, and later rotary versions, joined water-powered cotton mills, coke-smelted iron and canal networks in a cluster of changes that transformed Britain’s economy and then the world. The shift to coal-powered growth reshaped work, cities, empire and, eventually, the global climate.',
      beats: [
        {
          id: 'ir-1',
          timestampSubtitle: 'A separate condenser, 1765–1769',
          narrativeChunk:
            'Repairing a model Newcomen engine at the University of Glasgow, instrument-maker James Watt realises that heating and cooling the same cylinder wastes most of the fuel. His solution — condensing the steam in a separate vessel — is patented in 1769.',
          audioVoiceoverHint: 'Inventive, a moment of insight.',
        },
        {
          id: 'ir-2',
          timestampSubtitle: 'Power for sale, 1776',
          narrativeChunk:
            'Partnered with Birmingham manufacturer Matthew Boulton, Watt sees the first engines installed at a colliery and at John Wilkinson’s ironworks, using cylinders bored accurately on Wilkinson’s new machine. Customers pay royalties based on the coal they save.',
          audioVoiceoverHint: 'Businesslike, confident.',
          artifactCaption: 'A Boulton & Watt beam engine — surviving examples are held by the Science Museum Group, London.',
        },
        {
          id: 'ir-3',
          timestampSubtitle: 'Mills, mines and the working day',
          narrativeChunk:
            'Cotton spinning moves from cottages to mills powered by water, then steam. Children and adults work long, closely supervised shifts. How wages, diets and life expectancy changed in industrial towns is debated by historians to this day; for many, urban conditions worsened before reforms arrived.',
          audioVoiceoverHint: 'Grounded, empathetic, balanced.',
        },
        {
          id: 'ir-4',
          timestampSubtitle: 'Coal, cotton and the world, 1800s',
          narrativeChunk:
            'Britain’s mills depend on raw cotton grown by enslaved people in the Americas, and its markets reach across an expanding empire. Railways and steamships carry the new economy outward. Industrialisation takes hold in Belgium, the United States, Germany and Japan — and carbon emissions begin their long climb.',
          audioVoiceoverHint: 'Wide-angle, consequential.',
        },
      ],
      historiographyPerspective:
        'Historians long debated whether the Industrial Revolution was a sudden "revolution" or a gradual evolution; economic historians such as Nicholas Crafts revised early growth estimates downward. Explanations differ. Robert Allen emphasises Britain’s high wages and cheap coal, which made labour-saving machines profitable; Joel Mokyr stresses an Enlightenment culture of "useful knowledge"; Kenneth Pomeranz argues that coal and colonial resources let Britain escape ecological limits that also constrained advanced regions of China. Eric Williams and later scholars connect industrial capital to slavery and the Atlantic economy, a link still debated. Social historians from E. P. Thompson onward centre the experience of workers.',
      perspectives: [
        { lens: 'Economic incentives', view: 'Allen: high wages and cheap energy made mechanisation pay in Britain first.' },
        { lens: 'Culture & knowledge', view: 'Mokyr: an "industrial Enlightenment" linked scientists, engineers and entrepreneurs.' },
        { lens: 'Global & colonial', view: 'Pomeranz and Williams: coal, colonies and slavery-linked commodities were central rather than incidental.' },
      ],
      consensus:
        'Between roughly 1760 and 1840, Britain experienced sustained productivity growth based on mechanisation and fossil energy; Watt’s engine was one important element among many.',
      keyFigures: [
        { name: 'James Watt', kind: 'person', role: 'Instrument-maker and engineer who improved the steam engine', dates: '1736–1819' },
        { name: 'Matthew Boulton', kind: 'person', role: 'Manufacturer and Watt’s business partner', dates: '1728–1809' },
        { name: 'John Wilkinson', kind: 'person', role: 'Ironmaster whose boring machine made accurate cylinders', dates: '1728–1808' },
        { name: 'Soho Manufactory', kind: 'place', role: 'Boulton’s works near Birmingham' },
      ],
      sources: [
        { title: 'The British Industrial Revolution in Global Perspective', authorOrInstitution: 'Robert C. Allen · Cambridge University Press', yearPublished: 2009, sourceType: 'academic' },
        { title: 'The Great Divergence: China, Europe, and the Making of the Modern World Economy', authorOrInstitution: 'Kenneth Pomeranz · Princeton University Press', yearPublished: 2000, sourceType: 'academic' },
        { title: 'The Enlightened Economy: An Economic History of Britain 1700–1850', authorOrInstitution: 'Joel Mokyr · Yale University Press', yearPublished: 2009, sourceType: 'academic' },
        { title: 'The Making of the English Working Class', authorOrInstitution: 'E. P. Thompson · Victor Gollancz', yearPublished: 1963, sourceType: 'secondary' },
        { title: 'Patent No. 913: A New Invented Method of Lessening the Consumption of Steam and Fuel in Fire Engines', authorOrInstitution: 'James Watt', yearPublished: 1769, sourceType: 'primary' },
        { title: 'Boulton & Watt engines and James Watt’s workshop', authorOrInstitution: 'Science Museum Group', url: 'https://collection.sciencemuseumgroup.org.uk', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'rosetta-stone',
    year: 1799,
    yearLabel: '1799 CE',
    civilizationId: 'nile',
    streamYPosition: streamY('nile', 1799),
    title: 'Discovery of the Rosetta Stone',
    shortSnippet:
      'French soldiers near Rashid uncover a decree carved in three scripts — the key that unlocks Egyptian hieroglyphs.',
    importance: 'regional',
    iconType: 'rosetta',
    storytelling: {
      heroQuote: 'Je tiens l’affaire ! ("I’ve got it!")',
      heroQuoteAttribution: 'Jean-François Champollion, 1822, as later recounted',
      synopsis:
        'In July 1799, during the French invasion of Egypt, soldiers rebuilding a fort near Rashid (Rosetta) found a granodiorite slab bearing the same priestly decree of 196 BCE in hieroglyphic, Demotic and Ancient Greek. Ceded to Britain under the 1801 Capitulation of Alexandria, it has been in the British Museum since 1802. Building on work by Thomas Young and others, Jean-François Champollion announced the decipherment of hieroglyphs in 1822.',
      beats: [
        {
          id: 'rs-1',
          timestampSubtitle: 'A decree for a boy-king, 196 BCE',
          narrativeChunk:
            'At Memphis, a council of Egyptian priests honours the young Ptolemy V on the anniversary of his coronation. Their decree is to be set up in temples in three scripts: hieroglyphs for sacred inscriptions, Demotic for everyday Egyptian, and Greek for the Macedonian administration.',
          audioVoiceoverHint: 'Ceremonial.',
        },
        {
          id: 'rs-2',
          timestampSubtitle: 'Fort Julien, July 1799',
          narrativeChunk:
            'Some two thousand years later, French soldiers demolishing an old wall near Rashid find the broken slab reused as building material. Officer Pierre-François Bouchard recognises its importance, and scholars with the expedition make ink impressions to send to Europe.',
          audioVoiceoverHint: 'Discovery, dust and sunlight.',
          artifactCaption: 'The Rosetta Stone, granodiorite, about 112 cm tall — British Museum, EA 24.',
        },
        {
          id: 'rs-3',
          timestampSubtitle: 'Spoils of war, 1801',
          narrativeChunk:
            'When the French army in Egypt surrenders, Article 16 of the Capitulation of Alexandria hands the Stone and other antiquities to Britain. It arrives in London in 1802 and goes on display at the British Museum, where it remains one of the most visited objects.',
          audioVoiceoverHint: 'Matter-of-fact; let the politics show.',
        },
        {
          id: 'rs-4',
          timestampSubtitle: 'The key turns, 1822',
          narrativeChunk:
            'Thomas Young identifies the cartouche of Ptolemy and shows that some signs are phonetic. Champollion, who reads Coptic, goes further: hieroglyphs combine sound-signs and meaning-signs. On 27 September 1822 he presents his findings in the Lettre à M. Dacier, and Egyptian texts, unread for some fourteen centuries, begin to speak again.',
          audioVoiceoverHint: 'Triumphant but restrained.',
        },
      ],
      historiographyPerspective:
        'The Stone’s story has long been told as a triumph of European scholarship, with Young and Champollion cast as Anglo-French rivals. Historians now also discuss earlier Arabic scholars, such as Ibn Wahshiyya, who studied hieroglyphs (how far they understood them is debated), and the crucial role of Coptic in preserving the Egyptian language. Egyptian archaeologists and officials have repeatedly called for the Stone’s return, framing it as an object taken in war; the British Museum maintains it was acquired under the 1801 treaty. Scholars such as Elliott Colla examine how Egyptology and imperial power developed together.',
      perspectives: [
        { lens: 'Decipherment history', view: 'Credits Young’s early insights and Champollion’s systematic breakthrough, built on deep knowledge of Coptic.' },
        { lens: 'Imperial context', view: 'Sees the Stone’s journey as part of Anglo-French competition for Egypt and its antiquities.' },
        { lens: 'Restitution debate', view: 'Egyptian institutions argue for repatriation; the British Museum argues for its role as a universal museum. The question remains unresolved.' },
      ],
      consensus:
        'The Rosetta Stone was found in 1799, bears a decree of 196 BCE in three scripts, and was crucial to Champollion’s 1822 decipherment of hieroglyphs.',
      keyFigures: [
        { name: 'Jean-François Champollion', kind: 'person', role: 'Philologist who deciphered hieroglyphs', dates: '1790–1832' },
        { name: 'Thomas Young', kind: 'person', role: 'Polymath who made early advances in decipherment', dates: '1773–1829' },
        { name: 'Pierre-François Bouchard', kind: 'person', role: 'French officer who reported the find', dates: '1771–1822' },
        { name: 'Ptolemy V Epiphanes', kind: 'person', role: 'Ruler honoured by the decree', dates: 'r. 204–180 BCE' },
      ],
      sources: [
        { title: 'The Rosetta Stone (EA 24)', authorOrInstitution: 'The British Museum', url: 'https://www.britishmuseum.org/collection/object/Y_EA24', sourceType: 'archaeological' },
        { title: 'Lettre à M. Dacier relative à l’alphabet des hiéroglyphes phonétiques', authorOrInstitution: 'Jean-François Champollion · Firmin Didot', yearPublished: 1822, sourceType: 'primary' },
        { title: 'Cracking Codes: The Rosetta Stone and Decipherment', authorOrInstitution: 'Richard Parkinson · British Museum Press', yearPublished: 1999, sourceType: 'secondary' },
        { title: 'Conflicted Antiquities: Egyptology, Egyptomania, Egyptian Modernity', authorOrInstitution: 'Elliott Colla · Duke University Press', yearPublished: 2007, sourceType: 'academic' },
        { title: '"Egypt", Supplement to the Encyclopaedia Britannica', authorOrInstitution: 'Thomas Young', yearPublished: 1819, sourceType: 'primary' },
      ],
    },
  },
];
