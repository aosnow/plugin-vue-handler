<template>
  <div id="app">

    <h2>测试</h2>
    <el-button @click="emitEvent('test-event', { arguments: 123 })">派发全局事件</el-button>
    <el-button @click="addEvent('custom-event')">手动添加全局事件</el-button>
    <el-button @click="emitEvent('custom-event', { arguments: 456 })">派发手动全局事件</el-button>
    <child></child>

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
      console.warn('test-event.app:', this, option);
    }
  },

  data() {
    return {
      value: ''
    };
  },

  methods: {
    addEvent(type) {
      this.$handler.on(type, this.methodTest, this);
    },

    emitEvent(type, data) {
      Vue.emit(type, data);
    },

    methodTest(option) {
      console.warn('methodTest:', this, option);
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
