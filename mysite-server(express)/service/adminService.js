/**
 * 业务逻辑层
 */

const md5 = require("md5");
const jwt = require("jsonwebtoken"); // 生成token，传入信息对象，密钥，有效时长(s)
const { ValidationError } = require("../utils/errors");

// 导入数据库操作板块
const { loginDao, updateAdminDao } = require("../dao/adminDao");
const { formatResponse } = require("../utils/tool");

// admin 模块的业务逻辑层
// 登录
module.exports.loginService = async function (loginInfo) {
  // 对post请求传入的管理员密码进行md5加密
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  // 进行数据的验证,也就是数据库中存不存在这个管理员
  let data = await loginDao(loginInfo); // 获取数据库查询的结果
  if (data && data.dataValues) {
    // 添加token
    data = {
      // 返回的数据信息在data.dataValues中
      id: data.dataValues.id,
      loginId: data.dataValues.loginId,
      name: data.dataValues.name,
    };
    let loginPeriod = null; // 记住登陆状态的时长
    if (loginInfo.remember) {
      // 如果存在remember,即用户选择了登陆状态保持七天，则loginPeriod为7
      loginPeriod = parseInt(loginInfo.remember);
    } else {
      // 否则，loginPeriod默认为1
      loginPeriod = 1;
    }
    // 生成token,想将哪些信息进行加密返回给客户端
    const token = jwt.sign(
      data,
      md5(process.env.JWT_SECRET), // 密钥
      { expiresIn: 60 * 60 * 24 * loginPeriod } // 保存的时长(s)， 60s * 60 * 24 * 保存的天数
    );
    return {
      token,
      data,
    };
  }
  return { data }; // 如果为空,返回的信息则为{ data:null }
};

// 更新/修改 管理员信息
module.exports.updateAdminService = async function (accountInfo) {
  // 1.根据传入的旧密码,查询数据库,看看旧密码是否正确或用户是否存在
  const adminInfo = await loginDao({
    loginId: accountInfo.loginId,
    loginPwd: md5(accountInfo.oldLoginPwd),
  });
  // 2.分两种情况,由用户信息和没有用户信息
  if (adminInfo && adminInfo.dataValues) {
    // 说明用户存在且旧密码输入正确
    // 而逻辑就是组装新的对象,然后更新即可
    const newPassWord = md5(accountInfo.loginPwd);
    // 到数据访问层去修改数据库内的信息
    await updateAdminDao({
      name: accountInfo.name,
      loginId: accountInfo.loginId,
      loginPwd: newPassWord,
    });
    // 组装响应对象并返回
    return formatResponse(0, "", {
      loginId: accountInfo.loginId,
      name: accountInfo.name,
      id: adminInfo.dataValues.id, // accountInfo中是没有id的, 但是根据accountInfo从数据库中查出来的adminInfo有id
    });
  } else {
    // 旧密码不正确,抛出自定义错误
    throw new ValidationError("旧密码不正确");
  }
};
