from typing import List, Dict
from fastapi import FastAPI
from fastapi import HTTPException
from .model.player import Player
from .model.game import Game
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost",
           "http://localhost:3000"
           ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Chess Api": "go to /doc to learn more."}

@app.post("/newplayer", status_code=201)
def insertplayer(players: List[Player]):
    for p in players:
        p.save()

@app.get("/player/{idplayer}", response_model=Player)
def getplayer(idplayer: int):
    try:
        return Player.getplayer(idplayer)
    except HTTPException as error:
        raise error

@app.delete("/deleteplayer/{idplayer}")
def deleteplayer(idplayer: int):
    try:
        return Player.deleteplayer(idplayer)
    except HTTPException as error:
        return error


@app.get("/playername/{nameplayer}")
def getplayer(nameplayer: str):
    try:
        return Player.searchbyname(nameplayer)
    except HTTPException as error:
        raise error