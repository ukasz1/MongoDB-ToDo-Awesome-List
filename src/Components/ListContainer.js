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
        <th>Nr</th>
        <th>Rodzaj</th>
        <th>Zadanie</th>
        <th>Data</th>
        <th>Godzina</th>
        <th>Pozostały czas</th>
        <th>Skasuj</th>
      </tr>
    </thead>
  )
}

export { ListContainer };

const TabList = ({ loading, dispatch }) => {
  return (
    <tbody>
      <tr>
        <td colSpan="7">
          {loading && <EmptyList dispatch={dispatch} />}
        </td>
      </tr>
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


