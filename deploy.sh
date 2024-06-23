#!/bin/bash

DEPLOY_PATH="/tinyquestions-frontend"

chown -R www-data /root/tinyquestions-frontend/dist/
systemctl restart apache2
cd ${DEPLOY_PATH}