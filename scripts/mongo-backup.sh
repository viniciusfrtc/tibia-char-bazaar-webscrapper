#!/bin/bash
mongodump --db char-bazaar --collection auctions --out ./backups/`date +"%m-%d-%y_%H:%M:%S"`