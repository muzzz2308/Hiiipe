import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RouteFallback } from "./components/ui/skeletons";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminPosts from "./admin/AdminPosts";
import AdminTeam from "./admin/AdminTeam";
import AdminTestimonials from "./admin/AdminTestimonials";
import AdminProjects from "./admin/AdminProjects";
import AdminReviews from "./admin/AdminReviews";

function App() {
  const Home = lazy(() => import("./pages/HomePage"));
  const Portfolio = lazy(() => import("./pages/TeamPortfolio"));
  const JournalDetail = lazy(() => import("./pages/PostDetails"));
  const JournalArch = lazy(() => import("./pages/JournelArch"));
  const NotFound = lazy(() => import("./pages/NotFound"));

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
        <Route path="/team/:slug" element={<Portfolio />} />
        <Route path="/journal/:slug" element={<JournalDetail />} />
        <Route path="/journals" element={<JournalArch />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
