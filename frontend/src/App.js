import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadUser from "./components/user";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center w-full">
        <Routes>
          <Route path="/" element={<ReadUser />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
