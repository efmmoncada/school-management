import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Students from "./pages/Students/Students";
import Classes from "./pages/Classes/Classes";
import Staff from "./pages/Staff/Staff";
import Locations from "./pages/Locations/Locations";
import HostsPage from "./pages/Hosts/Hosts";
import EnrolledInPage from "./pages/EnrolledIn/EnrolledIn";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/students' element={<Students />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/staff' element={<Staff />} />
        <Route path='/locations' element={<Locations />} />
        <Route path='/enrolled_in' element={<EnrolledInPage />} />
        <Route path='/hosts_in' element={<HostsPage />} />
      </Routes>
    </div>
  );
}

export default App;
