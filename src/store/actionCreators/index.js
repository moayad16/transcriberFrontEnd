export const setMainComponent = (component) => {
  return {
    type: "SET_MAIN_COMPONENT",
    payload: component,
  };
};


export const createNewTranscriptionProcess = (videoInfo) => {
  return {
    type: "CREATE_NEW_TRANSCRIPTION_PROCESS",
    payload: videoInfo,
  };
}

export const setTranscriptionStatus = (process) => {
  return {
    type: "SET_TRANSCRIPTION_STATUS",
    payload: process,
  };
}

export const setTranscriptionTranscript = (process) => {
  console.log(process);
  return {
    type: "SET_TRANSCRIPTION_TRANSCRIPT",
    payload: process,
  };
}

export const deleteTranscriptionProcess = (process) => {
  return {
    type: "DELETE_TRANSCRIPTION_PROCESS",
    payload: process,
  };
}

export const createNewFinishedTranscription = (transcription) => {
  return {
    type: "CREATE_NEW_FINISHED_TRANSCRIPTION",
    payload: transcription,
  };
}


