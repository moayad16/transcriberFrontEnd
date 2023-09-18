const mainComponentReducer = (state = "Transcribe", action) => {
  switch (action.payload) {
    case "Transcribe":
      return "Transcribe";
    case "History":
        return "History"
    case "Subscription":
        return "Subscription"
    default:
      return state
  }
};
export default mainComponentReducer;
