import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';
import { getShipmentStatusLabel } from '../../lib/utils';
const DeliveredShipments = () => {
  const deliveredShipments = shipments.filter(
    (shipment) => getShipmentStatusLabel(shipment.status) === 'تم التوصيل',
  );
  return <ShipmentsPage shipments={deliveredShipments} />;
};

export default DeliveredShipments;
