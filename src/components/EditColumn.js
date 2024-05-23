import React, { useState, useEffect } from 'react';

function EditColumn({ onSelect }) {
  const [entries, setEntries] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  // Fetch entries from server when component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/entries'); // Assuming your endpoint is '/entries'
        if (!response.ok) {
          throw new Error('Failed to fetch entries');
        }
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };
    fetchEntries();
  }, []);

  // Handle sorting by field
  const handleSortBy = (field) => {
    if (sortBy === field) {
      setSortBy(`-${field}`);
    } else {
      setSortBy(field);
    }
  };

  const sortedEntries = sortBy ? [...entries].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  }) : entries;

  // Handle selecting an entry
  const handleSelectEntry = (entryId) => {
    const selectedEntry = entries.find(entry => entry.id === entryId);
    if (selectedEntryId === entryId) {
      setSelectedEntryId(null);
      onSelect(null); 
    } else {
      setSelectedEntryId(entryId);
      onSelect(selectedEntry);
    }
  };

  // Get button color based on genre
  
    const getButtonColor = (genre) => {
          switch (genre) {
            case 'Fiction':
              return '#FFADAD';
            case 'Creative Non-Fiction':
              return '$FFD6A5';
            case 'Poetry':
              return '#FDFFB6';
            case 'Art' :
              return '#E4F1EE';
            case 'Script or Screenplay' :
              return '#D9EFD8';
            default:
              return '#DEDAF4';
  };
};

  return (
    <div className="box">
      <h2>Submissions</h2>
      <button onClick={() => handleSortBy('authorName')}>Sort by Author</button>
      <button onClick={() => handleSortBy('editor')}>Sort by Editor</button>
      <button onClick={() => handleSortBy('reviewStatus')}>Sort by Review Status</button>
      <ul className="edit-column">
        {sortedEntries.map((entry) => (
          <li
            key={entry.id}
            onClick={() => handleSelectEntry(entry.id)}
            className={`edit-column-item ${entry.id === selectedEntryId ? 'selected' : ''}`}
            style={{ backgroundColor: getButtonColor(entry.genre) }}
          >
            Author: {entry.authorName}, Genre: {entry.genre}, Review Status: {entry.reviewStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditColumn;

