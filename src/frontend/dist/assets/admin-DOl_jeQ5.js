import { f as React2 } from "./index-kKW6gZ0D.js";
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React2.useSyncExternalStore(
    api.subscribe,
    React2.useCallback(() => selector(api.getState()), [api, selector]),
    React2.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React2.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
function loadToken() {
  try {
    return sessionStorage.getItem("uday_admin_token");
  } catch {
    return null;
  }
}
const initialToken = loadToken();
const useAdminStore = create((set) => ({
  token: initialToken,
  isAuthenticated: !!initialToken,
  login: (token) => {
    sessionStorage.setItem("uday_admin_token", token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    sessionStorage.removeItem("uday_admin_token");
    set({ token: null, isAuthenticated: false });
  }
}));
export {
  create as c,
  useAdminStore as u
};
