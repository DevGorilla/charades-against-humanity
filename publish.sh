#!/usr/bin/env bash
BUCKET= dwesleybrown.com
DIR= /Users/dbrown0294/Documents/Working/Chirp/Chirpinator/static-site/src/main/webapp/
aws  s3  sync $DIR s3://$BUCKET --profile personal
