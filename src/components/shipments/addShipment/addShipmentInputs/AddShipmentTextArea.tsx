/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

const AddShipmentTextArea = ({
  name,
  value,
  onChange,
  page,
  existingNotes,
  placeholder = 'You can add notes here for the driver to pay attention to',
}: {
  name?: string | undefined;
  value: string;
  onChange: any;
  page?: string | undefined;
  existingNotes?: boolean | undefined;
  placeholder?: string | undefined;
}) => {
  const [isNotesAreaVisible, setIsNotesAreaVisible] = useState(false);
  const getButtonLabel = () => {
    if (page === 'addShipper') return 'Add Facility Description';
    else if (page === 'editShipper') {
      if (existingNotes) {
        return 'Edit Facility Description';
      }
      return 'Add Facility Description';
    } else if (page === 'editShipment' && existingNotes) return 'Edit Notes';
    else return 'Add Notes';
  };

  return (
    <>
      {isNotesAreaVisible ? (
        <div className='w-full flex flex-col items-start mb-12'>
          <span>{page === 'addShipper' ? 'Facility Description' : 'Notes'}</span>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='w-full h-56 mt-4 mb-2 p-4 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none font-Rubik'
          ></textarea>
          <div className='w-full flex items-center justify-end'>
            <button
              type='button'
              onClick={() => setIsNotesAreaVisible(false)}
              className='col-span-1 bg-primary text-[#FCFCFC] border border-primary p-2 rounded-lg'
            >
              Hide
            </button>
          </div>
        </div>
      ) : (
        <button
          type='button'
          onClick={() => setIsNotesAreaVisible(true)}
          className='col-span-1 bg-primary text-[#FCFCFC] border border-primary p-2 rounded-lg mb-6'
        >
          {getButtonLabel()}
        </button>
      )}
    </>
  );
};

export default AddShipmentTextArea;
