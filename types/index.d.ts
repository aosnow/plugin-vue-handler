// ------------------------------------------------------------------------------
// name: index.d
// author: 喵大斯( mschool.tech )
// created: 2019/8/1
// ------------------------------------------------------------------------------

import _Vue from 'vue';

/**
 * 派发指定类型事件
 * @param {String} type 事件类型
 * @param {any} [option=null] 任意类型数据，做为事件携带数据
 * @param {Vue} [component=null] 组件实例，一般指定为 this 组件参数
 */
declare function emit(type: string, option?: any, component?: typeof _Vue): void;

declare function handlerType(options: { type: string, detail: any }): void;

/**
 * 添加指定的事件监听
 * @param {String} type 事件类型
 * @param {Function} handler 事件回调方法
 * @param {Vue} [component=null] 组件实例，一般指定为 this 组件参数
 */
declare function addEventListener(type: string, handler: typeof handlerType, component?: typeof _Vue);

/**
 * 移除指定事件监听
 * @param {String} type 事件类型
 * @param {Vue} [component=null] 组件实例，若指定则只移除该组件内的事件，否则全量移除所有 type 类型监听事件回调
 */
declare function removeEventListener(type: string, component?: typeof _Vue);

// 扩展 Vue 静态属性，若是实例属性直接扩展 interface Vue 即可
declare module 'vue/types/vue' {
  interface VueConstructor {
    on: typeof addEventListener;
    off: typeof removeEventListener;
    emit: typeof emit;
  }

  interface Vue {
    $handler: {
      on: typeof addEventListener;
      off: typeof removeEventListener;
      emit: typeof emit;
    }
  }
}

export declare function install(Vue: typeof _Vue, options?: any): void;

export default install;
