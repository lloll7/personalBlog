const blogTypeModel = require("./model/blogTypeModel");

// 添加博客分类
module.exports.addBlogTypeDao = async function (newBlogTypeInfo) {
  const { dataValues } = await blogTypeModel.create(newBlogTypeInfo);
  return dataValues;
};
// 获取所有博客分类
module.exports.findAllBlogTypeDao = async function (newBlogTypeInfo) {
  return await blogTypeModel.findAll();
};
// 获取一个博客分类
module.exports.findOneBlogTypeDao = async function (id) {
  // findByPk 根据主键
  const data = await blogTypeModel.findByPk(id);
  // console.log(data, "dataType");
  return data;
};
// 修改一个博客分类
module.exports.updateBlogTypeDao = async function (id, newBlogTypeInfo) {
  await blogTypeModel.update(newBlogTypeInfo, {
    where: {
      id,
    },
  });
  const { dataValues } = await blogTypeModel.findByPk(id);
  return dataValues;
};
// 删除一个博客分类
module.exports.deleteBlogTypeDao = async function (id) {
  await blogTypeModel.destroy({
    where: {
      id,
    },
  });
};

// 根据id新增对应博客分类的文章数量
module.exports.addBlogToType = async function (id) {
  const data = await blogTypeModel.findByPk(id);
  data.articleCount++;
  await data.save();
  return;
};
