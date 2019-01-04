## Installation
```bash
$ npm install @renatodeleao/vue-sticky-directive
```
or
```bash
$ yarn add @renatodeleao/vue-sticky-directive
```

## Usage
👁 [Docs + Example](https://renatodeleao.github.io/vue-sticky-directive/)
⚠️ hands on code people: [codesandbox demo](https://codesandbox.io/s/mm4olmxkrx)

#### Global register
```javascript
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
Vue.use(VueStickyDirective)
// by default exposes v-sticky directive namespace
```

#### Component register (recommended)
```javascript
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'

export default {
  name: "your-component-name",
  /**
   * You can use alternative namespace instead of "sticky" here
   */
  directives: {
    "sticky": VueStickyDirective
  }
}
```

#### Recommended Markup
```HTML
<!--sticky container (optional) -->
<div class="your-container-class" data-v-sticky-container>
  <!-- the actual sticky element -->
  <div class="your-sidebar-class" v-sticky>
    <!-- where plugin applies transforms (optional) -->
    <div class="your-sidebar-inner-class" data-v-sticky-inner>
  </div>
</div>
```
<small>Note that `[data-v-sticky-container]` and `[data-v-sticky-inner]` are optional attributes. The first specify the `containerSelector`, boundary element to limit the begin and end points of sticky element. It defaults to closest parent if not present. The latter defines `innerWrapperSelector` of sticky sidebar, if this wrapper is not found inside `v-sticky` element, the plugin will create one for you under class name `inner-wrapper-sticky`. It's recommended element to apply your CSS styles.</small>

#### ResizeSensor (Highly Recommended)
I've (maybe naively) included ResizeSensor as a dependency of this package, albeight it's usage is optional. Note that by default, this plugin only re-calculates at `window.resize`. At original plugin's documentation, resizeSensor usage is also recommended. The the thing is, if you don't include this, you have to manually detect parent and el resizes and call `this.el._stickySidebar.updateSticky()` yourself or dispatching dom `resize` events yourself, because at the time of mounting the directive, your parent container might be still loading content or other nested components might not have mounted yet, therefore at the computed height at that time might be wrong.

```javascript
// anywhere before registering directive, only once globally
import ResizeSensor from "resize-sensor"
window.ResizeSensor = ResizeSensor // [1]
```
<small>[1] - The reason to polute global namespace is that [original plugin](https://github.com/abouolia/sticky-sidebar/blob/master/src/sticky-sidebar.js#L199) uses this reference as condition verification to create the resizeSensors.</small>

## Options
Same options as [original plugin](https://abouolia.github.io/sticky-sidebar/#options), with the exception of default selectors for `containerSelector` and `innerWrapperSelector`, that use `data-attributes` now, a personal preference for separation of concerns.

```javascript
{
  topSpacing: 0,
  bottomSpacing: 0,
  containerSelector: "[data-v-sticky-container]",
  innerWrapperSelector: "[data-v-sticky-inner]",
  resizeSensor: true, // [1] read above
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

<small>Note: do-not use `:v-sticky` to bind values, it's not the way directives work.</small>

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

## Other sticky libraries
- [@mehwww](https://github.com/mehwww/) has [lightweight sticky directive](https://www.npmjs.com/package/vue-sticky-directive)

## License
MIT