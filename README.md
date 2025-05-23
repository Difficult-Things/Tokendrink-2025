# Tokendrink-2025

## Introduction
Tokendrink 2025 is made to encourage people to collaborate on a difficult task together and compete against other people. There are 6 teams, S24, S23, S22, S21, S20 and the oldies (everyone below). Every drink ordered (alcoholic or not) is counted as a point. The group with the most points at the end wins.

## Theme
This year's theme is bariokart (no copyright possible), in which 4 rounds are played, representing the 4 races that are played in a grand prestige. 

## High Level Overview
There are 4 main components to run the tokendrink. The dashboard, data-watcher, game-server and the game itself.
### Data-watcher
Data-watcher is a program that looks at the content of a folder and when a file is added, analyses it and sends the scores to the Dashboard using the game server. There should be one person responsible for occasioanlly downloading the bar bill from pubcard and putting it in this folder (or setting this folder as automatic folder location for downloads).
### Dashboard
The dashboard is the main controller for everything. It will automatically get the results from Data-watcher, but everything can be overwritten using the dashboard in case e.g. a team is winning too much. Whenever a round should start, set the correct values in the dashboard and press the execute command (or whatever it is called, I have not seen the dashboard for a year).
### Game-server
Game-server is currently mainly a communication tool called MQTT between all the other systems. You should not have to touch this code, and it will just run, that is a promise.
### Game
The game is made in Unity this year. Unity will use the MQTT messages to change scenes and textures.

### Pullenwand (OPTIONAL, PLEASE SKIP)
IDK

### PUBCARD setup
For pubcard it is important to create items for every color and drink item. e.g. RedBeer, RedSoda, OrangeBeer etc. Look at specifications/products to match the naming convention for items.

## How to start
```
cd ./game-server
(first launch only) npm install -g pm2
(first launch only) npm install
npm run start
```

## Other useful commands
```
pm2 list # list all processes
pm2 logs # show logs of all processes
pm2 stop <id|all> # stop a process
pm2 restart <id|all> # restart a process
pm2 start <id|all> # start a process
```

## MQTT Channels
The game-server uses the following channels.

### Status Channels
- /game/status
- /pullenwand/status
- /data-watcher/status
- /dashboard/status

### Game Channels
- /dashboard/data

Sends the data of the game. The ranking is ordered from top to bottom, with the number indicating the index of the team in the list.
``` JSON
{
    "round":2,
    "state":"drinking",
    "ranking":[1,4,3,5,2]
}
```

## Order of Generations
1. Red
2. Green
3. Blue
4. Purple
5. Orange

## WHO NOT TO CONTACT
1. Keihard janken
2. Do not contact Gino or Joris for any problems you encounter, we also forgot how it works.
