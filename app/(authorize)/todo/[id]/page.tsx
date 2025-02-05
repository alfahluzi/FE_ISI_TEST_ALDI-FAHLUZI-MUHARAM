"use client";
import TodoTable, { TodoData } from "@/app/components/server/TodoTable";
import React, { useEffect, useState } from "react";
import Input from "../../../components/server/Input";
import Button from "../../../components/server/Button";
import { useParams } from "next/navigation";
import Modal from "@/app/components/client/Modal";
import { useCookies } from "next-client-cookies";

// const dummyData: TodoData[] = [
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
//   {
//     todo: "Implement user authentication system",
//     assignTo: ["@Julaeha", "@Junaedi", "@Saepul", "@Komarudin", "@Jinaedi"],
//     status: "Not Started",
//     details:
//       "Set up authentication using Firebase Auth and integrate it with the frontend.",
//   },
//   {
//     todo: "Design landing page UI",
//     assignTo: ["@Julaeha", "@Komarudin"],
//     status: "In Progress",
//     details:
//       "Create a responsive landing page with Tailwind CSS and ensure mobile compatibility.",
//   },
//   {
//     todo: "Optimize database queries",
//     assignTo: ["@Junaedi", "@Saepul"],
//     status: "Completed",
//     details:
//       "Refactor SQL queries to improve performance and reduce load times.",
//   },
// ];

const TodoPage = () => {
  const [detail, setDetail] = useState<TodoData | null>(null);
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [projectName, setProjectName] = useState<string>("");

  const params = useParams<{ id: string }>();
  const projectId = params.id;
  const [addMemberMsg, setAddMemberMsg] = useState("");

  // edit params
  const [editTodo, setEditTodo] = useState(detail?.todo || "");
  const [editAssignTo, setEditAssignTo] = useState<string[]>(
    detail?.assignTo || []
  );
  const [editStatus, setEditStatus] = useState(detail?.status || "pending");
  const [editDetails, setEditDetails] = useState(detail?.details || "");
  useEffect(() => {
    setEditTodo(detail?.todo || "");
    setEditAssignTo(detail?.assignTo || []);
    setEditStatus(detail?.status || "");
    setEditDetails(detail?.details || "");
  }, [detail]);

  useEffect(() => {
    fetch("/api/project/" + projectId).then(async (response) => {
      const data = await response.json();
      setTodoData(data.data.project.todos);
      setProjectName(data.data.project.name);
    });
  }, []);

  const cookies = useCookies();
  const [user, setUser] = useState<{ uid: string; username: string }>();
  useEffect(() => {
    setUser({
      uid: cookies.get("uid") || "",
      username: cookies.get("username") || "",
    });
  }, []);

  const [projectRole, setProjectRole] = useState("");
  useEffect(() => {
    fetch("/api/project/member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: projectId, uid: user?.uid }),
    }).then(async (response) => {
      const data = await response.json();
      console.log("response aaa", data.data.result);
      setProjectRole(data.data.result.role);
    });
  }, [user]);

  const handleSaveEdit = async () => {
    try {
      const response = await fetch("/api/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: detail?.id,
          todo: editTodo,
          assignTo: editAssignTo,
          status: editStatus,
          details: editDetails,
        }),
      });

      if (response.ok) {
        alert("Todo updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Error updating todo");
    }
  };

  const handleDeleteTodo = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch("/api/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: detail?.id,
        }),
      });

      if (response.ok) {
        alert("Todo deleted successfully!");
        setDetail(null);
        window.location.reload();
      } else {
        alert("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };
  if (projectRole === "") return;
  return (
    <div className="w-full h-screen flex flex-row text-black">
      <TodoTable
        role={projectRole}
        projectId={projectId}
        projectName={projectName}
        data={todoData}
        onRowClick={(item) => {
          setDetail(item);
        }}
        className="w-full h-[calc(100%-2rem)] my-2 mx-3"
      />
      {detail && (
        <div className="w-[50%] bg-white border-2 p-12 rounded-l-lg">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-8 content-between text-xl font-bold">
              <label className="col-span-2">To Do</label>
              <Input
                className="col-span-6"
                type="text"
                placeholder="Enter todo"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                disabled={projectRole === "team"}
              />
            </div>
            <div className="grid grid-cols-8 content-between text-sm">
              <label className="col-span-2">Assign To</label>
              <Input
                className="col-span-6"
                type="text"
                placeholder={detail?.assignTo.join(", ")}
                value={editAssignTo.map((assignTo) => assignTo).join(", ")}
                disabled
              />
            </div>

            {projectRole == "lead" && (
              <Modal
                content={
                  <div>
                    <input
                      onKeyUp={async (e) => {
                        if (e.key === "Enter") {
                          const newUser = e.currentTarget.value;
                          const user = await fetch(`/api/user/${newUser}`);
                          if (user.ok) {
                            setAddMemberMsg(`Add new member ${newUser}`);
                            setEditAssignTo([...editAssignTo, newUser]);
                          } else {
                            setAddMemberMsg("User not found");
                          }
                        }
                      }}
                      className="w-full border border-gray-300 rounded-md px-2 py-1"
                      placeholder="username"
                    />
                    <span className="text-gray-500 text-xs">
                      Enter to submit, {addMemberMsg}
                    </span>
                  </div>
                }
                onClose={() => {}}
                show={false}
                title="Add member"
              >
                Add Member
              </Modal>
            )}
            <div className="grid grid-cols-8 content-between text-sm">
              <label className="col-span-2">Status</label>
              <select
                className="col-span-6"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col text-sm">
              <label className="">Details</label>
              <textarea
                className="px-2 bg-gray-100 border-gray-700 rounded-md focus:outline-none focus:border-gray-900"
                placeholder="Enter todo"
                rows={15}
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
              />
            </div>
            <Button
              className="bg-green-800 text-white"
              onClick={handleSaveEdit}
            >
              Save
            </Button>
            <Button
              className="bg-red-500 text-white"
              onClick={handleDeleteTodo}
              disabled={projectRole === "team"}
            >
              Delete
            </Button>
            <Button onClick={() => setDetail(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;
