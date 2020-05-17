import { reactive, toRefs } from '@vue/composition-api';
import cloneDeep from 'lodash/cloneDeep';

function useForm() {
  const state = reactive({
    initialFormValues: {},
    formValues: {}
  });

  const setInitialFormValues = function(formValues) {
    state.initialFormValues = cloneDeep(formValues);
    state.formValues = cloneDeep(formValues);
  };

  const updateFormValues = function(formValues) {
    state.formValues = formValues;
  };

  const resetFormValues = function() {
    state.formValues = cloneDeep(state.initialFormValues);
  };

  return {
    ...toRefs(state),

    setInitialFormValues,
    updateFormValues,
    resetFormValues
  };
}

export { useForm };
