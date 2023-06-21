import { useRouter } from 'next/router';

import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';

const ClientPage: NextPageWithLayout = () => {
  const postQuery = trpc.post.byId.useQuery({ id: '123' });

  const { data } = postQuery;
  console.log(data);
  return <div>CLIENT PAGE</div>;
};

export default ClientPage;
