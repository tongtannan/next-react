import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import navs from './config';
import { NavType } from './type';

import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { pathname, push } = useRouter();

  return (
    <div>
      {navs.map((item: NavType) => {
        return (
          <Link href={item.value} key={item.value} className={styles.link}>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Layout;
