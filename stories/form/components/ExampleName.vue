<template>
  <el-form-item label="标题" size="medium" :required="isRequired">
    <el-input
      clearable
      :value="localValue"
      @input="updateLocalValue"
      type="text"
      placeholder="标题"
    ></el-input>
  </el-form-item>
</template>

<style lang="scss" scoped>
::v-deep .el-input {
  width: 480px;
}
</style>

<script>
import { useFormElement } from '@/src';

export default {
  name: 'example-name',

  props: {
    name: String,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    } = useFormElement(props, context);

    return {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    return {};
  }
};
</script>
