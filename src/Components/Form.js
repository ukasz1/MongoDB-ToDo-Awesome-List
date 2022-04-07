const Form = () => {
  return <section className="form-container">
    <h4>Aby wprowadzić nowy event uzupełnij opis, określ deadline i naciśnij przycisk Dodaj.</h4>
    <form classname="event-form">
      <label htmlFor="description">Opis </label>
      <input
        type="text"
        name="description"
        id="description"
        className="form-description"
      />
    </form>
  </section>
}

export default Form;