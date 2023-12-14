import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import PageNotFound from './pages/PageNotFound';
import EditProfile from './pages/EditProfile';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signin' element ={<SignIn />} />
                    <Route exact path='/signup' element={<SignUp />} />
                    <Route exact path='/forgot-password' element ={<ForgotPassword />} />
                    <Route exact path='/edit' element={<EditProfile />} />
                    <Route exact path='/:userId' element={<Home />} />                   
                    <Route exact path='/404' element={<PageNotFound />} />
                    {/* <Route exact path='/:userId' element ={<SpecificCard />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
