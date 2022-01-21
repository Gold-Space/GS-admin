/*
 * @FilePath: /GS-admin/pages/edit/[type].tsx
 * @author: Wibus
 * @Date: 2022-01-21 13:13:51
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-21 16:08:44
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


class propClass {
  id: number | undefined;
  prop: string | undefined; //临时存储
  title: string | undefined;
  path: string | undefined;
  content: string | undefined;
  tags: string | undefined;
  slug: string | undefined;
}

const Edit: NextPage = (props) => {

  const Header = Layout.Header;
  const Footer = Layout.Footer;
  const Content = Layout.Content;
  const FormItem = Form.Item;

  // 设置状态
  const [collapsed, setCollapsed] = useState(false);
  const [categoryList, setCategoryList] = useState<any[]>([]);

  let prop = props as propClass;
  // console.log(prop);

  useMount(() => {
    if (prop.id === undefined){
      if (prop.prop == 'PathYes') {
        Message.info("无法获得信息，正在返回首页");
        Router.push("/");
      }
    }
    $axios.get("category/list?list").then(res => {
      // res.data 内每一个对象的slug和name单独取出为一个对象并组成数组
      let arr = res.data.map((item: { slug: any; name: any; }) => {
        return {
          slug: item.slug,
          name: item.name
        }
      })
      // console.log(arr);
      setCategoryList(arr);
    })
  });
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
            </Breadcrumb>
            <Content >
              <Form 
              style={{ width: '100%', marginLeft: 100, marginTop:30}}
              autoComplete="off"
              onSubmit={(e) => {
                // 将e.tags 转换为,
                let tags = e.tags.join(',');
                e.tags = tags;
                console.log(e);
                const where = prop.path ? 'update' : 'send';
                $axios.post(`/posts/${where}`, e).then(() => {
                  Message.success('提交成功');
                  Router.push("/")
                  Router.push("/edit/posts?path=" + e.path);
                }).catch((err) => {
                  console.log(err)
                  Message.error('提交失败');
                })
              }}
              >
                <FormItem 
                field="id"
                initialValue={prop.id}
                disabled
                hidden
                style={{display: 'none'}}
                >
                  <Input name='id' hidden/>
                </FormItem>

                <FormItem 
                // label='Title'
                field='title'
                initialValue={prop.title}
                >
                  <Input placeholder='Title...' value={prop.title} required/>
                </FormItem>
                <FormItem
                  // label='Path'
                  field='path'
                  initialValue={prop.path}
                >
                  <Input placeholder='Path...' value={prop.path} required />
                </FormItem>
                <FormItem 
                // label='Content'
                field='content'
                initialValue={prop.content}
                >
                  <Input.TextArea 
                  placeholder='Content...'
                  style={{height: 250}}
                  value={prop.content}
                  required />
                </FormItem>
                
                <FormItem 
                field="tags"
                initialValue={prop.tags ? prop.tags.split(',') : []}
                >
                  <InputTag 
                  allowClear
                  placeholder='Tags'
                  />
                </FormItem>                

                <FormItem 
                field="slug"
                initialValue={prop.slug}
                // style={{width: '300px' }}
                >
                  <Select 
                  placeholder="Slug">
                    {
                      
                    categoryList.map((option, index) => (
                    <Select.Option key={option.slug} disabled={index === 3} value={option.slug}>
                      {option.name}
                    </Select.Option>
                  ))
                  }

                  </Select>
                </FormItem>

                <FormItem>
                  <Button type='primary' htmlType="submit">Submit</Button>
                </FormItem>
              </Form>
            </Content>
            <Footer>GS-admin Beta</Footer>
          </Layout>
        </Layout>
      </Layout>
  </>
  );
}

Edit.getInitialProps = async (ctx) => {
  const { path, type } = ctx.query;
  let res: any
  if (type !== "posts" && type !== "pages") {
    return {
      id: undefined,
      prop: 'PathYes',
    }
  }
  if (path) {
    res = await $axios.get(`/${type}/${path}`)
    return res.data ? res.data : {id:undefined,prop:path ? 'PathYes': 'PathNo'};
  }
  return {id:undefined,prop:path ? 'PathYes': 'PathNo'};
}


export default Edit