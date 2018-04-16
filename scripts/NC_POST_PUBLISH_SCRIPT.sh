#!/bin/sh

cd $NEVERCODE_BUILD_DIR
set -e	# exit on first failed command
set -x  # print all executed commands to the terminal

yarn bugsnag