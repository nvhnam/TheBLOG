/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Post from "./pages/Post";
import WritePost from "./pages/WritePost";
import PostCategories from "./pages/PostCategories";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "./components/Spinner";
import { useState } from "react";
import { AuthContextProvider } from "./context/authContext";

function Layout({ isLoading, setIsLoading }) {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col">
      <Navbar setIsLoading={setIsLoading} />
      <AnimatePresence mode="wait">{isLoading && <Spinner />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.div>
      <Footer />
    </div>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AuthContextProvider setIsLoading={setIsLoading}>
      <main>
        <Routes>
          <Route
            element={
              <Layout isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          >
            <Route index element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={<Home setIsLoading={setIsLoading} />}
            />
            <Route
              path="/post/:postId"
              element={<Post setIsLoading={setIsLoading} />}
            />
            <Route
              path="/write"
              element={<WritePost setIsLoading={setIsLoading} />}
            />
            <Route
              path="/:category"
              element={<PostCategories setIsLoading={setIsLoading} />}
            />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
          <Route
            path="/login"
            element={<Login setIsLoading={setIsLoading} />}
          />
          <Route
            path="/register"
            element={<Register setIsLoading={setIsLoading} />}
          />
          <Route
            path="/register/verify"
            element={<Verify setIsLoading={setIsLoading} />}
          />
        </Routes>
      </main>
    </AuthContextProvider>
  );
};

export default App;
