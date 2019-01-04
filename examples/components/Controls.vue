<template>
  <aside class="c-controls">
    <div class="c-controls__inner" data-v-sticky-inner>
      <section class="c-controls__section" role="group">
        <h4 class="c-controls__heading">Controls</h4>
        <InputField
          label="Event logger"
          class="c-controls__input"
          layout="inline"
          type="text"
          :value="stickyEventLog"
          readonly
        />

        <InputField
          label="Top Spacing"
          class="c-controls__input"
          layout="inline-number-control"
          :value="stickyConfig.topSpacing"
          @input="customUpdate('topSpacing', $event)"
        />

        <InputField
          label="Bottom Spacing"
          class="c-controls__input"
          layout="inline-number-control"
          :value="stickyConfig.bottomSpacing"
          @input="customUpdate('bottomSpacing', $event)"
        />

        <button @click="$emit('randomize')">Random offsets</button>
        <button @click="$emit('visibility-toggle')">Conditional v-if</button>
      </section>


      <section class="c-controls__section">
        <header class="c-controls__header">
          <h4 class="c-controls__heading">Danger zone</h4>
          <p><small>Using <code>refs</code> and original plugin's public methods, requires knowledge of it.</small></p>
        </header>
        <button @click="$emit('destroy')">Destroy</button>
        <button @click="$emit('initialize')">initialize</button>
      </section>

    </div>
  </aside>
</template>

<script>
import InputField from "./InputField";

export default {
  name: "Controls",
  props: ['sticky-config', 'sticky-event-log'],
  components: {
    InputField
  },
  methods: {
    customUpdate(prop, e){
      this.$emit('update-sticky-conf', prop, e);
    }
  }
}
</script>

<style lang="scss">
.c-controls__inner{
  will-change: transform;
  padding: 16px;
  background: #202020;
  color: white;
  font-family: monospace;
}


.c-controls__header {
  margin-bottom: 12px;

  small {
    display: inline-block;
    line-height: 1.2;
    color: gray;
  }
}

  .c-controls__heading{
    margin-bottom: 4px;
  }

.c-controls__section{
  padding: 12px 0;
  margin-bottom: 12px;

  border-top: 1px solid rgba(255,255,255,0.12);
}

.c-controls__input{
  color: gray;
  margin: 4px 0;
  input {
     background-color: black;
     color: white;
  }
}
</style>
