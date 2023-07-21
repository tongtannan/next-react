import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { getArticleDetail } from '@/api/test';

type Props = {
  articleDetail: any;
};

export async function getServerSideProps({ params }) {
  // const router = useRouter();
  // const { id } = router.query;
  const { id } = params;
  const [err, data] = await getArticleDetail({
    query: {
      id
    }
  });
  console.log('data', data);

  return {
    props: {
      articleDetail: data
    }
  };
}

const Article = ({ articleDetail }: Props) => {
  return (
    <div>
      <h5>详情页</h5>
      <div>content: {articleDetail.content}</div>
      <div>image: {articleDetail.image}</div>
      <h5>评论</h5>
      {articleDetail.atRelations.map((item, idx: number) => {
        return (
          <div key={idx}>
            <div>
              title{idx + 1}:{item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Article;
