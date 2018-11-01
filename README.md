# Build and Deploy Front-End Code

## On Server
ssh root@192.168.1.43 
rm -rf /opt/counterpoint-api/web/static

## On Localhost
npm run build
pscp -r C:/Users/dcollier/my-repos/counterpoint-stat-board/build/* root@192.168.1.43:/opt/counterpoint-api/web
