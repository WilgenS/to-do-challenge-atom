import {Task} from "../../domain/models/task.model";
import {TaskRepository} from "../../domain/repositories/task.repository";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) { }

  async execute(taskAdd: Task): Promise<Task> {
    const newTask: Task = {
      ...taskAdd,
      assignedToId: taskAdd.assignedToId || taskAdd.supervisorId,
      createdAt: new Date(),
    };
    return await this.taskRepository.create(newTask);
  }
}
