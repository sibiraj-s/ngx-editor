# open build folder and publish
cd build && npm publish

# remove distribution directories
rm -rf .ng_build
rm -rf dist/