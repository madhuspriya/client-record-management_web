import React, { useState } from 'react';
import RecordFormModal from '../components/RecordFormModal';

const RecordList = ({ records, setRecords, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

   // Filter records based on search query
   const filteredRecords = records.filter((record) => {
    const query = searchQuery.toLowerCase();
    return (
      record.email.toLowerCase().includes(query) ||
      record.name.toLowerCase().includes(query) ||
      record.id.toString().includes(query)
    );
  });

  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const generateNewId = () => {
    const ids = records.map((record) => record.id);
    return Math.max(...ids, 0) + 1;
  };

  const handleAddRecord = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const handleSaveRecord = (newRecord) => {
    if (editingRecord) {
      setRecords(
        records.map((record) =>
          record.id === editingRecord.id ? { ...record, ...newRecord } : record
        )
      );
    } else {
      const newRecordWithId = { ...newRecord, id: generateNewId() };
      setRecords([...records, newRecordWithId]);
    }
    setIsModalOpen(false);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="record-list-container">
      <div className="actions">
        <button onClick={handleAddRecord} className="btn add-btn">
          Add Record
        </button>
        <p className="total-records">Total Records: {totalRecords}</p>
      </div>
      <table className="record-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecords.length > 0 ? (
            paginatedRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>
                  <button
                    onClick={() => handleEditRecord(record)}
                    className="btn edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-records">
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange('prev')}
          className="btn pagination-btn"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <button
          onClick={() => handlePageChange('next')}
          className="btn pagination-btn"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <RecordFormModal
          record={editingRecord}
          onSave={handleSaveRecord}
          onClose={() => setIsModalOpen(false)}
          allRecords={records}
        />
      )}
    </div>
  );
};

export default RecordList;
