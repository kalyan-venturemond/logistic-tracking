/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TimesDialog from './TimesDialog';
import DurationsDialog from './DurationsDialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const RepeatMessageDialog = ({
  isDialogVisible,
  setIsDialogVisible,
}: {
  isDialogVisible: boolean;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setIsDialogVisible(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={isDialogVisible}
    >
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id='customized-dialog-title'
        className='text-primary text-center !font-Almarai !text-2xl'
      >
        Repeat Sending
      </DialogTitle>
      <DialogContent
        sx={{ margin: '0 6px' }}
      >
        <span className='text-primary text-lg'>Message every:</span>
        <TimesDialog />
        <span className='text-primary text-lg inline-block mt-4'>Repeat for:</span>
        <DurationsDialog />
      </DialogContent>
      <DialogActions sx={{ margin: '10px 6px 0' }}>
        <div className='grid grid-cols-2 gap-4 w-full mb-2'>
          {['Apply', 'Delete'].map((item, index) => {
            return (
              <div key={index}>
                <button
                  onClick={handleClose}
                  type='button'
                  className={`col-span-1 py-3 rounded-lg border w-full ${index === 0 ? 'bg-primary text-[#FCFCFC]' : 'bg-[#FCFCFC] text-primary'
                    }`}
                >
                  {item}
                </button>
              </div>
            );
          })}
        </div>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default RepeatMessageDialog;
