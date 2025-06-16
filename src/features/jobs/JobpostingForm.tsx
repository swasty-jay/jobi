// components/forms/JobPostForm.tsx
import { useState } from "react";
import { db } from "@/lib/firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const JobPostForm = ({ userId }: { userId: string }) => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "Remote",
    location: "",
    salary: "",
    applicationUrl: "",
    description: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      // await addDoc(
      //   collection(db, "jobs"),
      //   await addDoc(collection(db, "jobs"), {
      //     ...form,
      //     deadline: new Date(form.deadline), // ✅ convert to Date
      //     postedBy: "temporal user",
      //     createdAt: serverTimestamp(),
      //     updatedAt: serverTimestamp(),
      //     isApproved: false,
      //     isFlagged: false,
      //   })
      // );

      const jobData: any = {
        ...form,
        deadline: new Date(form.deadline),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isApproved: false,
        isFlagged: false,
      };

      if (userId) {
        jobData.postedBy = userId;
      }

      await addDoc(collection(db, "jobs"), jobData);

      setSuccess("Job posted successfully! Pending approval.");
      setForm({
        title: "",
        company: "",
        type: "Remote",
        location: "",
        salary: "",
        applicationUrl: "",
        description: "",
        deadline: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-2">Post a Job</h2>

      <Input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Input
        name="company"
        placeholder="Company Name"
        value={form.company}
        onChange={handleChange}
        required
      />
      <Input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <Input
        name="salary"
        placeholder="Salary Range"
        value={form.salary}
        onChange={handleChange}
      />
      <Input
        name="applicationUrl"
        placeholder="Application URL or Email"
        value={form.applicationUrl}
        onChange={handleChange}
        required
      />
      <Input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        required
      />

      <Textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Job"}
      </Button>

      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
    </form>
  );
};

export default JobPostForm;
