/*
 * @FilePath: /GS-admin/pages/list/[type].tsx
 * @author: Wibus
 * @Date: 2022-01-29 12:36:38
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-01 20:36:15
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


const Lists: NextPage = (props: any) => {

  const Header = Layout.Header;
  const Content = Layout.Content;
  const FormItem = Form.Item;
  
  // 设置状态
  const [collapsed, setCollapsed] = useState(false);

  process.env.NODE_ENV === 'development' ? console.log(props.data) : null;

  return (
    <>
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
              <Content>
              {console.log(props) }
              <List
                className="list-demo-actions"
                style={{ width: 700 }}
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
              
              </Content>
              <Footers />
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

Lists.getInitialProps = async (ctx) => {
  const { page, type } = ctx.query
  let res: any
  if (!type){
    () => {return {"ok": 0}}
  }
  console.log(page)
  if (page) {
    return await $axios.get(`${type}/list?type=limit&page=${page}}`).then( (res) => {
      return {
        title: res.data.map((item: { title: string; }) => item.title),
        path: res.data.map((item: { path: string; }) => item.path)
      }
    }).catch(
      () => {return {"ok": 0, "mes": "page not found"}}
    )
  }else{
    return await $axios.get(`${type}/list?type=limit&page=1}`).then( (res) => {
      return {
        title: res.data.map((item: { title: string; }) => item.title),
        path: res.data.map((item: { path: string; }) => item.path)
      }
    }).catch(
      () => {return {"ok": 0, "mes": "first page not found"}}
    )
  }
}


export default Lists

