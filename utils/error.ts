// https://confluence.shopee.io/pages/viewpage.action?pageId=389977191 后端定义错误码的文档
import { message } from 'antd';

export enum ErrorCode {
  REQUEST_TIMEOUT = 10000000,
  DATABASE = 69900000,
  PARAMETER = 69900001,
  REDIS = 69900002,
  DATA_PARSING = 69900003,
  DATA_MISSING = 69900004,
  DATA_REPEATED = 69900005,
  DATA_OVERFLOW = 69900006,
  STATE_LOCK = 69900007,
  DELETE_TAG = 69910001,
  DELETE_RESULT = 69910002,
  ROUND_RULE_CHECK_RELEASE_SMALLER_ASSIGN_ACTION = 69910003,
  ROUND_RULE_CHECK_RELEASE_SMALLER_OBSERVE = 69910004,
  PERMISSION = 70000001,
  NOT_LOGIN = 70000002,
  DATA_CONVERSITION = 70000003,
  SOUP = 70000004,
  COOKIE = 70001001,
  ILLGAL_USER = 70002001,
  UNKNOWN = 70002002,
  PARAMETER2 = 70000005,

  QC_DATABASE = 73600000,
  QC_CACHE = 73600001,
  QC_KAFKA = 73600002,
  QC_PARSE = 73600003,
  QC_FAILED = 73600004,
  QC_REPEATED = 73600005,
  QC_DATA_OVERFLOW = 73600006,
  QC_DEPS = 73600007,
  QC_PARAMETER = 73600008,
  QC_DATA_CONSISTENT = 73600009,
  QC_TIMEOUT = 73600010,

  // task 被删除
  QC_TASK_DELETED = 73600012,
  QC_TASK_DELETED2 = 69600201,

  QC_STATUS_ERROR = 73600013,
  QC_ROUND_CLOSED = 73600014,

  // Task 已被权限更高的人操作
  QC_NO_PERMISSION2 = 69600203,
  QC_NO_PERMISSION = 73600011,

  // 任务已经被其它操作(QCed)
  QC_TASK_OPERATED2 = 69600202,
  QC_TASK_OPERATED = 73600016,
  QC_DUPLICATE_WARN = 73600021, // 给予两次 warn

  // going task 被 terminated
  QC_TASK_TERMINATED2 = 73600019,
  QC_TASK_TERMINATED = 69600204,

  LIVE_NOT_END = 73600020, // 直播状态未结束
  QC_WAITING_TIMER = 73600018, // warn 之后，前后端存在时间差

  TASK_RELEASED = 73600022,
  FILE_EXCEED_LIMIT = 70000009 // 文件达到限制
}

export const taskDeletedCode = [
  ErrorCode.QC_TASK_DELETED,
  ErrorCode.QC_TASK_DELETED2
];

export const taskTerminatedCode = [
  ErrorCode.QC_TASK_TERMINATED,
  ErrorCode.QC_TASK_TERMINATED2
];

export const noPermissionCode = [
  ErrorCode.QC_NO_PERMISSION,
  ErrorCode.QC_NO_PERMISSION2
];

export const taskOperatedCode = [
  ErrorCode.QC_TASK_OPERATED,
  ErrorCode.QC_TASK_OPERATED2,
  ErrorCode.QC_DUPLICATE_WARN
];

