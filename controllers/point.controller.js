import DiscussionService from "../services/point.service.js"
import ApiResponse from "../utils/ApiResponse.js";

class DiscussionController {
    create = async (req, res, next) => {
        try {
            const result = await DiscussionService.create({ point: req.body.point, userId: req.user.id });
            res.status(ApiResponse.HTTP_STATUS.CREATED).json(
                ApiResponse.success(result)
            );
            console.log("🚀 ~ DiscussionController ~ create= ~ req.body.point:", req.body.point, req.user.id)
        } catch (error) {
            next(error);
        }
    };
    getAll = async (req, res, next) => {
        try {
            const result = await DiscussionService.getAll();
            res.status(ApiResponse.HTTP_STATUS.CREATED).json(
                ApiResponse.success(result)
            );
        } catch (error) {
            next(error);
        }
    };
} export default new DiscussionController();