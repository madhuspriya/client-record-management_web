import React, { useState, useEffect } from 'react';

const RecordFormModal = ({ record, onSave, onClose, allRecords }) => {
  const [formData, setFormData] = useState({
    name: record?.name || '',
    email: record?.email || '',
  });

  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name,
        email: record.email,
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Name and Email are required.');
      return;
    }

    const emailExists = allRecords.some(
      (r) => r.email.toLowerCase() === formData.email.toLowerCase() && r.id !== (record ? record.id : null)
    );

    if (emailExists) {
      alert('Email already exists. Please use a different email.');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{record ? 'Edit Record' : 'Add Record'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn save-btn">
              Save
            </button>
            <button type="button" onClick={onClose} className="btn cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordFormModal;
