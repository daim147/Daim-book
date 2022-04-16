export const codeText = `import React, { useState, useRef, useEffect } from 'react';
import ReactDom from 'react-dom';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
	const [edit, setEdit] = useState({
		id: null,
		value: '',
	});

	const submitUpdate = (value) => {
		updateTodo(edit.id, value);
		setEdit({
			id: null,
			value: '',
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}

	return todos.map((todo, index) => (
		<div
			key={index}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				margin: '20px',
			}}
		>
			<div key={todo.id} onClick={() => completeTodo(todo.id)}>
				{todo.text}
			</div>

			<div
				onClick={() => removeTodo(todo.id)}
				style={{ marginLeft: 'auto', marginRight: '10px' }}
			>
				Remove
			</div>
			<div onClick={() => setEdit({ id: todo.id, value: todo.text })}>edit</div>
		</div>
	));
};

function TodoForm(props) {
	const [input, setInput] = useState(props.edit ? props.edit.value : '');

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onSubmit({
			id: Math.floor(Math.random() * 10000),
			text: input,
		});
		setInput('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="todo-form"
			style={{ textAlign: 'center' }}
		>
			{props.edit ? (
				<>
					<input
						placeholder="Update your item"
						value={input}
						onChange={handleChange}
						name="text"
						ref={inputRef}
						className="todo-input edit"
					/>
					<button onClick={handleSubmit} className="todo-button edit">
						Update
					</button>
				</>
			) : (
				<>
					<input
						placeholder="Add"
						value={input}
						onChange={handleChange}
						name="text"
						className="todo-input"
						ref={inputRef}
					/>
					<button onClick={handleSubmit} className="todo-button">
						Add
					</button>
				</>
			)}
		</form>
	);
}

function TodoList() {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		if (!todo.text || /^\s*$/.test(todo.text)) {
			return;
		}

		const newTodos = [todo, ...todos];

		setTodos(newTodos);
		console.log(...todos);
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}

		setTodos((prev) =>
			prev.map((item) => (item.id === todoId ? newValue : item))
		);
	};

	const removeTodo = (id) => {
		const removedArr = [...todos].filter((todo) => todo.id !== id);

		setTodos(removedArr);
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Todos</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</>
	);
}
function App() {
	return (
		<div className="todo-app">
			<TodoList />
		</div>
	);
}
const styles = {};
// ReactDom.render(<App />, document.getElementById('root'))
show(App());`;

export const text = `# Daim-book

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

- Click any text cell (**including this one**) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!
- You can show any React component, string, number, or anything else by calling the 'show' function. This is a function built into this environment. Call show multiple times to show multiple values
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell
 
All of your changes get saved to the file you opened JBook with. So if you ran 'npx daim-book serve test.js', all of the text and code you write will be saved to the 'test.js' file.`;
