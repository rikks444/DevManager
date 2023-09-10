import { Task } from "../../interfaces/task";
import { TaskItemWrapper, ActionContainer } from "./TaskItem.css";
import { Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { removeTaskAction } from "../../redux/actions/taskActions";
import { connect } from "react-redux";
import { useThemeContext } from "../../customHooks/useTheme";

type Prop = {
    task: Task
    removeTask: (taskId: string) => void;
    onEditCallback: (task: Task) => void;
}

const  TaskItem = ({task, removeTask, onEditCallback}: Prop) => {

    const {theme} = useThemeContext()

    return <TaskItemWrapper className="task-wrapper" style={{backgroundColor: theme === 'light' ? "white" : "black", color: theme === 'light' ? "black" : "white"}}>
        <div>
            <span>{task.title} <Tag color={task.status === "Completed" ? "#52c419" : "#faad14"}>{task.status === "Completed" ? "Completed" : "Pending"}</Tag></span>
            <p>{task.description}</p>
        </div>
        <ActionContainer style={{position: 'absolute'}}>
        <Button type="primary"  danger shape="circle" onClick={() => removeTask(task.id)}><DeleteOutlined /></Button>
        <Button type="primary" shape="circle" onClick={() => onEditCallback(task)}><EditOutlined /></Button>
        </ActionContainer>

    </TaskItemWrapper>
}

const mapDispatchToProps = {
    removeTask: removeTaskAction
}

export default connect(null, mapDispatchToProps) (TaskItem)