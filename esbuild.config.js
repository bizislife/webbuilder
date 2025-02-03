import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/pure-components.js',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  sourcemap: true,
  minify: true,
  tsconfig: './tsconfig.json'
}).catch(() => process.exit(1));