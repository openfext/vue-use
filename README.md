# Vue Use

Use Vue Composition API Right Now.

**Note**: Currently only Vue.js 2.x is supported. Since [Vue.js](https://github.com/vuejs/vue-next) has released a beta version of 3.0, this library will support the latest version of Vue.js for the first time.

[![CircleCI](https://circleci.com/gh/openfext/vue-use.svg?style=svg)](https://circleci.com/gh/openfext/vue-use)
[![codecov](https://codecov.io/gh/openfext/vue-use/branch/develop/graph/badge.svg)](https://codecov.io/gh/openfext/vue-use)
![GitHub](https://img.shields.io/github/license/openfext/vue-use?style=flat-square)
![Version](https://img.shields.io/npm/v/@fext/vue-use?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/openfext/vue-use)

## Docs

- [Storybook](https://openfext.github.io/vue-use)

### 🇨🇳 Chinese

- [Guide](https://openfext.github.io/docs/zh/vue-use/intro.html)
- [API Reference](https://openfext.github.io/docs/zh/vue-use/api/form.html)

### 🇺🇸 English

WIP...

## Features

- ✨ `useResize` -- track `window.innerWidth`, `window.innerHeight`.
- ✨ `useLoading` -- run asynchronous tasks and set `loading` status.
- ✨ `useForm` -- manage model, events of complex form.
- ✨ `useFormElement` -- create custom form components that support `v-model`, work with `useForm`.
- ✨ `useTable` -- manage data, paging, sorting and filter of complex table.
- ...

More features are coming soon...

## Quick Start

### Installation

```bash
npm i @fext/vue-use
```

### Usage

Create reactive loading state for component:

```html
<template>
  <div :class="{ 'is-loading': loading }">Content</div>
</template>

<script>
  import { useLoading } from '@fext/vue-use';

  export default {
    setup() {
      const { loading, withLoading } = useLoading();

      return {
        loading,
        withLoading
      };
    },

    created() {
      this.withLoading(() => {
        return this.fetchList();
      });
    },

    methods: {
      async fetchList() {
        // remote api
      }
    }
  };
</script>
```

## Built With

- [Vue.js](https://github.com/vuejs/vue)
- [Vue Composition API](https://github.com/vuejs/composition-api)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020 - present, Felix Yang
