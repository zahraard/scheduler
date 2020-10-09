export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find((eachDay) => eachDay.name === day);
  if (!findDay) {
    return [];
  }
  const appointments = findDay.appointments.map((id) => state.appointments[id]);
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    ...interview,
    interviewer,
  };
}

export function getInterviewersForDay(state, day) {
  const findDay = state.days.find((eachDay) => eachDay.name === day);
  if (!findDay) {
    return [];
  }
  const interviewers = findDay.interviewers.map((id) => state.interviewers[id]);
  return interviewers;
}
