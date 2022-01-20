import type { NextPage } from 'next'
import { Layout, Menu, Breadcrumb, Button, Message, Avatar, Typography, Space, Grid, Statistic, Badge } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Side from '../components/Side';
import $axios from '../utils/request';
// import style from '../styles/index.module.css';


const Home: NextPage = () => {
  const Header = Layout.Header;
  const Footer = Layout.Footer;
  const Content = Layout.Content;
  // 设置状态
  const [collapsed, setCollapsed] = useState(false);
  const [postNum, setPostNum] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [commentsNum, setCommentsNum] = useState(0);
  // unReadComments
  const [unReadCommentsNum, setUnReadCommentsNum] = useState(0);
  // Allfriends
  const [allFriendsNum, setAllFriendsNum] = useState(0);
  // Unfriends
  const [unFriendsNum, setUnFriendsNum] = useState(0);
  // categories
  const [categoriesNum, setCategoriesNum] = useState(0);
  // 在组件挂载时调用
  useEffect(() => {
    $axios.get("/super/ping").then(res => {
      console.log(res);
    })
    $axios.get("/stats").then(res => {
      setPostNum(res.data.posts ? res.data.posts : 0);
      setPageNum(res.data.pages ? res.data.pages : 0);
      setCommentsNum(res.data.comments ? res.data.comments : 0);
      setUnReadCommentsNum(res.data.unreadComments ? res.data.unreadComments : 0);
      setAllFriendsNum(res.data.allFriends ? res.data.allFriends : 0);
      setUnFriendsNum(res.data.unFriends ? res.data.unFriends : 0);
      setCategoriesNum(res.data.categories ? res.data.categories : 0);
    })
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
                <Statistic title="文章总数" value={postNum} groupSeparator/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* page number */}
                <Statistic title="页面总数" value={pageNum} groupSeparator/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* comments number */}
                <Statistic title="评论总数" value={commentsNum} groupSeparator/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* unread comments number */}
                <Statistic title="未读评论" value={unReadCommentsNum} groupSeparator/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* all friends number */}
                <Statistic title="好友总数" value={allFriendsNum} groupSeparator/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* unfriends number */}
                <Statistic title="未通过朋友" value={unFriendsNum} groupSeparator/>
              </Grid.Col>
              <Grid.Col span={6}>
                {/* categories number */}
                <Statistic title="分类总数" value={categoriesNum} groupSeparator/>
              </Grid.Col>
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
