import { useState } from 'react';
import SearchInput from '../searchInput/SearchInput';
import Messages from './Messages';
import { Message } from '../../types/alertMessages';

const MessagesHistoryPanel = ({
  messagesData,
  selectedMessageId,
  setSelectedMessageId,
  selectedCategory,
  setSelectedCategory,
  setIsDialogVisible,
}: {
  messagesData: Message[];
  selectedMessageId: number;
  setSelectedMessageId: React.Dispatch<React.SetStateAction<number>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='h-full'>
      <div className='p-6 flex items-center'>
        {[
          { label: 'مرة واحدة', value: 'once' },
          { label: 'مكررة', value: 'repeated' },
        ].map((item: { label: string; value: string }, index: number) => (
          <button
            type='button'
            onClick={() => setSelectedCategory(item.value)}
            key={index}
            className={`w-1/2 text-lg transition-all duration-200 ${
              selectedCategory === item.value
                ? 'text-[#DD7E1F] border-b-4 border-[#DD7E1F]'
                : 'text-[#666666] border-b-2 border-[#CCCCCC]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <SearchInput
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        styles='!rounded-2xl'
      />
      <Messages
        messagesData={messagesData}
        selectedMessageId={selectedMessageId}
        setSelectedMessageId={setSelectedMessageId}
        selectedCategory={selectedCategory}
        setIsDialogVisible={setIsDialogVisible}
      />
    </div>
  );
};

export default MessagesHistoryPanel;
