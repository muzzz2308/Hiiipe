import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { ConfirmProvider } from "../components/ui/ConfirmDialog";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminPosts from "./AdminPosts";
import AdminTeam from "./AdminTeam";
import AdminTestimonials from "./AdminTestimonials";
import AdminProjects from "./AdminProjects";
import AdminReviews from "./AdminReviews";

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <ConfirmProvider>
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </ConfirmProvider>
    </AuthProvider>
  );
}
