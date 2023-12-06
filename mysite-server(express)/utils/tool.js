const jwt = require("jsonwebtoken");
var md5 = require("md5");
const multer = require("multer");
const path = require("path");
var toc = require("markdown-toc"); // 专门用于处理markdown文档的toc目录的第三方库

// 格式化响应数据
module.exports.formatResponse = function (code, msg, data) {
  return {
    code: code,
    msg: msg,
    data: data,
  };
};

// 解析token
module.exports.analysisToken = function (token) {
  return jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET)); // 只拿token部分，不拿beaer
};

// 处理数组类型的响应数据
module.exports.handleDataPattern = function (data) {
  let arr = [];
  for (let item of data) {
    arr.push(item.dataValues);
  }
  return arr;
};

// 设置上传文件的引擎
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public/static/uploads");
  },
  // 上传到服务器的文件的文件要做单独处理
  filename: function (req, file, cb) {
    // 获取文件名
    const basename = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    // 获取后缀名
    const extname = path.extname(file.originalname);
    // 构建新的名字
    const newName =
      basename +
      new Date().getTime() +
      Math.floor(Math.random() * 9000 + 1000) +
      extname;
    cb(null, newName);
  },
});
// 设置文件上传的限制
module.exports.uploading = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // 文件大小不超过2MB
    files: 1,
  },
});

// 处理TOC
module.exports.handleTOC = function (info) {
  let result = toc(info.markdownContent).json;

  // 经过上方处理，就将markdown中的标题全都提取出来了，形成一个对象数组
  // 数组中的每个对象记录了标题的名称以及等级。如下：
  // [
  //   { content: "练习题答案篇", slug: "练习题答案篇", lvl: 1, i: 0, seen: 0 },
  //   {
  //     content: "js高级--预编译混合练习题", slug: "js高级--预编译混合练习题", lvl: 2, i: 1, seen: 0,
  //   },
  //   { content: "练习1", slug: "练习1", lvl: 3, i: 2, seen: 0 },
  //   { content: "练习2", slug: "练习2", lvl: 3, i: 3, seen: 0 },
  // ];

  // 但是这不是我们想要的格式，我们想要转换为
  // [
  //     { "name": "章节1", "anchor": "title-1" },
  //     { "name": "章节2", "anchor": "title-2",
  //         "children": [
  //             { "name": "章节2-1", "anchor": "title-2-1" },
  //             { "name": "章节2-2", "anchor": "title-2-2" },
  //         ]
  //     }
  // ]

  // 接下来对上面的数据进行转换
  /**
   *
   * @param {array} flatArr
   * @description 传入一个扁平的数组，返回一个多维数组
   */
  function transfer(flatArr) {
    const stack = []; // 模拟栈结构
    const result = []; // 结果数组
    /**
     *
     * @param {*} item
     * @returns {Object}
     * @description 创建toc对象
     */
    function createTOCItem(item) {
      return {
        name: item.content,
        anchor: item.slug,
        level: item.lvl,
        children: [],
      };
    }

    function handleItem(item) {
      // 得到最后一个元素，也就是栈顶
      // 如果stack为空，则得到undefined
      const top = stack[stack.length - 1];
      if (!top) {
        stack.push(item);
      } else if (item.level > top.level) {
        // 进入此分支，说明当前的toc对象的等级比栈顶（上一个）元素的等级要大
        // 说明当前这个toc应该成为上一个toc对象的子元素
        top.children.push(item);
        stack.push(item);
      } else {
        stack.pop();
        handleItem(item); // 递归调用, 保证每个元素的子元素都可以被分配清楚, 栈底一定保证是大于等于原栈底的
      }
    }

    let min = 6; // 标题最小的级别
    // 寻找当前数组中最小的标题等级
    for (let i of flatArr) {
      if (i.lvl < min) {
        min = i.lvl;
      }
    }
    for (let item of flatArr) {
      const tocItem = createTOCItem(item);
      if (tocItem.level === min) {
        // 如果进入此if，说明当前的toc对象以及是最低的等级（等级最大），不会作为其他对象的children
        result.push(tocItem);
      }
      // 如果没有进入上面的if，说明当前的toc对象有可能作为其他对象的children
      handleItem(tocItem);
    }
    return result;
  }
  // 经过转换后, toc转为了需要的格式
  info.toc = transfer(result);

  delete info.markdownContent;

  // 接下来再给各个级别的标题添加上id
  for (let i of result) {
    switch (i.lvl) {
      case 1: {
        let newStr = `<h1 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace("<h1>", newStr);
      }
      case 2: {
        let newStr = `<h2 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace("<h2>", newStr);
      }
      case 3: {
        let newStr = `<h3 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace("<h3>", newStr);
      }
      case 4: {
        let newStr = `<h4 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace("<h4>", newStr);
      }
      case 5: {
        let newStr = `<h5 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace("<h5>", newStr);
      }
      case 6: {
        let newStr = `<h6 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace("<h6>", newStr);
      }
    }
  }
  // 最终处理后的博客内容
  return info;
};
