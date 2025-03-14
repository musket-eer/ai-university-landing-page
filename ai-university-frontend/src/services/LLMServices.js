// Import specific services instead of making redundant API calls
import { ProfessorService } from "../components/Professor/ProfessorService";
// import { TAService } from "../components/TA/TAService";
import { useClassroom } from "../components/data/ClassroomContext";
// import { LibrarianService } from "./LibrarianService";
// import { ExaminerService } from "./ExaminerService";

// ✅ Fetch Professor's AI Response
export const getProfessorResponse = async (activeActivity, dispatch) => {
  // ✅ Extract required details from activeActivity
  if (!activeActivity) {
    console.error("⚠️ No active activity found.");
    return "I’m sorry, I couldn’t process your question.";
  }

  const { activeTopicId, activeTitle, studentMessage } = activeActivity;

  if (!activeTopicId || !activeTitle || !studentMessage?.trim()) {
    console.error("⚠️ Missing required data in activeActivity:", {
      activeTopicId,
      activeTitle,
      studentMessage,
    });
    return "I’m sorry, I couldn’t determine the topic.";
  }

  console.log("📌 Using Active Activity Data:", { activeTopicId, activeTitle });

  // ✅ Pass extracted data into the Professor service
  return ProfessorService.processStudentMessage(activeTopicId, activeTitle, studentMessage, dispatch);
};

// ✅ Fetch TA's AI Response
// export const getTAResponse = async (studentMessage, dispatch) => {
//   return TAService.processStudentMessage(studentMessage, dispatch);
// };

// // ✅ Fetch Librarian's AI Response
// export const getLibrarianResponse = async (studentMessage, dispatch) => {
//   return LibrarianService.processStudentMessage(studentMessage, dispatch);
// };

// // ✅ Fetch Examiner's AI Response
// export const getExaminerResponse = async (studentMessage, dispatch) => {
//   return ExaminerService.processStudentMessage(studentMessage, dispatch);
// };


export const generateProfessorLesson = async (lessonParams) => {
  return ProfessorService.generateLessonPlan(lessonParams);
};

// export const generateTALesson = async (lessonParams) => {
//   return TAService.generateLesson(lessonParams);
// };
