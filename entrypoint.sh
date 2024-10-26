#! /bin/bash

npm test
status=$?

cp -r playwright-report/* /report

exit $status
