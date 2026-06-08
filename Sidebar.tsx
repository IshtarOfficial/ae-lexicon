@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --color-cyan-glow: #00f0ff;
  --color-magenta-glow: #ff00ff;
  
  --font-sans: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

:root {
  --bg: #050505;
  --cyan: #00f0ff;
  --magenta: #ff00ff;
  --dim-cyan: rgba(0, 240, 255, 0.2);
  --dim-magenta: rgba(255, 0, 255, 0.2);
  --border-alpha: rgba(255, 255, 255, 0.1);
}

body {
  background-color: var(--bg);
  color: #e0e0e0;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.glitch-text {
  text-shadow: 2px 0 var(--magenta), -2px 0 var(--cyan);
}

.scanline {
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0) 50%,
    rgba(0,0,0,0.2) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
}

.entry-list::-webkit-scrollbar {
  width: 4px;
}
.entry-list::-webkit-scrollbar-thumb {
  background: var(--cyan);
}

.active-entry {
  background: linear-gradient(90deg, var(--dim-cyan) 0%, transparent 100%);
  border-left: 2px solid var(--cyan) !important;
}

.tag-highlight {
  transition: all 0.2s ease-in-out;
}
.tag-highlight:hover {
  background: var(--magenta);
  color: black;
  box-shadow: 0 0 12px var(--magenta);
}

/* Fallback for the MainPane component titles */
.glitch-hover {
  transition: text-shadow 0.2s ease, transform 0.1s ease;
}
.glitch-hover:hover {
  text-shadow: 2px 0px 0px rgba(0, 255, 255, 0.8), -2px -1px 0px rgba(255, 0, 255, 0.8);
}

