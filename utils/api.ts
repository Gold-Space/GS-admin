/*
 * @FilePath: /GS-admin/utils/api.ts
 * @author: Wibus
 * @Date: 2022-01-20 20:55:21
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-20 20:58:51
 * Coding With IU
 */

import $axios from './request'

// get请求
export const get = (url: string, params?: any) => {
  return $axios.get(url, {
    params,
  })
}
// post请求
export const post = (url: string, data?: any) => {
  return $axios.post(url, data)
}