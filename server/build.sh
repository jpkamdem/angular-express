#! /bin/sh
docker rmi server-project:1.0
docker build -t server-project:1.0 .