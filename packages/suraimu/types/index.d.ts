export type KeyMap = Record<string | number | symbol, any>
export type AnyObject = Record<string, any>

export type MapOptionsKey = string | Array<string>
export type MapOperation = 'array' | 'object'

export interface MapOptions {
    key: MapOptionsKey
    operation?: MapOperation[]
    children?: MapOptions[]
}

export type MapKeyOptions = MapOptionsKey | MapOptions

export type RecordMap<T extends AnyObject> = Record<keyof T, MapKeyOptions>