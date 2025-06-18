// import { useEffect, useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase/Firebase";
// import {
//   Search,
//   MapPin,
//   Building,
//   DollarSign,
//   Calendar,
//   ExternalLink,
//   Filter,
//   Grid,
//   List,
//   Clock,
//   Briefcase,
//   Heart,
//   Share2,
//   ChevronDown,
//   X,
// } from "lucide-react";

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   location: string;
//   salary: string;
//   description: string;
//   applicationUrl: string;
//   deadline: string;
//   jobType?: string;
//   experience?: string;
//   createdAt?: any;
// }

// const JobListings = () => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [jobTypeFilter, setJobTypeFilter] = useState("");
//   const [salaryFilter, setSalaryFilter] = useState("");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [showFilters, setShowFilters] = useState(false);
//   const [favoriteJobs, setFavoriteJobs] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState("newest");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         const approvalLogic = query(
//           collection(db, "jobs"),
//           where("isApproved", "==", true)
//         );
//         const querySnapshot = await getDocs(approvalLogic);
//         const jobData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Job[];
//         setJobs(jobData);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const toggleFavorite = (jobId: string) => {
//     setFavoriteJobs((prev) =>
//       prev.includes(jobId)
//         ? prev.filter((id) => id !== jobId)
//         : [...prev, jobId]
//     );
//   };

//   const shareJob = (job: Job) => {
//     if (navigator.share) {
//       navigator.share({
//         title: job.title,
//         text: `Check out this job opportunity at ${job.company}`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(
//         `${job.title} at ${job.company} - ${window.location.href}`
//       );
//     }
//   };

//   const formatDate = (timestamp: any) => {
//     if (!timestamp) return "Recently posted";
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     const now = new Date();
//     const diffTime = Math.abs(now.getTime() - date.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 1) return "1 day ago";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
//     return date.toLocaleDateString();
//   };

//   const filteredAndSortedJobs = jobs
//     .filter((job) => {
//       const matchesSearch =
//         job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesLocation =
//         !locationFilter ||
//         job.location.toLowerCase().includes(locationFilter.toLowerCase());
//       const matchesJobType = !jobTypeFilter || job.jobType === jobTypeFilter;
//       const matchesSalary =
//         !salaryFilter ||
//         (salaryFilter === "negotiable"
//           ? job.salary.toLowerCase().includes("negotiable")
//           : true);

//       return (
//         matchesSearch && matchesLocation && matchesJobType && matchesSalary
//       );
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "newest":
//           return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
//         case "oldest":
//           return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
//         case "company":
//           return a.company.localeCompare(b.company);
//         case "title":
//           return a.title.localeCompare(b.title);
//         default:
//           return 0;
//       }
//     });

//   const uniqueLocations = [...new Set(jobs.map((job) => job.location))];
//   const uniqueJobTypes = [
//     ...new Set(jobs.map((job) => job.jobType).filter(Boolean)),
//   ];

//   const clearFilters = () => {
//     setSearchTerm("");
//     setLocationFilter("");
//     setJobTypeFilter("");
//     setSalaryFilter("");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">
//             Loading amazing opportunities...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div className="mb-4 lg:mb-0">
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//                 <Briefcase className="w-8 h-8 text-purple-600 mr-3" />
//                 Job Opportunities
//               </h1>
//               <p className="mt-1 text-gray-600">
//                 Discover {jobs.length} amazing career opportunities
//               </p>
//             </div>

//             {/* View Toggle & Sort */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">Sort by:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 >
//                   <option value="newest">Newest</option>
//                   <option value="oldest">Oldest</option>
//                   <option value="company">Company</option>
//                   <option value="title">Job Title</option>
//                 </select>
//               </div>

//               <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 ${
//                     viewMode === "grid"
//                       ? "bg-purple-600 text-white"
//                       : "bg-white text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <Grid className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 ${
//                     viewMode === "list"
//                       ? "bg-purple-600 text-white"
//                       : "bg-white text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
//           <div className="p-6">
//             {/* Search Bar */}
//             <div className="relative mb-6">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search jobs, companies, or keywords..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
//               />
//             </div>

