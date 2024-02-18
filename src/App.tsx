import { Provider } from 'react-redux';
import Repositories from './Repositories';
import { store } from './state-redux/store';
import 'bulma/css/bulma.css';

function App() {
  return (
    <Provider store={store}>
      <div className="columns">
        <div className="container">
          <Repositories />
        </div>
      </div>
    </Provider>
  );
}

export default App;
