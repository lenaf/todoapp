interface ITask {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    createdDate: string
}

interface ITaskInput {
    title?: string;
    description?: string;
    dueDate?: string;
}