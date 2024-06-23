# continue deployment
cd /root/tinyquestions-frontend
pnpm install
pnpm build
chown -R www-data /root/tinyquestions-frontend/dist/
systemctl restart apache2
