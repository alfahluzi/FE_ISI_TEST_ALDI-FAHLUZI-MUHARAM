"use client";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const cookies = useCookies();
  const [user, setUser] = useState<{ uid: string; username: string }>();
  useEffect(() => {
    setUser({
      uid: cookies.get("uid") || "",
      username: cookies.get("username") || "",
    });
  }, []);

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
    <div className="w-[150px] h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-bold p-4">ToDo App</h2>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Home
            </Link>
          </li>
          <hr className="border-gray-600" />
          {latesProjects &&
            latesProjects.map((project, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`/todo/${project.id}`}
                    className="block py-2 px-4 hover:bg-gray-700 rounded"
                  >
                    {project.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
