<template>
  <div id="app">

    <div>
      <h3>test-event</h3>
      <el-button @click="$handler.on('test-event', methodTest, self)">添加组件事件</el-button>
      <el-button @click="$handler.on('test-event', methodTest)">添加事件</el-button>
      <el-button @click="$handler.off('test-event')">移除全量</el-button>
      <el-button @click="$handler.off('test-event', self)">移除组件</el-button>
      <el-button @click="$handler.emit('test-event', { arguments: 123 }, self)">派发当前 test-event 事件</el-button>
    </div>

    <child></child>

    <div>
      <h3>派发事件</h3>
      <el-button @click="$handler.emit('test-event', { arguments: 123 })">派发 test-event 全局事件</el-button>
      <el-button @click="$handler.emit('custom-event', { arguments: 456 })">派发 custom-event 全局事件</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Child from './Child';

export default {
  name: 'app',
  components: { Child },
  handler: {
    ['test-event'](option) {
      // this.methodTest(option);
      console.warn('test-event.app:', this && this._uid, option);
    }
  },

  data() {
    return {
      self: this
    };
  },

  methods: {
    emitEvent(type, option = null) {
      this.$handler.emit(type, option, this);
    },

    methodTest(option) {
      console.warn('methodTest:', this && this._uid, option);
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 50px;
}

.el-form {
  width: 50%;
  min-width: 200px;
  max-width: 500px;
}
</style>
