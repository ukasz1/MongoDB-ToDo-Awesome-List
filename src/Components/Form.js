import { days, months, years } from '../utils'

const Form = () => {
  return <section className="form-container">
    <h5>Aby wprowadzić nowy event uzupełnij opis, określ deadline i naciśnij przycisk Dodaj.</h5>
    <form classname="event-form">
      <div className="aspect">
        <label htmlFor="description">Opis </label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-description"
        />
      </div>
      <div className="aspect">
        <label htmlFor="task">Rodzaj zadania </label>
        <select
          name="task"
          id="task"
          className="form-task"
        >
          <option value="work">Praca</option>
          <option value="study">Nauka</option>
          <option value="personal">Osobiste</option>
          <option value="other">Inne</option>
        </select>
      </div>

      <div className="aspect">
        <label htmlFor="date">Data </label>
        <select id="day" name="day" className="form-date">
          {days.map((day, index) => {
            return <option value={index}>{day}</option>
          })}
        </select>
        <select id="month" name="month" className="form-date">
          {months.map((month, index) => {
            return <option value={index}>{month}</option>
          })}
        </select>
        <select id="year" name="year" className="form-date">
          {years.map((year, index) => {
            return <option value={index}>{year}</option>
          })}
        </select>
      </div>

      <div className='aspect'>
        <label htmlFor="time">Godzina </label>
        <input
          type="text"
          name="hours"
          maxlength="2"
          placeholder="hh"
          pattern=""
          className='form-time' />
        <input
          type="text"
          name="minutes"
          maxlength="2"
          placeholder="mm"
          pattern=""
          className='form-time' />
      </div>
      <div className='form-submit-div'>
        <button type="submit" className='submit-button'>Dodaj</button>
      </div>

    </form>
  </section >
}

export default Form;