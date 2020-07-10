class Task {
    constructor(id, title, priority, deadline, completed, subtasks) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.deadline = deadline;
        this.completed = completed;
        this.subtasks = subtasks;
    }
}

export default Task;