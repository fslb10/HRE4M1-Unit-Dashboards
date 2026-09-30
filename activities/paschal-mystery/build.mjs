import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Script } from "node:vm";

const root = dirname(fileURLToPath(import.meta.url));
const read = name => readFileSync(join(root,name),"utf8");

export function buildPaschalArchive(){
  const css = read("simple-styles.css");
  const js = [
    "simple-data.js",
    "simple-passion.js",
    "simple-death.js",
    "simple-resurrection.js",
    "simple-ascension.js",
    "simple-app-core.js",
    "simple-app-actions.js"
  ].map(read).join("\n");
  new Script(js,{filename:"paschal-mystery-simple.js"});
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0b171b">
<meta name="description" content="The Broken Chain: a simplified Grade 12 Paschal Mystery challenge.">
<title>The Broken Chain | Paschal Mystery Challenge</title>
<style>${css}</style>
</head>
<body>
<div id="app"></div>
<dialog id="dialog" class="modal"></dialog>
<div id="toast" class="toast" role="status" hidden></div>
<noscript><main class="wrap"><h1>The Broken Chain</h1><p>This activity requires JavaScript.</p></main></noscript>
<script>${js.replaceAll("</script","<\\/script")}</script>
</body>
</html>`;
}
