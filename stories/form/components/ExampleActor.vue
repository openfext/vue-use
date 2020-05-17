<template>
  <div>
    <el-form-item label="人物" size="medium">
      <el-input
        clearable
        v-model="actor.director"
        type="text"
        placeholder="请填写导演姓名"
      >
        <template slot="prepend">导演</template>
      </el-input>
    </el-form-item>
    <el-form-item size="medium">
      <el-input
        clearable
        v-model="actor.protagonist"
        type="text"
        placeholder="请填写主演姓名"
      >
        <template slot="prepend">主演</template>
      </el-input>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-input {
  width: 480px;
}
</style>

<script>
import { useFormElement } from '@/src';

const ACTOR_TYPES = {
  DIRECTOR: 1,
  PROTAGONIST: 2
};

export default {
  name: 'example-actor',

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
      watchPropValue,
      setInitialValue,
      updateLocalValue
    } = useFormElement(props, context);

    return {
      dirty,
      isRequired,
      localValue,
      watchPropValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    return {
      actor: {
        director: '',
        protagonist: ''
      }
    };
  },

  watch: {
    actor: {
      handler() {
        this.updateLocalValue(this.getActorValue());
      },
      deep: true
    }
  },

  created() {
    this.watchPropValue(value => {
      this.setActorValue(value);
    });
  },

  methods: {
    getActorValue() {
      const value = [];
      const { director, protagonist } = this.actor;

      if (director) {
        value.push({
          type: ACTOR_TYPES.DIRECTOR,
          name: director
        });
      }

      if (protagonist) {
        value.push({
          type: ACTOR_TYPES.PROTAGONIST,
          name: protagonist
        });
      }

      return value;
    },

    setActorValue(value = []) {
      value.forEach(item => {
        if (item.type === ACTOR_TYPES.DIRECTOR) {
          this.actor.director = item.name;
        }

        if (item.type === ACTOR_TYPES.PROTAGONIST) {
          this.actor.protagonist = item.name;
        }
      });
    }
  }
};
</script>
