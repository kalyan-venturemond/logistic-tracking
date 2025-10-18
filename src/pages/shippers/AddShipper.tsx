import addIcon from '/images/add.svg';
import AddEditShipperDataSection from '../../components/shippers/AddEditShipperDataSection';
import AddShipmentTextArea from '../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import trashIcon from '/images/trash.svg';
import { useFormSubmission } from '../../hooks/useFormSubmission ';
import {
  addShipperAdditionalBranchSectionInputsData,
  shipperSectionInputsData,
} from '../../lib/data/shippers';
import { useShippers } from '../../hooks/useShippers';

const AddShipper = () => {
  const {
    branches,
    mainFormData,
    handleMainFormChange,
    handleBranchChange,
    addNewBranch,
    deleteBranch,
  } = useShippers();

  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'تم إضاافة العميل بنجاح',
    redirectPath: '/shippers',
  });

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-primary rounded-lg px-6 mx-4 md:mx-0'
      >
        <AddEditShipperDataSection
          inputs={shipperSectionInputsData}
          value={mainFormData}
          onChange={handleMainFormChange}
        />
        <AddShipmentTextArea
          page='addShipper'
          name='description'
          placeholder='أضف وصفٍا للمنشة ومجال عملها'
          value={mainFormData.description}
          onChange={handleMainFormChange}
        />

        {branches.map((branch, index) => (
          <div
            key={index}
            className='mt-8'
          >
            <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
            {branches.length > 0 ? (
              <div className='w-full flex items-center justify-between'>
                <h2 className='text-xl font-bold my-4'>الفرع ({index + 1})</h2>
                <button
                  type='button'
                  onClick={() => deleteBranch(index)}
                  className='flex items-center gap-2'
                >
                  <span className='font-Rubik text-primary text-sm'>حذف الفرع</span>
                  <img
                    src={trashIcon}
                    alt='delete branch'
                  />
                </button>
              </div>
            ) : (
              <h2 className='text-xl font-bold my-4'>الفرع ({index + 1})</h2>
            )}
            <AddEditShipperDataSection
              inputs={addShipperAdditionalBranchSectionInputsData}
              value={branch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBranchChange(index, e)}
            />
          </div>
        ))}

        <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
        <button
          type='button'
          onClick={addNewBranch}
          className='flex items-center gap-2 text-primary border-2 border-primary py-2 px-3 text-sm rounded-lg font-Rubik my-12'
        >
          <span>{branches.length > 0 ? 'إضافة فرع آخر' : 'إضافة فرع'}</span>
          <img
            src={addIcon}
            alt='upload image'
          />
        </button>
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-primary text-[#FCFCFC] mb-8'
        >
          إضافة العميل
        </button>
      </form>
    </>
  );
};

export default AddShipper;
