import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RouteFallback } from "./components/ui/skeletons";
import ScrollToTop from "./components/layout/ScrollToTop";

const Home = lazy(() => import("./pages/HomePage"));
const Services = lazy(() => import("./pages/ServicesPage"));
const Work = lazy(() => import("./pages/WorkPage"));
const Studio = lazy(() => import("./pages/StudioPage"));
const TeamIndex = lazy(() => import("./pages/TeamPage"));
const Industries = lazy(() => import("./pages/IndustriesPage"));
const FAQ = lazy(() => import("./pages/FAQPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Portfolio = lazy(() => import("./pages/TeamPortfolio"));
const JournalDetail = lazy(() => import("./pages/PostDetails"));
const JournalArch = lazy(() => import("./pages/JournelArch"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminRoutes = lazy(() => import("./admin/AdminRoutes"));
const AppToaster = lazy(() => import("./components/ui/AppToaster"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <AppToaster />
      </Suspense>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminRoutes />}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/team" element={<TeamIndex />} />
          <Route path="/team/:slug" element={<Portfolio />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal/:slug" element={<JournalDetail />} />
          <Route path="/journals" element={<JournalArch />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
