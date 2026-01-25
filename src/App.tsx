import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import HomePage from "@/page/Home";
import ServicesPage from "@/page/Services";
import ComingSoonPage from "@/page/ComingSoon";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dich-vu&lien-he" element={<ServicesPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
