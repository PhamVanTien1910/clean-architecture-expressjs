import db from "../../domain/models/index.js";
import bcrypt from "bcryptjs";
import { ErrorResponse } from "../../application/response/error.response.js";
import { errorMessages, errorCodes } from "../../application/response/httpResponse/index.js";
import { NOT_FOUND } from "http-status";

class UserRepository  {
   
    static checkPassword(inputPassword, hashPassword) {
        return bcrypt.compareSync(inputPassword, hashPassword);
    }

    static async findUserByUsername(username) {
        return await db.User.findOne({
            where: { username },
        });
    }

    static async validateUserPassword(inputPassword, hashPassword) {
        const result = UserRepository.checkPassword(inputPassword, hashPassword);
        return result;
    }

    static async findUserByEmail(email) {
        return await db.User.findOne({
            where: { email },
        });
    }

    static async createUser(userDto) {
        return await db.User.create(userDto);
    }

    static async getPage({ offset, limit }) {
        const { rows, count } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone'],
            order: [['createdAt', 'DESC']],
        });

        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: offset / limit + 1,
            users: rows,
        };
    }

    static async getUserByUsername(username) {
        const user = await db.User.findOne({
            where: { username },
        });

        if (!user) {
            throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, NOT_FOUND, errorCodes.USER_NOT_EXISTS);
        }

        return user;
    }

    static async getUserWithRole(userId) {
        const user = await db.User.findOne({
            where: { id: userId },
            include: [
                {
                    model: db.Role,
                    as: 'role',
                    attributes: ['id', 'name'],
                },
            ],
        });

        if (!user) {
            throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, NOT_FOUND, errorCodes.USER_NOT_EXISTS);
        }

        return user;
    }

    static async updateUser(userdto, userId) {
        const findByUserId = await db.User.findOne({
            where: { id: userId },
        });

        if (!findByUserId) {
            throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, NOT_FOUND, errorCodes.USER_NOT_EXISTS);
        }

        await findByUserId.update(userdto);

        return {
            id: findByUserId.id,
            username: findByUserId.username,
            email: findByUserId.email,
            phone: findByUserId.phone,
            address: findByUserId.address,
        };
    }

    static async deleteUser (userId){
        const findByUserId = await db.User.findOne({
            where: { id: userId },
        });

        if (!findByUserId) {
            throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, NOT_FOUND, errorCodes.USER_NOT_EXISTS);
        }
        return await findByUserId.destroy();
    }
}

export default UserRepository;
