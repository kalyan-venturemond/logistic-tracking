import { useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialItemsPerPage?: number;
}

export const usePagination = <T>({
  initialPage = 1,
  initialItemsPerPage = 10,
}: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const paginate = (data: T[]): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return {
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    paginate,
    setCurrentPage,
  };
};
