export interface Task {
    id: string,
    title: string,
    description: string,
    status: string,
}

export interface IStoreState{
    tasks: Task[]
}
