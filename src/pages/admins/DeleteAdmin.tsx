import adminImage from '/images/adminDriver/personalCard.svg';
import locationIcon from '/images/adminDriver/location.svg';
import mailIcon from '/images/adminDriver/sms.svg';
import callIcon from '/images/adminDriver/call.svg';
import flagIcon from '/images/adminDriver/flag.svg';
import { useParams } from 'react-router-dom';
import { admins } from '../../lib/data/mainData';
import DeleteItem from '../../components/shared/DeleteItem';

const DeleteAdmin = () => {
  const { adminId } = useParams();
  const selectedAdmin = admins.find((admin) => admin.id === Number(adminId));
  const moreInfoData = [
    {
      image: adminImage,
      label: 'Admin ID',
      value: selectedAdmin?.id,
    },
    {
      image: locationIcon,
      label: 'Username',
      value: selectedAdmin?.userName,
    },
    {
      image: mailIcon,
      label: 'Email',
      value: selectedAdmin?.email,
    },
    {
      image: callIcon,
      label: 'Phone No.',
      value: selectedAdmin?.phoneNumber,
    },
    {
      image: flagIcon,
      label: 'Nationality',
      value: selectedAdmin?.nationality,
    },
  ];

  const personalData = {
    image: selectedAdmin?.image,
    firstName: selectedAdmin?.firstName,
    lastName: selectedAdmin?.lastName,
  };

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalData}
      isActive={selectedAdmin?.status === 'available'}
      item='admin'
    />
  );
};

export default DeleteAdmin;
