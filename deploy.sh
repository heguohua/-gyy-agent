#!/bin/bash
###
 # @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 # @Date: 2026-01-18 20:48:03
 # @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 # @LastEditTime: 2026-01-19 10:10:27
 # @FilePath: /1-low-coding/deploy.sh
 # @Description: 
 # 
 # Copyright (c) 2026 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
### 


branch=$(git branch --show-current)


cd ../1-low-coding-inner

# 切换分支
git checkout $branch
git pull

rm -rf source*
mkdir source

# 同步代码
rsync -a \
  --exclude=node_modules \
  --exclude=.idea \
  --exclude=.git \
  --exclude=dist \
  --exclude=dist.zip \
  ../1-low-coding/ source/

tar --no-xattrs -zcf source.tgz source

rm -rf source

# 提交源代码
git add . -A
git commit -m 'update'
git push
