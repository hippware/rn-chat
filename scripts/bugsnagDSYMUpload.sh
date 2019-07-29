#!/bin/sh

if [ "$2" == "" ]; then
  echo Usage: `basename "$0"` \<source-directory\> \<build-directory\>
  exit 0
fi

DWARF=`find $2 -name DWARF`
SYM=`echo $DWARF/*`

echo curl https://upload.bugsnag.com -F f108fb997359e5519815d5fc58c79ad3 -F dsym=@$SYM -F projectRoot=$1

