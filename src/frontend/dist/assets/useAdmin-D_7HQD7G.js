import { g as useQueryClient } from "./index-kKW6gZ0D.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-D0JSsV3h.js";
import { u as useMutation } from "./useMutation-CGiqmeEM.js";
function useAdminLoginWithActor() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ username, password }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.adminLogin(username, password);
    }
  });
}
function useListOrders(token) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin-orders", token],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.listOrders(token);
    },
    enabled: !!actor && !isFetching && !!token
  });
}
function useAddProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      token,
      name,
      description,
      price,
      category,
      images,
      stock
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProduct(
        token,
        name,
        description,
        price,
        category,
        images,
        stock
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
function useEditProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      token,
      id,
      name,
      description,
      price,
      category,
      images,
      stock
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
        stock
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, id }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, id, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateOrderStatus(token, id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    }
  });
}
export {
  useAddProduct as a,
  useEditProduct as b,
  useDeleteProduct as c,
  useListOrders as d,
  useUpdateOrderStatus as e,
  useAdminLoginWithActor as u
};
