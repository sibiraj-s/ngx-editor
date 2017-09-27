# remove existing builds
rm -rf build/
rm -rf dist/

# build 
./node_modules/.bin/ng-packagr -p ng-package.json

# copy icons to build directory
mkdir build/icons/
cp -r icons/ngx-editor.png build/icons/

# delete unwanted folders
rm -rf .ng_build