//             {/* Filter Toggle */}
//             <div className="flex items-center justify-between mb-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
//               >
//                 <Filter className="w-4 h-4 mr-2" />
//                 Filters
//                 <ChevronDown
//                   className={`w-4 h-4 ml-2 transform transition-transform ${
//                     showFilters ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {(searchTerm ||
//                 locationFilter ||
//                 jobTypeFilter ||
//                 salaryFilter) && (
//                 <button
//                   onClick={clearFilters}
//                   className="flex items-center text-red-600 hover:text-red-700 text-sm"
//                 >
//                   <X className="w-4 h-4 mr-1" />
//                   Clear filters
//                 </button>
//               )}
//             </div>

//             {/* Filters */}
//             {showFilters && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Location
//                   </label>
//                   <select
//                     value={locationFilter}
//                     onChange={(e) => setLocationFilter(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   >
//                     <option value="">All locations</option>
//                     {uniqueLocations.map((location) => (
//                       <option key={location} value={location}>
//                         {location}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Job Type
//                   </label>
//                   <select
//                     value={jobTypeFilter}
//                     onChange={(e) => setJobTypeFilter(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   >
//                     <option value="">All types</option>
//                     {uniqueJobTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Salary
//                   </label>
//                   <select
//                     value={salaryFilter}
//                     onChange={(e) => setSalaryFilter(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   >
//                     <option value="">All ranges</option>
//                     <option value="negotiable">Negotiable</option>
//                   </select>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="flex items-center justify-between mb-6">
//           <p className="text-gray-600">
//             Showing {filteredAndSortedJobs.length} of {jobs.length} jobs
//           </p>
//         </div>

//         {/* Job Listings */}
//         {filteredAndSortedJobs.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Briefcase className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               No jobs found
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Try adjusting your search criteria or filters
//             </p>
//             <button
//               onClick={clearFilters}
//               className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
//             >
//               Clear all filters
//             </button>
//           </div>
//         ) : (
//           <div
//             className={
//               viewMode === "grid"
//                 ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//                 : "space-y-4"
//             }
//           >
//             {filteredAndSortedJobs.map((job) => (
//               <div
//                 key={job.id}
//                 className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group ${
//                   viewMode === "list" ? "p-6" : "p-6"
//                 }`}
//               >
//                 {viewMode === "grid" ? (
//                   // Grid View
//                   <div className="h-full flex flex-col">
//                     {/* Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
//                           {job.title}
//                         </h3>
//                         <div className="flex items-center text-gray-600 mb-2">
//                           <Building className="w-4 h-4 mr-2" />
//                           <span className="font-medium">{job.company}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2 ml-4">
//                         <button
//                           onClick={() => toggleFavorite(job.id)}
//                           className={`p-2 rounded-lg transition-colors ${
//                             favoriteJobs.includes(job.id)
//                               ? "text-red-600 hover:bg-red-50"
//                               : "text-gray-400 hover:text-red-600 hover:bg-red-50"
//                           }`}
//                         >
//                           <Heart
//                             className={`w-4 h-4 ${
//                               favoriteJobs.includes(job.id)
//                                 ? "fill-current"
//                                 : ""
//                             }`}
//                           />
//                         </button>
//                         <button
//                           onClick={() => shareJob(job)}
//                           className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
//                         >
//                           <Share2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Details */}
//                     <div className="space-y-3 mb-6 flex-1">
//                       <div className="flex items-center text-gray-600">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         <span>{job.location}</span>
//                       </div>

//                       {job.salary && (
//                         <div className="flex items-center text-green-600 font-medium">
//                           <DollarSign className="w-4 h-4 mr-2" />
//                           <span>{job.salary}</span>
//                         </div>
//                       )}

//                       <div className="flex items-center text-gray-500 text-sm">
//                         <Clock className="w-4 h-4 mr-2" />
//                         <span>{formatDate(job.createdAt)}</span>
//                       </div>

//                       <p className="text-gray-600 text-sm line-clamp-3">
//                         {job.description}
//                       </p>
//                     </div>

//                     {/* Footer */}
//                     <div className="pt-4 border-t border-gray-100">
//                       <a
//                         href={job.applicationUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
//                       >
//                         Apply Now
//                         <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                       </a>
//                     </div>
//                   </div>
//                 ) : (
//                   // List View
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex-1">
//                           <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
//                             {job.title}
//                           </h3>
//                           <div className="flex items-center text-gray-600 mb-2">
//                             <Building className="w-4 h-4 mr-2" />
//                             <span className="font-medium mr-4">
//                               {job.company}
//                             </span>
//                             <MapPin className="w-4 h-4 mr-2" />
//                             <span>{job.location}</span>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2 ml-4">
//                           {job.salary && (
//                             <span className="text-green-600 font-medium">
//                               {job.salary}
//                             </span>
//                           )}
//                           <span className="text-gray-500 text-sm">
//                             {formatDate(job.createdAt)}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {job.description}
//                       </p>
//                     </div>

