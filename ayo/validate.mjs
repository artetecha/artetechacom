// Dependency-free build check. Only public/ is served by Upsun.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), 'public');
const expected = [
  'index.html', 'style.css', 'favicon.png', 'robots.txt',
  ...['it', 'en'].flatMap(lang => ['inbox', 'compose'].map(name => `images/${name}-${lang}.png`)),
  ...['it', 'en'].flatMap(lang => [
    `${lang}/index.html`, `${lang}/privacy/index.html`, `${lang}/support/index.html`,
  ]),
].sort();
function files(directory, prefix = '') {
  return readdirSync(directory).flatMap(name => {
    const relative = join(prefix, name);
    const path = join(directory, name);
    return statSync(path).isDirectory() ? files(path, relative) : [relative];
  });
}
// An allowlist keeps source files, credentials and accidental runtime data out of the document root.
assert.deepEqual(files(root).sort(), expected, 'Unexpected or missing public files');
for (const path of expected.filter(path => path.endsWith('.html'))) {
  const html = readFileSync(join(root, path), 'utf8');
  const lang = path.startsWith('en/') ? 'en' : 'it';
  assert(html.includes(`<html lang="${lang}">`), `Wrong language: ${path}`);
  assert(html.includes('ayo@artetecha.com'), `Missing contact: ${path}`);
  assert(html.includes('https://ayo.artetecha.com/'), `Missing canonical origin: ${path}`);
  assert(!/<script\b|<form\b|<iframe\b/i.test(html), `Unexpected active content: ${path}`);
  for (const [, link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!link.startsWith('/')) continue;
    const relative = link.split(/[?#]/, 1)[0].slice(1);
    const target = resolve(root, relative);
    assert(target.startsWith(root + '/'), `Escaping link: ${path}: ${link}`);
    assert(statSync(target).isDirectory() ? statSync(join(target, 'index.html')).isFile() : statSync(target).isFile(), `Broken link: ${path}: ${link}`);
  }
}
console.log(`Ayo: ${expected.length} public files verified; Italian/English pages and local links are valid.`);
