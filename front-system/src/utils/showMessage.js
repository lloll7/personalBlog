import getComponentRootDom from "./getComponentRootDom.js";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 * @description:
 * @param {String} content 提示消息
 * @param {String} type 弹窗的类型， 类型有：info、error、success、warn
 * @param {Number} duration 弹窗多久后消失
 * @param {HTMLElement} container 容器，消息会显示在该容器的正中间
 * @return {*}
 */
export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  // 创建容器
  const div = document.createElement("div");

  const iconDom = getComponentRootDom(Icon, {
    type,
  });
  div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
  // 设置样式
  div.className = `${styles.message} ${styles[`message-${type}`]}`;

  // 传递了container
  if (options.container) {
    // getComputedStyle获取元素的最终样式，element.style只获取元素的内联样式
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }
  container.appendChild(div);
  // 让浏览器强行渲染一遍
  div.clientHeight; // 导致reflow

  // 过渡归位，不强行渲染一遍浏览器，则该元素会直接以这个状态渲染，因为没有初始状态做过渡动画
  div.style.transform = `translate(-50%, -50%) translateY(0px)`;
  div.style.opacity = 1;

  // 等一段事件消失
  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    div.addEventListener(
      "transitionend",
      function () {
        div.remove();
        // 运行回调函数
        options.callback && options.callback();
      },
      { once: true } // once属性,让该事件只触发一次
    );
  }, duration);
}
