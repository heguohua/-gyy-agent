#!/bin/bash

rm -rf dist
rm -f ../dist.tgz

cd ../../

pnpm ep

cd packages/ala-editor/dist
tar -zcvf ../dist.tgz ./
scp ../dist.tgz root@192.168.6.62:/gyy_workspace/nginx/data/

ssh root@192.168.6.62 'cd /gyy_workspace/nginx/data/ && rm -rf html/* && tar -zxvf dist.tgz -C html/ && rm -f dist.tgz && chown -R gyy:gyy /gyy_workspace/nginx/data/html && ls -lh html && docker restart nginx' 
