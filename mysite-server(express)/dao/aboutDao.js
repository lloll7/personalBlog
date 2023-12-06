const aboutModel = require("./model/aboutModel");

// 获取关于页面url
module.exports.findAboutDao = async function () {
  return await aboutModel.findOne();
};

// 修改关于页面url
module.exports.updateAboutDao = async function (newUrl) {
  const data = await aboutModel.findOne();
  data.url = newUrl;
  await data.save();
  return data.dataValues;
};
