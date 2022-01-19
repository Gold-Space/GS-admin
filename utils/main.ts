/*
 * @FilePath: /GS-admin/utils/main.ts
 * @author: Wibus
 * @Date: 2022-01-19 20:33:52
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-19 20:33:53
 * Coding With IU
 */
export const isClientSide = () => {
  return typeof window !== 'undefined'
}
export const isServerSide = () => {
  return !isClientSide()
}