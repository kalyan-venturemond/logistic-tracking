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
  { label: 'الاسم', name: 'name' },
  { label: 'رقم السجل التجاري', name: 'commercialRegistration' },
  { label: 'البريد الإلكتروني', name: 'email' },
  { label: 'العنوان', name: 'address' },
];

export const editShipperAdditionalBranchSectionInputsData = [
  { label: 'الاسم', name: 'name' },
  { label: 'العنوان', name: 'address' },
  { label: 'رقم الهاتف (أساسي)', name: 'primaryPhoneNumber' },
  { label: 'رقم الهاتف (احتياطي)', name: 'secondaryPhoneNumber' },
];

export const addShipperAdditionalBranchSectionInputsData = [
  { label: 'البريد الإلكتروني', name: 'email' },
  { label: 'العنوان', name: 'address' },
];