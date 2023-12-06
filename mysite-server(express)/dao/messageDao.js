const messageModel = require("./model/messageModel");
const blogModel = require("./model/blogModel");
const { Op } = require("sequelize");

// 新增留言或者评论
module.exports.addMessageDao = async function (newMessage) {
  const { dataValues } = await messageModel.create(newMessage);
  return dataValues;
};

// 分页获取留言与评论
module.exports.findMessageByPageDao = async function (pageInfo) {
  // 这里需要根据blogId来区分情况,如果有则是获取某篇文章的评论
  // 如果没有，则是获取留言
  if (pageInfo.blogId) {
    // 获取评论
    if (pageInfo.blogId === "all") {
      // 返回所有文章的评论
      return await messageModel.findAndCountAll({
        offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
        limit: pageInfo.limit * 1, // 转为数字
        where: {
          blogId: {
            [Op.ne]: null, // 意为：blogId != null
          },
        },
        include: [
          {
            model: blogModel,
            as: "blog",
          },
        ],
      });
    } else {
      // 返回对应文章的评论
      return await messageModel.findAndCountAll({
        offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
        limit: pageInfo.limit * 1, // 转为数字
        where: {
          blogId: pageInfo.blogId * 1,
        },
        order: [
          ["createDate", "DESC"], // 将获取到的留言排序，按照 createDate 降序来排
        ],
      });
    }
  } else {
    // 获取留言
    return await messageModel.findAndCountAll({
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1, // 转为数字
      where: {
        blogId: null,
      },
      order: [
        ["createDate", "DESC"], // 将获取到的留言排序，按照 createDate 降序来排
      ],
    });
  }
};

// 删除留言或者评论
module.exports.deleteMessageDao = async function (id) {
  return await messageModel.destroy({
    where: {
      id,
    },
  });
};

// 删除对应文章的所有评论
module.exports.deleteMessageByBlogIdDao = async function (blogId) {
  return await messageModel.destroy({
    where: {
      blogId,
    },
  });
};
