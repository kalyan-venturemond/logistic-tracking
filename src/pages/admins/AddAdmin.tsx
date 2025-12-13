import AddEditItemDataSection from '../../components/shared/AddEditItemDataSection';
import FileUploadInput from '../../components/adminsDrivers/Admins/FileUploadInput';
import { useFormSubmission } from '../../hooks/useFormSubmission ';
import { addEditAdminInputsData } from '../../lib/data/admins';
import { useAdmins } from '../../hooks/useAdmins';

const AddAdmin = () => {
  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'User added successfully',
    redirectPath: '/admins',
  });

  const { formData, handleFileChange, handleChange } = useAdmins({});

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
        <FileUploadInput onChange={handleFileChange} />{' '}
        <AddEditItemDataSection
          inputs={addEditAdminInputsData}
          value={formData}
          onChange={handleChange}
          page='addAdmin'
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-primary text-[#FCFCFC] mt-4'
        >
          Add User
        </button>
      </form>
    </>
  );
};

export default AddAdmin;
