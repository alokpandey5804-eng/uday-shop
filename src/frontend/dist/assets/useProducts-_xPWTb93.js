import "./index-kKW6gZ0D.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-D0JSsV3h.js";
function useProducts(category = null, minPrice = null, maxPrice = null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", category, minPrice, maxPrice],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(category, minPrice, maxPrice);
    },
    enabled: !!actor && !isFetching
  });
}
function useProduct(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCategories();
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useCategories as a,
  useProduct as b,
  useProducts as u
};
