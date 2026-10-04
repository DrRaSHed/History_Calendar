# ChronosFold — The Synchronological Stream of Human History

An interactive chart of world history inspired by Sebastian C. Adams' 1871 *Synchronological Chart or Map of History*: civilizations flow as parallel, colour-coded streams that widen, merge and taper through time, with illustrated medallions marking key events.

**Live:** https://chronosfold.dr-rashedsalahr.workers.dev

## Features

- **Four-fold view** — the chart folds into four leaves (Deep Past & River Valleys · Classical & Axial Age · Interchange & Revolutions · Global Acceleration); tap a leaf to unfold at that era.
- **Panorama** — horizontally pannable chart with millennia / epoch / century zoom, minimap and stream legend.
- **Prophets line** — a thread through the Levant & Arabia lane marking 37 prophets of Jewish and Islamic tradition (Adam to Muhammad), colour-coded by which tradition counts each as a prophet, with traditional dates and notes on hover/tap; toggle it from the stream legend.
- **20 events** with cartoon vignettes in the spirit of Adams' engravings, each opening a story reader:
  - subtitle-style story beats (auto or click-to-advance) with narration,
  - synopsis, perspectives & historical consensus, key figures and artifacts, sources,
  - an infographic tab: locator map, headline numbers, comparison chart (with table view), timeline and facts.
- **Arabic (RTL)** — full Arabic interface; story narration written in Egyptian colloquial, scholarly sections in Modern Standard Arabic. The time axis stays left-to-right by design.
- **Egyptian-Arabic voice** — the 80 Arabic story beats ship as pre-generated MP3s made with [NAMAA-Space/NAMAA-Egyptian-TTS](https://huggingface.co/NAMAA-Space/NAMAA-Egyptian-TTS), in two narrator voices (the model's built-in voice, and a female Egyptian voice), plus a third voice ("Aisha", Egyptian Arabic) made with [Speaktor](https://speaktor.com). Listeners switch narrator and speed (0.8×–1×) in the story player; falls back to the browser's speech voices.
- Keyboard navigation (press `?` in the app), optional sound — paper effects plus a soft, synthesised soundscape of each region's signature instruments (ney & oud, lyre, santur, tanpura, guzheng, kora, clay flute, chant & lute) that follows the region you're exploring — the open story, a focused stream, or, while panning, the event nearest the centre of the view (silent in the folded overview), reduced-motion support, responsive down to small phones in either orientation.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · framer-motion · zustand · lucide-react — hosted as static assets on Cloudflare Workers. Optional Python/FastAPI service for TTS.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server (proxies `/api/tts` to the optional TTS server on :8000) |
| `npm run build` | Type-check and build to `dist/` |
| `npm run typecheck` | TypeScript only |
| `npm run preview` | Build and serve locally with `wrangler dev` |
| `npm run deploy` | Build and deploy to Cloudflare (needs `wrangler login`) |

## Project layout

```
src/
  components/      chart (MapCanvas, CivilizationRibbons, TimeAxis, ...), fold/panorama views,
                   story reader (StoryModal, StoryPlayer, StoryDossier, Infographic), Vignettes
  data/            panels, civilization streams, events (panel1–4), extras (infographic data)
  data/ar/         Arabic edition of events, panels and streams
  i18n/            language store, UI strings, content localization
  lib/             time scale, ribbon geometry, sound, TTS client
  store/           app state (zustand)
public/audio/      pre-generated Egyptian narration, <event>-<beat>.mp3 (voice 1); female/ = voice 2; aisha/ = voice 3 (Speaktor)
scripts/           export-ar-texts.ts — dumps Arabic narration to tts-server/texts.json
tts-server/        optional TTS service and batch generator (see its README)
```

## Egyptian narration

The site needs no server for narration: the player looks for `public/audio/<event>-<beat>.mp3` first, then a running TTS API, then browser voices.

To regenerate after editing the Arabic text in `src/data/ar/`:

```bash
npx tsx scripts/export-ar-texts.ts                       # refresh tts-server/texts.json
cd tts-server
python -m venv .venv
.venv/Scripts/pip install torch==2.6.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cpu
.venv/Scripts/pip install chatterbox-tts lameenc huggingface_hub
# delete the MP3s you want re-recorded, then:
.venv/Scripts/python generate_static.py                  # voice 1; resumable, only missing files are generated
.venv/Scripts/python generate_static.py --voice voices/namaa_female.wav --out female   # voice 2
```

First run downloads ~3.2 GB of model files. On CPU expect roughly 1.5–2.5 minutes per beat. (Paths above are for Windows; on macOS/Linux use `.venv/bin/`.)

A live FastAPI service with hash-keyed caching is also included for development — see [`tts-server/README.md`](tts-server/README.md).

## Content notes

- The historical text, figures, quotes and source lists were drafted with AI assistance and should be checked against the cited sources before being relied on.
- The Arabic copy (including the Egyptian-dialect narration) needs proofreading by a native speaker.
- The TTS model card notes that numbers and the Egyptian “ق” may be mispronounced.
- Ribbon widths are an interpretive, Adams-style convention for relative prominence, not measured data.
- The prophets line uses traditional dating (Jewish Anno Mundi reckoning before the monarchy, the Qurʾanic narrative order where no date is given, conventional estimates from David on); most of these dates cannot be verified historically.

## Credits

- Sebastian C. Adams, *Adams' Synchronological Chart or Map of History* (1871) — the visual inspiration.
- Voice 3 ("Aisha", Arabic – Egypt) generated with [Speaktor](https://speaktor.com) text-to-speech.
- Female narrator reference voice: from the [NAMAA demo Space](https://huggingface.co/spaces/omarelshehy/NAMAA-Egyptian-Voice) (MIT).
- Egyptian TTS: [NAMAA-Egyptian-TTS](https://huggingface.co/NAMAA-Space/NAMAA-Egyptian-TTS) by the NAMAA Community (MIT), built on [Resemble AI Chatterbox](https://huggingface.co/ResembleAI/chatterbox).
- Fonts: Cinzel, Cormorant Garamond, Lora, JetBrains Mono, Amiri, Cairo and Reem Kufi via Google Fonts.

No license has been chosen for this project yet.
