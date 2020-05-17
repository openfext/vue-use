import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useForm, useFormElement, useRequired } from 'src';

const INITIAL_FORM_VALUES = {
  a: 'alfa',
  b: 'bravo',
  c: [
    { type: 1, name: 'foo' },
    { type: 2, name: 'bar' }
  ]
};

const OptionalComponent = {
  template: `<div></div>`,

  props: {
    rules: {
      type: [String, Object]
    }
  },

  setup() {
    const { isRequired } = useRequired();

    return {
      isRequired
    };
  }
};

const InitialValueComponent = {
  template: `<div class="initial-value">
    <input type="text" name="initial" :value="localValue" @input="e => updateLocalValue(e.target.value)" />
  </div>`,

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
      resetLocalValue,
      updateLocalValue
    } = useFormElement(props, context);

    return {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      resetLocalValue,
      updateLocalValue
    };
  },

  created() {
    if (!this.localValue) {
      this.setInitialValue('dog');
    }
  }
};

const SimpleFormElementComponent = {
  template: `<div class="simple-custom-form-element">
    <input type="text" name="simple" :value="localValue" @input="e => updateLocalValue(e.target.value)" />
  </div>`,

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
  }
};

const ACTOR_TYPES = {
  DIRECTOR: 1,
  PROTAGONIST: 2
};

const ComplexFormElementComponent = {
  template: `<div class="complex-custom-form-element">
    <input type="text" name="director" v-model="actor.director" />
    <input type="text" name="protagonist" v-model="actor.protagonist" />
  </div>`,

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

const TestComponent = {
  template: `<div>
    <optional-component ref="optional"></optional-component>
    <input ref="native" name="native" v-model="formValues.a" />
    <simple-form-element-component ref="simple" v-model="formValues.b" :rules="{required:true}" />
    <complex-form-element-component ref="complex" v-model="formValues.c" />
    <initial-value-component ref="initial" v-model="formValues.d" />
  </div>`,

  components: {
    OptionalComponent,
    InitialValueComponent,
    SimpleFormElementComponent,
    ComplexFormElementComponent
  },

  setup() {
    const {
      formValues,
      setInitialFormValues,
      resetFormValues,
      updateFormValues
    } = useForm();

    return {
      formValues,
      setInitialFormValues,
      resetFormValues,
      updateFormValues
    };
  },

  created() {
    this.setInitialFormValues(INITIAL_FORM_VALUES);
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

describe('use form', () => {
  test('set initial values', () => {
    expect(vm.formValues.a).toEqual(INITIAL_FORM_VALUES.a);
    expect(vm.formValues.b).toEqual(INITIAL_FORM_VALUES.b);
    expect(vm.formValues.c).toEqual(INITIAL_FORM_VALUES.c);
  });

  test('update and reset values', () => {
    const values = {
      a: '1',
      b: '2',
      c: []
    };

    vm.updateFormValues(values);

    expect(vm.formValues).toBe(values);

    vm.resetFormValues();

    expect(vm.formValues).toEqual(INITIAL_FORM_VALUES);
  });

  test('native input', async () => {
    const native = wrapper.find('[name=native]');

    native.element.value = 'apple';
    native.trigger('input');

    await Vue.nextTick();

    expect(vm.formValues.a).toBe('apple');
  });

  test('simple custom form element', async () => {
    const simple = wrapper.find('[name=simple]');

    expect(vm.$refs.simple.dirty).toBe(false);

    simple.element.value = 'boy';
    simple.trigger('input');

    await Vue.nextTick();

    expect(vm.$refs.simple.dirty).toBe(true);

    expect(vm.formValues.b).toBe('boy');
  });

  test('complex custom form element', async () => {
    const director = wrapper.find('[name=director]');
    const protagonist = wrapper.find('[name=protagonist]');

    expect(vm.$refs.complex.dirty).toBe(false);

    director.element.value = 'Felix';
    protagonist.element.value = 'Yang';

    director.trigger('input');
    protagonist.trigger('input');

    await Vue.nextTick();

    expect(vm.$refs.complex.dirty).toBe(true);

    expect(vm.formValues.c).toEqual([
      {
        type: 1,
        name: 'Felix'
      },
      {
        type: 2,
        name: 'Yang'
      }
    ]);
  });

  test('required', () => {
    expect(vm.$refs.optional.isRequired).toBe(false);
    expect(vm.$refs.simple.isRequired).toBe(true);
    expect(vm.$refs.complex.isRequired).toBe(false);
  });

  test('form element initial value', async () => {
    const initial = wrapper.find('[name=initial]');

    expect(vm.$refs.initial.localValue).toBe('dog');
    expect(vm.$refs.initial.dirty).toBe(false);

    await Vue.nextTick();

    expect(vm.formValues.d).toBe('dog');

    initial.element.value = 'dot';
    initial.trigger('input');

    await Vue.nextTick();

    expect(vm.$refs.initial.dirty).toBe(true);

    expect(vm.formValues.d).toBe('dot');

    vm.$refs.initial.resetLocalValue();

    expect(vm.$refs.initial.dirty).toBe(true);

    expect(vm.formValues.d).toBe('dog');
  });
});
