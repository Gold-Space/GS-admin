import '../styles/globals.css'
import "@arco-design/web-react/dist/css/arco.css";
import type { AppProps } from 'next/app'
import QP from 'qier-progress'
import { Router } from 'next/router';
import { useCallback } from 'react';
import { useMount } from 'react-use';
import { Message } from '@arco-design/web-react';

function App({ Component, pageProps }: AppProps) {
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
  return <Component {...pageProps} />
}

export default App
