const { validate } = require("validate.js");
const { ValidationError } = require("../utils/errors");
const {
  addBlogDao,
  findBlogByIdDao,
  updateBlogDao,
  deleteBlogDao,
  findBlogByPageDao,
} = require("../dao/blogDao");
const {
  formatResponse,
  handleDataPattern,
  handleTOC,
} = require("../utils/tool");
const blogTypeModel = require("../dao/model/blogTypeModel");
const { addBlogToType, findOneBlogTypeDao } = require("../dao/blogTypeDao");
const { deleteMessageByBlogIdDao } = require("../dao/messageDao");

// 扩展验证规则
validate.validators.categoryIdIsExist = async function (value) {
  const blogTypeInfo = blogTypeModel.findByPk(value);
  if (blogTypeInfo) {
    return;
  } else {
    return "CategoryId Is Not Exist";
  }
};

// 新增博客
module.exports.addBlogService = async function (newBlogInfo) {
  // 首先第一个要处理的就是 TOC
  // 经过handleTOC处理后，newBlogInfo中的toc目录就是我们想要的格式
  newBlogInfo = handleTOC(newBlogInfo);
  // // 接下来，我们将处理好的TOC格式转为字符串
  newBlogInfo.toc = JSON.stringify(newBlogInfo.toc);

  // console.log(newBlogInfo, "newBlogInfo>>>>");

  // 初始化新文章的其他信息
  newBlogInfo.scanNumber = 0; // 阅读量初始化为 0
  newBlogInfo.commentNumber = 0; // 评论数初始化为 0

  // 定义验证规则
  const blogRule = {
    title: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    description: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    toc: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    htmlContent: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    thumb: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    scanNumber: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    commentNumber: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    createDate: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    categoryId: {
      presence: true,
      type: "integer",
      categoryIdIsExist: true,
    },
  };

  // 接下来对传递过来的数据进行一个验证
  try {
    // 因为扩展的验证规则里面涉及到异步的操作，所以这里要采用异步的验证方式
    await validate.async(newBlogInfo, blogRule);
    const data = await addBlogDao(newBlogInfo); // 进行一个新增
    // 接下来还有一个工作，文章新增了，对应的文章分类也应该新增
    await addBlogToType(newBlogInfo.categoryId);
    return formatResponse(0, "", data);
  } catch (e) {
    // 验证未通过
    throw new ValidationError("数据验证失败");
  }
};
// 分页查询博客分类
module.exports.findBlogByPageService = async function (PageInfo) {
  const data = await findBlogByPageDao(PageInfo);
  console.log(data, "data>>>>!11s");
  // 去除分页查询的结果，是一个对象数组，key为rows
  const rows = handleDataPattern(data.rows);
  // 对每一篇博客的TOC进行还原操作
  rows.forEach((it) => {
    it.toc = JSON.parse(it.toc);
  });
  console.log(rows, "rows>>>>111");
  return formatResponse(0, "", {
    total: data.count,
    rows,
  });
};
// 根据id查询某一个博客
module.exports.findBlogByIdService = async function (id, auth) {
  const data = await findBlogByIdDao(id);
  // 重新处理TOC, 还原成数组
  data.dataValues.toc = JSON.parse(data.dataValues.toc);
  // 根据auth是否有值，来决定浏览数是否要增加
  if (!auth) {
    data.scanNumber++;
    await data.save();
  }
  return formatResponse(0, "", data.dataValues);
};
// 修改一个博客
module.exports.updateBlogService = async function (id, newBlogInfo) {
  // 首先判断正文内容有没有改变，因为正文内容的改变会影响toc。如果有则要进行处理
  if (newBlogInfo.htmlContent) {
    // 说明正文内容有改变
    // 经过handleTOC处理后，newBlogInfo中的toc目录就是我们想要的格式
    newBlogInfo = handleTOC(newBlogInfo);
    // 接下来，我们将处理好的TOC格式转为字符串
    newBlogInfo.toc = JSON.stringify(newBlogInfo.toc);
  }

  // 在实际删除博客文章之前, 先判断博客的博客分类id 是否有修改,如果有,那么新的博客分类下的博客数量要自增
  const { dataValues: oldBlogInfo } = await findBlogByIdDao(id);
  if (oldBlogInfo.categoryId !== newBlogInfo.categoryId) {
    // 进入此if说明博客的分类也进行了修改
    // 旧分类的文章数量自减
    const oldBlogTypeInfo = await findOneBlogTypeDao(oldBlogInfo.categoryId);
    oldBlogTypeInfo.articleCount--;
    await oldBlogTypeInfo.save();
    // 新分类的文章数量自增
    const newBlogInfo = await findOneBlogTypeDao(newBlogInfo.categoryId);
    newBlogInfo.articleCount++;
    await newBlogInfo.save();
  }

  const { dataValues } = await updateBlogDao(id, newBlogInfo);
  return formatResponse(0, "", dataValues);
};
// 删除一个博客
module.exports.deleteBlogService = async function (id) {
  // 根据id查询到该篇文章的信息
  const data = await findBlogByIdDao(id);
  // 接下来需要根据该文章对应的分类，该分类下的文章数量自减
  const categoryInfo = await findOneBlogTypeDao(data.dataValues.categoryId);
  categoryInfo.articleCount--;
  await categoryInfo.save();
  // 之后还需将该文章下所对应的评论也一并删除
  await deleteMessageByBlogIdDao(id);
  // 删除文章
  await deleteBlogDao(id);
  return formatResponse(0, "", true);
};
