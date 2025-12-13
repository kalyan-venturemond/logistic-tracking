import { Admin } from "../../types/admins";

export const addEditAdminInputsData = [
  {
    label: 'First Name',
    name: 'firstName',
  },
  {
    label: 'Last Name',
    name: 'lastName',
  },
  {
    label: 'Username',
    name: 'userName',
  },
  {
    label: 'Phone No.',
    name: 'phoneNumber',
  },
  {
    label: 'Email',
    name: 'email',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    description: ['At least 8 characters', 'English letters and numbers only'],
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