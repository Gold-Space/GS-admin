import { useEffect, useState } from "react"
import axios from "axios"
/*
 * @FilePath: /GS-admin/components/Stats.tsx
 * @author: Wibus
 * @Date: 2022-01-19 20:12:03
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-19 20:16:14
 * Coding With IU
 */
export const Stats = () => {

  // 通过axios获取数据
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/stats").then(res => {
      setData(res.data);
    });
  }, []);
  

  return (
    <>
      
    </>
  )

}