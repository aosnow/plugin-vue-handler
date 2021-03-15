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
  const { $options, $parent } = this;

  // 保留根级 Vue 实例的引用
  if (!$parent) _vue = this;

  // 对所有需要处理 handler 的实例进行自定义义事件安装
  if ($options.handler) {
    Object.keys($options.handler).forEach(type => {
      addEventListener(type, $options.handler[type], this);
    });
  }
}

/**
 * 检测是否已经注册指定事件
 * @param {String} type 事件类型
 * @param {Vue} [component=null] 组件实例，一般指定为 this 组件参数
 * @return {boolean}
 */
function hasEventListener(type, component = null) {
  const { _uid } = component || {};
  const handlers = eventTargetByName[type];

  if (_uid !== undefined && Array.isArray(handlers) && handlers.length) {
    const size = handlers.filter(({ component }) => {
      const { _uid: tid } = component || {};
      return tid && _uid === tid;
    });

    return size.length > 0;
  }

  return false;
}

/**
 * 添加指定的事件监听
 * @param {String} type 事件类型
 * @param {Function} handler 事件回调方法
 * @param {Vue} [component=null] 组件实例，一般指定为 this 组件参数
 */
function addEventListener(type, handler, component = null) {
  if (!eventTargetByName[type]) eventTargetByName[type] = [];

  // 不重复为相同的组件添加相同的事件
  if (!hasEventListener(type, component)) {
    eventTargetByName[type].push({ component, handler });
  }
}

/**
 * 移除指定事件监听
 * @param {String} type 事件类型
 * @param {Vue} [component=null] 组件实例，若指定则只移除该组件内的事件，否则全量移除所有 type 类型监听事件回调
 */
function removeEventListener(type, component = null) {
  const { _uid } = component || {};
  const handlers = eventTargetByName[type];

  if (Array.isArray(handlers) && handlers.length) {
    eventTargetByName[type] = _uid === undefined ? [] : handlers.filter(({ component, handler }) => {
      const { _uid: tid } = component || {};
      return _uid !== tid;
    });
  }
}

function beforeDestroy() {
  const { $options } = this;

  if ($options.handler) {
    Object.keys($options.handler).forEach(type => {
      removeEventListener(type, this);
    });
  }
}

/**
 * 派发指定类型事件
 * @param {String} type 事件类型
 * @param {any} [option=null] 任意类型数据，做为事件携带数据
 * @param {Vue} [component=null] 组件实例，一般指定为 this 组件参数
 */
function emit(type, option = null, component = null) {
  const handlers = eventTargetByName[type];

  if (Array.isArray(handlers) && handlers.length) {
    const finalHandlers = component && component._uid ? handlers.filter(({ component: self, handler }) => {
      return self && self._uid ? component._uid === self._uid : true;
    }) : handlers;

    finalHandlers.forEach(({ component, handler }) => {
      if (typeof handler === 'function') {
        handler.call(component, { type, detail: option });
      }
    });
  }
}

export default function(Vue) {
  _Vue = Vue;
  Vue.on = addEventListener;
  Vue.off = removeEventListener;
  Vue.emit = emit;

  Vue.prototype.$handler = {
    on: addEventListener,
    off: removeEventListener,
    emit
  };
  Vue.mixin({ beforeCreate, beforeDestroy });
}
