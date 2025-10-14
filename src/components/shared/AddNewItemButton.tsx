/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

const AddNewItemButton = ({ title, path }: any) => {
  const navigate = useNavigate();
  return (
    <button
      type='button'
      className='flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg'
      onClick={() => {
        navigate(path);
      }}
    >
      {title}
      <FiPlus size={24} />
    </button>
  );
};

export default AddNewItemButton;
