import axios from 'axios'

export function request(config){ //success error
  //创建axios实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
  //拦截器
  axios.interceptors.request.use(config => {
    console.log(config)
    //比如config中的一些信息不符合服务器的要求
    //比如每次发送网络请求时，希望显示一个请求图标
    //某些网络请求必须携带如token，
    return config
  },err => {
    console.log(err)
  })

  //发送真正的网络请求
  instance(config)
}