import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import markdown from './UseForm.md';
import { useForm } from '@/src';

import ExampleName from './components/ExampleName';
import ExampleActor from './components/ExampleActor';

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

// =============== Start of Basic Usage =============== //

export const BasicUsage = () => ({
  template: `
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form label-width="80px">
            <el-card header="基础信息" :style="{marginBottom:'15px'}">
              <example-name v-model="formValues.name">
              </example-name>
            </el-card>
            <el-card header="高级信息" :style="{marginBottom:'15px'}">
              <example-actor v-model="formValues.actor">
              </example-actor>
            </el-card>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-card header="数据模型" :style="{minHeight:'480px'}">
            <pre>{{ values }}</pre>
          </el-card>
        </el-col>
      </el-row>
    </div>
  `,

  components: {
    ExampleName,
    ExampleActor
  },

  computed: {
    values() {
      return JSON.stringify(this.formValues, null, 2);
    }
  },

  setup() {
    const { formValues, updateFormValues } = useForm();

    return {
      // from form composition
      formValues,
      updateFormValues
    };
  },

  created() {
    this.updateFormValues(this.getInitialValues());
  },

  methods: {
    getInitialValues() {
      return {
        name: '',
        actor: []
      };
    }
  }
});

BasicUsage.story = {
  name: 'Basic Usage'
};

// =============== End of Basic Usage =============== //

export default {
  title: 'UI|useForm',
  parameters: {
    notes: {
      markdown
    }
  }
};
