from app.models import db, PropertyImg

def seed_property_imgs():
    img1 = PropertyImg(property_id=1, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property001_img01.jpeg", description="Living Room")
    img2 = PropertyImg(property_id=1, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property001_img02.jpeg", description="Kitchen")
    img3 = PropertyImg(property_id=1, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property001_img03.jpeg", description="Bedroom")
    img4 = PropertyImg(property_id=1, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property001_img04.jpeg", description="Bathroom")

    img5 = PropertyImg(property_id=2, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property002_img01.jpeg", description="Living Room")
    img6 = PropertyImg(property_id=2, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property002_img02.jpeg", description="Kitchen")
    img7 = PropertyImg(property_id=2, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property002_img03.jpeg", description="Bedroom")
    img8 = PropertyImg(property_id=2, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property002_img04.jpeg", description="Bathroom")

    img9 = PropertyImg(property_id=3, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property003_img01.jpeg", description="Living Room")
    img10 = PropertyImg(property_id=3, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property003_img02.jpeg", description="Kitchen")
    img11 = PropertyImg(property_id=3, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property003_img03.jpeg", description="Bedroom")
    img12 = PropertyImg(property_id=3, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property003_img04.jpeg", description="Bathroom")

    img13 = PropertyImg(property_id=4, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property004_img01.jpeg", description="Living Room")
    img14 = PropertyImg(property_id=4, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property004_img02.jpeg", description="Kitchen")
    img15 = PropertyImg(property_id=4, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property004_img03.jpeg", description="Bedroom")
    img16 = PropertyImg(property_id=4, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property004_img04.jpeg", description="Bathroom")

    img17 = PropertyImg(property_id=5, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property005_img01.jpeg", description="Living Room")
    img18 = PropertyImg(property_id=5, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property005_img02.jpeg", description="Kitchen")
    img19 = PropertyImg(property_id=5, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property005_img03.jpeg", description="Bedroom")
    img20 = PropertyImg(property_id=5, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property005_img04.jpeg", description="Bathroom")

    img21 = PropertyImg(property_id=6, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property006_img01.jpeg", description="Living Room")
    img22 = PropertyImg(property_id=6, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property006_img02.jpeg", description="Kitchen")
    img23 = PropertyImg(property_id=6, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property006_img03.jpeg", description="Bedroom")
    img24 = PropertyImg(property_id=6, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property006_img04.jpeg", description="Bathroom")

    img25 = PropertyImg(property_id=7, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property007_img01.jpeg", description="Living Room")
    img26 = PropertyImg(property_id=7, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property007_img02.jpeg", description="Kitchen")
    img27 = PropertyImg(property_id=7, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property007_img03.jpeg", description="Bedroom")
    img28 = PropertyImg(property_id=7, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property007_img04.jpeg", description="Bathroom")

    img29 = PropertyImg(property_id=8, img_url="https://st.hzcdn.com/simgs/pictures/family-rooms/luxury-real-estate-living-room-michael-laurenzano-photography-img~0631119d0fe203c3_4-3778-1-4ff1eb8.jpg", description="Living Room")
    img30 = PropertyImg(property_id=8, img_url="https://www.kitchendesigncentre.com/wp-content/uploads/2024/11/a-contemporary-black-and-walnut-kitchen-tile.jpg", description="Kitchen")
    img31 = PropertyImg(property_id=8, img_url="https://cdn.mos.cms.futurecdn.net/NQto9mJGgcY474SR68s7ac.jpg", description="Bedroom")
    img32 = PropertyImg(property_id=8, img_url="https://images.squarespace-cdn.com/content/v1/61a4eb7958cbd07dda6c9261/1a34a92e-8970-47be-8cf8-0409f65e6e83/White+and+Grey+bathroom+with+basin%2C+Bathtub+and+Walk-in+shower.", description="Bathroom")

    img33 = PropertyImg(property_id=9, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property009_img01.jpeg", description="Living Room")
    img34 = PropertyImg(property_id=9, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property009_img02.jpeg", description="Kitchen")
    img35 = PropertyImg(property_id=9, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property009_img03.jpeg", description="Bedroom")
    img36 = PropertyImg(property_id=9, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property009_img04.jpeg", description="Bathroom")

    img37 = PropertyImg(property_id=10, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property010_img01.jpeg", description="Living Room")
    img38 = PropertyImg(property_id=10, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property010_img02.jpeg", description="Kitchen")
    img39 = PropertyImg(property_id=10, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property010_img03.jpeg", description="Bedroom")
    img40 = PropertyImg(property_id=10, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property010_img04.jpeg", description="Bathroom")

    img41 = PropertyImg(property_id=11, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property011_img01.jpeg", description="Living Room")
    img42 = PropertyImg(property_id=11, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property011_img02.jpeg", description="Kitchen")
    img43 = PropertyImg(property_id=11, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property011_img03.jpeg", description="Bedroom")
    img44 = PropertyImg(property_id=11, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property011_img04.jpeg", description="Bathroom")

    img45 = PropertyImg(property_id=12, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property012_img01.jpeg", description="Living Room")
    img46 = PropertyImg(property_id=12, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property012_img02.jpeg", description="Kitchen")
    img47 = PropertyImg(property_id=12, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property012_img03.jpeg", description="Bedroom")
    img48 = PropertyImg(property_id=12, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property012_img04.jpeg", description="Bathroom")

    img49 = PropertyImg(property_id=13, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property013_img01.jpeg", description="Living Room")
    img50 = PropertyImg(property_id=13, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property013_img02.jpeg", description="Kitchen")
    img51 = PropertyImg(property_id=13, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property013_img03.jpeg", description="Bedroom")
    img52 = PropertyImg(property_id=13, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property013_img04.jpeg", description="Bathroom")

    img53 = PropertyImg(property_id=14, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property014_img01.jpeg", description="Living Room")
    img54 = PropertyImg(property_id=14, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property014_img02.jpeg", description="Kitchen")
    img55 = PropertyImg(property_id=14, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property014_img03.jpeg", description="Bedroom")
    img56 = PropertyImg(property_id=14, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property014_img04.jpeg", description="Bathroom")

    img57 = PropertyImg(property_id=15, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property015_img01.jpeg", description="Living Room")
    img58 = PropertyImg(property_id=15, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property015_img02.jpeg", description="Kitchen")
    img59 = PropertyImg(property_id=15, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property015_img03.jpeg", description="Bedroom")
    img60 = PropertyImg(property_id=15, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property015_img04.jpeg", description="Bathroom")

    img61 = PropertyImg(property_id=16, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property016_img01.jpeg", description="Living Room")
    img62 = PropertyImg(property_id=16, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property016_img02.jpeg", description="Kitchen")
    img63 = PropertyImg(property_id=16, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property016_img03.jpeg", description="Bedroom")
    img64 = PropertyImg(property_id=16, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property016_img04.jpeg", description="Bathroom")

    img65 = PropertyImg(property_id=17, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property017_img01.jpeg", description="Living Room")
    img66 = PropertyImg(property_id=17, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property017_img02.jpeg", description="Kitchen")
    img67 = PropertyImg(property_id=17, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property017_img03.jpeg", description="Bedroom")
    img68 = PropertyImg(property_id=17, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property017_img04.jpeg", description="Bathroom")

    img69 = PropertyImg(property_id=18, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property018_img01.jpeg", description="Living Room")
    img70 = PropertyImg(property_id=18, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property018_img02.jpeg", description="Kitchen")
    img71 = PropertyImg(property_id=18, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property018_img03.jpeg", description="Bedroom")
    img72 = PropertyImg(property_id=18, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property018_img04.jpeg", description="Bathroom")

    img73 = PropertyImg(property_id=19, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property019_img01.jpeg", description="Living Room")
    img74 = PropertyImg(property_id=19, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property019_img02.jpeg", description="Kitchen")
    img75 = PropertyImg(property_id=19, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property019_img03.jpeg", description="Bedroom")
    img76 = PropertyImg(property_id=19, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property019_img04.jpeg", description="Bathroom")

    img77 = PropertyImg(property_id=20, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property020_img01.jpeg", description="Living Room")
    img78 = PropertyImg(property_id=20, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property020_img02.jpeg", description="Kitchen")
    img79 = PropertyImg(property_id=20, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property020_img03.jpeg", description="Bedroom")
    img80 = PropertyImg(property_id=20, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property020_img04.jpeg", description="Bathroom")

    img81 = PropertyImg(property_id=21, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property021_img01.jpeg", description="Living Room")
    img82 = PropertyImg(property_id=21, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property021_img02.jpeg", description="Kitchen")
    img83 = PropertyImg(property_id=21, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property021_img03.jpeg", description="Bedroom")
    img84 = PropertyImg(property_id=21, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property021_img04.jpeg", description="Bathroom")

    img85 = PropertyImg(property_id=22, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property022_img01.jpeg", description="Living Room")
    img86 = PropertyImg(property_id=22, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property022_img02.jpeg", description="Kitchen")
    img87 = PropertyImg(property_id=22, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property022_img03.jpeg", description="Bedroom")
    img88 = PropertyImg(property_id=22, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property022_img04.jpeg", description="Bathroom")

    img89 = PropertyImg(property_id=23, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property023_img01.jpeg", description="Living Room")
    img90 = PropertyImg(property_id=23, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property023_img02.jpeg", description="Kitchen")
    img91 = PropertyImg(property_id=23, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property023_img03.jpeg", description="Bedroom")
    img92 = PropertyImg(property_id=23, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property023_img04.jpeg", description="Bathroom")

    img93 = PropertyImg(property_id=24, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property024_img01.jpeg", description="Living Room")
    img94 = PropertyImg(property_id=24, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property024_img02.jpeg", description="Kitchen")
    img95 = PropertyImg(property_id=24, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property024_img03.jpeg", description="Bedroom")
    img96 = PropertyImg(property_id=24, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property024_img04.jpeg", description="Bathroom")

    img97 = PropertyImg(property_id=25, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property025_img01.jpeg", description="Living Room")
    img98 = PropertyImg(property_id=25, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property025_img02.jpeg", description="Kitchen")
    img99 = PropertyImg(property_id=25, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property025_img03.jpeg", description="Bedroom")
    img100 = PropertyImg(property_id=25, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property025_img04.jpeg", description="Bathroom")

    img101 = PropertyImg(property_id=26, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property026_img01.jpeg", description="Living Room")
    img102 = PropertyImg(property_id=26, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property026_img02.jpeg", description="Kitchen")
    img103 = PropertyImg(property_id=26, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property026_img03.jpeg", description="Bedroom")
    img104 = PropertyImg(property_id=26, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property026_img04.jpeg", description="Bathroom")

    img105 = PropertyImg(property_id=27, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property027_img01.jpeg", description="Living Room")
    img106 = PropertyImg(property_id=27, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property027_img02.jpeg", description="Kitchen")
    img107 = PropertyImg(property_id=27, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property027_img03.jpeg", description="Bedroom")
    img108 = PropertyImg(property_id=27, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property027_img04.jpeg", description="Bathroom")

    img109 = PropertyImg(property_id=28, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property028_img01.jpeg", description="Living Room")
    img110 = PropertyImg(property_id=28, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property028_img02.jpeg", description="Kitchen")
    img111 = PropertyImg(property_id=28, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property028_img03.jpeg", description="Bedroom")
    img112 = PropertyImg(property_id=28, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property028_img04.jpeg", description="Bathroom")

    img113 = PropertyImg(property_id=29, img_url="https://d1zyr4xmqw3mni.cloudfront.net/image/1600/gallery/10988/195103.jpg", description="Living Room")
    img114 = PropertyImg(property_id=29, img_url="https://www.chalet-v.com/wp-content/uploads/2019/06/Kitchen.jpg", description="Kitchen")
    img115 = PropertyImg(property_id=29, img_url="https://cf.bstatic.com/xdata/images/hotel/max1024x768/570156068.jpg?k=c64f31586daee58282e7a71c33cca923a6722424b205fa7de51927f27520a58d&o=&hp=1", description="Bedroom")
    img116 = PropertyImg(property_id=29, img_url="https://cdn.shopify.com/s/files/1/2999/1398/files/modern_bathroom_designs_480x480.jpg?v=1721886751", description="Bathroom")

    img117 = PropertyImg(property_id=30, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property030_img01.jpeg", description="Living Room")
    img118 = PropertyImg(property_id=30, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property030_img02.jpeg", description="Kitchen")
    img119 = PropertyImg(property_id=30, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property030_img03.jpeg", description="Bedroom")
    img120 = PropertyImg(property_id=30, img_url="https://yillow.s3.us-west-1.amazonaws.com/properties/property030_img04.jpeg", description="Bathroom")

    db.session.add_all([
        img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
        img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
        img41, img42, img43, img44, img45, img46, img47, img48, img49, img50, img51, img52, img53, img54, img55, img56, img57, img58, img59, img60,
        img61, img62, img63, img64, img65, img66, img67, img68, img69, img70, img71, img72, img73, img74, img75, img76, img77, img78, img79, img80,
        img81, img82, img83, img84, img85, img86, img87, img88, img89, img90, img91, img92, img93, img94, img95, img96, img97, img98, img99, img100,
        img101, img102, img103, img104, img105, img106, img107, img108, img109, img110, img111, img112, img113, img114, img115, img116, img117, img118,
        img119, img120
    ])
    db.session.commit()

def undo_property_imgs():
    db.session.execute('TRUNCATE property_imgs RESTART IDENTITY CASCADE;')
    db.session.commit()
    
'''from app.models import db, PropertyImg

def seed_property_imgs():
    property_imgs = []
    for i in range(1, 31):
        property_imgs.append(PropertyImg(property_id=i, img_url=f"https://yillow.s3.us-west-1.amazonaws.com/properties/front{i:03d}.jpeg", description="Front View"))
        property_imgs.append(PropertyImg(property_id=i, img_url=f"https://yillow.s3.us-west-1.amazonaws.com/properties/living{i:03d}.jpeg", description="Living Room"))
        property_imgs.append(PropertyImg(property_id=i, img_url=f"https://yillow.s3.us-west-1.amazonaws.com/properties/kitchen{i:03d}.jpeg", description="Kitchen"))
        property_imgs.append(PropertyImg(property_id=i, img_url=f"https://yillow.s3.us-west-1.amazonaws.com/properties/bedroom{i:03d}.jpeg", description="Bedroom"))

    db.session.add_all(property_imgs)
    db.session.commit()

def undo_property_imgs():
    db.session.execute('TRUNCATE property_imgs RESTART IDENTITY CASCADE;')
    db.session.commit()'''