import { unref } from 'vue'
abstract class BaseNode {
  concept: string = 'BaseNode'
  composedBy?: Array<string>
}

abstract class LogicItem extends BaseNode {}

export class Start extends LogicItem {
  concept: string = 'LogicItem'
  constructor() {
    super()
    this.concept = 'Start'
  }
}

export class End extends LogicItem {
  concept: string
  constructor() {
    super()
    this.concept = 'End'
  }
}
type Operator =
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '=='
  | '!='
  | '>'
  | '<'
  | '>='
  | '<='
  | '&&'
  | '||'
  | 'startwith'
  | 'endwith'
  | 'like'
  | 'in'
  | 'contains'

export class BinaryExpression extends LogicItem {
  left: LogicItem
  right: LogicItem
  operator: Operator
  constructor(operator: Operator, left: LogicItem, right: LogicItem) {
    super()
    this.left = left
    this.right = right
    this.operator = operator
  }
}
export class Assignment extends LogicItem {
  left: LogicItem
  right: LogicItem
  constructor(left: LogicItem, right: LogicItem) {
    super()
    this.left = left
    this.right = right
  }
}
export class IfStatement extends LogicItem {
  test: LogicItem
  consequent: Array<LogicItem>
  alternate: Array<LogicItem>
  concept: string = 'IfStatement'
  constructor(test: LogicItem) {
    super()
    this.test = test
    this.consequent = []
    this.alternate = []
  }
}

export class App {
  logics: any[]
  constructor() {
    this.logics = []
    this.logics.push(new Start())
    // this.logics.push(new End())
  }
}

class Param extends BaseNode {
  name: string = ''
  // description?: string
  concept: string = 'Param'
  constructor(name: string) {
    super()
    this.name = name
  }
  // defaultValue?: DefaultValue
}

class BooleanLiteral extends LogicItem {
  value: boolean
  concept: string = 'BooleanLiteral'
  constructor(value: boolean) {
    super()
    this.value = value
  }
}

class Variable extends BaseNode {
  name: string = ''
  concept: string = 'Variable'
  __type: string = ''
  // description?: string;
  // typeAnnotation: TypeAnnotation;
  // defaultValue?: DefaultValue;
  constructor(name: string) {
    super()
    this.name = name
  }
}

class Identifier extends LogicItem {
  // namespace: string
  name: string = ''
  concept: string = 'Identifier'
  constructor(name: string) {
    super()
    this.name = name
  }
}
export class Logic extends BaseNode {
  body: LogicItem[]
  params: Param[]
  variables: Variable[]
  constructor() {
    super()
    this.concept = 'Logic'
    this.body = []
    this.params = []
    this.variables = []
  }
}

// 测试数据
class NullLiteral extends LogicItem {
  concept: string = 'NullLiteral'
}
const appInitData = new App()
const generateTestData = () => {
  // 这里相当于这么一段逻辑
  // const lowCodeLogic1 = (params: Person, age: number) => {
  //   if (params.name == null) {
  //     return null //第一个设置的,类型应该为这个
  //   }
  //   return false
  // }

  const appData = new App()
  // appData.logics.push
  const logic1 = new Logic()
  logic1.params.push(new Param('a'))
  logic1.params.push(new Param('b'))
  logic1.variables.push(new Variable('name'))
  appData.logics.push(logic1)
  const bind = new BinaryExpression('==', new Identifier('name'), new NullLiteral())
  const ifB = new IfStatement(bind)
  const as1 = new Assignment(new Identifier('name'), new NullLiteral())
  ifB.consequent.push(as1)
  const as2 = new Assignment(new Identifier('name'), new BooleanLiteral(true))
  ifB.alternate.push(as2)

  logic1.body.push(ifB)

  return appData
}

// 想一想,现在是解析它的类型,我现在是在求这个逻辑的result,这里是自动推导,
// 小目标,现在就是推导出 result 为 boolean,没有手动设置的情况下

//会给对象的reulst.__type = 设置类型,

//之类其实解析的时候应该是调用预制好的函数,不管是设置值还是设置类型,都是调用预制好的函数,比如return也可以呀,这样就可以解析出来了,return并不是真的调用return

//现在开始查找吧

// 自动推导变量的类型\

