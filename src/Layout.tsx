/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import ScrollToTop from './components/ScrollToTop';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className={`flex flex-col w-full h-full overflow-y-auto scroll-container`}>
        <Header />
        <ScrollToTop />
        <div className='md:p-4 mb-4 md:mb-0'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
