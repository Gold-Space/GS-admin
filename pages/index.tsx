import type { NextPage } from 'next'
import { Layout, Menu, Breadcrumb, Button, Message, Avatar, Typography, Space, Grid, Statistic, Badge, Popconfirm } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft, IconEdit, IconDelete } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Side from '../components/Side';
import $axios from '../utils/request';
import { getToken } from '../utils/cookie';
import { useMount } from 'react-use';
import { List } from '@arco-design/web-react';
// import style from '../styles/index.module.css';


const Home: NextPage = () => {
  const Header = Layout.Header;
  const Footer = Layout.Footer;
  const Content = Layout.Content;
  // post
  const [postList, setPostList] = useState([]);
  const [postPath, setpostPath] = useState([]);
  // page
  const [pageList, setPageList] = useState([]);
  const [pagePath, setpagePath] = useState([]);
  const [statsNum, setStatsNum] = useState({
    posts: 0,
    pages: 0,
    comments: 0,
    unReadComments: 0,
    Allfriends: 0,
    Unfriends: 0,
    categories: 0
  });
  useMount(() => {
    $axios.get("/stats").then(res => {
      setStatsNum(res.data ? res.data : {});
    })
    $axios.get("/posts/list?type=limit").then(res => {
      // 将res.data中每一个对象的title 转存为数组
      const postTitle = res.data.map((item: { title: string; }) => item.title);
      const postPath = res.data.map((item: { path: string; }) => item.path);
      setPostList(postTitle ? postTitle : []);
      setpostPath(postPath ? postPath : []);
      // console.log(postPath);
    })
    $axios.get("/pages/list?type=limit").then(res => {
      // 将res.data中每一个对象的title 转存为数组
      const pageTitle = res.data.map((item: { title: string; }) => item.title);
      const pagePath = res.data.map((item: { path: string; }) => item.path);
      setPageList(pageTitle ? pageTitle : []);
      setpagePath(pagePath ? pagePath : []);
    })
  })

  return (
    <>
      <style>
        {`
        .arco-list-item-extra-content{
          display: flex;
          flex-wrap: nowrap;
          align-self: center;
          list-style: none;
          align-content: center;
          justify-content: center;
          align-items: center;
        }
        .list-actions-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          transition: all 0.1s;
          margin-left: 10px
        }
        
        .list-actions-icon:hover {
          background-color: var(--color-fill-3);
        }
        `}
      </style>
      <Layout className='layout-collapse arco-layout-has-sider'>
        <Side/>
        <Layout>
          <Header>
            <Button shape='round' className='trigger' onClick={() => Router.back()}>
              <IconCaretLeft />
            </Button>
          </Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <Grid.Row style={{ margin: 10, marginTop: 30 }}>
                <Grid.Col span={6}>
                  {/* post number */}
                  <Statistic title="文章总数" value={statsNum.posts} groupSeparator suffix="篇" />
                </Grid.Col>
                <Grid.Col span={6}>
                  {/* page number */}
                  <Statistic title="页面总数" value={statsNum.pages} groupSeparator suffix="页" />
                </Grid.Col>
                <Grid.Col span={6}>
                  {/* comments number */}
                  <Statistic title="评论总数" value={statsNum.comments} groupSeparator suffix="条" />
                </Grid.Col>
                <Grid.Col span={6}>
                  {/* unread comments number */}
                  <Statistic title="未读评论" value={statsNum.unReadComments} groupSeparator suffix="条" />
                </Grid.Col>
                <Grid.Col span={6} style={{ marginTop: 20 }}>
                  {/* all friends number */}
                  <Statistic title="好友总数" value={statsNum.Allfriends} groupSeparator suffix="位" />
                </Grid.Col>
                <Grid.Col span={6} style={{ marginTop: 20 }}>
                  {/* unfriends number */}
                  <Statistic title="未通过朋友" value={statsNum.Unfriends} groupSeparator suffix="位" />
                </Grid.Col>
                <Grid.Col span={6} style={{ marginTop: 20 }}>
                  {/* categories number */}
                  <Statistic title="分类总数" value={statsNum.categories} groupSeparator suffix="个" />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row style={{ margin: 50 }}>
                <Grid.Col span={12}>
                  <List
                    header='最近文章'
                    // style={{ width: 300 }}
                    size='small'
                    dataSource={postList}
                    render={(item, index) => (
                      <List.Item key={index}
                      extra={[
                        // eslint-disable-next-line react/jsx-key
                        <div className="arco-list-item-action">
                        <span className='list-actions-icon' onClick={() => {Router.push(`/edit/posts?path=${postPath[index]}`)}}>
                          <IconEdit />
                        </span>
                        <Popconfirm
                          className='list-actions-button'
                          title='真的要删除吗?'
                          onOk={() => {
                            Message.loading({ content: '删除中' });
                            $axios.delete(`posts/delete/${postPath[index]}`).then(res => {
                              Message.success({ content: "删除成功" });
                              // 重新渲染页面
                              Router.reload();
                            })
                          }}
                          // onCancel={() => {Router.reload();}}
                        >
                          <span className='list-actions-icon'><IconDelete /></span>
                        </Popconfirm>
                        </div>
                      ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              shape='square'

                              triggerIcon={<IconEdit />}
                              style={{ backgroundColor: 'rgb(122 113 88)' }}
                              triggerType='mask'
                              onClick={() => Router.push(`/edit/posts?path=${postPath[index]}`)}
                            >
                              Post
                            </Avatar>
                          }
                          title={<a href={`${process.env.NEXT_PUBLIC_WEBURL}/posts/${postPath[index]}`}>{item}</a>}
                        />
                      </List.Item>)}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <List
                    header='已有页面'
                    style={{ width: 'calc(100% - 30px)', marginLeft: 30 }}
                    size='small'
                    dataSource={pageList}
                    render={(item, index) => (
                      <List.Item key={index}
                      extra={[
                        // eslint-disable-next-line react/jsx-key
                        <div className="arco-list-item-action">
                        <span className='list-actions-icon' onClick={() => {Router.push(`/edit/pages?path=${pagePath[index]}`)}}>
                          <IconEdit />
                        </span>
                        <Popconfirm
                          className='list-actions-button'
                          title='真的要删除吗?'
                          onOk={() => {
                            Message.loading({ content: '删除中' });
                            $axios.delete(`pages/delete/${pagePath[index]}`).then(res => {
                              Message.success({ content: "删除成功" });
                              // 重新渲染页面
                              Router.reload();
                            })
                          }}
                          // onCancel={() => {Router.reload();}}
                        >
                          <span className='list-actions-icon'><IconDelete /></span>
                        </Popconfirm>
                        </div>
                      ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                            shape='square'
                            triggerIcon={<IconEdit />}
                            triggerType='mask'
                            style={{ backgroundColor: '#FFC72E' }}
                              onClick={() => Router.push(`/edit/pages?path=${postPath[index]}`)}
                            >
                              Page
                            </Avatar>
                          }
                          title={<a href={`${process.env.NEXT_PUBLIC_WEBURL}/pages/${postPath[index]}`}>{item}</a>}
                        />
                      </List.Item>)}
                  />
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
