/* eslint-disable @typescript-eslint/no-explicit-any */
import ShippingShipmentIcon from '/images/shipmentStatus/shipping-shipment-truck.svg';
import delayedShipmentIcon from '/images/shipmentStatus/delayed-shipment-truck.svg';
import deliveredShipmentIcon from '/images/shipmentStatus/delivered-shipment-truck.svg';
import CancelledShipmentIcon from '/images/shipmentStatus/cancelled-shipment-truck.svg';
import returnedShipmentIcon from '/images/shipmentStatus/returned-shipment-truck.svg';
import completedShipmentIcon from '/images/shipmentStatus/completed-shipment-truck.svg';

export const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  return dateString.split(' ')[0];
};

export const getShipmentStatusStyles = (status: string) => {
  switch (status) {
    case 'In Transit':
      return 'bg-[#B3E5BD] text-[#071309]';
    case 'Delayed':
      return 'bg-[#FEDE9A] text-[#071309]';
    case 'Delivered':
      return 'bg-[#E6E6E6] text-[#333333]';
    case 'Canceled':
      return 'bg-[#CD2026] text-[#F8D3D4]';
    case 'Returned':
      return 'bg-[#F8D3D4] text-[#CD2026]';
    case 'Completed':
      return 'bg-[#2E853F] text-[#B3E5BD]'; // FCFCFC
    default:
      return 'bg-gray-300 text-[#071309]';
  }
};

export const getAvailabilityStatusStyles = (status: string) => {
  return status === 'available' ? 'bg-[#B3E5BD] text-[#2E853F]' : 'bg-[#CCCCCC] text-[#333333]';
};

export const getShipmentStatusLabel = (status: string) => {
  switch (status) {
    case 'shipping':
      return 'In Transit';
    case 'delayed':
      return 'Delayed';
    case 'delivered':
      return 'Delivered';
    case 'canceled':
      return 'Canceled';
    case 'returned':
      return 'Returned';
    case 'completed':
      return 'Completed';
    default:
      return 'Unknown';
  }
};

export const arabicDateStringToISO = (dateStr: string) => {
  // Keeping this for compatibility if bad data exists, but ideally unused.
  const months: { [key: string]: string } = {
    يناير: '01',
    فبراير: '02',
    مارس: '03',
    أبريل: '04',
    مايو: '05',
    يونيو: '06',
    يوليو: '07',
    أغسطس: '08',
    سبتمبر: '09',
    أكتوبر: '10',
    نوفمبر: '11',
    ديسمبر: '12',
  };
  const parts = dateStr.split(' ');
  // Handle English dates too just in case
  if (parts.length !== 3) return dateStr;
  const [day, monthAr, year] = parts;
  const month = months[monthAr];
  if (!month) return dateStr; // Fallback
  return `${year}-${month}-${day.padStart(2, '0')}`;
};

export const getRangeDates = (range: string): { start: Date; end: Date } => {
  const now = new Date();
  let start: Date;
  let end: Date;

  if (range === 'week') {
    const day = now.getDay();
    const diff = day === 6 ? 0 : (day + 1) % 7;
    start = new Date(now);
    start.setDate(now.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (range === 'month') {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    // End is last day of month
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  } else if (range === 'year') {
    start = new Date(now.getFullYear(), 0, 1);
    start.setHours(0, 0, 0, 0);
    end = new Date(now.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
  } else {
    start = new Date(now);
    end = new Date(now);
  }

  return { start, end };
};

export const tableRowStyles = 'py-2 px-4 text-nowrap text-left';

export const statusIcons: any = {
  'In Transit': ShippingShipmentIcon,
  'Delayed': delayedShipmentIcon,
  'Delivered': deliveredShipmentIcon,
  'Canceled': CancelledShipmentIcon,
  'Returned': returnedShipmentIcon,
  'Completed': completedShipmentIcon,
};

