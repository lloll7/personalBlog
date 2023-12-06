export default function (timestamp, showTime = false) {
  const date = new Date(+timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // padStart(2, "0") 如果未满两位则在开头添加”0“，即补零
  const day = date.getDate().toString().padStart(2, "0");
  let result = `${date.getFullYear()}-${month}-${day}`;
  if (showTime) {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    result += `  ${hour}:${minute}:${second}`;
  }
  return result;
}
