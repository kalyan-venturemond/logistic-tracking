import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';

const AllShipments = () => {
  return (
    <>
      {/* <ShipmentsFilterDialog /> */}
      <ShipmentsPage
        shipments={shipments}
        isAllShipmentsPage={true}
      />
    </>
  );
};

export default AllShipments;
