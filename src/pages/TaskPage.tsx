import { Modal, Button, Form, Radio, Input, Select, Empty } from "antd"
import TaskItem from "../components/TaskComponent/TaskItem"
import { useMemo, useState } from "react"
import { connect } from "react-redux";
import { addTaskAction, updateTaskAction } from "../redux/actions/taskActions";
import { Task } from "../interfaces/task";

type Props = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

function TaskPage ({addTask, tasks, updateTask}: Props) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [taskList, setTaskList] = useState<Task[]>(tasks)
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState<boolean>(false) 
    const [taskIdToEdit, setTaskIdToEdit] = useState<string>("")
    const [filterType, setFilterType] = useState<string>("All")
    

    useMemo(() => {
      switch(filterType){
        case 'Completed':
          setTaskList(tasks.filter(task => task.status === 'Completed'))
          break;
        case 'Pending':
          setTaskList(tasks.filter(task => task.status === 'Pending'))
          break;
        default:
          setTaskList(tasks)
          break;
      }
    }, [tasks, filterType])
    
    async function createTaskHandler(){

       try{
        const values = await form.validateFields();
        
        addTask(values)
        form.resetFields()
        setModalOpen(false)
       }catch(e){
        console.error(e)
       }
     

        
        
        
    }

    function editTaskCallback(task: Task){
      setModalOpen(true)
      setIsEdit(true)
      form.setFieldsValue(task)
      setTaskIdToEdit(task.id)
    }

    async function updateTaskHandler(){
      try{
        const values = await form.validateFields();
      updateTask({...values, id: taskIdToEdit})
      setModalOpen(false)
      setIsEdit(false)
      form.resetFields()
      }catch(e){
        console.error(e)
      }
    }


    return <>
    <div style={{display: 'flex', width: '100%', justifyContent:'space-between'}}>
    <Button type="primary" onClick={() => setModalOpen(true)}>Add Task</Button>
    <Select
    defaultValue="All"
    placeholder="Filter"
    style={{ width: 200 }}
    onChange={(type) => setFilterType(type)}
    options={[
      { label: 'All', value: 'All' },
      { label: 'Completed', value: 'Completed' },
      { label: 'Pending', value: 'Pending' },
    ]}
  />
    </div>
    
    {taskList?.length > 0 ?  taskList?.map((task: Task) => {
        return <TaskItem key={task.id} task={task} onEditCallback={editTaskCallback}/>
    }): <><Empty /></>}
    <Modal
        title={isEdit ? "Update Task" : "Create Task"}
        centered
        open={modalOpen}
        onOk={() => isEdit ? updateTaskHandler() : createTaskHandler()}
        onCancel={() => setModalOpen(false)}
        okText={isEdit ? 'Update' : "Create"}
      >
        <Form
      layout="vertical"
      form={form}
    >
      
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please add a title' }]}>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please add a description' }]}>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status' }]}>
        <Radio.Group>
          <Radio.Button value="Completed">Completed</Radio.Button>
          <Radio.Button value="Pending">Pending</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
      </Modal>
    </>

}

const mapStateToProps = (state: any ) => {
    return {
        tasks: state.task.tasks
    }
}

const mapDispatchToProps = {
    addTask: addTaskAction,
    updateTask: updateTaskAction
}

export default connect(mapStateToProps, mapDispatchToProps) (TaskPage)