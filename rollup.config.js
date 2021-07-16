import { builtinModules } from 'module';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { dependencies, peerDependencies } from './package.json';

const dev = process.env.NODE_ENV !== 'production';

export default {
  input: './src/index.js',
  external: [...builtinModules, ...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  plugins: [resolve(), babel()],
  output: [
    {
      file: './out/index.js',
      format: 'cjs',
      sourcemap: dev,
    },
    {
      file: './out/module.js',
      format: 'es',
      sourcemap: dev,
    },
  ],
};
