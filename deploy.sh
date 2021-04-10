#!/bin/bash
set -e
set -x
cd playground 
docker-compose down 
docker system prune -a -f
docker-compose up -d
