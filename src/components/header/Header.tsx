import avatar from '/images/avatar.webp';
import notification from '/images/notification.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/shipments/all': 'Shipments',
  '/shipments/add': 'Add Shipment',
  '/shipments/edit': 'Edit Shipment',
  '/shipments/delete': 'Delete Shipment',
  '/shipments/': 'Shipment Details',
  '/admins/add': 'Add User',
  '/admins/edit': 'Update User',
  '/admins/delete': 'Delete User',
  '/admins/': 'User Details',
  '/admins': 'Users',
  '/drivers/add': 'Add Driver',
  '/drivers/edit': 'Update Driver',
  '/drivers/delete': 'Delete Driver',
  '/drivers/': 'Driver Details',
  '/drivers': 'Drivers',
  '/shippers/add': 'Add Shipper',
  '/shippers/edit': 'Update Shipper',
  '/shippers/delete': 'Delete Shipper',
  '/shippers/': 'Shipper Details',
  '/shippers': 'Shippers',
  '/alert-messages': 'System Messages',
  '/alert-messages/select-recipients': 'Select Recipients',
};

const backButtonPaths = [
  '/add',
  '/edit',
  '/delete',
  '/shipments/',
  '/admins/',
  '/drivers/',
  '/shippers/',
  '/alert-messages/select-recipients',
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = (path: string) => {
    if (pageTitles[path]) return pageTitles[path];
    const matchingPath = Object.keys(pageTitles).find((key) => key !== '/' && path.startsWith(key));

    return matchingPath ? pageTitles[matchingPath] : 'Shipments';
  };

  // Usage in component:
  const title = getTitle(location.pathname);

  const showBackButton = backButtonPaths.some((path) => location.pathname.includes(path));

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className='flex justify-between items-center mt-16 lg:mt-12 mb-10 px-8 gap-4'>
      <h1 className='font-bold xs:text-base text-lg sm:text-3xl ml-4 text-nowrap'>{title}</h1>
      {showBackButton ? (
        <button
          type='button'
          onClick={handleBackClick}
          className='text-primary flex items-center gap-2 font-Rubik text-lg'
        >
          {location.pathname.includes('/shipments/delete-shipment') ? (
            <span>Cancel</span>
          ) : (
            <>
              <span className='-mt-1 xs:text-base'>Back</span>
              <FaArrowLeft
                color='#DD7E1F'
              // size={20}
              />
            </>
          )}
        </button>
      ) : (
        <div className='flex gap-2 items-center'>
          <button
            type='button'
            className='xs:hidden p-2 rounded-full bg-[#E6E6E6]'
          >
            <img
              src={notification}
              alt='Notification icon'
              className='w-5 h-5'
            />
          </button>
          <img
            src={avatar}
            alt='avatar pic'
            className='w-8 h-8 rounded-full object-cover'
          />
          <h4 className='text-[#333333] text-sm font-semibold'>Basem Al-Aufi</h4>
        </div>
      )}
    </header>
  );
};

export default Header;
