export const getImgUrl = (name:string, type: number)=>{
    // 如果是上传的图片路径（以 /uploads/ 开头），直接返回完整URL
    if (name.startsWith('/uploads/')) {
        return `http://127.0.0.1:5000${name}`;
    }
    
    // 否则使用本地资源
    return type === 1
    ? new URL(`../assets/books/${name}`,import.meta.url)
    : new URL(`../assets/news/${name}`,import.meta.url)
    ;
}