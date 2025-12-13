import { useState } from 'react';
import AddEditItemDataSection from '../../components/shared/AddEditItemDataSection';
import uploadImage from '/images/upload.svg';
import infoIcon from '/images/info-circle.svg';
import FileUploadInput from '../../components/adminsDrivers/Admins/FileUploadInput';
import { MdCancelPresentation } from 'react-icons/md';
import { driverSectionInputsData } from '../../lib/data/drivers';
import { useDrivers } from '../../hooks/useDrivers';
import { useFormSubmission } from '../../hooks/useFormSubmission ';

const AddDriver = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { isLoading, handleSubmit } = useFormSubmission({
    successMessage: 'Driver added successfully',
    redirectPath: '/drivers',
  });

  const { formData, setFormData, handleFileChange, handleChange } = useDrivers();

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
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
          page='addDriver'
        />
        <div>
          <h1 className='font-bold text-lg md:text-3xl mt-12 mb-8'>License Information</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {[
              {
                uploadImageTitle: 'Add Front License Image',
                inputLabel: 'Issue Date',
              },
              { uploadImageTitle: 'Add Back License Image', inputLabel: 'Expiration Date' },
            ].map((item, index) => (
              <div
                key={index}
                className='col-span-1'
              >
                <FileUploadInput
                  onChange={handleFileChange}
                  title={item.uploadImageTitle}
                />
                <div className='col-span-1 flex flex-col gap-2 mt-8'>
                  <span className='text-[#1A1A1A] text-xl'>{item.inputLabel}</span>
                  <input
                    type='text'
                    className='p-3 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary'
                    min={0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <div>
          <div className='flex items-center gap-2 relative'>
            <h1 className='my-12 font-bold text-lg md:text-3xl'>Health Notes</h1>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className='relative'
            >
              <img
                src={infoIcon}
                alt='Info'
                className='cursor-pointer'
              />
              {isHovered && (
                <div className='absolute bottom-10 right-1/2 transform translate-x-1/2 mt-2 w-64 rounded-2xl shadow-lg p-6 z-10 font-Rubik text-[#864D13] border border-primary bg-[#FCF2E9]'>
                  <p>
                    e.g., vision or heart problems, or if the driver suffers from diabetes. This must be written along with
                    adding a medical report from an approved medical entity stating their ability to drive.
                  </p>
                  <div className='absolute -bottom-2 right-1/2 transform translate-x-1/2 w-4 h-4 bg-[#FCF2E9] rotate-45 border-b border-r border-primary '></div>
                </div>
              )}
            </div>
          </div>
          <div className='relative w-fit'>
            <input
              type='file'
              id='medical-report-upload'
              className='absolute inset-0 w-full h-full hidden cursor-pointer'
              accept='.pdf,.doc,.docx,.jpg,.png'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    medicalReport: file,
                    medicalReportName: file.name,
                  }));
                }
              }}
            />
            {formData.medicalReport ? (
              <div className='flex items-center gap-2 bg-[#F5F5F5] py-2 px-3 border-2 border-primary rounded-lg mt-2 mb-12'>
                <span className='text-[#1A1A1A]'>{formData.medicalReportName}</span>
                <button
                  type='button'
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      medicalReport: null,
                      medicalReportName: '',
                    }))
                  }
                  className='text-primary font-bold'
                >
                  <MdCancelPresentation size={20} />
                </button>
              </div>
            ) : (
              <label
                htmlFor='medical-report-upload'
                className='flex items-center gap-2 text-primary border-2 border-primary py-2 px-3 text-sm rounded-lg font-Rubik mt-2 mb-12 cursor-pointer'
              >
                <span>Upload Medical Report</span>
                <img
                  src={uploadImage}
                  alt='upload icon'
                />
              </label>
            )}
          </div>
        </div>
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' /> */}
        <button
          type='submit'
          className='w-full py-4 rounded-lg text-xl bg-primary text-[#FCFCFC] mt-4'
        >
          Add Driver
        </button>
      </form>
    </>
  );
};

export default AddDriver;
