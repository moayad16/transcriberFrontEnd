const transcriptionProccessReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_NEW_TRANSCRIPTION_PROCESS":
      return state.concat(action.payload);

    case "SET_TRANSCRIPTION_STATUS":
      return state.map((video) => {
        if (video.id === action.payload.id) {
          // Create a new object with the updated status
          return { ...video, status: action.payload.status, percent: action.payload.percent };
        }
        return video;
      });

    case "SET_TRANSCRIPTION_TRANSCRIPT":
      return state.map((video) => {
        if (video.id === action.payload.id) {
          video.transcript = action.payload.transcript;
        }
        return video;
      });

    case "DELETE_TRANSCRIPTION_PROCESS":
      return state.filter((video) => video.id !== action.payload);
    default:
      return state;
  }
};

export default transcriptionProccessReducer;
