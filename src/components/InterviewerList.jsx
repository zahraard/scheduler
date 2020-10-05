import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import './InterviewerList.scss';

export default function InterviewerList(props){
  // props.interviewers.map( interviewer => {
  //   console.log('id', interviewer.id)
  //   console.log('prpid', props.value)
  // })
  const interviewers = props.interviewers.map( interviewer => (
    
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  ))
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};