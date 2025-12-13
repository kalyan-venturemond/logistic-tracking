import { useEffect } from 'react';
import AddEditItemDataSection from '../../components/shared/AddEditItemDataSection';
import FileUploadInput from '../../components/adminsDrivers/Admins/FileUploadInput';
import { admins } from '../../lib/data/mainData';
import { useParams } from 'react-router-dom';
import { useFormSubmission } from '../../hooks/useFormSubmission ';
import { addEditAdminInputsData } from '../../lib/data/admins';
import { useAdmins } from '../../hooks/useAdmins';

const EditAdmin = () => {
  const { adminId } = useParams();
  const selectedAdmin = admins.find((admin) => admin.id === Number(adminId));
  const { formData, setFormData, handleFileChange, handleChange } = useAdmins({ selectedAdmin });

  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'User data updated successfully',
    redirectPath: '/admins',
  });

  useEffect(() => {
    if (selectedAdmin) {
      setFormData({
        ...selectedAdmin,
        image: null,
        imagePreview: selectedAdmin.image,
      });
    }
  }, [selectedAdmin, setFormData]);

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-primary rounded-lg p-8 mx-4 md:mx-0'
      >
        <FileUploadInput
          onChange={handleFileChange}
          initialImage={selectedAdmin?.image}
        />{' '}
        <AddEditItemDataSection
          inputs={addEditAdminInputsData}
          value={formData}
          onChange={handleChange}
          page='editAdmin'
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-primary text-[#FCFCFC] mt-4'
        >
          Update Data
        </button>
      </form>
    </>
  );
};

export default EditAdmin;