//                     <div className="flex items-center space-x-3 ml-6">
//                       <button
//                         onClick={() => toggleFavorite(job.id)}
//                         className={`p-2 rounded-lg transition-colors ${
//                           favoriteJobs.includes(job.id)
//                             ? "text-red-600 hover:bg-red-50"
//                             : "text-gray-400 hover:text-red-600 hover:bg-red-50"
//                         }`}
//                       >
//                         <Heart
//                           className={`w-4 h-4 ${
//                             favoriteJobs.includes(job.id) ? "fill-current" : ""
//                           }`}
//                         />
//                       </button>

//                       <a
//                         href={job.applicationUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center"
//                       >
//                         Apply Now
//                         <ExternalLink className="w-4 h-4 ml-2" />
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobListings;

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/Firebase";
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Filter,
  ChevronDown,
  X,
  Briefcase,
  Users,
} from "lucide-react";

// TypeScript interface for Job data structure
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  applicationUrl: string;
  deadline: string;
  jobType?: string;
  experience?: string;
  createdAt?: any;
  // Fields that might not exist in Firebase - will use placeholders
  skills?: string[];
  logo?: string;
  positions?: number;
  urgencyLevel?: "urgent" | "featured" | "normal";
  tags?: string[];
}

// Job type configuration for styling and labels
const JOB_TYPE_CONFIG = {
  "Full Time": { color: "bg-green-100 text-green-800", label: "Full Time" },
  "Part Time": { color: "bg-blue-100 text-blue-800", label: "Part Time" },
  Freelance: { color: "bg-purple-100 text-purple-800", label: "Freelancer" },
  Internship: { color: "bg-red-100 text-red-800", label: "Internship" },
  Contract: { color: "bg-yellow-100 text-yellow-800", label: "Contract" },
};

// Urgency level configuration for styling
const URGENCY_CONFIG = {
  urgent: { color: "bg-orange-100 text-orange-800", label: "Urgent" },
  featured: { color: "bg-green-100 text-green-800", label: "Featured" },
  normal: { color: "bg-gray-100 text-gray-800", label: "Normal" },
};

