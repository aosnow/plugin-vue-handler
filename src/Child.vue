<!--------------------------------------------------
  name: Child.vue
  author: mudas( mschool.tech )
  created: 2020/4/17
---------------------------------------------------->

<template>
  <div class="specified-scope">
    <div>
      <h3>custom-event</h3>
      <el-button @click="$handler.on('custom-event', methodTest, self)">添加组件事件</el-button>
      <el-button @click="$handler.on('custom-event', methodTest)">添加事件</el-button>
      <el-button @click="$handler.off('custom-event')">移除全量</el-button>
      <el-button @click="$handler.off('custom-event', self)">移除组件</el-button>
      <el-button @click="$handler.emit('custom-event', { arguments: 456 }, self)">派发当前 custom-event 事件</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'child',
  handler: {
    'test-event': function(option) {
      console.warn('test-event.child:', this && this._uid, option);
    }
  },
  data() {
    return {
      self: this
    };
  },

  // created() {
  //   this.$handler.on('custom-event', this.methodTest, this);
  // },

  methods: {
    methodTest(option) {
      console.warn('methodTest.child:', this && this._uid, option);
    }
  }
};
</script>
