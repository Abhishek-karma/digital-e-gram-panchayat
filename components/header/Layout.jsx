import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <Outlet /> 
            </main>
        </div>
    );
};

export default Layout;
