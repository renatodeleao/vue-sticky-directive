<template>
  <div class="c-sticky" v-sticky="stickyConfig"
    @affixed-top="handle"
    @affixed-bottom="handle"
    @affixed-container-bottom="handle"
    @affixed-unbottom="handle"
    @affixed-static="handle"
    @v-sticky:inserted="handle"
    @v-sticky:unbind="handle"
  >
    <div class="c-sticky__content" data-v-sticky-inner>
      <div id="toc-menu" class="c-sticky__toc-menu"></div>
    </div>
  </div>
</template>

<script>
import VueStickyDirective from "../../dist/vue-sticky-directive.esm.js";

export default {
  name: "Sidebar",
  directives: {
    "sticky": VueStickyDirective
  },
  props: ['sticky-config'],
  methods: {
    handle(e) {
      // otherwise, we get a lot of uuupdates for dom updates
      console.log(e);
      if(e.evtName === "affixed-container-bottom"){
        e.vnode.elm.classList.add('reached-bottom');
        e.vnode.elm.classList.remove('reached-top');
      }

      if(e.evtName === "affixed-top"){
        e.vnode.elm.classList.remove('reached-bottom');
      }

      if(e.evtName === "affixed-static"){
        e.vnode.elm.classList.add('reached-top');
      }

      this.$emit('sticky-event', e.evtName)
    }
  },
  mounted(){
    // this.$nextTick(() => {
    //    console.log(this.$el._stickySidebar.options);
    // })
  }
}
</script>

<style lang="scss">
  [data-v-sticky-container]{
    position: relative;
  }

  .c-sticky{
    flex: none;
    position: relative;
  }

  .c-sticky__content{
    will-change: transform;
    //height: 1040px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: color 0.3s, background-color 0.3s;
    padding: 16px;
    border-top: 4px solid black;
    border-bottom: 4px solid black;
  }

  .c-sticky{
    &.is-affixed {
      .c-sticky__content{
        background-color:#202020;
        color: white;
      }
    }

    &.reached-bottom{
      .c-sticky__content{
        background-color: white;
        color: #202020;
      }
    }
  }



  .c-sticky__toc-menu{
    ul {
      list-style: none;
      font-weight: 600;
      font-size: 2rem;
      padding: 0;
    }

    li {
      padding: 24px;
      letter-spacing: -0.025em;
      writing-mode: vertical-lr;
      margin: 0 auto;

      &:hover{
        background: black;
        color: white;
      }
    }
  }
</style>
