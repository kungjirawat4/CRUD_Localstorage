// import React from 'react';
// import { FormData } from '@/types/types';
// import { useTranslations } from 'next-intl';
// interface DataTableProps {
//   data: FormData[];
//   handleEdit: (item: FormData) => void;
//   handleDelete: (id: number) => void;
// }

// const DataTable: React.FC<DataTableProps> = ({ data, handleEdit, handleDelete }) => {
//   const t = useTranslations('Form');

//   return (
//     <div className="overflow-x-auto rounded-box border border-base-content/5 mt-4">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>{t('no')}</th>
//             <th>{t('name')} - {t('surname')}</th>
//             <th>{t('age')}</th>
//             <th>{t('occ')}</th>
//             <th>{t('action')}</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>{item.title}{item.name} {item.surname}</td>
//               <td>{item.age}</td>
//               <td>{item.occ}</td>
//               <td className="flex gap-2">
//                 <button onClick={() => handleEdit(item)} className="btn btn-soft btn-warning">
//                   {t('edit')}
//                 </button>
//                 <button onClick={() => handleDelete(item.id)} className="btn btn-soft btn-error">
//                   {t('delete')}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DataTable;



import React, { useState } from 'react';
import { FormData } from '@/types/types';
import { useTranslations } from 'next-intl';
import Pagination from './Pagination';

interface DataTableProps {
  data: FormData[];
  handleEdit: (item: FormData) => void;
  handleDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, handleEdit, handleDelete }) => {
  const t = useTranslations('Form');
  
  const rowsPerPage = 5;
  
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 mt-4 ">
        <table className="table ">
          <thead className='text-lg'>
            <tr>
              <th>{t('no')}</th>
              <th>{t('fullname')}</th>
              <th>{t('age')}</th>
              <th>{t('occ')}</th>
              <th>{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id} className='text-lg'>
                <td>{index + 1 + indexOfFirstRow}</td>
                <td>{item.title}{item.name} {item.surname}</td>
                <td>{item.age}</td>
                <td>{item.occ}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="btn btn-soft btn-warning">
                    {t('edit')}
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-soft btn-error">
                    {t('delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ใช้ Pagination Component */}
      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage} 
        handlePageChange={handlePageChange} 
        hasData={data.length > 0}
      />
    </div>
  );
};

export default DataTable;