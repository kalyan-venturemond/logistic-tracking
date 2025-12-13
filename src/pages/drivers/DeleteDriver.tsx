import driverIdCardImage from '/images/adminDriver/personalCard.svg';
import locationIcon from '/images/adminDriver/location.svg';
import callIcon from '/images/adminDriver/call.svg';
import flagIcon from '/images/adminDriver/flag.svg';
import truckIcon from '/images/truck.svg';
import { useParams } from 'react-router-dom';
import { drivers } from '../../lib/data/mainData';
import DeleteItem from '../../components/shared/DeleteItem';

const DeleteDriver = () => {
  const { driverId } = useParams();
  const selectedDriver = drivers.find((driver) => driver?.id === Number(driverId));

  const personalInfoData = {
    image: selectedDriver?.image,
    name: selectedDriver?.name,
    status: selectedDriver?.status,
  };

  const moreInfoData = [
    {
      image: driverIdCardImage,
      label: 'ID Number',
      value: selectedDriver?.identityNumber,
    },
    {
      image: locationIcon,
      label: 'Branch',
      value: 'Third Industrial City',
    },
    {
      image: callIcon,
      label: 'Phone No.',
      value: selectedDriver?.phoneNumber,
    },
    {
      image: flagIcon,
      label: 'Nationality',
      value: selectedDriver?.nationality,
    },
    {
      image: truckIcon,
      label: 'Truck Type',
      value: selectedDriver?.vehicle,
    },
    {
      image: callIcon,
      label: 'Truck Number',
      value: selectedDriver?.vehicleNumber,
    },
  ];

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalInfoData}
      item='driver'
    />
  );
};

export default DeleteDriver;
