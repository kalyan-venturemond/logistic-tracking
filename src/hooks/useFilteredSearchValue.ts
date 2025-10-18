/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
export const useFilteredSearchValue = (fieldsToCheck: any, items: any) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredData = items.filter((item: any) =>
    fieldsToCheck.some((field: string) => {
      const fieldValue = item[field];
      return (
        typeof fieldValue === 'string' &&
        fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    }),
  );

  return {
    filteredData,
    searchValue,
    setSearchValue,
  };
};
