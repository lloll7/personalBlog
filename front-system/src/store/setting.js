import getSetting from "@/api/setting";
import { titleController } from "../utils";
import { server_URL } from "@/urlConfig.js";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
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
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const resp = await getSetting();
      if (resp.favicon) {
        // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
        let link = document.querySelector("link[ref='shortcut icon']");
        if (link) {
          return;
        }
        link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "images/x-icon";
        link.href = resp.favicon;
        document.querySelector("head").appendChild(link);
      }
      // resp.avatar = server_URL + resp.avatar;
      // resp.qqQrCode = server_URL + resp.qqQrCode;
      // resp.weixinQrCode = server_URL + resp.weixinQrCode;
      console.log(resp);
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    },
  },
};
