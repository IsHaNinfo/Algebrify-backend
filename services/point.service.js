import pointRepository from "../repositories/point.repo.js"

class DiscussionService {
    async create(data) {
        try {
            const result = await pointRepository.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    }


    async getAll() {
        try {
            const result = await pointRepository.getAll();
            return result;
        } catch (error) {
            throw error;
        }
    }

}
export default new DiscussionService();