Semver Subset
===

## Why use?
You're wanting to do some semver parsing and resolution, but nothing complicated. You are probably in a browser. The fantastic [node-semver](https://github.com/isaacs/node-semver) module does to much and/or you can't use polyfills. You have a very specific use case, but this module can help you!

## Anti-Features

- No pre-release or build version parsing whatsoever.
- Ranges are limited to simple combinations of version and wildcard. E.g. `'1.x'` or `'v1'` will work, but `'^1.0.0'` will not.


## API

```
semverLite.valid(version);
```

Returns true if the version is valid semver.

```
semverLite.maxSatisfying(versions, range);
```

Returns the greatest version that satisfies the range.

## Ranges

Nothing fancy, a range should look like an abbreviated version.

Valid ranges include:

```
var validRanges = ['1.1.x', 'v1', '=1', '1.x', '1', 'x1'];
```

Something like `'1.x.3'` does not work, that would be silly.
