import { GetAssignableUsersUseCase } from "./get-assignable-user.use-case";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/models/user.model";

const mockUserRepository = {
    getAll: jest.fn(),
} as unknown as UserRepository;

describe("GetAssignableUsersUseCase", () => {
    let useCase: GetAssignableUsersUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new GetAssignableUsersUseCase(mockUserRepository);
    });

    it("should return all users except the one with the given userId", async () => {
        const currentUserId = "user-1";
        const users: User[] = [
            { uid: "user-1", email: "user1@test.com", name: "User", lastname: "One" },
            { uid: "user-2", email: "user2@test.com", name: "User", lastname: "Two" },
            { uid: "user-3", email: "user3@test.com", name: "User", lastname: "Three" },
        ];

        (mockUserRepository.getAll as jest.Mock).mockResolvedValue(users);

        const result = await useCase.execute(currentUserId);

        expect(mockUserRepository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result).toEqual([
            { uid: "user-2", email: "user2@test.com", name: "User", lastname: "Two" },
            { uid: "user-3", email: "user3@test.com", name: "User", lastname: "Three" },
        ]);
        expect(result.find(u => u.uid === currentUserId)).toBeUndefined();
    });

    it("should return an empty list if there are no other users", async () => {
        const currentUserId = "user-1";
        const users: User[] = [
            { uid: "user-1", email: "user1@test.com", name: "User", lastname: "One" },
        ];

        (mockUserRepository.getAll as jest.Mock).mockResolvedValue(users);

        const result = await useCase.execute(currentUserId);

        expect(mockUserRepository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(0);
    });

    it("should throw an error if getAll fails", async () => {
        const currentUserId = "user-1";
        const error = new Error("Database error");

        (mockUserRepository.getAll as jest.Mock).mockRejectedValue(error);

        await expect(useCase.execute(currentUserId)).rejects.toThrow(error);
    });
});
