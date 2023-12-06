const blogModel = require("./model/blogModel");
const blogTypeModel = require("./model/blogTypeModel");

// 添加博客分类
module.exports.addBlogDao = async function (newBlogInfo) {
  const { dataValues } = await blogModel.create(newBlogInfo);
  return dataValues;
};
// 获取所有博客分类
module.exports.findBlogByPageDao = async function (pageInfo) {
  console.log(pageInfo);
  if (pageInfo.categoryid && pageInfo.categoryid !== "-1") {
    console.log("a");
    // 根据分类信息来进行分页查询
    return await blogModel.findAndCountAll({
      // include关联查询
      include: [
        {
          model: blogTypeModel,
          as: "category",
          where: {
            id: pageInfo.categoryid,
          },
        },
      ],
      // 跳过多少,也就是进行分页
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1,
    });
  } else {
    console.log("b");
    // 直接根据所有博客进行分页查询
    // findAndCountAll 分页查询, 接收一个对象
    return await blogModel.findAndCountAll({
      // include关联查询
      include: [
        {
          model: blogTypeModel,
          as: "category",
        },
      ],
      // 跳过多少,也就是进行分页
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1,
    });
  }
};
// 根据id查询某一个博客
module.exports.findBlogByIdDao = async function (id) {
  return await blogModel.findByPk(id, {
    include: [
      {
        model: blogTypeModel,
        as: "category",
      },
    ],
  });
};
// 修改一个博客分类
module.exports.updateBlogDao = async function (id, newBlogInfo) {
  await blogModel.update(newBlogInfo, {
    where: {
      id,
    },
  });
  return await blogModel.findByPk(id);
};
// 删除一个博客分类
module.exports.deleteBlogDao = async function (id) {
  return await blogModel.destroy({
    where: {
      id,
    },
  });
};

/**
 *
 * @param {*} id 分类id
 * @description 根据分类id查询该分类下的所有文章
 */
module.exports.blogCountByBlogType = async function (categoryId) {
  return await blogModel.count({
    where: {
      categoryId,
    },
  });
};
