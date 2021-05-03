import { FC, ReactNode } from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
