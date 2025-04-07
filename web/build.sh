#! /bin/sh
docker rmi web-project:1.0
docker build -t web-project:1.0 .