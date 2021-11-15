import type { App } from 'vue';
import JmDslEditor from './dsl-editor/index.vue';
export default {
  install (app: App) {
    app.component(JmDslEditor.name, JmDslEditor);
  },
};
