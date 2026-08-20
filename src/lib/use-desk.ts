import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadDesk } from "@/lib/server/command";

export function useDesk() {
  return useQuery({
    queryKey: ["desk"],
    queryFn: () => loadDesk(),
  });
}

export function useInvalidateDesk() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["desk"] });
}
