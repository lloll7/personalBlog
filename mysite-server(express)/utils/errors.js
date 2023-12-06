// 自定义错误,更灵活
// 当错误发生，捕获到发生的错误，然后抛出自定义的错误，方便管理
const { formatResponse } = require("./tool");
/**
 * 业务处理错误基类
 */
class ServiceError extends Error {
  /**
   *
   * @param {*} message 错误消息
   * @param {*} code 错误的消息码
   */
  constructor(message, code) {
    super(message); // 传递给父类Error
    this.code = code;
  }

  //  方法
  toResponseJSON() {
    // 生成json格式的客户端响应对象
    return formatResponse(this.code, this.message, null);
  }
}

/**
 * 错误子类,继承于基类ServiceError
 */
// 文件上传错误
exports.UploadError = class extends ServiceError {
  constructor(message) {
    super(message, 413); // 传递给ServiceError类，再经由ServiceError类传递给Error类最终生成错误信息
  }
};

// 禁止访问错误
exports.ForbiddenError = class extends ServiceError {
  constructor(message) {
    super(message, 401);
  }
};

// 验证错误
exports.ValidationError = class extends ServiceError {
  constructor(message) {
    super(message, 406);
  }
};

// 无资源错误
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super("not found", 404); //  因为该错误不会有多种情况，所以直接统一报错 ”not found“
  }
};

// 未知错误（其他的错误统一报未知错误）
exports.UnknownError = class extends ServiceError {
  constructor() {
    super("server internal error", 404); // 同上
  }
};

module.exports.ServiceError = ServiceError;

// throw new ServiceError("err", 123);
