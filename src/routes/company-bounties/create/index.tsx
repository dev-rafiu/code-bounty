import { useState } from "react";
import { Bitcoin, Plus } from "lucide-react";
import { toast } from "sonner";
import { authService } from "../../../services/authService";
import LoadingIndicator from "../../../components/common/LoadingIndicator";
import { useAppContext } from "../../../hooks/useAppContext";

export const CreateBountyPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    bountyBTC: 0.001,
    deadline: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAppContext();
  console.log(user);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "Coding",
      difficulty: "Beginner",
      bountyBTC: 0.001,
      deadline: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.category ||
      !form.difficulty ||
      !form.deadline
    ) {
      toast.error("Please fill in all required fields");
    }

    setIsLoading(true);

    try {
      const payload = {
        ...form,
        company: user?.success && user.user.companyName,
        bountyBTC: parseFloat(form.bountyBTC.toString()),
      };

      console.log(payload, "Payload to create bounty");

      await authService.createBounty(payload);
      toast.success("Bounty created successfully!");
      setIsLoading(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create New Bounty
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          {/* title */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g., Build a React Trading Dashboard"
              required
            />
          </div>

          {/* desc */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe the bounty in detail..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option>Coding</option>
                <option>Data Analysis</option>
                <option>Blockchain</option>
              </select>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          {/* amount */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bounty Amount (BTC)
              </label>
              <div className="relative">
                <Bitcoin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  disabled
                  type="number"
                  step="0.0001"
                  name="amount"
                  value={form.bountyBTC}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="0.001"
                  required
                />
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 cursor-pointer bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Bounty
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  title: "",
                  description: "",
                  category: "",
                  difficulty: "",
                  bountyBTC: 0.001,
                  deadline: "",
                })
              }
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
