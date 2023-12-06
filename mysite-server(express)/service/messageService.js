const { validate, async } = require("validate.js");
const { ValidationError, UnknownError } = require("../utils/errors");
const fs = require("fs");
const { addMessageDao, findMessageByPageDao, deleteMessageDao } = require("../dao/messageDao");
const { findBlogByIdDao } = require("../dao/blogDao");
const { formatResponse, handleDataPattern } = require("../utils/tool");
const dir = "./public/static/avatar";

/**
 *
 * @param {*} dir 文件地址
 * @description 读取一个目录下有多少个文件
 * @returns 返回一个数组, 由dir下的所有文件组成
 */
async function redDirLength(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, file) => {
      if (err) {
        throw new UnknownError();
      } else {
        resolve(file);
      }
    });
  });
}

// 新增评论或者留言
module.exports.addMessageService = async function (newMessage) {
  console.log(newMessage,"newMessage");
  // 定义数据验证规则
  const messageRule = {
    nickname: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    content: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    blogId: {
      type: "string",
    },
  };
  // 进行数据验证
  const validateResult = validate.validate(newMessage, messageRule);
  if (!validateResult) {
    // 说明验证通过
    newMessage.blogId = newMessage.blogId ? newMessage.blogId : null;
    newMessage.createDate = Date.now();
    // 有一头像的地址,该头像是随机生成的
    // 读取public/static/avatar目录下存的头像
    const files = await redDirLength(dir);
    const randomIndex = Math.floor(Math.random() * files.length);
    newMessage.avatar = "/static/avatar" + files[randomIndex];
    // 接下来才开始新增
    const data = await addMessageDao(newMessage);
    // 如果新增的是文章的评论,那么对应文章的评论数量也要自增
    if (newMessage.blogId) {
      const blogData = await findBlogByIdDao(newMessage.blogId);
      blogData.commentNumber++;
      await blogData.save();
    }
    return formatResponse(0, "", data);
  } else {
    throw new ValidationError("数据验证失败");
  }
};

module.exports.findMessageByPageService = async function (pageInfo) {
  const data = await findMessageByPageDao(pageInfo);
  const rows = handleDataPattern(data.rows);
  return formatResponse(0, "", {
    total: data.count,
    rows,
  });
};

// 删除留言或者评论
module.exports.deleteMessageService = async function(id){
    await deleteMessageDao(id);
    return formatResponse(0,"",true)
}
