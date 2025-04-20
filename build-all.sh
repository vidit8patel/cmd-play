#!/bin/sh
cd game-terminal && npm install && npm run build && cd ..
cd cyber-catcher-vite && npm install && npm run build && cd ..
cd DataStruct-Quest && npm install && npm run build && cd ..
# sql-murder-mystery is static, no build needed
