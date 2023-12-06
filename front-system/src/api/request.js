import axios from "axios";
import { showMessage } from "../utils";

const ins = axios.create(); // 创建一个axios实例
ins.interceptors.response.use(function (resp) {
  if (resp.data.code !== 0) {
    console.log("请求失败");
    showMessage({
      content: resp.data.msg,
      type: "error",
      duration: 1500,
    });
    return null;
  }
  return resp.data.data;
});

export default ins;

// ins.interceptors.response.use(function (resp) {
//   if (resp.data.code === 0) {
//     return resp.data.data;
//   }
//   showMessage({
//     content: resp.data.msg,
//     type: "error",
//     duration: 1500,
//   });
//   return null;
// });
