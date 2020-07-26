export function debounce(func,wait,immediate){
  let timeout = null
  let args = arguments
  let that = this
  return function(){
      if(timeout) clearTimeout(timeout)
      if(immediate){
          let callNow = !timeout
          timeout = setTimeout(function(){
              timeout = null  //到时间后,定时器自动设为null,不仅方便判断定时器状态还能避免内存泄露
          },wait)
          if(callNow) func.apply(that,args) //可以立即执行函数
      }else{
          timeout = setTimeout(function(){
          func.apply(that,args)
          },wait)
      }
  }
}
