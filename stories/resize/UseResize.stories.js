import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

import markdown from './UseResize.md';
import { useResize } from '@/src';

Vue.use(VueCompositionApi);

// =============== Start of Basic Usage =============== //

export const BasicUsage = () => ({
  template: `
    <div>
      <div>Width: {{ windowInnerWidth }}</div>
      <div>Height: {{ windowInnerHeight }}</div>
    </div>
  `,

  setup() {
    const { windowInnerWidth, windowInnerHeight } = useResize();

    return {
      windowInnerWidth,
      windowInnerHeight
    };
  }
});

BasicUsage.story = {
  name: 'Basic Usage'
};

// =============== End of Basic Usage =============== //

export default {
  title: 'UI|useResize',
  parameters: {
    notes: {
      markdown
    }
  }
};
