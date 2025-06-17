import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobListings from "./features/jobs/JobListing";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./components/custom/AdminDashboard";
import JobPostForm from "./features/jobs/JobpostingForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/joblisting" element={<JobListings />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/jobpostform" element={<JobPostForm />} />

        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
      ;
    </div>
  );
}

export default App;
