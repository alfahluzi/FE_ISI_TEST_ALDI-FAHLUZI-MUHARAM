"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import Modal from "../components/client/Modal";
import Button from "../components/server/Button";

export default function Home() {
  const cookies = useCookies();
  const [user, setUser] = useState<{ uid: string; username: string }>();
  useEffect(() => {
    setUser({
      uid: cookies.get("uid") || "",
      username: cookies.get("username") || "",
    });
  }, []);

  const [projectName, setProjectName] = useState("");
  const [members, setMembers] = useState<{ username: string; role: string }[]>(
    []
  );
  const [addMemberMsg, setAddMemberMsg] = useState("");
  const [latesProjects, setLatesProjects] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/project/user/${user!.uid}`).then(async (response) => {
      const data = await response.json();
      setLatesProjects(data.data.project);
    });
  }, [user]);

  return (
    <div className="text-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <div className="mb-2">
            Welcome{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              {user?.username}
            </code>
            .
          </div>
          <div>Here is your recent project!</div>
          <ul className="mt-4 list-disc list-inside">
            {latesProjects &&
              latesProjects.map((project, i) => {
                if (i > 3) return;
                return (
                  <li key={i}>
                    <Link href={`/todo/${project.id}`}>{project.name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="flex  items-center flex-col sm:flex-row">
          <Modal
            content={
              <div className="flex flex-col gap-1">
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                  placeholder="Project name"
                />
                <label className="col-span-2">Member </label>
                {members &&
                  members.map((member, i) => {
                    return (
                      <div key={i} className="grid grid-cols-2 gap-2">
                        <div className="grid-cols-1">{member.username}</div>
                        <div className="grid-cols-1">
                          <select
                            className="border rounded p-1"
                            onChange={(e) => {
                              const updatedMembers = [...members];
                              updatedMembers[i].role = e.target.value;
                              setMembers(updatedMembers);
                            }}
                          >
                            <option value="">Pilih Role</option>
                            <option value="lead">Lead</option>
                            <option value="team">Team</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
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
                <Button
                  onClick={async () => {
                    const projectData = {
                      name: projectName,
                      members: members.map((member) => ({
                        username: member.username,
                        role: member.role.toLowerCase(),
                      })),
                    };

                    projectData.members.push({
                      username: user!.username,
                      role: "lead",
                    });

                    const response = await fetch("/api/project", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(projectData),
                    });

                    if (response.ok) {
                      alert("Project created successfully!");
                      window.location.reload();
                    } else {
                      alert("Failed to create project." + response.statusText);
                    }
                  }}
                >
                  Create
                </Button>
              </div>
            }
            onClose={() => {}}
            show={false}
            title="Create Project"
          >
            Create new project
          </Modal>
        </div>
        <Button
          onClick={async () => {
            await fetch("/api/logout", {
              method: "GET",
            });
            window.location.reload();
          }}
        >
          Log Out
        </Button>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/aldi-fahluzi-muharam/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/alfahluzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          My GitHub →
        </a>
      </footer> */}
    </div>
  );
}
