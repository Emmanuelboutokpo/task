import React, { useState } from 'react'
import './taskComponent.css';
import { BiAddToQueue } from 'react-icons/bi';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { formatDateToCustomFormat } from '../../format';
import { useTaskContext } from '../../context/TaskContext';
import { useDrag, useDrop } from 'react-dnd'
import { Modal, Table } from 'react-bootstrap';


const TaskComponent = ({ handleShow }) => {
  const statues = ['To do', 'Ouvert', 'En cours', 'En validation', 'Terminer'];
  const { state } = useTaskContext();

  return (
    <div className="listTaskHigh">
      <div className="contTashHigh">
        <div className="taskJourney">
          <h5>Gestion des tâches festives</h5>
          <button onClick={handleShow} className='add'>
            Créer une tâche <BiAddToQueue />
          </button>
        </div>
        <div className="taskDate">
          <p>Nom du projet créer ilya 4min</p>
          <div className="peopleTask">
             Contributeurs :
            <div className="peopleImg">
              <img src="./assets/img/img1.png" alt="x" />
              <img src="./assets/img/img2.png" alt="x" />
            </div>
          </div>

        </div>
      </div>
      <div>
        <table className='taskContent'>
          <thead>
            <tr className='projetContent'>
              {
                statues.map((item, id) => (
                  <th className='thcontent' key={id}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              (
                state.tasks.map((projetLier, index) => (
                  <tr key={index} className='trContent scrollable-content'>
                    {statues.map((item, id) => (
                      <GenerateTaskList
                        key={id}
                        item={item}
                        projetLier={projetLier}
                        groupedTasks={state.tasks}
                        index={index}
                        handleShow={handleShow}
                      />
                    ))}
                  </tr>
                ))
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskComponent;

const GenerateTaskList = ({ item, projetLier, groupedTasks, handleShow }) => {
  const [isDraggingOver, setDraggingOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateStatus } = useTaskContext();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tasks',
    drop: (droppedItem) => {
      addItemToSection(droppedItem.id);
      setDraggingOver(false);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addItemToSection = async (id) => {
    setIsLoading(true);
    updateStatus(id, item)
    setIsLoading(false);
  }


  return (
    <td ref={drop} className={isDraggingOver ? "isdragging" : ""}>
      {isLoading ? (
        <div className="loading-indicator">Chargement...</div>
      ) : (
        <>
          {projetLier && (
            <>
              {groupedTasks
                .filter((t) => t.task_status === item)
                .map((taskDet, id) => (
                  <TaskDet taskDet={taskDet} key={id} id={id} handleShow={handleShow} />
                ))}
            </>
          )}
        </>
      )}
    </td>

  );
};

const TaskDet = ({ taskDet, id, handleShow }) => {
  const [show, setShow] = useState(false);
  const { deleteTask } = useTaskContext();

  const handleShows = (id) => {

    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  };


  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tasks',
    item: { id: taskDet.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const editUser = (id) => {
    handleShow(id)
  }

  const onDeleteCategory = (index) => {
    deleteTask(index)
  }

  return (
    <div ref={drag} className={isDragging ? 'isdragging' : 'bigContainer'}>
      <h3 className="titleProj">
        {taskDet.task_title}
      </h3>

      <div className="dateContainer">
        <div className="dateEnd">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path opacity="0.5" d="M7.96562 6.46363L7.75239 6.63407C7.52392 6.81612 7.19827 6.81684 6.96909 6.63552L6.7515 6.46363C6.00737 5.87471 5.49532 5.24227 5.22915 4.58372C5.15082 4.38934 5.17403 4.16886 5.2908 3.99552C5.40829 3.82218 5.60339 3.71774 5.81299 3.71774H7.35929H8.90485C9.11445 3.71774 9.31028 3.82218 9.42705 3.99552C9.54382 4.16886 9.56703 4.38934 9.4887 4.58372C9.22325 5.23937 8.71048 5.87181 7.96562 6.46363ZM13.8614 13.8919C13.9963 14.7884 13.7308 15.7 13.1354 16.3919C12.5305 17.094 11.6536 17.4965 10.7282 17.4965H4.00923C3.08451 17.4965 2.20692 17.0933 1.60277 16.3919C1.00586 15.6986 0.741137 14.7869 0.876038 13.8883C1.15309 12.0446 2.11191 10.3352 3.73073 8.79322C2.11191 7.25201 1.15309 5.54253 0.876038 3.69815C0.741137 2.80026 1.00586 1.88786 1.60277 1.19523C2.20692 0.493883 3.08451 0.0913544 4.00923 0.0913544H10.7282C11.6529 0.0913544 12.5305 0.493883 13.1354 1.19523C13.7316 1.88786 13.9963 2.79881 13.8614 3.69598C13.5865 5.53455 12.627 7.24548 11.0038 8.79395C12.627 10.3431 13.5872 12.0526 13.8614 13.8919ZM11.7095 14.2139C11.4673 12.5937 10.4439 11.0561 8.66986 9.6447C8.41021 9.43872 8.25935 9.12467 8.25935 8.79322C8.25935 8.46177 8.41021 8.14773 8.66986 7.94175C10.4446 6.53036 11.4673 4.9935 11.7095 3.37323C11.7646 3.00334 11.5934 2.73861 11.4861 2.61459C11.2954 2.39266 11.019 2.26573 10.7282 2.26573H4.00923C3.7184 2.26573 3.44207 2.39338 3.25132 2.61459C3.14398 2.73934 2.97209 3.00406 3.02793 3.37468C3.27235 5.0022 4.29499 6.53834 6.06612 7.93957C6.32649 8.14555 6.4788 8.46032 6.4788 8.7925C6.4788 9.12467 6.32649 9.43944 6.06612 9.64542C4.29499 11.0474 3.27235 12.5828 3.02793 14.2103C2.97209 14.5817 3.14398 14.8457 3.25204 14.9704C3.44279 15.1923 3.71912 15.3193 4.00996 15.3193H10.7289C11.0198 15.3193 11.2961 15.1923 11.4868 14.9711C11.5942 14.8471 11.7653 14.5824 11.7102 14.2132L11.7095 14.2139Z" fill="black" />
          </svg>
          {taskDet.task_completed_date === null ? Date.now : formatDateToCustomFormat(taskDet.task_completed_date)}
        </div>
        <div className="coments">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M5.65214 1.91133H14.8451M1.3064 1.74418L1.97497 2.41276L3.64641 0.741318M1.3064 6.7585L1.97497 7.42708L3.64641 5.75564M1.3064 11.7728L1.97497 12.4414L3.64641 10.77M5.65214 6.92565H14.8451M5.65214 11.94H14.8451" stroke="#646464" strokeWidth="1.25358" strokeLinecap="round" strokeLinejoin="round" />
          </svg> 9/20
        </div>
      </div>
      <div className="comentsImg">
        <div className="imgColabs">
          <img src="./assets/img/img4.png" alt="x" />
        </div>
        <div className="commentsLength">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M1.00661 16.1882C0.868409 16.1906 0.731688 16.1595 0.60813 16.0976C0.484572 16.0356 0.377851 15.9447 0.297088 15.8325C0.216326 15.7203 0.163924 15.5903 0.144361 15.4534C0.124798 15.3166 0.138655 15.1771 0.184749 15.0468L1.61159 10.3439C1.31979 9.54226 1.16543 8.69711 1.155 7.84408C1.15275 6.85945 1.35081 5.88465 1.73715 4.97898C2.20548 3.86358 2.94025 2.88007 3.87705 2.11464C4.81384 1.34922 5.92408 0.825246 7.11046 0.588647C8.29683 0.352048 9.52313 0.410044 10.6819 0.757552C11.8406 1.10506 12.8965 1.73147 13.7568 2.58189C14.4245 3.26019 14.9588 4.05782 15.3321 4.93332C15.7113 5.83692 15.9066 6.80705 15.9066 7.787C15.9066 8.76696 15.7113 9.73708 15.3321 10.6407C14.9588 11.5162 14.4245 12.3138 13.7568 12.9921C12.7559 13.9913 11.4895 14.6825 10.1077 14.984C8.72596 15.2854 7.28672 15.1844 5.96059 14.6929L1.25773 16.154C1.17594 16.1766 1.09147 16.1881 1.00661 16.1882ZM8.5289 2.13672C7.772 2.13452 7.02252 2.28597 6.32586 2.58189C4.97626 3.15145 3.89732 4.21813 3.31238 5.56113C3.01885 6.26052 2.86766 7.0114 2.86766 7.76988C2.86766 8.52837 3.01885 9.27924 3.31238 9.97863C3.38038 10.1667 3.38038 10.3727 3.31238 10.5608L2.26223 13.9852L5.68664 12.935C5.87473 12.867 6.0807 12.867 6.26879 12.935C7.65484 13.5107 9.21185 13.5172 10.6027 12.9532C11.9935 12.3891 13.1062 11.3 13.6998 9.92155C14.0338 9.06774 14.1572 8.14602 14.0596 7.23441C13.9619 6.3228 13.6461 5.44813 13.1388 4.68443C12.6315 3.92072 11.9478 3.29047 11.1453 2.84699C10.3429 2.40352 9.44544 2.15989 8.5289 2.13672Z" fill="#666666" />
            <path d="M18.6994 19.8295C18.616 19.8406 18.5316 19.8406 18.4482 19.8295L13.7454 18.4027C11.9786 19.0698 10.0224 19.0291 8.28489 18.289C6.54737 17.5489 5.16266 16.1666 4.41956 14.4303C4.36877 14.3276 4.33971 14.2155 4.33421 14.101C4.32871 13.9866 4.34689 13.8722 4.3876 13.765C4.42831 13.6579 4.49068 13.5603 4.57081 13.4784C4.65094 13.3965 4.74712 13.3319 4.85332 13.2889C4.9566 13.2414 5.06829 13.215 5.1819 13.2111C5.2955 13.2073 5.40873 13.2261 5.51498 13.2665C5.62124 13.3068 5.71839 13.368 5.80077 13.4463C5.88315 13.5246 5.9491 13.6185 5.99479 13.7226C6.26611 14.3692 6.65291 14.961 7.13626 15.4691C7.93661 16.2607 8.95318 16.7979 10.0581 17.0132C11.163 17.2285 12.3069 17.1122 13.3459 16.679C13.534 16.611 13.7399 16.611 13.928 16.679L17.3524 17.7292L16.3023 14.3048C16.2343 14.1167 16.2343 13.9107 16.3023 13.7226C16.5982 13.026 16.7497 12.2765 16.7475 11.5196C16.7502 10.7755 16.6053 10.0383 16.3212 9.35054C16.0371 8.66281 15.6194 8.03826 15.0923 7.51302C14.8614 7.2212 14.6055 6.95003 14.3275 6.70258C14.2277 6.6427 14.1412 6.5631 14.0732 6.46864C14.0052 6.37418 13.9572 6.26685 13.932 6.1532C13.9069 6.03955 13.9053 5.92198 13.9271 5.80766C13.949 5.69334 13.9939 5.58469 14.0592 5.48833C14.1245 5.39197 14.2087 5.30993 14.3068 5.24722C14.4048 5.18452 14.5146 5.14247 14.6295 5.12364C14.7443 5.10481 14.8618 5.1096 14.9748 5.13772C15.0877 5.16583 15.1937 5.21668 15.2864 5.28715C15.6947 5.55073 16.0769 5.85269 16.4278 6.18892C17.0992 6.86421 17.634 7.66258 18.0031 8.54035C18.3903 9.44974 18.5884 10.4284 18.5852 11.4169C18.5828 12.2929 18.4283 13.1619 18.1286 13.9852L19.5555 18.688C19.6016 18.8183 19.6154 18.9579 19.5959 19.0947C19.5763 19.2315 19.5239 19.3616 19.4431 19.4737C19.3624 19.5859 19.2556 19.6769 19.1321 19.7388C19.0085 19.8008 18.8718 19.8319 18.7336 19.8295H18.6994Z" fill="#666666" />
          </svg> 6
        </div>
      </div>
      <div className="projetLiers">
        <span onClick={() => handleShows(taskDet.id)}><FaEye /> Detail</span>
        <button
          className="btn-edit"
          onClick={(e) => editUser(taskDet.id)}
        > <FaEdit />
        </button>
      </div>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header>
          <Modal.Title style={{ textAlign: 'center!important' }}>
            Detail de la tâche
          </Modal.Title>
          <button type="button" className="btn-close improveBtn" onClick={handleClose} aria-label="close"></button>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover className="ta">
            <thead>
              <tr className="stylet">
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Titre de la tâche</th>
                <th style={{ textAlign: "center" }}>Date de debut </th>
                <th style={{ textAlign: "center" }}>Priorité de la tâche</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>

              <tr>
                <th scope="row">{id + 1}</th>
                <td>{taskDet.task_title}</td>
                <td>{formatDateToCustomFormat(taskDet.task_started_date)}</td>
                <td>{taskDet.task_priority}</td>
                <td>{taskDet.task_description}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={(e) => onDeleteCategory(taskDet.id)}
                  >
                    <FaTrash />
                  </button>

                </td>
              </tr>


            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>

  )
}

