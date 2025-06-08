import { DataTypes } from "sequelize";
import sequelize from "../config/db.connection.js";
import { User } from "./user.modal.js";

export const Discussion = sequelize.define(
    "Discussion",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lesson: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM('open', 'closed'),
            defaultValue: 'open',
            allowNull: false
        }
    },
    {
        tableName: "Discussion",
        timestamps: true
    }
);

export const Reply = sequelize.define(
    "Reply",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        discussionId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Discussion',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },
    {
        tableName: "Reply",
        timestamps: true
    }
);

// Discussion associations
Discussion.hasMany(Reply, {
    foreignKey: 'discussionId',
    as: 'replies'
});

Discussion.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Reply associations
Reply.belongsTo(Discussion, {
    foreignKey: 'discussionId',
    as: 'discussion'
});

Reply.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// User associations
User.hasMany(Discussion, {
    foreignKey: 'userId',
    as: 'discussions'
});

User.hasMany(Reply, {
    foreignKey: 'userId',
    as: 'replies'
});

export default { Discussion, Reply };