import { createStore } from 'redux';
import { Provider } from "react-redux";
import { Header, Form, ListContainer } from './Components/index'
// import ListContainer from './Components/ListContainer'

import reducer from './reducer';

const url = '/api/v1/events';

const initialStore = {
  loading: true
}

const store = createStore(reducer, initialStore);

function App() {
  return (
    <Provider store={store}>
      <main>
        <Header />
        <Form />
      </main>
      <ListContainer url={url} />
    </Provider>
  );
}
export default App;
