/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:
 */
import styles from './index.module.css';
import Link from 'next/link';

function Blog({ blogs }) {
  return blogs.map(blog => {
    return (
      <div key={blog.id}>
        <Link href={`/article/${blog.id}`}>
          <div className={styles.title}>{blog.content}</div>
        </Link>
        <div>{blog.image}</div>
      </div>
    );
  });
}

export default Blog;
