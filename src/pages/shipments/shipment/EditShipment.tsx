import { useEffect } from 'react';
import AddEditShipmentDataSection from '../../../components/shipments/addShipment/AddEditShipmentDataSection';
import AddEditShipmentCostSection from '../../../components/shipments/addShipment/AddEditShipmentCostSection';
import { useParams } from 'react-router-dom';
import { cities, drivers, recipients, shipments, shippers } from '../../../lib/data/mainData';
import AddShipmentTextArea from '../../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import { arabicDateStringToISO } from '../../../lib/utils';
import AddEditItemDataSection from '../../../components/shared/AddEditItemDataSection';
import { ShipmentFormData } from '../../../types/shipments';
import { useShipment } from '../../../hooks/useShipment';
import { useFormSubmission } from '../../../hooks/useFormSubmission ';
import {
  costSectionInputsData,
  driverSectionInputsData,
  recipientSectionInputsData,
  shipmentSectionInputsData,
  shipperSectionInputsData,
} from '../../../lib/data/shipments';
const EditShipment = () => {
  const { shipmentId } = useParams();
  const selectedShipment = shipments.find((shipment) => shipment.id === Number(shipmentId));
  const shipmentDriver = drivers.find((driver) => driver.id === selectedShipment?.driverId);
  const shipmentShipper = shippers.find((shipper) => shipper.id === selectedShipment?.shipperId);
  const shipmentRecipient = recipients.find(
    (recipient) => recipient.id === selectedShipment?.recipientId,
  );

  const { formData, setFormData, handleChange, getTotalCost } = useShipment();
  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'تم تعديل بيانات الشحنة بنجاح',
    redirectPath: '/shipments',
  });

  useEffect(() => {
    if (selectedShipment && shipmentDriver && shipmentShipper && shipmentRecipient && cities) {
      setFormData({
        driverId: shipmentDriver.id,
        driverVehicleId: shipmentDriver.vehicleId ?? 0,
        driverVehicleNumber: shipmentDriver.vehicleNumber ?? '',
        driverPhoneNumber: shipmentDriver.phoneNumber ?? '',
        shipmentPickupCityId:
          cities.find((city) => city.name === selectedShipment.pickupCity)?.id || 0,
        shipmentDropOffCityId:
          cities.find((city) => city.name === selectedShipment.dropOffCity)?.id || 0,
        shipmentPickupDate: arabicDateStringToISO(selectedShipment.pickupDate) || '',
        shipmentExpectedDeliveryDate:
          arabicDateStringToISO(selectedShipment.expectedDeliveryDate) || '',
        shipmentContent: selectedShipment.content ?? '',
        shipmentWeight: selectedShipment.weight ?? 0,
        shipmentNotes: selectedShipment.shipmentNotes ?? '',
        shipperId: shipmentShipper.id,
        shipperBranchId: selectedShipment.shipperBranchId ?? 0,
        shipperAddress: shipmentShipper.address ?? '',
        shipperPrimaryPhoneNumber: shipmentShipper.primaryPhoneNumber ?? '',
        shipperSecondaryPhoneNumber: shipmentShipper.secondaryPhoneNumber ?? '',
        shipperNotes: selectedShipment.shipperNotes ?? '',
        recipientId: shipmentRecipient.id,
        recipientAddress: shipmentRecipient.address ?? '',
        recipientPrimaryPhoneNumber: shipmentRecipient.primaryPhoneNumber ?? '',
        recipientSecondaryPhoneNumber: shipmentRecipient.secondaryPhoneNumber ?? '',
        recipientNotes: selectedShipment.recipientNotes ?? '',
        baseCost: selectedShipment.baseCost ?? 0,
        extraCost: selectedShipment.extraCost ?? 0,
        stayedNights: selectedShipment.stayedNights ?? 0,
        costPerNight: selectedShipment.costPerNight ?? 0,
        deduct: selectedShipment.deduct ?? 0,
      });
    }
  }, [selectedShipment, shipmentDriver, shipmentShipper, shipmentRecipient, setFormData]);

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-[#DD7E1F] rounded-lg p-8 mx-4 md:mx-0'
      >
        <AddEditItemDataSection
          section='driver'
          title='السائق'
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />

        <AddEditItemDataSection
          section='shipment'
          title='الشحنة'
          inputs={shipmentSectionInputsData}
          value={formData}
          onChange={handleChange}
        />

        <AddShipmentTextArea
          page='editShipment'
          name='shipmentNotes'
          value={formData.shipmentNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData((prev: ShipmentFormData) => ({ ...prev, shipmentNotes: e.target.value }))
          }
          existingNotes={!!selectedShipment?.shipmentNotes}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />
        <AddEditShipmentDataSection
          page='editShipment'
          section='shipper'
          title='المرسِل'
          inputs={shipperSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
          existingNotes={!!selectedShipment?.shipperNotes}
        />
        <AddEditShipmentDataSection
          page='editShipment'
          section='recipient'
          title='المستلِم'
          inputs={recipientSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
          existingNotes={!!selectedShipment?.recipientNotes}
        />
        <AddEditShipmentCostSection
          page='editShipment'
          inputs={costSectionInputsData}
          nights={formData.stayedNights}
          setNights={(value: number) =>
            setFormData((prev: ShipmentFormData) => ({ ...prev, stayedNights: value }))
          }
          costPerNight={formData.costPerNight}
          setCostPerNight={(value: number) =>
            setFormData((prev: ShipmentFormData) => ({ ...prev, costPerNight: value }))
          }
          value={formData}
          onChange={handleChange}
          totalCost={getTotalCost()}
        />
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' /> */}
        <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
          حفظ التعديلات
        </button>
      </form>
    </>
  );
};

export default EditShipment;
