<template>
  <div>
    <el-table
      v-loading="loading"
      :data="state.list.result"
      :default-sort="customPageSorter"
      @sort-change="setPageSort"
      @selection-change="setSelection"
      style="width: 100%;"
      :border="true"
      stripe
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        sortable="custom"
        show-overflow-tooltip
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        show-overflow-tooltip
        width="360"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip
        min-width="360"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { useLoading } from '@/src';
import { getRemoteList } from '../service';

export default {
  name: 'example-table',

  props: {
    table: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const {
      state,
      customPageSorter,
      setPageSort,
      setList,
      setSelection,
      watchUpdate
    } = props.table;
    const { loading, withLoading } = useLoading();

    return {
      // from loading composition
      loading,
      withLoading,

      // from table composition
      state,
      customPageSorter,
      setPageSort,
      setList,
      setSelection,
      watchUpdate
    };
  },

  computed: {
    query() {
      const { page, filter } = this.state;
      return {
        page,
        filter
      };
    }
  },

  data() {
    return {
      currentRow: null
    };
  },

  created() {
    this.watchUpdate(() => {
      this.fetchList();
    });
  },

  methods: {
    async fetchList() {
      this.withLoading(() => {
        return getRemoteList({
          data: this.query
        }).then(list => {
          this.setList(list);
        });
      });
    }
  }
};
</script>