export const getErrorMsg = (e: any) => {
  let msg = '';
  if (e) {
    msg = e.message || e.msg;
  }
  if (e.code) {
    switch (parseInt(`${e.code}`, 10)) {
      case ErrorCode.DATABASE:
      case ErrorCode.REDIS:
      case ErrorCode.STATE_LOCK:
      case ErrorCode.QC_DATABASE:
      case ErrorCode.QC_CACHE:
      case ErrorCode.QC_KAFKA:
      case ErrorCode.QC_DEPS:
        msg = 'Data error';
        break;
      case ErrorCode.PARAMETER:
      case ErrorCode.PARAMETER2:
      case ErrorCode.QC_PARAMETER:
        msg = 'Parameter error';
        break;
      case ErrorCode.DATA_PARSING:
      case ErrorCode.QC_PARSE:
        msg = 'Data parsing error';
        break;
      case ErrorCode.DATA_MISSING:
      case ErrorCode.QC_FAILED:
        msg = 'Data does not exist';
        break;
      case ErrorCode.DATA_REPEATED:
        msg = 'Add repeatedly';
        break;
      case ErrorCode.DATA_OVERFLOW:
      case ErrorCode.QC_DATA_OVERFLOW:
        msg = 'Data value exceeds upper limit';
        break;
      case ErrorCode.DELETE_TAG:
        msg = 'Delete the Content Tag configured by QC Rule';
        break;
      case ErrorCode.DELETE_RESULT:
        msg = 'Delete the QC Result configured by Auto Assign';
        break;
      case ErrorCode.PERMISSION:
        msg = 'QC access verification failed';
        break;
      case ErrorCode.NOT_LOGIN:
        msg = 'User not logged in';
        break;
      case ErrorCode.DATA_CONVERSITION:
        msg = 'Data conversion failed';
        break;
      case ErrorCode.SOUP:
        msg = 'Soup service error';
        break;
      case ErrorCode.COOKIE:
        msg = 'Cookie does not exist';
        break;
      case ErrorCode.ILLGAL_USER:
        msg = 'Illegal users';
        break;
      case ErrorCode.UNKNOWN:
        msg = '70002002: Unknown error';
        break;
      case ErrorCode.QC_REPEATED:
        msg = 'Data repeatedly';
        break;
      case ErrorCode.QC_DATA_CONSISTENT:
        msg = 'Inconsistent data';
        break;
      case ErrorCode.QC_TIMEOUT:
        msg = 'Timeout error';
        break;
      case ErrorCode.QC_NO_PERMISSION:
      case ErrorCode.QC_NO_PERMISSION2:
        msg = 'Task has been operated by someone with higher privileges';
        break;
      case ErrorCode.QC_TASK_DELETED:
      case ErrorCode.QC_TASK_DELETED2:
        msg = 'Task is deleted';
        break;
      case ErrorCode.QC_STATUS_ERROR:
        msg = 'Status error';
        break;
      case ErrorCode.QC_ROUND_CLOSED:
        msg = 'Round is closed';
        break;
      case ErrorCode.QC_TASK_OPERATED:
      case ErrorCode.QC_TASK_OPERATED2:
        msg = 'Task has been operated';
        break;
      case ErrorCode.ROUND_RULE_CHECK_RELEASE_SMALLER_ASSIGN_ACTION:
        msg =
          'The time to release the task must be longer than the time to assign action.';
        break;
      case ErrorCode.ROUND_RULE_CHECK_RELEASE_SMALLER_OBSERVE:
        msg =
          'The time to release the task must be longer than the time to observe.';
        break;
      case ErrorCode.QC_TASK_TERMINATED:
      case ErrorCode.QC_TASK_TERMINATED2:
        msg = 'Task is terminated';
        break;
      case ErrorCode.LIVE_NOT_END:
        msg = 'The live is not ended';
        break;
      case ErrorCode.QC_WAITING_TIMER:
        msg =
          'The time to assign action has not up yet, please wait for a while.';
        break;
      case ErrorCode.TASK_RELEASED:
        msg = 'The tasks have been released.';
        break;
      case ErrorCode.FILE_EXCEED_LIMIT:
        msg = 'Upload failed! Please do not exceed 1000 data';
        break;
      default:
        msg = msg || 'Unknown error';
    }
  }
  return msg;
};

export const checkError = (e: any, useDefaultErrorToast: boolean) => {
  if (!useDefaultErrorToast || !e) {
    return;
  }
  const msg = getErrorMsg(e);
  return msg
  // message.error(msg);
};
