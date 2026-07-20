// Tiny fallback handler for unknown paths.
//
// On this static site nginx serves every real file directly; only genuine
// misses are forwarded here (web.locations "/" has passthru: true). Static
// hosting can't set a status code on a served file, so a pure-static
// `passthru: /404.html` returns the 404 page with a 200 (a soft 404 that
// search engines index and the edge caches). This process exists solely to
// return that same page with a real 404 status, and `no-store` so a
// not-found response can never be cached and mask a later-published URL.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist');

let body = '<!doctype html><meta charset="utf-8"><title>Page not found</title><h1>404 — Page not found</h1>';
try {
  body = readFileSync(join(dist, '404.html'), 'utf8');
} catch {
  // Fall back to the inline body above if the build output isn't present.
}

const server = createServer((_req, res) => {
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
});

// Upsun sets a unix socket path in $SOCKET or a TCP port in $PORT.
const socket = process.env.SOCKET;
if (socket) {
  server.listen(socket);
} else {
  server.listen(Number(process.env.PORT) || 8888);
}
