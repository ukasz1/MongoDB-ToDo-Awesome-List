import { createStore } from 'redux';
import { Provider } from "react-redux";
import { TimeCounter, Header, Form, ListContainer } from './Components/index'

import reducer from './reducer';

const url = 'https://mitkowski-todo-awesome-list.herokuapp.com/api/v1/events';
//https://mitkowski-todo-awesome-list.herokuapp.com/api/v1/events

const initialStore = {
  loading: true
}

const store = createStore(reducer, initialStore);

function App() {
  return (
    <Provider store={store}>
      <TimeCounter />
      <main>
        <Header />
        <Form url={url} />
      </main>
      <ListContainer url={url} />
    </Provider>
  );
}
export default App;
