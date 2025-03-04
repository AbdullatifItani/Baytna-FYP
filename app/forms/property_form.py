from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, DateField
from wtforms.validators import DataRequired, Length, NumberRange

class PropertyForm(FlaskForm):
    status = StringField("status", validators=[DataRequired(), Length(max=20)])
    street = StringField("street", validators=[DataRequired(), Length(max=255)])
    city = StringField("city", validators=[DataRequired(), Length(max=255)])
    state_id = IntegerField("state_id", validators=[DataRequired()])
    zip = StringField("zip", validators=[DataRequired(), Length(max=5)])
    type = StringField("type", validators=[DataRequired(), Length(max=20)])
    price = IntegerField("price", validators=[DataRequired()])
    bed = IntegerField("bed", validators=[DataRequired()])
    bath = FloatField("bath", validators=[DataRequired()])
    sqft = IntegerField("sqft", validators=[DataRequired()])
    lot = IntegerField("lot", validators=[DataRequired()])
    listing_id = StringField("listing_id", validators=[DataRequired(), Length(max=50)])
    listing_date = DateField("listing_date", validators=[DataRequired()])
    built = IntegerField("built", validators=[DataRequired()])
    garage = IntegerField("garage", validators=[DataRequired()])
    lat = FloatField("lat", validators=[DataRequired()])
    long = FloatField("long", validators=[DataRequired()])
    front_img = StringField("front_img", validators=[Length(max=255)])
    description = StringField("description", validators=[Length(max=5000)])

    class Meta:
        csrf = False