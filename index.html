/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainPane } from './components/MainPane';
import { ALL_ENTRIES } from './data';

export default function App() {
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  const activeEntry = activeEntryId 
    ? ALL_ENTRIES.find(e => e.id === activeEntryId) || null 
    : null;

  const handleSelect = (id: string) => {
    setActiveEntryId(id);
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#e0e0e0] font-sans relative overflow-hidden antialiased selection:bg-[#ff00ff]/30 selection:text-white">
      <div className="absolute inset-0 scanline opacity-20 z-0 hidden lg:block" />
      
      <Sidebar 
        entries={ALL_ENTRIES} 
        activeEntryId={activeEntryId} 
        onSelect={handleSelect} 
      />
      
      <MainPane 
         entry={activeEntry}
         onTagClick={handleSelect}
      />
      
      {/* Right Status Bar */}
      <div className="w-12 border-l border-white/10 flex flex-col items-center py-6 gap-8 bg-black/60 z-10 shrink-0 hidden md:flex">
        <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
          ÆVOLUTION SYSTEM
        </div>
        <div className="flex-1 flex flex-col justify-end gap-2">
           <div className="w-1 h-8 bg-[#00f0ff]/50"></div>
           <div className="w-1 h-12 bg-[#ff00ff]"></div>
           <div className="w-1 h-4 bg-[#00f0ff]"></div>
        </div>
      </div>
    </div>
  );
}
