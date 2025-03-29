
export interface FormData {
    id: number;
    title: string;
    name: string;
    surname: string;
    age: string | number;
    occ: string;
}
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (pageNumber: number) => void;
    hasData: boolean; 
  }

export interface InputFieldProps {
      label: string;
      name: string;
      value: string | number;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
      type?: string;
      options?: string[]; // สำหรับกรณีที่เป็น select
      placeholder?: string;
  }