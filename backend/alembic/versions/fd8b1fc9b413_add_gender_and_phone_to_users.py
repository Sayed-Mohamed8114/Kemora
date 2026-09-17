"""add gender and phone to users

Revision ID: fd8b1fc9b413
Revises: 223987801abd
Create Date: 2026-09-17 23:29:27.247677

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "fd8b1fc9b413"
down_revision: Union[str, Sequence[str], None] = "223987801abd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()

    usergender = postgresql.ENUM(
        "male",
        "female",
        name="usergender",
    )

    usergender.create(bind, checkfirst=True)

    op.add_column(
        "users",
        sa.Column(
            "gender",
            usergender,
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "phone",
            sa.String(length=20),
            nullable=True,
        ),
    )

def downgrade() -> None:
    """Downgrade schema."""

    bind = op.get_bind()

    # Drop columns first
    op.drop_column("users", "phone")
    op.drop_column("users", "gender")

    # Drop tables in reverse dependency order
    op.drop_table("bookings")
    op.drop_table("tour_schedules")
    op.drop_table("tours")

    # Drop ENUM types
    usergender = postgresql.ENUM(
        "male",
        "female",
        name="usergender",
    )

    tourstatus = postgresql.ENUM(
        "draft",
        "published",
        "archived",
        name="tourstatus",
    )

    schedulestatus = postgresql.ENUM(
        "available",
        "full",
        "cancelled",
        "completed",
        name="schedulestatus",
    )

    bookingstatus = postgresql.ENUM(
        "pending",
        "confirmed",
        "cancelled",
        "completed",
        name="bookingstatus",
    )

    usergender.drop(bind, checkfirst=True)
    bookingstatus.drop(bind, checkfirst=True)
    schedulestatus.drop(bind, checkfirst=True)
    tourstatus.drop(bind, checkfirst=True)