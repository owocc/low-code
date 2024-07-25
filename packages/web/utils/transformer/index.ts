// 将这种对象

const obj = [
  {
    name: 'option',
    type: 'str',
    value: '1',
    children: [
      {
        name: 'option',
        type: 'str',
        value: '2',
        children: [
          {
            name: 'option',
            type: 'str',
            value: '3',
          },
        ],
      },
    ],
    nf: {
      nihao: 'haoah',
    },
  },
  {
    name: 'option',
    type: 'str',
    value: '1',
    children: [
      {
        name: 'option',
        type: 'str',
        value: '2',
        children: [
          {
            name: 'option',
            type: 'str',
            value: '3',
          },
        ],
      },
    ],
    nf: {
      nihao: 'haoah',
    },
  },
]

const transTo = {
  key: 'option',
  type: 'str',
  value: '1',
  stu: [
    {
      name: 'option',
      type: 'str',
      value: '2',
      stu: [
        {
          name: 'option',
          type: 'str',
          value: '3',
        },
      ],
    },
  ],
  trans: {
    hello: 'haoah',
  },
}

// 就是要将对象的 key 转换成 stu,或者是不指定的,提供一个json map,下面的函数根据这个map转换对象

const tMap = {
  key: 'name',
  stu: 'children', //这里如果是数组,就是数组的每一个都要转换,这里要如何处理呢..就没一个都判断一下,如果是数组就递归调用,如果是对象呢,就直接给它
  type: 'type',
  value: 'value',
  trans: {
    hello: 'nf.nihao',
  },
}

export const transform = <T extends Record<string, any>>(map: T) => {
  const then = () => {}
  const pipe = () => {}
  return {
    then,
    pipe,
  }
}

type TMap = Record<string | number | symbol, any>
type AnyObject = Record<string, any>

function getValueByPath(obj: AnyObject, path: string): any {
  return path
    .split('.')
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : null),
      obj
    )
}

export function transformObject<Result extends AnyObject>(
  obj: AnyObject,
  map: TMap
): Result {
  const result: AnyObject = {}

  for (const [newKey, oldKey] of Object.entries(map)) {
    if (Array.isArray(obj[oldKey])) {
      result[newKey] = obj[oldKey].map((item: AnyObject) =>
        transformObject(item, map)
      )
    } else if (typeof oldKey === 'object') {
      result[newKey] = transformObject(obj, oldKey)
    } else {
      const value = getValueByPath(obj, oldKey)
      result[newKey] = value !== undefined ? value : null
    }
  }

  return result as Result
}

export function transformArray<Result extends AnyObject>(
  array: AnyObject[],
  map: TMap
): Result[] {
  return array.map((item) => transformObject(item, map))
}
type TType = {
  key: string
  stu: TType[]
  type: string
  value: string
  trans: {
    hello: string
  }
}
export const test = () => {
  return transformArray<TType>(obj, tMap)
}
