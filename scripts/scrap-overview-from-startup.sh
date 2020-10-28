#!/bin/bash
sudo systemctl start mongod
npm run scrap-auctions-list
sh ./scripts/mongo-backup.sh
