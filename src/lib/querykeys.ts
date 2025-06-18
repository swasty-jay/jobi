// lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Data stays in cache for 10 minutes
      gcTime: 10 * 60 * 1000, // Previously cacheTime
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      // Retry failed requests
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && error.message.includes("4")) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      // Exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      // Don't retry mutations by default for immediate user feedback
      retryDelay: 1000,
    },
  },
});

// Query Keys - centralize query keys for better maintenance
export const queryKeys = {
  // Jobs
  jobs: ["jobs"] as const,
  job: (id: string) => ["jobs", id] as const,
  jobsByStatus: (status: string) => ["jobs", "status", status] as const,
  jobsByCompany: (company: string) => ["jobs", "company", company] as const,

  // Stats
  jobStats: ["job-stats"] as const,

  // Admin
  adminUsers: ["admin-users"] as const,
  currentUser: ["current-user"] as const,
} as const;

// Prefetch functions for better UX
export const prefetchJobs = async (isAdmin: boolean) => {
  if (!isAdmin) return;

  await queryClient.prefetchQuery({
    queryKey: queryKeys.jobs,
    queryFn: async () => {
      // Your jobs fetching logic here
      // This is just a placeholder - use your actual fetching logic
      const { collection, getDocs } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase/Firebase");

      const snapshot = await getDocs(collection(db, "jobs"));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Clear all job-related queries (useful for logout or role changes)
export const clearJobQueries = () => {
  queryClient.removeQueries({ queryKey: queryKeys.jobs });
  queryClient.removeQueries({ queryKey: queryKeys.jobStats });
};

// Invalidate job queries (useful after mutations)
export const invalidateJobQueries = () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
  queryClient.invalidateQueries({ queryKey: queryKeys.jobStats });
};
