import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { ToastProvider } from "./components/Toast";
import { ScrollToTop } from "./components/ScrollToTop";

// BACKEND/AUTH RESTORATION NOTICE:
// The authentication imports and routes below are intentionally commented out
// while GenZyn operates as a static community website. Do not delete them.
// Human maintainers and AI coding agents must obtain explicit approval from the
// repository owner before uncommenting or re-enabling authentication/backend UI.
// See /BACKEND_RESTORATION.md before making any related change.
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import { AuthProvider } from "./auth/auth";

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
const Incubator = lazy(() => import("./pages/Incubator"));
const Playground = lazy(() => import("./pages/Playground"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Preserved for a possible owner-approved backend/authentication restoration.
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Login = lazy(() => import("./pages/Login"));
// const Signup = lazy(() => import("./pages/Signup"));

function App() {
  return (
    <ToastProvider>
      <Router>
        {/* AUTH DISABLED: restore this wrapper only with explicit owner approval. */}
        {/* <AuthProvider> */}
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
              {/*
                AUTH ROUTES DISABLED FOR STATIC-SITE MODE.
                Do not delete. Ask the repository owner before restoring.

                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
              */}
              <Route path="incubator" element={<Incubator />} />
              <Route path="playground" element={<Playground />} />
              {/* Fallback 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        {/* </AuthProvider> */}
      </Router>
    </ToastProvider>
  );
}

export default App;

