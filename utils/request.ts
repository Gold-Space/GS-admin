/*
 * @FilePath: /GS-admin/utils/request.ts
 * @author: Wibus
 * @Date: 2022-01-19 20:31:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-19 20:57:19
 * Coding With IU
 */
import { Message } from '@arco-design/web-react'
import axios, { AxiosError } from 'axios'
import { getToken } from './cookie'
import { isClientSide, isServerSide } from './main'
import camelcaseKeys from 'camelcase-keys'
const service = axios.create({
  baseURL: process.env.APIURL || '/api',
  // withCredentials: true,
  timeout: 10000,
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (!config) {
      config = {};
    }
    if (!config.headers) {
        config.headers = {};
    }
    if (token) {
      config.headers['Authorization'] = 'bearer ' + getToken()
    }

    return config
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error.message)
    }

    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const res = camelcaseKeys(response.data, { deep: true })
    return res
  },
  (error: AxiosError<Record<string, any> | undefined>) => {
    if (
      !error.response ||
      error.response.status === 408 ||
      error.code === 'ECONNABORTED'
    ) {
      const next = ({
        data,
        statusCode,
      }: {
        data?: string
        statusCode?: number
      }) => {
        if (typeof document !== 'undefined') {
          data && Message.error(data)
        }
        Promise.reject({
          statusCode,
          data,
          message: data,
        })
      }

      return next({
        statusCode: 408,
        data: isServerSide()
          ? '上游服务器连接超时'
          : '连接超时, 请检查一下网络哦!',
      })
    }
    if (isClientSide()) {
      if (error.response.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.map((m) => {
            Message.error(m)
          })
        } else Message.error(error.response.data.message)
      } else {
        Message.error('网络好像出现了点问题呢')
      }
    }

    return Promise.reject({
      statusCode: error.response.status,
      data: error.response.data,
    })
  },
)

export default service
