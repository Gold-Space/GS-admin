/*
 * @FilePath: /GS-admin/pages/categories/edit.tsx
 * @author: Wibus
 * @Date: 2022-02-09 15:55:15
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-12 12:18:51
 * Coding With IU
 */


import { Breadcrumb, Button, InputTag, Layout, Message, Select } from "@arco-design/web-react";
import { IconCaretRight, IconCaretLeft } from "@arco-design/web-react/icon";
import { Form, Input, Checkbox } from '@arco-design/web-react';
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import { useMount } from "react-use";
import Side from "../../components/Side";
import $axios from "../../utils/request";
import { Footers } from "../../components/Footer";

const CategoriesEdit: NextPage = (props) => {

  const Header = Layout.Header;
  const Content = Layout.Content;
  const FormItem = Form.Item;

  let prop = props as any;
  console.log(prop)
  

  return (
  <>
  <Layout className='layout-collapse arco-layout-has-sider'>
        <Side/>
        <Layout>
          <Header>
          <Button shape='round' className='trigger' onClick={() => Router.back}>
              <IconCaretLeft />
            </Button>
          </Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Categories</Breadcrumb.Item>
              <Breadcrumb.Item>edit</Breadcrumb.Item>
            </Breadcrumb>
            <Content >
              <Form 
              onKeyPress={() => {}}
              style={{ width: '100%', marginLeft: 100, marginTop:30}}
              autoComplete="off"
              onSubmit={(e) => {
                $axios.post(`categories/update`,e).then(() => {
                  Message.success('提交成功');
                  Router.push("/")
                  Router.push(`/categories`);
                }).catch((err) => {
                  console.log(err)
                  Message.error('提交失败');
                })
              }}
              >
                <FormItem 
                field="id"
                initialValue={prop ? prop.id : undefined}
                disabled
                // hidden
                // style={{display: 'none'}}
                >
                  <Input name='id' 
                  // hidden
                  />
                </FormItem>

                <FormItem 
                // label='Title'
                field='name'
                initialValue={prop ? prop.name : undefined}
                >
                  <Input placeholder='Name...'required/>
                </FormItem>
                <FormItem
                  // label='Path'
                  field='slug'
                  initialValue={prop ? prop.slug : undefined}
                >
                  <Input placeholder='slug...' required />
                </FormItem>

                <FormItem>
                  <Button type='primary' htmlType="submit">提交</Button>
                </FormItem>
              </Form>
            </Content>
            <Footers />
          </Layout>
        </Layout>
      </Layout>
  </>
  );
}

CategoriesEdit.getInitialProps = async (ctx) => {
  const { slug } = ctx.query;
  const data  = await $axios.get(`categories/${slug}`)
    .then(
    res => {
        return res
      }
    )
    .catch(err => err);
  return data.data;
}


export default CategoriesEdit