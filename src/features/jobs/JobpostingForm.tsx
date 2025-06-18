import { useState } from "react";
import { db } from "@/lib/firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JobFormData, JobType } from "@/types";

// Types

interface JobPostFormProps {
  userId: string;
  onSuccess?: () => void;
}

// Constants
const JOB_TYPES: JobType[] = ["Remote", "On-site", "Hybrid"];

const INITIAL_FORM_STATE: JobFormData = {
  title: "",
  company: "",
  type: "Remote",
  location: "",
  salary: "",
  applicationUrl: "",
  description: "",
  deadline: "",
};

const JobPostForm = ({ userId, onSuccess }: JobPostFormProps) => {
  // State management
  const [form, setForm] = useState<JobFormData>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleTypeChange = (value: JobType) => {
    setForm((prev) => ({ ...prev, type: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      "title",
      "company",
      "location",
      "applicationUrl",
      "description",
      "deadline",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !form[field as keyof JobFormData].trim()
    );

    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return false;
    }

    // Validate deadline is in the future
    const deadlineDate = new Date(form.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadlineDate < today) {
      setError("Deadline must be today or in the future");
      return false;
    }

    // Validate URL format
    if (
      form.applicationUrl &&
      !isValidUrl(form.applicationUrl) &&
      !isValidEmail(form.applicationUrl)
    ) {
      setError("Please enter a valid URL or email address for applications");
      return false;
    }

    return true;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM_STATE);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const jobData = {
        ...form,
        deadline: new Date(form.deadline),
        postedBy: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isApproved: false,
        isFlagged: false,
      };

      await addDoc(collection(db, "jobs"), jobData);

      setSuccess(
        "Job posted successfully! Your listing is pending approval and will be visible once reviewed."
      );
      resetForm();
      onSuccess?.();
    } catch (err) {
      console.error("Error posting job:", err);
      setError("Failed to post job. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-[#f1f5f9]">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            Post a New Job
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Fill out the form below to post your job listing
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Senior Frontend Developer"
                  value={form.title}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <Label htmlFor="company" className="text-sm font-medium">
                  Company Name *
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g., Tech Corp Inc."
                  value={form.company}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              {/* Job Type */}
              <div>
                <Label htmlFor="type" className="text-sm font-medium">
                  Job Type
                </Label>
                <Select value={form.type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-sm font-medium">
                  Location *
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., San Francisco, CA or Global"
                  value={form.location}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <Label htmlFor="salary" className="text-sm font-medium">
                  Salary Range
                </Label>
                <Input
                  id="salary"
                  name="salary"
                  placeholder="e.g., $80,000 - $120,000"
                  value={form.salary}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              {/* Application URL */}
              <div>
                <Label htmlFor="applicationUrl" className="text-sm font-medium">
                  Application URL/Email *
                </Label>
                <Input
                  id="applicationUrl"
                  name="applicationUrl"
                  placeholder="e.g., https://company.com/apply or jobs@company.com"
                  value={form.applicationUrl}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              {/* Deadline */}
              <div>
                <Label htmlFor="deadline" className="text-sm font-medium">
                  Application Deadline *
                </Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleInputChange}
                  className="mt-1"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              {/* Job Description */}
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Job Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the role, responsibilities, requirements, and any other relevant details..."
                  value={form.description}
                  onChange={handleInputChange}
                  className="mt-1 min-h-[120px] resize-y"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Provide a detailed description to attract the right candidates
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none sm:min-w-[200px]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Posting Job...
                  </>
                ) : (
                  "Post Job"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={loading}
                className="flex-1 sm:flex-none"
              >
                Reset Form
              </Button>
            </div>

            {/* Form Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All job postings are reviewed before
                being published. You'll receive a notification once your listing
                is approved and goes live.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostForm;
