import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useLoading } from 'src';

const TestComponent = {
  template: `<div></div>`,

  setup() {
    const { loading, setLoading, withLoading } = useLoading();

    return {
      loading,
      setLoading,
      withLoading
    };
  },

  methods: {
    triggerLoading(before, after, options) {
      before();
      return this.withLoading(() => {
        return Promise.resolve();
      }, options).then(() => {
        after();
      });
    }
  }
};

let wrapper = null;
let vm = null;
beforeEach(() => {
  wrapper = mount(TestComponent);
  vm = wrapper.vm;
});

afterEach(() => {
  wrapper.destroy();
});

beforeAll(() => {
  Vue.use(VueCompositionAPI);
});

describe('use loading', () => {
  test('set loading status', () => {
    expect(vm.loading).toBe(false);

    vm.setLoading(true);

    expect(vm.loading).toBe(true);

    vm.setLoading(false);
  });

  test('update loading automatically', async () => {
    expect.assertions(2);

    await vm.triggerLoading(
      () => {
        expect(vm.loading).toBe(false);
      },
      () => {
        expect(vm.loading).toBe(false);
      }
    );
  });

  test('update loading manually', async () => {
    expect.assertions(3);

    await vm.triggerLoading(
      () => {
        expect(vm.loading).toBe(false);
      },
      () => {
        expect(vm.loading).toBe(true);
      },
      {
        autocomplete: false
      }
    );

    vm.setLoading(false);

    expect(vm.loading).toBe(false);
  });
});
