class Task {
    constructor(id, userId, title, priority, deadline, completed, subtasks) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.priority = priority;
        this.deadline = deadline;
        this.completed = completed;
        this.subtasks = subtasks;
    }
}

export default Task;