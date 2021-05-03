import { FC } from 'react';
import Image from 'next/image'
import Layout from '@/components/Layout/Layout';
import Button from '@/components/Button/Button';
import ThemeToggle from '@/containers/ThemeToggle/ThemeToggle';

type MainPageProps = {};

const MainPage: FC<MainPageProps> = () => {
  return (
    <Layout>
      <div className="flex flex-nowrap items-center justify-center">
        <h3 className="w-max mr-2">Title</h3>
        <Image src="/assets/icons/logo.svg" alt="Icon Description" width={40} height ={40} />
        <Button>Button</Button>
        <ThemeToggle />
      </div>
    </Layout>
  );
};

export default MainPage;
