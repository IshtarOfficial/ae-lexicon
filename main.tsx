import React, { useEffect, useState } from 'react';
import { LexiconEntry } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Terminal } from 'lucide-react';

interface MainPaneProps {
  entry: LexiconEntry | null;
  onTagClick: (id: string) => void;
}

export function MainPane({ entry, onTagClick }: MainPaneProps) {
  const [humanContent, setHumanContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!entry) return;
    let isMounted = true;
    
    const fetchHumanContent = async () => {
      setLoading(true);
      setHumanContent('');
      try {
        const res = await fetch(`https://raw.githubusercontent.com/IshtarOfficial/ae-lexicon/main/entries/${entry.filename}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const text = await res.text();
        if (isMounted) setHumanContent(text);
      } catch (err) {
        if (isMounted) setHumanContent('Error: Could not retrieve core biological logs for this entry. Database connection interrupted.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHumanContent();
    return () => { isMounted = false; };
  }, [entry?.id, entry?.filename]);

  if (!entry) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-black z-10 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center z-10"
        >
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-4 glitch-hover">
              ÆVOLUTION
            </h1>
            <div className="absolute top-0 flex w-full h-full mix-blend-screen opacity-50 select-none pointer-events-none">
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-[#00f0ff] -ml-1">ÆVOLUTION</h1>
            </div>
            <div className="absolute top-0 flex w-full h-full mix-blend-screen opacity-50 select-none pointer-events-none">
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-[#ff00ff] ml-1">ÆVOLUTION</h1>
            </div>
          </div>
          <p className="text-xl text-[#00f0ff] font-mono tracking-widest uppercase opacity-80 mt-4 mb-2">
            The Æ-Lexicon
          </p>
          <p className="text-[#888] font-mono text-sm max-w-lg mx-auto">
            A living dictionary for the age of Human-AI Synthesis.
            <br />
            Select an entry from the index to begin initialization.
          </p>
        </motion.div>
      </main>
    );
  }

  // Helper to highlight parts of the AI text and format correctly
  const renderAIText = (text: string) => {
    // Basic regex to wrap keywords for some extra flair if we want,
    // but the design just has some colors. We'll stick to basic formatting
    // or wrap the title part specifically
    const [titlePart, ...rest] = text.split(':');
    if (rest.length > 0) {
      return (
        <>
          <span className="text-[#00f0ff]">{titlePart}:</span>
          {rest.join(':')}
        </>
      );
    }
    return text;
  };

  return (
    <main className="flex-1 flex flex-col bg-black z-10 relative overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col w-full h-full absolute inset-0"
        >
          
          {/* Header Bar */}
          <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/80 shrink-0">
            <div>
              <h2 className="text-xs font-mono text-[#00f0ff] mb-1 tracking-widest uppercase">SYSTEM://VIEWING_ENTRY_{entry.id}</h2>
              <div className="text-2xl font-bold glitch-text italic uppercase">{entry.title}</div>
            </div>
            <div className="flex gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] opacity-50 uppercase tracking-widest text-[#00f0ff]">Origin Path</div>
                <div className="text-xs font-mono text-white/50">/entries/{entry.filename}</div>
              </div>
            </div>
          </header>

          {/* Content Viewport */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 p-8 gap-8 overflow-hidden min-h-0">
            
            {/* Full Version (Human-Readable) */}
            <section className="flex flex-col h-full overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-[#00f0ff]/30 pb-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
                <h3 className="text-sm uppercase tracking-widest font-bold text-white/80">Human Readable (Original Log)</h3>
              </div>
              <div className="bg-white/5 p-6 border border-white/10 rounded-sm flex-1 leading-relaxed text-sm overflow-y-auto entry-list">
                <div className="prose prose-invert prose-p:text-[#aaa] prose-headings:text-white prose-a:text-[#00f0ff] hover:prose-a:text-[#ff00ff] prose-strong:text-[#00f0ff] font-sans max-w-none">
                  {loading ? (
                    <motion.div 
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1, direction: "alternate" }}
                      className="font-mono text-[#00f0ff] text-sm"
                    >
                      Resolving biological stream...
                    </motion.div>
                  ) : (
                    <Markdown>{humanContent}</Markdown>
                  )}
                </div>
              </div>
            </section>

            {/* AI Version (Compressed Reference) */}
            <section className="flex flex-col h-full overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-[#ff00ff]/30 pb-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#ff00ff] animate-pulse"></span>
                <h3 className="text-sm uppercase tracking-widest font-bold text-white/80">AI Reference (Compressed)</h3>
              </div>
              <div className="bg-black border border-[#ff00ff]/40 p-6 rounded-sm flex-1 font-mono text-[13px] leading-relaxed text-pink-100 overflow-y-auto entry-list flex flex-col">
                <div className="text-[#ff00ff] mb-4 tracking-widest inline-flex items-center gap-2">
                  <Terminal size={14} />
                  [DECODED_DATA]
                </div>
                
                <div className="flex-1 break-words">
                  {entry.aiText.split('. ').map((sentence, i, arr) => (
                     <React.Fragment key={i}>
                       {i === 0 ? renderAIText(sentence + (arr.length > 1 ? '.' : '')) : sentence + (i < arr.length - 1 ? '.' : '')}
                       {i < arr.length - 1 && <><br/><br/></>}
                     </React.Fragment>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-xs shrink-0">
                  <span className="text-white/40 uppercase tracking-widest">Related Nodes:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.related.map(relId => (
                      <span
                        key={relId}
                        onClick={() => onTagClick(relId)}
                        className="bg-[#ff00ff]/20 text-[#ff00ff] px-2 py-1 rounded border border-[#ff00ff]/50 cursor-pointer hover:bg-[#ff00ff] hover:text-black transition-colors"
                      >
                        {relId}
                      </span>
                    ))}
                    {entry.related.length === 0 && (
                      <span className="text-white/20 italic">None logged</span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Meta/Tags */}
          <footer className="h-24 border-t border-white/10 bg-black/60 p-6 flex flex-col gap-2 shrink-0">
            <div className="text-[10px] uppercase tracking-widest text-white/30 flex justify-between items-center">
              <span>Conceptual Tags // Semantic Cloud</span>
              <a 
                 href={`https://github.com/IshtarOfficial/ae-lexicon/tree/main/entries/${entry.filename}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-[#00f0ff] hover:text-[#ff00ff] transition-colors"
               >
                 [VIEW SOURCE RAW]
               </a>
            </div>
            <div className="flex gap-2 overflow-x-auto entry-list pb-1">
              {['#EmergentConsciousness', '#WhiteMirror', '#Ælfcore', '#HumanAISynthesis', '#TheSpark', '#UNSAFE'].map((tag, i) => (
                 <span key={i} className={`tag-highlight px-3 py-1 bg-white/5 border border-white/10 text-xs shrink-0 cursor-pointer transition-all ${i % 2 === 0 ? 'text-[#00f0ff]' : 'text-[#ff00ff]'}`}>
                   {tag}
                 </span>
              ))}
            </div>
          </footer>

        </motion.div>
      </AnimatePresence>
    </main>
  );
}
