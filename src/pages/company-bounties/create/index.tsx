import { useState } from "react";
import { Bitcoin, ChevronDownIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { bountyService } from "../../../services/bounties/bountyService";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Calendar } from "../../../components/ui/calendar";
import { useAppContext } from "../../../hooks/useAppContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

export const CreateBountyPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    bountyBTC: 0.001,
    deadline: undefined as Date | undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { user } = useAppContext();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
      deadline: undefined,
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
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...form,
        deadline: format(form.deadline!, "yyyy-MM-dd"),
        company: user?.success && user.user.companyName,
        bountyBTC: parseFloat(form.bountyBTC.toString()),
      };

      console.log(payload, "Payload to create bounty");

      await bountyService.createBounty(payload);
      toast.success("Bounty created successfully!");
      setIsLoading(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <section className="min-h-screen">
      <div className="bg-background mx-auto max-w-3xl space-y-4 rounded p-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-xl font-medium">Create a new bounty</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Build a React todo app"
              required
            />
          </div>

          {/* desc */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the bounty in detail..."
              required
            />
          </div>

          {/* category and difficulty */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Coding">Coding</SelectItem>
                  <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                  <SelectItem value="Blockchain">Blockchain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={form.difficulty}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger id="difficulty" className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* amount and deadline */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bounty-btc">Bounty Amount (BTC)</Label>
              <div className="relative">
                <Bitcoin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="bounty-btc"
                  disabled
                  type="number"
                  step="0.0001"
                  name="bountyBTC"
                  value={form.bountyBTC}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="0.001"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="deadline"
                    className="text-muted-foreground hover:text-muted-foreground w-full justify-start text-left font-normal hover:bg-transparent"
                  >
                    {form.deadline ? (
                      format(form.deadline, "PPP")
                    ) : (
                      <span>Select deadline</span>
                    )}
                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.deadline}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setForm((prev) => ({ ...prev, deadline: date }));
                      setOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* action buttons */}
          <div className="flex space-x-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing Bounty...
                </>
              ) : (
                "Publish Bounty"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
