import { useState } from 'react';

const times = ['6 Hours', '12 Hours', '24 Hours'];

const sharedStyles = ['border-r-[#864D13] border-[#FCF2E9]', 'border-r-primary border-[#F2F2F2]'];

const borderStyles = [
  {
    selected: sharedStyles[0],
    unselected: sharedStyles[1],
    transform: 'rotate(-45deg)',
  },
  {
    selected: `border-t-[#864D13] ${sharedStyles[0]}`,
    unselected: `border-t-primary ${sharedStyles[1]}`,
    transform: 'rotate(-315deg)',
  },
  {
    selected: 'border-[#864D13]',
    unselected: 'border-primary',
    transform: '',
  },
];

const getStyles = (index: number, isSelected: boolean) => {
  const { selected, unselected } = borderStyles[index];
  return `absolute inset-0 rounded-full border-8 transition-all duration-200 ${isSelected ? selected : unselected
    }`;
};

const TimesDialog = () => {
  const [selectedTime, setSelectedTime] = useState(times[0]);

  return (
    <div className='grid grid-cols-1 place-items-center sm:grid-cols-3 my-4 font-Rubik'>
      {times.map((time, index) => (
        <div
          key={index}
          className={`col-span-1 p-4 rounded-xl transition-all duration-200 ${selectedTime === time ? 'bg-primary' : ''
            }`}
          onClick={() => setSelectedTime(time)}
        >
          <div className='flex items-center justify-center w-24 h-24 relative text-primary'>
            <div
              className={getStyles(index, selectedTime === time)}
              style={{
                transform: borderStyles[index].transform,
              }}
            ></div>
            <span
              className={`text-sm transition-all duration-200 ${selectedTime === time ? 'text-[#FCFCFC]' : ''
                }`}
            >
              {time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimesDialog;
