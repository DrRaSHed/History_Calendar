import type { HistoricalEvent } from '../../types/timeline';
import { streamY } from '../../lib/ribbonGeometry';

/** Panel IV — The Global Acceleration (1914 CE – present) */
export const panelFourEvents: HistoricalEvent[] = [
  {
    id: 'influenza-1918',
    year: 1918,
    yearLabel: '1918 CE',
    civilizationId: 'global',
    streamYPosition: streamY('global', 1918),
    title: 'The 1918 Influenza Pandemic',
    shortSnippet:
      'An H1N1 influenza virus circles the globe in waves, infecting perhaps a third of humanity and killing tens of millions.',
    importance: 'major',
    iconType: 'virus',
    storytelling: {
      heroQuote:
        'If the epidemic continues its mathematical rate of acceleration, civilization could easily disappear from the face of the earth within a few weeks.',
      heroQuoteAttribution: 'Victor C. Vaughan, 1918, as quoted in John M. Barry, The Great Influenza',
      synopsis:
        'Between 1918 and 1920, an influenza A (H1N1) virus spread in at least three waves, aided by wartime troop movements and crowding. An estimated 500 million people — about a third of the world’s population — were infected; estimates of deaths range from about 17 million to 50 million or more. Unusually, it killed many healthy young adults. It became known as the "Spanish flu" only because neutral Spain’s press reported it openly.',
      beats: [
        {
          id: 'fl-1',
          timestampSubtitle: 'First wave, spring 1918',
          narrativeChunk:
            'Outbreaks appear among soldiers in crowded camps — in Kansas, in France and elsewhere. The illness seems ordinary: fever, aches, a few days in bed. Wartime censorship in the combatant nations keeps reports quiet. Neutral Spain does not censor — and the disease is unfairly named after it.',
          audioVoiceoverHint: 'Plain, almost casual — the calm before.',
        },
        {
          id: 'fl-2',
          timestampSubtitle: 'The deadly autumn wave, 1918',
          narrativeChunk:
            'In late August a far more lethal wave erupts almost simultaneously in Brest, Freetown and Boston. Victims turn blue from lack of oxygen; young adults die within days, often of secondary bacterial pneumonia. Coffins run short, and schools, theatres and churches close.',
          audioVoiceoverHint: 'Grave, slow. No sensationalism.',
        },
        {
          id: 'fl-3',
          timestampSubtitle: 'A world unequally struck',
          narrativeChunk:
            'Mortality varies enormously. British India may have lost well over ten million people. Western Samoa lost about a fifth of its population after a ship brought the virus, while nearby American Samoa, under strict quarantine, reported no deaths. Indigenous communities from Alaska to the Pacific suffered catastrophic losses.',
          audioVoiceoverHint: 'Steady, factual, compassionate.',
          artifactCaption: 'Emergency hospital at Camp Funston, Kansas, 1918 — site of one of the earliest documented outbreaks.',
        },
        {
          id: 'fl-4',
          timestampSubtitle: 'Reconstructing the virus, 2005',
          narrativeChunk:
            'No virus samples were kept in 1918. Decades later, scientists recovered its genetic material from preserved autopsy tissue and from a victim buried in the Alaskan permafrost. In 2005 they reconstructed the virus to learn what made it so deadly — research that still informs pandemic preparedness.',
          audioVoiceoverHint: 'Investigative, forward-looking.',
        },
      ],
      historiographyPerspective:
        'For decades the pandemic was a "forgotten" catastrophe, overshadowed in public memory by the First World War, though it killed more people. Its geographic origin remains debated: hypotheses include rural Kansas, British army camps in France and the movement of Chinese Labour Corps workers, with none conclusively proven. Recent scholarship, including Laura Spinney’s global history, foregrounds experiences in India, Africa, Brazil and the Pacific, and shows how colonialism, poverty and race shaped who died. The COVID-19 pandemic prompted renewed comparisons of public-health measures, with historians cautioning against simple lessons.',
      perspectives: [
        { lens: 'Virology', view: 'Taubenberger and Morens call it "the mother of all pandemics": descendants of the 1918 virus contributed genes to many later influenza strains.' },
        { lens: 'Social history', view: 'Death rates tracked inequality: colonial subjects, the poor and Indigenous peoples died at far higher rates.' },
        { lens: 'Public health policy', view: 'Studies of US cities associate earlier, sustained closures with lower peak death rates, though the strength of that link is debated.' },
      ],
      consensus:
        'The 1918–1920 pandemic was caused by an H1N1 influenza A virus, infected roughly a third of humanity and killed tens of millions; its exact origin is unknown.',
      keyFigures: [
        { name: 'Jeffery Taubenberger', kind: 'person', role: 'Pathologist who led sequencing of the 1918 virus genome', dates: 'b. 1961' },
        { name: 'Johan Hultin', kind: 'person', role: 'Pathologist who recovered virus samples from permafrost at Brevig Mission, Alaska', dates: '1924–2022' },
        { name: 'Camp Funston, Kansas', kind: 'place', role: 'US Army camp with an early documented outbreak, March 1918' },
        { name: 'Western Samoa', kind: 'place', role: 'Lost about a fifth of its population within weeks in late 1918' },
      ],
      sources: [
        { title: '1918 Influenza: the Mother of All Pandemics', authorOrInstitution: 'Jeffery K. Taubenberger & David M. Morens · Emerging Infectious Diseases 12(1)', yearPublished: 2006, url: 'https://doi.org/10.3201/eid1201.050979', sourceType: 'academic' },
        { title: 'Updating the Accounts: Global Mortality of the 1918–1920 "Spanish" Influenza Pandemic', authorOrInstitution: 'Niall P. A. S. Johnson & Juergen Mueller · Bulletin of the History of Medicine 76(1)', yearPublished: 2002, sourceType: 'academic' },
        { title: 'The Great Influenza: The Epic Story of the Deadliest Plague in History', authorOrInstitution: 'John M. Barry · Viking', yearPublished: 2004, sourceType: 'secondary' },
        { title: 'Pale Rider: The Spanish Flu of 1918 and How It Changed the World', authorOrInstitution: 'Laura Spinney · Jonathan Cape', yearPublished: 2017, sourceType: 'secondary' },
        { title: 'Characterization of the Reconstructed 1918 Spanish Influenza Pandemic Virus', authorOrInstitution: 'Terrence M. Tumpey et al. · Science 310', yearPublished: 2005, sourceType: 'academic' },
      ],
    },
  },
  {
    id: 'trinity-test',
    year: 1945,
    yearLabel: '16 July 1945',
    civilizationId: 'americas',
    streamYPosition: streamY('americas', 1945),
    title: 'The Trinity Test & the Nuclear Age',
    shortSnippet:
      'In the New Mexico desert, the Manhattan Project detonates the first nuclear weapon — three weeks before atomic bombs destroy Hiroshima and Nagasaki.',
    importance: 'monumental',
    iconType: 'atom',
    storytelling: {
      heroQuote: 'Now I am become Death, the destroyer of worlds.',
      heroQuoteAttribution: 'J. Robert Oppenheimer, recalling the test in 1965, quoting the Bhagavad Gita',
      synopsis:
        'At 5:29 a.m. on 16 July 1945, the Manhattan Project detonated a plutonium implosion device, code-named "the Gadget", on the Jornada del Muerto in New Mexico. The explosion, equivalent to about 25 kilotons of TNT, inaugurated the nuclear age. Three weeks later atomic bombs destroyed Hiroshima and Nagasaki, and the weapons’ legacy has shaped global politics ever since.',
      beats: [
        {
          id: 'tr-1',
          timestampSubtitle: 'A race in secret, 1939–1945',
          narrativeChunk:
            'After the discovery of nuclear fission in 1938, scientists fear Nazi Germany could build a bomb. Albert Einstein and Leo Szilard warn President Roosevelt in 1939. By 1945 the Manhattan Project employs well over 100,000 people at sites including Oak Ridge, Hanford and the secret laboratory at Los Alamos, directed by J. Robert Oppenheimer.',
          audioVoiceoverHint: 'Tense, clandestine.',
        },
        {
          id: 'tr-2',
          timestampSubtitle: 'The Gadget, 16 July 1945',
          narrativeChunk:
            'Before dawn, after a storm delays the test, the device atop a 30-metre steel tower is detonated. A flash brighter than many suns lights the mountains, and a mushroom cloud climbs more than twelve kilometres. Desert sand fuses into a greenish glass later called trinitite.',
          audioVoiceoverHint: 'Silence, then awe. Do not glorify.',
          artifactCaption: 'Trinitite: desert sand melted into glass by the first nuclear explosion.',
        },
        {
          id: 'tr-3',
          timestampSubtitle: 'Downwind',
          narrativeChunk:
            'Radioactive fallout drifts over communities in the Tularosa Basin and beyond, where many Hispanic and Indigenous families live — none of them warned or evacuated. For decades, residents have sought acknowledgment and compensation for illnesses they attribute to the test.',
          audioVoiceoverHint: 'Quiet, human, unhurried.',
        },
        {
          id: 'tr-4',
          timestampSubtitle: 'Hiroshima, Nagasaki and the long shadow',
          narrativeChunk:
            'On 6 and 9 August, atomic bombs destroy Hiroshima and Nagasaki; by the end of 1945 more than 200,000 people are dead. Japan announces its surrender on 15 August. The arms race that follows produces tens of thousands of warheads, arms-control treaties, and a world living with the possibility of nuclear war.',
          audioVoiceoverHint: 'Grave, sober, closing.',
        },
      ],
      historiographyPerspective:
        'Debate over the atomic bombings began in 1945 and continues. The "orthodox" view, rooted in statements by US leaders such as Henry Stimson, holds that the bombs ended the war and averted an invasion costly to both sides. "Revisionist" historians such as Gar Alperovitz argued that Japan was near surrender and that the bombs were partly meant to impress the Soviet Union. Many historians, including J. Samuel Walker and Tsuyoshi Hasegawa, take positions in between, weighing the Soviet declaration of war alongside the bombs. In Japan, survivor (hibakusha) testimony has shaped a powerful anti-nuclear memory, while the 1995 controversy over the Smithsonian’s Enola Gay exhibition showed how contested the history remains in the United States.',
      perspectives: [
        { lens: 'Orthodox', view: 'The bombs shortened the war and, on balance, saved lives given Japanese military resistance.' },
        { lens: 'Revisionist', view: 'Alternatives — modified surrender terms, waiting for Soviet entry — were available, and diplomacy toward the USSR mattered.' },
        { lens: 'Affected communities', view: 'Hibakusha in Japan and downwinders in New Mexico emphasise human costs that strategic histories can obscure.' },
      ],
      consensus:
        'The Trinity test on 16 July 1945 was the first nuclear detonation; the bombings that followed caused immense civilian deaths, and historians continue to debate their necessity and their role in Japan’s surrender.',
      keyFigures: [
        { name: 'J. Robert Oppenheimer', kind: 'person', role: 'Director of the Los Alamos Laboratory', dates: '1904–1967' },
        { name: 'Leslie Groves', kind: 'person', role: 'US Army general directing the Manhattan Project', dates: '1896–1970' },
        { name: 'Kenneth Bainbridge', kind: 'person', role: 'Physicist who directed the Trinity test', dates: '1904–1996' },
        { name: 'Trinity Site', kind: 'place', role: 'National Historic Landmark on White Sands Missile Range, New Mexico' },
      ],
      sources: [
        { title: 'The Making of the Atomic Bomb', authorOrInstitution: 'Richard Rhodes · Simon & Schuster', yearPublished: 1986, sourceType: 'secondary' },
        { title: 'Trinity (LA-6300-H)', authorOrInstitution: 'Kenneth T. Bainbridge · Los Alamos Scientific Laboratory', yearPublished: 1976, sourceType: 'primary' },
        { title: 'Prompt and Utter Destruction: Truman and the Use of Atomic Bombs against Japan', authorOrInstitution: 'J. Samuel Walker · University of North Carolina Press', yearPublished: 1997, sourceType: 'academic' },
        { title: 'Racing the Enemy: Stalin, Truman, and the Surrender of Japan', authorOrInstitution: 'Tsuyoshi Hasegawa · Harvard University Press', yearPublished: 2005, sourceType: 'academic' },
        { title: 'The Decision to Use the Atomic Bomb', authorOrInstitution: 'Gar Alperovitz · Knopf', yearPublished: 1995, sourceType: 'academic' },
        { title: 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer', authorOrInstitution: 'Kai Bird & Martin J. Sherwin · Knopf', yearPublished: 2005, sourceType: 'secondary' },
      ],
    },
  },
  {
    id: 'apollo-11',
    year: 1969,
    yearLabel: '20 July 1969',
    civilizationId: 'americas',
    streamYPosition: streamY('americas', 1969),
    title: 'Apollo 11: The First Lunar Landing',
    shortSnippet:
      'Neil Armstrong and Buzz Aldrin land on the Moon while Michael Collins orbits above — watched live by hundreds of millions.',
    importance: 'major',
    iconType: 'rocket',
    storytelling: {
      heroQuote: 'That’s one small step for [a] man, one giant leap for mankind.',
      heroQuoteAttribution: 'Neil Armstrong, 20 July 1969 (21 July UTC)',
      synopsis:
        'On 20 July 1969 the Apollo 11 lunar module Eagle landed in the Sea of Tranquility. Neil Armstrong and Edwin "Buzz" Aldrin spent about two and a half hours outside, collecting 21.5 kilograms of samples and deploying experiments, while Michael Collins orbited in the command module Columbia. The mission fulfilled a goal set by President Kennedy in 1961 amid Cold War rivalry with the Soviet Union; five more crews landed through 1972.',
      beats: [
        {
          id: 'ap-1',
          timestampSubtitle: 'A race to the Moon, 1957–1961',
          narrativeChunk:
            'The Soviet Union launches Sputnik in 1957 and Yuri Gagarin in 1961. Weeks after Gagarin’s flight, President John F. Kennedy asks Congress to commit to landing a man on the Moon before the decade is out. At its peak, Apollo involves some 400,000 people across government, industry and universities.',
          audioVoiceoverHint: 'Driving, competitive.',
        },
        {
          id: 'ap-2',
          timestampSubtitle: 'Launch, 16 July 1969',
          narrativeChunk:
            'A Saturn V rocket, 110 metres tall, lifts off from Kennedy Space Center. Four days later, during the descent, computer alarms flash and a boulder field looms; Armstrong takes manual control and steers Eagle to a safer spot with little fuel to spare.',
          audioVoiceoverHint: 'Tension building to release.',
        },
        {
          id: 'ap-3',
          timestampSubtitle: 'Tranquility Base, 20 July 1969',
          narrativeChunk:
            '"The Eagle has landed." Hours later Armstrong steps onto the surface, followed by Aldrin. They plant a flag, set up a seismometer and a laser reflector still used today, and gather rock and soil. With no wind on the Moon, their footprints remain.',
          audioVoiceoverHint: 'Wonder, softly.',
          artifactCaption: 'Command Module Columbia — Smithsonian National Air and Space Museum.',
        },
        {
          id: 'ap-4',
          timestampSubtitle: 'Homecoming, 24 July 1969',
          narrativeChunk:
            'Columbia splashes down in the Pacific, and the crew enters quarantine. The rocks they returned reshaped theories of the Moon’s origin, helping support the idea that it formed from debris after a giant impact with the early Earth.',
          audioVoiceoverHint: 'Warm, conclusive.',
        },
      ],
      historiographyPerspective:
        'Apollo is often celebrated as humanity’s greatest technological feat and a symbol of peaceful exploration — the plaque left behind reads "We came in peace for all mankind." Historians such as Roger Launius emphasise its Cold War motivations and note that US public support was lukewarm for much of the programme. Contemporary critics, including civil-rights leaders who protested at the launch, questioned spending on space amid poverty at home. Soviet and Russian histories highlight their own firsts and the secret Soviet lunar programme. Claims that the landings were faked are rejected by overwhelming evidence, including independently tracked transmissions and lunar samples studied worldwide.',
      perspectives: [
        { lens: 'Cold War', view: 'Apollo as geopolitical competition — a demonstration of American technological and ideological strength.' },
        { lens: 'Social critique', view: 'Activists and historians such as Neil Maher connect Apollo to debates over poverty, race and the environment; images of Earth from space helped inspire environmentalism.' },
        { lens: 'Shared heritage', view: 'Apollo as a human milestone, watched live by an estimated 600 million people around the world.' },
      ],
      consensus:
        'Apollo 11 landed on 20 July 1969 and returned lunar samples that transformed planetary science; it was driven by Cold War competition and remains a landmark of exploration.',
      keyFigures: [
        { name: 'Neil Armstrong', kind: 'person', role: 'Mission commander, first person to walk on the Moon', dates: '1930–2012' },
        { name: 'Buzz Aldrin', kind: 'person', role: 'Lunar module pilot', dates: 'b. 1930' },
        { name: 'Michael Collins', kind: 'person', role: 'Command module pilot who remained in lunar orbit', dates: '1930–2021' },
        { name: 'Margaret Hamilton', kind: 'person', role: 'Led development of Apollo on-board flight software at MIT', dates: 'b. 1936' },
      ],
      sources: [
        { title: 'Apollo 11 Mission Report (MSC-00171)', authorOrInstitution: 'NASA Manned Spacecraft Center', yearPublished: 1969, sourceType: 'primary' },
        { title: 'A Man on the Moon: The Voyages of the Apollo Astronauts', authorOrInstitution: 'Andrew Chaikin · Viking', yearPublished: 1994, sourceType: 'secondary' },
        { title: 'Apollo’s Legacy: Perspectives on the Moon Landings', authorOrInstitution: 'Roger D. Launius · Smithsonian Books', yearPublished: 2019, sourceType: 'academic' },
        { title: 'Apollo in the Age of Aquarius', authorOrInstitution: 'Neil M. Maher · Harvard University Press', yearPublished: 2017, sourceType: 'academic' },
        { title: 'Challenge to Apollo: The Soviet Union and the Space Race, 1945–1974 (NASA SP-2000-4408)', authorOrInstitution: 'Asif A. Siddiqi · NASA History Division', yearPublished: 2000, sourceType: 'academic' },
        { title: 'Command Module Columbia', authorOrInstitution: 'Smithsonian National Air and Space Museum', url: 'https://airandspace.si.edu', sourceType: 'archaeological' },
      ],
    },
  },
  {
    id: 'human-genome',
    year: 2003,
    yearLabel: '2003 CE',
    civilizationId: 'global',
    streamYPosition: streamY('global', 2003),
    title: 'Sequencing the Human Genome',
    shortSnippet:
      'An international consortium completes the Human Genome Project, reading some three billion letters of human DNA.',
    importance: 'major',
    iconType: 'dna',
    storytelling: {
      heroQuote: '…it has not escaped our notice that the more we learn about the human genome, the more there is to explore.',
      heroQuoteAttribution: 'International Human Genome Sequencing Consortium, Nature (2001)',
      synopsis:
        'Launched in 1990, the Human Genome Project joined laboratories in the United States, United Kingdom, France, Germany, Japan and China to sequence human DNA. A draft was announced in 2000 and published in 2001 alongside a rival private effort by Celera Genomics. In April 2003 the project declared the sequence essentially complete — though the last gaps were closed only in 2022. Its data were released freely, transforming biology and medicine.',
      beats: [
        {
          id: 'hg-1',
          timestampSubtitle: 'Reading the code, 1953–1990',
          narrativeChunk:
            'Since the double-helix structure of DNA was described in 1953 — work that relied on X-ray images made by Rosalind Franklin’s group — scientists had learned to read short stretches of genetic code. In 1990 the US National Institutes of Health and Department of Energy launch a plan to read all of it, budgeted at about $3 billion over fifteen years.',
          audioVoiceoverHint: 'Curious, building ambition.',
        },
        {
          id: 'hg-2',
          timestampSubtitle: 'Open data, Bermuda, 1996',
          narrativeChunk:
            'Meeting in Bermuda, leaders of the public consortium agree that sequence data will be released within 24 hours, free for anyone to use. These "Bermuda Principles" set a powerful precedent for open science.',
          audioVoiceoverHint: 'Principled, quietly proud.',
        },
        {
          id: 'hg-3',
          timestampSubtitle: 'A race and a truce, 1998–2001',
          narrativeChunk:
            'In 1998 Craig Venter’s company Celera announces it will sequence the genome faster using a whole-genome "shotgun" method. Competition accelerates both efforts. In June 2000, at the White House, the rivals jointly announce a working draft; their papers appear in Nature and Science in February 2001.',
          audioVoiceoverHint: 'Brisk, competitive, then conciliatory.',
          artifactCaption: 'The human genome: about 3.1 billion base pairs in 23 chromosome pairs, with roughly 20,000 protein-coding genes.',
        },
        {
          id: 'hg-4',
          timestampSubtitle: 'Complete at last? 2003–2022',
          narrativeChunk:
            'In April 2003 — fifty years after the double helix — the project announces completion, covering about 92 per cent of the genome. The remaining, highly repetitive regions are finally read by the Telomere-to-Telomere Consortium in 2022, and a 2023 pangenome begins to capture human diversity beyond a single reference.',
          audioVoiceoverHint: 'Reflective, open-ended.',
        },
      ],
      historiographyPerspective:
        'The Human Genome Project has been celebrated as biology’s "moonshot" and criticised for overpromising rapid cures. Scholars such as Jenny Reardon examine how promises of personalised medicine met complex realities, and how questions of consent, privacy and ownership grew with genomic data. The reference sequence came largely from a small number of donors, and most genomic studies since have drawn overwhelmingly on people of European ancestry, raising concerns about equity; initiatives such as H3Africa and the Human Pangenome Reference Consortium aim to broaden representation. The public–private race also fed debates over gene patents, addressed in the US by the Supreme Court’s 2013 Myriad decision that naturally occurring DNA cannot be patented.',
      perspectives: [
        { lens: 'Scientific foundation', view: 'A reference resource that enabled cheaper sequencing, genetic diagnosis and new fields from functional genomics to ancient DNA.' },
        { lens: 'Critical genomics', view: 'Scholars caution against genetic determinism: most traits and diseases involve many genes interacting with environment and society.' },
        { lens: 'Equity & ethics', view: 'Calls for diverse participation, Indigenous data sovereignty and fair sharing of benefits from genomic research.' },
      ],
      consensus:
        'The Human Genome Project produced a high-quality reference sequence by 2003 through international collaboration and open data; the first truly complete sequence was published in 2022.',
      keyFigures: [
        { name: 'Francis Collins', kind: 'person', role: 'Director of the US National Human Genome Research Institute', dates: 'b. 1950' },
        { name: 'J. Craig Venter', kind: 'person', role: 'Founder of Celera Genomics, leader of the private effort', dates: 'b. 1946' },
        { name: 'John Sulston', kind: 'person', role: 'Director of the Sanger Centre and champion of open data', dates: '1942–2018' },
        { name: 'Bermuda Principles', kind: 'text', role: '1996 agreement to release sequence data within 24 hours' },
      ],
      sources: [
        { title: 'Initial sequencing and analysis of the human genome', authorOrInstitution: 'International Human Genome Sequencing Consortium · Nature 409', yearPublished: 2001, sourceType: 'academic' },
        { title: 'Finishing the euchromatic sequence of the human genome', authorOrInstitution: 'International Human Genome Sequencing Consortium · Nature 431', yearPublished: 2004, sourceType: 'academic' },
        { title: 'The Sequence of the Human Genome', authorOrInstitution: 'J. Craig Venter et al. · Science 291', yearPublished: 2001, sourceType: 'academic' },
        { title: 'The complete sequence of a human genome', authorOrInstitution: 'Sergey Nurk et al. (T2T Consortium) · Science 376', yearPublished: 2022, sourceType: 'academic' },
        { title: 'The Postgenomic Condition: Ethics, Justice, and Knowledge after the Genome', authorOrInstitution: 'Jenny Reardon · University of Chicago Press', yearPublished: 2017, sourceType: 'secondary' },
        { title: 'The Human Genome Project', authorOrInstitution: 'National Human Genome Research Institute', url: 'https://www.genome.gov/human-genome-project', sourceType: 'primary' },
      ],
    },
  },
];
