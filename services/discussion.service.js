import discussionRepository from "../repositories/discussion.repo.js";
import AppError from "../utils/AppError.js";
import ApiResponse from "../utils/ApiResponse.js";

class DiscussionService {
    // Create a new discussion
    async createDiscussion(discussionData) {
        try {
            const discussion = await discussionRepository.createDiscussion(discussionData);
            return ApiResponse.success(
                discussion,
                "Discussion created successfully",
                ApiResponse.HTTP_STATUS.CREATED
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error creating discussion",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Get all discussions
    async getAllDiscussions() {
        try {
            const discussions = await discussionRepository.getAllDiscussions();
            return ApiResponse.success(
                discussions,
                "Discussions retrieved successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error retrieving discussions",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Get discussion by ID
    async getDiscussionById(id) {
        try {
            const discussion = await discussionRepository.getDiscussionById(id);
            if (!discussion) {
                throw new AppError(
                    "Discussion not found",
                    ApiResponse.HTTP_STATUS.NOT_FOUND
                );
            }
            return ApiResponse.success(
                discussion,
                "Discussion retrieved successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error retrieving discussion",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Update discussion
    async updateDiscussion(id, updateData) {
        try {
            const discussion = await discussionRepository.updateDiscussion(id, updateData);
            if (!discussion) {
                throw new AppError(
                    "Discussion not found",
                    ApiResponse.HTTP_STATUS.NOT_FOUND
                );
            }
            return ApiResponse.success(
                discussion,
                "Discussion updated successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error updating discussion",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Delete discussion
    async deleteDiscussion(id) {
        try {
            const result = await discussionRepository.deleteDiscussion(id);
            if (!result) {
                throw new AppError(
                    "Discussion not found",
                    ApiResponse.HTTP_STATUS.NOT_FOUND
                );
            }
            return ApiResponse.success(
                null,
                "Discussion deleted successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error deleting discussion",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Add reply to discussion
    async addReply(replyData) {
        try {
            const reply = await discussionRepository.addReply(replyData);
            return ApiResponse.success(
                reply,
                "Reply added successfully",
                ApiResponse.HTTP_STATUS.CREATED
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error adding reply",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Get replies by discussion ID
    async getRepliesByDiscussionId(discussionId) {
        try {
            const replies = await discussionRepository.getRepliesByDiscussionId(discussionId);
            return ApiResponse.success(
                replies,
                "Replies retrieved successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error retrieving replies",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Update reply
    async updateReply(id, updateData) {
        try {
            const reply = await discussionRepository.updateReply(id, updateData);
            if (!reply) {
                throw new AppError(
                    "Reply not found",
                    ApiResponse.HTTP_STATUS.NOT_FOUND
                );
            }
            return ApiResponse.success(
                reply,
                "Reply updated successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error updating reply",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Delete reply
    async deleteReply(id) {
        try {
            const result = await discussionRepository.deleteReply(id);
            if (!result) {
                throw new AppError(
                    "Reply not found",
                    ApiResponse.HTTP_STATUS.NOT_FOUND
                );
            }
            return ApiResponse.success(
                null,
                "Reply deleted successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error deleting reply",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Get discussions by user ID
    async getDiscussionsByUserId(userId) {
        try {
            const discussions = await discussionRepository.getDiscussionsByUserId(userId);
            return ApiResponse.success(
                discussions,
                "User discussions retrieved successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error retrieving user discussions",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Get replies by user ID
    async getRepliesByUserId(userId) {
        try {
            const replies = await discussionRepository.getRepliesByUserId(userId);
            return ApiResponse.success(
                replies,
                "User replies retrieved successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error retrieving user replies",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Search discussions
    async searchDiscussions(searchTerm) {
        try {
            const discussions = await discussionRepository.searchDiscussions(searchTerm);
            return ApiResponse.success(
                discussions,
                "Search results retrieved successfully"
            );
        } catch (error) {
            throw new AppError(
                error.message || "Error searching discussions",
                error.statusCode || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export default new DiscussionService();
