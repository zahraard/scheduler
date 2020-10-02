export function getAppointmentsForDay(state, day) {
  const appointmentsList =[]
  const filteredDay = state.days.find( eachDay => eachDay.name === day);
  if(filteredDay){
    filteredDay.appointments.map(id => {
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

export function getInterviewersForDay(state, day){
  const findDay = state.days.find( eachDay => eachDay.name === day);
  const interviewersList = []
  if(findDay){
   //return findDay.interviewers
   findDay.interviewers.map(id => interviewersList.push(state.interviewers[id]))
  }
  return interviewersList;
}