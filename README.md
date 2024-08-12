
Run steps
1. Configure local host: ```front.localhost.com``` and "api.localhost.com"
2. Add the configuration in the ```ngnix.txt``` file in nignx.conf
3. Creates ```interview``` database in mysql
4. Change the mysql account password and port to yours，and the file address is at /{your path}/server/index.py
5. cd to the server folder, run ```poetry install```, and then run ```python3 server/index.py```
6. cd to the client folder, run ```npm install```, and then run ```npm run dev```
7. Open ```front.localhost.com``` in your browser