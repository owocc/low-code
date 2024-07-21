<script setup lang="ts">
// import { fn, x } from '@low-code/type-system'
import { computed, toRef, unref, watch, ref } from 'vue'
// import { CodeHighlight } from '@/components/common/code-highlight'
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

const lowCodeLogic1 = (params: Person, age: number) => {
  if (params.age > age) {
    return true
  }
  return false
}

// 这个对象和上面这段逻辑一样,就是描述这个逻辑的Json类型,用于调用这个逻辑,这个对象页应该是挂在app上,或者它现在就当作是app吧
const app = ref({
  name: 'lowCodeLogic1',
  params: [
    {
      concept: 'Params',
      name: 'params',
      type: 'Person'
    },
    {
      concept: 'Params',
      name: 'age',
      type: 'number'
    }
  ],
  returns: [
    {
      concept: 'Return',
      name: 'result',
      type: undefined // 如果没有手动的设置类型, 那么将在第一次赋值的时候自动推导
    }
  ],
  body: [
    {
      concept: 'Start'
    },
    // {
    //   concept: 'Assignment',
    //   left: {
    //     concept: 'Identifier',
    //     name: 'result'
    //   },
    //   right: {
    //     concept: 'String',
    //     value: true,
    //     type: 'string'
    //   }
    // },
    //因为这里是数组,所以我能知道顺序,必须得知道啊
    {
      concept: 'IfStatement',
      test: {
        concept: 'BinaryExpression',
        left: {
          concept: '>',
          left: {
            concept: 'MemberExpression',
            object: 'params',
            property: 'age'
          },
          right: {
            concept: 'Variable',
            name: 'age'
          }
        }
      },
      consequent: [
        // {
        //   concept: 'Assignment',
        //   left: {
        //     concept: 'Identifier',
        //     name: 'result'
        //   },
        //   right: {
        //     concept: 'Boolean',
        //     value: true,
        //     type: 'boolean'
        //   }
        // }
      ],
      alternate: []
    },
    {
      concept: 'Return'
    }
  ]
})

// 想一想,现在是解析它的类型,我现在是在求这个逻辑的result,这里是自动推导,
// 小目标,现在就是推导出 result 为 boolean,没有手动设置的情况下

//会给对象的reulst.__type = 设置类型,

//之类其实解析的时候应该是调用预制好的函数,不管是设置值还是设置类型,都是调用预制好的函数,比如return也可以呀,这样就可以解析出来了,return并不是真的调用return

//现在开始查找吧

// 自动推导变量的类型\

// const app = toRef(lowCodeLogicJson1)
const autoInferType = (root: Record<string, any>, varscope: string) => {
  //从对象上查找,寻找到所有的
  // 遍历root,找到所有 concept 为 Assignment 的
  const rootData = unref(root)
  //这里其实就是有不同 comcept 的处理函数去获取他们自己下面的节点数据,不过这里直接写了
  const assignment = []

  //其实只需要找到第一个,就可以返回了,因为只要找到一个,就可以推导出类型了,其余再找就是浪费内存了
  for (let i = 0; i < rootData.body.length; i++) {
    if (rootData.body[i].concept === 'Assignment') {
      assignment.push(rootData.body[i])
      return assignment[0].right.type
    }
    //没有找到,进入下一层,比如if,就是找 consequent 和 alternate
    else if (rootData.body[i].concept === 'IfStatement') {
      // 从if 的 consequent 和 alternate 中找
      const consequent = rootData.body[i].consequent
      const alternate = rootData.body[i].alternate
      for (let j = 0; j < consequent.length; j++) {
        if (consequent[j].concept === 'Assignment') {
          assignment.push(consequent[j])
          return assignment[0].right.type
        }
      }

      for (let j = 0; j < alternate.length; j++) {
        if (alternate[j].concept === 'Assignment') {
          assignment.push(alternate[j])
          return assignment[0].right.type
        }
      }
    }

    // return 'undefined'
  }

  //这里第一层当然是找不到,就需要第二层了
  // console.log()

  //上面就可以抽取逻辑,成为一个通用的逻辑,或者分文件,然后由一个方法进行调度就是了
}

const typec = ref('')

// const type = computed(() => autoInferType(app, 'result'))
watch(
  () => app,
  () => {
    console.log('app update')
    typec.value = autoInferType(app, 'result')
    console.log('type:', typec.value)
  },
  {
    deep: true
  }
)

const addNode = () => {
  app.value.body.push({
    concept: 'Assignment',
    left: {
      concept: 'Identifier',
      name: 'result'
    },
    right: {
      concept: 'Boolean',
      value: true,
      type: 'boolean'
    }
  })
  // .consequent.push({
  //   concept: 'Assignment',
  //   left: {
  //     concept: 'Identifier',
  //     name: 'result'
  //   },
  //   right: {
  //     concept: 'Boolean',
  //     value: true,
  //     type: 'boolean'
  //   }
  // })
}
</script>

<template>
  <main>
    <!-- {{ app }}
    <br />
    <br />
    <br />
    <hr />
    <br />
    <br />
    <br /> -->
    {{ typec }}
    <!-- <CodeHighlight :code="app" /> -->
    <button @click="addNode">Fn</button>
  </main>
</template>
