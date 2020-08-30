#!/bin/bash

# Create the Bucket
gsutil mb -b on gs://termbee

# Allow public accesss to bucket
gsutil iam ch allUsers:objectViewer gs://termbee

# Speciality pages for web site
gsutil web set -m index.html gs://termbee

# Create Serverless function 
# List with gcloud functions list
gcloud functions deploy online2 \
    --trigger-http \
    --region=europe-west1 \
    --runtime=nodejs10 \
    --max-instances=2 \
    --allow-unauthenticated \
    --source=functions/online2
