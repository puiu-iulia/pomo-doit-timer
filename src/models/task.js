class Task {
    constructor(id, title, priority, deadline, subtasks) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.deadline = deadline;
        this.subtasks = subtasks;
    }
}

export default Task;