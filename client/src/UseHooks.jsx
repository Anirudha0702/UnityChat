import { useQuery } from "@tanstack/react-query";
import _getDoc from "./db/Firebase/getDoc";

export const GetUser = (userId) => {
  return useQuery({
    queryKey: ["Users", userId],
    queryFn: () => _getDoc("Users", userId),
    enabled: !!userId,
  });
};


