<script setup lang="ts">
import { ref } from 'vue'
import BackTest from './components/back/test.vue'
import { defineTransformersMap, transformserObject, transformserArray } from '@web/utils/transformer'

interface RestFulApi1 {
  id: number
  userName: string
  age: number,
  info: {
    address: string,
    phone: string
  }
}

interface RestFulApi2 {
  id: number
  name: string
  age: number,
  address: string,
  phone: string
}

const testDatas: Array<RestFulApi1 | RestFulApi2> = [
  {
    id: 1,
    userName: '张三',
    age: 18,
    info: {
      address: '北京',
      phone: '123456789'
    }
  },
  {
    id: 2,
    name: '李四',
    age: 20,
    address: '上海',
    phone: '987654321'
  },
  {
    id: 3,
    userName: '王五',
    age: 22,
    info: {
      address: '广州',
      phone: '123456789'
    }
  }
]

interface RestFulApi {
  id: number
  name: string
  age: number
  userInfo: {

    address: string
    phone: string
  }
}

const restFulApiMap = defineTransformersMap<RestFulApi>({
  id: 'id',
  name: 'name|userName',
  age: 'age',
  userInfo: {
    address: 'address',
    phone: 'phone'
  }
})


const testData = ref()

const test = () => {
  const { transformArray } = transformserArray(restFulApiMap)

  testData.value = transformArray(testDatas)
}
test()
</script>

<template>
  <div class="p-2 grid grid-cols-12 gap-2 h-screen w-screen bg-orange-50">
    <aside class="col-span-3">
      <div class="border p-2 bg-orange-500 text-white rounded-lg">
        在网络世界中,有时候很多api接口他们可能功能一样,不过返回的JSON字段不太一样,又或者是你的缺德后端定义的字段,这里改那里改,虽然他们功能一样,但就是字段对不上,这时候就可以套娃🪆转换一次
      </div>
    </aside>
    <main class="col-span-9">
      <ul>
        <li>
          <section class="flex flex-col gap-2">
            <header class="p-2 border bg-orange-700 text-white rounded-lg">
              <b>可能性1:</b>
              <br>
              <p>比如这里有两个RestFul接口返回的数据库内容,但他们信息是一样的,就像下面这两个接口定义,一个是 db1 的数据,一个是 db2 的数据,他们都传递了需要的东西,name
                、id、age、phone、address,唯一不同的是 RestFulApi1 将 address 和 phone 包裹在了 info 属性中 </p>
            </header>
            <div>
              <div class="grid grid-cols-2 gap-2">
                <pre class="border p-2 bg-white rounded-lg">
interface RestFulApi1 {
  id: number
  name: string
  age: number,
  info: {
    address: string,
    phone: string
  }
}
</pre>
                <pre class="border p-2 bg-white rounded-lg">
interface RestFulApi2 {
  id: number
  name: string
  age: number,
  address: string,
  phone: string
}
</pre>

              </div>
            </div>
            <div class="grid-cols-2">
              <div v-for="item in testData">
                {{ item }}
              </div>
            </div>
          </section>

        </li>
      </ul>
    </main>
  </div>
</template>
