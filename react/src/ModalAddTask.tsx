import React from "react";

import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";

type ModalAddTaskPropsType = {
	isVisible: boolean;
	onSubmit: (event: any) => void;
	onClose: () => void;
};

function ModalAddTask(props: ModalAddTaskPropsType) {
	return (
		<Modal show={props.isVisible} onHide={props.onClose}>
			<Form onSubmit={props.onSubmit}>
				<Modal.Header>
					<Modal.Title>Nova Tarefa</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Control
						type="text"
						placeholder="Nome da Tarefa"
						id="task-name"
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={props.onClose}>
						Fechar
					</Button>
					<Button variant="primary" type="submit">
						Adicionar
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default ModalAddTask;
