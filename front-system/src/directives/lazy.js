import eventBus from "@/eventBus";
import { debounce } from "../utils";
import defaultGif from "@/assets/default.gif";

let Images = []; // 存入合适的图片，也就是需要显示的图片

function setImage(img) {
  // 处理图片, 已处理表示已经加载出真实图片了
  img.dom.src = defaultGif;
  const clientHeight = document.documentElement.clientHeight; // 视口高度
  const rect = img.dom.getBoundingClientRect();
  const minHeight = rect.height || 150;
  // 在视口范围内
  if (rect.top >= -minHeight || rect.top <= clientHeight) {
    const tempImg = new Image();
    // 注册事件
    tempImg.onload = function () {
      // 当真实图片加载完成之后
      img.dom.src = img.src; // 真实图片路径
    };
    tempImg.src = img.src;
    Images = Images.filter((i) => i !== img);
  }
}

// 我希望调用该函数就能设置那些合适的图片
function setImages() {
  for (let item of Images) {
    setImage(item);
  }
}

function handleScroll() {
  setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default {
  // 绑定指令的元素渲染后触发
  inserted(el, binding) {
    const img = {
      dom: el,
      src: binding.value, // 绑定指令时给的值
    };
    Images.push(img);
    // 立即处理一次
    setImage(img);
  },
  // 指令解绑时触发
  unbind(el) {
    Images = Images.filter((img) => img.dom !== el);
  },
};
