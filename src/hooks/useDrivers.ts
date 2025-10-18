// hooks/useDriversImageUpload.ts
import { useState } from 'react';
import { DriverFormData } from '../types/drivers';

export const useDrivers = () => {
  const [formData, setFormData] = useState<DriverFormData>({
    id: 0,
    name: '',
    nationalityId: 0,
    languageId: 0,
    identityNumber: '',
    phoneNumber: '',
    branch: '',
    vehicleId: 0,
    vehicleType: '',
    vehicleNumber: '',
    image: null as File | null,
    imagePreview: '',
    licenseIssueDate: '',
    licenseExpirationDate: '',
    medicalReport: null as File | null,
    medicalReportName: '',
  });

  const handleFileChange = (file: File | null, previewUrl: string | null) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: previewUrl || prev.imagePreview,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: DriverFormData) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    handleFileChange,
    handleChange,
  };
};
