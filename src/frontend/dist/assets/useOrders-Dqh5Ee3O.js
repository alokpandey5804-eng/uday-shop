import { g as useQueryClient } from "./index-kKW6gZ0D.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-D0JSsV3h.js";
import { u as useMutation } from "./useMutation-CGiqmeEM.js";
function useOrder(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["order", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getOrder(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useGetOrdersByPhone(phone) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders-by-phone", phone],
    queryFn: async () => {
      if (!actor || !phone) return [];
      return actor.getOrdersByPhone(phone);
    },
    enabled: !!actor && !isFetching && !!phone
  });
}
function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createOrder(
        input.items,
        input.customerName,
        input.customerPhone,
        input.deliveryAddress,
        input.deliveryCity,
        input.deliveryPincode,
        input.paymentMethod
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
export {
  useOrder as a,
  useGetOrdersByPhone as b,
  useCreateOrder as u
};
