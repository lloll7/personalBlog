const { validate } = require("validate.js");
const { findAllDemoDao, deleteDemoDao } = require("../dao/demoDao");
const { formatResponse, handleDataPattern } = require("../utils/tool");
const { ValidationError } = require("../utils/errors");
const { updateDemoDao, addDemoDao } = require("../dao/demoDao");

module.exports.findAllDemoService = async function () {
  const data = await findAllDemoDao();
  const obj = handleDataPattern(data);
  obj.forEach((item) => {
    item.description = JSON.parse(item.description);
  });
  return formatResponse(0, "", obj);
};

module.exports.addDemoService = async function (newDemoInfo) {
  // 将description转换为字符串
  newDemoInfo.description = JSON.stringify(newDemoInfo.description);

  // 定义验证规则
  const demoRule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    url: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    github: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    description: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    order: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    thumb: {
      type: "string",
    },
  };

  // 进行数据验证
  const validateResult = validate.validate(newDemoInfo, demoRule);

  if (!validateResult) {
    // 验证成功后
    const data = await addDemoDao(newDemoInfo);
    return formatResponse(0, "", [data]);
  } else {
    throw new ValidationError("数据验证失败");
  }
};

module.exports.updateDemoService = async function (id, newDemoInfo) {
  if (newDemoInfo.description) {
    newDemoInfo.description = JSON.stringify(newDemoInfo.description);
  }
  const { dataValues } = await updateDemoDao(id, newDemoInfo);
  dataValues.description = JSON.parse(dataValues.description);
  return formatResponse(0, "", dataValues);
};

module.exports.deleteDemoService = async function (id) {
  await deleteDemoDao(id);
  return formatResponse(0, "", true);
};
