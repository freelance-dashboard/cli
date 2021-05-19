// @ts-check
import * as path from 'path'
import * as fs from 'fs'
import externals from 'rollup-plugin-node-externals'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild'

const INTERNAL_PATH = path.resolve(__dirname, './internal')
const CLI_PATH = path.resolve(__dirname, './packages/cli')

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: path.join(CLI_PATH, 'src/index.ts'),
  output: {
    file: path.join(CLI_PATH, 'dist/bin.js'),
    format: 'cjs'
  },
  plugins: [
    externals({
      packagePath: fs
        .readdirSync(INTERNAL_PATH)
        .map(folderName =>
          path.join(INTERNAL_PATH, folderName, 'package.json')
        ),
      deps: true,
      exclude: [/^@internal/]
    }),
    resolve(),
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV ?? 'production'
      ),
      preventAssignment: true
    }),
    esbuild({})
  ]
}

export default config
