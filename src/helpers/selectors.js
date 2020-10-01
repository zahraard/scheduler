export function getAppointmentsForDay(state, day) {
  const appointmentsList =[]
  const filteredDay = state.days.filter( eachDay => eachDay.name === day);
  if(filteredDay[0]){
    filteredDay[0].appointments.map(id => {
      appointmentsList.push(state.appointments[id])
    })
  }
  return appointmentsList;
}

export function getInterview(state, interview){
  if(interview){
    const id = interview.interviewer;
    interview.interviewer = state.interviewers[id]
  }
  return interview;
}