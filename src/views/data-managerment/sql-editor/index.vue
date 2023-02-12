<template>
    <CommonPage show-footer>
        <div class="app-container">
            <n-card shadow="never" >
                <div class="editor-tools">
                    <el-form-item>
                    <n-button type="primary" @click="handleExecution">解析</n-button>
                    <n-button @click="resetEditor">重置</n-button>
                    </el-form-item>
                </div>
                <div class="editor-wrapper">
                    <codemirror
                    v-model="code"
                    placeholder="Code goes here..."
                    :style="{ height: '400px'}"
                    :autofocus="true"
                    :indent-with-tab="true"
                    :tab-size="2"
                    :extensions="extensions"
                    @ready="handleReady"
                    @change="log('change', $event)"
                    @focus="log('focus', $event)"
                    @blur="log('blur', $event)"
                    />
                </div>
            </n-card>
        </div>
    </CommonPage>
</template>

<script setup>

import { defineComponent,ref,shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
//import { javascript } from '@codemirror/lang-javascript'
import { sql } from '@codemirror/lang-sql'
//import { useCodeStore } from '@/store/editor/code'

const code = ref(`select * from users;`)
const extensions = [ sql() ] //javascript() 

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  
}

const log = console.log;

const resetEditor = () => {
  //code.value = useCodeStore().resetCode();
  //"select * from users;"
  console.log('resetEditor')
  
}

const handleExecution = () =>{
  console.log('handleExecution')
  //useCodeStore().parseCode(code.value);
}


</script>

<style lang="scss" scoped>


.editor-tools {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.editor-wrapper {
  margin-bottom: 5px;
}

</style>