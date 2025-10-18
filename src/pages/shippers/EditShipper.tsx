import { useEffect } from 'react';
import addIcon from '/images/add.svg';
import AddEditShipperDataSection from '../../components/shippers/AddEditShipperDataSection';
import AddShipmentTextArea from '../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import { useParams } from 'react-router-dom';
import { shippers } from '../../lib/data/mainData';
import trashIcon from '/images/trash.svg';
import { useFormSubmission } from '../../hooks/useFormSubmission ';
import {
  editShipperAdditionalBranchSectionInputsData,
  shipperSectionInputsData,
} from '../../lib/data/shippers';
import { useShippers } from '../../hooks/useShippers';

const EditShipper = () => {
  const { shipperId } = useParams();
  const selectedShipper = shippers.find((shipper) => shipper?.id === Number(shipperId));

  const {
    branches,
    setBranches,
    mainFormData,
    setMainFormData,
    handleMainFormChange,
    handleBranchChange,
    addNewBranch,
    deleteBranch,
  } = useShippers();

  useEffect(() => {
    if (selectedShipper) {
      setMainFormData({
        ...selectedShipper,
      });
      if (selectedShipper.branches && selectedShipper.branches.length > 0) {
        const formattedBranches = selectedShipper.branches.map((branch) => ({
          id: branch.id ?? 0,
          name: branch.name ?? '',
          address: branch.address ?? '',
          primaryPhoneNumber: branch.primaryPhoneNumber ?? '',
          secondaryPhoneNumber: branch.secondaryPhoneNumber ?? '',
          email: branch.email ?? '',
          description: branch.description ?? '',
        }));
        setBranches(formattedBranches);
      }
    }
  }, [selectedShipper, setBranches, setMainFormData]);

  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'تم تحديث بيانات العميل بنجاح',
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
        className='border border-[#DD7E1F] rounded-lg px-6 mx-4 md:mx-0'
      >
        <AddEditShipperDataSection
          inputs={shipperSectionInputsData}
          value={mainFormData}
          onChange={handleMainFormChange}
        />
        <AddShipmentTextArea
          page='editShipper'
          value={mainFormData.description}
          onChange={handleMainFormChange}
          existingNotes={!!selectedShipper?.description}
        />

        {branches.map((branch, index) => (
          <div
            key={branch.id}
            className='mt-8'
          >
            <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
            <div className='w-full flex items-center justify-between'>
              <h2 className='text-xl font-bold my-4'>الفرع ({index + 1})</h2>
              <button
                type='button'
                onClick={() => deleteBranch(index)}
                className='flex items-center gap-2'
              >
                <span className='font-Rubik text-[#DD7E1F] text-sm'>حذف الفرع</span>
                <img
                  src={trashIcon}
                  alt='delete branch'
                />
              </button>
            </div>
            <AddEditShipperDataSection
              inputs={editShipperAdditionalBranchSectionInputsData}
              value={branch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBranchChange(index, e)}
            />
          </div>
        ))}

        <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
        <button
          type='button'
          onClick={addNewBranch}
          className='flex items-center gap-2 text-[#DD7E1F] border-2 border-[#DD7E1F] py-2 px-3 text-sm rounded-lg font-Rubik my-12'
        >
          <span>إضافة فرع آخر</span>
          <img
            src={addIcon}
            alt='upload image'
          />
        </button>
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mb-8'
        >
          تحديث البيانات
        </button>
      </form>
    </>
  );
};

export default EditShipper;
