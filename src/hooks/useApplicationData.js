import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "../reducer/application";

function calculateSpots(days, appointments) {
  return days.map((day) => ({
    ...day,
    spots: day.appointments
      .map((id) => appointments[id])
      .filter((appointment) => appointment.interview === null).length,
  }));
}
let appointments1 = {};

function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function dispatchNewInterview(id, interview = null) {
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = calculateSpots(state.days, appointments);
    dispatch({ type: SET_INTERVIEW, appointments, days });
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatchNewInterview(id, interview);
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatchNewInterview(id);
    });
  }
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers,
      });
    });
  }, []);
  const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  const initWebsocket = () => {
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const data = JSON.parse(event.data);
      if (data.type === SET_INTERVIEW) {
        const id = data.id;
        const interview = data.interview;
        dispatchNewInterview(id, interview);
      }
    };
  };
  useEffect(() => {
    initWebsocket();
    return () => {
      ws.close();
    };
  });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    appointments1,
  };
}

export default useApplicationData;
