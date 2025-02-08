import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { toast } from "sonner";
import { API_RESPONSE } from "../../types/types.utils";
import { commentResponse } from "../../types/coment";

export function usePostComment() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["comment"],
    mutationFn: async (content: string) => {
      const req = await api.post("/comment", {
        content,
      });
      return req.data;
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["comment"] });
      toast.error("something went wrong");
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["comment"] });
      toast.success("create post successfully");
    },
  });
}
export function useUpdateComment(id: number) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["comment", id],
    mutationFn: async (content: string) => {
      const req = await api.put(`/comment/${id}`, {
        content,
      });
      return req.data;
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["comment", id] });
      toast.error("something went wrong");
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["comment", id] });
      toast.success("create post successfully");
    },
  });
}
export function useDeleteComment(id: number) {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["comment", id],
    mutationFn: async () => {
      const req = await api.delete(`/comment/${id}`);
      return req.data;
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["comment", id] });
      toast.error("something went wrong");
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["comment", id] });
      toast.success("create post successfully");
    },
  });
}

export function useGetComment() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comment", "user"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<commentResponse[]>>(
        "/comment/user"
      );
      return req.data;
    },
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  return {
    data: data?.data,
    error,
    isLoading,
  };
}

export function useGetCommentAll() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comment"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<commentResponse[]>>("/comment");
      return req.data;
    },
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  return {
    data: data?.data,
    error,
    isLoading,
  };
}
