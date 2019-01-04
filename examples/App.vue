<template>
  <div class="o-wrapper">
    <header class="c-hero">
      <h1>Vue Sticky Directive — <span>A Vue directive wrapping @bouolia's sticky-sidebar to make smart and high performance sticky components</span></h1>
    </header>
    <div class="o-grid _container" data-v-sticky-container>
      <div class="o-grid__el o-grid__aside">
        <Sidebar
          v-if="stickyVisibility"
          :sticky-config="stickyConfig"
          @sticky-event="eventLog"
          ref="demo" />
      </div>

      <div class="o-grid__el o-grid__main">
        <VueMarkdown
          v-if="documentationContent !== ''"
          class="markdown-body"
          toc-id="toc-menu"
          :toc="true"
        >{{documentationContent}}</VueMarkdown>
      </div>

      <div class="o-grid__el o-grid__aside">
        <Controls v-sticky :sticky-config="stickyConfig"
          @update-sticky-conf="update"
          @randomize="randomOffsets"
          @destroy="destroy"
          @initialize="initialize"
          @visibility-toggle="handleVisibility"
          :sticky-event-log="stickyEventLog"
        />
      </div>
    </div>
    <div class="_expand"></div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Documentation from "../README.md";
import GithubMdCss from "github-markdown-css";
import Prism from 'prismjs';
import PrismStyles from "prismjs/themes/prism.css"
//
import Sidebar from "./components/Sidebar"
import Controls from "./components/Controls"

import ResizeSensor from "resize-sensor";
window.ResizeSensor = ResizeSensor;
import VueStickyDirective from "../dist/vue-sticky-directive.esm.js";



export default {
  name: "App",
  directives: {
    "sticky": VueStickyDirective
  },
  components: {
    VueMarkdown,
    Sidebar,
    Controls
  },
  data() {
    return {
      documentationContent: "",
      stickyConfig: {
        topSpacing: 0,
        bottomSpacing: 100
      },
      stickyEventLog: "static",
      stickyVisibility: true
    }
  },
  mounted(){
    this.getDocs();
  },
  methods:{
    readTextFile(file){
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file);
        xhr.onreadystatechange = function() {
          if(xhr.readyState === 4) {
            if(xhr.status === 200 || xhr.status == 0){
              let allText = xhr.responseText;
              resolve(allText);
            } else {
              reject({
                status: this.sateus,
                statusText: this.statusText
              })
            }
          }
        }
        xhr.send(null);
      })
    },
    async getDocs(){
      try {
        this.loading = true;
        let docs = await this.readTextFile(Documentation);
        this.documentationContent = docs;

        console.log('Successfully loaded docs');
        this.$nextTick(() => {
          Prism.highlightAll();
        })
      } catch(e){
        console.error(e);
      } finally {
        this.loading = false
      }
    },
    randomOffsets(){
      let min = 0;
      let max = 100;

      this.stickyConfig = {
        topSpacing: Math.floor(Math.random()*(max-min+1)+min),
        bottomSpacing: Math.floor(Math.random()*(max-min+1)+min)
      }
    },
    update(prop, event) {
      // Understand why this.$set doesn't trigger reactivity
      this.stickyConfig = {
        ...this.stickyConfig,
        ...{[`${prop}`]: Number(event.target.value)}
      }
    },
    eventLog(evtName){
      console.log(evtName);
      this.stickyEventLog = evtName
    },
    handleVisibility(){
      this.stickyVisibility = !this.stickyVisibility
    },
    /**
     * Advanced usage: requires knowledge about original plugin
     */
    destroy(){
      this.$refs.demo.$el._stickySidebar.destroy();
    },
    initialize(){
      this.$refs.demo.$el._stickySidebar.initialize();
    },
  }
}
</script>

<style lang="scss">
@import "./styles/index.scss";

$gutter: 32px;

:not(pre) > code[class*="language-"], pre[class*="language-"]{
  background-color:#f6f8fa;
}
  .o-wrapper{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .o-grid {
    position: relative;
    display: flex;
    margin-left: -$gutter;
  }

  .o-grid__el{
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: $gutter;
  }

  .o-grid__aside{
    width: 25%;
  }

  .o-grid__main {
    width: 50%;
  }


  .c-hero {
    background: #202020;
    color: whitesmoke;
    padding: 48px;
    height: 240px;
    display: flex;
    margin-bottom: 48px;

    h1{
      font-size: 3rem;
      line-height: 1.1;
    }

    span {
      font-weight: 400;
      opacity: 0.6;
    }
  }

  .markdown-body{
    margin-bottom: 80px;
  }
  ._container{
    border-bottom: 8px solid black;
  }
  ._expand{
    height: 500px;
  }
</style>
