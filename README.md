# Polarfox SDK

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Actions Status](https://github.com/Polarfox-DEX/polarfox-sdk/workflows/CI/badge.svg)](https://github.com/Polarfox-DEX/polarfox-sdk)
[![npm version](https://img.shields.io/npm/v/@polarfox/sdk/latest.svg)](https://www.npmjs.com/package/@polarfox/sdk/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@polarfox/sdk/latest.svg)](https://bundlephobia.com/result?p=@polarfox/sdk@latest)

In-depth documentation on this SDK is being written and will be available soon.

## Running tests

To run the tests, follow these steps. You must have at least node v10 and [yarn](https://yarnpkg.com/) installed.

First clone the repository:

```sh
git clone https://github.com/Polarfox-DEX/polarfox-sdk.git
```

Move into the polarfox-sdk working directory

```sh
cd polarfox-sdk/
```

Install dependencies

```sh
yarn install
```

Run tests

```sh
yarn test
```

You should see output like the following:

```sh
yarn run v1.22.10
$ tsdx test
 PASS  test/constants.test.ts    
 PASS  test/route.test.ts
 PASS  test/token.test.ts
 PASS  test/miscellaneous.test.ts
 PASS  test/router.test.ts
 PASS  test/entities.test.ts
 PASS  test/fraction.test.ts
 PASS  test/trade.test.ts
 PASS  test/pair.test.ts

Test Suites: 1 skipped, 9 passed, 9 of 10 total
Tests:       3 skipped, 124 passed, 127 total
Snapshots:   0 total
Time:        8.121s
Ran all test suites.
Done in 6.61s.
```
