# plugin-vue-handler
[![npm version](https://img.shields.io/npm/v/@mudas/plugin-vue-handler.svg)](https://www.npmjs.org/package/@mudas/plugin-vue-handler)

> A plugin that supports Vue to dispatch global events.

## Setup
install：
```npm
npm i @mudas/plugin-vue-handler -S
```

You need to add configuration for vue-cli to correctly translate the es module in node_modules:
```js
// vue.config.js:
module.exports = {
    transpileDependencies: [
      '@mudas/*' // all of node_module for '@mudas'
    ]
}
```

register vue plugin：
```js
import Handler from '@mudas/plugin-vue-handler';

// bind Vue.emit()
Vue.use(Handler);
```


### Usage	

```vue
// app.vue or any children:
export default {
  name: 'app',

  handler: {
    ['global-event-name'](option) {
      // this = the VueComponent
      this.methodTest(option);
    }
  },
  
  methods: {
    methodTest(option) {
      console.warn('test-event.app:', this, option);
    }
  }
}

// Then call the following code in any business code
// to dispatch a global event so that any subcomponents
// that listen to this event "global-event-name" respond to the event:
Vue.emit('test-event', { arguments: 123 });

```
