const AdmissionBook = {
    student: {
      id: 1,
      name: "Alice Johnson",
      age: 20,
      educationLevel: "Undergraduate",
      major: "Computer Science",
      enrollmentYear: 2023,
      courses: ["Math 101", "CS 102", "Physics 201"],
      progress: {
        "Math 101": "Completed",
        "CS 102": "In Progress",
        "Physics 201": "Not Started",
      },
    },
  
    getStudentProfile: () => AdmissionBook.student,
  
    updateStudentProfile: (newData) => {
      AdmissionBook.student = { ...AdmissionBook.student, ...newData };
    },
  };
  
  export default AdmissionBook;
  