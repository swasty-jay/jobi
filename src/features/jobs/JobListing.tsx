import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/Firebase";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  applicationUrl: string;
  deadline: string;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const approvalLogic = query(
        collection(db, "jobs"),
        where("isApproved", "==", true)
      );
      const querySnapshot = await getDocs(approvalLogic);
      const jobData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Job[];
      setJobs(jobData);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center">Loading jobs...</p>;

  return (
    <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="border p-4 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <p>{job.location}</p>
          <p className="text-sm text-purple-600 font-medium">{job.salary}</p>
          <p className="text-sm">{job.description.slice(0, 100)}...</p>
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-purple-600 hover:underline"
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
