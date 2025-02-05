import { useState } from "react";
import Modal from "../client/Modal";
import Button from "./Button";
import Input from "./Input";

export interface TodoData {
  id?: string;
  todo: string;
  assignTo: string[];
  status: string;
  details: string;
}

export interface TodoTableProps {
  role: string;
  projectId: string;
  projectName: string;
  data: TodoData[];
  className?: string;
  onRowClick?: (item: TodoData) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({
  role,
  projectId,
  projectName,
  data,
  className,
  onRowClick,
}) => {
  const [todo, setTodo] = useState("");
  const [members, setMembers] = useState<{ username: string; role: string }[]>(
    []
  );
  const [addMemberMsg, setAddMemberMsg] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo,
          assignTo: members.map((member) => member.username),
          status: "pending",
          details: "",
          projectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      alert("Todo successfully submitted");
      window.location.reload();
    } catch (error: any) {
      alert("Error submitting todo: " + error.message);
    }
  };
  return (
    <div className={`${className} text-xs`}>
      <div className="flex flex-row justify-between items-center mb-2">
        <span className="font-bold text-lg">Project {projectName}</span>
        {role === "lead" && (
          <Modal
            onClose={() => {}}
            show={false}
            title="New Todo"
            className="my-1 p-1"
            content={
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-8 content-between">
                    <label className="col-span-2">To Do: </label>
                    <Input
                      className="col-span-6"
                      type="text"
                      placeholder="Enter todo"
                      value={todo}
                      onChange={(e) => setTodo(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-8 content-between">
                    <label className="col-span-2">Assign To: </label>
                    <Input
                      className="col-span-6"
                      type="text"
                      placeholder="Assigned users"
                      value={members
                        .map((member) => member.username)
                        .join(", ")}
                      disabled
                    />
                  </div>
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
                                setMembers([
                                  ...members,
                                  { username: newUser, role: "" },
                                ]);
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
                  {/* <div className="grid grid-cols-8 content-between">
                <label className="col-span-2">Status: </label>
                <select
                  className="col-span-6"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="grid grid-cols-8 content-between">
                <label className="col-span-2">Details: </label>
                <textarea
                  className="col-span-6"
                  placeholder="Enter todo details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div> */}
                </div>
                <Button onClick={handleSubmit} className="ml-auto my-2">
                  Submit
                </Button>
              </div>
            }
          >
            <div> New TODO </div>
          </Modal>
        )}
      </div>
      <div className="overflow-y-auto h-[calc(100%-2rem)]">
        <table className=" w-full  text-xs">
          <thead>
            <tr className="text-md font-bold">
              <th className="w-[5%] px-2 py-1 border-x">No</th>
              <th className="w-auto px-2 py-1">Todo</th>
              <th className="w-[35%] px-2 py-1 border-x">Assign To</th>
              <th className="w-[15%] px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-t cursor-pointer hover:bg-gray-200"
                onClick={() => onRowClick && onRowClick(item)}
              >
                <td className="w-[5%] px-2 py-1 border-x text-center">
                  {index + 1}
                </td>
                <td className="w-auto px-2 py-1">{item.todo}</td>
                <td className="w-[35%] px-2 py-1 border-x">
                  {item.assignTo.map((person) => {
                    return <Button key={person}>{person}</Button>;
                  })}
                </td>
                <td className="w-[15%] px-2 py-1">
                  <Button>{item.status}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;
