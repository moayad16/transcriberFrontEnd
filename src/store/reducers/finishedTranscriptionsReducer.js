const finishedTranscriptionsReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_NEW_FINISHED_TRANSCRIPTION":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default finishedTranscriptionsReducer;
