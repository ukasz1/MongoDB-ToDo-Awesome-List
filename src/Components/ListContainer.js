import { connect } from 'react-redux'

const ListContainer = ({ loading }) => {
  return <section className="list-container">
    <table>
      <TabHeader />
      <TabList />
    </table>
    {loading && <EmptyList />}
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

const TabList = () => {
  return (
    <div></div>
  )
}

const EmptyList = () => {
  return (
    <div className="empty-list">
      <h1>Lista jest pusta</h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { loading: state.loading }
}

export default connect(mapStateToProps)(ListContainer)

// export default ListContainer


