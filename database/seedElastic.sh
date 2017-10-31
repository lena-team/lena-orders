#!/bin/bash
for i in `seq 0 100`
do for i in `seq 0 10`
    do node database/seedElastic.js &
  done
  sleep 10
done
