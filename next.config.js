/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 跨域
 */

/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://localhost:3000/api/:path*`
        }
      ]
    };
  }
};
