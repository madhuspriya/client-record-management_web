import React, { useState, useEffect } from "react";
import RecordList from "./components/RecordList";
import SearchBar from "./components/SearchBar";
import { mergeRecords, removeDuplicateEmails } from "./utils/Helpers";
import "./App.css";

const App = () => {
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("records");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Save records to LocalStorage
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newRecords = JSON.parse(e.target.result);

        const uniqueNewRecords = removeDuplicateEmails(newRecords);

        const maxId =
          records.length > 0
            ? Math.max(...records.map((record) => record.id))
            : 0;

        const newRecordsWithIds = uniqueNewRecords.map((record, index) => ({
          ...record,
          id: maxId + index + 1,
        }));
   
        // Merge the records (while keeping only unique records)
        const mergedRecords = mergeRecords(records, newRecordsWithIds);

        // Reassign sequential IDs for all records after merging
        const finalRecords = mergedRecords.map((record, index) => ({
          ...record,
          id: index + 1,
        }));
        setRecords(finalRecords);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Client Records Management</h1>
        <div className="file-upload-container">
          <input
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            id="file-upload"
          />
          <button className="file-upload-btn">Upload JSON File</button>
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>
      <RecordList
        records={records}
        setRecords={setRecords}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default App;
