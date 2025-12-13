/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShipmentFormData } from '../../../types/shipments';
import AddEditItemDataSection from '../../shared/AddEditItemDataSection';
import AddShipmentTextArea from './addShipmentInputs/AddShipmentTextArea';
import PhoneNumberInput from './addShipmentInputs/phoneNumberInput/PhoneNumberInput';

const AddEditShipmentDataSection = ({
  title,
  inputs,
  value,
  onChange,
  section,
  page,
  setFormData,
  existingNotes,
}: any) => {
  return (
    <div>
      <AddEditItemDataSection
        section={section}
        title={title}
        inputs={inputs}
        value={value}
        onChange={onChange}
        setFormData={setFormData}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-10'>
        {['PrimaryPhoneNumber', 'SecondaryPhoneNumber'].map((type, index) => (
          <PhoneNumberInput
            key={index}
            label={`Phone Number (${type === 'PrimaryPhoneNumber' ? 'Primary' : 'Secondary'})`}
            value={value[`${section}${type}`]}
            onChange={(val: string) =>
              onChange({ target: { name: `${section}${type}`, value: val } })
            }
          />
        ))}
      </div>
      <AddShipmentTextArea
        page={page}
        value={section === 'shipper' ? value.shipperNotes : value.recipientNotes}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setFormData((prev: ShipmentFormData) => ({
            ...prev,
            [section === 'shipper' ? 'shipperNotes' : 'recipientNotes']: e.target.value,
          }))
        }
        existingNotes={existingNotes}
      />
      <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />
    </div>
  );
};

export default AddEditShipmentDataSection;
