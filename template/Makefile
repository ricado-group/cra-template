#
# Docker Makefile
#

# Makefile Script Version
VERSION=1.1.1

# Global Variables
# TODO: Choose a Port Number that doesn't clash with other RICADO Apps / Containers
PORT?=

# TODO: Change the APP_NAME to match the Docker Container Name
APP_NAME=<app name>
# TODO: Change the DISPLAY_NAME to match the Project Name in Octopus Deploy
DISPLAY_NAME=App Name

IMAGE_NAME=$(APP_NAME)
CONTAINER_NAME=$(APP_NAME)

# Register Commands that do not build artifacts
.PHONY: help build pull pull-latest run start stop restart login shell status version

# Help Documentation for all Tasks

help: ## Help Documentation
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "%-30s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Docker Build
build: ## Build the Docker Image
	@docker build --build-arg NPM_TOKEN=$(NPM_TOKEN) -t ricado/$(IMAGE_NAME) .

# Docker Pull
pull: login pull-latest ## Login and Pull the `latest` Docker Image

pull-latest: ## Pull the `latest` Tag of the Docker Image
	@docker pull ricado/$(IMAGE_NAME):latest

# Docker Run
run: ## Run the Docker Container in Interactive Mode
	@echo "Running ricado/"$(IMAGE_NAME) "as Daemon on Port" $(PORT);
	@docker run -it --rm --name $(CONTAINER_NAME) -p $(PORT):80 ricado/$(IMAGE_NAME)

start: ## Start the Docker Container in Daemon Mode
	@echo "Running ricado/"$(IMAGE_NAME) "as Daemon on Port" $(PORT);
	@docker run -d --rm --name $(CONTAINER_NAME) -p $(PORT):80 ricado/$(IMAGE_NAME)

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
