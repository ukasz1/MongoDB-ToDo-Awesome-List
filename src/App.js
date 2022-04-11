import { createStore } from 'redux';
import { Provider } from "react-redux";
import { Header, Form, ListContainer } from './Components/index'
// import ListContainer from './Components/ListContainer'

import reducer from './reducer';

const initialStore = {
  loading: false
}

const store = createStore(reducer, initialStore);

function App() {
  return (
    <Provider store={store}>
      <main>
        <Header />
        <Form />
      </main>
      <ListContainer />
    </Provider>
  );
}
export default App;
