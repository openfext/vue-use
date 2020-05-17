import { ref, watch } from '@vue/composition-api';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { useRequired } from './required';

function useFormElement(props, context, options = {}) {
  const { requiredKey = 'required' } = options;
  const rules = ref({});
  const dirty = ref(false);
  const localValue = ref(null);
  const initialValue = ref(null);
  const { isRequired } = useRequired(rules, requiredKey);

  const setInitialValue = function(value) {
    initialValue.value = cloneDeep(value);
    localValue.value = cloneDeep(value);

    context.emit('input', localValue.value);
  };

  const resetLocalValue = function() {
    localValue.value = cloneDeep(initialValue.value);

    context.emit('input', localValue.value);
  };

  const updateLocalValue = function(value) {
    if (!isEqual(value, localValue.value)) {
      dirty.value = true;
      localValue.value = cloneDeep(value);

      context.emit('input', localValue.value);
    }
  };

  const watchPropValue = function(callback) {
    watch(
      () => props.value,
      value => {
        if (isEqual(value, localValue.value)) {
          return;
        }

        callback(value);
      },
      {
        deep: true
      }
    );
  };

  watchPropValue(value => {
    if (!dirty.value) {
      initialValue.value = cloneDeep(value);
    }

    localValue.value = cloneDeep(value);
  });

  watch(
    () => props.rules,
    value => {
      rules.value = value;
    }
  );

  return {
    dirty,
    isRequired,
    localValue,
    watchPropValue,
    setInitialValue,
    resetLocalValue,
    updateLocalValue
  };
}

export { useFormElement };
