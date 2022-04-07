import { days, months, years } from '../utils'

const Form = () => {
  return <section className="form-container">
    <h4>Aby wprowadzić nowy event uzupełnij opis, określ deadline i naciśnij przycisk Dodaj.</h4>
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
        <select id="day" name="day">
          {days.map((day, index) => {
            return <option value={index}>{day}</option>
          })}
        </select>
        <select id="month" name="month">
          {months.map((month, index) => {
            return <option value={index}>{month}</option>
          })}
        </select>
        <select id="year" name="year">
          {years.map((year, index) => {
            return <option value={index}>{year}</option>
          })}
        </select>
      </div>

    </form>
  </section>
}

export default Form;