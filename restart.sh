#!/usr/bin/env bash

cd "$(dirname "$0")"
echo "1/7 pull from repository"
git reset --hard HEAD
git pull

#cd frontend
#echo "2/7 install/update npm packages"
#npm i
#echo "3/7 build frontend"
#npm run build

#echo "4/7 install/update python packages"
##cd ..
#source backend/venv/bin/activate
#pip install -r requirements.txt --user

#cd backend
#echo "5/7 migrate database"
#python manage.py migrate
#deactivate

echo "6/7 deploy frontend"
cd frontend
rm -r dist
mkdir dist
cp base.htaccess dist/.htaccess
cp -r dist_tmp/* dist

echo "6/7 deploy backend"
cd ../backend
rm -r dist
mkdir dist
cp -r dist_tmp/* dist

npx prisma generate

echo "7/7 restart server"
supervisorctl restart gamesdb

