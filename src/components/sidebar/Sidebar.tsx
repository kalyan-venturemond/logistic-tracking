import { useEffect } from 'react';
import { IoMdMenu } from 'react-icons/io';
const logo = '/images/logo.svg';
import { IoCloseOutline } from 'react-icons/io5';
import statisticsIcon from '/images/sidebar/statistics.svg';
import usersIcon from '/images/sidebar/people.svg';
import truckIcon from '/images/truck.svg';
import shippersIcon from '/images/sidebar/shippers.svg';
import alertIcon from '/images/sidebar/alert.svg';
import logOutIcon from '/images/sidebar/log-out.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { UseScreenSize } from '../../context/ScreenSizeContext';
import { UseSidebar } from '../../context/SidebarContext';
import SidebarAccordion from './SidebarAccordion';

const iconsStyles = 'filter invert brightness-0';

const items = [
  {
    nav: '/dashboard',
    name: 'Dashboard',
    icon: (
      <img
        src={statisticsIcon}
        alt='statistics'
      />
    ),
  },
  [
    {
      nav: '/shipments/all',
      name: 'All Shipments',
    },
    {
      nav: '/shipments/shipping',
      name: 'In Transit',
    },
    {
      nav: '/shipments/delivered',
      name: 'Delivered',
    },
    {
      nav: '/shipments/completed',
      name: 'Completed',
    },
    {
      nav: '/shipments/delayed',
      name: 'Delayed',
    },
    {
      nav: '/shipments/canceled',
      name: 'Canceled',
    },
    {
      nav: '/shipments/returned',
      name: 'Returned',
    },
  ],
  {
    nav: '/admins',
    name: 'Users',
    icon: (
      <img
        src={usersIcon}
        alt='admins'
      />
    ),
  },
  {
    nav: '/drivers',
    name: 'Drivers',
    icon: (
      <img
        src={truckIcon}
        alt='drivers'
      />
    ),
  },
  {
    nav: '/shippers',
    name: 'Shippers',
    icon: (
      <img
        src={shippersIcon}
        alt='shippers'
      />
    ),
  },
  {
    nav: '/alert-messages',
    name: 'Alert Messages',
    icon: (
      <img
        src={alertIcon}
        alt='alert-messages'
      />
    ),
  },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = UseSidebar();
  const { isMediumScreen } = UseScreenSize();
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (navPath: string) => {
    const currentPath = location.pathname;
    if (navPath === '/dashboard') {
      return currentPath === navPath;
    }
    return currentPath.startsWith(navPath);
  };

  useEffect(() => {
    if (isMediumScreen && isSidebarOpen) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.height = '';
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = 'auto';
    };
  }, [isMediumScreen, isSidebarOpen]);

  return (
    <div className='h-full'>
      {isMediumScreen && !isSidebarOpen ? (
        <button
          type='button'
          onClick={() => setIsSidebarOpen(true)}
          className='fixed top-4 right-4 z-50 p-2 bg-[#E6E6E6] rounded-md lg:hidden'
        >
          <IoMdMenu size={24} />
        </button>
      ) : (
        <>
          {isSidebarOpen && <div className='fixed lg:hidden inset-0 bg-black/50 z-40' />}
          <aside
            className={`bg-[#E6E6E6] flex flex-col justify-between p-8 fixed lg:static z-50 h-full overflow-y-auto transition-[width,transform] duration-200 ease-in-out will-change-transform ${isSidebarOpen ? 'w-[278px] items-end' : 'w-[104px] items-center'
              } ${isMediumScreen && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}
          >
            <div className={`w-full flex flex-col ${isSidebarOpen ? 'items-end' : 'items-center'}`}>
              {isSidebarOpen ? (
                <button
                  type='button'
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <IoCloseOutline size={24} />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <IoMdMenu size={24} />
                </button>
              )}

              {isSidebarOpen && (
                <div className='mt-10 flex items-center justify-center gap-3 w-full select-none'>
                  <img
                    src={`${logo}?v=4`}
                    alt='logo'
                    className='w-10 h-10'
                    loading='eager'
                    fetchPriority='high'
                  />
                  <div className='flex flex-col justify-center'>
                    <span className='text-xl font-normal text-[#333333] leading-none'>Venture</span>
                    <span className='text-xl font-bold text-[#333333] leading-none'>Mond</span>
                  </div>
                </div>
              )}
              <div className='w-full mt-10'>
                {items.map((item, index) =>
                  Array.isArray(item) ? (
                    <SidebarAccordion
                      key={index}
                      title='Shipments'
                      items={item}
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                      isSelected={isSelected}
                    />
                  ) : (
                    <button
                      type='button'
                      key={index}
                      onClick={() => {
                        navigate(item.nav);
                        // if (isMediumScreen && isSidebarOpen) {
                        //   setIsSidebarOpen(false);
                        // }
                      }}
                      className={`flex items-center w-full gap-2 mb-4 ${isSidebarOpen ? 'p-3' : 'p-2'
                        } transition-all duration-200 ${isSidebarOpen ? 'justify-start' : 'justify-center'
                        } ${isSelected(item.nav) && 'bg-primary rounded-lg text-[#FCFCFC]'}`}
                    >
                      <span className={isSelected(item.nav) ? iconsStyles : ''}>{item.icon}</span>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </button>
                  ),
                )}
              </div>
            </div>
            <button
              type='button'
              onClick={() => navigate('/')}
              className={`flex items-center w-full gap-2 ${isSidebarOpen ? 'p-3' : 'p-2'
                } transition-all duration-200 ${isMediumScreen ? 'mb-12' : 'mb-4'} ${isSidebarOpen ? 'justify-start' : 'justify-center'
                }`}
            >
              <img
                src={logOutIcon}
                alt='log-out'
              />
              {isSidebarOpen && <span>Log Out</span>}
            </button>
          </aside>
        </>
      )}
    </div>
  );
};

export default Sidebar;
