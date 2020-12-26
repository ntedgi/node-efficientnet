#!/bin/bash
set -e
set -x
pip3 install virtualenv
virtualenv -p python3 model
model/bin/pip3 install -r requirements.txt