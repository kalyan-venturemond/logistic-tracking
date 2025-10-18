// hooks/useDriversImageUpload.ts
import { useState } from 'react';
import { ShipmentFormData } from '../types/shipments';

export const useShipment = () => {
  const [formData, setFormData] = useState<ShipmentFormData>({
    driverId: 0,
    driverVehicleId: 0,
    driverVehicleNumber: '',
    driverPhoneNumber: '',
    shipmentPickupCityId: 0,
    shipmentDropOffCityId: 0,
    shipmentPickupDate: '',
    shipmentExpectedDeliveryDate: '',
    shipmentContent: '',
    shipmentWeight: 0,
    shipmentNotes: '',
    shipperId: 0,
    shipperBranchId: 0,
    shipperAddress: '',
    shipperPrimaryPhoneNumber: '',
    shipperSecondaryPhoneNumber: '',
    shipperNotes: '',
    recipientId: 0,
    recipientAddress: '',
    recipientPrimaryPhoneNumber: '',
    recipientSecondaryPhoneNumber: '',
    recipientNotes: '',
    baseCost: 0,
    extraCost: 0,
    stayedNights: 0,
    costPerNight: 0,
    deduct: 0,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { value: object; name: string } },
  ) => {
    const { name, value } = e.target;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      setFormData((prev: ShipmentFormData) => ({ ...prev, ...value }));
    } else {
      setFormData((prev: ShipmentFormData) => ({ ...prev, [name]: value }));
    }
  };

  const getTotalCost = () => {
    const { baseCost, extraCost, stayedNights, costPerNight, deduct } = formData;
    return (
      Number(baseCost) + Number(extraCost) + Number(stayedNights) * Number(costPerNight) - deduct
    );
  };

  return {
    formData,
    setFormData,
    handleChange,
    getTotalCost,
  };
};
