#!/bin/sh

if [ "$2" == "" ]; then
  echo Usage: `basename "$0"` \<project-root-directory-as-full-path\> \<build-directory\>
  exit 0
fi

DWARF=`find $2 -name DWARF`

if [ "$DWARF" == "" ]; then
  echo DWARF directory not found
  exit 0
fi

SYM=`echo $DWARF/*`

echo curl https://upload.bugsnag.com -F apiKey=f108fb997359e5519815d5fc58c79ad3 -F dsym=@$SYM -F projectRoot=$1
curl https://upload.bugsnag.com -F apiKey=f108fb997359e5519815d5fc58c79ad3 -F dsym=@$SYM -F projectRoot=$1

