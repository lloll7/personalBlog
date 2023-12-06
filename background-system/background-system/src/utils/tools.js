// 工具函数库

export function formatDate(timestamp) {
  let date = new Date(parseInt(timestamp));

  let year = date.getFullYear().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");

  let weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let week = weekArr[date.getDay()]; // getDay可以获取到具体是星期几

  return `${year}-${month}-${day} ${hour}:${minute}:${seconds} ${week}`;
}
