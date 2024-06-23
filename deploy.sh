#!/bin/bash
chown -R www-data /root/tinyquestions-frontend/dist/
systemctl restart apache2
cd /root/tinyquestions-frontend/dist/