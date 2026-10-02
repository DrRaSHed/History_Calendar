import { useLayoutEffect } from 'react';
import { AccordionFoldContainer } from './components/AccordionFoldContainer';
import { HeaderControls } from './components/HeaderControls';
import { HelpDialog } from './components/HelpDialog';
import { StoryModal } from './components/StoryModal';
import { SvgDefs } from './components/SvgDefs';
import { TimelineMinimap } from './components/TimelineMinimap';
import { useChronoKeyboard, useSoundSync } from './hooks/useChronoKeyboard';
import { applyLang, useLang } from './i18n/lang';

export default function App() {
  const lang = useLang((s) => s.lang);
  useChronoKeyboard();
  useSoundSync();

  // Keep <html lang/dir>, the document title and the font stack in step with the chosen language.
  useLayoutEffect(() => applyLang(lang), [lang]);

  return (
    <div className="flex h-dvh flex-col">
      <SvgDefs />
      <HeaderControls />
      <main className="relative min-h-0 flex-1" aria-label={lang === 'ar' ? 'الخريطة' : 'Chart'}>
        <AccordionFoldContainer />
      </main>
      <TimelineMinimap />
      <StoryModal />
      <HelpDialog />
    </div>
  );
}
