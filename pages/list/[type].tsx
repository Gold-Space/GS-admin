/* eslint-disable react/jsx-key */
/*
 * @FilePath: /GS-admin/pages/list/[type].tsx
 * @author: Wibus
 * @Date: 2022-01-29 12:36:38
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-04 23:08:31
 * Coding With IU
 */
import { Layout, Form, Breadcrumb, Button, List, Avatar, Message, Popconfirm } from "@arco-design/web-react";
import { IconCaretRight, IconCaretLeft, IconEdit, IconDelete } from "@arco-design/web-react/icon";
import { NextPage } from "next"
import Router from "next/router";
import { ReactNode, useState } from "react";
import { Footers } from "../../components/Footer";
import Side from "../../components/Side";
import $axios from "../../utils/request";


const Lists: NextPage = (anyProps: any) => {

  const props = anyProps.data

  const Header = Layout.Header;
  const Content = Layout.Content;


  const render = (action: ReactNode[],item: any, index: any) => (
    <>
      <List.Item key={index} actions={action} extra={[
        <div className="arco-list-item-action">
        <span className='list-actions-icon' onClick={() => {Router.push(`/edit/posts?path=${props.path[index]}`)}}>
          <IconEdit />
        </span>
        <Popconfirm
          className='list-actions-button'
          title='真的要删除吗?'
          onOk={() => {
            Message.loading({ content: '删除中' });
            $axios.delete(`${anyProps.type}/delete/${props.path[index]}`).then(res => {
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
      ]}>

      <List.Item.Meta title={<a href={`${process.env.NEXT_PUBLIC_WEBURL}/posts/${props.path[index]}`}>{item}</a>}></List.Item.Meta>
    </List.Item>
    
    </>
  
  )
  
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
            <Button shape='round' className='trigger' onClick={() => Router.back}>
                <IconCaretRight />
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
                style={{ width: "calc(100% - 40px)", borderWidth: 0}}
                dataSource={props.title}
                render={render.bind(null, [])}
              />
              { anyProps.nowPage == 1 ? null : <Button type='outline' className={'btn_up btn'} onClick={() => {Router.push(`/list/${anyProps.type}?page=${Number(anyProps.nowPage) - 1}`)}}> 上一页 </Button> }
              { anyProps.next ? <Button type='outline' className={"btn_next btn"} onClick={() => {Router.push(`/list/${anyProps.type}?page=${Number(anyProps.nowPage) + 1}`)}}>下一页</Button> : null}
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
  // 将 page 转化为 number
  let pages = Number(page)
  console.log(typeof pages)
  pages = page ? page : 1
  
  const data = await $axios.get(`${type}/list?type=limit&page=${Number(pages)}`).then( (res) => {
    return {
      title: res.data.map((item: { title: string; }) => item.title),
      path: res.data.map((item: { path: string; }) => item.path)
    }
  }).catch(
    () => {return {"ok": 0, "mes": "page not found"}}
  )
  const nextPage = await $axios.get(`${type}/list?type=limit&page=${Number(pages) + 1}`).then(res => {
    console.log(res.data)
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

