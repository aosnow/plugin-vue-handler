// ------------------------------------------------------------------------------
// name: index.d
// author: 喵大斯( mschool.tech )
// created: 2019/8/1
// ------------------------------------------------------------------------------

import _Vue from 'vue';

declare function emit(type:string, option?:any):void;

// 扩展 Vue 静态属性，若是实例属性直接扩展 interface Vue 即可
declare module 'vue/types/vue' {
  interface VueConstructor {
    emit:typeof emit;
  }
}

export declare function install(Vue:typeof _Vue, options?:any):void;

export default install;
