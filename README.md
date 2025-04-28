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
For pubcard it is important to create items for every color and drink item. e.g. RedBeer, RedSoda, OrangeBeer etc. Look at Data-watcher /src/types/types.ts to match the naming convention for items.

## How to start
Run the start.batch to run the game-server, data-watcher and dashboard. The dashboard can be opened using localhost:1883, the data-watcher folder can probably be changed, but do not know how at the moment. For unity, build the program and run the executable. If that does not work, use the demo play button.

## WHO NOT TO CONTACT
Do not contact Gino or Joris for any problems you encounter, we also forgot how it works.
