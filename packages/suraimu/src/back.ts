// 一个通用的数据转换器，可以将一个对象或者对象数组转换为另一个对象或者对象数组,支持嵌套转换
// 可以用 type 描述返回后类型,解析还未实现

type KeyMap = Record<string | number | symbol, any>
type AnyObject = Record<string, any>

const getValueByPath = (obj: AnyObject, path: string): any => {

    if (typeof path !== 'string') {
        return null
    }

    const paths = path.split('|')


    for (const p of paths) {
        const value = p
            .split('.')
            .reduce(
                (acc, part) => (acc && acc[part] !== undefined ? acc[part] : null),
                obj
            )
        if (value !== null && value !== undefined) {
            return value
        }
    }
    return null
}

const applyOperations = (value: any, operations: string[]): any => {
    return operations.reduce((acc, operation) => {
        switch (operation) {
            case 'array':
                return Array.isArray(acc) ? acc : acc !== null ? [acc] : []
            case 'parse':
                try {
                    if (typeof acc === 'string') {
                        return acc.trim() == '' ? null : JSON.parse(acc)
                    }
                    return acc
                } catch {
                    return null
                }
            // 可以在这里添加更多操作
            default:
                return acc
        }
    }, value)
}

const parsePathAndOperations = (
    path: any
): { path: string; operations: string[] } => {

    let temp: string = ''
    if (typeof path === 'object') {
        console.log(path)
    }
    switch (true) {
        case typeof path === 'string':
            temp = path
            break
        case typeof path === 'object':
            if (path.__key__) {
                // parsePathAndOperations(path.__key__)
                temp = path.__key__
            }
            break
    }

    const [parsedPath, ...operations] = temp.split('&')
    return { path: parsedPath, operations }
}


// 一些帮助方法，在这里导出

export const defineTransformersMap = <T>(map: Partial<Record<keyof T, any>>) =>
    map

export const transformserObject = <T, R>(map: KeyMap) => {
    const transformObj = (obj: AnyObject): R => {
        const result: AnyObject = {}
        for (const [newKey, oldKey] of Object.entries(map)) {

            //解析出 path 和 operations
            const { path, operations } = parsePathAndOperations(oldKey)
            let value = getValueByPath(obj, path)
            //操作符处理,如果有操作符,则执行,否则直接赋值
            if (operations.length > 0) {
                value = applyOperations(value, operations)
            }

            switch (true) {
                case Array.isArray(value) && operations.includes('extend'):
                    result[newKey] = value.map(transformObj)
                    break
                case Array.isArray(value) && typeof oldKey === 'object':
                    {
                        const newMap = JSON.parse(JSON.stringify(oldKey))
                        delete newMap.__key__
                        const { transformObj: transformSonObj } = transformserObject(newMap)
                        result[newKey] = value.map((item) => {
                            return transformSonObj(item)
                        })
                    }
                    break
                case typeof oldKey === 'object' && value !== null:
                    {
                        console.log('....')
                        if (oldKey.__key__) {

                        } else {
                            console.log(oldKey)
                        }

                        const nweMap = JSON.parse(JSON.stringify(oldKey))
                        delete nweMap.__key__
                        //还有一种可能就是需要从顶级开始转换,比如



                        //要转换上面这种情况,可能需要是一个新的map,也可能直接从当前对象身上取值
                        console.log(value)
                        //创建新的Map映射,然后递归调用
                        const { transformObj: transformSonObj } = transformserObject(nweMap)
                        result[newKey] = transformSonObj(value)
                    }
                    break
                default:
                    result[newKey] = value !== undefined ? value : null
                    break
            }
        }
        return result as R

    }

    const parse = (obj: any): T => {
        // 未实现
        return {} as T
    }

    return {
        transformObj,
        parse
    }
}

// 数组对象转换,这里只是简单的调用,如果有嵌套,则需要递归调用
export const transformserArray = <T, R>(map: KeyMap) => {
    const { transformObj, parse } = transformserObject<T, R>(map)
    const transformArray = (array: AnyObject[]): R[] => {
        return array.map((item) => transformObj(item))
    }
    return {
        transformArray
    }
}