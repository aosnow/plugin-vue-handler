<!--------------------------------------------------
  name: Child.vue
  author: mudas( mschool.tech )
  created: 2020/4/17
---------------------------------------------------->

<template>
  <div class="specified-scope">
    {{content}}
  </div>
</template>

<script>
export default {
  name: 'child',
  handler: {
    'test-event': function(option) {
      console.warn('test-event.child:', this, option);
    }
  },
  data() {
    return {
      content: 'Template page: Child.vue'
    };
  }
};
</script>
