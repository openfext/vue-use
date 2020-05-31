# Vue Use

Use Vue Composition API Right Now.

**Note**: Currently only Vue.js 2.x is supported. Since [Vue.js](https://github.com/vuejs/vue-next) has released a beta version of 3.0, this library will support the latest version of Vue.js for the first time.

[![CircleCI](https://circleci.com/gh/openfext/vue-use.svg?style=svg)](https://circleci.com/gh/openfext/vue-use)
[![codecov](https://codecov.io/gh/openfext/vue-use/branch/develop/graph/badge.svg)](https://codecov.io/gh/openfext/vue-use)
![GitHub](https://img.shields.io/github/license/openfext/vue-use?style=flat-square)
![Version](https://img.shields.io/npm/v/@fext/vue-use?style=flat-square)

## Docs

- [Storybook](https://openfext.github.io/vue-use)
- [Complete API Reference](http://openfext.github.io/docs/vue-use)

## Features

- `useResize` -- tracks `window` dimensions.
- `useLoading` -- loading status of asynchronous task.
- `useForm` -- manage, watch, and synchronize state of complex form.
- `useFormElement` -- create custom form components that support `v-model`.
- `useTable` -- manage, watch, and synchronize state of complex table.
- ...

More features are coming soon...

## Quick Start

### Installation

```bash
npm i @fext/vue-use
```

### Usage

```js
import { useLoading } from '@fext/vue-use';

export default {
  name: 'example-component',

  setup() {
    const { loading, withLoading } = useLoading();

    return {
      loading,
      withLoading
    };
  }
};
```

## Built With

- [Vue.js](https://github.com/vuejs/vue)
- [Vue Composition API](https://github.com/vuejs/composition-api)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020 - present, Felix Yang
