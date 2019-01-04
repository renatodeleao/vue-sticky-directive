<template>
  <label :class="classNames">
    <span class="c-input-field__label" v-html="label"></span>
    <input class="c-input-field__input" :type="type" :value="value" v-bind="$attrs" v-on="listeners" />
  </label>
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: {
      type: String,
      default: "My Label"
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
      default: ""
    },
    layout: {
      type: [String, null],
      default: null
    },
    theme: {
      type: [String, null],
      default: null
    }
  },
  data(){
    return {
      listeners: {
        input: event => $emit('input', event.target.value),
        ...this.$listeners,
      }
    }
  },
  computed: {
    classNames() {
      return {
        'c-input-field': true,
        [`c-input-field--${this.layout}`]: this.layout,
        [`c-input-field--${this.theme}`]: this.theme
      };
    }
  }
}
</script>

<style lang="scss">

.c-input-field {
  position: relative;
  display: flex;
  flex-direction: column;
}

  .c-input-field__label{
    font-size: 0.75rem;
  }

  .c-input-field__input{
    font-family: inherit;
    -webkit-appearance: none;
    appearance: none;
    border: 0;
    outline: 0;
    padding: 0 0.5em;
  }

[class*="c-input-field--inline"]{
  flex-direction: row;

  .c-input-field__label{
    flex: 1 0 0px;
    min-width: 0px;
  }

  .c-input-field__input {
    flex: none;
    text-align: right;
    max-width: 45%;
  }
}

.c-input-field--inline-number-control{
  .c-input-field__input {
    flex: none;
    width: 32px;
  }
}
</style>
