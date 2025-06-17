import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/Firebase";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminDashboard = () => {
  const { isAdmin } = useAdminAuth();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(jobs);
    };

    if (isAdmin) fetchJobs();
  }, [isAdmin]);

  const approveJob = async (jobId: string) => {
    await updateDoc(doc(db, "jobs", jobId), {
      isApproved: true,
    });
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isApproved: true } : j))
    );
  };

  if (!isAdmin) return <p>Access Denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Job Approval</h1>
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 mb-3 rounded shadow">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p>{job.description}</p>
          {!job.isApproved && (
            <button
              onClick={() => approveJob(job.id)}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
            >
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
