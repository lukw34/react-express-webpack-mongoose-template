PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
| sed 's/[",]//g')
echo $PACKAGE_VERSION
ls -la
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t rewt .
docker images
docker tag rewt $DOCKER_USERNAME/rewt:$PACKAGE_VERSION
docker push $DOCKER_USERNAME/rewt:$PACKAGE_VERSION