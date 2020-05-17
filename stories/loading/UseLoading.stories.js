import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import markdown from './UseLoading.md';
import { delay } from '@/stories/util';
import { useLoading } from '@/src';

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

// =============== Start of Basic Usage =============== //

export const BasicUsage = () => ({
  template: `
    <div>
      <el-card v-loading="loading">Click the button below to view the loading animation.</el-card>
      <el-row :style="{marginTop: '10px'}">
        <el-button @click="load(500)" type="primary" plain size="small">500ms</el-button>
        <el-button @click="load(1000)" type="primary" plain size="small">1s</el-button>
        <el-button @click="load(2000)" type="primary" plain size="small">2s</el-button>
        <el-button @click="load(5000)" type="primary" plain size="small">5s</el-button>
      </el-row>
    </div>
  `,

  setup() {
    const { loading, setLoading, withLoading } = useLoading();

    return {
      loading,
      setLoading,
      withLoading
    };
  },

  methods: {
    load(timeout = 1000) {
      return this.withLoading(() => {
        return delay(timeout);
      });
    }
  }
});

BasicUsage.story = {
  name: 'Basic Usage'
};

// =============== End of Basic Usage =============== //

export default {
  title: 'UI|useLoading',
  parameters: {
    notes: {
      markdown
    }
  }
};
