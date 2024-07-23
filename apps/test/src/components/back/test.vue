<script setup lang="ts">
import { appInitData, generateTestData, autoInferType } from './test'
import { computed, toRef, unref, watch, ref, onMounted } from 'vue'
import { CodeHighlight } from '@/components/common/code-highlight'
// test1
// 解析下面这个对象

//  比如这个方法是一个低代码逻辑,这个简单的方法就是判断

class Person {
  age: number
  name: string
  constructor(age: number, name: string) {
    this.age = age
    this.name = name
  }
}

class Variable {
  value: any
  constructor(value: any) {
    this.value = value
  }
}

const defineVariable = (value: any) => {
  return new Variable(value)
}

const app = ref(generateTestData())
const test = () => {
  app.value.logics.push({ dsads: 'dsad' })
}

const codePreview = ref({
  visible: true
})

const switchCodePreview = () => {
  codePreview.value.visible = !codePreview.value.visible
}

onMounted(()=>{
  console.log(autoInferType(app,'name'))
})
</script>

<template>
  <main
    class="flex flex-col p-2 h-screen w-screen bg-gradient-to-br from-purple-950 to-slate-950 text-white overflow-hidden gap-4"
  >
    <header class="flex relative p-6 bg-white/5 border border-white/10 rounded-lg flex-shrink-0">
      <button
        class="p-2 bg-gradient-to-br from-blue-600 to-blue-900 rounded-lg shadow-xl shadow-blue-600/50 text-sm"
      >
        JSON 查看
      </button>
    </header>

    <main class="flex gap-4 flex-1">
      <aside class="p-2 border bg-white/10 border-white/20 w-72 flex-shrink-0 rounded-lg">
        <section>
          <header>
            <b>Page</b>
          </header>
        </section>

        <section>
          <header>
            <b>Logic</b>
          </header>
        </section>
      </aside>

      <div class="flex-1 p-2 flex flex-col bg-white/5 border border-white/20 rounded-lg">
        <div class="bg-white/10 rounded-lg backdrop-blur-lg flex flex-col p-2">
          <header class="flex justify-between items-center">
            <h1>Json 预览</h1>
            <button class="text-sm" @click="switchCodePreview">
              {{ codePreview.visible ? '隐藏' : '显示' }}
            </button>
          </header>
          <div
            class="bg-[#1A1B26] rounded-lg overflow-y-auto transition-all"
            :class="{
              'h-0 opacity-0': !codePreview.visible,
              'h-96 mt-2 p-2 opacity-100': codePreview.visible
            }"
          >
            <CodeHighlight :code="app" />
          </div>
        </div>
        <button class="btn" @click="test">添加数据</button>
      </div>
    </main>
  </main>
</template>
