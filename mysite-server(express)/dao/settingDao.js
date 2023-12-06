const { handleDataPattern } = require("../utils/tool");
const settingModel = require("./model/settingModel");

// 获取全局配置
module.exports.findSettingDao = async function () {
  return await settingModel.findOne();
};

// 修改全局设置
module.exports.updateSettingDao = async function (newSettingInfo) {
  await settingModel.update(newSettingInfo, {
    where: {
      id: 1,
    },
  });
  return await settingModel.findOne();
};
