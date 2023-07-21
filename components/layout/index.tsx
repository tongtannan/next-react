/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:
 */
import React from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
