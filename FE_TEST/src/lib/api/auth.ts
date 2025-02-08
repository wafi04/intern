import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { LoginDto, RegisterDto } from "../../types/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useRegisterMutation() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterDto) => {
      const req = await api.post("/users/register", data);
      return req.data;
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["user"] });
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Register success");
    },
  });
}

export function useLoginMutation() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginDto) => {
      const req = await api.post("/users/login", data);
      return req.data;
    },
    onError: () => {
      queryclient.cancelQueries({ queryKey: ["user"] });
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Register success");
      navigate("/");
    },
  });
}
