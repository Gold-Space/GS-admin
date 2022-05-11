/*
 * @FilePath: /GS-admin/pages/edit/[type].tsx
 * @author: Wibus
 * @Date: 2022-01-21 13:13:51
 * @LastEditors: Wibus
 * @LastEditTime: 2022-05-11 16:56:26
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


type propClass = {
  ok: boolean | undefined;
  data: {
    id: number | undefined;
    prop: string | undefined; //临时存储
    title: string | undefined;
    path: string | undefined;
    content: string | undefined;
    tags: string | undefined;
    slug: string | undefined;
    updatedAt: string | undefined;
    createdAt: string | undefined;
  }
  where: string | undefined
}

const Edit: NextPage = (props) => {

  const Header = Layout.Header;
  const Footer = Layout.Footer;
  const Content = Layout.Content;
  const FormItem = Form.Item;

  // 设置状态
  const [collapsed, setCollapsed] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);  

  let prop = props as propClass;
  // console.log(prop);

  useMount(() => {
    if (!prop.ok){ // 当ok为false时，说明请求有问题
      if (prop.data ? prop.data.prop == 'PathYes' ? true : false : false) {
        Message.info("无法获得信息，正在返回上一页");
        Router.back();
      }
    }
    // console.log(prop.where);
    
    $axios.get("/categories/list?list").then(res => {
      // res.data 内每一个对象的slug和name单独取出为一个对象并组成数组
      let arr = res.data.map((item: { slug: any; name: any; }) => {
        return {
          slug: item.slug,
          name: item.name
        }
      })
      // console.log(arr);
      setCategoriesList(arr);
    })
  });
  return (
  <>
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
              <Breadcrumb.Item>edit</Breadcrumb.Item>
            </Breadcrumb>
            <Content >
              <Form 
              onKeyPress={() => {}}
              style={{ width: '100%', marginLeft: 100, marginTop:30}}
              autoComplete="off"
              onSubmit={(e) => {
                // 将e.tags 转换为,
                if (e.tags) {
                  e.tags = e.tags.join(',');
                }
                console.log(e);
                const SendWhere = e.SendWhere;
                delete e.SendWhere;
                // console.log(SendWhere)
                const where = prop.data ? prop.data.path ? 'update' : 'send' : 'send';
                $axios.post(`/${SendWhere}/${where}`, e).then(() => {
                  Message.success('提交成功');
                  Router.push("/")
                  Router.push(`/edit/${SendWhere}?path=` + e.path);
                }).catch((err) => {
                  console.log(err)
                  Message.error('提交失败');
                })
              }}
              >
                <FormItem 
                field="id"
                initialValue={prop.data ? prop.data.id : undefined}
                disabled
                hidden
                style={{display: 'none'}}
                >
                  <Input name='id' hidden/>
                </FormItem>

                <FormItem 
                field="SendWhere"
                initialValue={prop.where ? prop.where : "posts"}
                disabled
                hidden
                style={{display: 'none'}}
                >
                  <Input name='SendWhere' hidden/>
                </FormItem>

                <FormItem 
                // label='Title'
                field='title'
                initialValue={prop.data ? prop.data.title : undefined}
                >
                  <Input placeholder='Title...'required/>
                </FormItem>
                <FormItem
                  // label='Path'
                  field='path'
                  initialValue={prop.data ? prop.data.path : undefined}
                >
                  <Input placeholder='Path...' required />
                </FormItem>

                <FormItem 
                // label='Content'
                field='content'
                initialValue={prop.data ? prop.data.content : undefined}
                >
                  <Input.TextArea 
                  onPressEnter={(e) => {}}
                  placeholder='Content...'
                  style={{height: 250}}
                  required />
                </FormItem>

                <FormItem 
                field={prop.where=="posts" ? "tags" : undefined}
                initialValue={prop.data ? prop.data.tags ? prop.data.tags.split(',') : [] : []}
                style={{display: prop.where=="posts" ? 'block' : 'none'}}
                >
                  <InputTag 
                  allowClear
                  placeholder='Tags'
                  onPressEnter={() => {}}
                  />
                </FormItem>                

                <FormItem 
                field={prop.where=="posts" ? "slug" : undefined}
                initialValue={prop.data ? prop.data.slug : undefined}
                // style={{width: '300px' }}
                style={{display: prop.where=="posts" ? 'block' : 'none'}}
                >
                  <Select 
                  placeholder="Slug">
                    {
                      
                    categoriesList.map((option, index) => (
                    <Select.Option key={option.slug} value={option.slug}>
                      {option.name}
                    </Select.Option>
                  ))
                  }

                  </Select>
                </FormItem>

                <FormItem 
                // label='Title'
                field='createdAt'
                initialValue={prop.data ? prop.data.createdAt : undefined}
                disabled
                >
                  <Input placeholder='createdAt...'/>
                </FormItem>

                <FormItem 
                // label='Title'
                field='updatedAt'
                initialValue={prop.data ? prop.data.updatedAt : undefined}
                disabled
                >
                  <Input placeholder='updatedAt...'/>
                </FormItem>

                <FormItem>
                  <Button type='primary' htmlType="submit">提交</Button>
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
      ok: false,
      prop: 'PathYes',
      where: type,
      mes: 'type错误'
    }
  }
  if (path) {
    res = await $axios.get(`/${type}/${path}`)
    // console.log(res)
    return res.data ? 
    {
      ok: true,
      data: res.data,
      where: type,
      mes: '获取成功'
    } : {
      ok: false,
      prop: 'PathYes',
      where: type,
      mes: '数据获取失败，但是type是正确的'
    }
  }else{
    return {
      ok: true,
      prop: "PathNo",
      where: type,
      mes: 'Path不存在，因此默认为创建模式'
    };
  }
  
}


export default Edit