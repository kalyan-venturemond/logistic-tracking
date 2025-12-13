import ShipmentStatusOverview from '../../../components/shipments/shipment/deleteShipment/ShipmentStatusOverview';
import { useParams } from 'react-router-dom';
import DeleteItemCard from '../../../components/shared/DeleteItemCard';
import { shipments } from '../../../lib/data/mainData';
import { useFormSubmission } from '../../../hooks/useFormSubmission ';

const DeleteShipment = () => {
  const { shipmentId } = useParams();

  const selectedShipment = shipments.find((shipment) => shipment.id === Number(shipmentId));
  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'Shipment deleted successfully',
    redirectPath: '/shipments',
  });

  return (
    <div className='flex flex-col gap-20'>
      <ShipmentStatusOverview selectedShipment={selectedShipment!} />
      <div className='flex justify-center items-start h-[70vh] mx-4'>
        {isLoading && (
          <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
            <span className='loader'></span>
          </div>
        )}
        <DeleteItemCard handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default DeleteShipment;
