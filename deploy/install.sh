#!/usr/bin/env bash

set -o errexit

sudo apt-get update
export DEBIAN_FRONTEND=noninteractive
sudo apt-get install -y --no-install-recommends ca-certificates wget git

wget -qO- https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Update submodule if necessary.
git submodule update --init --recursive

# Install dependencies for sourcebit to fetch content from sanity.
npm install --legacy-peer-deps
