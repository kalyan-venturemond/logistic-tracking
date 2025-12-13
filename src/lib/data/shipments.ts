import { Shipment } from "../../types/shipments";

export const driverSectionInputsData = [
  { label: 'Truck Number', name: 'driverVehicleNumber' },
  { label: 'Phone Number', name: 'driverPhoneNumber' },
];

export const costSectionInputsData = [
  { label: 'Base Cost', name: 'baseCost', type: 'number' },
  { label: 'Extra Cost', name: 'extraCost', type: 'number' },
];

export const shipmentSectionInputsData = [
  {
    label: 'Pickup Date',
    name: 'shipmentPickupDate',
    type: 'date',
    description:
      'The pickup date is automatically set to today. You can modify it if the shipment requires a specific pickup date.',
  },
  {
    label: 'Delivery Date',
    name: 'shipmentExpectedDeliveryDate',
    type: 'date',
    description: 'Confirm the exact delivery date with the recipient',
  },
  { label: 'Content', name: 'shipmentContent' },
  { label: 'Weight (Ton)', name: 'shipmentWeight' },
];

export const shipperSectionInputsData = [{ label: 'Address', name: 'shipperAddress' }];

export const recipientSectionInputsData = [{ label: 'Address', name: 'recipientAddress' }];

export const selectMenuOptions = [
  { label: 'All', value: 'all' },
  { label: 'In Transit', value: 'shipping' },
  { label: 'Delayed', value: 'delayed' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Completed', value: 'completed' },
  { label: 'Canceled', value: 'canceled' },
  { label: 'Returned', value: 'returned' },
];

export const fieldsToCheck: (keyof Shipment)[] = [
  'id',
  'admin',
  'recipient',
  'driver',
  'shipperBranch',
  'pickupCity',
  'dropOffCity',
  'pickupDate',
  'status',
];
