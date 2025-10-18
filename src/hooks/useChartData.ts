import { arabicDateStringToISO, getRangeDates } from '../lib/utils';
import { Shipment } from '../types/shipments';

export const useChartData = (shipments: Shipment[], selectedOption: string) => {
  const filterShipmentsByDateRange = (shipments: Shipment[], option: string) => {
    if (option === 'all') return shipments;

    const { start, end } = getRangeDates(option);

    return shipments.filter((shipment: Shipment) => {
      const isoDate = arabicDateStringToISO(shipment.pickupDate);
      if (!isoDate) return false;

      const shipmentDate = new Date(isoDate);
      return shipmentDate >= start && shipmentDate <= end;
    });
  };

  const filteredShipments = filterShipmentsByDateRange(shipments, selectedOption);

  const getPieChartData = (filteredShipments: Shipment[]) => {
    const statusOrder = ['completed', 'returned', 'canceled', 'delayed', 'shipping', 'delivered'];

    const data = statusOrder.map(
      (status) =>
        filteredShipments.filter((shipment: Shipment) => shipment.status === status).length,
    );

    return {
      data,
      sum: filteredShipments.length,
    };
  };

  const pieChartData = getPieChartData(filteredShipments);

  return {
    pieChartData,
    filteredShipments,
  };
};
