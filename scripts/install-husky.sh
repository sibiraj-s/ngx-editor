#!/bin/bash

if [ -n "$CI" ]
then
  echo "Found CI. Skipping husky install...\n"
  exit 0
fi

npx --no-install husky install
