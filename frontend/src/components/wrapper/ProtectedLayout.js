import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar/nav';

const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
