import { getBanner } from "@/api/banner";
import { server_URL } from "@/urlConfig.js";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchBanner(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      ctx.commit("setLoading", true);
      const resp = await getBanner();
      // for (let i of resp) {
      //   i.midImg = server_URL + i.midImg;
      //   i.bigImg = server_URL + i.bigImg;
      // }
      console.log(resp, "resp");
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
    },
  },
};
