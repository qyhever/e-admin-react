/* eslint-disable */
export const RULE = {
  mobile: /^(0|86|17951)?(1[358][0-9]|14[579]|166|17[0135678])[0-9]{8}$/,
  zh: /^[\u4E00-\u9FA5]+$/,
  password: /^(\w|\?=\.\*\[!@#\$%\^&\(\)\]){6,18}$/,
  integer: /^[1-9][0-9]*$/,
  // 两位小数
  numberTwoDecimal: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
  // 图形验证码
  imageVerifyCode: /^(\w|\d){4}$/,
  // 手机验证码
  phoneVerifyCode: /^\d{6}$/,
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  emoji: /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/,
  // 样例： 匹配 中文、表情、全角字符
  example: /[\u4E00-\u9FA5]|[^\x00-\xff]|[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/
}
/**
 * 验证字符串
 * @param {String} value 源字符串
 * @param {String} type 验证类型
 * @return {Boolean} 验证结果
 */
export function validator(value, type) {
  if (!RULE[type]) {
    throw new Error('Does not support the current type')
  }
  return RULE[type].test(value)
}