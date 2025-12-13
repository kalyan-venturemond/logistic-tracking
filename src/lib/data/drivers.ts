import { Driver } from "../../types/drivers";

export const driverSectionInputsData = [
  {
    label: 'Name',
    name: 'name',
  },
  {
    label: 'ID/Residency No.',
    name: 'identityNumber',
  },
  {
    label: 'Phone No.',
    name: 'phoneNumber',
  },
  {
    label: 'Branch',
    name: 'branch',
  },
  {
    label: 'Truck No.',
    name: 'vehicleNumber',
  },
];

export const selectMenuOptions = [
  { label: 'All', value: 'all' },
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

export const fieldsToCheck: (keyof Driver)[] = [
  'id',
  'name',
  'nationality',
  'identityNumber',
  'phoneNumber',
  'vehicleNumber',
  'status',
];
