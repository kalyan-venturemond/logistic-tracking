export interface Driver {
    id: number;
    name: string;
    nationality: string;
    nationalityId: number;
    language: string;
    languageId: number;
    identityNumber: string;
    phoneNumber: string;
    vehicle: string;
    vehicleId: number;
    vehicleType?: string;
    vehicleNumber: string;
    status: string;
    image: string;
    branch: string;
    licenseImage: string;
    licenseIssueDate: string;
    licenseExpirationDate: string;
    licenseStatus: string;
}

export interface DriverFormData {
  id: number;
  name: string;
  nationalityId: number;
  languageId: number;
  identityNumber: string;
  phoneNumber: string;
  branch: string;
  vehicleId: number;
  vehicleType: string;
  vehicleNumber: string;
  image: File | null;
  imagePreview: string;
  licenseIssueDate?: string | null;
  licenseExpirationDate?: string | null;
  medicalReport: File | null;
  medicalReportName: string;
}