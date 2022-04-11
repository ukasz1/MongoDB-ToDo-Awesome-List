import { connect } from 'react-redux'
import loadingIcon from '../images/loading.gif'

const ListContainer = ({ loading }) => {
  return <section className="list-container">
    <table>
      <TabHeader />
      <TabList loading={loading} />
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

const TabList = ({ loading }) => {
  return (
    <tr>
      <td colspan="7">
        {loading && <EmptyList />}
      </td>
    </tr>
  )
}

const EmptyList = () => {
  return (
    <div className="data-feedback">
      <h1><img src={loadingIcon} alt="loading" /></h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { loading: state.loading }
}

export default connect(mapStateToProps)(ListContainer)

// export default ListContainer


