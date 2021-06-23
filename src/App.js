import './App.css';
import Header from './components/Header/Header';
import Property from './components/Property/Property';
import RoomList from './components/Room/RoomList';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Booking from './components/Booking/Booking';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Switch>
        <Route 
              path="/" 
              exact 
              component={Property} />

        <Route 
              path="/rooms/:pId" 
              exact 
              component={RoomList} />

        <Route 
              path="/rooms/book/:rId" 
              exact 
              component={Booking} />
      </Switch>
    </Router>
    </>
    
  );
}

export default App;
