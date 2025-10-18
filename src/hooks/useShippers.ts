import { useState } from 'react';
import { Branch } from '../types/shippers';

export const useShippers = () => {
  const [mainFormData, setMainFormData] = useState<Branch>({
    name: '',
    email: '',
    address: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
    description: '',
  });
  const [branches, setBranches] = useState<Branch[]>([]);

  const handleMainFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMainFormData((prev: Branch) => ({ ...prev, [name]: value }));
  };

  const handleBranchChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBranches((prev: Branch[]) => {
      const updatedBranches = [...prev];
      updatedBranches[index] = {
        ...updatedBranches[index],
        [name]: value,
      };
      return updatedBranches;
    });
  };

  const addNewBranch = () => {
    setBranches((prev: Branch[]) => [
      ...prev,
      {
        name: '',
        email: '',
        address: '',
        primaryPhoneNumber: '',
        secondaryPhoneNumber: '',
        description: '',
      },
    ]);
  };

  const deleteBranch = (index: number) => {
    setBranches((prev: Branch[]) => prev.filter((_, i) => i !== index));
  };

  return {
    handleMainFormChange,
    handleBranchChange,
    addNewBranch,
    deleteBranch,
    mainFormData,
    setMainFormData,
    branches,
    setBranches,
  };
};
