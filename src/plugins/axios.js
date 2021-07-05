import axios from 'axios'
import {
  notification
} from 'ant-design-vue'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送 cookie
  timeout: 30000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    return config
  },
  error => {
    // 处理请求错误
    const { message } = error;
    notification.error({
      message: '提示',
      description: message
    });

    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果想获得http信息，如头信息或状态信息
   * 请返回响应 => response
   */

  /**
   * 通过自定义代码确定请求状态
   */
  response => {
    const { data: res } = response;
    if (res.code != 200) {
      const { message } = res;
      if (res.code === 201) {
        notification.info({
          message: '提示',
          description: message
        });
        return res;
      }
      notification.error({
        message: '提示',
        description: message
      });
      return Promise.reject(new Error(message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const { response, message } = error;
    notification.error({
      message: '提示',
      description: message
    });
    return Promise.reject(error)
  }
)

export default service
