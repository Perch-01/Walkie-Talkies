import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/Auth/signin';
import NotFound from '../pages/NotFound';
import { useEffect } from 'react';
const index = () => {
    return (
        <Router>
            <Routes>
                <Route exact path={"/"} element={<Home />} />
                {/* <Route exact path={"/signin"} element={<SignIn />} /> */}
                {/*For 404 not found routes*/}
                {/* <Route exact path='*' element={<NotFound />} /> */}
                <Route exact path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    )
}
export default index;