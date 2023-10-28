import { Outlet, Link } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div className="BaseLayout">
      <ul>
        <li><Link to="/">from LocalVideo</Link></li>
        <li><Link to="/media-stream">from MediaStream</Link></li>
        <li><Link to="/threejs">from Three.js</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}
