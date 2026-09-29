from pathlib import Path
import hashlib

root = Path(__file__).parent
parts = sorted((root / 'build-parts').glob('app-*.txt'))
if len(parts) != 8:
    raise SystemExit('Expected all eight preserved application source parts.')
app = b''.join(p.read_bytes() for p in parts)
expected = '81fc7c5caedecc0a75be0d2bc3452d9697ca4b6448a5bd6bf7797271f2f5eaf4'
actual = hashlib.sha256(app).hexdigest()
if actual != expected:
    raise SystemExit(f'Application source checksum mismatch: {actual}')
(root / 'app.js').write_bytes(app)
css = (root / 'styles.css').read_text(encoding='utf-8')
js = (root / 'data.js').read_text(encoding='utf-8') + '\n' + app.decode('utf-8')
html = '''<!doctype html>
<html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0d191d"><meta name="description" content="The Broken Chain: a Grade 12 Paschal Mystery escape room. Investigate four missing-event scenarios, recover evidence, and defend the connections."><title>The Broken Chain | Paschal Mystery Escape Room</title><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230d191d'/%3E%3Cpath d='M28 12h8v12h12v8H36v22h-8V32H16v-8h12z' fill='%23e4bd77'/%3E%3C/svg%3E"><style>''' + css + '''</style></head><body><a href="#main" class="skip">Skip to content</a><div id="app"></div><noscript><main style="max-width:700px;margin:50px auto;padding:25px"><h1>The Broken Chain</h1><p>This interactive classroom game needs JavaScript enabled. Ask your teacher for the paper version of “If One Piece Is Missing.”</p></main></noscript><dialog id="dialog" class="modal" aria-labelledby="dialogTitle"></dialog><div id="toast" class="toast" role="status" hidden></div><div id="announcer" class="sr-announcement" aria-live="polite"></div><div id="printReport"></div><script>''' + js.replace('</script', '<\\/script') + '''</script></body></html>'''
(root / 'index.html').write_text(html, encoding='utf-8')
print(f'Built {len(html.encode("utf-8"))} bytes; SHA256 {hashlib.sha256(html.encode("utf-8")).hexdigest()}')
