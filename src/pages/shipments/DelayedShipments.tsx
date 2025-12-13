import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';
import { getShipmentStatusLabel } from '../../lib/utils';

const DelayedShipments = () => {
  const delayedShipments = shipments.filter(
    (shipment) => getShipmentStatusLabel(shipment.status) === 'Delayed',
  );
  return <ShipmentsPage shipments={delayedShipments} />;
};

export default DelayedShipments;
