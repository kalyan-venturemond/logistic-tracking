import { Shipper } from "../../types/shippers";

export const fieldsToCheck: (keyof Shipper)[] = [
  'id',
  'name',
  'primaryPhoneNumber',
  'secondaryPhoneNumber',
  'email',
  'address',
];

export const shipperSectionInputsData = [
  { label: 'Name', name: 'name' },
  { label: 'Commercial Registration No.', name: 'commercialRegistration' },
  { label: 'Email', name: 'email' },
  { label: 'Address', name: 'address' },
];

export const editShipperAdditionalBranchSectionInputsData = [
  { label: 'Name', name: 'name' },
  { label: 'Address', name: 'address' },
  { label: 'Primary Phone', name: 'primaryPhoneNumber' },
  { label: 'Secondary Phone', name: 'secondaryPhoneNumber' },
];

export const addShipperAdditionalBranchSectionInputsData = [
  { label: 'Email', name: 'email' },
  { label: 'Address', name: 'address' },
];