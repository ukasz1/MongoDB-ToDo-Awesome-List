import { days, months, years } from '../utils'
import { useEffect, useState } from 'react'

const Form = () => {
  const [newEvent, setNewEvent] = useState({
    description: '',
    task: 'work',
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
  const [timeError, setTimeError] = useState(false);

  const validateForm = (e) => {
    if (newEvent.description === '') {
      setDescriptionError(true);
      e.preventDefault();
    }
    else {
      setDescriptionError(false);
    }
    if (newEvent.day === '' || newEvent.month === '' || newEvent.year <= '2021') {
      setDateError(true);
      e.preventDefault();
    }
    else {
      setDateError(false);
    }
    if (newEvent.description === '') {
      setDescriptionError(true);
      e.preventDefault();
    }
    else {
      setDescriptionError(false);
    }

  }


  const submitForm = (e) => {
    e.preventDefault();
    validateForm(e);

    console.log(`formularz wysłany:
      desc: ${newEvent.description}
      task: ${newEvent.task}
      day: ${newEvent.day}
      month: ${newEvent.month}
      year: ${newEvent.year}
      hour: ${newEvent.hour}
      minute: ${newEvent.minute}

      descriptionError: ${descriptionError}
      `);

  }

  return <section className="form-container">
    <h5>Aby wprowadzić nowy event uzupełnij opis, określ deadline i naciśnij przycisk Dodaj.</h5>
    <form className="event-form" onSubmit={submitForm}>
      <div className="aspect">
        <label htmlFor="description">Opis </label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-description"
          value={newEvent.description}
          onChange={fillInForm}
        />
        {descriptionError ? <span className='err-msg'>Opis nie może być pusty!</span> : null}
      </div>
      <div className="aspect">
        <label htmlFor="task">Rodzaj zadania </label>
        <select
          name="task"
          id="task"
          className="form-task"
          value={newEvent.task}
          onChange={fillInForm}
        >
          <option value="work">Praca</option>
          <option value="study">Nauka</option>
          <option value="personal">Osobiste</option>
          <option value="other">Inne</option>
        </select>
      </div>

      <div className="aspect">
        <label htmlFor="date">Data </label>
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
        {dateError ? <span className='err-msg'>Niepoprawna data!</span> : null}
      </div>

      <div className='aspect'>
        <label htmlFor="time">Godzina </label>
        <input
          type="text"
          name="hour"
          maxLength="2"
          placeholder="hh"
          pattern="[0-9]{1,}"
          className='form-time'
          value={newEvent.hour}
          onChange={fillInForm}
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
        />
      </div>
      <div className='form-submit-div'>
        <button type="submit" className='submit-button'>Dodaj</button>
      </div>

    </form>
  </section >
}

export default Form;