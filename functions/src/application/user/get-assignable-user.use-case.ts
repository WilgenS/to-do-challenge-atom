import {User} from "../../domain/models/user.model";
import {UserRepository} from "../../domain/repositories/user.repository";

export class GetAssignableUsersUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(userId: string): Promise<User[]> {
    try {
      const users = await this.userRepository.getAll();
      return users.filter(user => user.uid !== userId);
    } catch (error) {
      throw error;
    }
  }
}
