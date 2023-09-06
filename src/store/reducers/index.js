import { combineReducers } from "redux";
import mainComponentReducer from "./mainComponentReducer";
import transcriptionProccessReducer from "./transcriptionProcessReducer";
import finishedTranscriptionsReducer from "./finishedTranscriptionsReducer";

const reducers = combineReducers({
  mainComponent: mainComponentReducer,
  transcriptionProcess: transcriptionProccessReducer,
  finishedTranscriptions: finishedTranscriptionsReducer,
});

export default reducers;
