import { Point } from "../models/point.modal.js";
import { User } from "../models/user.modal.js";
import { Op } from "sequelize";

class pointRepository {
    async create(data) {
        try {
            const existingPoint = await Point.findOne({
                where: { userId: data.userId }
            });
            if (existingPoint) {
                existingPoint.point += data.point;
                await existingPoint.save();
                return existingPoint;
            } else {
                // No existing point, create new entry
                const result = await Point.create(data);
                return result;
            }
        } catch (error) {
            throw error;
        }
    }
      


    async getAll() {
        try {
            const result = await Point.findAll({
                include: [{ model: User, as: 'user' }],
                order: [['point', 'DESC']],
                limit:10
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get a single discussion by ID with its replies
    // async getDiscussionById(id) {
    //     try {
    //         const discussion = await Discussion.findByPk(id, {
    //             include: [{
    //                 model: Reply,
    //                 as: 'replies',
    //                 include: [{
    //                     model: User,
    //                     as: 'user'
    //                 }]
    //             }, {
    //                 model: User,
    //                 as: 'user'
    //             }]
    //         });
    //         return discussion;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Update a discussion
    // async updateDiscussion(id, updateData) {
    //     try {
    //         const discussion = await Discussion.findByPk(id);
    //         if (!discussion) {
    //             throw new Error('Discussion not found');
    //         }
    //         await discussion.update(updateData);
    //         return discussion;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Delete a discussion
    // async deleteDiscussion(id) {
    //     try {
    //         const discussion = await Discussion.findByPk(id);
    //         if (!discussion) {
    //             throw new Error('Discussion not found');
    //         }
    //         await discussion.destroy();
    //         return true;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Add a reply to a discussion
    // async addReply(replyData) {
    //     try {
    //         const reply = await Reply.create(replyData);
    //         return reply;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Get all replies for a discussion
    // async getRepliesByDiscussionId(discussionId) {
    //     try {
    //         const replies = await Reply.findAll({
    //             where: { discussionId },
    //             include: [{
    //                 model: User,
    //                 as: 'user'
    //             }],
    //             order: [['createdAt', 'ASC']]
    //         });
    //         return replies;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Update a reply
    // async updateReply(id, updateData) {
    //     try {
    //         const reply = await Reply.findByPk(id);
    //         if (!reply) {
    //             throw new Error('Reply not found');
    //         }
    //         await reply.update(updateData);
    //         return reply;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Delete a reply
    // async deleteReply(id) {
    //     try {
    //         const reply = await Reply.findByPk(id);
    //         if (!reply) {
    //             throw new Error('Reply not found');
    //         }
    //         await reply.destroy();
    //         return true;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Get discussions by user ID
    // async getDiscussionsByUserId(userId) {
    //     try {
    //         const discussions = await Discussion.findAll({
    //             where: { userId },
    //             include: [{
    //                 model: Reply,
    //                 as: 'replies',
    //                 include: [{
    //                     model: User,
    //                     as: 'user'
    //                 }]
    //             }, {
    //                 model: User,
    //                 as: 'user'
    //             }],
    //             order: [['createdAt', 'DESC']]
    //         });
    //         return discussions;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Get replies by user ID
    // async getRepliesByUserId(userId) {
    //     try {
    //         const replies = await Reply.findAll({
    //             where: { userId },
    //             include: [{
    //                 model: Discussion,
    //                 as: 'discussion',
    //                 include: [{
    //                     model: User,
    //                     as: 'user'
    //                 }]
    //             }, {
    //                 model: User,
    //                 as: 'user'
    //             }],
    //             order: [['createdAt', 'DESC']]
    //         });
    //         return replies;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // // Search discussions by title or description
    // async searchDiscussions(searchTerm) {
    //     try {
    //         const discussions = await Discussion.findAll({
    //             where: {
    //                 [Op.or]: [
    //                     { title: { [Op.like]: `%${searchTerm}%` } },
    //                     { description: { [Op.like]: `%${searchTerm}%` } }
    //                 ]
    //             },
    //             include: [{
    //                 model: Reply,
    //                 as: 'replies',
    //                 include: [{
    //                     model: User,
    //                     as: 'user'
    //                 }]
    //             }, {
    //                 model: User,
    //                 as: 'user'
    //             }],
    //             order: [['createdAt', 'DESC']]
    //         });
    //         return discussions;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

export default new pointRepository();
