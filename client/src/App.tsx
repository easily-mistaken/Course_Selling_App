import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import UserHome from "./Pages/UserHome";

function App() {
  return (
    <main>
      <BrowserRouter>
        <UserLayout>
          <Routes>
            <Route path="/" element={<UserHome />} />
          </Routes>
        </UserLayout>
      </BrowserRouter>
    </main>
  );
}

export default App;
