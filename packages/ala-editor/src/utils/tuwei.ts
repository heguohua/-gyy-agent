/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 10:32:22
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 11:16:59
 * @FilePath: /low-coding/packages/ala-editor/src/utils/tuwei.ts
 * @Description: 快速获取土味情话工具类
 *
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved.
 */
import req from './req';

const url = '/tuwei';

let msgObj = reactive({
  code: '',
  content: '',
});

export async function queryLoveMessage() {
  let resp = await req.get(url);
  Object.assign(msgObj, resp);
  let { content } = msgObj;
  return content;
}
