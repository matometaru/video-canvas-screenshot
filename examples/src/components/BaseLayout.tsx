import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GithubLink from './GithubLink';

const { Content } = Layout;

const items: MenuProps['items'] = [
  {
    label: 'LocalVideo Demo',
    key: '/',
  },
  {
    label: 'MediaStream Demo',
    key: '/media-stream',
  },
  {
    label: 'Three.jd Demo',
    key: '/threejs',
  },
];

export default function BaseLayout() {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(e.key)
  };

  return (
    <div className="BaseLayout">
      <Layout style={{ background: 'none' }}>
        <h1>video-canvas-screenshot DEMO</h1>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items!} />
        <GithubLink />
        <Content style={{ padding: '50px' }}>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}
