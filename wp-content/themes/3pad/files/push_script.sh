#!/bin/bash

cd $FILE_PATH &&
# Set Git user and email
git remote set-url origin https://3Pad:$GITHUB_ACCESS_TOKEN@github.com/3Pad/ipfs.git &&
git fetch origin &&
git checkout main &&
git merge origin/main &&
git remote set-url origin https://$GITHUB_ACCESS_TOKEN@github.com/3Pad/ipfs.git &&
git push --set-upstream origin main &&
git checkout main &&
git push &&
git add . &&
current_date=$(date) &&
git commit -m "Automatic Commit & Update at $current_date" &&
git push -f https://$GITHUB_ACCESS_TOKEN@github.com/3Pad/ipfs.git main

