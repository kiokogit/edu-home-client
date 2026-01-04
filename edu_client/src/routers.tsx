
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/protected/Dashboard"

export const MainRouters = () => {

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    )
}




