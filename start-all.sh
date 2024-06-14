
echo Starting Postgres Docker
osascript -e 'Tell app "Terminal" to do script "cd '$PWD'; docker compose up"'
sleep 2
echo Starting Express Backend
osascript -e 'Tell app "Terminal" to do script "cd '$PWD/backend'; chmod 777 start-backend.sh; ./start-backend.sh"'
sleep 1
echo Starting React Frontend
osascript -e 'Tell app "Terminal" to do script "cd '$PWD/frontend'; chmod 777 start-frontend.sh; ./start-frontend.sh"'
