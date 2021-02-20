#!/bin/bash

VERSION=$(npm -s run env echo '$npm_package_version')
docker build -t jacksitlab/speed-dial:$VERSION -t jacksitlab/speed-dial:latest .