# rollup-plugin-brfs [![Build Status](https://travis-ci.org/azu/rollup-plugin-brfs.svg?branch=master)](https://travis-ci.org/azu/rollup-plugin-brfs)


Rollup plugin that inliing `fs.readFile` contents.

This plugin use [browserify/brfs](https://github.com/browserify/brfs).
It supports that

- `fs.readFileSync(pathExpr, enc=null)`
- `fs.readFile(pathExpr, enc=null, cb)`
- `fs.readdirSync(pathExpr)`
- `fs.readdir(pathExpr, cb)`

## Known Problems

[browserify/brfs](https://github.com/browserify/brfs) does not support ES module.


```js
import fs from "fs";
const text = fs.readFileSync(__dirname + "/readme.md", "utf-8");
console.log(text);
```

It does not inlined.

If you used babel, [babel-plugin-static-fs](https://github.com/Jam3/babel-plugin-static-fs) will resolve it.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install rollup-plugin-brfs

## Usage

```js
// rollup.config.js
import brfs from 'rollup-plugin-brfs';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },

  plugins: [
    brfs()
  ]
};
```

## Options

```ts
export type rollupBrfsOptions = {
    // Default:  [".js", ".jsx", ".ts", ".tsx"]
    extensions?: string[]
    // https://github.com/browserify/brfs#var-tr--brfsfile-opts
    brfsOptions?: {}
}
```

## Changelog

See [Releases page](https://github.com/azu/rollup-plugin-brfs/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/rollup-plugin-brfs/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
