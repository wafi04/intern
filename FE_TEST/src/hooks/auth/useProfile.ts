import { useQuery } from "@tanstack/react-query";
import { API_RESPONSE } from "../../types/types.utils";
import { UserData } from "../../types/user";
import { api } from "../../lib/api/api";

export const useProfile = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get<API_RESPONSE<UserData>>(`/users/profile`);

      return response.data;
    },
    staleTime: 30 * 60 * 1000, // Cache disimpan selama 30 menit
    gcTime: 60 * 60 * 1000, // Cache disimpan selama 1 jam
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return {
    data: data?.data,
    isLoading,
    error,
    refetch,
  };
};
