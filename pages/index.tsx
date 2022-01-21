import type { NextPage } from 'next'
import { Layout, Menu, Breadcrumb, Button, Message, Avatar, Typography, Space, Grid, Statistic, Badge } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Side from '../components/Side';
import $axios from '../utils/request';
import { getToken } from '../utils/cookie';
import { useMount } from 'react-use';
// import style from '../styles/index.module.css';


const Home: NextPage = () => {
  const Header = Layout.Header;
  const Footer = Layout.Footer;
  const Content = Layout.Content;
  // 设置状态
  const [collapsed, setCollapsed] = useState(false);
  const [statsNum, setStatsNum] = useState({
    posts: 0,
    pages: 0,
    comments: 0,
    unReadComments: 0,
    Allfriends: 0,
    Unfriends: 0,
    categories: 0
  });
  // 在组件挂载时调用
  useMount(() => {
    if (getToken()) {
      $axios.get("/super/ping").then(() => {
        // 应当将数据合为一个对象
        $axios.get("/stats").then(res => {
          setStatsNum(res.data ? res.data : {});
        })
      }).catch(() => {
        Message.error("未登录")
        Router.push("/login")
      })
    }else{
      Router.push("/login");
    }
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
    <Layout className='layout-collapse arco-layout-has-sider'>
        <Side 
          collapsed={collapsed}
        />
        <Layout>
          <Header>
            <Button shape='round' className='trigger' onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <IconCaretRight /> : <IconCaretLeft />}
            </Button>
          </Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
            <Grid.Row style={{margin: 10}}>
              <Grid.Col span={6}>
                {/* post number */}
                <Statistic title="文章总数" value={statsNum.posts} groupSeparator suffix="篇"/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* page number */}
                <Statistic title="页面总数" value={statsNum.pages} groupSeparator suffix="页"/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* comments number */}
                <Statistic title="评论总数" value={statsNum.comments} groupSeparator suffix="条"/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* unread comments number */}
                <Statistic title="未读评论" value={statsNum.unReadComments} groupSeparator suffix="条"/>
              </Grid.Col>
              <Grid.Col span={6} style={{marginTop: 20}}>
                {/* all friends number */}
                <Statistic title="好友总数" value={statsNum.Allfriends} groupSeparator suffix="位"/>
              </Grid.Col>
              <Grid.Col span={6} style={{marginTop: 20}}>
                {/* unfriends number */}
                <Statistic title="未通过朋友" value={statsNum.Unfriends} groupSeparator suffix="位" />
              </Grid.Col>
              <Grid.Col span={6} style={{marginTop: 20}}>
                {/* categories number */}
                <Statistic title="分类总数" value={statsNum.categories} groupSeparator suffix="个"/>
              </Grid.Col>
              <Grid.Col style={{marginTop: 300}}></Grid.Col>
            </Grid.Row>
            </Content>
            <Footer>GS-admin Beta</Footer>
          </Layout>
        </Layout>
      </Layout>
      </>
  )
}

export default Home
