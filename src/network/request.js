import axios from 'axios'

export function request(config){ //success error
  //创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
  })
  //拦截器
  axios.interceptors.request.use(config => {
    console.log(config)
    //比如config中的一些信息不符合服务器的要求
    //比如每次发送网络请求时，希望显示一个请求图标
    //某些网络请求必须携带如token
    return config
  },err => {
    console.log(err)
  })

  axios.interceptors.response.use(res => {
    return res
  },err => {
    console.log(err)
  })

  //发送真正的网络请求
  return instance(config)
}

// request({
//   url:'/home/multidata'
// }).then(res=>{
//   console.log(res)
// })