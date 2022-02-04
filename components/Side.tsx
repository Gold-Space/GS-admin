import { Avatar, Layout, Link, Menu, Message, Space } from "@arco-design/web-react";
import { IconHome, IconCalendar, IconUser, IconEdit, IconFile, IconTool, IconCamera } from "@arco-design/web-react/icon";
import Router from 'next/router';

/*
 * @FilePath: /GS-admin/components/Side.tsx
 * @author: Wibus
 * @Date: 2022-01-20 17:04:46
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-04 23:07:10
 * Coding With IU
 */
function Side() {
  const MenuItem = Menu.Item;
  const SubMenu = Menu.SubMenu;

  const Sider = Layout.Sider;
  return (
    <Sider trigger={null} breakpoint='xl'>
    <div className="m-4">
    <Space><Avatar style={{ backgroundColor: '#14a9f8' }}>G</Avatar> <span className='font-black text-lg antialiased'>GS-Admin</span></Space>
    </div>

    <Menu
      defaultSelectedKeys={['0_1']}
      style={{ width: '100%' }}
    >
      <MenuItem key='0_1' onClick={() => Router.push('/')}>
        <IconHome />
        首页
      </MenuItem>
      <SubMenu
        key='4'
        title={
          <span>
            <IconCamera />
            查些什么
          </span>
        }
      >
        <MenuItem key='4_1'>
          <IconFile />
          <a onClick={() => {Router.push('/list/posts')}}>全部文章</a>
        </MenuItem>
        <MenuItem key='4_2'>
          <IconEdit />
          <a onClick={() => {Router.push('/list/pages')}}>全部页面</a>
        </MenuItem>
        <MenuItem key='4_3'>
          <IconTool />
          <a>全部分类</a>
        </MenuItem>
      </SubMenu>
      <SubMenu
        key='1'
        title={
          <span>
            <IconTool />
            写点什么
          </span>
        }
      >
        <MenuItem key='0_2'>
      <IconEdit />
        <a onClick={() => {Router.push('/edit/posts','/edit/posts')}}>新增文章</a>
      </MenuItem>
      <MenuItem key='0_3'>
      <IconFile />
      <a onClick={() => {Router.push("/edit/pages")}}>新增页面</a>
      </MenuItem>
      </SubMenu>
    </Menu>
  </Sider>
  )
}

export default Side