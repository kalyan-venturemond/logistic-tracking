import { useState } from 'react';
import { PiSunDimLight } from 'react-icons/pi';

const durations = ['1 Day', '3 Days', '1 Week'];

const DurationsDialog = () => {
  const [selectedDuration, setSelectedDuration] = useState(durations[2]);

  return (
    <div className='grid grid-cols-3 gap-2 my-4 font-Rubik'>
      {durations.map((duration, index) => (
        <div
          onClick={() => setSelectedDuration(duration)}
          key={index}
          className={`px-4 py-7 rounded-xl transition-all duration-200 col-span-1 flex flex-col items-center gap-2 ${selectedDuration === duration ? 'bg-primary text-[#FCFCFC]' : 'text-primary'
            }`}
        >
          <PiSunDimLight size={32} />
          <span className='text-nowrap'>{duration}</span>
        </div>
      ))}
    </div>
  );
};

export default DurationsDialog;
