PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
| sed 's/[",]//g')
TAGGED_IMAGE=$DOCKER_USERNAME/rewt:$PACKAGE_VERSION
echo $PACKAGE_VERSION
ls -la
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t rewt .
docker images
echo $TAGGED_IMAGE
docker tag rewt $TAGGED_IMAGE
docker push $TAGGED_IMAGE