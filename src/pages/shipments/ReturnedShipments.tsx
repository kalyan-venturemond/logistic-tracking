import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';
import { getShipmentStatusLabel } from '../../lib/utils';

const ReturnedShipments = () => {
  const returnedShipments = shipments.filter(
    (shipment) => getShipmentStatusLabel(shipment.status) === 'مرتجعة',
  );

  return <ShipmentsPage shipments={returnedShipments} />;
};

export default ReturnedShipments;
