import { UseScreenSize } from '../../../context/ScreenSizeContext';
import AddEditItemDataSection from '../../shared/AddEditItemDataSection';
import AddEditItemInput from '../../shared/AddEditItemInput';

/* eslint-disable @typescript-eslint/no-explicit-any */
const AddEditShipmentCostSection = ({
  inputs,
  value,
  onChange,
  nights,
  setNights,
  costPerNight,
  setCostPerNight,
  totalCost,
  page,
}: any) => {
  const { isSmallScreen } = UseScreenSize();
  const handleNightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setNights(value);
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setCostPerNight(value);
  };

  return (
    <>
      <div>
        <AddEditItemDataSection
          title='Cost (SAR)'
          inputs={inputs}
          value={value}
          onChange={onChange}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='col-span-1 flex flex-col gap-1 font-Rubik'>
            <label className='text-[#1A1A1A]'>Overnight Stay</label>
            <div className='flex border border-[#CCCCCC] rounded-lg overflow-hidden py-1'>
              <input
                type='text'
                required
                placeholder={page === 'addShipment' ? (isSmallScreen ? 'Count' : ' Number of Nights') : ''}
                value={page === 'editShipment' ? `${nights} Nights` : undefined}
                onChange={handleNightsChange}
                className='w-2/6 lg:w-1/6 p-2 text-center border-l border-[#666666] focus:outline-none no-arrows'
              />
              <input
                type={page === 'editShipment' ? 'text' : 'number'}
                required
                placeholder={
                  page === 'addShipment'
                    ? isSmallScreen
                      ? 'Cost per night'
                      : 'Cost per single night'
                    : ''
                }
                value={page === 'editShipment' ? `${costPerNight} per single night` : undefined}
                onChange={handleCostChange}
                className='w-4/6 lg:w-5/6 py-2 ps-2 md:ps-4 lg:ps-10 text-start focus:outline-none no-arrows'
              />
            </div>
            {nights * costPerNight > 0 ? (
              <div className='text-primary mt-1'>
                Overnight Cost: {(nights * costPerNight).toLocaleString()} SAR
              </div>
            ) : (
              <span className='text-[#999999] text-sm mt-1'>Overnight cost appears here</span>
            )}
          </div>
          <div className='col-span-1'>
            <AddEditItemInput
              label='Discount'
              type='number'
              name='deduct'
              value={value.deduct}
              onChange={onChange}
              required={false}
            />
          </div>
        </div>
      </div>
      <div className='w-full mt-12 flex flex-col items-center gap-4 text-primary font-Rubik text-lg'>
        <span>Total Cost</span>
        <span className='font-bold'>{totalCost > 0 ? totalCost.toLocaleString() : 0} SAR</span>
      </div>
    </>
  );
};

export default AddEditShipmentCostSection;
