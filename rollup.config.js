import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
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
			babel(),
			terser()
		],
		watch: {
			include: "src/**",
			exclude: "examples/**"
		},
	},
	{
		input: 'src/index.js',
		output: [
			{
				file: pkg.module,
				format: 'es',
				plugins: [
					resolve(),
					commonjs(),
					terser()
				],
			}
		],
		external: ['sticky-sidebar']
	}
];
