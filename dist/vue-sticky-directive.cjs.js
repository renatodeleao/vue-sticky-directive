'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var StickySidebar = _interopDefault(require('sticky-sidebar'));

const VueStickyDirective = () => {
  // acccess StickySidebar Instance via vnode.elm._stickySidebar
  const NS = "_stickySidebar";
  const DEFAULTS = {
    topSpacing: 0,
    bottomSpacing: 0,
    containerSelector: "[data-v-sticky-container]",
    innerWrapperSelector: "[data-v-sticky-inner]",
    resizeSensor: true,
    stickyClass: "is-affixed",
    minWidth: 0
  };

  const EVENT_NAMES_MAP = {
    "affix.top.stickySidebar": "affix-top",
    "affixed.top.stickySidebar": "affixed-top",
    "affix.bottom.stickySidebar": "affix-bottom",
    "affixed.bottom.stickySidebar": "affixed-bottom",
    "affix.container-bottom.stickySidebar": "affix-container-bottom",
    "affixed.container-bottom.stickySidebar": "affixed-container-bottom",
    "affix.unbottom.stickySidebar": "affix-unbottom",
    "affixed.unbottom.stickySidebar": "affixed-unbottom",
    "affix.static.stickySidebar": "affix-static",
    "affixex.static.stickySidebar": "affixed-static"
  };

  /**
   * Emit
   *
   * @desc Mimic vnode.context.$emit(event, data) https://stackoverflow.com/a/40720172/2801012
   * @param {Vnode} vnode
   * @param {String} name
   * @param {Object} data - Any data accessible at v-on:event-name payload
   */
  const emit = (vnode, name, data) => {
    var handlers =
      (vnode.data && vnode.data.on) ||
      (vnode.componentOptions && vnode.componentOptions.listeners);

    if (handlers && handlers[name]) {
      handlers[name].fns(data);
    }
  };


  /**
   * Handling eventlistener
   *
   * @param {Event} e — native event object
   * @param {vnode} vnode - target vnode
   * @returns {Function} emit
   */
  const handleEvents = function(e, vnode) {
    //console.log(`emmit ${EVENT_NAMES_MAP[e.type]}`);
    let humanizedEventName = EVENT_NAMES_MAP[e.type];
    emit(vnode, humanizedEventName, {evtName: humanizedEventName, vnode: vnode});
  };


  /**
   * handleEventsReference
   *
   * @desc a reference where handleEvents will be assigned to allow add and remove eventListeners
   */
  let handleEventsReference;

  return {
    inserted(el, binding, vnode) {
      if (
        typeof binding.value === "undefined" ||
        typeof binding.value === "object"
      ) {
        let opts = { ...DEFAULTS, ...binding.value };
        vnode.context.$nextTick(() => {
          el[NS] = new StickySidebar(el, opts);

          handleEventsReference = function(e) {
            handleEvents(e, vnode);
          };

          Object.keys(EVENT_NAMES_MAP).map(function(evtName) {
            el.addEventListener(evtName, handleEventsReference);
          });
        });
      } else {
        throw new Error("v-sticky binding must be an object");
      }
    },
    unbind(el, binding, vnode) {
      if (el[NS]) {
        el[NS].destroy();
        el[NS] = undefined;
        Object.keys(EVENT_NAMES_MAP).map(evtName => {
          el.removeEventListener(evtName, handleEventsReference);
        });
      }
    },
    update(el, binding, vnode) {
      if (binding.value === binding.oldValue) return;
      // i don't like this either but there's no public method
      // to updated options alternative, destroy() and init again
      el[NS].options = { ...DEFAULTS, ...binding.value };
      el[NS].updateSticky();
    },
    componentUpdated(el, binding, vnode) {
      // all children updated
      if (el[NS]) {
        el[NS].updateSticky();
      }
    }
  };
};

var VueStickyDirective$1 = VueStickyDirective();

const install = function (Vue) {
  Vue.directive("sticky", VueStickyDirective$1);
};

if (window.Vue) {
  Vue.use(install);
}

VueStickyDirective$1.install = install;

module.exports = VueStickyDirective$1;
