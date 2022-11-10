import request from '../../utils/request'
 
//公共请求方法
export function commonMethod(url,method,params) {
  return request({
    url: url,
    method: method,
    params: params,
    hideloading: true
  })
}
