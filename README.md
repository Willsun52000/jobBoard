# testProject
## 简介
免费开源职位发布平台

## 安装mongodb
mongoexport -u will -p Accenture319 -d sampledb -c employee -o 0404.json

## 安装jobboard
a [Sails](http://sailsjs.org) application


## Create a /etc/yum.repos.d/mongodb-org-3.4.repo file so that you can install MongoDB directly, using yum.
Use the following repository file:

Copy
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

## Install the MongoDB packages and associated tools
sudo yum install -y mongodb-org

## Start MongoDB
sudo service mongod start

## Verify that MongoDB has started successfully
sudo chkconfig mongod on

## Stop MongoDB
sudo service mongod stop

## Restart MongoDB
sudo service mongod restart
