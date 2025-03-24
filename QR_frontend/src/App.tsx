import React from "react";
import MainPage from "../pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SessionDetails from "../pages/sessiondetails";
import OSAttendanceList from "../pages/os";

function App(){
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/session/:session_id" element={<SessionDetails/>} />
          <Route path="/attendence/os" element={<OSAttendanceList/>} />
        </Routes>
        </BrowserRouter>
    )

}

export default App;

