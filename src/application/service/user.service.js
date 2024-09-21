import UserRepository from "../../infrastructure/repository/user.repository";

class UserService {
    static async updateUser(userdto, userId) {
        return await UserRepository.updateUser(userdto, userId);
    }
    static async deleteUser(userId){
         return await UserRepository.deleteUser(userId);
    }

    static async getUsers(query) {
        return await UserRepository.getPage(query);
    }

    static async getUserWithRole(userId) {
        return await UserRepository.getUserWithRole(userId);
    }

    static async getUserByUserName(usename) {
      return await UserRepository.getUserByUsername(usename);
  }
}

export default UserService;
