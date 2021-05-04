import { FC } from 'react';
import Layout from '@/components/Layout/Layout';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import ThemeToggle from '@/containers/ThemeToggle/ThemeToggle';

type MainPageProps = {};

const MainPage: FC<MainPageProps> = () => {
  return (
    <Layout>
      <div className="flex flex-nowrap items-center justify-center">
        <h3 className="w-max mr-2">Title</h3>
        <Image className="w-[40px] h-[40px]" src="/assets/icons/logo.svg" alt="Icon Description" />
        <Button>Button</Button>
        <ThemeToggle />
      </div>
    </Layout>
  );
};

export default MainPage;
