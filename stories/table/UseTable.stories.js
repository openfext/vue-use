import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import markdown from './UseTable.md';
import { useTable } from '@/src';

import ExampleQueryForm from './components/ExampleQueryForm';
import ExampleQueryPage from './components/ExampleQueryPage';
import ExampleTable from './components/ExampleTable';

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

// =============== Start of Basic Usage =============== //

export const BasicUsage = () => ({
  template: `
    <div>
      <el-card>
        <example-query-form :table="table"></example-query-form>
      </el-card>

      <el-card :style="{marginTop: '20px'}">
        <example-query-page :table="table"></example-query-page>
        <example-table :table="table"></example-table>
      </el-card>
    </div>
  `,

  components: {
    ExampleQueryForm,
    ExampleQueryPage,
    ExampleTable
  },

  setup() {
    const table = useTable({
      uniqueKey: 'id',
      sortKeys: {
        order: 'order',
        orderBy: 'prop',
        asc: 'ascending',
        desc: 'descending'
      }
    });
    const { setInitialPage } = table;

    return {
      table,

      setInitialPage
    };
  },

  data() {
    return {};
  },

  created() {
    this.setInitialPage({
      pageNo: 1,
      pageSize: 5,
      orderBy: 'id',
      order: 'asc'
    });
  }
});

BasicUsage.story = {
  name: 'Basic Usage'
};

// =============== End of Basic Usage =============== //

export default {
  title: 'UI|useTable',
  parameters: {
    notes: {
      markdown
    }
  }
};
