import { App } from 'vue';

// 引入组件
import JmDslEditor from './dsl-editor/index.vue';

export default {
  // app.use()触发install的调用
  install: (app: App) => {
    app.component(JmDslEditor.name, JmDslEditor);
  },
};
