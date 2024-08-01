import { expect, test } from 'vitest'
import { transformserObject, defineTransformersMap } from '../src/back'


test('测试基本对象的转换', () => {

    //使用时为了更明确自己在干什么，都分开操作

    //如果需要更复杂的可以使用对象，普通的可以使用字符串
    const testMap = {
        name: {
            key: ['mingzi'],// 要获取的对象key数组，优先匹配到会使用
            // operation: ['array'],//这里会按照顺序执行操作符
            children: [
                {
                    info: { //子级属性

                    }
                }
            ]
        },
        gender: 'name',//通用
        age: ['name'] //通用
    }

    const testData1 = {
        mingzi: 'owocc',
        xingbie: 'male',
        nianling: '∞'
    }

    interface Info {
        name: string,
        gender: string,
        age: string
    }

    const map = defineTransformersMap<Info>({
        name: 'mingzi',
        gender: 'xingbie',
        age: 'nianling',
    })

    const result: Info = {
        age: '∞',
        gender: 'male',
        name: 'owocc'
    }

    // const { transformObj } = transformserObject(map)
    // expect(transformObj(testData1)).toStrictEqual(result)
})


test('测试复杂对象转换', () => {
    // interface RestFulApi1 {
    //     id: number
    //     name: string
    //     age: number,
    //     info: {
    //         address: string,
    //         phone: string
    //     }
    // }

    // interface RestFulApi2 {
    //     id: number
    //     name: string
    //     age: number,
    //     address: string,
    //     phone: string
    // }

    const testData1 = {
        mingzi: 'owocc',
        xingbie: 'male',
        nianling: '∞',
        xinxi: {
            dizhi: 'china'
        }
    }

    interface Info {
        name: string,
        gender: string,
        age: string,
        address: string
    }

    const map = defineTransformersMap<Info>({
        name: 'mingzi',
        gender: 'xingbie',
        age: 'nianling',
        address: 'xinxi.dizhi'
    })


    // 期待结果
    const result: Info = {
        age: '∞',
        gender: 'male',
        name: 'owocc',
        address: 'china'
    }

    // const { transformObj } = transformserObject(map)
    // expect(transformObj(testData1)).toStrictEqual(result)
})