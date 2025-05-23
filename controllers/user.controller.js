import * as userService from "../services/user.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendEmail from '../config/EmailSend/sendEmail.js';

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(ApiResponse.HTTP_STATUS.CREATED).json(
            ApiResponse.success(user, 'User created successfully')
        );
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(ApiResponse.HTTP_STATUS.OK).json({
            status: ApiResponse.HTTP_STATUS.OK,
            data: users,
            message: "User retrieved successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        return res.status(ApiResponse.HTTP_STATUS.OK).json({
            status: ApiResponse.HTTP_STATUS.OK,
            data: user,
            message: "User retrieved successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        return res.status(ApiResponse.HTTP_STATUS.OK).json({
            status: ApiResponse.HTTP_STATUS.OK,
            data: user,
            message: "User updated successfully"
        });

    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.id);

        return res.status(ApiResponse.HTTP_STATUS.OK).json({
            status: ApiResponse.HTTP_STATUS.OK,
            data: result,
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};



export const registerUser = async (req, res, next) => {
    try {
        const userData = {
            ...req.body,
        };
        console.log(userData);

        const { user, token } = await userService.register(userData);
        const formattedUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(ApiResponse.HTTP_STATUS.CREATED).json({
            status: ApiResponse.HTTP_STATUS.CREATED,
            data: {
                user: formattedUser,
                token: token
            },
            message: "User registered successfully"
        });


    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.login(email, password);

        const formattedUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(ApiResponse.HTTP_STATUS.OK).json({
            status: ApiResponse.HTTP_STATUS.OK,
            data: {
                user: formattedUser,
                token: token
            },
            message: "Login successfully"
        });
    } catch (error) {
        next(error);
    }
}; 