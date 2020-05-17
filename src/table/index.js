import { ref, reactive, computed, watch } from '@vue/composition-api';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';

function convertPageSort(sort, { toCustomTable = true, sortKeys }) {
  if (toCustomTable) {
    return {
      [sortKeys.orderBy]: sort.orderBy,
      [sortKeys.order]: sort.order === 'asc' ? sortKeys.asc : sortKeys.desc
    };
  } else {
    return {
      orderBy: sort[sortKeys.orderBy],
      order: sort[sortKeys.order] === sortKeys.asc ? 'asc' : 'desc'
    };
  }
}

function useTable(options = {}) {
  const {
    uniqueKey = 'id',
    sortKeys = {
      order: 'order',
      orderBy: 'orderBy',
      asc: 'asc',
      desc: 'desc'
    }
  } = options;
  const updatingCount = ref(0);
  const state = reactive({
    initialPage: {},

    initialFilter: {},

    page: {},

    filter: {},

    list: {},

    selection: [],

    crossPageSelection: []
  });
  const customPageSorter = computed(() => {
    return convertPageSort(state.page, {
      sortKeys
    });
  });

  const increaseUpdatingCount = function() {
    updatingCount.value++;
  };

  const setPage = function(page = {}, { merge = true } = {}) {
    if (merge) {
      state.page = Object.assign({}, state.page, page);
    } else {
      state.page = page;
    }
  };

  const resetPage = function() {
    state.page = cloneDeep(state.initialPage);
  };

  const setInitialPage = function(page = {}) {
    state.initialPage = cloneDeep(page);
    state.page = cloneDeep(page);
  };

  const setFilter = function(filter = {}, { merge = true } = {}) {
    if (merge) {
      state.filter = Object.assign({}, state.filter, filter);
    } else {
      state.filter = filter;
    }
  };

  const resetFilter = function() {
    state.filter = cloneDeep(state.initialFilter);
  };

  const setInitialFilter = function(filter = {}) {
    state.initialFilter = cloneDeep(filter);
    state.filter = cloneDeep(filter);
  };

  const setList = function(list = {}) {
    state.list = list;
  };

  const setPageSort = function(sort) {
    if (sort[sortKeys.orderBy] && sort[sortKeys.order]) {
      sort = convertPageSort(sort, {
        sortKeys,
        toCustomTable: false
      });
      setPage(sort);
    } else {
      setPage({
        order: state.initialPage.order,
        orderBy: state.initialPage.orderBy
      });
    }

    increaseUpdatingCount();
  };

  const setPageSize = function(pageSize) {
    if (state.page.pageSize !== pageSize) {
      setPage({
        pageSize
      });

      increaseUpdatingCount();
    }
  };

  const setPageNo = function(pageNo) {
    if (pageNo !== state.page.pageNo) {
      setPage({
        pageNo
      });

      increaseUpdatingCount();
    }
  };

  const setSelection = function(items = []) {
    state.selection = items;
  };

  const addCrossPageSelection = function(items = []) {
    const previousCount = state.crossPageSelection.length;
    const arr = state.crossPageSelection.concat(items);

    state.crossPageSelection = uniqBy(arr, uniqueKey);

    return state.crossPageSelection.length - previousCount;
  };

  const removeCrossPageSelection = function(items = []) {
    const previousCount = state.crossPageSelection.length;
    const leftSelection = [];

    state.crossPageSelection.forEach(sel => {
      const shouldRemove = !!items.find(
        item => item[uniqueKey] === sel[uniqueKey]
      );

      if (!shouldRemove) {
        leftSelection.push(sel);
      }
    });

    state.crossPageSelection = leftSelection;

    return previousCount - state.crossPageSelection.length;
  };

  const clearCrossPageSelection = function() {
    const previousCount = state.crossPageSelection.length;

    state.crossPageSelection = [];

    return previousCount;
  };

  const triggerUpdate = function() {
    increaseUpdatingCount();
  };

  const watchUpdate = function(task) {
    watch(updatingCount, () => {
      task();
    });
  };

  return {
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
}

export { useTable };
