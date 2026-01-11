import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["role-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (request) => {
      const res = await axiosSecure.patch(
        `/role-requests/accept/${request._id}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request approved!");
      refetch();
    },
    onError: () => toast.error("Something went wrong"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (request) => {
      const res = await axiosSecure.patch(
        `/role-requests/reject/${request._id}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.error("Request rejected");
      refetch();
    },
    onError: () => toast.error("Something went wrong"),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Manage Request
      </h1>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                      Type
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                      Request Time
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((req) => {
                    const disabled = req.requestStatus !== "pending";

                    return (
                      <tr key={req._id}>
                        <td className="px-5 py-5 border-b bg-white text-sm">
                          {req.userName}
                        </td>
                        <td className="px-5 py-5 border-b bg-white text-sm">
                          {req.userEmail}
                        </td>
                        <td className="px-5 py-5 border-b bg-white text-sm capitalize">
                          {req.requestType}
                        </td>
                        <td className="px-5 py-5 border-b bg-white text-sm capitalize font-semibold">
                          {req.requestStatus}
                        </td>
                        <td className="px-5 py-5 border-b bg-white text-sm">
                          {new Date(req.requestTime).toLocaleString()}
                        </td>

                        <td className="px-5 py-5 border-b bg-white text-sm flex gap-2">
                          <button
                            disabled={disabled}
                            onClick={() => acceptMutation.mutate(req)}
                            className={`px-3 py-1 rounded text-white ${
                              disabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600"
                            }`}
                          >
                            Accept
                          </button>

                          <button
                            disabled={disabled}
                            onClick={() => rejectMutation.mutate(req)}
                            className={`px-3 py-1 rounded text-white ${
                              disabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-600"
                            }`}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;
