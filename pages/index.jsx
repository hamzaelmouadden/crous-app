import { useState } from "react";
import prisma from "../lib/prisma"

export async function getServerSideProps() {
  const allRooms = await prisma.room.findMany();
  return {
    props: { allRooms },
  }
}

export default function Home({ allRooms }) {
  const [rooms, setRooms] = useState(allRooms);

  const deleteRoom = async (id) => {
    await fetch("/api/room", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setRooms(rooms.filter((room) => room.id !== id));
  }
  return (
    <>
      <div className="flex flex-col space-y-6 items-center bg-slate-800 overflow-hidden">
        <h1 className="text-gray-100 font-semibold">Rooms</h1>
        <div className="shadow-sm overflow-hidden my-8">
          <table className="border-collapse table-auto w-full text-sm overflow-y-scroll">
            <thead>
              <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Numéro</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Étage</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Réservé</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Type</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Suppression</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800">
              {
                rooms.map((room) => (
                  <tr key={room.id}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{room.number}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{room.floor}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{room.reserved ? "Oui" : "Non"}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{room.type}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <button onClick={() => deleteRoom(room.id)} className="rounder-lg bg-rose-600 text-red-300 px-3 py-1 text-sm">X</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>

    </>

  )
}
