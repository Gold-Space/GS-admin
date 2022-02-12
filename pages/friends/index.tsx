/*
 * @FilePath: /GS-admin/pages/friends/index.tsx
 * @author: Wibus
 * @Date: 2022-02-12 14:11:01
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-12 22:19:16
 * Coding With IU
 */

/*
 * @FilePath: /GS-admin/pages/categories/index.tsx
 * @author: Wibus
 * @Date: 2022-02-09 15:37:05
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-12 12:39:24
 * Coding With IU
 */

import { Layout, List, Popconfirm, Message, Button, Breadcrumb, Grid, Typography, Modal, Form, Input, Select } from "@arco-design/web-react";
import { IconEdit, IconDelete, IconCaretLeft, IconCheck, IconFolderAdd } from "@arco-design/web-react/icon";
import { NextPage } from "next";
import Router from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { Footers } from "../../components/Footer";
import Side from "../../components/Side";
import $axios from "../../utils/request";

const FriendsLists: NextPage = (anyProps: any) => {
  const props = anyProps.data

  const Header = Layout.Header;
  const Content = Layout.Content;

  const [unCheckList, setUnCheckList] = useState({
    id: [],
    name: [],
    description: [],
    image: [],
    qq: [],
    check: false,
  });
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [confirmLoadingCreate, setConfirmLoadingCreate] = useState(false);
  const [formCreate] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      setConfirmLoading(true);
      $axios.post("friends/update",res).then((res) => {
        Message.success('成功!');
        setVisible(false);
        setConfirmLoading(false);
        Router.reload();
      }).catch((err) => {
        Message.error('提交发生错误，控制台已打印信息');
        console.log(err);
        setVisible(false);
        setConfirmLoading(false);
      })
      // console.log(res)
    })
  }

  function onOkCreate(){
    formCreate.validate().then((res) => {
      setConfirmLoadingCreate(true);
      $axios.post("friends/create",res).then((res) => {
        Message.success('成功!');
        setVisibleCreate(false);
        setConfirmLoadingCreate(false);
        Router.reload();
      }).catch((err) => {
        Message.error('提交发生错误，控制台已打印信息');
        console.log(err);
        setVisibleCreate(false);
        setConfirmLoadingCreate(false);
      })
    })
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  useEffect(() => {
    $axios.get("friends/list?type=uncheck").then((res) => {
      setUnCheckList({
        id: res.data.map((item: { id: string; }) => item.id),
        name: res.data.map((item: { name: string; }) => item.name),
        description: res.data.map((item: { description: string; }) => item.description),
        image: res.data.map((item: { image: string; }) => item.image),
        qq: res.data.map((item: { qq: string; }) => item.qq),
        check: res.data.map((item: { check: boolean; }) => item.check),
      });
    });
  },[])

  const render = (action: ReactNode[],item: any, index: any) => (
    <>
      <List.Item key={index} actions={action} extra={[
        <div key={index} className="arco-list-item-action">
        <span className='list-actions-icon' onClick={
          () => {
            setVisible(true);
            form.setFieldsValue({
              id: props.id[index],
              name: item,
              description: props.description[index],
              image: props.image[index],
              qq: props.qq[index],
              website: props.website[index],
              check: props.check[index]
            });
          }
        }>
          <IconEdit />
        </span>
        <Popconfirm
          className='list-actions-button'
          title='真的要删除吗?'
          onOk={() => {
            Message.loading({ content: '删除中' });
            $axios.delete(`friends/delete/${props.id[index]}`).then(res => {
              Message.success({ content: "删除成功" });
              // 重新渲染页面
              Router.reload();
            }).catch(err => {
              Message.error({ content:err.message });
            })
          }}
          // onCancel={() => {Router.reload();}}
        >
          <span className='list-actions-icon'><IconDelete /></span>
        </Popconfirm>
        </div>
      ]}>

      <List.Item.Meta title={item}></List.Item.Meta>
    </List.Item>
    
    </>
  
  )

  const renderUncheck = (action: ReactNode[],item: any, index: any) => (
    <>
      <List.Item key={index} actions={action} extra={[
        <div key={index} className="arco-list-item-action">
        <span className='list-actions-icon' onClick={
          () => {
            setVisible(true);
            form.setFieldsValue({
              id: props.id[index],
              name: item,
              description: props.description[index],
              image: props.image[index],
              qq: props.qq[index],
              website: props.website[index],
              check: props.check[index]
            });
          }
        }>
          <IconEdit />
        </span>
        <Popconfirm
          className='list-actions-button'
          title='真的要删除吗?'
          onOk={() => {
            Message.loading({ content: '删除中' });
            $axios.delete(`friends/delete/${props.id[index]}`).then(res => {
              Message.success({ content: "删除成功" });
              // 重新渲染页面
              Router.reload();
            }).catch(err => {
              Message.error({ content:err.message });
            })
          }}
          // onCancel={() => {Router.reload();}}
        >
          <span className='list-actions-icon'><IconDelete /></span>
        </Popconfirm>
        </div>
      ]}>

      <List.Item.Meta title={item}></List.Item.Meta>
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
                <IconCaretLeft />
            </Button>
          </Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Friends</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
              <Content style={{display: "inline"}}>
              <Grid.Row gutter={24}>
              <Grid.Col span={12}>
              <Typography.Title heading={5}>全部</Typography.Title>
                <List
                  virtualListProps={{
                    height: 400,
                  }}
                  className="list-actions"
                  style={{ width: "calc(100% - 40px)", borderWidth: 0}}
                  dataSource={props.name}
                  render={render.bind(null, [])}
                />
                <Button shape='round' type='outline' onClick={() => {setVisibleCreate(true)}}>
                  <IconFolderAdd />
                  新增
                </Button>
              </Grid.Col>
              <Grid.Col span={12}>
              <Typography.Title heading={5}>未审核</Typography.Title>
                <List
                  virtualListProps={{
                    height: 400,
                  }}
                  className="list-actions"
                  style={{ width: "calc(100% - 40px)", borderWidth: 0}}
                  dataSource={unCheckList.name}
                  render={renderUncheck.bind(null, [])}
                />
              </Grid.Col>
              </Grid.Row>
              <Modal 
                title="修改友链" 
                visible={visible}
                onOk={onOk}
                confirmLoading={confirmLoading}
                onCancel={() => {
                  setVisible(false)
                }}
              >
                <Form
                  {...formItemLayout}
                  form={form}
                  labelCol={{ style: { flexBasis: 80 } }}
                  wrapperCol={{ style: { flexBasis: 'calc(100% - 80px)' } }}
                >

                <Form.Item 
                label='ID'
                field='id'
                // initialValue={modalValue.name}
                disabled
                >
                  <Input placeholder='ID...'required/>
                </Form.Item>

                <Form.Item 
                label='名称'
                field='name'
                // initialValue={modalValue.name}
                >
                  <Input placeholder='Name...'required/>
                </Form.Item>

                <Form.Item 
                label='描述'
                field='description'
                // initialValue={modalValue.description}
                >
                  <Input placeholder='description...'required/>
                </Form.Item>

                <Form.Item 
                label='图片'
                field='image'
                // initialValue={modalValue.image}
                >
                  <Input placeholder='image...'required/>
                </Form.Item>

                <Form.Item 
                label='网址'
                field='website'
                // initialValue={modalValue.qq}
                >
                  <Input placeholder='website...'required/>
                </Form.Item>

                <Form.Item 
                label='QQ'
                field='qq'
                // initialValue={modalValue.qq}
                >
                  <Input placeholder='qq...'required/>
                </Form.Item>

                <Form.Item 
                label='状态'
                field='check'
                // initialValue={prop.data ? prop.data.slug : undefined}
                >
                  <Select 
                  placeholder="状态">
                    <Select.Option key='trueCheck' value={1}>
                      已审核
                    </Select.Option>
                    <Select.Option key='falseCheck' value={0}>
                      未审核
                    </Select.Option>
                  </Select>
                </Form.Item>


                </Form>
              </Modal>

              <Modal 
                title="新增友链" 
                visible={visibleCreate}
                onOk={onOkCreate}
                confirmLoading={confirmLoadingCreate}
                onCancel={() => {
                  setVisibleCreate(false)
                }}
              >
                <Form
                  {...formItemLayout}
                  form={formCreate}
                  labelCol={{ style: { flexBasis: 80 } }}
                  wrapperCol={{ style: { flexBasis: 'calc(100% - 80px)' } }}
                >

                <Form.Item 
                label='ID'
                field='id'
                // initialValue={modalValue.name}
                disabled
                >
                  <Input placeholder='ID...'required/>
                </Form.Item>

                <Form.Item 
                label='名称'
                field='name'
                // initialValue={modalValue.name}
                >
                  <Input placeholder='Name...'required/>
                </Form.Item>

                <Form.Item 
                label='描述'
                field='description'
                // initialValue={modalValue.description}
                >
                  <Input placeholder='description...'required/>
                </Form.Item>

                <Form.Item 
                label='图片'
                field='image'
                // initialValue={modalValue.image}
                >
                  <Input placeholder='image...'required/>
                </Form.Item>

                <Form.Item 
                label='网址'
                field='website'
                // initialValue={modalValue.qq}
                >
                  <Input placeholder='website...'required/>
                </Form.Item>

                <Form.Item 
                label='QQ'
                field='qq'
                // initialValue={modalValue.qq}
                >
                  <Input placeholder='qq...'required/>
                </Form.Item>

                <Form.Item 
                label='状态'
                field='check'
                // initialValue={prop.data ? prop.data.slug : undefined}
                >
                  <Select 
                  placeholder="状态">
                    <Select.Option key='trueCheck' value={1}>
                      已审核
                    </Select.Option>
                    <Select.Option key='falseCheck' value={0}>
                      未审核
                    </Select.Option>
                  </Select>
                </Form.Item>


                </Form>
              </Modal>

              </Content>
              <Footers />
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

FriendsLists.getInitialProps = async (ctx: any) => {
  const data = await $axios.get(`friends/list`).then( (res) => {
    return {
      id: res.data.map((item: { id: string; }) => item.id),
      name: res.data.map((item: { name: string; }) => item.name),
      description: res.data.map((item: { description: string; }) => item.description),
      website: res.data.map((item: { website: string; }) => item.website),
      image: res.data.map((item: { image: string; }) => item.image),
      qq: res.data.map((item: { qq: string; }) => item.qq),
      check: res.data.map((item: { check: boolean; }) => item.check),
    }
  }).catch(
    () => {return {"ok": 0, "mes": "page not found"}}
  )

  return {
    data: data, // 数据
  }

}

export default FriendsLists