export const removeDuplicateEmails = (records) => {
    const emailSet = new Set();
    return records.filter((record) => {
      if (emailSet.has(record.email)) return false;
      emailSet.add(record.email);
      return true;
    });
  };
  
  export const mergeRecords = (existingRecords, newRecords) => {
    const existingEmails = existingRecords.map((record) => record.email);
    const mergedRecords = [
      ...existingRecords,
      ...newRecords.filter((record) => !existingEmails.includes(record.email)),
    ];
    return mergedRecords;
  };
  