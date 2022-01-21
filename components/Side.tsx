import { Avatar, Layout, Menu, Message, Space } from "@arco-design/web-react";
import { IconHome, IconCalendar, IconUser } from "@arco-design/web-react/icon";
import Router from 'next/router';
import { useState } from "react";

/*
 * @FilePath: /GS-admin/components/Side.tsx
 * @author: Wibus
 * @Date: 2022-01-20 17:04:46
 * @LastEditors: Wibus
 * @LastEditTime: 2022-01-21 16:11:30
 * Coding With IU
 */
function Side(props: any) {
  const MenuItem = Menu.Item;
  const SubMenu = Menu.SubMenu;

  const Sider = Layout.Sider;
  return (
    <Sider collapsed={props.collapsed} collapsible trigger={null} breakpoint='xl'>
    <div className={props.collapsed ? 'm-1' : 'm-4'}>
    <Space><Avatar style={{ backgroundColor: '#14a9f8' }}>G</Avatar> <span className='font-black text-lg antialiased'>GS-Admin</span></Space>
    </div>

    <Menu
      // defaultOpenKeys={['1']}
      defaultSelectedKeys={['0_1']}
      onClickMenuItem={(key) =>
        {}
      }
      style={{ width: '100%' }}
    >
      {/* 点击跳转至baidu.com */}
      <MenuItem key='0_1' onClick={() => Router.push('/')}>
        <IconHome />
        Home
      </MenuItem>
      <MenuItem key='0_2'>
      <IconUser />
        Menu 2
      </MenuItem>
      <SubMenu
        key='1'
        title={
          <span>
            <IconCalendar />
            Navigation 1
          </span>
        }
      >
        <MenuItem key='1_1'>Menu 1</MenuItem>
        <MenuItem key='1_2'>Menu 2</MenuItem>
        <SubMenu key='2' title='Navigation 2'>
          <MenuItem key='2_1'>Menu 1</MenuItem>
          <MenuItem key='2_2'>Menu 2</MenuItem>
        </SubMenu>
        <SubMenu key='3' title='Navigation 3'>
          <MenuItem key='3_1'>Menu 1</MenuItem>
          <MenuItem key='3_2'>Menu 2</MenuItem>
          <MenuItem key='3_3'>Menu 3</MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu
        key='4'
        title={
          <span>
            <IconCalendar />
            Navigation 4
          </span>
        }
      >
        <MenuItem key='4_1'>Menu 1</MenuItem>
        <MenuItem key='4_2'>Menu 2</MenuItem>
        <MenuItem key='4_3'>Menu 3</MenuItem>
      </SubMenu>
    </Menu>
  </Sider>
  )
}

export default Side