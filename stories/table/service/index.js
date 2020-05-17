import { delay } from '@/stories/util';

export async function getRemoteList(options) {
  await delay(1000);

  let result, pageNo, pageSize, order, orderBy, totalCount, currentPageSize;

  try {
    const {
      data: { page: pageJSON, filter: filterJSON }
    } = options;
    pageNo = pageJSON.pageNo;
    pageSize = pageJSON.pageSize;
    order = pageJSON.order;
    orderBy = pageJSON.orderBy;
    totalCount = 256;
    currentPageSize = pageSize;

    if (filterJSON.id) {
      currentPageSize = 1;
      totalCount = 1;
    }

    if (pageNo * pageSize > totalCount) {
      currentPageSize = totalCount % pageSize;
    }

    result = Array(currentPageSize)
      .fill(1)
      .map((item, index) => {
        const id = Number(
          filterJSON.id ? filterJSON.id : index + pageNo * 1000
        );
        return {
          id,
          title: `Example Title ${filterJSON.q || ''} ${Math.random().toFixed(
            3
          )}`,
          description: `Some awesome description ${Math.random().toFixed(3)}`
        };
      });

    if (filterJSON.id) {
      result = result.filter(item => {
        const id = Number(filterJSON.id);
        return id === item.id;
      });
    }

    if (order) {
      result.sort((a, b) => {
        return order === 'asc' ? a.id - b.id : b.id - a.id;
      });
    }
  } catch (err) {
    result = [];
  }

  return {
    pageNo: pageNo || 1,
    pageSize: pageSize || 10,
    totalCount: totalCount || 0,
    order: order || 'desc',
    orderBy: orderBy || 'createTime',
    result
  };
}
