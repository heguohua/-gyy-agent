// vite.config.js
import { defineConfig } from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/vite@5.4.21_hjfqqckuvrqnzv3gj4kx4cnjya/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.21+vue@3.5.24/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import Components from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/unplugin-vue-components@0.27.5_vue@3.5.24/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/unplugin-auto-import@0.18.6/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/unplugin-vue-components@0.27.5_vue@3.5.24/node_modules/unplugin-vue-components/dist/resolvers.js";
import { viteMockServe } from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/vite-plugin-mock@3.0.2_mockjs@1.1.0+vite@5.4.21/node_modules/vite-plugin-mock/dist/index.mjs";
import vueDevTools from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/vite-plugin-vue-devtools@7.7.8_vite@5.4.21+vue@3.5.24/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";

// src/utils/date.ts
import dayjs from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/dayjs.min.js";
var date = class _date {
  static F_YYYY_MM_DD_HH_mm_ss = "YYYY-MM-DD HH:mm:ss";
  static F_YYYY_MM_DD = "YYYY-MM-DD";
  /**
   * 获取毫秒数
   * @returns 
   */
  static now() {
    return Date.now();
  }
  /**
   * 校检日期格式是否为YYYY-MM-DD这种格式
   * @param date
   * @returns {boolean}
   */
  static isValidDate(date2) {
    return dayjs(date2, this.F_YYYY_MM_DD, true).isValid();
  }
  /**
   * 校检日期格式是否为YYYY-MM-DD HH:mm:ss这种格式
   * @param date
   * @returns {boolean}
   */
  static isValidDateTime(date2) {
    return dayjs(date2, this.F_YYYY_MM_DD_HH_mm_ss, true).isValid();
  }
  /**
   * 获取当前日期年月日,时间格式为YYYY-MM-DD
   * @returns {string}
   */
  static currentDate_YYYY_MM_DD() {
    return dayjs(/* @__PURE__ */ new Date()).format(this.F_YYYY_MM_DD);
  }
  /**
   * 获取当前日期年份,时间格式为YYYY
   * @returns {string}
   */
  static currentYear() {
    return (/* @__PURE__ */ new Date()).getFullYear();
  }
  /**
   * 获取当前日期年月日时分秒,时间格式为YYYY-MM-DD HH:mm:ss(24小时制,如果hh为小写表示为12小时制)
   * @returns {string}
   */
  static currentDateTime_YYYY_MM_DD__HH_mm_ss() {
    return this.YYYY_MM_DD__HH_mm_ss(/* @__PURE__ */ new Date());
  }
  /**
   * 将传过来的日期转换为YYYY-MM-DD这种格式
   * @param date:为传过来的日期
   * @returns {string}
   */
  static YYYY_MM_DD(date2) {
    return dayjs(date2).format(this.F_YYYY_MM_DD);
  }
  /**
   * 将传过来的日期转换为YYYY-MM-DD HH:mm:ss这种格式
   * @param date:为传过来的日期
   * @returns {string}
   */
  static YYYY_MM_DD__HH_mm_ss(date2) {
    return dayjs(date2).format(this.F_YYYY_MM_DD_HH_mm_ss);
  }
  /**
   * 将传过来的日期转换为 自定义 格式
   * @param date:为传过来的日期
   * @returns {string}
   */
  static format(date2, ft) {
    return dayjs(date2).format(ft);
  }
  /**
   * 将传过来的日期加X日期且时间格式为YYYY-MM-DD这种格式,如:getXAfterDate('2023-11-11',1,'day'),结果为2023-11-12
   * @param date:为传过来的日期
   * @param num:在当前日期加num,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  static getXAfterDate(date2, num, dateType) {
    return dayjs(date2).add(num, dateType).format(this.F_YYYY_MM_DD);
  }
  /**
   * 将传过来的日期加X日期且时间格式为YYYY-MM-DD HH:mm:ss这种格式,如:getXAfterDateTime('2023-11-11 10:23:45',1,'day'),结果为2023-11-12 10:23:45
   * @param date:为传过来的日期
   * @param num:在当前日期加num,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  static getXAfterDateTime(date2, num, dateType) {
    return dayjs(date2).add(num, dateType).format(this.F_YYYY_MM_DD_HH_mm_ss);
  }
  /**
   * 将传过来的日期减去X日期且时间格式为YYYY-MM-DD这种格式,如:getXBeforeDate('2023-11-11',1,'day'),结果为2023-11-10
   * @param date:为传过来的日期
   * @param num:在当前日期加num,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  static getXBeforeDate(date2, num, dateType) {
    return dayjs(date2).subtract(num, dateType).format(this.F_YYYY_MM_DD);
  }
  /**
   * 将传过来的日期减去X日期且时间格式为YYYY-MM-DD HH:mm:ss这种格式,如:getXBeforeDateTime('2023-11-11 10:23:45',1,'day'),结果为2023-11-10 10:23:45
   * @param date:为传过来的日期
   * @param num:在当前日期加day,类型为int
   * @param dateType:为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {string}
   */
  static getXBeforeDateTime(date2, num, dateType) {
    return dayjs(date2).subtract(num, dateType).format(this.F_YYYY_MM_DD_HH_mm_ss);
  }
  /**
   * 计算2个日期之间的差值
   * @param startDate:开始日期
   * @param endDate:结束日期,结束日期要比开始日期大
   * @param dateType:日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
   * @returns {number}
   */
  static getDateDiff(startDate, endDate, dateType) {
    return dayjs(endDate).diff(dayjs(startDate), dateType);
  }
  /**
   * 判断date1是否在date2之前,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为false
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  static isBefore(date1, date2) {
    return dayjs(date1).isBefore(dayjs(date2));
  }
  /**
   * 判断date1是否在date2之后,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为true
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  static isAfter(date1, date2) {
    return dayjs(date1).isAfter(dayjs(date2));
  }
  /**
   * 判断date1是否与date2相同,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为false
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  static isSame(date1, date2) {
    return dayjs(date1).isSame(dayjs(date2));
  }
  /**
   * 将传过来的日期转为当年的1月1号或者当月的1号或者当周的周一
   * @param date:传过来日期
   * @param dateType,日期类型,为:year,month,week这3种
   * @returns {string}
   */
  static getEarlyDaysDate(date2, dateType) {
    return dayjs(date2).startOf(dateType).format(this.F_YYYY_MM_DD);
  }
  /**
   * 将传过来的日期转为当年的12月31号或者当月的最后一天或者当周的周日
   * @param date:传过来日期
   * @param dateType,日期类型,为:year,month,week这3种
   * @returns {string}
   */
  static getLastDaysDate(date2, dateType) {
    return dayjs(date2).endOf(dateType).format(this.F_YYYY_MM_DD);
  }
  /**
   * 获取2个日期之间的所有日期,包括开始日期和结束日期,如:getIntermediateDate('2023-12-01','2023-12-15',1,'day'))
   * @param startDate:开始日期
   * @param endDate:结束日期要大于开始日期
   * @param num:在开始日期上加num,int类型,如果dateType为day,num为1那么就是在开始日期上加一天
   * @param dateType,日期类型,类型如下:'minute','hour','day','week','month','year'这六种类型
   * @returns {*[]}
   */
  static getIntermediateDate(startDate, endDate, num, dateType) {
    let daysArray = [startDate];
    while (_date.isBefore(startDate, endDate)) {
      startDate = _date.getXAfterDate(startDate, num, dateType);
      daysArray.push(startDate);
    }
    return daysArray;
  }
  static formatDateTime(timestamp, formatString) {
    const date2 = new Date(timestamp);
    const year = date2.getFullYear();
    const month = date2.getMonth() + 1;
    const day = date2.getDate();
    const hour = date2.getHours();
    const minute = date2.getMinutes();
    const second = date2.getSeconds();
    const formatMap = {
      "YYYY": year,
      "MM": month < 10 ? "0" + month : month,
      "DD": day < 10 ? "0" + day : day,
      "HH": hour < 10 ? "0" + hour : hour,
      "mm": minute < 10 ? "0" + minute : minute,
      "ss": second < 10 ? "0" + second : second
    };
    return formatString.replace(/(YYYY|MM|DD|HH|mm|ss)/g, (match) => formatMap[match]);
  }
};

