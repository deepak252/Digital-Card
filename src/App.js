import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path='/signin' element ={<SignIn />} />
                    <Route exact path='/signup' element ={<SignUp />} />
                    <Route exact path='/' element ={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
