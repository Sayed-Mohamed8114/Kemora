import SmallLoader from "@/Components/Common/SmallLoader";
import InqueryCard from "@/Components/UI/InqueryCard";
import { deleteInquiry, getAllInquiries } from "@/Services/contact";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CustomerInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInquiries = async () => {
    try {
      const data = await getAllInquiries();
      setInquiries(data);
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (inquiryID) => {
    try {
      await deleteInquiry(inquiryID);
      // to remove the inquiry from the page and return the page after remove it
      setInquiries((prev) =>
        prev.filter((inquiry) => inquiry.id !== inquiryID),
      );
      toast.success("inquiry deleted successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.detail ||
          "failed to connect to the server try again later",
      );
    }
  };
  useEffect(() => {
    getInquiries();
  }, []);
  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-4 py-8
        text-slate-900
        dark:bg-[#121212]
        dark:text-white
        sm:px-20
      "
    >
      <div className="w-full">
        <div className="mb-8">
          <h1
            className="
              font-cinzel
              text-2xl font-bold
              text-gold-dark
              dark:text-gold-light
              sm:text-3xl
            "
          >
            Inquiries by customers
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            See what customers see about your company to improve it and gain
            more customers..
          </p>
        </div>

        {/* Staff Grid */}
        {loading ? (
          <SmallLoader />
        ) : inquiries.length === 0 ? (
          <div
            className="
              flex min-h-60
              items-center justify-center
              rounded-2xl
              border border-dashed border-slate-300
              bg-white
              dark:border-white/10
              dark:bg-[#171717]
            "
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No Inquiries found.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              lg:gap-5
              lg:grid-cols-2
              xl:grid-cols-3
            "
          >
            {inquiries.map((inquiry) => (
              <InqueryCard
                key={inquiry.id}
                inquiry={inquiry}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
