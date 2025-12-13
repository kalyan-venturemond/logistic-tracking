/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ColumnFilterDropdown } from './ColumnFilterDropdown';
import { useNavigate } from 'react-router-dom';
import {
  arabicDateStringToISO,
  getShipmentStatusLabel,
  getShipmentStatusStyles,
  tableRowStyles,
} from '../../../lib/utils';
import { BiFilterAlt } from 'react-icons/bi';
import Pagination from '../../pagination/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import { Shipment } from '../../../types/shipments';

const columnsToFilter: { key: string; label: string }[] = [
  { key: 'admin', label: 'User' },
  { key: 'shipper', label: 'Shipper' },
  { key: 'shipperBranch', label: 'Shipper Branch' },
  { key: 'recipient', label: 'Recipient' },
  { key: 'driver', label: 'Driver' },
  { key: 'pickupCity', label: 'Origin' },
  { key: 'dropOffCity', label: 'Destination' },
  { key: 'date', label: 'Pickup Date' },
  { key: 'status', label: 'Status' },
];

const initialFilters: any = {};

columnsToFilter.forEach((col) => (initialFilters[col.key] = []));

const tableHeading = [
  { label: 'Tracking No.', key: 'id' },
  { label: 'Driver', key: 'driver' },
  { label: 'Shipper', key: 'shipper' },
  { label: 'Shipper Branch', key: 'shipperBranch' },
  { label: 'Recipient', key: 'recipient' },
  { label: 'User', key: 'admin' },
  { label: 'Origin', key: 'pickupCity' },
  { label: 'Destination', key: 'dropOffCity' },
  { label: 'Pickup Date', key: 'date' },
  { label: 'Status', key: 'status' },
];

const ShipmentsTable = ({
  shipments,
  searchValue,
}: {
  shipments: Shipment[];
  searchValue: string;
}) => {
  const navigate = useNavigate();
  const [dateSort, setDateSort] = useState<'asc' | 'desc' | undefined>();
  const [filters, setFilters] = useState(initialFilters);
  const [showFilter, setShowFilter] = useState<any>({});

  const filteredData = shipments.filter((shipment: Shipment) =>
    Object.keys(filters).every((key) => {
      if (key === 'date') {
        if (!filters[key] || filters[key].length === 0) return true;
        return filters[key].includes(shipment.pickupDate);
      }

      if (key === 'status') {
        if (!filters[key] || filters[key].length === 0) return true;
        // Label is already English now
        const statusLabel = getShipmentStatusLabel((shipment as Shipment)[key]);
        return filters[key].includes(statusLabel);
      }

      return (
        !filters[key] || filters[key].length === 0 || filters[key].includes((shipment as any)[key])
      );
    }),
  );

  const uniqueOptions: any = {};
  columnsToFilter.forEach((col) => {
    let values = filteredData.map((shipment: any) => {
      if (col.key === 'status') {
        return getShipmentStatusLabel(shipment[col.key]);
      }
      return shipment[col.key];
    });

    if (col.key === 'date') {
      values = values.filter(Boolean).map((dateStr: string) => dateStr);
    }
    uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  });

  const sortedData = [...filteredData];

  const parseDate = (dateStr: string): Date => {
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    const isoDate = arabicDateStringToISO(dateStr);
    if (isoDate) {
      return new Date(isoDate);
    }

    return new Date(dateStr);
  };

  if (dateSort === 'asc') {
    sortedData.sort((a, b) => {
      const dateA = parseDate(a.pickupDate);
      const dateB = parseDate(b.pickupDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  if (dateSort === 'desc') {
    sortedData.sort((a, b) => {
      const dateA = parseDate(a.pickupDate);
      const dateB = parseDate(b.pickupDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const { itemsPerPage, handlePageChange, handleItemsPerPageChange, paginate, setCurrentPage } =
    usePagination();
  const paginatedData = paginate(sortedData) as Shipment[];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, setCurrentPage]);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowFilter({});
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='w-full overflow-x-auto min-h-[40vh]'>
        <table className='bg-[#FCFCFC] w-full'>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {tableHeading.map((col, index) => (
                <th
                  key={col.key}
                  className={tableRowStyles + ' relative'}
                >
                  <div
                    className={`flex items-center gap-1 ${index === tableHeading.length - 1 && 'ms-4'
                      }`}
                  >
                    {col.label}

                    {uniqueOptions[col.key] && (
                      <button
                        type='button'
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFilter((prev: any) => (prev[col.key] ? {} : { [col.key]: true }));
                        }}
                      >
                        <BiFilterAlt
                          size={22}
                          color='#CC8B3D'
                        />
                      </button>
                    )}
                    {showFilter[col.key] && (
                      <div
                        className='z-50'
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <ColumnFilterDropdown
                          isPickupDate={col.key === 'date'}
                          dateSort={dateSort}
                          setDateSort={setDateSort}
                          options={uniqueOptions[col.key]}
                          selectedValues={filters[col.key] || []}
                          onChange={(vals: any) =>
                            setFilters((f: any) => ({
                              ...f,
                              [col.key]: vals,
                            }))
                          }
                          onClose={() =>
                            setShowFilter((f: any) => ({
                              ...f,
                              [col.key]: false,
                            }))
                          }
                          placeholder={`Search for ${col.label}`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((shipment: Shipment, index: number) => (
              <tr
                key={shipment.id}
                onClick={() => {
                  navigate(`/shipments/${shipment.id}`);
                }}
                className={`rounded-lg cursor-pointer ${index % 2 === 0 ? 'bg-[#F2F2F2]' : ''}`}
              >
                <td className={tableRowStyles}>{shipment.trackingNumber}</td>
                <td className={tableRowStyles}>{shipment.driver}</td>
                <td className={tableRowStyles}>{shipment.shipper}</td>
                <td className={tableRowStyles}>{shipment.shipperBranch}</td>
                <td className={tableRowStyles}>{shipment.recipient}</td>
                <td className={tableRowStyles}>{shipment.admin}</td>
                <td className={tableRowStyles}>{shipment.pickupCity}</td>
                <td className={tableRowStyles}>{shipment.dropOffCity}</td>
                <td className={tableRowStyles}>
                  {(shipment.pickupDate && arabicDateStringToISO(shipment.pickupDate)) || '-'}
                </td>
                <td className={tableRowStyles}>
                  <span
                    className={`py-2 text-center font-medium inline-block rounded-md w-36 text-sm ${getShipmentStatusStyles(
                      getShipmentStatusLabel(shipment.status),
                    )}`}
                  >
                    {getShipmentStatusLabel(shipment.status)}
                  </span>
                </td>
              </tr>
            ))}
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

export default ShipmentsTable;
