/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import SelectMenu from '../../components/SelectMenu';
import SearchInput from '../../components/searchInput/SearchInput';
import { useNavigate } from 'react-router-dom';
import leftArrowIcon from '/images/arrow-left.svg';
import { drivers } from '../../lib/data/mainData';
import DriversTable from '../../components/adminsDrivers/drivers/DriversTable';
import { Driver } from '../../types/drivers';
import { useFilteredSearchValue } from '../../hooks/useFilteredSearchValue';
import { selectMenuOptions } from '../../lib/data/shared';

const fieldsToCheck: (keyof Driver)[] = [
  'id',
  'name',
  'nationality',
  'identityNumber',
  'phoneNumber',
  'vehicleNumber',
  'status',
];

const SelectRecipients = () => {
  const navigate = useNavigate();
  const [selectedDriverStatus, setSelectedDriverStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const { filteredData, searchValue, setSearchValue } = useFilteredSearchValue(
    fieldsToCheck,
    drivers,
  );

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <div className='p-4'>
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />

          <button
            type='button'
            className='flex items-center py-2 px-10 gap-2 rounded-lg bg-primary text-white text-lg'
            onClick={() => {
              navigate('/alert-messages');
            }}
          >
            Continue
            <img
              src={leftArrowIcon}
              alt='continue'
            />
          </button>
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='text-xl font-bold'>Drivers List</h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedDriverStatus}
              setSelectedItem={setSelectedDriverStatus}
            />
          </div>
          <DriversTable
            selectedStatus={selectedDriverStatus}
            drivers={filteredData}
            isSelectRecipientsPage={true}
            searchValue={searchValue}
          />
        </div>
      </div>
    </>
  );
};

export default SelectRecipients;
