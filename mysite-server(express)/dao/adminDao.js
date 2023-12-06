/**
 * 数据访问层
 */
// 这一层负责和数据库打交道,例如数据库的增删改查

const adminModel = require("./model/adminModel");

module.exports.loginDao = async function (loginInfo) {
  // 拿到业务逻辑层处理过的数据后,开始连接数据库进行查询
  return await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
};

// 更新管理员
module.exports.updateAdminDao = async function (newAccountInfo) {
  // adminModel.update( 新对象 , 你要修改哪条数据 )
  return await adminModel.update(newAccountInfo, {
    where: {
      loginId: newAccountInfo.loginId,
    },
  });
};
