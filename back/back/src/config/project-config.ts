// 静态的一些数据,项目的一些配置

const projectConfig = {
  repo: ''
}
type ProjectConfigKeys = keyof typeof projectConfig
const getProjectConfig = (key: ProjectConfigKeys) => {}
