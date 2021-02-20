#!/bin/bash

VERSION=$(npm -s run env echo '$npm_package_version')
docker build -t itlab/speed-dial:$VERSION .