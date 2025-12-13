import AddEditShipmentDataSection from '../../../components/shipments/addShipment/AddEditShipmentDataSection';
import AddEditItemDataSection from '../../../components/shared/AddEditItemDataSection';
import AddEditShipmentCostSection from '../../../components/shipments/addShipment/AddEditShipmentCostSection';
import AddShipmentTextArea from '../../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import {
  costSectionInputsData,
  driverSectionInputsData,
  recipientSectionInputsData,
  shipmentSectionInputsData,
  shipperSectionInputsData,
} from '../../../lib/data/shipments';
import { useShipment } from '../../../hooks/useShipment';
import { useFormSubmission } from '../../../hooks/useFormSubmission ';

const AddShipment = () => {
  const { formData, setFormData, handleChange, getTotalCost } = useShipment();
  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'Shipment added successfully',
    redirectPath: '/shipments',
  });

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-primary rounded-lg p-8 mx-4 md:mx-0'
      >
        <AddEditItemDataSection
          section='driver'
          title='Driver'
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />

        <AddEditItemDataSection
          section='shipment'
          title='Shipment'
          inputs={shipmentSectionInputsData}
          value={formData}
          onChange={handleChange}
        />
        <AddShipmentTextArea
          name='shipmentNotes'
          value={formData.shipmentNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData((prev) => ({ ...prev, shipmentNotes: e.target.value }))
          }
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />
        <AddEditShipmentDataSection
          section='shipper'
          title='Shipper'
          inputs={shipperSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
        />
        <AddEditShipmentDataSection
          section='recipient'
          title='Recipient'
          inputs={recipientSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
        />
        <AddEditShipmentCostSection
          inputs={costSectionInputsData}
          nights={formData.stayedNights}
          setNights={(value: number) => setFormData((prev) => ({ ...prev, stayedNights: value }))}
          costPerNight={formData.costPerNight}
          setCostPerNight={(value: number) =>
            setFormData((prev) => ({ ...prev, costPerNight: value }))
          }
          value={formData}
          onChange={handleChange}
          totalCost={getTotalCost()}
        />
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666]' /> */}
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-primary text-[#FCFCFC] mt-4'
        >
          Add Shipment
        </button>
      </form>
    </>
  );
};

export default AddShipment;