const JobListings: React.FC = () => {
  // State management for jobs and UI controls
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("");
  const [salaryFilter, setSalaryFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("newest");

  /**
   * Fetch jobs from Firebase Firestore
   * Only retrieves approved jobs and handles errors gracefully
   */
  useEffect(() => {
    const fetchJobs = async (): Promise<void> => {
      try {
        setLoading(true);

        // Query Firebase for approved jobs only
        const approvalLogic = query(
          collection(db, "jobs"),
          where("isApproved", "==", true)
        );

        const querySnapshot = await getDocs(approvalLogic);

        // Transform Firebase documents to Job objects
        const jobData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Add placeholder data for fields that might not exist in Firebase
            skills: data.skills || ["CSS3", "HTML5", "Javascript", "Bootstrap"], // Placeholder skills
            logo: data.logo || "💼", // Placeholder emoji logo
            positions: data.positions || Math.floor(Math.random() * 6) + 1, // Random number 1-6
            urgencyLevel:
              data.urgencyLevel ||
              (Math.random() > 0.7
                ? "urgent"
                : Math.random() > 0.4
                ? "featured"
                : "normal"),
            tags: data.tags || [],
          } as Job;
        });

        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs from Firebase:", error);
        // TODO: Add proper error handling UI here
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /**
   * Generate company logo placeholder
   * Returns emoji based on company name or default briefcase
   */
  const getCompanyLogo = (company: string, existingLogo?: string): string => {
    if (existingLogo) return existingLogo;

    // Simple logo mapping - you can expand this
    const logoMap: { [key: string]: string } = {
      google: "🔍",
      facebook: "📘",
      apple: "🍎",
      microsoft: "🪟",
      amazon: "📦",
      netflix: "🎬",
      uber: "🚗",
      airbnb: "🏠",
      spotify: "🎵",
      twitter: "🐦",
    };

    const companyKey = company.toLowerCase();
    return logoMap[companyKey] || "💼";
  };

  /**
   * Format date from Firebase timestamp
   * Handles both Firestore timestamp and regular date objects
   */
  const formatDate = (timestamp: any): string => {
    if (!timestamp) return "Recently posted";

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return date.toLocaleDateString();
    } catch (error) {
      return "Recently posted";
    }
  };

  /**
   * Filter and sort jobs based on user selections
   * Applies search, location, job type, and salary filters
   */
  const filteredAndSortedJobs = jobs
    .filter((job: Job) => {
      // Search filter - searches in title, company, and description
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Location filter
      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      // Job type filter
      const matchesJobType = !jobTypeFilter || job.jobType === jobTypeFilter;

      // Salary filter (basic implementation)
      const matchesSalary =
        !salaryFilter ||
        (salaryFilter === "negotiable"
          ? job.salary.toLowerCase().includes("negotiable")
          : true);

      return (
        matchesSearch && matchesLocation && matchesJobType && matchesSalary
      );
    })
    .sort((a: Job, b: Job) => {
      // Sorting logic
      switch (sortBy) {
        case "newest":
          return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
        case "oldest":
          return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
        case "company":
          return a.company.localeCompare(b.company);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  /**
   * Get unique values for filter dropdowns
   */
  const uniqueLocations = [...new Set(jobs.map((job: Job) => job.location))];
  const uniqueJobTypes = [
    ...new Set(jobs.map((job: Job) => job.jobType).filter(Boolean)),
  ];

  /**
   * Clear all active filters
   */
  const clearFilters = (): void => {
    setSearchTerm("");
    setLocationFilter("");
    setJobTypeFilter("");
    setSalaryFilter("");
  };

  /**
   * Render job card component
   * Matches the design from the provided image
   */
  const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-6 group">
        {/* Top section with tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Urgency/Featured tag */}
          {job.urgencyLevel && job.urgencyLevel !== "normal" && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                URGENCY_CONFIG[job.urgencyLevel].color
              }`}
            >
              {URGENCY_CONFIG[job.urgencyLevel].label}
            </span>
          )}

          {/* Job type tag */}
          {job.jobType && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                JOB_TYPE_CONFIG[job.jobType as keyof typeof JOB_TYPE_CONFIG]
                  ?.color || "bg-gray-100 text-gray-800"
              }`}
            >
              {JOB_TYPE_CONFIG[job.jobType as keyof typeof JOB_TYPE_CONFIG]
                ?.label || job.jobType}
            </span>
          )}
        </div>

        {/* Company logo section */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-2xl border border-gray-100">
            {getCompanyLogo(job.company, job.logo)}
          </div>
        </div>

        {/* Job title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-3 group-hover:text-purple-600 transition-colors">
          {job.title}
        </h3>

        {/* Skills tags - placeholder data if not in Firebase */}
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {(job.skills || [])
            .slice(0, 4)
            .map((skill: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          {(job.skills || []).length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{(job.skills || []).length - 4}
            </span>
          )}
        </div>

        {/* Salary and positions section */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-gray-900">{job.salary}</div>
          <div className="flex items-center text-sm text-white bg-green-500 px-3 py-1 rounded-full">
            <Users className="w-3 h-3 mr-1" />
            {job.positions || 1} Open
          </div>
        </div>

        {/* Apply button */}
        <a
          href={job.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-500 hover:text-purple-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group-hover:border-purple-500 group-hover:text-purple-600"
        >
          Apply Now
        </a>

        {/* Company name - small text at bottom */}
        <div className="text-center mt-3 text-sm text-gray-500">
          {job.company}
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading amazing opportunities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Briefcase className="w-8 h-8 text-purple-600 mr-3" />
                Job Opportunities
              </h1>
              <p className="mt-1 text-gray-600">
                Discover {jobs.length} amazing career opportunities
              </p>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="company">Company</option>
                  <option value="title">Job Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 ml-2 transform transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Clear filters button */}
              {(searchTerm ||
                locationFilter ||
                jobTypeFilter ||
                salaryFilter) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-red-600 hover:text-red-700 text-sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear filters
                </button>
              )}
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All locations</option>
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={jobTypeFilter}
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All types</option>
                    {uniqueJobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary
                  </label>
                  <select
                    value={salaryFilter}
                    onChange={(e) => setSalaryFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All ranges</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Job Cards Grid */}
        {filteredAndSortedJobs.length === 0 ? (
          // No jobs found state
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          // Job cards grid - responsive layout matching the image
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
