const debounce=async (args,func)=> {
    let timeoutId='';
    console.log(args)
        clearTimeout(timeoutId)
        timeoutId=setTimeout(async()=>{
        },1000)
    
}
export default debounce