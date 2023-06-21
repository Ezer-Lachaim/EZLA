import { useRouter } from 'next/router';

import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';

const BackOfficePage: NextPageWithLayout = () => {
  const postQuery = trpc.post.byId.useQuery({ id: '123' });

  const { data } = postQuery;
  console.log(data);
  return <div>BackOffice</div>;
};

export default BackOfficePage;
