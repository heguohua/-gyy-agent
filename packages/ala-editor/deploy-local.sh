#!/bin/bash
###
 # @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 # @Date: 2025-08-22 18:19:00
 # @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 # @LastEditTime: 2025-08-22 18:19:48
 # @FilePath: /1-low-coding/packages/ala-editor/deploy-local.sh
 # @Description: 
 # 
 # Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
### 

# 

cd ../../


pnpm ep

rm -rf /Users/darcy/gyy_workspace/nginx/data/html/*

cp -r packages/ala-editor/dist/* /Users/darcy/gyy_workspace/nginx/data/html/

docker exec -it nginx sh -c "chown -R gyy:gyy /gyy_workspace/data/html"

docker restart nginx
