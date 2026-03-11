import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Announcement, Material, SamplePaper } from "../backend.d";
import { useActor } from "./useActor";

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor)
        return { totalAnnouncements: 0n, totalMaterials: 0n, totalPapers: 0n };
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllMaterials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMaterials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllSamplePapers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["papers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSamplePapers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGenerateId() {
  const { actor } = useActor();
  return async (): Promise<bigint> => {
    if (!actor) throw new Error("No actor");
    return actor.generateId();
  };
}

export function useAddMaterial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (material: Material) => {
      if (!actor) throw new Error("No actor");
      return actor.addMaterial(material);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

export function useUpdateMaterial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      material,
    }: { id: bigint; material: Material }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateMaterial(id, material);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

export function useDeleteMaterial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteMaterial(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

export function useAddSamplePaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (paper: SamplePaper) => {
      if (!actor) throw new Error("No actor");
      return actor.addSamplePaper(paper);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["papers"] }),
  });
}

export function useUpdateSamplePaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, paper }: { id: bigint; paper: SamplePaper }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateSamplePaper(id, paper);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["papers"] }),
  });
}

export function useDeleteSamplePaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteSamplePaper(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["papers"] }),
  });
}

export function useAddAnnouncement() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (announcement: Announcement) => {
      if (!actor) throw new Error("No actor");
      return actor.addAnnouncement(announcement);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useUpdateAnnouncement() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      announcement,
    }: { id: bigint; announcement: Announcement }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateAnnouncement(id, announcement);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteAnnouncement(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}
