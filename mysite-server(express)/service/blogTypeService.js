const { validate } = require("validate.js");
const { ValidationError } = require("../utils/errors");
const {
  addBlogTypeDao,
  findAllBlogTypeDao,
  findOneBlogTypeDao,
  updateBlogTypeDao,
  deleteBlogTypeDao,
} = require("../dao/blogTypeDao");
const { formatResponse, handleDataPattern } = require("../utils/tool");
const { blogCountByBlogType } = require("../dao/blogDao");
// 新增博客分类
module.exports.addBlogTypeService = async function (newBlogTypeInfo) {
  // 数据验证规则
  const blogTypeRule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    order: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
  };
  //  进行数据验证
  //  对 newBlogTypeInfo 以 blogTypeRule 的规则进行验证
  const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule);
  if (!validateResult) {
    // 说明验证通过，validateResult为undefined
    newBlogTypeInfo.articleCount = 0; // 初始化文章数量为0
    const data = await addBlogTypeDao(newBlogTypeInfo);
    return formatResponse(0, "", data);
  } else {
    // 验证失败
    throw new ValidationError("数据验证失败");
  }
};
// 查询所有博客分类
module.exports.findAllBlogTypeService = async function () {
  const data = await findAllBlogTypeDao();
  const obj = formatResponse(0, "", handleDataPattern(data));
  obj.data.sort((a, b) => a.order - b.order);
  return obj;
};
// 查询一个博客分类
module.exports.findOneBlogTypeService = async function (id) {
  const { dataValues } = await findOneBlogTypeDao(id);
  return formatResponse(0, "", dataValues);
};
// 修改一个博客分类
module.exports.updateBlogTypeService = async function (id, newBlogTypeInfo) {
  const data = await updateBlogTypeDao(id, newBlogTypeInfo);
  return formatResponse(0, "", data);
};
// 删除一个博客分类
module.exports.deleteBlogTypeService = async function (id) {
  const blogNum = await blogCountByBlogType(id);
  await deleteBlogTypeDao(id);
  // 这里需要返回受影响文章的数量，目前没有文章，暂时返回true

  return formatResponse(0, "", blogNum);
};
