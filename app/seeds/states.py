from app.models import db, State

def seed_states():
    state1 = State(state="BE", long="Beirut")
    state2 = State(state="NA", long="North")
    state3 = State(state="MO", long="Mount Lebanon")
    state4 = State(state="SO", long="South")
    state5 = State(state="BQ", long="Beqaa")
    state6 = State(state="NE", long="Nabatieh")
    state7 = State(state="AK", long="Akkar")
    state8 = State(state="BA", long="Baalbek-Hermel")

    db.session.add_all([state1, state2, state3, state4, state5, state6, state7, state8])
    db.session.commit()

def undo_states():
    db.session.execute('TRUNCATE states RESTART IDENTITY CASCADE;')
    db.session.commit()