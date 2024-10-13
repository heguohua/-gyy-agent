#!/bin/bash

# 定义要删除的路径数组
pathsToDelete=(
  'packages/*/dist'
  'packages/*/coverage'
  'packages/*/node_modules'
  'packages/*/pnpm-lock.yaml'
  'packages/*/.pnpm-store'
  'pnpm-lock.yaml'
  'node_modules'
)

# 遍历数组
for path in "${pathsToDelete[@]}"; do
  # 查看当前路径
  echo "Deleting: $path"
  pnpm rimraf $path
done

echo "All directories have been deleted"


