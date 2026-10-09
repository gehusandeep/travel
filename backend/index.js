/**
 * Vercel entrypoint. Vercel runs `npm run build` first, so this loads the compiled
 * app from dist/, where tsc-alias has already rewritten the "@/" imports.
 *
 * Keep the require('express') line: Vercel's Express detection looks for it, and
 * without it Vercel falls back to src/app.ts, whose "@/" imports fail at runtime.
 * Local scripts are unchanged (npm run dev / npm start).
 */
require('express');
const { createApp } = require('./dist/app');

module.exports = createApp();
