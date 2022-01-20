/*
 * @FilePath: /GS-admin/utils/request.ts
 * @author: Wibus
 * @Date: 2022-01-19 20:31:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-20 22:23:58
 * Coding With IU
 */
import { Message } from '@arco-design/web-react'
import axios, { AxiosError } from 'axios'
import { getToken } from './cookie'
import { isClientSide, isServerSide } from './main'
import camelcaseKeys from 'camelcase-keys'
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL || '/api',
  // withCredentials: true,
  timeout: 10000,
})

service.interceptors.request.use((config) => {
    const token = getToken()
    if (token && config.headers) {
      config.headers['Authorization'] = token
    }
    
    return config
})

service.interceptors.response.use(
  undefined,
  (error: AxiosError<Record<string, any> | undefined>) => {
    // if (process.env.NODE_ENV === 'development') {
    console.log(error.message)
    // }

    if (
      !error.response ||
      error.response.status === 408 ||
      error.code === 'ECONNABORTED'
    ) {
      if (isClientSide()) {
        Message.error('请求超时, 请检查一下网络哦!')
      } else {
        const msg = '上游服务器请求超时'
        Message.error(msg)
        console.error(msg, error.message)
      }
    }

    const response = error.response
    if (response) {
      const data = response.data

      if (data && data.message) {
        Message.error(
          typeof data.message == 'string'
            ? data.message
            : Array.isArray(data.message)
            ? data.message[0]
            : '请求错误',
        )
      }
    }

    return Promise.reject(error)
  },
)

export default service
