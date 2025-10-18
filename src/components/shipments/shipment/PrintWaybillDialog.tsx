import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Waybill from './Waybill';
import { Shipment } from '../../../types/shipments';
import { Driver } from '../../../types/drivers';
import { Shipper } from '../../../types/shippers';
import { Recipient } from '../../../types/recipients';

const PrintWaybillDialog = ({
  shipment,
  driver,
  shipper,
  recipient,
  open,
  setOpen,
}: {
  shipment: Shipment;
  driver: Driver;
  shipper: Shipper;
  recipient: Recipient;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='lg'
        scroll={'paper'}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '0px',
            transform: 'translateZ(0)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
            width: {
              xs: '95%',
              sm: '90%',
              md: '70%',
              lg: '70%',
            },
            maxWidth: {
              xs: 'none',
              lg: '700px',
            },
            margin: {
              xs: '0px',
              sm: '32px',
            },
          },
        }}
      >
        <DialogContent
          sx={{
            padding: '0',
            transform: 'translateZ(0)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Waybill
            shipment={shipment}
            driver={driver}
            shipper={shipper}
            recipient={recipient}
          />
        </DialogContent>
        <DialogActions sx={{ margin: '10px 0 0' }}>
          <div className='grid grid-cols-2 gap-4 w-full mb-2'>
            {['إلغاء', 'طباعة'].map((item: string, index: number) => (
              <button
                type='button'
                onClick={
                  index === 0
                    ? () => setOpen(false)
                    : () => {
                        window.print();
                        setTimeout(() => setOpen(false), 400);
                      }
                }
                key={index}
                className={`col-span-1 ${
                  index === 0 ? 'bg-[#FCFCFC] text-primary' : 'bg-primary text-[#FCFCFC]'
                } border border-primary py-3 rounded-lg`}
              >
                {item}
              </button>
            ))}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PrintWaybillDialog;
