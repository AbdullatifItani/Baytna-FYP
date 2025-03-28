"""empty message

Revision ID: 2f0244c4b8fd
Revises: 84446ce6802e
Create Date: 2024-11-19 19:04:26.905247

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2f0244c4b8fd'
down_revision = '84446ce6802e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('properties', sa.Column('street', sa.String(length=255), nullable=False))
    op.add_column('properties', sa.Column('built', sa.Integer(), nullable=False))
    op.add_column('properties', sa.Column('garage', sa.Integer(), nullable=False))
    op.alter_column('properties', 'description',
               existing_type=sa.VARCHAR(length=2000),
               type_=sa.String(length=5000),
               existing_nullable=True)
    op.drop_column('properties', 'st_num')
    op.drop_column('properties', 'st_name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('properties', sa.Column('st_name', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
    op.add_column('properties', sa.Column('st_num', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    op.alter_column('properties', 'description',
               existing_type=sa.String(length=5000),
               type_=sa.VARCHAR(length=2000),
               existing_nullable=True)
    op.drop_column('properties', 'garage')
    op.drop_column('properties', 'built')
    op.drop_column('properties', 'street')
    # ### end Alembic commands ###
