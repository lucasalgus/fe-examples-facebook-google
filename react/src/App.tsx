import React, { useState } from "react";

import Form from "react-bootstrap/esm/Form";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";

import { Item } from "./model/Item";

import "./App.css";
import ModalAddTask from "./ModalAddTask";

function App() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [tasks, setTasks] = useState<Item[]>([]);

	function addTaskClicked(event: any) {
		event.preventDefault();

		const taskName = event.target.elements["task-name"].value;
		const item: Item = { name: taskName, value: false };

		setTasks([...tasks, item]);
		setIsModalVisible(false);
	}

	function itemChecked(index: number) {
		const updatedTasks = [...tasks];
		updatedTasks[index].value = true;
		setTasks(updatedTasks);

		setTimeout(() => {
			removeItem(index);
		}, 500);
	}

	function removeItem(index: number) {
		const updatedTasks = [...tasks];
		updatedTasks.splice(index, 1);

		setTasks(updatedTasks);
	}

	return (
		<>
			<div className="App">
				<ListGroup as="ul">
					{tasks.map((task, index) => {
						return (
							<ListGroup.Item as="li" className="FlexSpacer">
								<span>{task.name}</span>
								<Form.Check
									inline
									onChange={() => itemChecked(index)}
									checked={task.value}
								/>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
				<div className="Spacer" />
				<Button block onClick={() => setIsModalVisible(true)}>
					Adicionar Tarefa
				</Button>
			</div>

			<ModalAddTask
				isVisible={isModalVisible}
				onSubmit={addTaskClicked}
				onClose={() => setIsModalVisible(false)}
			/>
		</>
	);
}

export default App;
