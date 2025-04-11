#! /bin/sh
docker rmi angular-app:1.0
docker build -t angular-app:1.0 .