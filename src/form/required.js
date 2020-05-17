import isString from 'lodash/isString';
import { ref, watch } from '@vue/composition-api';

function useRequired(rules = ref({}), requiredKey = 'required') {
  const isRequired = ref(false);

  watch(
    rules,
    (rules = {}) => {
      isRequired.value = false;
      requiredKey = isString(requiredKey)
        ? requiredKey.split('|')
        : requiredKey;

      requiredKey.forEach(key => {
        if (rules[key]) {
          isRequired.value = true;
        }
      });
    },
    {
      deep: true
    }
  );

  return { isRequired };
}

export { useRequired };
