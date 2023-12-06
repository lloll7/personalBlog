import imgUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";

function getLoadingImg(el) {
  return el.querySelector("img[data-role=loading]");
}

function createImg() {
  const img = document.createElement("img");
  img.src = imgUrl;
  img.dataset.role = "loading";
  img.className = styles.loading;
  return img;
}
// 该函数会在bind和update时调用（由vue处理）
export default function (el, binding) {
  const curImg = getLoadingImg(el);
  // 更据binding.value的值，决定添加或删除img元素
  if (binding.value) {
    if (!curImg) {
      const img = createImg();
      el.appendChild(img);
    }
  } else {
    if (curImg) {
      curImg.remove();
    }
  }
}
