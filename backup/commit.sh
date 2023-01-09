#!/bin/bash

dt=date

git pull oring master

git add .

git commit -m "Commit code - $dt"

git push -u origin master