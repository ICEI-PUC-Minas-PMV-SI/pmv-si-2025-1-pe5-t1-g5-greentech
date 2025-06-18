DOCKER_REPOSITORY=greentech
DOCKER_IMAGE=api-crud-funcionarios

## build docker image: ARGS: version=<version> - builds the docker image
build_docker:
	@echo Building docker image...
	docker build -t ${DOCKER_REPOSITORY}/${DOCKER_IMAGE}:${version} .
	@echo Done!

## push docker image: ARGS: version=<version> - pushes the docker image to docker hub
push_docker:
	@echo Pushing docker image...
	docker push ${DOCKER_REPOSITORY}/${DOCKER_IMAGE}:${version}
	@echo Done!

## build and push docker image: ARGS: version=<version> - builds and pushes the docker image to docker hub
build_push: build_docker push_docker
	@echo Builded and pushed docker image!