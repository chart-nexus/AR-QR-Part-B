import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import {MainLayoutView} from "./layouts";
import {DashboardView} from "./pages/Dashboard";
import {LoginView} from "./pages/Login";
import {ConfigView} from "./pages/Config";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/app" element={<MainLayoutView />}>
                        <Route path="dashboard" element={<DashboardView />} />
                        <Route path="config" element={<ConfigView />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
