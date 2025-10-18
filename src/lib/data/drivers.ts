import { Driver } from "../../types/drivers";

export const driverSectionInputsData = [
  {
    label: 'الاسم',
    name: 'name',
  },
  {
    label: 'رقم الهوية/الإقامة',
    name: 'identityNumber',
  },
  {
    label: 'رقم الهاتف',
    name: 'phoneNumber',
  },
  {
    label: 'الفرع',
    name: 'branch',
  },
  {
    label: 'رقم الشاحنة',
    name: 'vehicleNumber',
  },
];

export const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'يوم', value: 'day' },
  { label: 'أسبوع', value: 'week' },
  { label: 'شهر', value: 'month' },
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
