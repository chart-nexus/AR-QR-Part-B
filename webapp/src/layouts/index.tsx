import {Layout, Menu, Breadcrumb, MenuProps} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React, {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;

export const MainLayoutView = () => {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" onClick={() => { navigate("/app/dashboard") }}>Verify</Menu.Item>
                        <Menu.Item key="2" onClick={() => { navigate("/app/config") }}>Config</Menu.Item>
                        <Menu.Item key="3" onClick={() => {
                            // localStorage.clear()
                            // sessionStorage.clear()
                            navigate("/login")
                        }}>Log Out</Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}
