import SmallLoader from "@/Components/Common/SmallLoader";
import RequestCard from "@/Components/UI/RequestCard";
import { useAuth } from "@/Context/AuthContext";
import {
  approveRequest,
  getAllRequests,
  myAssignedRequests,
  rejectRequest,
} from "@/Services/requestServices";
import { getAllServices } from "@/Services/Services";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RequestServicePage() {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  const admin = user?.role === "super_admin";
  const staff = user?.role === "staff";
  const customer = user?.role === "customer";

  const welcomeMessage = [
    "Manage request services by approving or rejecting the request then let the staff work on it.",
    "Manage and track the services requests by customers that the admin assigned to you",
    "Request service and see its progress for better experience",
  ];

  const noServiceYet = [
    "No Services yet start adding some services.",
    "There is no assigned requests for you yet.",
    "There is no services in this time we are sorry",
  ];

  const handleGetallRequestsForAdmin = async () => {
    setLoading(true);
    try {
      const data = await getAllRequests();
      setRequests(data);
    } catch (error) {
      const message =
        error?.response?.data?.detail || "failed to load requests";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllServicesForCustomer = async () => {
    setLoading(true);
    try {
      const data = await getAllServices();
      setRequests(data);
    } catch (error) {
      const message =
        error?.response?.data?.detail || "failed to load requests";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRequestsAssignedToStaff = async () => {
    setLoading(true);
    try {
      const data = await myAssignedRequests();
      setRequests(data);
    } catch (error) {
      const message =
        error?.response?.data?.detail || "failed to load requests";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (request_id) => {
    try {
      await approveRequest(request_id);
      toast.success("request has been approved successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "failed to approve the request ",
      );
    }
  };

  const handleRejectRequest = async (request_id) => {
    try {
      await rejectRequest(request_id);
      toast.success("request has been rejected successfully ");
    } catch (error) {
      console.log("ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);
      toast.error(
        error.response?.data?.message || "failed to reject the request",
      );
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (admin) {
      handleGetallRequestsForAdmin();
    } else if (staff) {
      handleGetRequestsAssignedToStaff();
    } else if (customer) {
      handleGetAllServicesForCustomer();
    }
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
            {admin && "Request services management"}
            {customer && "request service page"}
            {staff && "assigned Request services management"}
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {admin && welcomeMessage[0]}
            {customer && welcomeMessage[2]}
            {staff && welcomeMessage[1]}
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <SmallLoader />
        ) : requests.length === 0 ? (
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
              {admin && noServiceYet[0]}
              {customer && noServiceYet[2]}
              {staff && noServiceYet[1]}
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
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
