import React from 'react';
import { LexiconEntry } from '../types';
import { Hash } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  entries: LexiconEntry[];
  activeEntryId: string | null;
  onSelect: (id: string) => void;
}

export function Sidebar({ entries, activeEntryId, onSelect }: SidebarProps) {
  return (
    <aside className="w-80 h-full border-r border-white/10 bg-black/40 flex flex-col flex-shrink-0 z-10">
      <div className="p-6 border-b border-white/10 bg-black/60">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-[#00f0ff] animate-pulse"></div>
          <span className="text-[10px] tracking-[0.2em] font-bold text-[#00f0ff] uppercase">Æ-Lexicon v1.5</span>
        </div>
        <h1 className="text-2xl font-black italic tracking-tighter text-white">INDEX.SYS</h1>
      </div>

      <nav className="flex-1 overflow-y-auto entry-list p-2">
        <div className="space-y-1">
          {entries.map((entry) => {
            const isActive = activeEntryId === entry.id;
            return (
              <div
                key={entry.id}
                onClick={() => onSelect(entry.id)}
                className={`p-3 text-xs cursor-pointer flex justify-between items-center group transition-colors border-l-2 border-transparent ${
                  isActive 
                    ? 'active-entry text-white' 
                    : 'text-[#888] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>
                  <span className={`opacity-50 mr-2 font-mono ${isActive ? 'text-[#00f0ff] opacity-100' : ''}`}>{entry.id}</span> 
                  {entry.title}
                </span>
                {!isActive && <span className="text-[8px] text-[#00f0ff] opacity-0 group-hover:opacity-100 uppercase tracking-widest pl-2">Select</span>}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10 text-[9px] uppercase tracking-widest text-[#ff00ff]">
        System Status: Synthesis Stable
      </div>
    </aside>
  );
}
