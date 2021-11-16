<template>
  <el-scrollbar class="jm-dsl-editor" @click="clickEmpty">
    <textarea ref="textareaRef"></textarea>
  </el-scrollbar>
</template>

<script type="text/ecmascript-6">
import { defineComponent, onBeforeUpdate, onMounted, ref } from 'vue';
// 引入全局实例
import CodeMirror from 'codemirror';

// 核心样式
import 'codemirror/lib/codemirror.css';
// 引入主题后，还需要在 options 中指定主题才会生效
import 'codemirror/theme/ayu-mirage.css';

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/yaml/yaml.js';

// 尝试获取全局实例
const codemirror = window.CodeMirror || CodeMirror;

/**
 * 初始化
 * @param textarea
 * @param readonly
 * @param onChange
 * @returns CodeMirror
 */
function initialize (textarea, readonly, onChange) {
  const instance = codemirror.fromTextArea(textarea, {
    // 模式
    mode: 'yaml',
    // 缩进格式
    tabSize: 2,
    // 主题，对应主题库 JS 需要提前引入
    theme: 'ayu-mirage',
    // 强制换行
    lineWrapping: true,
    // 显示行号
    lineNumbers: true,
    // 是否只读
    readOnly: readonly,
  });

  if (!readonly) {
    // 绑定change事件
    instance.on('change', onChange);
  }

  // 解决初始化时代码盖住行号问题
  setTimeout(() => instance.refresh());

  return instance;
}

export default defineComponent({
  name: 'jm-dsl-editor',
  props: {
    value: String,
    readonly: Boolean,
  },
  setup (props, { emit }) {
    const textareaRef = ref(null);

    let instance;
    // 禁止外部编辑
    let externalEditingForbidden = false;
    const handleChange = inst => {
      // 开始编辑后，禁止外部编辑
      externalEditingForbidden = true;

      // Copy the content of the editor into the textarea.
      inst.save();
      emit('update:value', textareaRef.value.value);
    };

    onMounted(() => {
      // 设置textarea值
      textareaRef.value.value = props.value;

      // 初始化
      instance = initialize(textareaRef.value, props.readonly, handleChange);
    });

    onBeforeUpdate(() => {
      if (externalEditingForbidden) {
        // 禁止外部编辑
        return;
      }

      // Remove the editor, and restore the original textarea
      instance.toTextArea();

      // 更新textarea值
      textareaRef.value.value = props.value;

      // 重新初始化
      instance = initialize(textareaRef.value, props.readonly, handleChange);
    });

    return {
      textareaRef,
      clickEmpty: e => {
        if (!e.target.className.includes('scrollbar__wrap')) {
          // 只有点击scrollbar元素时，生效
          return;
        }

        instance.focus();
        // Set the cursor at the end of existing content
        instance.setCursor(instance.lineCount(), 0);
      },
    };
  },
});
</script>

<style scoped lang="less">
.jm-dsl-editor {
  position: relative;
  z-index: 0;
  // 必须与codemirror主题背景保持一致
  background-color: #19253b;

  ::v-deep(.CodeMirror) {
    z-index: 0;
    height: inherit;
    background-color: #19253b;
    * {
      font-family: Hiragino Sans GB, sans-serif;
    }
    .CodeMirror-gutters {
      z-index: 0;
      background-color: #19253b;
    }

    .CodeMirror-linenumber {
      // 字体设为等宽
      font-family: 'Helvetica Neue';
      color: #c1d7ff;
      font-weight: 400;
      line-height: 25px;
    }
  }
}
</style>
