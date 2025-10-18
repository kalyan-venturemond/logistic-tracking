import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';
import { getShipmentStatusLabel } from '../../lib/utils';

const CompletedShipments = () => {
  const completedShipments = shipments.filter(
    (shipment) => getShipmentStatusLabel(shipment.status) === 'مكتملة',
  );
  return <ShipmentsPage shipments={completedShipments} />;
};

export default CompletedShipments;
