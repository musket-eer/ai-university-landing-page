const Syllabus = {
    metadata: {
      courseId: "CS101",
      courseTitle: "Introduction to Artificial Intelligence",
      dateCreated: "2024-01-15",
      activeModule: "Module 1: Basics of AI",
      modules: [
        "Module 1: Basics of AI",
        "Module 2: Machine Learning Foundations",
        "Module 3: Neural Networks",
        "Module 4: Deep Learning",
        "Module 5: Natural Language Processing",
        "Module 6: Computer Vision",
        "Module 7: Reinforcement Learning",
        "Module 8: AI Ethics",
        "Module 9: AI in Business",
        "Module 10: Future of AI",
      ],
      hoursSpent: 15, // Total hours spent on the course
    },
  
    getMetadata: () => Syllabus.metadata,
  
    updateActiveModule: (newModule) => {
      if (SyllabusModule.metadata.modules.includes(newModule)) {
        SyllabusModule.metadata.activeModule = newModule;
      } else {
        console.warn("Module not found in the syllabus.");
      }
    },
  
    addHoursSpent: (hours) => {
      Syllabus.metadata.hoursSpent += hours;
    },
  };
  
  export default Syllabus;
  