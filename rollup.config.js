const buble = require('rollup-plugin-buble')

export default {
  input: 'index.js',
  output: {
    file: 'dist/deepick.js',
    format: 'umd',
    name: 'deepick'
  },
  plugins: [
    buble()
  ]
}