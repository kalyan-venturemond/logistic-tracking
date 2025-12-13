import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Pagination from '../pagination/Pagination';
import { tableRowStyles } from '../../lib/utils';
import { usePagination } from '../../hooks/usePagination';
import { Shipper } from '../../types/shippers';

/* eslint-disable @typescript-eslint/no-explicit-any */

const tableHeading = [
  { key: 'id', label: '(ID)' },
  { key: 'name', label: 'Name' },
  { key: 'primaryPhoneNumber', label: 'Primary Phone No.' },
  { key: 'secondaryPhoneNumber', label: 'Secondary Phone No.' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address' },
];
const ShippersTable = ({ data, searchValue }: { data: Shipper[]; searchValue: string }) => {
  const navigate = useNavigate();

  const { itemsPerPage, handlePageChange, handleItemsPerPageChange, paginate, setCurrentPage } =
    usePagination();
  const paginatedData = paginate(data) as Shipper[];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, setCurrentPage]);

  return (
    <>
      <div className={`w-full overflow-x-auto`}>
        <table className={`bg-[#FCFCFC] w-full`}>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {tableHeading.map((col, index) => (
                <th
                  key={col.key}
                  className={tableRowStyles}
                >
                  <div
                    className={`flex items-center gap-1 ${index === tableHeading.length - 1 && 'lg:ms-12'
                      }`}
                  >
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-Rubik font-medium'>
            {paginatedData.map((item: Shipper, index: number) => (
              <>
                <tr
                  key={item.id}
                  onClick={() => {
                    navigate(`/shippers/${item.id}`);
                  }}
                  className={`rounded-lg cursor-pointer ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}
                >
                  <td className={tableRowStyles}>{item.id}</td>
                  <td className={tableRowStyles}>{item.name}</td>
                  <td className={tableRowStyles}>{item.primaryPhoneNumber}</td>
                  <td className={tableRowStyles}>{item.secondaryPhoneNumber}</td>
                  <td className={tableRowStyles}>{item.email}</td>
                  <td className={tableRowStyles}>{item.address}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default ShippersTable;
