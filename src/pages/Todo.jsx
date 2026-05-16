import { useEffect, useState } from "react";
import API from "../Api/api";

function Todo() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");

    const [editId, setEditId] = useState(null);

    const [editTitle, setEditTitle] = useState("");

    const [message, setMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    const showMessage = (msg) => {

        setMessage(msg);

        setTimeout(() => {
            setMessage("");
        }, 2000);

    };


    const showError = (msg) => {

        setErrorMessage(msg);

        setTimeout(() => {
            setErrorMessage("");
        }, 2000);

    };


    const fetchTasks = async () => {

        try {

            const res = await API.get("/tasks");

            setTasks(res.data);

        } catch  {

            showError("Failed to load tasks");

        }
    };


    const addTask = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            return showError("Task title required");
        }

        try {

            await API.post("/tasks", {
                title,
            });

            setTitle("");

            showMessage("Task added successfully");

            fetchTasks();

        } catch {

            showError("Failed to add task");

        }
    };


    const deleteTask = async (id) => {

        try {

            await API.delete(`/tasks/${id}`);

            showMessage("Task deleted");

            fetchTasks();

        } catch {

            showError("Delete failed");

        }
    };


    const toggleTask = async (id, completed) => {

        try {

            const currentTask = tasks.find(
                (task) => task.id === id
            );

            await API.put(`/tasks/${id}`, {
                title: currentTask.title,
                completed: !completed,
            });

            showMessage("Task updated");

            fetchTasks();

        } catch{

            showError("Update failed");

        }
    };


    const startEdit = (task) => {

        setEditId(task.id);

        setEditTitle(task.title);

    };


    const updateTask = async (id, completed) => {

        if (!editTitle.trim()) {
            return showError("Task title required");
        }

        try {

            await API.put(`/tasks/${id}`, {
                title: editTitle,
                completed,
            });

            setEditId(null);

            setEditTitle("");

            showMessage("Task edited");

            fetchTasks();

        } catch{

            showError("Edit failed");

        }
    };


    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();

    }, []);


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Todo App
                </h1>


                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
                        {message}
                    </div>
                )}


                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
                        {errorMessage}
                    </div>
                )}


                <form
                    onSubmit={addTask}
                    className="flex gap-3 mb-6"
                >

                    <input
                        type="text"
                        placeholder="Enter task..."
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="flex-1 border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
                    >
                        Add
                    </button>

                </form>


                <div className="space-y-3">

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border"
                        >

                            <div className="flex items-center gap-3 flex-1">

                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() =>
                                        toggleTask(
                                            task.id,
                                            task.completed
                                        )
                                    }
                                />

                                {editId === task.id ? (

                                    <div className="flex gap-2 w-full">

                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) =>
                                                setEditTitle(
                                                    e.target.value
                                                )
                                            }
                                            className="border border-gray-300 p-2 rounded-lg w-full"
                                        />

                                        <button
                                            onClick={() =>
                                                updateTask(
                                                    task.id,
                                                    task.completed
                                                )
                                            }
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg"
                                        >
                                            Save
                                        </button>

                                    </div>

                                ) : (

                                    <p
                                        className={`text-lg ${
                                            task.completed
                                                ? "line-through text-gray-400"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {task.title}
                                    </p>

                                )}

                            </div>

                            <div className="flex gap-2 ml-4">

                                <button
                                    onClick={() =>
                                        startEdit(task)
                                    }
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteTask(task.id)
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Todo;