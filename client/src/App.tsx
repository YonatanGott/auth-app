import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { Provider } from 'react-redux';
import { store } from "./store/store";

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
