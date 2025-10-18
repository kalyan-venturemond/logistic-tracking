import { useState } from 'react';
import { Admin, AdminFormData } from '../types/admins';

export const useAdmins = ({ selectedAdmin }: { selectedAdmin?: Admin }) => {
  const [formData, setFormData] = useState<AdminFormData>({
    nationalityId: 1,
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
    image: null as File | null,
    imagePreview: selectedAdmin?.image || '',
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
    setFormData((prev: AdminFormData) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    handleFileChange,
    handleChange,
  };
};
