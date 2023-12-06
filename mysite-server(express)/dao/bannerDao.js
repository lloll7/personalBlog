const bannerModel = require("./model/bannerModel");
// 获取首页标语
module.exports.findBannerDao = async function () {
  return await bannerModel.findAll();
};
// 设置首页标语
module.exports.updateBannerDao = async function (newBannerInfo) {
  //   将表的数据全部删除
  await bannerModel.destroy({
    truncate: true,
  });
  await bannerModel.bulkCreate(newBannerInfo); // 批量写入数据
  return await bannerModel.findAll();
};
