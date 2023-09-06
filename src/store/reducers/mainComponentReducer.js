import Transcribe from "../../components/js/transcribe";
import History from "../../components/js/history";
import Subscription from "../../components/js/subscription";

const mainComponentReducer = (state = "Transcribe", action) => {
  switch (action.payload) {
    case "Transcribe":
      return {
        mainComponent: "Transcribe",
      };
    case "History":
        return {
            mainComponent: "History",
        };
    case "Subscription":
        return {
            mainComponent: "Subscription",
        };
    default:
      return {
        mainComponent: state
    };
  }
};
export default mainComponentReducer;
