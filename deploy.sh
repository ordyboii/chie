#!/bin/bash

# Navigate to the project directory
cd /home/deploy/jbot || exit

# Load env from Github actions into .env file
echo $SLACK_BOT_TOKEN > .env
echo $SLACK_APP_TOKEN >> .env
echo $SLACK_SIGNING_SECRET >> .env
echo $SLACK_CHANNEL_ID >> .env
echo $REPLICATE_API_TOKEN >> .env
echo $REDIS_HOST >> .env
echo $REDIS_PORT >> .env
echo $REDIS_PASSWORD >> .env

# Pull the latest changes from the git repository
git pull

# Run docker-compose up in detached mode
docker compose -f compose.prod.yaml up -d