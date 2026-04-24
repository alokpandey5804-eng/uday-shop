import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Order } from "../types";

export function useAdminLoginWithActor() {
  const { actor } = useActor(createActor);
  return useMutation<
    string | null,
    Error,
    { username: string; password: string }
  >({
    mutationFn: async ({ username, password }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.adminLogin(username, password);
    },
  });
}

export function useListOrders(token: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["admin-orders", token],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.listOrders(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

export function useAddProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    bigint,
    Error,
    {
      token: string;
      name: string;
      description: string;
      price: number;
      category: string;
      images: string[];
      stock: bigint;
    }
  >({
    mutationFn: async ({
      token,
      name,
      description,
      price,
      category,
      images,
      stock,
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProduct(
        token,
        name,
        description,
        price,
        category,
        images,
        stock,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useEditProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    {
      token: string;
      id: bigint;
      name: string;
      description: string;
      price: number;
      category: string;
      images: string[];
      stock: bigint;
    }
  >({
    mutationFn: async ({
      token,
      id,
      name,
      description,
      price,
      category,
      images,
      stock,
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.editProduct(
        token,
        id,
        name,
        description,
        price,
        category,
        images,
        stock,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { token: string; id: bigint }>({
    mutationFn: async ({ token, id }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { token: string; id: bigint; status: string }
  >({
    mutationFn: async ({ token, id, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateOrderStatus(token, id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
}
