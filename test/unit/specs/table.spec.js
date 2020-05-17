import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useTable } from 'src';

const fetchList = function(page, filter) {
  return Promise.resolve({
    page,
    filter,
    result: [
      {
        id: 1000,
        status: 1,
        name: 'A'
      },
      {
        id: 2000,
        status: 1,
        name: 'B'
      },
      {
        id: 3000,
        status: 1,
        name: 'C'
      },
      {
        id: 4000,
        status: 0,
        name: 'D'
      }
    ]
  });
};

const TestComponent = {
  template: `<div>
    <ul>
      <li v-for="item in state.list.result || []" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>`,

  setup() {
    const table = useTable({
      // uniqueKey: 'id',
      sortKeys: {
        order: 'order',
        orderBy: 'prop',
        asc: 'ascending',
        desc: 'descending'
      }
    });
    const {
      state,
      customPageSorter,

      setList,

      setPage,
      resetPage,
      setInitialPage,

      setFilter,
      resetFilter,
      setInitialFilter,

      setPageSort,
      setPageSize,
      setPageNo,

      setSelection,
      addCrossPageSelection,
      removeCrossPageSelection,
      clearCrossPageSelection,

      triggerUpdate,
      watchUpdate
    } = table;

    return {
      table,

      state,
      customPageSorter,

      setList,

      setPage,
      resetPage,
      setInitialPage,

      setFilter,
      resetFilter,
      setInitialFilter,

      setPageSort,
      setPageSize,
      setPageNo,

      setSelection,
      addCrossPageSelection,
      removeCrossPageSelection,
      clearCrossPageSelection,

      triggerUpdate,
      watchUpdate
    };
  },

  data() {
    return {};
  },

  created() {
    this.watchUpdate(() => {
      this.fetchList();
    });

    this.setInitialPage({
      pageNo: 1,
      pageSize: 5,
      orderBy: 'id',
      order: 'asc'
    });
    this.setInitialFilter({
      status: 1
    });

    this.triggerUpdate();
  },

  methods: {
    fetchList() {
      const { page, filter } = this.state;

      return fetchList(page, filter).then(data => {
        this.setList(data);
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

describe('use table', () => {
  test('initialize table', () => {
    expect(vm.state.filter).toEqual({
      status: 1
    });
    expect(vm.state.page).toEqual({
      pageNo: 1,
      pageSize: 5,
      orderBy: 'id',
      order: 'asc'
    });
    expect(vm.customPageSorter).toEqual({
      prop: 'id',
      order: 'ascending'
    });
  });

  test('set page', () => {
    expect(vm.state.page.pageNo).toBe(1);
    expect(vm.state.page.pageSize).toBe(5);

    vm.setPageNo(10);
    vm.setPageSize(80);

    expect(vm.state.page.pageNo).toBe(10);
    expect(vm.state.page.pageSize).toBe(80);

    // invalid sorter
    vm.setPageSort({
      prop: 'time'
    });
    expect(vm.state.page.order).toBe('asc');
    expect(vm.state.page.orderBy).toBe('id');

    vm.setPageSort({
      prop: 'time',
      order: 'desending'
    });

    expect(vm.state.page.order).toBe('desc');
    expect(vm.state.page.orderBy).toBe('time');
    expect(vm.customPageSorter).toEqual({
      prop: 'time',
      order: 'descending'
    });

    vm.setPageSort({
      prop: 'status',
      order: 'ascending'
    });

    expect(vm.state.page.order).toBe('asc');
    expect(vm.state.page.orderBy).toBe('status');
    expect(vm.customPageSorter).toEqual({
      prop: 'status',
      order: 'ascending'
    });

    vm.setPage(
      {
        pageNo: 2,
        pageSize: 40,
        orderBy: 'id',
        order: 'desc'
      },
      {
        merge: false
      }
    );

    expect(vm.state.page).toEqual({
      pageNo: 2,
      pageSize: 40,
      orderBy: 'id',
      order: 'desc'
    });

    vm.setPage();

    expect(vm.state.page).toEqual({
      pageNo: 2,
      pageSize: 40,
      orderBy: 'id',
      order: 'desc'
    });

    vm.resetPage();

    expect(vm.state.page).toEqual({
      pageNo: 1,
      pageSize: 5,
      orderBy: 'id',
      order: 'asc'
    });
  });

  test('set filter', () => {
    expect(vm.state.filter.status).toBe(1);

    vm.setFilter({
      id: 1000
    });

    expect(vm.state.filter.id).toBe(1000);

    vm.setFilter(
      {
        type: 1,
        status: 0
      },
      {
        merge: false
      }
    );

    expect(vm.state.filter).toEqual({
      type: 1,
      status: 0
    });

    vm.setFilter();

    expect(vm.state.filter).toEqual({
      type: 1,
      status: 0
    });

    vm.resetFilter();

    expect(vm.state.filter).toEqual({
      status: 1
    });
  });

  test('cross page selection', () => {
    expect(vm.state.selection).toEqual([]);
    expect(vm.state.crossPageSelection).toEqual([]);

    vm.setSelection([{ id: 1 }]);

    expect(vm.state.selection).toEqual([{ id: 1 }]);

    vm.addCrossPageSelection([{ id: 1 }, { id: 3 }]);
    vm.addCrossPageSelection();

    expect(vm.state.crossPageSelection).toEqual([{ id: 1 }, { id: 3 }]);

    vm.removeCrossPageSelection([{ id: 1 }]);
    vm.removeCrossPageSelection();

    expect(vm.state.crossPageSelection).toEqual([{ id: 3 }]);

    vm.setSelection();
    vm.clearCrossPageSelection();

    expect(vm.state.selection).toEqual([]);
    expect(vm.state.crossPageSelection).toEqual([]);
  });
});
