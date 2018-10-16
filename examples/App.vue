<template>
  <div class="wrapper">
    {{message}}
    <div class="container" data-v-sticky-container>
      <div
        class="sticky"
        v-sticky="stickyConfig"
        @affixed-top="handle"
        @affixed-bottom="handle"
        @affixed-container-bottom="handle"
        @affixed-unbottom="handle"
        @affixed-static="handle"
      >
        <div class="sticky__content" data-v-sticky-inner>
          <span>Top</span>
          <span>Bottom</span>
        </div>
      </div>

      <div>
        <h1>{{content}}</h1>
      </div>
    </div>
    <div class="expand">aoter</div>
  </div>
</template>

<script>
import VStickyDirective from "../dist/v-sticky.esm.js";

console.log(VStickyDirective);
export default {
  name: "App",
  directives: {
    "sticky": VStickyDirective
  },
  data (){
    return{
      message: 'Hello Vue!',
      stickyConfig: {
        topSpacing: 20,
        bottomSpacing: 30
      }
    }
  },
  computed: {
    content() {
      return "a b c".repeat(1000);
    }
  },
  methods:{
    handle(e){
      console.log(e);
      if(e.evtName === "affixed-container-bottom"){
        e.vnode.elm.classList.add('reached-bottom');
      }

      if(e.evtName === "affixed-top"){
        e.vnode.elm.classList.remove('reached-bottom');
      }
    }
  }
}
</script>

<style lang="scss">
  .wrapper{
    max-width: 1024px;
    margin: 0 auto;
  }
  .container{
    display: flex;
  }

  .expand{
    height: 1000px;
  }

  [data-v-sticky-container]{
    position: relative;
    background-color: whitesmoke;
  }

  .sticky{
    width: 300px;
    flex: none;
  }

  .sticky .sticky__content{
    background-color: gray;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: color 0.3s, background-color 0.3s;
  }

  .sticky.is-affixed .sticky__content{
      background-color: green;
  }

  .sticky.reached-bottom .sticky__content{
    background-color: black;
    color: white;
  }
</style>
