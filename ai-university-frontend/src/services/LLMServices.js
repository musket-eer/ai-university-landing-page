// ✅ Import necessary services
import { ProfessorService } from "../components/Professor/ProfessorService";
import { ExaminerService } from "../components/Examiner/ExaminerService";
import { LibrarianService } from "../components/Librarian/LibrarianService";
import { useClassroom } from "../components/data/ClassroomContext";

/**
 * ✅ Fetches AI response based on the current activity leader
 */
export const getAIResponse = async (activeActivity, dispatch) => {
  if (!activeActivity) {
    console.error("⚠️ No active activity found.");
    return "I’m sorry, I couldn’t process your question.";
  }

  const { id: activityId, leader, title: activeTitle, studentMessage } = activeActivity;

  if (!activityId || !activeTitle || !studentMessage?.trim()) {
    console.error("⚠️ Missing required data in activeActivity:", {
      activityId,
      activeTitle,
      studentMessage,
    });
    return "I’m sorry, I couldn’t determine the topic.";
  }

  console.log("📌 Active Activity Data:", { activityId, activeTitle, leader });

  switch (leader) {
    case "Professor":
      return ProfessorService.processStudentMessage(activityId, activeTitle, studentMessage, dispatch);

    case "Examiner":
      return ExaminerService.assistStudent(studentMessage, activeTitle);

    case "Librarian":
      return LibrarianService.fetchResourceRecommendation(activeTitle, studentMessage);

    default:
      console.warn("⚠️ No valid leader for AI response.");
      return "I’m not sure how to help with that.";
  }
};

/**
 * ✅ Generates lesson materials based on the active professor's settings.
 */
export const generateProfessorLesson = async (lessonMetadata, studentProfile, dispatch) => {
  return ProfessorService.generateLessonPlan(lessonMetadata, studentProfile, dispatch);
};

/**
 * ✅ Generates an exam based on the lesson and student data.
 */
export const generateExam = async (lessonMetadata, studentProfile) => {
  return ExaminerService.generateExam(lessonMetadata, studentProfile);
};

/**
 * ✅ Grades the submitted student exam.
 */
export const gradeExam = async (studentAnswers, examQuestions) => {
  return ExaminerService.gradeExam(studentAnswers, examQuestions);
};

/**
 * ✅ Fetches personalized study resources from the librarian.
 */
export const fetchLibrarianResources = async (lessonMetadata, studentProfile) => {
  return LibrarianService.generateLearningResources(lessonMetadata, studentProfile);
};
