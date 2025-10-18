import { Admin } from "../../types/admins";

export const addEditAdminInputsData = [
  {
    label: 'الاسم الأول',
    name: 'firstName',
  },
  {
    label: 'الاسم الأخير',
    name: 'lastName',
  },
  {
    label: 'اسم المستخدم',
    name: 'userName',
  },
  {
    label: 'رقم التواصل',
    name: 'phoneNumber',
  },
  {
    label: 'البريد الإلكتروني',
    name: 'email',
  },
  {
    label: 'كلمة المرور',
    name: 'password',
    type: 'password',
    description: ['لا تقل عن 8 أحرف', 'حروف وأرقام إنجليزية فقط'],
  },
];

export const fieldsToCheck: (keyof Admin)[] = [
  'id',
  'userName',
  'firstName',
  'lastName',
  'email',
  'nationality',
  'status',
];