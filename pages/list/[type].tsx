/*
 * @FilePath: /GS-admin/pages/list/[type].tsx
 * @author: Wibus
 * @Date: 2022-01-29 12:36:38
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-01 21:38:41
 * Coding With IU
 */
import { Layout, Form, Breadcrumb, Button, List, Avatar } from "@arco-design/web-react";
import { IconCaretRight, IconCaretLeft, IconEdit } from "@arco-design/web-react/icon";
import { NextPage } from "next"
import Router from "next/router";
import { useState } from "react";
import { useMount } from "react-use";
import { Footers } from "../../components/Footer";
import Side from "../../components/Side";
import $axios from "../../utils/request";


const Lists: NextPage = (anyProps: any) => {

  const props = anyProps.data

  const Header = Layout.Header;
  const Content = Layout.Content;
  
  // 设置状态
  const [collapsed, setCollapsed] = useState(false);

  console.log(anyProps)
  return (
    <>
      <style>
        {`
        .list-actions {
          margin-top: 20px;
          margin-left: 20px;
        }
        .btn{
          width: 100px;
          margin: 20px
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
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
              <Content style={{display: "inline"}}>
              <List
                virtualListProps={{
                  height: 400,
                }}
                className="list-actions"
                style={{ width: 620 }}
                dataSource={props.title}
                render={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          shape='square'
                          triggerIcon={<IconEdit />}
                          style={{ backgroundColor: 'rgb(122 113 88)' }}
                          triggerType='mask'
                          onClick={() => Router.push(`/edit/posts?path=${props.path[index]}`)}
                        >
                          Post
                        </Avatar>
                      }
                      title={<a href={`${process.env.NEXT_PUBLIC_WEBURL}/posts/${props.path[index]}`}>{item}</a>}
                    />
                  </List.Item>)}
              />
              { anyProps.nowPage == 1 ? null : <Button type='outline' className={'btn_up btn'} onClick={() => {Router.push(`/list/${anyProps.type}?page=${anyProps.nowPage - 1}`)}}> 上一页 </Button> }
              { anyProps.next ? <Button type='outline' className={"btn_next btn"} onClick={() => {Router.push(`/list/${anyProps.type}?page=${anyProps.nowPage + 1}`)}}>下一页</Button> : null}
              </Content>
              <Footers />
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

Lists.getInitialProps = async (ctx) => {
  const { page, type } = ctx.query as any
  if (!type){
    () => {return {"ok": 0}}
  }
  let pages = page ? page : 1
  const data = await $axios.get(`${type}/list?type=limit&page=${pages}`).then( (res) => {
    return {
      title: res.data.map((item: { title: string; }) => item.title),
      path: res.data.map((item: { path: string; }) => item.path)
    }
  }).catch(
    () => {return {"ok": 0, "mes": "page not found"}}
  )
  const nextPage = await $axios.get(`${type}/list?type=limit&page=${pages + 1}`).then(res => {
    return res.data.map((item: { title: string; }) => item.title).length ? true : false
  })
  return {
    type: type, // 种类
    nowPage: pages, // 当前页
    data: data, // 数据
    next: nextPage // 下一页情况
  }
}


export default Lists

