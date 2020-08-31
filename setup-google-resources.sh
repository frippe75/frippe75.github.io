#!/bin/bash

# Create the Bucket
gsutil mb -b on gs://termbee

# Allow public accesss to bucket
gsutil iam ch allUsers:objectViewer gs://termbee

# Speciality pages for web site
gsutil web set -m index.html gs://termbee

# Create Serverless function https://cloud.google.com/sdk/gcloud/reference/functions/deploy
# List with gcloud functions list
#
# Desc: returns a json with status: 'online'
gcloud functions deploy online \
    --trigger-http \
    --region=europe-west1 \
    --runtime=nodejs10 \
    --max-instances=2 \
    --allow-unauthenticated \
    --source=functions/online
