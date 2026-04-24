import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Order, OrderItemInput } from "../types";

export function useOrder(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order | null>({
    queryKey: ["order", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getOrder(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export interface CreateOrderInput {
  items: OrderItemInput[];
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryPincode: string;
  paymentMethod: string;
}

export function useGetOrdersByPhone(phone: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders-by-phone", phone],
    queryFn: async () => {
      if (!actor || !phone) return [];
      return actor.getOrdersByPhone(phone);
    },
    enabled: !!actor && !isFetching && !!phone,
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<bigint, Error, CreateOrderInput>({
    mutationFn: async (input: CreateOrderInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createOrder(
        input.items,
        input.customerName,
        input.customerPhone,
        input.deliveryAddress,
        input.deliveryCity,
        input.deliveryPincode,
        input.paymentMethod,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
