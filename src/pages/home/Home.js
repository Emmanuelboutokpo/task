import React, { useState } from "react";
import "./home.css"
import { Form, Modal, Alert, Button } from 'react-bootstrap';
import TaskComponent from "../../components/tasks/TaskComponent";
import { useTaskContext } from "../../context/TaskContext";

const Home = () => {
  const { state, addTask, updateTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(-1);
  const updatedTask = state.tasks.find((item) => item.id === isEditing);
  const updatedTasks = updatedTask !== undefined && updatedTask;
  const [task_title, setTask_title] = useState(
    (isEditing && updatedTasks?.task_title) || ""
  );
  const [task_priority, setTask_priority] = useState(
    (isEditing && updatedTasks?.task_priority) || ""
  );
  const [task_description, setTask_description] = useState(
    (isEditing && updatedTasks?.task_description) || ""
  );
  const [task_started_date, setTask_started_date] = useState(
    (isEditing && updatedTasks?.task_started_date) || ""
  );
  const [task_completed_date, setTask_completed_date] = useState(
    (isEditing && updatedTasks?.task_started_date) || ""
  );
  const [task_status, setTask_status] = useState(
    (isEditing && updatedTasks?.task_status) || ""
  );

  const [show, setShow] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isEditing);
    if (task_title === "" || task_priority === "" || task_description === "" || task_started_date === "") {
      setErr("Veuillez renseigner tous les champs");
    } else if (isEditing !== -1) {
      updateTask(isEditing, { task_title, task_priority, task_description, task_started_date, task_completed_date, task_status });
    } else {
      addTask({
        task_title, task_priority, task_description, task_started_date, task_completed_date, task_status,
      });
    }
    setTask_title("");
    setTask_priority("");
    setTask_description("");
    setTask_started_date("");
    setTask_completed_date("");
    setTask_status("");
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setIsEditing(-1);
    setTask_title("");
    setTask_priority("");
    setTask_description("");
    setTask_started_date("");
    setTask_completed_date("");
    setTask_status("");
    setErr(null);
  };

  const handleShow = (id) => {
    setIsEditing(id);

    const taskToEdit = state.tasks.find((task) => task.id === id);

    if (taskToEdit) {
      setTask_title(taskToEdit.task_title || "");
      setTask_priority(taskToEdit.task_priority || "");
      setTask_description(taskToEdit.task_description || "");
      setTask_started_date(taskToEdit.task_started_date || "");
      setTask_completed_date(taskToEdit.task_completed_date || "");
      setTask_status(taskToEdit.task_status || "");
    }

    setShow(true);
  };

  return (
    <div className="hightContainer">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 taskContents">
            <TaskComponent handleShow={handleShow} />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header>
          <Modal.Title style={{ textAlign: 'center!important' }}>
            {(isEditing !== -1) ? "Modifier la tâche" : "Créer une tache"}
          </Modal.Title>
          <button type="button" className="btn-close improveBtn" onClick={handleClose} aria-label="close"></button>
        </Modal.Header>
        {err && <Alert variant="danger">{err} </Alert>}
        <Form onSubmit={handleSubmit} >
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">

                <div className="form-group">
                  <div className="projetTitle">
                    <label>Titre de la tâche
                      <input type="text" className="loginInput" placeholder='Titre de la tâche'
                        name="task_title" value={task_title}
                        onChange={(e) => { setTask_title(e.target.value) }} />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="projetLie">
                    <label>La priorité de la tâche</label> <br />
                    <select
                      name="task_priority"
                      className="selectPrio"
                      value={task_priority}
                      onChange={(e) => { setTask_priority(e.target.value) }}
                    >
                      <option value=""></option>
                      <option value="low">faible</option>
                      <option value="medium">Moyen</option>
                      <option value="hight">Elevé</option>
                    </select>
                  </div>
                </div>


                <div className="form-group">
                  <div className="dateStart">
                    <label>Description de la tâche </label>
                    <textarea name="task_description" placeholder="Description de la tâche"
                      className="loginInput" id="" cols="30"
                      value={task_description}
                      onChange={(e) => { setTask_description(e.target.value) }} rows="10"></textarea>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="dateEnd">
                    <label>Date de début de la tâche</label>
                    <input type="date" name="task_started_date" className="loginInput"
                      value={task_started_date}
                      onChange={(e) => { setTask_started_date(e.target.value) }} min={new Date()} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Date de fin complète de la tâche</label>
                  <input type="date"
                    value={task_completed_date}
                    className="loginInput" name="task_completed_date" onChange={(e) => { setTask_completed_date(e.target.value) }} />
                </div>


                <div className="form-group">
                  <label>La status de la tâche</label> <br />
                  <select
                    name="task_status"
                    className="selectPrio"
                    value={task_status}
                    onChange={(e) => { setTask_status(e.target.value) }}
                  >
                    <option value=""></option>
                    <option value="To do">To do</option>
                    <option value="Ouvert">Ouvert</option>
                    <option value="En cours">En cours</option>
                    <option value="En validation">En validation</option>
                    <option value="Terminer">Terminer</option>
                  </select>

                </div>

              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">{(isEditing !== -1) ? "Modifier la tâche" : "Ajouter la tâche"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default Home