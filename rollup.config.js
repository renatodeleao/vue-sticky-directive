import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";

import pkg from './package.json';


export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'VueStickyDirective',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find npm modules
			commonjs(), // so Rollup can convert cjs to an ES module
			babel({
				exclude: ['node_modules/**'],
			}),
			terser()
		],
		watch: {
			include: "src/**",
			exclude: "examples/**"
		},
	},
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.module, format: 'es' }
		],
		external: ['sticky-sidebar']
	}
];
