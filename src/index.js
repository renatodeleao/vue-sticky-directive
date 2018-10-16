import VueStickyDirective from "./vue-sticky-directive";

const install = function (Vue) {
  Vue.directive("sticky", VueStickyDirective)
}

if (window.Vue) {
  Vue.use(install)
}

VueStickyDirective.install = install;

export default VueStickyDirective;
