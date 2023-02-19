import { auth } from "../../api/auth";
import router from "../../router";

const state = {
  user: null,
};

const getters = {
  username: (state) => (state.user === null ? "Rabbit" : state.user.username),
  slug: (state) => (state.user === null ? "🐇" : state.user.username.charAt(0)),
};

const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  },
};

const actions = {
  login({ commit }, { username, password }) {
    if (state.user !== null) return Promise.resolve();
    return auth.login({ username, password }).then((res) => {
      commit("setUser", { user: res.data });
    });
  },
  register({ commit }, { username, password }) {
    return auth.register({ username, password }).then((res) => {
      commit("setUser", { user: res.data });
    });
  },
  logout({ commit }, payload = { path: "/login" }) {
    return auth.logout().then(() => {
      commit("setUser", { user: null });
      router.push(payload);
    });
  },
  checkLogin({ commit }, payload) {
    auth.getInfo().then((res) => {
      if (!res.isLogin) {
        router.push(payload);
      } else {
        commit("setUser", { user: res.data });
      }
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
