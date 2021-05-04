#
# Docker Makefile
#

# Makefile Script Version
VERSION=1.1.1

# Global Variables
PORT?=8105

APP_NAME=gen4-servicetech-app
DISPLAY_NAME=Gen 4 Service Tech App

IMAGE_NAME=$(APP_NAME)
CONTAINER_NAME=$(APP_NAME)

PRE_BUILD_COMMAND=npm run build

DOCKER_VOLUMES=\
--mount type=bind,source="$(CURDIR)/build/",target=/usr/share/nginx/html,readonly

# Register Commands that do not build artifacts
.PHONY: help build pull pull-latest run start stop restart login shell status version

# Help Documentation for all Tasks

help: ## Help Documentation
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "%-30s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Docker Build
build: ## Build the Docker Image
	@$(PRE_BUILD_COMMAND)
	@docker build -t ricado/$(IMAGE_NAME) .

# Docker Pull
pull: login pull-latest ## Login and Pull the `latest` Docker Image

pull-latest: ## Pull the `latest` Tag of the Docker Image
	@docker pull ricado/$(IMAGE_NAME):latest

# Docker Run
run: ## Run the Docker Container in Interactive Mode
	@echo "Running ricado/"$(IMAGE_NAME) "as Daemon on Port" $(PORT);
	@docker run -it --rm --name $(CONTAINER_NAME) $(DOCKER_VOLUMES) -p $(PORT):80 ricado/$(IMAGE_NAME)

start: ## Start the Docker Container in Daemon Mode
	@echo "Running ricado/"$(IMAGE_NAME) "as Daemon on Port" $(PORT);
	@docker run -d --rm --name $(CONTAINER_NAME) $(DOCKER_VOLUMES) -p $(PORT):80 ricado/$(IMAGE_NAME)

stop: ## Stop the Docker Container
	-@docker stop $(CONTAINER_NAME)

restart: stop start ## Stop and Start the Docker Container

# Docker Login
login: ## Login to Docker Hub
	@docker login

# Docker Logs
logs: ## Live Tail the Docker Container Logs
	@docker logs -f $(CONTAINER_NAME)

shell: ## Run an Interactive Shell on the Docker Container
	@docker exec -it $(CONTAINER_NAME) /bin/bash

status: ## Show the Docker Container Status
	@docker ps -f name=$(CONTAINER_NAME)

version: ## Output the Makefile Version
	@echo "Docker Makefile Version" $(VERSION);
