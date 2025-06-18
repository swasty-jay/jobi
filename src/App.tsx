import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobListings from "./features/jobs/JobListing";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./components/custom/AdminDashboard";
import JobPostForm from "./features/jobs/JobpostingForm";
import AppLayout from "./components/custom/AppLayout";

function App() {
  return (
    <div className="bg-[#f1f5f9]">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/joblisting" element={<JobListings />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route
            path="/jobpostform"
            element={<JobPostForm userId="dummyUserId" />}
          />
        </Route>

        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
