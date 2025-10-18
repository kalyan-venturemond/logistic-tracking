import { useNavigate } from 'react-router-dom';
import { getAvailabilityStatusStyles, tableRowStyles } from '../../../lib/utils';
import Pagination from '../../pagination/Pagination';
import { useEffect, useState } from 'react';
import { usePagination } from '../../../hooks/usePagination';
import { Driver } from '../../../types/drivers';


const tableHeading = [
  { key: 'id', label: '(ID)' },
  { key: 'name', label: 'الاسم' },
  { key: 'language', label: 'اللغة' },
  { key: 'nationality', label: 'الجنسية' },
  { key: 'branch', label: 'الفرع' },
  { key: 'identityNumber', label: 'رقم الهوية' },
  { key: 'phoneNumber', label: 'رقم الجوال' },
  { key: 'vehicleType', label: 'نوع الشاحنة' },
  { key: 'vehicleNumber', label: 'رقم الشاحنة' },
  { key: 'status', label: 'الحالة' },
];
const DriversTable = ({
  selectedStatus,
  drivers,
  searchValue,
  isSelectRecipientsPage = false,
}: {
  selectedStatus: string;
  drivers: Driver[];
  searchValue: string;
  isSelectRecipientsPage?: boolean;
}) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredData = drivers.filter(
    (driver: Driver) =>
      selectedStatus === 'all' || driver.status.toLowerCase() === selectedStatus.toLowerCase(),
  );

  const sortedData = [...filteredData].sort((a: Driver, b: Driver) => a.id - b.id);

  const { itemsPerPage, handlePageChange, handleItemsPerPageChange, paginate, setCurrentPage } =
    usePagination();
  const paginatedData = paginate(sortedData) as Driver[];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, setCurrentPage]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map((_, index: number) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <>
      <div className={`w-full overflow-x-auto`}>
        <table className={`bg-[#FCFCFC] w-full`}>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {isSelectRecipientsPage && (
                <th className={tableRowStyles}>
                  <input
                    className='w-4 h-4'
                    type='checkbox'
                    checked={selectedRows.length === paginatedData.length}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {tableHeading.map((col, index) => (
                <th
                  key={col.key}
                  className={tableRowStyles}
                >
                  <div
                    className={`flex items-center gap-1 ${
                      index === tableHeading.length - 1 && 'ms-20'
                    }`}
                  >
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((item: Driver, index: number) => {
              return (
                <tr
                  key={item?.id}
                  className={`rounded-lg cursor-pointer ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}
                >
                  {isSelectRecipientsPage && (
                    <td className={tableRowStyles}>
                      <input
                        className='w-4 h-4'
                        type='checkbox'
                        checked={selectedRows.includes(index)}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>
                  )}
                  <button
                    type='button'
                    key={index}
                    onClick={() => {
                      navigate(`/drivers/${item.id}`);
                    }}
                    style={{ display: 'contents' }}
                  >
                    <td className={tableRowStyles}>{item?.id}</td>
                    <td className={tableRowStyles}>{item?.name}</td>
                    <td className={tableRowStyles}>{item?.language}</td>
                    <td className={tableRowStyles}>{item?.nationality}</td>
                    <td className={tableRowStyles}>{item?.branch}</td>
                    <td className={tableRowStyles}>{item?.identityNumber}</td>
                    <td className={tableRowStyles}>{item?.phoneNumber}</td>
                    <td className={tableRowStyles}>{item?.vehicle}</td>
                    <td className={tableRowStyles}>{item?.vehicleNumber}</td>
                    <td className='py-2 px-4 text-center '>
                      <span
                        className={`p-2 inline-block rounded-md w-44 text-sm ${getAvailabilityStatusStyles(
                          item.status,
                        )}`}
                      >
                        {item.status === 'available' ? 'متاح' : 'غير متاح'}
                      </span>
                    </td>
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={sortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default DriversTable;
