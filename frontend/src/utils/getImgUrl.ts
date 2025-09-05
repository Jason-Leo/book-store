export const getImgUrl = (name:string, type: number)=>{
    return type === 1
    ? new URL(`../assets/books/${name}`,import.meta.url)
    : new URL(`../assets/news/${name}`,import.meta.url)
    ;
}