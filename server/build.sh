#! /bin/sh
docker rmi express-app:1.0
docker build -t express-app:1.0 .