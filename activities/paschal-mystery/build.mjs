import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const read = file => readFileSync(join(root, file), 'utf8');

export function buildPaschalArchive() {
  const app = Array.from({length: 8}, (_, i) => read(`build-parts/app-${String(i + 1).padStart(2, '0')}.txt`)).join('');
  const expectedApp = '81fc7c5caedecc0a75be0d2bc3452d9697ca4b6448a5bd6bf7797271f2f5eaf4';
  if (createHash('sha256').update(app).digest('hex') !== expectedApp) {
    throw new Error('The Paschal Mystery application does not match its tested source checksum.');
  }
  const css = read('styles.css');
  const js = read('data.js') + '\n' + app;
  const html = `<!doctype html>
<html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0d191d"><meta name="description" content="The Broken Chain: a Grade 12 Paschal Mystery escape room. Investigate four missing-event scenarios, recover evidence, and defend the connections."><title>The Broken Chain | Paschal Mystery Escape Room</title><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230d191d'/%3E%3Cpath d='M28 12h8v12h12v8H36v22h-8V32H16v-8h12z' fill='%23e4bd77'/%3E%3C/svg%3E"><style>` + css + `</style></head><body><a href="#main" class="skip">Skip to content</a><div id="app"></div><noscript><main style="max-width:700px;margin:50px auto;padding:25px"><h1>The Broken Chain</h1><p>This interactive classroom game needs JavaScript enabled. Ask your teacher for the paper version of “If One Piece Is Missing.”</p></main></noscript><dialog id="dialog" class="modal" aria-labelledby="dialogTitle"></dialog><div id="toast" class="toast" role="status" hidden></div><div id="announcer" class="sr-announcement" aria-live="polite"></div><div id="printReport"></div><script>` + js.replaceAll('</script', '<\\/script') + `</script></body></html>`;
  const expectedHtml = '1f9a30857c044c84240541db0e5f11cf336c4b8f8fd5157fd5513d1dcdf2711d';
  if (createHash('sha256').update(html).digest('hex') !== expectedHtml) {
    throw new Error('The Paschal Mystery HTML differs from the browser-tested release.');
  }
  return html;
}
