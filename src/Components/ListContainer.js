import { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import data from '../data'
import { headerCells } from '../utils'
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
        {headerCells.map((header, index) => {
          return <th key={index} className={`th${(index + 1)}`}>{header}</th>
        })}
      </tr>
    </thead>
  )
}

const TabList = ({ loading, dispatch }) => {
  const [events, setEvents] = useState(data);
  useEffect(() => {
    setTimeout(() => dispatch({ type: 'loaded' }), 750) // for data fetching simulation
  }, []);

  const deleteEvent = id => {
    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);
  }
  return (
    <tbody>
      {loading ? (                //loading data
        <DataFeedback>
          <img src={loadingIcon} alt="loadingIcon" />
        </DataFeedback>
      ) : (
        events.length === 0 ? (   //no data to show
          <DataFeedback>
            <div className='empty-list'>Lista jest pusta</div>
          </DataFeedback>
        ) : (
          events.map(event => {   //showing data
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
                <td>(Do obliczenia)</td>
                <td>
                  <button type="button" className='button-delete'>
                    <FaTrash className='fa-trash' onClick={() => deleteEvent(id)} />
                  </button>
                </td>
              </tr>
            )
          }))
      )}
    </tbody >
  )
}

const DataFeedback = ({ children }) => {
  return (
    <tr>
      <td colSpan="7" style={{ border: '0' }}>
        <div className="data-feedback">
          <h1>{children}</h1>
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = (state) => {
  return { loading: state.loading }
}

export default connect(mapStateToProps)(ListContainer)