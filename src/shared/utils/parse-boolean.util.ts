export function parseBoolean(value:string):boolean{
    if( typeof value === 'boolean'){
        return value
    }

    if(typeof value === 'string'){
        const loverValue = value.toLowerCase().trim()
        if(loverValue === 'true'){
            return true
        }
        if(loverValue === 'false'){
            return false
        }
    }

    throw new Error(`Error: value ${value} is not boolean, we expect string or boolean`)
}