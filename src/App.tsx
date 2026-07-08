import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<BookAppointment />} />
    </Routes>
  );
}

export default App;
