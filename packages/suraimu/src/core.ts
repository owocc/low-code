import type { MapOperation, MapOptions, MapOptionsKey, MapKeyOptions, RecordMap } from '../types/index'

const defineMap = <T = any>(map: RecordMap<T>) => map


// 定义map

const x = defineMap<{ name: string }>({
    name: 'dsad'
})



const suraimu = <T>(map: RecordMap<T>) => {
    for(const [key,option] of Object.entries(map)){
        
    }
    // switch (true) {
    //     case Array.isArray(map):
    //         break
    //     case typeof map === 'object' && map != null:
    //         for (const item in map) {

    //         }
    //         break
    //     default:
    //         break
    // }
}
const f = suraimu<{ name: string }>(x)