const autoInferType = (root: Record<string, any>, varscope: string) => {
  //从对象上查找,寻找到所有的
  // 遍历root,找到所有 concept 为 Variable 的并为他们查找类型为 Assignment 的第一个进行设置自动类型
  const rootData = unref(root)
  //这里其实就是有不同 comcept 的处理函数去获取他们自己下面的节点数据,不过这里直接写了
  const assignment = []

  console.log(rootData)

  //寻找 variable 的类型,要递归查找,从对象和数组中查找
  const findVariable = (rootData: Record<string, any>, varscope: string) => {
    //  判断是否是数组和对象区别对待
    if (Array.isArray(rootData)) {
      for (let i = 0; i < rootData.length; i++) {
        if (rootData[i].concept === 'Variable' && rootData[i].name === varscope) {
          return findAssignment(rootData[i])
        } else {
          return findVariable(rootData[i], varscope)
        }
      }
    }
  }

  const findAssignment = (rootData: Record<string, any>) => {
    if (Array.isArray(rootData)) {
      for (let i = 0; i < rootData.length; i++) {
        if (rootData[i].concept === 'Assignment') {
          return rootData[i].right.type
        } else {
          return findAssignment(rootData[i])
        }
      }
    }
  }

  console.log(findVariable(rootData, varscope))

  //其实只需要找到第一个,就可以返回了,因为只要找到一个,就可以推导出类型了,其余再找就是浪费内存了
  // for (let i = 0; i < rootData.body.length; i++) {
  //   if (rootData.body[i].concept === 'Assignment') {
  //     assignment.push(rootData.body[i])
  //     return assignment[0].right.type
  //   }
  //   //没有找到,进入下一层,比如if,就是找 consequent 和 alternate
  //   else if (rootData.body[i].concept === 'IfStatement') {
  //     // 从if 的 consequent 和 alternate 中找
  //     const consequent = rootData.body[i].consequent
  //     const alternate = rootData.body[i].alternate
  //     for (let j = 0; j < consequent.length; j++) {
  //       if (consequent[j].concept === 'Assignment') {
  //         assignment.push(consequent[j])
  //         return assignment[0].right.type
  //       }
  //     }

  //     for (let j = 0; j < alternate.length; j++) {
  //       if (alternate[j].concept === 'Assignment') {
  //         assignment.push(alternate[j])
  //         return assignment[0].right.type
  //       }
  //     }
  //   }
  // }
}

export { appInitData, generateTestData, autoInferType }

// 这个对象和上面这段逻辑一样,就是描述这个逻辑的Json类型,用于调用这个逻辑,这个对象页应该是挂在app上,或者它现在就当作是app吧
// const app = ref({
//   name: 'lowCodeLogic1',
//   params: [
//     {
//       concept: 'Params',
//       name: 'params',
//       type: 'Person'
//     },
//     {
//       concept: 'Params',
//       name: 'age',
//       type: 'number'
//     }
//   ],
//   returns: [
//     {
//       concept: 'Return',
//       name: 'result',
//       type: undefined // 如果没有手动的设置类型, 那么将在第一次赋值的时候自动推导
//     }
//   ],
//   body: [
//     {
//       concept: 'Start'
//     },
//     // {
//     //   concept: 'Assignment',
//     //   left: {
//     //     concept: 'Identifier',
//     //     name: 'result'
//     //   },
//     //   right: {
//     //     concept: 'String',
//     //     value: true,
//     //     type: 'string'
//     //   }
//     // },
//     //因为这里是数组,所以我能知道顺序,必须得知道啊
//     {
//       concept: 'IfStatement',
//       test: {
//         concept: 'BinaryExpression',
//         left: {
//           concept: '>',
//           left: {
//             concept: 'MemberExpression',
//             object: 'params',
//             property: 'age'
//           },
//           right: {
//             concept: 'Variable',
//             name: 'age'
//           }
//         }
//       },
//       consequent: [
//         // {
//         //   concept: 'Assignment',
//         //   left: {
//         //     concept: 'Identifier',
//         //     name: 'result'
//         //   },
//         //   right: {
//         //     concept: 'Boolean',
//         //     value: true,
//         //     type: 'boolean'
//         //   }
//         // }
//       ],
//       alternate: []
//     },
//     {
//       concept: 'Return'
//     }
//   ]
// })
