import discussionService from "../services/discussion.service.js";
import AppError from "../utils/AppError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create a new discussion
export const createDiscussion = async (req, res, next) => {
    try {
        const discussionData = {
            ...req.body,
            userId: req.user.id // Get user ID from authenticated user
        };
        const result = await discussionService.createDiscussion(discussionData);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Get all discussions
export const getAllDiscussions = async (req, res, next) => {
    try {
        const result = await discussionService.getAllDiscussions();
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Get discussion by ID
export const getDiscussionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await discussionService.getDiscussionById(id);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Update discussion
export const updateDiscussion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await discussionService.updateDiscussion(id, updateData);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Delete discussion
export const deleteDiscussion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await discussionService.deleteDiscussion(id);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Add reply to discussion
export const addReply = async (req, res, next) => {
    try {
        const replyData = {
            ...req.body,
            userId: req.user.id, // Get user ID from authenticated user
            discussionId: req.params.discussionId
        };
        const result = await discussionService.addReply(replyData);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Get replies by discussion ID
export const getRepliesByDiscussionId = async (req, res, next) => {
    try {
        const { discussionId } = req.params;
        const result = await discussionService.getRepliesByDiscussionId(discussionId);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Update reply
export const updateReply = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await discussionService.updateReply(id, updateData);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Delete reply
export const deleteReply = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await discussionService.deleteReply(id);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Get discussions by user ID
export const getDiscussionsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await discussionService.getDiscussionsByUserId(userId);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Get replies by user ID
export const getRepliesByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await discussionService.getRepliesByUserId(userId);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Search discussions
export const searchDiscussions = async (req, res, next) => {
    try {
        const { searchTerm } = req.query;
        if (!searchTerm) {
            throw new AppError(
                "Search term is required",
                ApiResponse.HTTP_STATUS.BAD_REQUEST
            );
        }
        const result = await discussionService.searchDiscussions(searchTerm);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Get user's own discussions
export const getMyDiscussions = async (req, res, next) => {
    try {
        const result = await discussionService.getDiscussionsByUserId(req.user.id);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};

// Get user's own replies
export const getMyReplies = async (req, res, next) => {
    try {
        const result = await discussionService.getRepliesByUserId(req.user.id);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
};
