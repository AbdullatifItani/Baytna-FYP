from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo User', email='demo@aa.io', password='password')
    abdullatif = User(
        username='Abdullatif', email='abdullatif@aa.io', password='password')
    abdullah = User(
        username='Abdullah', email='abdullah@aa.io', password='password')

    db.session.add_all([demo, abdullatif, abdullah])

    agent1 = User(username="Elias Khoury", email="agent1@user.com", password="password", phone="961-3-123456", agent=True, license_num="LB02145055", bio="An expert in Lebanese real estate, helping families find their perfect homes in Beirut and beyond.", photo="https://photos.zillowstatic.com/fp/e1c98c6600e18861f6924f92bf3a5518-h_g.jpg", broker_license="LB01517139", office="Byblos Real Estate")
    agent2 = User(username="Jad Haddad", email="agent2@user.com", password="password", phone="961-71-654321", agent=True, license_num="LB02188358", bio="Specializing in mountain properties across Lebanon, providing unique homes for every lifestyle.", photo="https://photos.zillowstatic.com/fp/32a0eacaaa51a4efb4add0f851b5b069-h_g.jpg", broker_license="LB01908329", office="Cedars Realty")
    agent3 = User(username="Karim Fakhoury", email="agent3@user.com", password="password", phone="961-76-987654", agent=True, license_num="LB02179872", bio="Known for dedication and transparency, Karim is one of Lebanon's top agents in the commercial real estate market.", photo="https://photos.zillowstatic.com/fp/c393dd4eb17a4e78b76bba6e88375d19-h_g.jpg", broker_license="LB01914434", office="Beirut Commercial Realty")
    agent4 = User(username="Rami Abou Nader", email="agent4@user.com", password="password", phone="961-81-223344", agent=True, license_num="LB02131845", bio="Helping families find their dream homes in Keserwan with an unmatched knowledge of the local market.", photo="https://photos.zillowstatic.com/fp/3dbcc733a5ee770454a06665e36f2197-h_g.jpg", broker_license="LB01908329", office="Redline Properties")
    agent5 = User(username="Samer Chahine", email="agent5@user.com", password="password", phone="961-70-334455", agent=True, license_num="LB02187353", bio="Awarded Beirut's Top Agent for three consecutive years, specializing in luxury properties.", photo="https://photos.zillowstatic.com/fp/c7909c66a0f5aebfd516892c9e0e0edd-h_g.jpg", broker_license="LB01878277", office="Lebanon Luxury Realty")
    agent6 = User(username="Leila Nasr", email="agent6@user.com", password="password", phone="961-3-112233", agent=True, license_num="LB02152129", bio="Passionate about helping new families settle in coastal and rural areas across Lebanon.", photo="https://photos.zillowstatic.com/fp/6a55a194295acce5672726239e0479c8-h_g.jpg", broker_license="LB02022288", office="Lebanese Coastal Properties")
    agent7 = User(username="Maya Rassi", email="agent7@user.com", password="password", phone="961-78-556677", agent=True, license_num="LB02072015", bio="As a top-selling agent, Maya excels in offering personalized services to clients in Saida and Tyre.", photo="https://photos.zillowstatic.com/fp/81776a50b9277f7d100674591ca218c6-h_g.jpg", broker_license="LB01517139", office="Rassi Realty Group")
    agent8 = User(username="Ziad Saad", email="agent8@user.com", password="password", phone="961-71-998877", agent=True, license_num="LB02177055", bio="An expert in navigating Lebanon’s unique real estate challenges and opportunities.", photo="https://photos.zillowstatic.com/fp/05c43f9895b928ea6de04a4724ac8f5c-h_g.jpg", broker_license="LB00951359", office="Saad Realty Solutions")
    agent9 = User(username="Rania Mouawad", email="agent9@user.com", password="password", phone="961-79-112233", agent=True, license_num="LB02161572", bio="Committed to delivering exceptional service, specializing in properties across North Lebanon.", photo="https://photos.zillowstatic.com/fp/6a55a194295acce5672726239e0479c8-h_g.jpg", broker_license="LB01914434", office="Cedars Realty")
    agent10 = User(username="Fadi Aoun", email="agent10@user.com", password="password", phone="961-3-445566", agent=True, license_num="LB03003160", bio="Known for sharp negotiation skills and strong relationships with clients in Beirut.", photo="https://photos.zillowstatic.com/fp/c79ec5d725646e495daefb41a0f7061d-h_g.jpg", broker_license="LB01405905", office="Aoun & Partners")
    agent11 = User(username="Tarek Ghanem", email="agent11@user.com", password="password", phone="961-81-667788", agent=True, license_num="LB01926224", bio="Tarek is recognized for his expertise in historic and rural properties in the Bekaa Valley.", photo="https://photos.zillowstatic.com/fp/639db577f88b3cf639dc44b65ba59dd0-h_g.jpg", broker_license="LB01878277", office="Ghanem Real Estate")
    agent12 = User(username="Joumana Salameh", email="agent12@user.com", password="password", phone="961-70-778899", agent=True, license_num="LB01812443", bio="Focused on providing clients with modern and family-friendly housing options across Mount Lebanon.", photo="https://photos.zillowstatic.com/fp/9aee578bc056fc9cbf4e071386bcacbb-h_g.jpg", broker_license="LB00951359", office="Coldwell Banker Lebanon")
    agent13 = User(username="Rami Darwich", email="agent13@user.com", password="password", phone="961-76-889900", agent=True, license_num="LB01083801", bio="A dream catcher for families, helping them find ideal homes in the bustling streets of Beirut.", photo="https://photos.zillowstatic.com/fp/2f494c2f1270988f6d13e0f514ab4874-h_g.jpg", broker_license="LB02022288", office="Darwich Realty")
    agent14 = User(username="Leila Fares", email="agent14@user.com", password="password", phone="961-71-991122", agent=True, license_num="LB01000679", bio="Specializing in exclusive seaside properties along the Mediterranean coast.", photo="https://photos.zillowstatic.com/fp/f137a0b4946b73bcd00537f287f5a7a0-h_g.jpg", broker_license="LB01000679", office="Millennium Realty")
    agent15 = User(username="Samir Gerges", email="agent15@user.com", password="password", phone="961-3-223344", agent=True, license_num="LB01405905", bio="With a background in architecture, Samir brings a unique perspective to real estate transactions.", photo="https://photos.zillowstatic.com/fp/8c775889cbcbc299807d58450e24b9a6-h_g.jpg", broker_license="LB01405905", office="Gerges Realty Solutions")

    db.session.add_all([agent1, agent2, agent3, agent4, agent5, agent6, agent7, agent8, agent9, agent10, agent11, agent12, agent13, agent14, agent15])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built-in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto-incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

