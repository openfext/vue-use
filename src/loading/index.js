import { ref } from '@vue/composition-api';

function useLoading() {
  const loading = ref(false);

  const setLoading = value => {
    loading.value = value;
  };

  const withLoading = (task, { autocomplete = true } = {}) => {
    return Promise.resolve()
      .then(() => {
        loading.value = true;
        return task();
      })
      .finally(() => {
        if (autocomplete) {
          loading.value = false;
        }
      });
  };

  return {
    loading,
    setLoading,
    withLoading
  };
}

export { useLoading };
