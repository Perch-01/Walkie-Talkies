import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/Auth/signin';
import NotFound from '../pages/NotFound';
const index = () => {
    return (
        <Router>
            <Routes>
                <Route exact path={"/"} element={<Home />} />
                <Route exact path={"/signin"} element={<SignIn />} />
                {/*This should be first */}
                <Route exact path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}
export default index;