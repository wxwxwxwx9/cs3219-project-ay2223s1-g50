import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import LoginPage from "./components/LoginPage";
import {Box} from "@mui/material";
import NavBar from "./components/layouts/Navbar";
import DashBoard from "./components/Dashboard";
import RequireAuth from "./components/protected-routes/RequireAuth";
import UserContextProvider from "./components/context/user-context";
import PageNotFound from "./components/PageNotFound";
import LoadingPage from "./components/LoadingPage";
import Onboarding from "./components/home/Onboarding";
import Profile from "./components/Profile";
import Interview from "./components/Interview";
import AboutPage from "./components/home/AboutPage";

const styles = {
  root: {
    padding: "10px"
  }
};

function App() {

    return (
        <UserContextProvider>
        <div className="App">
            <NavBar />
            {/* <Box display={"flex"} flexDirection={"column"} padding={"4rem"}> */}
                <Router>
                    <Routes>
                        {/* <Route element={<ExistingAuth />}> */}
                            <Route exact path="/" element={<Onboarding />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        {/* </Route> */}
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/loading" element={<LoadingPage />} />

                        {/** Protected paths */}
                        <Route element={<RequireAuth />}>
                            <Route path="/dashboard" element={<DashBoard />} />
                            <Route path="/profile" element={<Profile />} />
                            {/**Add InterviewSession into another protected path iff has matching */}
                            <Route path='/interview-session' element={<Interview />} />
                        </Route>

                        { /** TODO  */}
                        { /** CHECK WHY VALUES IN CONTEXT IS REMOVED WHEN PATH="*"  */}
                        <Route path='*' element={<PageNotFound />}/>
                    </Routes>
                </Router>
            {/* </Box> */}
        </div>
        </UserContextProvider>
    );
}

export default App;