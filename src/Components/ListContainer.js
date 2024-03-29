import { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { headerCells } from '../utils'
import { connect } from 'react-redux'
import moment from 'moment'
import loadingIcon from '../images/loading.gif'

const ListContainer = ({ loading, dispatch, url }) => {
  return <section className="list-container">
    <table>
      <TabHeader />
      <TabList loading={loading} dispatch={dispatch} url={url} />
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

const TabList = ({ loading, dispatch, url }) => {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: 'LOADED' });
      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const deleteEvent = id => {
    const newEvents = events.filter(event => event._id !== id);
    try {
      fetch(`${url}/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(res => console.log(res))
    } catch (error) {
      console.log(error);
    }
    setEvents(newEvents);
  }
  return (
    <tbody>
      {loading ? (
        <DataFeedback>
          <div>
            <div className='loading-info'>
              Loading... Need about 30 seconds to run free server
            </div>
            <div>
              <img src={loadingIcon} alt="loadingIcon" width="60" />
            </div>
          </div>
        </DataFeedback>
      ) : (
        events.length === 0 ? (   //no data to show
          <DataFeedback>
            <div className='empty-list'>The list is empty</div>
          </DataFeedback>
        ) : (
          events.map((event, index) => {   //showing data
            const {
              _id,
              task,
              description,
              day,
              month,
              year,
              hour,
              minute
            } = event;
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{task}</td>
                <td>{description}</td>
                <td>{day}/{month}/{year}</td>
                <td>{hour}:{minute}</td>
                <td><EventTimeCounter {...event} /></td>
                <td>
                  <button type="button" className='button-delete'>
                    <FaTrash className='fa-trash' onClick={() => deleteEvent(_id)} />
                  </button>
                </td>
              </tr>
            )
          }))
      )
      }
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

const EventTimeCounter = ({ day, month, year, hour, minute }) => {
  const [timeTrigger, setTimeTrigger] = useState(true);
  const futureDate = moment([year, month - 1, day, hour, minute]);
  const currentTime = moment();

  useEffect(() => {
    if (futureDate > currentTime) {
      setTimeout(() => setTimeTrigger(!timeTrigger), 1000);
    }
  }, [timeTrigger])

  const diff_In_Days = futureDate.diff(currentTime, 'days');
  const diff_In_Hours = futureDate.diff(currentTime, 'hours');
  const diff_In_Minutes = futureDate.diff(currentTime, 'minutes');
  const diff_In_Seconds = futureDate.diff(currentTime, 'seconds');

  const days = diff_In_Days;
  let hours = diff_In_Hours - diff_In_Days * 24;
  let minutes = diff_In_Minutes - diff_In_Hours * 60;
  let seconds = diff_In_Seconds - diff_In_Minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (futureDate > currentTime) {
    return <span>
      {days + ' | ' + hours + ':' + minutes + ':' + seconds}
    </span>
  } else {
    return <span className='err-msg'>
      {'0 | 00:00:00'}
    </span>
  }
}
const mapStateToProps = (state) => {
  return { loading: state.loading }
}

export default connect(mapStateToProps)(ListContainer)