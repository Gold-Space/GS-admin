/*
 * @FilePath: /GS-admin/pages/login/index.tsx
 * @author: Wibus
 * @Date: 2022-01-19 20:37:52
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-20 22:51:47
 * Coding With IU
 */

import { Button, Form, Input, Message } from "@arco-design/web-react"
import { NextPage } from "next"
import Router from "next/router"
import { useEffect } from "react"
import { setToken } from "../../utils/cookie"
import $axios from "../../utils/request"

const LoginView: NextPage = () => {
  useEffect(() => {
    if (getToken()) {
      Router.push("/")
    }
  }, [])
  return (
    <>
      <style>
        {`
        .bg {
            position: fixed;
            inset: 0;
            --tw-bg-opacity: 1;
            // background-color: rgba(24,160,88,var(--tw-bg-opacity));
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            margin: -1rem;
        }
        .duration-700 {
            -webkit-transition-duration: 0.7s;
            -o-transition-duration: 0.7s;
            transition-duration: 0.7s;
        }
        .transition-opacity {
            -webkit-transition-property: opacity;
            -o-transition-property: opacity;
            transition-property: opacity;
            -webkit-transition-timing-function: cubic-bezier(.4,0,.2,1);
            -o-transition-timing-function: cubic-bezier(.4,0,.2,1);
            transition-timing-function: cubic-bezier(.4,0,.2,1);
            -webkit-transition-duration: 0.15s;
            -o-transition-duration: 0.15s;
            transition-duration: 0.15s;
        }
        .wrapper{
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          -webkit-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          transform: translate(-50%,-50%);
        }
        .avatar {
          --tw-bg-opacity: 1;
          background-color: rgba(221,221,221,var(--tw-bg-opacity));
          border-radius: 9999px;
          display: inline-block;
          overflow: hidden;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        input {
          position: relative;
          -webkit-text-fill-color: #eee;
          color: #eee;
          padding: 3px 14px;
          line-height: 1.8;
          backdrop-filter: blur(24px);
          --tw-bg-opacity: 1;
          background-color: rgba(255,255,255,var(--tw-bg-opacity));
          --tw-bg-opacity: .2;
          border-radius: 1.5rem;
          letter-spacing: .05em;
        }
        .arco-input {
          background-color: inherit !important;
      }
      `}
      </style>
      <div className="bg transition-opacity duration-700" style={{ opacity: 1, backgroundImage: 'url("https://gitee.com/xun7788/my-imagination/raw/master/images/88426823_p0.jpg")' }}>
        <div className="wrapper">
          <div className="avatar" style={{ height: 80, width: 80 }}>
            <img src="https://avatars.githubusercontent.com/u/62133302?s=5000" alt="head_img" />
          </div>
          <Form 
          size="large" 
          autoComplete="off"
          onSubmit={(v) => {
            console.log(v);
            $axios.post('/auth/login', v).then(res => {
              const a = res as any;
              Message.success("登录成功，正在跳转");
              setToken(a.data, a.data.exires);
              Router.push("/");
            }).catch(err => {
              Message.error("登录失败，请前往控制台查看错误");
              console.log(err); 
            }
            )}
          }>
            <Form.Item 
            field='username'
            rules={[{ required: true, message: 'Required' }]}
            wrapperCol={{}}
            style={{marginTop: 20}}
            >
              <Input placeholder="输入用户名" />
            </Form.Item>
            <Form.Item 
              rules={[{ required: true, message: 'Required' }]}
              field='password'
              wrapperCol={{}}
            >
              <Input placeholder="输入密码" />
            </Form.Item>
            <Form.Item
              
              style={{display:'flex',alignItems:'center',justifyContent:'center', width: 'auto', flexDirection: 'column'}}
              wrapperCol={{span:0}}
            >
              <Button type='secondary' htmlType='submit'>Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LoginView