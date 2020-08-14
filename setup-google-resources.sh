#!/bin/bash

# Create the Bucket
gsutil mb -b on gs://termbee

# Allow public accesss to bucket
gsutil iam ch allUsers:objectViewer gs://termbee

# Speciality pages for web site
gsutil web set -m index.html gs://termbee
