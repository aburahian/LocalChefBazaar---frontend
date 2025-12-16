import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useStatus = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: status, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/status`);
     

      return result.data.status;
    },
  });

  //   return { role, isRoleLoading }
  return [status, isRoleLoading];
};

export default useStatus;
