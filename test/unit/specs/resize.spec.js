import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useResize } from 'src';

const resizeWindow = function(width, height) {
  global.innerWidth = width;
  global.innerHeight = height;

  global.dispatchEvent(new Event('resize'));
};

const TestComponent = {
  template: `<div>
    <div>Width: {{ windowInnerWidth }}</div>
    <div>Height: {{ windowInnerHeight }}</div>
  </div>`,

  setup() {
    const { windowInnerWidth, windowInnerHeight } = useResize();

    return {
      windowInnerWidth,
      windowInnerHeight
    };
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

describe('use resize', () => {
  test('window resize', () => {
    resizeWindow(100, 200);

    expect(vm.windowInnerWidth).toBe(100);
    expect(vm.windowInnerHeight).toBe(200);

    resizeWindow(1920, 1080);

    expect(vm.windowInnerWidth).toBe(1920);
    expect(vm.windowInnerHeight).toBe(1080);
  });
});
