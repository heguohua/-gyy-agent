#!/bin/bash


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

tar -zcf source.tgz source

rm -rf source

# 提交源代码
git add . -A
git commit -m 'update'
git push
