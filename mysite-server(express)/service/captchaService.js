const svgCaptcha = require("svg-captcha"); // 生成验证码的库

module.exports.getCaptchaService = async function () {
  return svgCaptcha.create({
    size: 4, // 生成验证码的大小
    ignoreChars: "iIl10Ooq9", // 验证码内容要排除哪些不好辨别的字符
    noise: 6, // 遮挡线的数量
    color: true,
  });
};
