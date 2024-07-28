
interface Tr1 {
    name: string,
    age: string,
    aa: string,
    xinix: {
        name: string,
        age: string,
        aa: string,
    }
}

interface Tr2 {
    key: string,
    ag: string,
    bb: string,
    xdsa: {
        key: string,
        ag: string,
        bb: string,
    }
}

interface Tr3 {
    key: string,
    ag: string,
    fff: string,
    dsv: {
        key: string,
        ag: string,
        fff: string,
    },
    children: Tr3[]
}

interface To {
    name: string
    age: string
    desc: string,
    children: Tr3[]
    info: {
        name: string,
        age: string,
        desc: string,
    },
    sturct: {
        name: string,
        age: string,
        desc: string,
    }[]
}


const map = defineTransformersMap<To>({
    name: 'name|key',
    age: 'age|ag',
    desc: 'desc|fff|aa',
    children: 'children&extend',
    info: {
        __key__: 'xinix|dsv',
        name: 'name|key',
        age: 'age|ag',
        desc: 'desc|fff|aa',
    },
    sturct: {
        __key__: 'children',
        avg: 'name|key',
    }
})


export const testV = () => {
    const { transformObj, parse } = transformserObject<Tr1 | Tr2 | Tr3, To>(map)
    console.log(transformObj({
        name: 'dasd',
        ag: 'sads',
        fff: 'dsad',
        dsv: {
            name: 'dasd',
            ag: 'sads',
            fff: 'dsad',
        },
        children: [
            {
                ace: '1',
                ag: 'sads',
                fff: 'dsad',
            },
            {
                name: '2',
                ag: 'sads',
                fff: 'dsad',
            }
        ]
    }))
}

testV()