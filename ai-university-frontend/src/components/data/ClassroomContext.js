import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ProfessorService } from "../Professor/ProfessorService";

const ClassroomContext = createContext();

const initialState = {
  activities: [], // Stores the sequence of activities in the lesson
  activeActivityIndex: 0, // Tracks the current active activity index
  activeActivity: null, // Explicitly store the active activity
//   TODO: - Here we also need store data from registrar, i.e active module, and student profile
  studentProfile: { level: "Intermediate", learningStyle: "Visual" }, 
  lessonMetadata: null, // Stores lesson objectives, duration, etc.
};

// ✅ Reducer function to manage classroom state
const classroomReducer = (state, action) => {
  switch (action.type) {
    case "SET_LESSON":
      console.log("🟢 Received payload in reducer:", action.payload.lessonPlan);

      return {
        ...state,
        activities: action.payload.lessonPlan.activities.map(activity => ({
          ...activity,
          messages: activity.messages || [] // ✅ Ensure each activity has a messages array
        })),
        lessonMetadata: action.payload.lessonPlan.lessonMetadata,
        activeActivityIndex: 0, // Reset index to start from first activity
        activeActivity: action.payload.lessonPlan.activities[0] || null, // Set first activity as active
      };

    case "NEXT_ACTIVITY": {
      const newIndex = Math.min(state.activeActivityIndex + 1, state.activities.length - 1);
      return {
        ...state,
        activeActivityIndex: newIndex,
        activeActivity: state.activities[newIndex] || null, // ✅ Ensure activeActivity updates
      };
    }

    case "PREV_ACTIVITY": {
      const newIndex = Math.max(state.activeActivityIndex - 1, 0);
      return {
        ...state,
        activeActivityIndex: newIndex,
        activeActivity: state.activities[newIndex] || null, // ✅ Ensure activeActivity updates
      };
    }

    case "ADD_MESSAGE": {
      const { message } = action.payload;

      // ✅ Update the messages of the currently active activity
      const updatedActivities = state.activities.map((activity, index) =>
        index === state.activeActivityIndex
          ? { ...activity, messages: [...activity.messages, message] }
          : activity
      );

      return {
        ...state,
        activities: updatedActivities,
        activeActivity: updatedActivities[state.activeActivityIndex], // ✅ Ensure activeActivity updates
      };
    }

    default:
      return state;
  }
};

// ✅ Classroom Context Provider
export const ClassroomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classroomReducer, initialState);

  // ✅ Function to fetch and store the lesson plan
  const generateLessonPlan = async () => {

    // TOD:- Acquire this from the active module data passed by the registrar
    const topic = "Artificial Intelligence Basics";
    const duration = "60 minutes";
    const studentProfile = state.studentProfile;

    // TODO:- We would not need to acquire this from student metadata as it will be generated from lesson plan
    const topicInfo = "Introduction to AI concepts, history, and applications.";

    // ✅ Fetch structured lesson data directly from ProfessorService
    const lessonPlan = await ProfessorService.generateLessonPlan(topic, duration, studentProfile, topicInfo, dispatch);

    if (!lessonPlan) {
      console.error("❌ Failed to retrieve lesson plan.");
      return;
    }

    console.log("✅ Lesson plan received:", lessonPlan);

    // ✅ Store structured lesson data in the state
    dispatch({ type: "SET_LESSON", payload: lessonPlan });
  };

  // ✅ Auto-fetch lesson when ClassroomContext loads
  useEffect(() => {
    generateLessonPlan();
  }, []); // Runs only once on mount

  return (
    <ClassroomContext.Provider value={{
      ...state,
      dispatch,
      generateLessonPlan,
      activeActivity: state.activeActivity,
      lessonMetadata: state.lessonMetadata,
      nextActivity: () => dispatch({ type: "NEXT_ACTIVITY" }),
      prevActivity: () => dispatch({ type: "PREV_ACTIVITY" }),
      addMessage: (message) => dispatch({ type: "ADD_MESSAGE", payload: { message } }), // ✅ Expose addMessage properly
    }}>
      {children}
    </ClassroomContext.Provider>
  );
};

// ✅ Export ClassroomContext directly
export { ClassroomContext };

// ✅ Custom hook to use Classroom Context
export const useClassroom = () => useContext(ClassroomContext);
