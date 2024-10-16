## Login to your Google Cloud Account with SSO
gcloud auth login 

## Set Project
gcloud config set project colin-hanbury-showcase

## Build image
docker build . --no-cache -t colin-hanbury-restful-api

## Tag image with registry name
docker tag colin-hanbury-restful-api australia-southeast2-docker.pkg.dev/colin-hanbury-showcase/restful-api-artifacts/colin-hanbury-restful-api

## Get Access Token and impersonate service account
See .env 

## Deploy to artifact registry
docker push australia-southeast2-docker.pkg.dev/colin-hanbury-showcase/restful-api-artifacts/colin-hanbury-restful-api
