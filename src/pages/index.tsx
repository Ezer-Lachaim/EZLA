import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  return <div className="flex flex-col bg-gray-800 py-8">Hello</div>;
};

export default IndexPage;
