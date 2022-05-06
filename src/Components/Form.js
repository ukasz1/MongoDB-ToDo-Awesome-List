import { days, months, years } from '../utils'
import { useState } from 'react'
import moment from 'moment'

const Form = ({ url }) => {
  const [newEvent, setNewEvent] = useState({
    description: '',
    task: 'Work',
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: ''
  });
  const fillInForm = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
  }
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [pastDate, setPastDate] = useState(false);
  const [hourError, setHourError] = useState(false);
  const [minuteError, setMinuteError] = useState(false);

  const descriptionCheck = () => {
    if (newEvent.description.trim() === '') {
      setDescriptionError(true);
    }
    else {
      setDescriptionError(false);
    }
  }
  const hourCheck = () => {
    const hourNumber = Number(newEvent.hour);
    if (newEvent.hour === '' || hourNumber < 0 || hourNumber > 23) {
      setHourError(true);
    }
    else {
      setHourError(false);
    }
    if (newEvent.hour.length === 1) {
      setNewEvent({ ...newEvent, hour: '0' + newEvent.hour })
    }
  }
  const minuteCheck = () => {
    if (newEvent.minute.length === 1) {
      setNewEvent({ ...newEvent, minute: '0' + newEvent.minute })
    }
    const minuteNumber = Number(newEvent.minute);
    if (newEvent.minute === '' || minuteNumber < 0 || minuteNumber > 59) {
      setMinuteError(true);
    }
    else {
      setMinuteError(false);
    }
    if (newEvent.minute.length === 1) {
      setNewEvent({ ...newEvent, minute: '0' + newEvent.minute })
    }
  }
  const validateAndSubmitForm = (e) => {
    if (descriptionError || hourError || minuteError) {
      console.log(`
      desc: ${newEvent.description}
      task: ${newEvent.task}
        day: ${newEvent.day}
        month: ${newEvent.month}
        year: ${newEvent.year}
        hour: ${newEvent.hour}
        minute: ${newEvent.minute}
        
        descriptionError: ${descriptionError}
        dateError: ${dateError}
        hourError: ${hourError}
        minuteError: ${minuteError}
        `);
      e.preventDefault();
      return;
    }
    if (Number(newEvent.day) < 1 || Number(newEvent.month) < 1 || Number(newEvent.year) <= 2021) {
      setDateError(true);
      setPastDate(false);
      e.preventDefault();
    }
    else {
      setDateError(false);
      const newEventDate = moment([newEvent.year, (newEvent.month - 1).toString(), newEvent.day]);
      if (!newEventDate.isValid()) {  // checking number of days in month and leap year
        setDateError(true);
        setPastDate(false);
        e.preventDefault();
      }
      else {
        setDateError(false);
        const eventDate = new Date(newEvent.year, newEvent.month - 1, newEvent.day, newEvent.hour, newEvent.minute, 0);
        if (eventDate < new Date()) {
          setPastDate(true);
          e.preventDefault();
        }
        else {
          setPastDate(false);
          const unixTime = eventDate.getTime() / 1000 / 60;
          const eventToSubmit = { ...newEvent, unixTime };
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToSubmit)
          });
        }
      }
    }
  }
  return <>

    <section className="form-container">
      <h5>To create a new activity please collect the description, specify a deadline and click Add button.</h5>
      <form className="event-form">
        <div className="aspect">
          <label htmlFor="description">Description </label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-description"
            value={newEvent.description}
            onChange={fillInForm}
            onBlur={descriptionCheck}
            size="40"
            maxlength="50"
            required
          />
          {descriptionError ? <span className='err-msg'>Description cannot be empty!</span> : null}
        </div>
        <div className="aspect">
          <label htmlFor="task">Task type </label>
          <select
            name="task"
            id="task"
            className="form-task"
            value={newEvent.task}
            onChange={fillInForm}
          >
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="aspect">
          <label htmlFor="date">Date </label>
          <select
            id="day"
            name="day"
            className="form-date"
            value={newEvent.day}
            onChange={fillInForm}
          >
            {days.map((day, index) => {
              return <option key={index} value={index}>{day}</option>
            })}
          </select>
          <select
            id="month"
            name="month"
            className="form-date"
            value={newEvent.month}
            onChange={fillInForm}
          >
            {months.map((month, index) => {
              return <option key={index} value={index}>{month}</option>
            })}
          </select>
          <select
            id="year"
            name="year"
            className="form-date"
            value={newEvent.year}
            onChange={fillInForm}
          >
            {years.map((year, index) => {
              return <option key={index} value={index + 2021}>{year}</option>
            })}
          </select>
          {dateError ? <span className='err-msg'>Incorrect date!</span> : null}
          {pastDate ? <span className='err-msg'>Shall not set past date!</span> : null}
        </div>

        <div className='aspect'>
          <label htmlFor="time">Time </label>
          <input
            type="text"
            name="hour"
            maxLength="2"
            placeholder="hh"
            pattern="[0-9]{1,}"
            className='form-time'
            value={newEvent.hour}
            onChange={fillInForm}
            onBlur={hourCheck}
            required
          />
          <input
            type="text"
            name="minute"
            maxLength="2"
            placeholder="mm"
            pattern="[0-9]{1,}"
            className='form-time'
            value={newEvent.minute}
            onChange={fillInForm}
            onBlur={minuteCheck}
            required
          />
          {(hourError || minuteError) ? <span className='err-msg'>Incorrect time!</span> : null}
        </div>
        <div className='form-submit-div'>
          <button type="submit" className='submit-button' onClick={validateAndSubmitForm}>Add</button>
        </div>

      </form>
    </section >
    <div className='empty-line'></div>
  </>
}
export default Form;