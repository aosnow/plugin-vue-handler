// ------------------------------------------------------------------------------
// name: handler
// author: mudas( mschool.tech )
// created: 2020/4/17 15:48
// ------------------------------------------------------------------------------

let _Vue; // 当前 Vue 引用（即当前环境 import 进来的 Vue 对象，非实例）
let _vue; // 当前 vue 根级实例

// 事件索引表（key: [...vueInstances]）
const eventTargetByName = Object.create(null);

function beforeCreate() {

  const { _uid, $options, $parent } = this;

  // 保留根级 Vue 实例的引用
  if (!$parent) _vue = this;

  // 对所有需要处理 handler 的实例进行自定义义事件安装
  if ($options.handler) {
    Object.keys($options.handler).forEach(handlerName => {
      const component = this;
      const handle = $options.handler[handlerName];

      if (!eventTargetByName[handlerName]) eventTargetByName[handlerName] = Object.create(null);
      eventTargetByName[handlerName][_uid] = { component, handle };
    });
  }
}

function beforeDestroy() {
  const { _uid, $options } = this;

  if ($options.handler) {
    Object.keys($options.handler).forEach(handlerName => {
      if (eventTargetByName[handlerName] && eventTargetByName[handlerName][_uid]) {
        delete eventTargetByName[handlerName][_uid];
      }
    });
  }
}

function emit(type, option) {
  const handlers = eventTargetByName[type];

  if (handlers) {
    Object.keys(handlers).forEach(uid => {
      const { component, handle } = handlers[uid];
      console.warn('handlers[uid]:', handlers[uid]);
      if (typeof handle === 'function') {
        // handle(option);
        handle.call(component, option);
      }
    });
  }
}

export default function(Vue) {
  _Vue = Vue;
  Vue.emit = emit;
  Vue.mixin({ beforeCreate, beforeDestroy });
}
