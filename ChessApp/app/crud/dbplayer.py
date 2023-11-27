from sqlalchemy import Column, Integer, String, select
from sqlalchemy.orm import declarative_base
from sqlalchemy.exc import SQLAlchemyError
from app.db.database import session
from fastapi.encoders import jsonable_encoder
Base = declarative_base()

class DBPlayer(Base):
    __tablename__  = 'player'
    idplayer   = Column(Integer, primary_key=True)
    name       = Column(String(50), default='empty')
    username   = Column(String(50))
    country    = Column(String(2))
    idtitle    = Column(String(2))
    idstatus   = Column(String(10))
    rating     = Column(Integer)

    @classmethod
    def mapplayer(cls, p):
        try:
            mapped_player = cls(
                idplayer    = p.idplayer,
                name        = p.name,
                username    = p.username,
                country     = p.country,
                idtitle     = p.idtitle,
                idstatus    = p.idstatus,
                rating      = p.rating
            )
        finally:
            return mapped_player


    def dbsave(p):
        try:
            dbobject = DBPlayer.mapplayer(p)
        finally:
            session.add(dbobject)
            session.commit()
            session.close()

    @classmethod
    def dbgetplayer(cls, id):
        player = session.query(cls).filter_by(idplayer=id).first()
        if player is not None:
            return player
        else:
            raise SQLAlchemyError


    @classmethod
    def dbdelete(cls, id):
        to_delete = session.query(cls).filter_by(idplayer=id).first()

        if to_delete is not None:
            session.delete(to_delete)
            session.commit()
            session.close()
            return True
        else:
            session.close()
            return False

    @classmethod
    def dbsearchname(cls, name):

        query = session.query(cls).filter(cls.name.like('%' + name + '%'))
        players = query.all()

        if len(players) == 0:
            raise SQLAlchemyError
        else:
            return players