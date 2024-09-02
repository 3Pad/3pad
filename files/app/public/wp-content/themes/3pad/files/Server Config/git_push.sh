#!/bin/bash
cd "$GIT_PATH"
git init
git add --all
current_date=$(date)
git commit -m "Automatic Commit & Update at $current_date"
git config user.email "$GITHUB_EMAIL"
git config user.name "$GITHUB_USER"
git remote add origin https://3Pad:"$GITHUB_KEY"@github.com/3Pad/sites.git
git remote set-url origin https://3Pad:"$GITHUB_KEY"@github.com/3Pad/sites.git
git fetch origin
git checkout main
git push --set-upstream origin main
git add .
current_date=$(date)
git commit -m "Automatic Commit & Update at $current_date"
git push -f https://3Pad:"$GITHUB_KEY"@github.com/3Pad/sites.git main
