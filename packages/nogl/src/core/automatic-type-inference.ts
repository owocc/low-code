interface App {
  pages: any[]
  logics: any[]
}

// 支持从整个 app 树中自动推导出当前所有变量的类型
const AutomaticTypeInference = (app: App) => {}
