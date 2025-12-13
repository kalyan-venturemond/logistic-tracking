import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';
import { getShipmentStatusLabel } from '../../lib/utils';

const ShippingShipments = () => {
  const shippingShipments = shipments.filter(
    (shipment) => getShipmentStatusLabel(shipment.status) === 'In Transit',
  );
  return <ShipmentsPage shipments={shippingShipments} />;
};

export default ShippingShipments;