// src/utils/logger.ts
var Logger = class {
  prefix;
  env_type;
  constructor(prefix) {
    this.prefix = prefix;
    this.env_type = import.meta.env?.MODE;
  }
  getCallerFileName() {
    const stack = new Error().stack || "";
    const lines = stack.split("\n");
    let file_name = "no file name";
    if (lines.length > 3) {
      const fourthLine = lines[3].trim();
      const file_name_match = fourthLine.match(/[^/?]+(?=\?)/);
      const file_url_match = fourthLine.match(/\((.*?)\)/);
      const file_url = file_url_match ? file_url_match[1] : file_name;
      if (file_name_match) {
        file_name = file_name_match[0];
      } else {
        const match = fourthLine.match(/\/([^\/]+)$/);
        file_name = match ? match[1] : "no file name";
        file_name = file_name.split(":")[0];
      }
    }
    return file_name.padEnd(40, " ");
  }
  getCallerFileLink() {
    const stack = new Error().stack || "";
    const lines = stack.split("\n");
    let file_name = "no file name";
    if (lines.length > 3) {
      const fourthLine = lines[3].trim();
      const file_name_match = fourthLine.match(/[^/?]+(?=\?)/);
      const file_url_match = fourthLine.match(/\((.*?)\)/);
      const file_url = file_url_match ? file_url_match[1] : file_name;
      if (file_name_match) {
        file_name = file_name_match[0];
      } else {
        const match = fourthLine.match(/\/([^\/]+)$/);
        file_name = file_url;
      }
    }
    return file_name;
  }
  /**
   * 打印 【 普通 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  info(message, ...optionalParams) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();
    message = typeof message === "object" ? JSON.stringify(message) : message;
    const op = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === "object" ? JSON.stringify(param) : param);
    });
    optionalParams = op;
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsole(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }
  /**
   * 打印 【 错误 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  error(message, ...optionalParams) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();
    message = typeof message === "object" ? JSON.stringify(message) : message;
    const op = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === "object" ? JSON.stringify(param) : param);
    });
    optionalParams = op;
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsoleError(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }
  /**
   * 打印 【 警告 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  warn(message, ...optionalParams) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();
    message = typeof message === "object" ? JSON.stringify(message) : message;
    const op = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === "object" ? JSON.stringify(param) : param);
    });
    optionalParams = op;
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsoleWarn(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }
  /**
   * 打印 【 成功 】日志信息
   * @param message 主日志信息
   * @param optionalParams 可选【多条】日志信息
   */
  success(message, ...optionalParams) {
    const timestamp = date.currentDateTime_YYYY_MM_DD__HH_mm_ss();
    const file_name = this.getCallerFileName();
    const file_link = this.getCallerFileLink();
    message = typeof message === "object" ? JSON.stringify(message) : message;
    const op = [];
    optionalParams.forEach((param) => {
      op.push(typeof param === "object" ? JSON.stringify(param) : param);
    });
    optionalParams = op;
    const logMessage = `${timestamp} - ${this.prefix} - [ ${file_name} ] : ${message}    --- ${file_link}`;
    this.outputConsoleGreen(logMessage, optionalParams);
    this.outputNodeConsole(logMessage, optionalParams);
  }
  outputConsole(message, optionalParams) {
    if (typeof window !== "undefined" && this.env_type === "dev") {
      const regex = /【(.*?)】/;
      const match = message.match(regex);
      if (match && match[1]) {
        console.log(
          `%c${message.substring(0, match.index)}\u3010%c${match[1]}%c\u3011${message.substring(match.index + match[0].length)}`,
          "",
          // 匹配到的内容之前的样式（默认样式）
          "color: red;",
          // 【和】之间的内容设置为红色
          ""
        );
      } else {
        console.log(message);
      }
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`    >> ${param}`));
      }
    }
  }
  outputConsoleError(message, optionalParams) {
    if (typeof window !== "undefined" && this.env_type === "dev") {
      console.log(`%c${message}`, "color: red; font-weight: bold;");
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`%c    >> ${param}`, "color: red;"));
      }
    }
  }
  outputConsoleWarn(message, optionalParams) {
    if (typeof window !== "undefined" && this.env_type === "dev") {
      console.log(`%c${message}`, "color: orange;");
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`%c    >> ${param}`, "color: orange;"));
      }
    }
  }
  outputConsoleGreen(message, optionalParams) {
    if (typeof window !== "undefined" && this.env_type === "dev") {
      console.log(`%c${message}`, "color: green; font-weight: bold;");
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => console.log(`%c    >> ${param}`, "color: green;"));
      }
    }
  }
  outputNodeConsole(message, optionalParams) {
    if (typeof process !== "undefined" && typeof process.stdout !== "undefined") {
      process.stdout.write(`${message}
`);
      if (optionalParams.length > 0) {
        optionalParams.forEach((param) => process.stdout.write(`${param}
`));
      }
    }
  }
};
var logger = new Logger("ala-app");

