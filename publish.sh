#!/usr/bin/env bash
BUCKET=charadesagainsthumanity
DIR=/Users/dbrown0294/Documents/Working/charades-against-humanity/static-site/
aws  s3  sync $DIR s3://$BUCKET --profile personal
