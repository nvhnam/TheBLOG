import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Post from "./pages/Post";
import WritePost from "./pages/WritePost";
import PostCategories from "./pages/PostCategories";

function Layout() {
  return (
    <div className="w-full h-full relative flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/write" element={<WritePost />} />
          <Route path="/:category" element={<PostCategories />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;
