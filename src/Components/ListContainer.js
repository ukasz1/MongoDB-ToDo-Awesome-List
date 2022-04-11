import { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import data from '../data'
import { connect } from 'react-redux'
import loadingIcon from '../images/loading.gif'

const ListContainer = ({ loading, dispatch }) => {
  return <section className="list-container">
    <table>
      <TabHeader />
      <TabList loading={loading} dispatch={dispatch} />
    </table>
  </section>
}

const TabHeader = () => {
  return (
    <thead>
      <tr>
        <th width="3%">Nr</th>
        <th width="10%">Rodzaj</th>
        <th width="30%">Zadanie</th>
        <th width="10%">Data</th>
        <th width="5%">Godzina</th>
        <th width="30%">Pozostały czas</th>
        <th width="5%">Skasuj</th>
      </tr>
    </thead>
  )
}

const TabList = ({ loading, dispatch }) => {
  const [events, setEvents] = useState(data);
  useEffect(() => {
    setTimeout(() => dispatch({ type: 'loaded' }), 750) // for data fetching simulation
  }, [])
  return (
    <tbody>
      {loading ? (
        <tr>
          <td colSpan="7" style={{ border: '0' }}>
            <EmptyList />
          </td>
        </tr>
      ) : (
        events.map(event => {
          const {
            id,
            task,
            description,
            date,
            time
          } = event;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{task}</td>
              <td>{description}</td>
              <td>{date.day}/{date.month}/{date.year}</td>
              <td>{time.hour}:{time.minute}</td>
              <td>Do obliczenia</td>
              <td><FaTrash style={{ color: 'pink' }} /></td>
            </tr>
          )
        })
      )}

    </tbody>
  )
}

const EmptyList = ({ dispatch }) => {
  return (
    <div className="data-feedback">
      {/* <button type="button" onClick={() => dispatch({ type: 'kasuj' })}>Koniec</button> */}
      <h1><img src={loadingIcon} alt="loadingIcon" /></h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { loading: state.loading }
}

export default connect(mapStateToProps)(ListContainer)


