import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { ToastProvider } from "./components/Toast";
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/auth";

// Lazy loading all pages for code splitting & scalability
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Team = lazy(() => import("./pages/Team"));
const Projects = lazy(() => import("./pages/Projects"));
const Resources = lazy(() => import("./pages/Resources"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Incubator = lazy(() => import("./pages/Incubator"));
const Playground = lazy(() => import("./pages/Playground"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ToastProvider>
      <Router>
        <AuthProvider>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="main-container" style={{ paddingTop: "180px", paddingBottom: "100px" }}>
              <SkeletonLoader variant="card" count={3} />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="events" element={<Events />} />
              <Route path="team" element={<Team />} />
              <Route path="projects" element={<Projects />} />
              <Route path="resources" element={<Resources />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="careers" element={<Careers />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              <Route path="incubator" element={<Incubator />} />
              <Route path="playground" element={<Playground />} />
              {/* Fallback 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        </AuthProvider>
      </Router>
    </ToastProvider>
  );
}

export default App;

