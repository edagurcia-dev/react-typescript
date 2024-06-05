import { ActivityT } from "../types";

export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: ActivityT } }
  | { type: "set-activeId"; payload: { id: ActivityT["id"] } }
  | { type: "remove-activity"; payload: { id: ActivityT["id"] } };

export type ActivityState = {
  activities: ActivityT[];
  activityId: ActivityT["id"];
};

export const initialState: ActivityState = {
  activities: [],
  activityId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: ActivityT[] = [];

    if (state.activityId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activityId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activityId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activityId: action.payload.id,
    };
  }

  if (action.type === "remove-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (stateActivity) => stateActivity.id !== action.payload.id
      ),
      activityId: "",
    };
  }

  return state;
};
