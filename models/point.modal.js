import { DataTypes } from "sequelize";
import sequelize from "../config/db.connection.js";
import { User } from "./user.modal.js";

export const Point = sequelize.define(
    "Point",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        tableName: "Point",
        timestamps: true
    }
);
User.hasOne(Point, { foreignKey: 'userId', as: 'point' });
Point.belongsTo(User, { foreignKey: 'userId', as: 'user' });