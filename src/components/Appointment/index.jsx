import React, { useEffect } from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from './Status'

import useVisualMode from '../../hooks/useVisualMode'

import './styles.scss';
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)})
      .catch(err => transition(ERROR_SAVE, true))
  }

  function onDelete(){
    transition(DELETE, true)
    props.cancelInterview(props.id)
      .then(()=>{
        transition(EMPTY)
      })
      .catch(err => transition(ERROR_DELETE, true))
  }
  
  function onCancelAppointment(){
    transition(CONFIRM)
  }
  function onEditAppointment(){
    transition(EDIT)
  }
  
  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW  && props.interview && (
          <Show
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
            onDelete={onCancelAppointment}
            onEdit={onEditAppointment}
          />
      )}
      {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={()=> back()}
          />
      )}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer && props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={()=> back()}
      />
      )}
      {mode === SAVING && (
        <Status 
        message='SAVING'
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
        message='Are you sure you would like to delete?'
        onCancel={()=> back()}
        onConfirm={onDelete}
        />
      )}
       {mode === DELETE && (
        <Status 
        message='DELETING'
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
        message='Could not save appointment'
        onClose={()=> back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message='Could not delete appointment'
        onClose={()=> back()}
        />
      )}
    </article>
  
  )
}