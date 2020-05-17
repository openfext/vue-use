<template>
  <el-form size="medium" @keyup.native.enter="search">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          clearable
          size="medium"
          type="number"
          v-model="state.filter.id"
          placeholder="ID"
        />
      </el-col>
      <el-col :span="8">
        <el-input
          clearable
          size="medium"
          type="text"
          v-model="state.filter.q"
          placeholder="标题"
        />
      </el-col>
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="search">
          搜索
        </el-button>
        <el-button size="medium" @click="reset" title="RESET">
          重置
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'example-query-form',

  props: {
    table: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const {
      state,
      setPage,
      setFilter,
      resetFilter,
      setInitialFilter,
      triggerUpdate
    } = props.table;

    return {
      state,
      setPage,
      setFilter,
      resetFilter,
      setInitialFilter,
      triggerUpdate
    };
  },

  data() {
    return {};
  },

  created() {
    this.setInitialFilter(this.getInitialValues());
  },

  methods: {
    getInitialValues() {
      return {
        id: '',
        q: ''
      };
    },

    reset() {
      this.resetFilter();
      this.search();
    },

    search() {
      this.setPage({
        pageNo: 1
      });
      this.triggerUpdate();
    }
  }
};
</script>
