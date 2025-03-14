import { useState } from "react";
import AdmissionBook from "./AdmissionBook"; // To get student ID

const Notebook = () => {
  const studentId = AdmissionBook.student.id; // Fetch student ID
  const [notes, setNotes] = useState("");
  const [metadata, setMetadata] = useState({
    dateStarted: new Date().toLocaleDateString(),
    dateModified: new Date().toLocaleDateString(),
    studentId: studentId,
  });

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
    setMetadata((prev) => ({
      ...prev,
      dateModified: new Date().toLocaleDateString(),
    }));
  };

  return (
    <div className="notebook">
      <h2>Student Notebook</h2>
      <p><strong>Date Started:</strong> {metadata.dateStarted}</p>
      <p><strong>Last Modified:</strong> {metadata.dateModified}</p>
      <p><strong>Student ID:</strong> {metadata.studentId}</p>

      <textarea
        value={notes}
        onChange={handleNoteChange}
        placeholder="Write your notes here..."
      />
    </div>
  );
};

export default Notebook;
