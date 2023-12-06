import { loginApi, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    // token: getToken(),
    // name: "",
    // avatar: "",
    user: null, // 存储登录后的用户的信息
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token;
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name;
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar;
  // },
  SET_USER: (state, patload) => {
    state.user = patload;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    // userInfo 是用户提交的数据，接下来，我们就应该把这个数据发送到服务器
    return new Promise((resolve, reject) => {
      loginApi(userInfo)
        .then((res) => {
          const { data } = res;
          if (data) {
            // 说明data中有数据
            commit("SET_USER", data); // 将data数据存入vuex仓库
            resolve();
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });

    const { username, password } = userInfo;
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password })
    //     .then((response) => {
    //       const { data } = response;
    //       commit("SET_TOKEN", data.token);
    //       setToken(data.token);
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送请求
      getInfo().then((res) => {
        if (typeof res === "string") {
          // 未登录或登录信息已过期
          res = JSON.parse(res);
          // 该错误的状态码就是401, 判断是否是这个错误
          if (res.code === 401) {
            reject(res.msg);
          }
        } else {
          // 说明这个token 是 ok 的.将用户信息放入vuex仓库
          commit("SET_USER", res.data);
          resolve();
        }

        // if (typeof res === "string") {
        //   // 说明未登录 或 token已过期
        //   reject();
        // } else {
        //   // 说明token是有效的,将用户信息放入仓库
        //   commit("SET_USER", res);
        //   resolve(res);
        // }
      });

      //   getInfo(state.token)
      //     .then((response) => {
      //       const { data } = response;
      //       if (!data) {
      //         return reject("Verification failed, please Login again.");
      //       }
      //       const { name, avatar } = data;
      //       commit("SET_NAME", name);
      //       commit("SET_AVATAR", avatar);
      //       resolve(data);
      //     })
      //     .catch((error) => {
      //       reject(error);
      //     });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      resetRouter();
      commit("RESET_STATE");
      resolve();
      // logout(state.token)
      //   .then(() => {
      //     removeToken(); // must remove  token  first
      //     resetRouter();
      //     commit("RESET_STATE");
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
