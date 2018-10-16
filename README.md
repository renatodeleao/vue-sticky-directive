# Vue Sticky Directive
A Vue directive wrapping [Abouolia's stickySidebar plugin]( https://github.com/abouolia/sticky-sidebar) to make smart and high performance sticky components.

## Installation
```bash
$ npm install @renatodeleao/vue-sticky-directive
```
or
```bash
$ yarn add @renatodeleao/vue-sticky-directive
```

## Usage
⚠️ hands on code people: [codesandbox demo](https://codesandbox.io/s/mm4olmxkrx)

```javascript
// register globally
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
Vue.use(VueStickyDirective)
// by default exposes v-sticky directive namespace

// at a component (recommended)
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'

export default {
  name: "component-name"
  directives: {
    "sticky": VueStickyDirective
  }
}
// or using custom namespace
  directives: {
    "my-sticky": VueStickyDirective // exposes v-my-sticky directive namespace
  }
```

#### Recommended Markup
```HTML
<!--sticky container-->
<div data-v-sticky-container>
  <!-- the actual sticky element -->
  <div v-sticky>
    <!-- where plugin applies transforms -->
    <div data-v-sticky-inner>
  </div>
</div>
```
Note that `[data-v-sticky-container]` and `[data-v-sticky-inner]` are optional attributes. The first specify the `containerSelector`container to limit the begin and end points of sticky element,it defaults to closest parent if not present. The letter defines `innerWrapperSelector` of sticky sidebar, if this wrapper is not found inside `v-sticky`  element, the plugin will create one for you under class name `inner-wrapper-sticky`


## Options
Same options as [original plugin](https://abouolia.github.io/sticky-sidebar/#options), with the exception of default selectors for `containerSelector` and `innerWrapperSelector`, that use `data-attributes` now, a personal preference for separation of concerns.

```javascript
{
  topSpacing: 0,
  bottomSpacing: 0,
  containerSelector: "[data-v-sticky-container]",
  innerWrapperSelector: "[data-v-sticky-inner]",
  resizeSensor: true,
  stickyClass: "is-affixed",
  minWidth: 0
};
```
And should be passed to the `v-sticky` directive binding value.

```HTML
<template>
  <div data-v-sticky-container>
    <!-- the actual sticky element -->
    <div v-sticky="options">
      <!-- where plugin applies transforms -->
      <div data-v-sticky-inner>
    </div>
  </div>
</template>

<script>
  export default {
    ...
    data(){
      return {
        options: {
          topSpacing: 20
        }
      }
    }
  }
</script>
```

Note: do-not use `:v-sticky` to bind values, it's not the way directives work.

## Events
Same events as [original plugin](https://abouolia.github.io/sticky-sidebar/#events) and are available using the standard Vue `v-on:event-name` or `@event-name` notation. The event emits an `Object` containing `evtName` and `vnode` allowing access for custom manipulation (ex: adding a specific class).

```HTML
<template>
  <div data-v-sticky-container>
    <div v-sticky="options" @affix-top="handleStickyEvent">
      <div data-v-sticky-inner>
    </div>
  </div>
</template>

<script>
  export default {
    ...
    methods:{
      handleStickyEvent(payload){
        console.log(payload);
        // {evtName: "affix-top", vnode: vnode}
        payload.vnode.elm.classList('you-reached-the-top');
      }
    }
  }
</script>
```
```javascript
EVENT_NAMES = [
  "affix-top",
  "affixed-top",
  "affix-bottom",
  "affixed-bottom",
  "affix-container-bottom",
  "affixed-container-bottom",
  "affix-unbottom",
  "affixed-unbottom",
  "affix-static",
  "affixed-static"
]
```
The "ed" suffix denotes *after* event whereas the unsuffixed denotes *before*.

## Develop and Contribute

```bash
$ git clone this repo
# install dev dependencies
$ npm install
# rollup with watch mode
$ npm run dev
# test app
$ npm run parcel
# build lib
$ npm run build
```

## Motivations, credits and thanks
I didn't kept Aboulia's original name, because you can make any type of sticky element with this. The reason to use its plugin it's performance and the overflow behaviour (scroll-past-and-affix-[bottom/up]).

Special thanks to [@abouolia](https://github.com/abouolia/) for taking time to develop this, and to [@mehwww](https://github.com/mehwww/) to point me the way to build this wrapper.

### Other sticky libraries
- [@mehwww](https://github.com/mehwww/) has [lightweight sticky directive](https://www.npmjs.com/package/vue-sticky-directive)

## License
MIT