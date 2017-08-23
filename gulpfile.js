var gulp = require('gulp');

const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

gulp.task('cjs', async function () {
  const bundle = await rollup.rollup({
    entry: './src/index.js',
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      commonjs()
    ]
  });

  await bundle.write({
    format: 'cjs',
    dest: './dist/index.cjs.js', // equivalent to --output
  });
});

gulp.task('default', ['build']);
