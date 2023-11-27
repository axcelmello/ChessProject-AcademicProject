from fastapi import HTTPException
from typing import List, Dict
from pydantic import BaseModel
from app.crud.dbplayer import DBPlayer
from sqlalchemy.exc import SQLAlchemyError


class Player(BaseModel):
    idplayer: int
    name: str
    username: str
    country: str
    idtitle: str
    idstatus: str
    rating: int

    def save(self):
        DBPlayer.dbsave(self)

    @classmethod
    def getplayer(cls, idplayer: int):
        try:
            player = DBPlayer.dbgetplayer(idplayer)
            return cls(
                   idplayer     = player.idplayer,
                   name         = player.name,
                   username     = player.username,
                   country      = player.country,
                   idtitle      = player.idtitle,
                   idstatus     = player.idstatus,
                   rating       = player.rating)
        except SQLAlchemyError as error:
            raise HTTPException(status_code=404, detail="Player not Found")

    def deleteplayer(id: int):
        if DBPlayer.dbdelete(id):
            return {"message":"Deleted with Sucess"}
        else:
            raise HTTPException(status_code=404, detail="Player not Found")


    def searchbyname(name: str):
        try:
            return DBPlayer.dbsearchname(name)
        except SQLAlchemyError as error:
            raise HTTPException(status_code=404, detail="None player found")