// vite.config.js
import { loadEnv } from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/vite@5.4.21_hjfqqckuvrqnzv3gj4kx4cnjya/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.21/node_modules/vite-plugin-html/dist/index.mjs";
import topLevelAwait from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/vite-plugin-top-level-await@1.6.0_vite@5.4.21/node_modules/vite-plugin-top-level-await/exports/import.mjs";
import Icons from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/unplugin-icons@22.5.0/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///Users/darcy/mwp/1-low-coding/node_modules/.pnpm/unplugin-icons@22.5.0/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname = "/Users/darcy/mwp/1-low-coding/packages/ala-editor";
var ph = path.resolve(__vite_injected_original_dirname, "./src");
logger.info(`src path is ${ph}`);
var dc = defineConfig(({ command, mode }) => {
  logger.info(`command is ${command}`);
  logger.info(`env is .env.${mode}`);
  const env = loadEnv(mode, process.cwd());
  console.log("env content:", env);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const formattedDate = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19).replace("Z", "");
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: true,
        deep: true,
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        // 指定自动导入的组件位置，默认是 src/components
        dirs: ["src/components"],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon"
            // 组件名前缀，如 <IconHome />
          })
        ]
      }),
      viteMockServe({
        mockPath: "mock",
        // 指定 mock 文件夹路径
        enable: command === "serve"
      }),
      vueDevTools(),
      createHtmlPlugin({
        inject: {
          data: {
            title: loadEnv(mode, process.cwd()).VITE_APP_TITLE,
            author: "darcy.zhang , tech.darcy.zhang@outlook.com",
            copyright: `@Copyright 2025~${year} \u6DF1\u5733\u4E2D\u53CB\u4F1A\u79D1\u6280\u6709\u9650\u516C\u53F8`,
            keywords: "\u8C37\u96E8\u4E91\u3001\u5FAE\u670D\u52A1\u3001\u6570\u636E\u4E2D\u53F0\u3001\u7269\u8054\u7F51\u5E73\u53F0\u3001AI\u667A\u80FD\u5E73\u53F0\u3001\u5927\u6570\u636E\u3001\u4E91\u539F\u751F\u3001AI\u667A\u80FD\u4F53",
            description: "\u81F4\u529B\u4E8EIT\u8F6F\u4EF6\u4EA7\u54C1\u7814\u53D1\u548C\u5E94\u7528\u4FA7\u5BA2\u6237\u670D\u52A1\uFF0C\u62E5\u6709\u4ECE\u54A8\u8BE2\u3001\u8BBE\u8BA1\u3001\u5F00\u53D1\u3001\u6D4B\u8BD5\u3001\u8FD0\u7EF4\u5230\u8FD0\u8425\u7684\u7AEF\u5230\u7AEF\u8F6F\u4EF6\u7814\u53D1\u5168\u751F\u547D\u5468\u671F\u670D\u52A1\u80FD\u529B\uFF0C\u5728\u91D1\u878D\u3001\u653F\u52A1\u3001\u5236\u9020\u3001\u4EA4\u901A\u3001\u6559\u80B2\u3001\u6587\u65C5\u7B49\u5404\u884C\u4E1A\u79EF\u7D2F\u4E86\u4E30\u5BCC\u7684IT\u6848\u4F8B\u4E0E\u7814\u53D1\u7ECF\u9A8C\u3002",
            formattedDate
          }
        }
      }),
      topLevelAwait(),
      Icons({
        autoInstall: true
        // 按需安装缺失图标
      })
    ],
    resolve: {
      alias: {
        "@": ph
      }
    },
    server: {
      host: "0.0.0.0",
      proxy: {
        "/tuwei": {
          target: "https://api.uomg.com/api/rand.qinghua?format=json",
          // 目标服务器地址
          changeOrigin: true
          // 允许跨域
        },
        "/dev": {
          target: "http://127.0.0.1:2009",
          // 目标服务器地址
          // target: 'http://ala-gateway.gyykj.com:38080', // 目标服务器地址
          changeOrigin: true,
          // 允许跨域
          rewrite: (path2) => path2.replace(/^\/dev/, "")
        },
        "/v": {
          target: "http://127.0.0.1:2060",
          // 目标服务器地址
          // target: 'http://ala-gateway.gyykj.com:38080', // 目标服务器地址
          changeOrigin: true,
          // 允许跨域
          rewrite: (path2) => path2.replace(/^\/v/, "")
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/assets/styles/vite-import.scss" as *;`
        }
      }
    },
    base: "./"
  };
});
var vite_config_default = dc;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL3V0aWxzL2RhdGUudHMiLCAic3JjL3V0aWxzL2xvZ2dlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9kYXJjeS9td3AvMS1sb3ctY29kaW5nL3BhY2thZ2VzL2FsYS1lZGl0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kYXJjeS9td3AvMS1sb3ctY29kaW5nL3BhY2thZ2VzL2FsYS1lZGl0b3Ivdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2RhcmN5L213cC8xLWxvdy1jb2RpbmcvcGFja2FnZXMvYWxhLWVkaXRvci92aXRlLmNvbmZpZy5qc1wiOy8qXG4gKiBAQXV0aG9yOiBkYXJjeS56aGFuZyAsIHRlY2guZGFyY3kuemhhbmdAb3V0bG9vay5jb21cbiAqIEBEYXRlOiAyMDI0LTEwLTEyIDE2OjA2OjM2XG4gKiBATGFzdEVkaXRvcnM6IGRhcmN5LnpoYW5nICwgdGVjaC5kYXJjeS56aGFuZ0BvdXRsb29rLmNvbVxuICogQExhc3RFZGl0VGltZTogMjAyNi0wMS0wNiAxNDoyNjo1MVxuICogQEZpbGVQYXRoOiAvMS1sb3ctY29kaW5nL3BhY2thZ2VzL2FsYS1lZGl0b3Ivdml0ZS5jb25maWcuanNcbiAqIEBEZXNjcmlwdGlvbjpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgYnkgXHUzMDEwIHRlY2guZGFyY3kuemhhbmdAb3V0bG9vay5jb20gXHUzMDExLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vc3JjL3V0aWxzL2xvZ2dlci50cydcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcbmltcG9ydCB0b3BMZXZlbEF3YWl0IGZyb20gJ3ZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdCc7XG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZScgIC8vXHU1NkZFXHU2ODA3XHU2MzA5XHU5NzAwXHU1MkEwXHU4RjdEXHU1REU1XHU1MTc3XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcblxuXG5jb25zdCBwaCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpO1xubG9nZ2VyLmluZm8oYHNyYyBwYXRoIGlzICR7cGh9YCk7XG5cblxuY29uc3QgZGMgPSBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIGxvZ2dlci5pbmZvKGBjb21tYW5kIGlzICR7Y29tbWFuZH1gKTtcbiAgbG9nZ2VyLmluZm8oYGVudiBpcyAuZW52LiR7bW9kZX1gKTtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgY29uc29sZS5sb2coJ2VudiBjb250ZW50OicsIGVudik7XG5cbiAgY29uc3QgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdUJywgJyAnKS5zbGljZSgwLCAxOSkucmVwbGFjZSgnWicsICcnKTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcbiAgICAgICAgZHRzOiB0cnVlLFxuICAgICAgICBkZWVwOiB0cnVlLFxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3Njg0XHU3RUM0XHU0RUY2XHU0RjREXHU3RjZFXHVGRjBDXHU5RUQ4XHU4QkE0XHU2NjJGIHNyYy9jb21wb25lbnRzXG4gICAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcbiAgICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgcHJlZml4OiAnSWNvbicsIC8vIFx1N0VDNFx1NEVGNlx1NTQwRFx1NTI0RFx1N0YwMFx1RkYwQ1x1NTk4MiA8SWNvbkhvbWUgLz5cbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsIC8vIFx1NjMwN1x1NUI5QSBtb2NrIFx1NjU4N1x1NEVGNlx1NTkzOVx1OERFRlx1NUY4NFxuICAgICAgICBlbmFibGU6IGNvbW1hbmQgPT09ICdzZXJ2ZScsXG4gICAgICB9KSxcbiAgICAgIHZ1ZURldlRvb2xzKCksXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgaW5qZWN0OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGU6IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkuVklURV9BUFBfVElUTEUsXG4gICAgICAgICAgICBhdXRob3I6IFwiZGFyY3kuemhhbmcgLCB0ZWNoLmRhcmN5LnpoYW5nQG91dGxvb2suY29tXCIsXG4gICAgICAgICAgICBjb3B5cmlnaHQ6IGBAQ29weXJpZ2h0IDIwMjV+JHt5ZWFyfSBcdTZERjFcdTU3MzNcdTRFMkRcdTUzQ0JcdTRGMUFcdTc5RDFcdTYyODBcdTY3MDlcdTk2NTBcdTUxNkNcdTUzRjhgLFxuICAgICAgICAgICAga2V5d29yZHM6IFwiXHU4QzM3XHU5NkU4XHU0RTkxXHUzMDAxXHU1RkFFXHU2NzBEXHU1MkExXHUzMDAxXHU2NTcwXHU2MzZFXHU0RTJEXHU1M0YwXHUzMDAxXHU3MjY5XHU4MDU0XHU3RjUxXHU1RTczXHU1M0YwXHUzMDAxQUlcdTY2N0FcdTgwRkRcdTVFNzNcdTUzRjBcdTMwMDFcdTU5MjdcdTY1NzBcdTYzNkVcdTMwMDFcdTRFOTFcdTUzOUZcdTc1MUZcdTMwMDFBSVx1NjY3QVx1ODBGRFx1NEY1M1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXHU4MUY0XHU1MjlCXHU0RThFSVRcdThGNkZcdTRFRjZcdTRFQTdcdTU0QzFcdTc4MTRcdTUzRDFcdTU0OENcdTVFOTRcdTc1MjhcdTRGQTdcdTVCQTJcdTYyMzdcdTY3MERcdTUyQTFcdUZGMENcdTYyRTVcdTY3MDlcdTRFQ0VcdTU0QThcdThCRTJcdTMwMDFcdThCQkVcdThCQTFcdTMwMDFcdTVGMDBcdTUzRDFcdTMwMDFcdTZENEJcdThCRDVcdTMwMDFcdThGRDBcdTdFRjRcdTUyMzBcdThGRDBcdTg0MjVcdTc2ODRcdTdBRUZcdTUyMzBcdTdBRUZcdThGNkZcdTRFRjZcdTc4MTRcdTUzRDFcdTUxNjhcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUZcdTY3MERcdTUyQTFcdTgwRkRcdTUyOUJcdUZGMENcdTU3MjhcdTkxRDFcdTg3OERcdTMwMDFcdTY1M0ZcdTUyQTFcdTMwMDFcdTUyMzZcdTkwMjBcdTMwMDFcdTRFQTRcdTkwMUFcdTMwMDFcdTY1NTlcdTgwQjJcdTMwMDFcdTY1ODdcdTY1QzVcdTdCNDlcdTU0MDRcdTg4NENcdTRFMUFcdTc5RUZcdTdEMkZcdTRFODZcdTRFMzBcdTVCQ0NcdTc2ODRJVFx1Njg0OFx1NEY4Qlx1NEUwRVx1NzgxNFx1NTNEMVx1N0VDRlx1OUE4Q1x1MzAwMlwiLFxuICAgICAgICAgICAgZm9ybWF0dGVkRGF0ZTogZm9ybWF0dGVkRGF0ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB0b3BMZXZlbEF3YWl0KCksXG4gICAgICBJY29ucyh7XG4gICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLCAvLyBcdTYzMDlcdTk3MDBcdTVCODlcdTg4QzVcdTdGM0FcdTU5MzFcdTU2RkVcdTY4MDdcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwaCxcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy90dXdlaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwczovL2FwaS51b21nLmNvbS9hcGkvcmFuZC5xaW5naHVhP2Zvcm1hdD1qc29uJywgLy8gXHU3NkVFXHU2ODA3XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBcdTUxNDFcdThCQjhcdThERThcdTU3REZcbiAgICAgICAgfSxcbiAgICAgICAgJy9kZXYnOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMToyMDA5JywgLy8gXHU3NkVFXHU2ODA3XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cDovL2FsYS1nYXRld2F5Lmd5eWtqLmNvbTozODA4MCcsIC8vIFx1NzZFRVx1NjgwN1x1NjcwRFx1NTJBMVx1NTY2OFx1NTczMFx1NTc0MFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gXHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2Rldi8sICcnKVxuICAgICAgICB9LFxuICAgICAgICAnL3YnOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMToyMDYwJywgLy8gXHU3NkVFXHU2ODA3XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cDovL2FsYS1nYXRld2F5Lmd5eWtqLmNvbTozODA4MCcsIC8vIFx1NzZFRVx1NjgwN1x1NjcwRFx1NTJBMVx1NTY2OFx1NTczMFx1NTc0MFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gXHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL3YvLCAnJylcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIi4vc3JjL2Fzc2V0cy9zdHlsZXMvdml0ZS1pbXBvcnQuc2Nzc1wiIGFzICo7YCxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYmFzZTogXCIuL1wiLFxuXG4gIH07XG59KTtcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGM7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9kYXJjeS9td3AvMS1sb3ctY29kaW5nL3BhY2thZ2VzL2FsYS1lZGl0b3Ivc3JjL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZGFyY3kvbXdwLzEtbG93LWNvZGluZy9wYWNrYWdlcy9hbGEtZWRpdG9yL3NyYy91dGlscy9kYXRlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kYXJjeS9td3AvMS1sb3ctY29kaW5nL3BhY2thZ2VzL2FsYS1lZGl0b3Ivc3JjL3V0aWxzL2RhdGUudHNcIjsvKlxuICogQEF1dGhvcjogZGFyY3kuemhhbmcgLCB0ZWNoLmRhcmN5LnpoYW5nQG91dGxvb2suY29tXG4gKiBARGF0ZTogMjAyNC0xMC0xNCAxMToxNDo1MlxuICogQExhc3RFZGl0b3JzOiBkYXJjeS56aGFuZyAsIHRlY2guZGFyY3kuemhhbmdAb3V0bG9vay5jb21cbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjUtMTItMjYgMDk6MTI6NTNcbiAqIEBGaWxlUGF0aDogLzEtbG93LWNvZGluZy9wYWNrYWdlcy9hbGEtZWRpdG9yL3NyYy91dGlscy9kYXRlLnRzXG4gKiBARGVzY3JpcHRpb246IFx1NjVGNlx1OTVGNFx1NURFNVx1NTE3N1x1N0M3QlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNCBieSBcdTMwMTAgdGVjaC5kYXJjeS56aGFuZ0BvdXRsb29rLmNvbSBcdTMwMTEsIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbi8vXHU2NUU1XHU2NzFGXHU1REU1XHU1MTc3XHU3QzdCXG4vL1x1NUM0MFx1OTBFOFx1NUJGQ1x1NTE2NWRheWpzXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xudHlwZSBkdCA9ICdtaW51dGUnIHwgJ2hvdXInIHwgJ2RheScgfCAnd2VlaycgfCAnbW9udGgnIHwgJ3llYXInO1xuLy8gXCJkYXRlXCIgfCBcInllYXJcIiB8IFwieWVhcnNcIiB8IFwibW9udGhcIiB8IFwibW9udGhzXCIgfCBcImRhdGVzXCIgfCBcIndlZWtcIiB8IFwiZGF0ZXRpbWVcIiB8IFwiZGF0ZXRpbWVyYW5nZVwiIHwgXCJkYXRlcmFuZ2VcIiB8IFwibW9udGhyYW5nZVwiIHwgXCJ5ZWFycmFuZ2VcIlxuZXhwb3J0IGNvbnN0IEFsYURhdGVUeXBlID0gW1xuICB7IHZhbHVlOiBcImRhdGVcIiwgbmFtZTogXCJcdTY1RTVcdTY3MUZcIiB9LFxuICB7IHZhbHVlOiBcInllYXJcIiwgbmFtZTogXCJcdTVFNzRcIiB9LFxuICB7IHZhbHVlOiBcInllYXJzXCIsIG5hbWU6IFwiXHU1OTFBXHU0RTJBXHU1RTc0XHU0RUZEXCIgfSxcbiAgeyB2YWx1ZTogXCJtb250aFwiLCBuYW1lOiBcIlx1NjcwOFx1NEVGRFwiIH0sXG4gIHsgdmFsdWU6IFwibW9udGhzXCIsIG5hbWU6IFwiXHU1OTFBXHU0RTJBXHU2NzA4XHU0RUZEXCIgfSxcbiAgeyB2YWx1ZTogXCJkYXRlc1wiLCBuYW1lOiBcIlx1NTkxQVx1NEUyQVx1NjVFNVx1NjcxRlwiIH0sXG4gIHsgdmFsdWU6IFwid2Vla1wiLCBuYW1lOiBcIlx1NTQ2OFwiIH0sXG4gIHsgdmFsdWU6IFwiZGF0ZXRpbWVcIiwgbmFtZTogXCJcdTY1RTVcdTY3MUZcdTY1RjZcdTk1RjRcIiB9LFxuXVxuZXhwb3J0IGNvbnN0IEFsYURhdGVUeXBlUmFuZ2UgPSBbXG4gIHsgdmFsdWU6IFwiZGF0ZXRpbWVyYW5nZVwiLCBuYW1lOiBcIlx1NjVFNVx1NjcxRlx1NjIxNlx1NjVGNlx1OTVGNFx1ODMwM1x1NTZGNFwiIH0sXG4gIHsgdmFsdWU6IFwiZGF0ZXJhbmdlXCIsIG5hbWU6IFwiXHU2NUU1XHU4MzAzXHU1NkY0XCIgfSxcbiAgeyB2YWx1ZTogXCJtb250aHJhbmdlXCIsIG5hbWU6IFwiXHU2NzA4XHU4MzAzXHU1NkY0XCIgfSxcbiAgeyB2YWx1ZTogXCJ5ZWFycmFuZ2VcIiwgbmFtZTogXCJcdTVFNzRcdTgzMDNcdTU2RjRcIiB9LFxuXVxuZXhwb3J0IGNvbnN0IEFsYURhdGVGb3JtYXQgPSBbXG4gIHsgbmFtZTogXCJISDptbVwiLCB2YWx1ZTogXCJISDptbVwiIH0sXG4gIHsgbmFtZTogXCJISDptbTpzc1wiLCB2YWx1ZTogXCJISDptbTpzc1wiIH0sXG4gIHsgbmFtZTogXCJZWVlZXCIsIHZhbHVlOiBcIllZWVlcIiB9LFxuICB7IG5hbWU6IFwiWVlZWS1NTVwiLCB2YWx1ZTogXCJZWVlZLU1NXCIgfSxcbiAgeyBuYW1lOiBcIllZWVktTU0tRERcIiwgdmFsdWU6IFwiWVlZWS1NTS1ERFwiIH0sXG4gIHsgbmFtZTogXCJZWVlZL01NL0REXCIsIHZhbHVlOiBcIllZWVkvTU0vRERcIiB9LFxuICB7IG5hbWU6IFwiWVlZWU1NRERcIiwgdmFsdWU6IFwiWVlZWU1NRERcIiB9LFxuICB7IG5hbWU6IFwiWVlZWS1NTS1ERCBISDptbVwiLCB2YWx1ZTogXCJZWVlZLU1NLUREIEhIOm1tXCIgfSxcbiAgeyBuYW1lOiBcIllZWVktTU0tREQgSEg6bW06c3NcIiwgdmFsdWU6IFwiWVlZWS1NTS1ERCBISDptbTpzc1wiIH0sXG4gIHsgbmFtZTogXCJZWVlZL01NL0REIEhIOm1tOnNzXCIsIHZhbHVlOiBcIllZWVkvTU0vREQgSEg6bW06c3NcIiB9LFxuICB7IG5hbWU6IFwiWVlZWU1NREQgSEhtbXNzXCIsIHZhbHVlOiBcIllZWVlNTUREIEhIbW1zc1wiIH0sXG5dXG5cblxuZXhwb3J0IGNsYXNzIGRhdGUge1xuXG5cbiAgc3RhdGljIHJlYWRvbmx5IEZfWVlZWV9NTV9ERF9ISF9tbV9zcyA9IFwiWVlZWS1NTS1ERCBISDptbTpzc1wiXG4gIHN0YXRpYyByZWFkb25seSBGX1lZWVlfTU1fREQgPSBcIllZWVktTU0tRERcIlxuXG4gIC8qKlxuICAgKiBcdTgzQjdcdTUzRDZcdTZCRUJcdTc5RDJcdTY1NzBcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG5vdygpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdTY4MjFcdTY4QzBcdTY1RTVcdTY3MUZcdTY4M0NcdTVGMEZcdTY2MkZcdTU0MjZcdTRFM0FZWVlZLU1NLUREXHU4RkQ5XHU3OUNEXHU2ODNDXHU1RjBGXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc1ZhbGlkRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUsIHRoaXMuRl9ZWVlZX01NX0RELCB0cnVlKS5pc1ZhbGlkKCk7XG4gIH1cblxuICAvKipcbiAgICogXHU2ODIxXHU2OEMwXHU2NUU1XHU2NzFGXHU2ODNDXHU1RjBGXHU2NjJGXHU1NDI2XHU0RTNBWVlZWS1NTS1ERCBISDptbTpzc1x1OEZEOVx1NzlDRFx1NjgzQ1x1NUYwRlxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaXNWYWxpZERhdGVUaW1lKGRhdGU6IERhdGUpIHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSwgdGhpcy5GX1lZWVlfTU1fRERfSEhfbW1fc3MsIHRydWUpLmlzVmFsaWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdTgzQjdcdTUzRDZcdTVGNTNcdTUyNERcdTY1RTVcdTY3MUZcdTVFNzRcdTY3MDhcdTY1RTUsXHU2NUY2XHU5NUY0XHU2ODNDXHU1RjBGXHU0RTNBWVlZWS1NTS1ERFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjdXJyZW50RGF0ZV9ZWVlZX01NX0REKCkge1xuICAgIHJldHVybiBkYXlqcyhuZXcgRGF0ZSgpKS5mb3JtYXQodGhpcy5GX1lZWVlfTU1fREQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1ODNCN1x1NTNENlx1NUY1M1x1NTI0RFx1NjVFNVx1NjcxRlx1NUU3NFx1NEVGRCxcdTY1RjZcdTk1RjRcdTY4M0NcdTVGMEZcdTRFM0FZWVlZXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGN1cnJlbnRZZWFyKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogXHU4M0I3XHU1M0Q2XHU1RjUzXHU1MjREXHU2NUU1XHU2NzFGXHU1RTc0XHU2NzA4XHU2NUU1XHU2NUY2XHU1MjA2XHU3OUQyLFx1NjVGNlx1OTVGNFx1NjgzQ1x1NUYwRlx1NEUzQVlZWVktTU0tREQgSEg6bW06c3MoMjRcdTVDMEZcdTY1RjZcdTUyMzYsXHU1OTgyXHU2NzlDaGhcdTRFM0FcdTVDMEZcdTUxOTlcdTg4NjhcdTc5M0FcdTRFM0ExMlx1NUMwRlx1NjVGNlx1NTIzNilcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY3VycmVudERhdGVUaW1lX1lZWVlfTU1fRERfX0hIX21tX3NzKCkge1xuICAgIHJldHVybiB0aGlzLllZWVlfTU1fRERfX0hIX21tX3NzKG5ldyBEYXRlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1NUMwNlx1NEYyMFx1OEZDN1x1Njc2NVx1NzY4NFx1NjVFNVx1NjcxRlx1OEY2Q1x1NjM2Mlx1NEUzQVlZWVktTU0tRERcdThGRDlcdTc5Q0RcdTY4M0NcdTVGMEZcbiAgICogQHBhcmFtIGRhdGU6XHU0RTNBXHU0RjIwXHU4RkM3XHU2NzY1XHU3Njg0XHU2NUU1XHU2NzFGXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIFlZWVlfTU1fREQoZGF0ZTogRGF0ZSkge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5mb3JtYXQodGhpcy5GX1lZWVlfTU1fREQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1NUMwNlx1NEYyMFx1OEZDN1x1Njc2NVx1NzY4NFx1NjVFNVx1NjcxRlx1OEY2Q1x1NjM2Mlx1NEUzQVlZWVktTU0tREQgSEg6bW06c3NcdThGRDlcdTc5Q0RcdTY4M0NcdTVGMEZcbiAgICogQHBhcmFtIGRhdGU6XHU0RTNBXHU0RjIwXHU4RkM3XHU2NzY1XHU3Njg0XHU2NUU1XHU2NzFGXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIFlZWVlfTU1fRERfX0hIX21tX3NzKGRhdGU6IERhdGUpIHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KHRoaXMuRl9ZWVlZX01NX0REX0hIX21tX3NzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdTVDMDZcdTRGMjBcdThGQzdcdTY3NjVcdTc2ODRcdTY1RTVcdTY3MUZcdThGNkNcdTYzNjJcdTRFM0EgXHU4MUVBXHU1QjlBXHU0RTQ5IFx1NjgzQ1x1NUYwRlxuICAgKiBAcGFyYW0gZGF0ZTpcdTRFM0FcdTRGMjBcdThGQzdcdTY3NjVcdTc2ODRcdTY1RTVcdTY3MUZcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZm9ybWF0KGRhdGU6IERhdGUsIGZ0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuZm9ybWF0KGZ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdTVDMDZcdTRGMjBcdThGQzdcdTY3NjVcdTc2ODRcdTY1RTVcdTY3MUZcdTUyQTBYXHU2NUU1XHU2NzFGXHU0RTE0XHU2NUY2XHU5NUY0XHU2ODNDXHU1RjBGXHU0RTNBWVlZWS1NTS1ERFx1OEZEOVx1NzlDRFx1NjgzQ1x1NUYwRixcdTU5ODI6Z2V0WEFmdGVyRGF0ZSgnMjAyMy0xMS0xMScsMSwnZGF5JyksXHU3RUQzXHU2NzlDXHU0RTNBMjAyMy0xMS0xMlxuICAgKiBAcGFyYW0gZGF0ZTpcdTRFM0FcdTRGMjBcdThGQzdcdTY3NjVcdTc2ODRcdTY1RTVcdTY3MUZcbiAgICogQHBhcmFtIG51bTpcdTU3MjhcdTVGNTNcdTUyNERcdTY1RTVcdTY3MUZcdTUyQTBudW0sXHU3QzdCXHU1NzhCXHU0RTNBaW50XG4gICAqIEBwYXJhbSBkYXRlVHlwZTpcdTRFM0FcdTg5ODFcdTUyQTBcdTc2ODRcdTY1RTVcdTY3MUZcdTdDN0JcdTU3OEIsXHU2NzA5XHU1OTgyXHU0RTBCXHU3QzdCXHU1NzhCOidtaW51dGUnLCdob3VyJywnZGF5Jywnd2VlaycsJ21vbnRoJywneWVhcidcdThGRDlcdTUxNkRcdTc5Q0RcdTdDN0JcdTU3OEJcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0WEFmdGVyRGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nLCBudW06IG51bWJlciwgZGF0ZVR5cGU6IGR0KSB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmFkZChudW0sIGRhdGVUeXBlKS5mb3JtYXQodGhpcy5GX1lZWVlfTU1fREQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1NUMwNlx1NEYyMFx1OEZDN1x1Njc2NVx1NzY4NFx1NjVFNVx1NjcxRlx1NTJBMFhcdTY1RTVcdTY3MUZcdTRFMTRcdTY1RjZcdTk1RjRcdTY4M0NcdTVGMEZcdTRFM0FZWVlZLU1NLUREIEhIOm1tOnNzXHU4RkQ5XHU3OUNEXHU2ODNDXHU1RjBGLFx1NTk4MjpnZXRYQWZ0ZXJEYXRlVGltZSgnMjAyMy0xMS0xMSAxMDoyMzo0NScsMSwnZGF5JyksXHU3RUQzXHU2NzlDXHU0RTNBMjAyMy0xMS0xMiAxMDoyMzo0NVxuICAgKiBAcGFyYW0gZGF0ZTpcdTRFM0FcdTRGMjBcdThGQzdcdTY3NjVcdTc2ODRcdTY1RTVcdTY3MUZcbiAgICogQHBhcmFtIG51bTpcdTU3MjhcdTVGNTNcdTUyNERcdTY1RTVcdTY3MUZcdTUyQTBudW0sXHU3QzdCXHU1NzhCXHU0RTNBaW50XG4gICAqIEBwYXJhbSBkYXRlVHlwZTpcdTRFM0FcdTg5ODFcdTUyQTBcdTc2ODRcdTY1RTVcdTY3MUZcdTdDN0JcdTU3OEIsXHU2NzA5XHU1OTgyXHU0RTBCXHU3QzdCXHU1NzhCOidtaW51dGUnLCdob3VyJywnZGF5Jywnd2VlaycsJ21vbnRoJywneWVhcidcdThGRDlcdTUxNkRcdTc5Q0RcdTdDN0JcdTU3OEJcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0WEFmdGVyRGF0ZVRpbWUoZGF0ZTogRGF0ZSB8IHN0cmluZywgbnVtOiBudW1iZXIsIGRhdGVUeXBlOiBkdCkge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5hZGQobnVtLCBkYXRlVHlwZSkuZm9ybWF0KHRoaXMuRl9ZWVlZX01NX0REX0hIX21tX3NzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdTVDMDZcdTRGMjBcdThGQzdcdTY3NjVcdTc2ODRcdTY1RTVcdTY3MUZcdTUxQ0ZcdTUzQkJYXHU2NUU1XHU2NzFGXHU0RTE0XHU2NUY2XHU5NUY0XHU2ODNDXHU1RjBGXHU0RTNBWVlZWS1NTS1ERFx1OEZEOVx1NzlDRFx1NjgzQ1x1NUYwRixcdTU5ODI6Z2V0WEJlZm9yZURhdGUoJzIwMjMtMTEtMTEnLDEsJ2RheScpLFx1N0VEM1x1Njc5Q1x1NEUzQTIwMjMtMTEtMTBcbiAgICogQHBhcmFtIGRhdGU6XHU0RTNBXHU0RjIwXHU4RkM3XHU2NzY1XHU3Njg0XHU2NUU1XHU2NzFGXG4gICAqIEBwYXJhbSBudW06XHU1NzI4XHU1RjUzXHU1MjREXHU2NUU1XHU2NzFGXHU1MkEwbnVtLFx1N0M3Qlx1NTc4Qlx1NEUzQWludFxuICAgKiBAcGFyYW0gZGF0ZVR5cGU6XHU0RTNBXHU4OTgxXHU1MkEwXHU3Njg0XHU2NUU1XHU2NzFGXHU3QzdCXHU1NzhCLFx1NjcwOVx1NTk4Mlx1NEUwQlx1N0M3Qlx1NTc4QjonbWludXRlJywnaG91cicsJ2RheScsJ3dlZWsnLCdtb250aCcsJ3llYXInXHU4RkQ5XHU1MTZEXHU3OUNEXHU3QzdCXHU1NzhCXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldFhCZWZvcmVEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcsIG51bTogbnVtYmVyLCBkYXRlVHlwZTogZHQpIHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZSkuc3VidHJhY3QobnVtLCBkYXRlVHlwZSkuZm9ybWF0KHRoaXMuRl9ZWVlZX01NX0REKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdTVDMDZcdTRGMjBcdThGQzdcdTY3NjVcdTc2ODRcdTY1RTVcdTY3MUZcdTUxQ0ZcdTUzQkJYXHU2NUU1XHU2NzFGXHU0RTE0XHU2NUY2XHU5NUY0XHU2ODNDXHU1RjBGXHU0RTNBWVlZWS1NTS1ERCBISDptbTpzc1x1OEZEOVx1NzlDRFx1NjgzQ1x1NUYwRixcdTU5ODI6Z2V0WEJlZm9yZURhdGVUaW1lKCcyMDIzLTExLTExIDEwOjIzOjQ1JywxLCdkYXknKSxcdTdFRDNcdTY3OUNcdTRFM0EyMDIzLTExLTEwIDEwOjIzOjQ1XG4gICAqIEBwYXJhbSBkYXRlOlx1NEUzQVx1NEYyMFx1OEZDN1x1Njc2NVx1NzY4NFx1NjVFNVx1NjcxRlxuICAgKiBAcGFyYW0gbnVtOlx1NTcyOFx1NUY1M1x1NTI0RFx1NjVFNVx1NjcxRlx1NTJBMGRheSxcdTdDN0JcdTU3OEJcdTRFM0FpbnRcbiAgICogQHBhcmFtIGRhdGVUeXBlOlx1NEUzQVx1ODk4MVx1NTJBMFx1NzY4NFx1NjVFNVx1NjcxRlx1N0M3Qlx1NTc4QixcdTY3MDlcdTU5ODJcdTRFMEJcdTdDN0JcdTU3OEI6J21pbnV0ZScsJ2hvdXInLCdkYXknLCd3ZWVrJywnbW9udGgnLCd5ZWFyJ1x1OEZEOVx1NTE2RFx1NzlDRFx1N0M3Qlx1NTc4QlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRYQmVmb3JlRGF0ZVRpbWUoZGF0ZTogRGF0ZSB8IHN0cmluZywgbnVtOiBudW1iZXIsIGRhdGVUeXBlOiBkdCkge1xuICAgIHJldHVybiBkYXlqcyhkYXRlKS5zdWJ0cmFjdChudW0sIGRhdGVUeXBlKS5mb3JtYXQodGhpcy5GX1lZWVlfTU1fRERfSEhfbW1fc3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1OEJBMVx1N0I5NzJcdTRFMkFcdTY1RTVcdTY3MUZcdTRFNEJcdTk1RjRcdTc2ODRcdTVERUVcdTUwM0NcbiAgICogQHBhcmFtIHN0YXJ0RGF0ZTpcdTVGMDBcdTU5Q0JcdTY1RTVcdTY3MUZcbiAgICogQHBhcmFtIGVuZERhdGU6XHU3RUQzXHU2NzVGXHU2NUU1XHU2NzFGLFx1N0VEM1x1Njc1Rlx1NjVFNVx1NjcxRlx1ODk4MVx1NkJENFx1NUYwMFx1NTlDQlx1NjVFNVx1NjcxRlx1NTkyN1xuICAgKiBAcGFyYW0gZGF0ZVR5cGU6XHU2NUU1XHU2NzFGXHU3QzdCXHU1NzhCLFx1NjcwOVx1NTk4Mlx1NEUwQlx1N0M3Qlx1NTc4QjonbWludXRlJywnaG91cicsJ2RheScsJ3dlZWsnLCdtb250aCcsJ3llYXInXHU4RkQ5XHU1MTZEXHU3OUNEXHU3QzdCXHU1NzhCXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldERhdGVEaWZmKHN0YXJ0RGF0ZTogRGF0ZSB8IHN0cmluZywgZW5kRGF0ZTogRGF0ZSB8IHN0cmluZywgZGF0ZVR5cGU6IGR0KSB7XG4gICAgcmV0dXJuIGRheWpzKGVuZERhdGUpLmRpZmYoZGF5anMoc3RhcnREYXRlKSwgZGF0ZVR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1NTIyNFx1NjVBRGRhdGUxXHU2NjJGXHU1NDI2XHU1NzI4ZGF0ZTJcdTRFNEJcdTUyNEQsXHU2QkQ0XHU1OTgyOmRhdGUxOjIwMjMtMDEtMDEgMTM6MzA6MjMsZGF0ZTI6MjAyMi0xMi0wMSAxMzozMDoyMyxcdTdFRDNcdTY3OUNcdTRFM0FmYWxzZVxuICAgKiBAcGFyYW0gZGF0ZTFcbiAgICogQHBhcmFtIGRhdGUyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc0JlZm9yZShkYXRlMTogRGF0ZSB8IHN0cmluZywgZGF0ZTI6IERhdGUgfCBzdHJpbmcpIHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZTEpLmlzQmVmb3JlKGRheWpzKGRhdGUyKSk7XG4gIH1cblxuICAvKipcbiAgICogXHU1MjI0XHU2NUFEZGF0ZTFcdTY2MkZcdTU0MjZcdTU3MjhkYXRlMlx1NEU0Qlx1NTQwRSxcdTZCRDRcdTU5ODI6ZGF0ZTE6MjAyMy0wMS0wMSAxMzozMDoyMyxkYXRlMjoyMDIyLTEyLTAxIDEzOjMwOjIzLFx1N0VEM1x1Njc5Q1x1NEUzQXRydWVcbiAgICogQHBhcmFtIGRhdGUxXG4gICAqIEBwYXJhbSBkYXRlMlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaXNBZnRlcihkYXRlMTogRGF0ZSB8IHN0cmluZywgZGF0ZTI6IERhdGUgfCBzdHJpbmcpIHtcbiAgICByZXR1cm4gZGF5anMoZGF0ZTEpLmlzQWZ0ZXIoZGF5anMoZGF0ZTIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdTUyMjRcdTY1QURkYXRlMVx1NjYyRlx1NTQyNlx1NEUwRWRhdGUyXHU3NkY4XHU1NDBDLFx1NkJENFx1NTk4MjpkYXRlMToyMDIzLTAxLTAxIDEzOjMwOjIzLGRhdGUyOjIwMjItMTItMDEgMTM6MzA6MjMsXHU3RUQzXHU2NzlDXHU0RTNBZmFsc2VcbiAgICogQHBhcmFtIGRhdGUxXG4gICAqIEBwYXJhbSBkYXRlMlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaXNTYW1lKGRhdGUxOiBEYXRlIHwgc3RyaW5nLCBkYXRlMjogRGF0ZSB8IHN0cmluZykge1xuICAgIHJldHVybiBkYXlqcyhkYXRlMSkuaXNTYW1lKGRheWpzKGRhdGUyKSk7XG4gIH1cblxuICAvKipcbiAgICogXHU1QzA2XHU0RjIwXHU4RkM3XHU2NzY1XHU3Njg0XHU2NUU1XHU2NzFGXHU4RjZDXHU0RTNBXHU1RjUzXHU1RTc0XHU3Njg0MVx1NjcwODFcdTUzRjdcdTYyMTZcdTgwMDVcdTVGNTNcdTY3MDhcdTc2ODQxXHU1M0Y3XHU2MjE2XHU4MDA1XHU1RjUzXHU1NDY4XHU3Njg0XHU1NDY4XHU0RTAwXG4gICAqIEBwYXJhbSBkYXRlOlx1NEYyMFx1OEZDN1x1Njc2NVx1NjVFNVx1NjcxRlxuICAgKiBAcGFyYW0gZGF0ZVR5cGUsXHU2NUU1XHU2NzFGXHU3QzdCXHU1NzhCLFx1NEUzQTp5ZWFyLG1vbnRoLHdlZWtcdThGRDkzXHU3OUNEXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEVhcmx5RGF5c0RhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZywgZGF0ZVR5cGU6IGR0KSB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLnN0YXJ0T2YoZGF0ZVR5cGUpLmZvcm1hdCh0aGlzLkZfWVlZWV9NTV9ERCk7XG4gIH1cblxuICAvKipcbiAgICogXHU1QzA2XHU0RjIwXHU4RkM3XHU2NzY1XHU3Njg0XHU2NUU1XHU2NzFGXHU4RjZDXHU0RTNBXHU1RjUzXHU1RTc0XHU3Njg0MTJcdTY3MDgzMVx1NTNGN1x1NjIxNlx1ODAwNVx1NUY1M1x1NjcwOFx1NzY4NFx1NjcwMFx1NTQwRVx1NEUwMFx1NTkyOVx1NjIxNlx1ODAwNVx1NUY1M1x1NTQ2OFx1NzY4NFx1NTQ2OFx1NjVFNVxuICAgKiBAcGFyYW0gZGF0ZTpcdTRGMjBcdThGQzdcdTY3NjVcdTY1RTVcdTY3MUZcbiAgICogQHBhcmFtIGRhdGVUeXBlLFx1NjVFNVx1NjcxRlx1N0M3Qlx1NTc4QixcdTRFM0E6eWVhcixtb250aCx3ZWVrXHU4RkQ5M1x1NzlDRFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRMYXN0RGF5c0RhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZywgZGF0ZVR5cGU6IGR0KSB7XG4gICAgcmV0dXJuIGRheWpzKGRhdGUpLmVuZE9mKGRhdGVUeXBlKS5mb3JtYXQodGhpcy5GX1lZWVlfTU1fREQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1ODNCN1x1NTNENjJcdTRFMkFcdTY1RTVcdTY3MUZcdTRFNEJcdTk1RjRcdTc2ODRcdTYyNDBcdTY3MDlcdTY1RTVcdTY3MUYsXHU1MzA1XHU2MkVDXHU1RjAwXHU1OUNCXHU2NUU1XHU2NzFGXHU1NDhDXHU3RUQzXHU2NzVGXHU2NUU1XHU2NzFGLFx1NTk4MjpnZXRJbnRlcm1lZGlhdGVEYXRlKCcyMDIzLTEyLTAxJywnMjAyMy0xMi0xNScsMSwnZGF5JykpXG4gICAqIEBwYXJhbSBzdGFydERhdGU6XHU1RjAwXHU1OUNCXHU2NUU1XHU2NzFGXG4gICAqIEBwYXJhbSBlbmREYXRlOlx1N0VEM1x1Njc1Rlx1NjVFNVx1NjcxRlx1ODk4MVx1NTkyN1x1NEU4RVx1NUYwMFx1NTlDQlx1NjVFNVx1NjcxRlxuICAgKiBAcGFyYW0gbnVtOlx1NTcyOFx1NUYwMFx1NTlDQlx1NjVFNVx1NjcxRlx1NEUwQVx1NTJBMG51bSxpbnRcdTdDN0JcdTU3OEIsXHU1OTgyXHU2NzlDZGF0ZVR5cGVcdTRFM0FkYXksbnVtXHU0RTNBMVx1OTBBM1x1NEU0OFx1NUMzMVx1NjYyRlx1NTcyOFx1NUYwMFx1NTlDQlx1NjVFNVx1NjcxRlx1NEUwQVx1NTJBMFx1NEUwMFx1NTkyOVxuICAgKiBAcGFyYW0gZGF0ZVR5cGUsXHU2NUU1XHU2NzFGXHU3QzdCXHU1NzhCLFx1N0M3Qlx1NTc4Qlx1NTk4Mlx1NEUwQjonbWludXRlJywnaG91cicsJ2RheScsJ3dlZWsnLCdtb250aCcsJ3llYXInXHU4RkQ5XHU1MTZEXHU3OUNEXHU3QzdCXHU1NzhCXG4gICAqIEByZXR1cm5zIHsqW119XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEludGVybWVkaWF0ZURhdGUoc3RhcnREYXRlOiBEYXRlIHwgc3RyaW5nLCBlbmREYXRlOiBEYXRlIHwgc3RyaW5nLCBudW06IG51bWJlciwgZGF0ZVR5cGU6IGR0KSB7XG4gICAgLy9cdTU4RjBcdTY2MEVcdTRFMDBcdTRFMkFcdTY1NzBcdTdFQzRcdTc1MjhcdTY3NjVcdTVCNThcdTY1M0VcdTYyNDBcdTY3MDlcdTY1RTVcdTY3MUYsXHU5RUQ4XHU4QkE0XHU2MjhBXHU1RjAwXHU1OUNCXHU2NUU1XHU2NzFGXHU2NTNFXHU4RkRCXHU2NTcwXHU3RUM0XHU5MUNDXHU5NzYyLFx1NEUwRFx1NzEzNlx1NUMxMVx1NEUwMFx1NEUyQVx1NUYwMFx1NTlDQlx1NjVFNVx1NjcxRlx1NjU3MFx1NjM2RVxuICAgIGxldCBkYXlzQXJyYXkgPSBbc3RhcnREYXRlXTtcbiAgICAvL1x1NTIyNFx1NjVBRHN0YXJ0RGF0ZVx1NjYyRlx1NTQyNlx1NTcyOGVuZERhdGVcdTRFNEJcdTUyNERcbiAgICB3aGlsZSAoZGF0ZS5pc0JlZm9yZShzdGFydERhdGUsIGVuZERhdGUpKSB7XG4gICAgICAvL1x1NTk4Mlx1Njc5Q1x1NUYwMFx1NTlDQlx1NjVFNVx1NjcxRlx1NTcyOFx1N0VEM1x1Njc1Rlx1NjVFNVx1NjcxRlx1NEU0Qlx1NTI0RCxcdTkwQTNcdTRFNDhcdTVDMzFcdTVDMDZcdTVGMDBcdTU5Q0JcdTY1RTVcdTY3MUZcdTUyQTBudW0sXHU1RTc2XHU5MUNEXHU2NUIwXHU4RDRCXHU1MDNDXHU3RUQ5XHU1RjAwXHU1OUNCXHU2NUU1XHU2NzFGLFx1NEUwRFx1NzEzNlx1NEYxQVx1NkI3Qlx1NUZBQVx1NzNBRlxuICAgICAgc3RhcnREYXRlID0gZGF0ZS5nZXRYQWZ0ZXJEYXRlKHN0YXJ0RGF0ZSwgbnVtLCBkYXRlVHlwZSk7XG4gICAgICAvL1x1NUMwNlx1OEJBMVx1N0I5N1x1NTQwRVx1NzY4NFx1NjVFNVx1NjcxRlx1NjUzRVx1OEZEQlx1NjU3MFx1N0VDNFx1OTFDQ1x1OTc2MlxuICAgICAgZGF5c0FycmF5LnB1c2goc3RhcnREYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXNBcnJheTtcbiAgfVxuXG5cblxuICBwdWJsaWMgc3RhdGljIGZvcm1hdERhdGVUaW1lKHRpbWVzdGFtcDogbnVtYmVyLCBmb3JtYXRTdHJpbmc6IHN0cmluZykge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IGhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgY29uc3QgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICBjb25zdCBmb3JtYXRNYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XG4gICAgICAnWVlZWSc6IHllYXIsXG4gICAgICAnTU0nOiBtb250aCA8IDEwID8gJzAnICsgbW9udGggOiBtb250aCxcbiAgICAgICdERCc6IGRheSA8IDEwID8gJzAnICsgZGF5IDogZGF5LFxuICAgICAgJ0hIJzogaG91ciA8IDEwID8gJzAnICsgaG91ciA6IGhvdXIsXG4gICAgICAnbW0nOiBtaW51dGUgPCAxMCA/ICcwJyArIG1pbnV0ZSA6IG1pbnV0ZSxcbiAgICAgICdzcyc6IHNlY29uZCA8IDEwID8gJzAnICsgc2Vjb25kIDogc2Vjb25kXG4gICAgfTtcblxuICAgIHJldHVybiBmb3JtYXRTdHJpbmcucmVwbGFjZSgvKFlZWVl8TU18RER8SEh8bW18c3MpL2csIG1hdGNoID0+IGZvcm1hdE1hcFttYXRjaF0pO1xuICB9XG59XG5cblxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGFyY3kvbXdwLzEtbG93LWNvZGluZy9wYWNrYWdlcy9hbGEtZWRpdG9yL3NyYy91dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RhcmN5L213cC8xLWxvdy1jb2RpbmcvcGFja2FnZXMvYWxhLWVkaXRvci9zcmMvdXRpbHMvbG9nZ2VyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kYXJjeS9td3AvMS1sb3ctY29kaW5nL3BhY2thZ2VzL2FsYS1lZGl0b3Ivc3JjL3V0aWxzL2xvZ2dlci50c1wiOy8qXG4gKiBAQXV0aG9yOiBkYXJjeS56aGFuZyAsIHRlY2guZGFyY3kuemhhbmdAb3V0bG9vay5jb21cbiAqIEBEYXRlOiAyMDI0LTEwLTE0IDExOjA0OjE3XG4gKiBATGFzdEVkaXRvcnM6IGRhcmN5LnpoYW5nICwgdGVjaC5kYXJjeS56aGFuZ0BvdXRsb29rLmNvbVxuICogQExhc3RFZGl0VGltZTogMjAyNS0wNi0xMSAxNjowMDowNFxuICogQEZpbGVQYXRoOiAvMS1sb3ctY29kaW5nL3BhY2thZ2VzL2FsYS1lZGl0b3Ivc3JjL3V0aWxzL2xvZ2dlci50c1xuICogQERlc2NyaXB0aW9uOiBcdTY1RTVcdTVGRDdcdTVERTVcdTUxNzdcdTdDN0JcdUZGMENcdTYzRDBcdTRGOUJpbmZvXHUzMDAxd2Fyblx1MzAwMXN1Y2Nlc3NcdTU0OENlcnJvciA0XHU3OUNEXHU3QzdCXHU1NzhCXHU2NUU1XHU1RkQ3XG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAyNCBieSBcdTMwMTAgdGVjaC5kYXJjeS56aGFuZ0BvdXRsb29rLmNvbSBcdTMwMTEsIEFsbCBSaWdodHMgUmVzZXJ2ZWQuIFxuICovXG5pbXBvcnQgeyBkYXRlIH0gZnJvbSAnLi9kYXRlJztcblxuLy8gdXRpbHMvTG9nZ2VyLnRzXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgcHJpdmF0ZSBwcmVmaXg6IHN0cmluZztcbiAgcHJpdmF0ZSBlbnZfdHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByZWZpeDogc3RyaW5nKSB7XG4gICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgdGhpcy5lbnZfdHlwZSA9IGltcG9ydC5tZXRhLmVudj8uTU9ERVxuICB9XG4gIGdldENhbGxlckZpbGVOYW1lKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjayB8fCAnJztcbiAgICBjb25zdCBsaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICBsZXQgZmlsZV9uYW1lID0gJ25vIGZpbGUgbmFtZSc7XG4gICAgaWYgKGxpbmVzLmxlbmd0aCA+IDMpIHtcbiAgICAgIGNvbnN0IGZvdXJ0aExpbmUgPSBsaW5lc1szXS50cmltKCk7IC8vIFx1NzlGQlx1OTY2NFx1OTk5Nlx1NUMzRVx1N0E3QVx1NjgzQ1xuICAgICAgY29uc3QgZmlsZV9uYW1lX21hdGNoID0gZm91cnRoTGluZS5tYXRjaCgvW14vP10rKD89XFw/KS8pO1xuXG4gICAgICBjb25zdCBmaWxlX3VybF9tYXRjaCA9IGZvdXJ0aExpbmUubWF0Y2goL1xcKCguKj8pXFwpLyk7XG4gICAgICBjb25zdCBmaWxlX3VybCA9IGZpbGVfdXJsX21hdGNoID8gZmlsZV91cmxfbWF0Y2hbMV0gOiBmaWxlX25hbWU7XG5cbiAgICAgIGlmIChmaWxlX25hbWVfbWF0Y2gpIHtcbiAgICAgICAgZmlsZV9uYW1lID0gZmlsZV9uYW1lX21hdGNoWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBmb3VydGhMaW5lLm1hdGNoKC9cXC8oW15cXC9dKykkLyk7XG4gICAgICAgIGZpbGVfbmFtZSA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnbm8gZmlsZSBuYW1lJztcbiAgICAgICAgZmlsZV9uYW1lID0gZmlsZV9uYW1lLnNwbGl0KCc6JylbMF1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbGVfbmFtZS5wYWRFbmQoNDAsICcgJyk7XG4gIH1cbiAgZ2V0Q2FsbGVyRmlsZUxpbmsoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrIHx8ICcnO1xuICAgIGNvbnN0IGxpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIGxldCBmaWxlX25hbWUgPSAnbm8gZmlsZSBuYW1lJztcbiAgICBpZiAobGluZXMubGVuZ3RoID4gMykge1xuICAgICAgY29uc3QgZm91cnRoTGluZSA9IGxpbmVzWzNdLnRyaW0oKTsgLy8gXHU3OUZCXHU5NjY0XHU5OTk2XHU1QzNFXHU3QTdBXHU2ODNDXG4gICAgICBjb25zdCBmaWxlX25hbWVfbWF0Y2ggPSBmb3VydGhMaW5lLm1hdGNoKC9bXi8/XSsoPz1cXD8pLyk7XG5cbiAgICAgIGNvbnN0IGZpbGVfdXJsX21hdGNoID0gZm91cnRoTGluZS5tYXRjaCgvXFwoKC4qPylcXCkvKTtcbiAgICAgIGNvbnN0IGZpbGVfdXJsID0gZmlsZV91cmxfbWF0Y2ggPyBmaWxlX3VybF9tYXRjaFsxXSA6IGZpbGVfbmFtZTtcblxuICAgICAgaWYgKGZpbGVfbmFtZV9tYXRjaCkge1xuICAgICAgICBmaWxlX25hbWUgPSBmaWxlX25hbWVfbWF0Y2hbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXRjaCA9IGZvdXJ0aExpbmUubWF0Y2goL1xcLyhbXlxcL10rKSQvKTtcbiAgICAgICAgLy8gZmlsZV9uYW1lID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICdubyBmaWxlIG5hbWUnO1xuICAgICAgICBmaWxlX25hbWUgPSBmaWxlX3VybFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWxlX25hbWU7XG4gIH1cbiAgLyoqXG4gICAqIFx1NjI1M1x1NTM3MCBcdTMwMTAgXHU2NjZFXHU5MDFBIFx1MzAxMVx1NjVFNVx1NUZEN1x1NEZFMVx1NjA2RlxuICAgKiBAcGFyYW0gbWVzc2FnZSBcdTRFM0JcdTY1RTVcdTVGRDdcdTRGRTFcdTYwNkZcbiAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIFx1NTNFRlx1OTAwOVx1MzAxMFx1NTkxQVx1Njc2MVx1MzAxMVx1NjVFNVx1NUZEN1x1NEZFMVx1NjA2RlxuICAgKi9cbiAgaW5mbyhtZXNzYWdlOiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGUuY3VycmVudERhdGVUaW1lX1lZWVlfTU1fRERfX0hIX21tX3NzKCk7XG4gICAgY29uc3QgZmlsZV9uYW1lID0gdGhpcy5nZXRDYWxsZXJGaWxlTmFtZSgpO1xuICAgIGNvbnN0IGZpbGVfbGluayA9IHRoaXMuZ2V0Q2FsbGVyRmlsZUxpbmsoKTtcblxuICAgIG1lc3NhZ2UgPSB0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSA6IG1lc3NhZ2U7XG4gICAgY29uc3Qgb3A6IGFueSA9IFtdO1xuICAgIG9wdGlvbmFsUGFyYW1zLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgICBvcC5wdXNoKHR5cGVvZiBwYXJhbSA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShwYXJhbSkgOiBwYXJhbSk7XG4gICAgfSk7XG4gICAgb3B0aW9uYWxQYXJhbXMgPSBvcDtcblxuICAgIGNvbnN0IGxvZ01lc3NhZ2UgPSBgJHt0aW1lc3RhbXB9IC0gJHt0aGlzLnByZWZpeH0gLSBbICR7ZmlsZV9uYW1lfSBdIDogJHttZXNzYWdlfSAgICAtLS0gJHtmaWxlX2xpbmt9YDtcbiAgICB0aGlzLm91dHB1dENvbnNvbGUobG9nTWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xuICAgIHRoaXMub3V0cHV0Tm9kZUNvbnNvbGUobG9nTWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xuICB9XG4gIC8qKlxuICAgKiBcdTYyNTNcdTUzNzAgXHUzMDEwIFx1OTUxOVx1OEJFRiBcdTMwMTFcdTY1RTVcdTVGRDdcdTRGRTFcdTYwNkZcbiAgICogQHBhcmFtIG1lc3NhZ2UgXHU0RTNCXHU2NUU1XHU1RkQ3XHU0RkUxXHU2MDZGXG4gICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBcdTUzRUZcdTkwMDlcdTMwMTBcdTU5MUFcdTY3NjFcdTMwMTFcdTY1RTVcdTVGRDdcdTRGRTFcdTYwNkZcbiAgICovXG4gIGVycm9yKG1lc3NhZ2U6IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZGF0ZS5jdXJyZW50RGF0ZVRpbWVfWVlZWV9NTV9ERF9fSEhfbW1fc3MoKTtcbiAgICBjb25zdCBmaWxlX25hbWUgPSB0aGlzLmdldENhbGxlckZpbGVOYW1lKCk7XG4gICAgY29uc3QgZmlsZV9saW5rID0gdGhpcy5nZXRDYWxsZXJGaWxlTGluaygpO1xuXG4gICAgbWVzc2FnZSA9IHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpIDogbWVzc2FnZTtcbiAgICBjb25zdCBvcDogYW55ID0gW107XG4gICAgb3B0aW9uYWxQYXJhbXMuZm9yRWFjaCgocGFyYW0pID0+IHtcbiAgICAgIG9wLnB1c2godHlwZW9mIHBhcmFtID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHBhcmFtKSA6IHBhcmFtKTtcbiAgICB9KTtcbiAgICBvcHRpb25hbFBhcmFtcyA9IG9wO1xuXG4gICAgY29uc3QgbG9nTWVzc2FnZSA9IGAke3RpbWVzdGFtcH0gLSAke3RoaXMucHJlZml4fSAtIFsgJHtmaWxlX25hbWV9IF0gOiAke21lc3NhZ2V9ICAgIC0tLSAke2ZpbGVfbGlua31gO1xuICAgIHRoaXMub3V0cHV0Q29uc29sZUVycm9yKGxvZ01lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcbiAgICB0aGlzLm91dHB1dE5vZGVDb25zb2xlKGxvZ01lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcbiAgfVxuICAvKipcbiAgICogXHU2MjUzXHU1MzcwIFx1MzAxMCBcdThCNjZcdTU0NEEgXHUzMDExXHU2NUU1XHU1RkQ3XHU0RkUxXHU2MDZGXG4gICAqIEBwYXJhbSBtZXNzYWdlIFx1NEUzQlx1NjVFNVx1NUZEN1x1NEZFMVx1NjA2RlxuICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgXHU1M0VGXHU5MDA5XHUzMDEwXHU1OTFBXHU2NzYxXHUzMDExXHU2NUU1XHU1RkQ3XHU0RkUxXHU2MDZGXG4gICAqL1xuICB3YXJuKG1lc3NhZ2U6IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZGF0ZS5jdXJyZW50RGF0ZVRpbWVfWVlZWV9NTV9ERF9fSEhfbW1fc3MoKTtcbiAgICBjb25zdCBmaWxlX25hbWUgPSB0aGlzLmdldENhbGxlckZpbGVOYW1lKCk7XG4gICAgY29uc3QgZmlsZV9saW5rID0gdGhpcy5nZXRDYWxsZXJGaWxlTGluaygpO1xuXG4gICAgbWVzc2FnZSA9IHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpIDogbWVzc2FnZTtcbiAgICBjb25zdCBvcDogYW55ID0gW107XG4gICAgb3B0aW9uYWxQYXJhbXMuZm9yRWFjaCgocGFyYW0pID0+IHtcbiAgICAgIG9wLnB1c2godHlwZW9mIHBhcmFtID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHBhcmFtKSA6IHBhcmFtKTtcbiAgICB9KTtcbiAgICBvcHRpb25hbFBhcmFtcyA9IG9wO1xuXG4gICAgY29uc3QgbG9nTWVzc2FnZSA9IGAke3RpbWVzdGFtcH0gLSAke3RoaXMucHJlZml4fSAtIFsgJHtmaWxlX25hbWV9IF0gOiAke21lc3NhZ2V9ICAgIC0tLSAke2ZpbGVfbGlua31gO1xuICAgIHRoaXMub3V0cHV0Q29uc29sZVdhcm4obG9nTWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xuICAgIHRoaXMub3V0cHV0Tm9kZUNvbnNvbGUobG9nTWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1NjI1M1x1NTM3MCBcdTMwMTAgXHU2MjEwXHU1MjlGIFx1MzAxMVx1NjVFNVx1NUZEN1x1NEZFMVx1NjA2RlxuICAgKiBAcGFyYW0gbWVzc2FnZSBcdTRFM0JcdTY1RTVcdTVGRDdcdTRGRTFcdTYwNkZcbiAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIFx1NTNFRlx1OTAwOVx1MzAxMFx1NTkxQVx1Njc2MVx1MzAxMVx1NjVFNVx1NUZEN1x1NEZFMVx1NjA2RlxuICAgKi9cbiAgc3VjY2VzcyhtZXNzYWdlOiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGUuY3VycmVudERhdGVUaW1lX1lZWVlfTU1fRERfX0hIX21tX3NzKCk7XG4gICAgY29uc3QgZmlsZV9uYW1lID0gdGhpcy5nZXRDYWxsZXJGaWxlTmFtZSgpO1xuICAgIGNvbnN0IGZpbGVfbGluayA9IHRoaXMuZ2V0Q2FsbGVyRmlsZUxpbmsoKTtcblxuICAgIG1lc3NhZ2UgPSB0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSA6IG1lc3NhZ2U7XG4gICAgY29uc3Qgb3A6IGFueSA9IFtdO1xuICAgIG9wdGlvbmFsUGFyYW1zLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgICBvcC5wdXNoKHR5cGVvZiBwYXJhbSA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShwYXJhbSkgOiBwYXJhbSk7XG4gICAgfSk7XG4gICAgb3B0aW9uYWxQYXJhbXMgPSBvcDtcblxuICAgIGNvbnN0IGxvZ01lc3NhZ2UgPSBgJHt0aW1lc3RhbXB9IC0gJHt0aGlzLnByZWZpeH0gLSBbICR7ZmlsZV9uYW1lfSBdIDogJHttZXNzYWdlfSAgICAtLS0gJHtmaWxlX2xpbmt9YDtcbiAgICB0aGlzLm91dHB1dENvbnNvbGVHcmVlbihsb2dNZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XG4gICAgdGhpcy5vdXRwdXROb2RlQ29uc29sZShsb2dNZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XG4gIH1cblxuICBwcml2YXRlIG91dHB1dENvbnNvbGUobWVzc2FnZTogc3RyaW5nLCBvcHRpb25hbFBhcmFtczogYW55W10pIHtcblxuICAgIC8vIFx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NjNBN1x1NTIzNlx1NTNGMFx1OEY5M1x1NTFGQVx1NjVFNVx1NUZEN1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmVudl90eXBlID09PSAnZGV2Jykge1xuXG4gICAgICAvLyBcdTRGN0ZcdTc1MjhcdTZCNjNcdTUyMTlcdTg4NjhcdThGQkVcdTVGMEZcdTUzMzlcdTkxNERcdTdCMkNcdTRFMDBcdTRFMkFcdTMwMTBcdTUyMzBcdTY3MDBcdTU0MEVcdTRFMDBcdTRFMkFcdTMwMTFcdTRFNEJcdTk1RjRcdTc2ODRcdTYyNDBcdTY3MDlcdTUxODVcdTVCQjlcbiAgICAgIGNvbnN0IHJlZ2V4ID0gL1x1MzAxMCguKj8pXHUzMDExLztcbiAgICAgIGNvbnN0IG1hdGNoID0gbWVzc2FnZS5tYXRjaChyZWdleCk7XG5cbiAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgICAvLyBcdTVDMDZcdTUzMzlcdTkxNERcdTUyMzBcdTc2ODRcdTUxODVcdTVCQjlcdThCQkVcdTdGNkVcdTRFM0FcdTdFQTJcdTgyNzJcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttZXNzYWdlLnN1YnN0cmluZygwLCBtYXRjaC5pbmRleCl9XHUzMDEwJWMke21hdGNoWzFdfSVjXHUzMDExJHttZXNzYWdlLnN1YnN0cmluZyhtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCl9YCxcbiAgICAgICAgICAnJywgLy8gXHU1MzM5XHU5MTREXHU1MjMwXHU3Njg0XHU1MTg1XHU1QkI5XHU0RTRCXHU1MjREXHU3Njg0XHU2ODM3XHU1RjBGXHVGRjA4XHU5RUQ4XHU4QkE0XHU2ODM3XHU1RjBGXHVGRjA5XG4gICAgICAgICAgJ2NvbG9yOiByZWQ7JywgLy8gXHUzMDEwXHU1NDhDXHUzMDExXHU0RTRCXHU5NUY0XHU3Njg0XHU1MTg1XHU1QkI5XHU4QkJFXHU3RjZFXHU0RTNBXHU3RUEyXHU4MjcyXG4gICAgICAgICAgJycpOyAvLyBcdTMwMTBcdTU0OENcdTMwMTFcdTRFNEJcdTk1RjRcdTc2ODRcdTUxODVcdTVCQjlcdTRFNEJcdTU0MEVcdTc2ODRcdTY4MzdcdTVGMEZcdUZGMDhcdTlFRDhcdThCQTRcdTY4MzdcdTVGMEZcdUZGMDlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NkNBMVx1NjcwOVx1NTMzOVx1OTE0RFx1NTIzMFx1MzAxMFx1MzAxMVx1RkYwQ1x1NTIxOVx1NzZGNFx1NjNBNVx1OEY5M1x1NTFGQVx1NTM5Rlx1NTlDQlx1NUI1N1x1N0IyNlx1NEUzMlxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb3B0aW9uYWxQYXJhbXMuZm9yRWFjaCgocGFyYW0pID0+IGNvbnNvbGUubG9nKGAgICAgPj4gJHtwYXJhbX1gKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvdXRwdXRDb25zb2xlRXJyb3IobWVzc2FnZTogc3RyaW5nLCBvcHRpb25hbFBhcmFtczogYW55W10pIHtcbiAgICAvLyBcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTYzQTdcdTUyMzZcdTUzRjBcdThGOTNcdTUxRkFcdTY1RTVcdTVGRDdcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5lbnZfdHlwZSA9PT0gJ2RldicpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCAnY29sb3I6IHJlZDsgZm9udC13ZWlnaHQ6IGJvbGQ7Jyk7XG4gICAgICBpZiAob3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBvcHRpb25hbFBhcmFtcy5mb3JFYWNoKChwYXJhbSkgPT4gY29uc29sZS5sb2coYCVjICAgID4+ICR7cGFyYW19YCwgJ2NvbG9yOiByZWQ7JykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb3V0cHV0Q29uc29sZVdhcm4obWVzc2FnZTogc3RyaW5nLCBvcHRpb25hbFBhcmFtczogYW55W10pIHtcbiAgICAvLyBcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTYzQTdcdTUyMzZcdTUzRjBcdThGOTNcdTUxRkFcdTY1RTVcdTVGRDdcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5lbnZfdHlwZSA9PT0gJ2RldicpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCAnY29sb3I6IG9yYW5nZTsnKTtcbiAgICAgIGlmIChvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG9wdGlvbmFsUGFyYW1zLmZvckVhY2goKHBhcmFtKSA9PiBjb25zb2xlLmxvZyhgJWMgICAgPj4gJHtwYXJhbX1gLCAnY29sb3I6IG9yYW5nZTsnKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHByaXZhdGUgb3V0cHV0Q29uc29sZUdyZWVuKG1lc3NhZ2U6IHN0cmluZywgb3B0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgLy8gXHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU2M0E3XHU1MjM2XHU1M0YwXHU4RjkzXHU1MUZBXHU2NUU1XHU1RkQ3XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZW52X3R5cGUgPT09ICdkZXYnKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgJ2NvbG9yOiBncmVlbjsgZm9udC13ZWlnaHQ6IGJvbGQ7Jyk7XG4gICAgICBpZiAob3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBvcHRpb25hbFBhcmFtcy5mb3JFYWNoKChwYXJhbSkgPT4gY29uc29sZS5sb2coYCVjICAgID4+ICR7cGFyYW19YCwgJ2NvbG9yOiBncmVlbjsnKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvdXRwdXROb2RlQ29uc29sZShtZXNzYWdlOiBzdHJpbmcsIG9wdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuXG4gICAgLy8gXHU1NzI4IE5vZGUuanMgXHU2M0E3XHU1MjM2XHU1M0YwXHU4RjkzXHU1MUZBXHU2NUU1XHU1RkQ3XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy5zdGRvdXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgJHttZXNzYWdlfVxcbmApO1xuICAgICAgaWYgKG9wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb3B0aW9uYWxQYXJhbXMuZm9yRWFjaCgocGFyYW0pID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAke3BhcmFtfVxcbmApKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5cbi8vIGZ1bmN0aW9uIGdldExvZ0xldmVsKCk6IHN0cmluZyB7XG4vLyAgIHJldHVybiBpbXBvcnQubWV0YS5lbnYuVklURV9MT0dfTEVWRUwgfHwgJ2RlZmF1bHQnO1xuLy8gfVxuXG4vLyBcdTUyMUJcdTVFRkFcdTRFMDBcdTRFMkFcdTUxNjhcdTVDNDBcdTY1RTVcdTVGRDdcdTVCOUVcdTRGOEJcbmV4cG9ydCBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdhbGEtYXBwJyk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBVUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLHFCQUFxQjtBQUM5QixPQUFPLGlCQUFpQjs7O0FDTHhCLE9BQU8sV0FBVztBQWtDWCxJQUFNLE9BQU4sTUFBTSxNQUFLO0FBQUEsRUFHaEIsT0FBZ0Isd0JBQXdCO0FBQUEsRUFDeEMsT0FBZ0IsZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNL0IsT0FBYyxNQUFNO0FBQ2xCLFdBQU8sS0FBSyxJQUFJO0FBQUEsRUFDbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPQSxPQUFjLFlBQVlBLE9BQVk7QUFDcEMsV0FBTyxNQUFNQSxPQUFNLEtBQUssY0FBYyxJQUFJLEVBQUUsUUFBUTtBQUFBLEVBQ3REO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0EsT0FBYyxnQkFBZ0JBLE9BQVk7QUFDeEMsV0FBTyxNQUFNQSxPQUFNLEtBQUssdUJBQXVCLElBQUksRUFBRSxRQUFRO0FBQUEsRUFDL0Q7QUFB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
