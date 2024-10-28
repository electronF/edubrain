function capitalize(value:string){
    return value.substring(0, 1).toLocaleUpperCase() + value.substring(1).toLocaleLowerCase();
}

export {capitalize}