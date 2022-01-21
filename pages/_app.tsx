import '../styles/globals.css'
import "@arco-design/web-react/dist/css/arco.css";
import type { AppProps } from 'next/app'
import QP from 'qier-progress'
import Router from 'next/router';
import { useCallback } from 'react';
import { useMount } from 'react-use';
import { Message } from '@arco-design/web-react';
import { getToken } from '../utils/cookie';
import $axios from '../utils/request';

function App({ Component, pageProps }: AppProps) {
  useMount(() => {
    if (getToken()) {
      // 新增计时器
      setInterval(() => {
        $axios.get("/super/ping").then(() => {
          // Router.push("/")
        }).catch(()=>{Message.error("密钥过期")})
      }, 30000);
      // return () => {
      //   clearTimeout(timer);
      // }
    }else{
      Message.info("未登录")
      Router.push("/login")
    }
  })

  const Progress = new QP({ colorful: false, color: '#27ae60' })
  const registerRouterEvents = useCallback(() => {
    // const getMainWrapper = () => {
    //   const $main = document.querySelector('main')

    //   if (!$main) {
    //     return null
    //   }
    //   return $main
    // }

    // let animate: Animation | null = null

    // const animation = (status: 'in' | 'out') => {
    //   const $main = getMainWrapper()
    //   if ($main) {
    //     status === 'out'
    //       ? $main.classList.add('loading')
    //       : $main.classList.remove('loading')
    //   }
    // }

    Router.events.on('routeChangeStart', () => {
      // animation('out')

      Progress.start()
      history.backPath = history.backPath
        ? [...history.backPath, history.state.as]
        : [history.state.as]
    })

    Router.events.on('routeChangeComplete', () => {
      // animation('in')

      Progress.finish()
    })

    Router.events.on('routeChangeError', () => {
      // animation('in')
      history.backPath?.pop()
      Progress.finish()
      Message.error('出现了未知错误, 刷新试试?')
    })
  }, [])
  useMount(() => {
    registerRouterEvents()
  })
  return (
    <>
     <style>
        {`
      .layout-collapse {
        height: 100vh;
        border: 1px solid var(--color-border);
        background: var(--color-fill-2);
      }
      
      .layout-collapse .arco-layout-sider .logo {
        height: 32px;
        margin: 12px 8px;
        background: rgba(255, 255, 255, 0.2);
      }
      
      .layout-collapse .arco-layout-sider-light .logo {
        background: var(--color-fill-2);
      }
      
      .layout-collapse .arco-layout-footer,
      .layout-collapse .arco-layout-content {
        color: var(--color-white);
        text-align: center;
        font-stretch: condensed;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .layout-collapse .arco-layout-footer {
        color: var(--color-text-2);
        height: 48px;
        line-height: 48px;
        font-weight: 400;
        font-size: 14px;
      }
      
      .layout-collapse .arco-layout-content {
        background: var(--color-bg-3);
        color: var(--color-text-2);
        font-weight: 400;
        font-size: 14px;
      }
      
      .layout-collapse .arco-layout-header {
        height: 64px;
        line-height: 64px;
        background: var(--color-bg-3);
      }
      
      .layout-collapse .arco-layout-header .trigger {
        margin-left: 20px;
      }
      `}
      </style>
      <Component {...pageProps} />
    </>  
  )
}

export default App
