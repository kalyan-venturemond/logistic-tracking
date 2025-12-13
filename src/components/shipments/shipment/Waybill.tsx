/* eslint-disable @typescript-eslint/no-explicit-any */

import { QRCodeSVG } from 'qrcode.react';
import WaybillInfoRow from './WaybillInfoRow';
import { Shipment } from '../../../types/shipments';
import { Driver } from '../../../types/drivers';
import { Shipper } from '../../../types/shippers';
import { Recipient } from '../../../types/recipients';

const Waybill = ({
  shipment,
  driver,
  shipper,
  recipient,
}: {
  shipment: Shipment;
  driver: Driver;
  shipper: Shipper;
  recipient: Recipient;
}) => {
  const driverDetails = [
    {
      value: 'Name',
      label: driver.name,
    },
    {
      value: 'ID Number',
      label: driver.identityNumber,
    },
    {
      value: 'Mobile Number',
      label: driver.phoneNumber,
    },
  ];

  const vehicleDetails = [
    {
      value: 'Truck Type',
      label: driver?.vehicle,
    },
    {
      value: 'Truck Number',
      label: driver.vehicleNumber,
    },
  ];

  const recipientDetails = [
    {
      value: 'Name',
      label: recipient.name,
    },
    {
      value: 'Contact Info',
      label: recipient.primaryPhoneNumber,
    },
    {
      value: 'Address',
      label: recipient.address.slice(0, 25),
    },
  ];

  const shipperDetails = [
    {
      value: 'Name',
      label: shipper.name,
    },
    {
      value: 'Contact Info',
      label: shipper.primaryPhoneNumber,
    },
    {
      value: 'Branch',
      label: shipper.address,
    },
  ];

  const shipmentDetails = [
    {
      value: 'From',
      label: shipment.pickupCity,
    },
    {
      value: 'To',
      label: shipment.dropOffCity,
    },
    {
      value: 'Contents',
      label: shipment.content,
    },
    {
      value: 'Weight',
      label: shipment.weight,
    },
  ];

  return (
    <div
      id='waybill-printable'
      className='m-0 bg-[#fff] rounded-2xl p-4 font-Rubik text-[#1a1a1a] text-left'
    >
      <div className='flex xs:flex-col xs:items-center gap-4 md:gap-0 xs:text-center text-left justify-between'>
        <div className='font-light'>
          <div className='font-bold'>AL Jeed Transportation</div>
          <div>
            <span>Jeddah</span> Branch
          </div>
          <div>
            <span>C.R</span> 4030172574
          </div>
          <span className='hidden sm:block'>date: {shipment.pickupDate}</span>
        </div>
        <img
          src='/images/truck-Logo.svg'
          alt='logo'
          className='w-24 mx-auto'
        />
        <div className='font-Almarai xs:text-center text-right'>
          <div className='font-bold'>Al Jeed Transportation</div>
          <div>
            Branch <span>Jeddah</span>
          </div>
          <div>
            C.R: <span>4030172574</span>
          </div>
          <div className='mt-2 px-2 py-1 rounded-lg bg-primary text-[#FCFCFC] w-fit mx-auto hidden sm:block'>
            <span>Shipment Number: </span> <span>{shipment.trackingNumber}</span>
          </div>
        </div>
      </div>
      <hr className='border-0 border-t-2 border-solid border-[#666] mt-2 mb-6' />
      <div className='text-center font-Almarai font-bold text-lg mb-4'>Truck Loading Manifest</div>

      <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>Truck Details</div>
            {vehicleDetails.map(
              (row: { value: string; label?: string | undefined }, index: number) => (
                <div key={index}>
                  <WaybillInfoRow
                    label={row.value}
                    value={row.label || '-'}
                  />
                </div>
              ),
            )}
          </div>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>Driver Details</div>
            {driverDetails.map((row: { value: string; label: string }, index: number) => (
              <div key={index}>
                <WaybillInfoRow
                  label={row.value}
                  value={row.label}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 bg-[#F2F2F2] p-2 rounded-lg print-bg-gray'>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>Recipient Details</div>
            {recipientDetails.map((row: { value: string; label: string }, index: number) => (
              <div key={index}>
                <WaybillInfoRow
                  label={row.value}
                  value={row.label}
                />
              </div>
            ))}
          </div>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>Shipper Details</div>
            {shipperDetails.map((row: { value: string; label: string }, index: number) => (
              <div key={index}>
                <WaybillInfoRow
                  label={row.value}
                  value={row.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2'>
        <div className='col-span-2'>
          <div className='font-Almarai font-bold text-lg mb-1'>Shipment Details</div>
          {shipmentDetails.map((row: any, index: number) => (
            <div key={index}>
              <WaybillInfoRow
                label={row.value}
                value={row.label}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 bg-[#FCF2E9] border-2 border-[#ffb678] rounded-lg p-2 text-sm'>
        <div>Notes:</div>
        {[
          'Please ensure heavy tarp',
          'Please deliver shipment on date 2025/1/20',
          'Ensure returning the thermometer device',
        ].map((item, index) => (
          <div key={index}>- {item}</div>
        ))}
      </div>

      <hr className='border-0 border-t-2 border-solid border-[#666] my-6' />
      <div className='text-center font-Almarai font-semibold text-lg'>Driver Declaration</div>
      <div className='text-sm text-[1A1A1A] mt-2'>
        I, the driver named above, pledge that I am responsible for all damages to the shipment.
        I also pledge to inspect the shipment during my journey, and I am responsible for informing
        the establishment as soon as possible in case of any emergency, and this is my declaration.{' '}
      </div>

      <div className='w-full grid grid-cols-3 mt-6'>
        <div className='col-span-1'>
          <p className='text-center whitespace-nowrap overflow-hidden text-ellipsis'>
            Employee Signature
          </p>
          <hr className='border-0 border-t-2 border-dashed border-[#666] mt-6' />
        </div>
        <div className='col-span-1 text-center'>
          <div className='border-2 border-primary p-1 w-fit m-auto'>
            <QRCodeSVG
              value={`https://shuhnaty.vercel.app/shipments/${shipment.id}`}
              size={50}
              bgColor='#ffffff'
              fgColor='#212121'
              level='H'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <p className='text-center whitespace-nowrap overflow-hidden text-ellipsis'>
            Driver Signature
          </p>
          <hr className='border-0 border-t-2 border-dashed border-[#666] mt-6' />
        </div>
      </div>
    </div>
  );
};

export default Waybill;
