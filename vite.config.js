import { defineConfig } from 'vite';
import { buildPaschalArchive } from './activities/paschal-mystery/build.mjs';

// Preserve Vite's existing defaults and dashboard entry. This build-only plugin
// emits a separate, self-contained classroom app; it does not change the dashboard.
export default defineConfig({
  plugins: [{
    name: 'paschal-mystery-standalone-page',
    apply: 'build',
    generateBundle() {
      const source = buildPaschalArchive();
      this.emitFile({ type: 'asset', fileName: 'paschal-mystery.html', source });
      this.emitFile({ type: 'asset', fileName: 'paschal-mystery/index.html', source });
    },
  }],
});
