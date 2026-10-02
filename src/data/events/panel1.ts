import type { HistoricalEvent } from '../../types/timeline';
import { streamY } from '../../lib/ribbonGeometry';

/** Panel I — Deep Past & River Valleys (c. 12,000 BCE – 500 BCE) */
export const panelOneEvents: HistoricalEvent[] = [
  {
    id: 'gobekli-tepe',
    year: -9500,
    yearLabel: 'c. 9500 BCE',
    civilizationId: 'mesopotamia',
    streamYPosition: streamY('mesopotamia', -9500),
    title: 'Göbekli Tepe: Monuments Before Farming',
    shortSnippet:
      'Hunter-gatherers in south-eastern Anatolia raise massive carved T-shaped pillars — among the oldest known monumental architecture.',
    importance: 'major',
    iconType: 't-pillar',
    storytelling: {
      heroQuote: 'First came the temple, then the city.',
      heroQuoteAttribution: 'Klaus Schmidt, excavator of Göbekli Tepe, as quoted in Smithsonian Magazine (2008)',
      synopsis:
        'Around 9500 BCE, as the last Ice Age ended, people who still lived largely by hunting and gathering quarried, carved and erected limestone pillars up to about 5.5 metres tall on a ridge near modern Şanlıurfa, Turkey. Decorated with foxes, boars, snakes and vultures, the enclosures overturned the long-held assumption that monumental building had to wait for farming and cities.',
      beats: [
        {
          id: 'gt-1',
          timestampSubtitle: 'The end of the Ice Age, c. 9600 BCE',
          narrativeChunk:
            'As glaciers retreat and the climate warms, the hills of Upper Mesopotamia fill with wild wheat, barley and herds of gazelle. Bands of foragers gather here through the seasons. On a ridge overlooking the Harran plain, they begin something no one is known to have attempted before: carving the bedrock into towering, human-like pillars.',
          audioVoiceoverHint: 'Slow and spacious, like wind over an open plain.',
        },
        {
          id: 'gt-2',
          timestampSubtitle: 'The pillars rise, c. 9500 BCE',
          narrativeChunk:
            'Shaped with flint tools, the T-shaped pillars are set within circular stone walls, two giants standing at each centre. Arms and hands carved along their sides, with belts and loincloths at the waist, suggest stylised beings — perhaps ancestors, perhaps spirits. Their makers left no writing to tell us which.',
          audioVoiceoverHint: 'Quiet wonder; let the final line linger.',
          artifactCaption: 'Enclosure D: twin central pillars about 5.5 m tall; Pillar 18 bears carved arms, a belt and a fox-pelt loincloth.',
        },
        {
          id: 'gt-3',
          timestampSubtitle: 'A bestiary in stone',
          narrativeChunk:
            'Foxes, wild boars, snakes, cranes, scorpions and vultures crawl across the stone. Pillar 43, the "Vulture Stone", has invited many readings, from funerary symbolism to contested astronomical interpretations. Large quantities of animal bone and grinding stones point to gatherings that brought many people together.',
          audioVoiceoverHint: 'Curious, evocative; name each animal with weight.',
          artifactCaption: 'Pillar 43, the "Vulture Stone", Enclosure D.',
        },
        {
          id: 'gt-4',
          timestampSubtitle: 'Buried and rediscovered, c. 8000 BCE – 1994 CE',
          narrativeChunk:
            'By around 8000 BCE the enclosures lay buried — whether deliberately back-filled or covered by slope slides is still debated. Noted in a 1963 survey but long overlooked, the site was recognised by German archaeologist Klaus Schmidt in 1994. Excavations here and at related sites such as Karahan Tepe continue to reshape the story of how farming began.',
          audioVoiceoverHint: 'Measured, documentary tone.',
        },
      ],
      historiographyPerspective:
        'Klaus Schmidt interpreted Göbekli Tepe as a sanctuary — "the first temple" — built by mobile foragers, and argued that the labour of building it helped drive the shift to farming. Later work by the German Archaeological Institute and Turkish colleagues has found cisterns, domestic tools and possible dwellings, leading many researchers to describe a settled community in which ritual and daily life were intertwined. The site was inscribed as a UNESCO World Heritage Site in 2018 and is now studied as part of a wider landscape of related Neolithic sites around Şanlıurfa.',
      perspectives: [
        { lens: 'Sanctuary model', view: 'Schmidt and early excavators saw a ritual centre for regional gatherings without permanent houses — monuments built before villages.' },
        { lens: 'Settlement model', view: 'Newer excavations and critiques (e.g., Banning 2011) emphasise domestic activity and water management, arguing that the "temple" label separates ritual from everyday life too sharply.' },
        { lens: 'Origins of agriculture', view: 'Some researchers link feasting and building to the cultivation of wild cereals; others see the monuments as one outcome, not a cause, of wider social change in the region.' },
      ],
      consensus:
        'The enclosures were built by Pre-Pottery Neolithic communities around 9500–8000 BCE, before domesticated plants and animals were fully established, making them among the oldest known monumental architecture.',
      keyFigures: [
        { name: 'Klaus Schmidt', kind: 'person', role: 'German archaeologist who led excavations from 1995 until his death', dates: '1953–2014' },
        { name: 'Pillar 43 ("Vulture Stone")', kind: 'artifact', role: 'Relief pillar in Enclosure D bearing a vulture, scorpion and other animals' },
        { name: 'Enclosure D', kind: 'place', role: 'Best-preserved circle, with two central pillars about 5.5 m tall' },
        { name: 'Karahan Tepe', kind: 'place', role: 'Related Neolithic site in the same Şanlıurfa uplands' },
      ],
      sources: [
        { title: 'Göbekli Tepe: A Stone Age Sanctuary in South-Eastern Anatolia', authorOrInstitution: 'Klaus Schmidt · ex oriente', yearPublished: 2012, sourceType: 'secondary' },
        { title: 'So Fair a House: Göbekli Tepe and the Identification of Temples in the Pre-Pottery Neolithic of the Near East', authorOrInstitution: 'E. B. Banning · Current Anthropology 52(5)', yearPublished: 2011, sourceType: 'academic' },
        { title: 'The role of cult and feasting in the emergence of Neolithic communities: new evidence from Göbekli Tepe', authorOrInstitution: 'O. Dietrich, M. Heun, J. Notroff, K. Schmidt & M. Zarnkow · Antiquity 86', yearPublished: 2012, sourceType: 'academic' },
        { title: 'Göbekli Tepe research project', authorOrInstitution: 'Deutsches Archäologisches Institut (German Archaeological Institute)', sourceType: 'archaeological' },
        { title: 'Göbekli Tepe — World Heritage List', authorOrInstitution: 'UNESCO World Heritage Centre', yearPublished: 2018, url: 'https://whc.unesco.org/en/list/1572', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'great-pyramid',
    year: -2560,
    yearLabel: 'c. 2560 BCE',
    civilizationId: 'nile',
    streamYPosition: streamY('nile', -2560),
    title: 'Construction of the Great Pyramid of Giza',
    shortSnippet:
      "Under King Khufu, Egyptian crews raise the largest pyramid ever built — the tallest human-made structure on Earth for nearly four thousand years.",
    importance: 'monumental',
    iconType: 'pyramid',
    storytelling: {
      heroQuote: 'Man fears time, yet time fears the pyramids.',
      heroQuoteAttribution: 'Arab proverb',
      synopsis:
        "Built for the Fourth Dynasty king Khufu around 2560 BCE, the Great Pyramid originally rose about 146.6 metres and contains an estimated 2.3 million stone blocks. It was the product of a centralised state able to organise labour, food, transport and quarrying on an immense scale — a logistical achievement now documented by papyri, workers' settlements and quarry sites.",
      beats: [
        {
          id: 'gp-1',
          timestampSubtitle: "The Nile's gift, c. 2600 BCE",
          narrativeChunk:
            "Each summer the Nile floods, spreading black silt across the valley and freeing farmers from their fields for months. The Old Kingdom state learns to channel this seasonal workforce. Under Sneferu, Khufu's father, builders experiment with pyramids at Meidum and Dahshur — among them the angled \"Bent Pyramid\" and the smooth-sided Red Pyramid.",
          audioVoiceoverHint: 'Unhurried and warm, like the river itself.',
        },
        {
          id: 'gp-2',
          timestampSubtitle: 'A city of builders',
          narrativeChunk:
            "South of the plateau, archaeologists have uncovered a town of bakeries, storerooms and long galleries for housing crews. Animal bones show workers ate beef, sheep and goat; skeletons in nearby tombs show healed fractures and even treated amputations. These were organised teams, with names such as \"Friends of Khufu\".",
          audioVoiceoverHint: 'Grounded, human; emphasise the workers.',
          artifactCaption: 'Heit el-Ghurab, the "Lost City of the Pyramid Builders", excavated by Ancient Egypt Research Associates.',
        },
        {
          id: 'gp-3',
          timestampSubtitle: 'The logbook of Merer, c. 2560 BCE',
          narrativeChunk:
            'In 2013, papyri found at Wadi al-Jarf on the Red Sea coast proved to be the oldest inscribed papyri yet known. Among them is the logbook of an inspector named Merer, whose crew ferried fine limestone from the Tura quarries across the Nile to Giza — written during the reign of Khufu himself.',
          audioVoiceoverHint: 'A note of discovery; slight lift on "Khufu himself".',
          artifactCaption: 'Papyrus Jarf A, part of the logbook of Merer — displayed in Cairo.',
        },
        {
          id: 'gp-4',
          timestampSubtitle: 'Smooth as a jewel',
          narrativeChunk:
            "When complete, the pyramid was sheathed in polished white Tura limestone and aligned to the cardinal directions with remarkable precision. Most of the casing was stripped centuries later to build medieval Cairo. Inside, the Grand Gallery climbs to the King's Chamber of red Aswan granite — a burial chamber robbed in antiquity.",
          audioVoiceoverHint: 'Reverent, closing cadence.',
        },
      ],
      historiographyPerspective:
        'Greek writers such as Herodotus, visiting some two thousand years after construction, described 100,000 men toiling in three-month shifts under a harsh king — an image popular culture later turned into armies of slaves. Twentieth- and twenty-first-century archaeology, including work by Mark Lehner, Zahi Hawass and Pierre Tallet, points instead to a large, provisioned workforce combining skilled permanent crews with rotating labourers owed to the state. How the blocks were raised — straight, zig-zag, spiral or internal ramps, perhaps with levers — remains debated. Egyptian scholars have emphasised the pyramids as achievements of ancient Egyptians themselves, countering fringe claims of lost civilisations or outsiders, for which there is no evidence.',
      perspectives: [
        { lens: 'Labour & society', view: "Workers' cemeteries and the Heit el-Ghurab settlement suggest corvée labour combined with specialists who were fed, housed and buried with honour, rather than chattel slavery." },
        { lens: 'Engineering', view: 'Lehner favours combinations of ramps; architect Jean-Pierre Houdin proposed an internal spiral ramp. A steep haulage ramp with post-holes found at the Hatnub quarry in 2018 shows the sophistication of Old Kingdom techniques.' },
        { lens: 'Statecraft', view: 'Economic historians see the pyramid as both royal tomb and engine of state formation, binding provinces, temples and estates into a redistributive economy.' },
      ],
      consensus:
        "The Great Pyramid was built as Khufu's tomb during his reign (c. 2589–2566 BCE) by Egyptian workers using copper tools, stone pounders, sledges, ramps and river transport.",
      keyFigures: [
        { name: 'Khufu (Cheops)', kind: 'person', role: 'Fourth Dynasty king for whom the pyramid was built', dates: 'r. c. 2589–2566 BCE' },
        { name: 'Hemiunu', kind: 'person', role: "Vizier and probable overseer of the king's works; his statue is in Hildesheim" },
        { name: 'Merer', kind: 'person', role: 'Inspector whose logbook records limestone transport to Giza', dates: 'fl. c. 2560 BCE' },
        { name: 'Wadi al-Jarf papyri', kind: 'artifact', role: 'Oldest known inscribed papyri, discovered in 2013' },
      ],
      sources: [
        { title: 'The Complete Pyramids', authorOrInstitution: 'Mark Lehner · Thames & Hudson', yearPublished: 1997, sourceType: 'secondary' },
        { title: 'The Red Sea Scrolls: How Ancient Papyri Reveal the Secrets of the Pyramids', authorOrInstitution: 'Pierre Tallet & Mark Lehner · Thames & Hudson', yearPublished: 2021, sourceType: 'secondary' },
        { title: 'Les papyrus de la mer Rouge I: Le « journal de Merer »', authorOrInstitution: "Pierre Tallet · Institut français d'archéologie orientale", yearPublished: 2017, sourceType: 'primary' },
        { title: 'Heit el-Ghurab: the Lost City of the Pyramid Builders', authorOrInstitution: 'Ancient Egypt Research Associates (AERA)', url: 'https://aeraweb.org', sourceType: 'archaeological' },
        { title: 'Histories, Book II', authorOrInstitution: 'Herodotus', yearPublished: 'c. 430 BCE', sourceType: 'primary' },
      ],
    },
  },
  {
    id: 'mohenjo-daro',
    year: -2500,
    yearLabel: 'c. 2500 BCE',
    civilizationId: 'southAsia',
    streamYPosition: streamY('southAsia', -2500),
    title: 'Mohenjo-daro and the Harappan Cities',
    shortSnippet:
      'Planned brick cities with drains, wells and a great public bath flourish along the Indus — the most extensive of the early civilisations.',
    importance: 'major',
    iconType: 'seal',
    storytelling: {
      heroQuote: 'Not often has it been given to archaeologists… to light upon the remains of a long-forgotten civilization.',
      heroQuoteAttribution: 'John Marshall, The Illustrated London News, 20 September 1924',
      synopsis:
        'In its mature phase (c. 2600–1900 BCE), the Indus or Harappan civilisation spread across much of today’s Pakistan and north-western India. Mohenjo-daro, home perhaps to some 40,000 people, was laid out with standardised baked bricks, covered drains and hundreds of wells. Its script, found on thousands of small seals, remains undeciphered.',
      beats: [
        {
          id: 'md-1',
          timestampSubtitle: 'River and monsoon, c. 2600 BCE',
          narrativeChunk:
            'Fed by Himalayan snowmelt and the summer monsoon, the Indus spreads silt across a vast floodplain. Villages that had grown for millennia — since farming began at Mehrgarh — coalesce into cities. Within a few generations, a shared material culture stretches from the Arabian Sea coast to the plains near modern Delhi.',
          audioVoiceoverHint: 'Broad and flowing.',
        },
        {
          id: 'md-2',
          timestampSubtitle: 'A city on a grid',
          narrativeChunk:
            'Mohenjo-daro’s main streets run roughly north–south and east–west. Houses of uniform baked brick open onto side lanes; bathing platforms drain into covered sewers along the streets. On a raised mound, the "Great Bath" — a pool waterproofed with fitted brick and bitumen — suggests rituals of water and purity.',
          audioVoiceoverHint: 'Precise, almost architectural rhythm.',
          artifactCaption: 'The Great Bath, about 12 by 7 metres, sealed with a layer of bitumen.',
        },
        {
          id: 'md-3',
          timestampSubtitle: 'Seals, weights and trade',
          narrativeChunk:
            'Square steatite seals carved with a one-horned animal and short lines of script travel with merchants. Standardised cubical weights serve trade across the region and beyond: Mesopotamian texts mention a land called Meluhha, widely identified with the Indus, and Indus-style seals have turned up in Mesopotamian cities.',
          audioVoiceoverHint: 'Lively, mercantile.',
          artifactCaption: '"Unicorn" seal, steatite, c. 2500–2000 BCE; script signs run across the top.',
        },
        {
          id: 'md-4',
          timestampSubtitle: 'A quiet decline, c. 1900 BCE',
          narrativeChunk:
            'No invasion destroyed these cities. Over centuries, shifting rivers, weakening monsoons and changing trade routes led people to disperse into smaller settlements to the east and south. The cities were forgotten until excavations in the 1920s revealed a civilisation as old as Egypt and Sumer.',
          audioVoiceoverHint: 'Gentle, elegiac.',
        },
      ],
      historiographyPerspective:
        'When John Marshall announced the discoveries in 1924, the Indus civilisation pushed South Asian urban history back by two millennia. Mortimer Wheeler later blamed its end on invading Indo-Aryans, a theory now rejected for lack of evidence of conquest. Researchers today emphasise climate, river migration and economic change. The civilisation’s linguistic identity is debated, with proposals linking it to Dravidian, Indo-Aryan or lost language families, and its script — some 400 signs on mostly very short inscriptions — resists decipherment.',
      perspectives: [
        { lens: 'Decline', view: 'Palaeoclimate studies point to weakening summer monsoons after about 2200 BCE; others stress the drying of the Ghaggar-Hakra system. Most scholars favour gradual transformation over collapse.' },
        { lens: 'Script', view: 'Statistical studies (Rao et al. 2009) argue the signs show language-like structure; Farmer, Sproat and Witzel (2004) argued they may be non-linguistic symbols. Without a bilingual text the question stays open.' },
        { lens: 'Political organisation', view: 'No palaces or royal tombs have been identified. Some propose city-states or merchant elites; others suggest unusually decentralised or ritually governed societies.' },
      ],
      consensus:
        'The Mature Harappan phase lasted roughly 2600–1900 BCE, featured planned cities with advanced water management, traded with Mesopotamia, and ended through gradual de-urbanisation rather than conquest.',
      keyFigures: [
        { name: 'R. D. Banerji', kind: 'person', role: 'Archaeological Survey of India officer who first investigated Mohenjo-daro', dates: '1885–1930' },
        { name: 'John Marshall', kind: 'person', role: 'Director-General of the ASI who announced the civilisation in 1924', dates: '1876–1958' },
        { name: '"Priest-King"', kind: 'artifact', role: 'Steatite bust in a trefoil-patterned robe; National Museum of Pakistan, Karachi' },
        { name: '"Dancing Girl"', kind: 'artifact', role: 'Lost-wax bronze figurine; National Museum, New Delhi' },
      ],
      sources: [
        { title: 'Ancient Cities of the Indus Valley Civilization', authorOrInstitution: 'Jonathan Mark Kenoyer · Oxford University Press', yearPublished: 1998, sourceType: 'secondary' },
        { title: 'The Indus Civilization: A Contemporary Perspective', authorOrInstitution: 'Gregory L. Possehl · AltaMira Press', yearPublished: 2002, sourceType: 'academic' },
        { title: 'Mohenjo-daro and the Indus Civilization', authorOrInstitution: 'John Marshall (ed.) · Arthur Probsthain', yearPublished: 1931, sourceType: 'archaeological' },
        { title: 'Entropic Evidence for Linguistic Structure in the Indus Script', authorOrInstitution: 'Rajesh P. N. Rao et al. · Science 324', yearPublished: 2009, sourceType: 'academic' },
        { title: 'The Collapse of the Indus-Script Thesis: The Myth of a Literate Harappan Civilization', authorOrInstitution: 'Steve Farmer, Richard Sproat & Michael Witzel · Electronic Journal of Vedic Studies 11(2)', yearPublished: 2004, sourceType: 'academic' },
        { title: 'Harappa Archaeological Research Project', authorOrInstitution: 'Harappa.com', url: 'https://www.harappa.com', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'code-of-hammurabi',
    year: -1750,
    yearLabel: 'c. 1750 BCE',
    civilizationId: 'mesopotamia',
    streamYPosition: streamY('mesopotamia', -1750),
    title: 'The Code of Hammurabi',
    shortSnippet:
      "Babylon's king inscribes some 280 legal rulings on a basalt stele, presenting himself as the shepherd who brings justice to the land.",
    importance: 'monumental',
    iconType: 'stele',
    storytelling: {
      heroQuote: '…so that the strong should not harm the weak.',
      heroQuoteAttribution: 'Prologue to the Laws of Hammurabi, trans. L. W. King (1910)',
      synopsis:
        'Late in his reign (r. c. 1792–1750 BCE), Hammurabi of Babylon commissioned stone stelae inscribed in Akkadian with a prologue, some 280 legal provisions and an epilogue. The best-preserved example, 2.25 metres tall, was carried to Susa as war booty in the twelfth century BCE and rediscovered there in 1901. It is among the longest and best-organised legal texts surviving from the ancient Near East.',
      beats: [
        {
          id: 'ch-1',
          timestampSubtitle: 'A kingdom on the Euphrates, c. 1792 BCE',
          narrativeChunk:
            'Hammurabi inherits a modest city-state surrounded by powerful rivals — Larsa, Eshnunna, Mari, Assyria. Through three decades of diplomacy and war, recorded in letters from the palace archives of Mari, he unites most of Mesopotamia under Babylon. Conquest raises a question every empire faces: how to rule many cities by one standard?',
          audioVoiceoverHint: 'Strategic, building tension.',
        },
        {
          id: 'ch-2',
          timestampSubtitle: 'Justice carved in stone',
          narrativeChunk:
            'Atop the stele, Hammurabi stands before the enthroned sun god Shamash, god of justice. Below, columns of cuneiform set out cases: "If a man…", then the consequence. Rulings cover trade, loans, wages, marriage, inheritance, irrigation damage, theft and bodily injury.',
          audioVoiceoverHint: 'Formal, almost liturgical.',
          artifactCaption: 'Hammurabi before Shamash, who holds the rod and ring of authority — Musée du Louvre, Sb 8.',
        },
        {
          id: 'ch-3',
          timestampSubtitle: 'An eye for an eye — but not for all',
          narrativeChunk:
            'Punishments depend on status. Injuring an awīlum, a free person of the upper rank, brings equal retaliation; injuring a commoner (muškēnum) or an enslaved person usually brings a fine. The laws protect widows and fix wages, yet they also encode a hierarchical society in which slavery was ordinary.',
          audioVoiceoverHint: 'Even-handed; let the contrast speak.',
        },
        {
          id: 'ch-4',
          timestampSubtitle: 'Taken and found, c. 1158 BCE – 1901 CE',
          narrativeChunk:
            'Some six centuries later, the Elamite king Shutruk-Nahhunte carried the stele to Susa as a trophy. French archaeologists found it there in 1901–02, broken into three pieces. Scribes had copied the text for more than a thousand years; today the stele stands in the Louvre.',
          audioVoiceoverHint: 'Narrative, slightly brisker.',
        },
      ],
      historiographyPerspective:
        'Early twentieth-century scholars hailed the text as the world’s first legal "code", comparing it with Mosaic and Roman law. Later Assyriologists, notably Jean Bottéro, observed that Babylonian court records rarely cite it, and argued it is better read as a royal treatise on exemplary judgements — scholarship and propaganda addressed to gods and posterity. Older collections, such as those of Ur-Nammu and Lipit-Ishtar, show it belongs to a long Mesopotamian tradition. Scholars continue to debate its relation to everyday legal practice and to later Biblical laws that share some provisions.',
      perspectives: [
        { lens: 'Legal code', view: 'Traditional readings treat it as legislation applied in courts — an ancestor of codified law.' },
        { lens: 'Royal ideology', view: 'Many Assyriologists see a monument of kingship: Hammurabi presenting himself as the just shepherd chosen by the gods.' },
        { lens: 'Comparative law', view: 'Parallels with the Covenant Code in Exodus 21–23, such as the goring ox, suggest a shared Near Eastern legal culture; the nature of any influence is debated.' },
      ],
      consensus:
        'The stele dates to late in Hammurabi’s reign, belongs to a broader Mesopotamian tradition of law collections, and reflects both legal thought and royal ideology.',
      keyFigures: [
        { name: 'Hammurabi', kind: 'person', role: 'Sixth king of the First Dynasty of Babylon', dates: 'r. c. 1792–1750 BCE' },
        { name: 'Shutruk-Nahhunte', kind: 'person', role: 'Elamite king who carried the stele to Susa', dates: '12th century BCE' },
        { name: 'Stele of Hammurabi', kind: 'artifact', role: 'Basalt stele, 2.25 m tall; Musée du Louvre, Sb 8' },
        { name: 'Laws of Ur-Nammu', kind: 'text', role: 'Earlier Sumerian law collection, c. 2100 BCE' },
      ],
      sources: [
        { title: 'Law Collections from Mesopotamia and Asia Minor', authorOrInstitution: 'Martha T. Roth · Scholars Press', yearPublished: 1997, sourceType: 'academic' },
        { title: 'King Hammurabi of Babylon: A Biography', authorOrInstitution: 'Marc Van De Mieroop · Blackwell', yearPublished: 2005, sourceType: 'secondary' },
        { title: 'The "Code" of Hammurabi, in Mesopotamia: Writing, Reasoning, and the Gods', authorOrInstitution: 'Jean Bottéro · University of Chicago Press', yearPublished: 1992, sourceType: 'academic' },
        { title: 'Law Code of Hammurabi, King of Babylon (Sb 8)', authorOrInstitution: 'Musée du Louvre, Department of Near Eastern Antiquities', sourceType: 'archaeological' },
        { title: 'The Code of Hammurabi, trans. L. W. King', authorOrInstitution: 'The Avalon Project, Yale Law School', url: 'https://avalon.law.yale.edu/ancient/hamframe.asp', sourceType: 'primary' },
      ],
    },
  },
  {
    id: 'shang-oracle-bones',
    year: -1250,
    yearLabel: 'c. 1250 BCE',
    civilizationId: 'eastAsia',
    streamYPosition: streamY('eastAsia', -1250),
    title: 'Shang Oracle Bones at Anyang',
    shortSnippet:
      "Diviners of the Shang kings crack ox bones and turtle shells and record the answers — the earliest large body of Chinese writing.",
    importance: 'major',
    iconType: 'oracle-bone',
    storytelling: {
      heroQuote: 'Crack-making on guisi day, Que divined: "In the next ten days there will be no disaster."',
      heroQuoteAttribution: 'Formula of a Shang ten-day divination, after David N. Keightley',
      synopsis:
        'During the reign of King Wu Ding (c. 1250–1192 BCE) and his successors, court diviners at the late Shang capital near modern Anyang applied heat to prepared cattle scapulae and turtle plastrons and read the resulting cracks. They inscribed the questions — about harvests, warfare, weather, childbirth, dreams and offerings to ancestors — and sometimes the outcomes. More than 100,000 inscribed fragments have since been recovered.',
      beats: [
        {
          id: 'sb-1',
          timestampSubtitle: 'The last Shang capital, c. 1250 BCE',
          narrativeChunk:
            'On the banks of the Huan River stands the capital later texts call Yin. Rammed-earth palace foundations, royal tombs with chariots and human sacrifices, and workshops casting bronze ritual vessels testify to a powerful kingship bound to the worship of ancestors.',
          audioVoiceoverHint: 'Low and resonant, like a bronze bell.',
        },
        {
          id: 'sb-2',
          timestampSubtitle: 'Asking the ancestors',
          narrativeChunk:
            'A diviner drills hollows into the back of a polished bone or shell and applies a hot point. With a sharp crack, a 卜-shaped fissure appears, and the king reads it as auspicious or not. An engraver then carves the question beside the crack: Will it rain? Will Lady Hao’s childbirth be good? Should we attack?',
          audioVoiceoverHint: 'Suspenseful; pause before each question.',
          artifactCaption: 'Inscribed ox scapula, Shang dynasty: questions carved beside the heat-cracks.',
        },
        {
          id: 'sb-3',
          timestampSubtitle: 'Lady Hao, general and queen',
          narrativeChunk:
            'Inscriptions mention Fu Hao, a consort of Wu Ding who led armies and conducted rituals. In 1976 archaeologists found her tomb intact at Yinxu, with more than 1,500 objects — among them hundreds of bronzes and jades, several bearing her name.',
          audioVoiceoverHint: 'Admiring, vivid.',
          artifactCaption: 'Bronze ritual vessels from the tomb of Fu Hao, Yinxu, Anyang.',
        },
        {
          id: 'sb-4',
          timestampSubtitle: 'Dragon bones, 1899',
          narrativeChunk:
            'For generations, farmers sold the bones to apothecaries as "dragon bones" for medicine. In 1899 the scholar Wang Yirong recognised the carvings as ancient writing. Excavations at Anyang began in 1928, and the inscriptions confirmed that the Shang kings named in Sima Qian’s histories had been real.',
          audioVoiceoverHint: 'Storyteller’s reveal.',
        },
      ],
      historiographyPerspective:
        'Before the oracle bones were read, scholars of the "Doubting Antiquity" movement questioned whether the Shang had existed as traditional histories described. The inscriptions largely confirmed the Shang royal genealogy preserved by Sima Qian, a landmark for Chinese archaeology. Debate continues over how widely writing was used beyond divination, how far Shang authority reached, and whether the mature script implies an earlier, still-undiscovered stage. Chronology is also contested: the Xia–Shang–Zhou Chronology Project (1996–2000) proposed precise dates that some scholars consider over-confident.',
      perspectives: [
        { lens: 'Religion & kingship', view: 'Keightley described a theology in which the king alone mediated with powerful ancestors, making divination a pillar of royal power.' },
        { lens: 'Origins of writing', view: 'The script is already mature on the bones, leading some to argue for earlier writing on perishable bamboo; others see rapid development within the Shang court.' },
        { lens: 'A plural Bronze Age', view: 'Discoveries such as Sanxingdui in Sichuan reveal contemporary cultures with very different traditions, complicating a single-centre narrative.' },
      ],
      consensus:
        'The oracle-bone inscriptions are the earliest large corpus of Chinese writing, produced at the late Shang capital from roughly the 13th to 11th centuries BCE, and they substantially corroborate the traditional list of Shang kings.',
      keyFigures: [
        { name: 'Wu Ding', kind: 'person', role: 'Shang king whose reign produced the most oracle inscriptions', dates: 'r. c. 1250–1192 BCE' },
        { name: 'Fu Hao', kind: 'person', role: 'Royal consort, military commander and ritual leader', dates: 'd. c. 1200 BCE' },
        { name: 'Wang Yirong', kind: 'person', role: 'Qing scholar who identified oracle-bone script', dates: '1845–1900' },
        { name: 'Yinxu, Anyang', kind: 'place', role: 'Ruins of the late Shang capital; UNESCO World Heritage Site (2006)' },
      ],
      sources: [
        { title: 'Sources of Shang History: The Oracle-Bone Inscriptions of Bronze Age China', authorOrInstitution: 'David N. Keightley · University of California Press', yearPublished: 1978, sourceType: 'academic' },
        { title: 'Shang Archaeology, in The Cambridge History of Ancient China', authorOrInstitution: 'Robert Bagley · Cambridge University Press', yearPublished: 1999, sourceType: 'academic' },
        { title: 'Jiaguwen heji (Collected Oracle-Bone Inscriptions)', authorOrInstitution: 'Guo Moruo (ed.) · Zhonghua Shuju', yearPublished: '1978–1982', sourceType: 'primary' },
        { title: 'Yinxu Fu Hao mu (The Tomb of Fu Hao at Yinxu)', authorOrInstitution: 'Institute of Archaeology, CASS · Wenwu Press', yearPublished: 1980, sourceType: 'archaeological' },
        { title: 'Yin Xu — World Heritage List', authorOrInstitution: 'UNESCO World Heritage Centre', yearPublished: 2006, url: 'https://whc.unesco.org/en/list/1114', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'olmec-san-lorenzo',
    year: -1200,
    yearLabel: 'c. 1200 BCE',
    civilizationId: 'americas',
    streamYPosition: streamY('americas', -1200),
    title: 'The Olmec at San Lorenzo',
    shortSnippet:
      "On Mexico's Gulf Coast, the Olmec carve colossal basalt heads and build Mesoamerica's earliest major centre.",
    importance: 'regional',
    iconType: 'colossal-head',
    storytelling: {
      synopsis:
        'Between about 1200 and 900 BCE, San Lorenzo in today’s Veracruz became the first great centre of Mesoamerica. Its people reshaped a plateau into an engineered landscape, hauled multi-ton basalt boulders from the Tuxtla Mountains more than 50 kilometres away, and carved them into thrones and colossal portrait heads. Olmec imagery and ideas about rulership spread widely across Mesoamerica.',
      beats: [
        {
          id: 'ol-1',
          timestampSubtitle: 'Rivers and rubber, c. 1600 BCE',
          narrativeChunk:
            'In the humid lowlands of the Coatzacoalcos basin, villagers farm maize, fish the rivers and tap rubber trees. At the spring of El Manatí they offer wooden figures, jade axes and rubber balls — among the oldest known — hinting that the Mesoamerican ballgame was already being played.',
          audioVoiceoverHint: 'Lush, humid, unhurried.',
        },
        {
          id: 'ol-2',
          timestampSubtitle: 'A plateau remade, c. 1200 BCE',
          narrativeChunk:
            'At San Lorenzo, builders move enormous volumes of earth to shape terraces on a raised plateau, with drainage channels made of fitted basalt. Elite residences crown the summit, while a population of thousands lives on the slopes and along the river levees below.',
          audioVoiceoverHint: 'Confident, constructive.',
        },
        {
          id: 'ol-3',
          timestampSubtitle: 'Faces of power',
          narrativeChunk:
            'Ten colossal heads have been found at San Lorenzo, each with a distinct face and a helmet-like headdress. Most scholars see them as portraits of rulers. Some appear to have been re-carved from earlier thrones — monuments recycled as authority passed from one ruler to the next.',
          audioVoiceoverHint: 'Intimate, as if face to face.',
          artifactCaption: 'San Lorenzo Monument 1, "El Rey" — Museo de Antropología de Xalapa.',
        },
        {
          id: 'ol-4',
          timestampSubtitle: 'Shifting centres, c. 900 BCE',
          narrativeChunk:
            'By around 900 BCE San Lorenzo declined, perhaps as rivers changed course, and La Venta rose to prominence. Olmec-style objects and motifs appear from central Mexico to Guatemala, opening a long debate about how one culture’s ideas travelled so far.',
          audioVoiceoverHint: 'Reflective, open-ended.',
        },
      ],
      historiographyPerspective:
        'Mid-twentieth-century scholars such as Alfonso Caso and Miguel Covarrubias described the Olmec as Mesoamerica’s "mother culture" (cultura madre). Others, notably Kent Flannery and Joyce Marcus, argued for "sister cultures" — interacting regional societies developing in parallel — and chemical studies of pottery have been cited on both sides. Specialists reject fringe claims that the colossal heads depict African or other overseas visitors: their features are consistent with the local population, and there is no archaeological evidence of transoceanic contact.',
      perspectives: [
        { lens: 'Mother culture', view: 'Olmec innovations in art, ritual and kingship were exported, shaping later Maya and central Mexican traditions.' },
        { lens: 'Sister cultures', view: 'Oaxaca, central Mexico and the Pacific coast developed complex societies at the same time, sharing ideas through exchange.' },
        { lens: 'Synthesis', view: 'Many researchers now see the Gulf Coast as especially influential in monumental art, but within a network of active partners.' },
      ],
      consensus:
        'San Lorenzo was the earliest large political centre in Mesoamerica (c. 1200–900 BCE), and Olmec art and ideas were widely shared, though how they spread remains debated.',
      keyFigures: [
        { name: 'Monument 1, "El Rey"', kind: 'artifact', role: 'Colossal basalt head about 2.8 m high' },
        { name: 'Matthew Stirling', kind: 'person', role: 'Smithsonian archaeologist who excavated Olmec heads in the 1930s–40s', dates: '1896–1975' },
        { name: 'Ann Cyphers', kind: 'person', role: 'UNAM archaeologist who led long-term excavations at San Lorenzo' },
        { name: 'La Venta', kind: 'place', role: 'Successor centre in Tabasco, flourishing c. 900–400 BCE' },
      ],
      sources: [
        { title: 'The Olmecs: America’s First Civilization', authorOrInstitution: 'Richard A. Diehl · Thames & Hudson', yearPublished: 2004, sourceType: 'secondary' },
        { title: 'In the Land of the Olmec', authorOrInstitution: 'Michael D. Coe & Richard A. Diehl · University of Texas Press', yearPublished: 1980, sourceType: 'archaeological' },
        { title: 'Formative Mexican Chiefdoms and the Myth of the "Mother Culture"', authorOrInstitution: 'Kent V. Flannery & Joyce Marcus · Journal of Anthropological Archaeology 19', yearPublished: 2000, sourceType: 'academic' },
        { title: 'Olmec Pottery Production and Export in Ancient Mexico Determined Through Elemental Analysis', authorOrInstitution: 'Jeffrey P. Blomster, Hector Neff & Michael D. Glascock · Science 307', yearPublished: 2005, sourceType: 'academic' },
        { title: 'Olmec colossal heads collection', authorOrInstitution: 'Museo de Antropología de Xalapa, Universidad Veracruzana', sourceType: 'archaeological' },
      ],
    },
  },
];
