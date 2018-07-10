IMAGE_NAME ?= hippware/wocky-client

help:
	@echo "$(IMAGE_NAME):latest"
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run: ## Run the Docker image
	docker run --rm -it $(IMAGE_NAME):latest

sh: ## Boot to a shell prompt
	docker run --rm -it $(IMAGE_NAME):latest /bin/sh

build: ## Build the Docker image
	docker build --force-rm -t $(IMAGE_NAME):latest .

clean: ## Clean up generated images
	@docker rmi --force $(IMAGE_NAME):latest

rebuild: clean build ## Rebuild the Docker image
