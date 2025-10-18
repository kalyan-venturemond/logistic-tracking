import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';
import { getShipmentStatusLabel } from '../../lib/utils';

const CanceledShipments = () => {
  const canceledShipments = shipments.filter(
    (shipment) => getShipmentStatusLabel(shipment.status) === 'ملغية',
  );
  return <ShipmentsPage shipments={canceledShipments} />;
};

export default CanceledShipments;
