import { useEffect, useState } from "react";
import { TicketInterface } from "../vite-env";
import { getTicketsByEmail } from "../functions/profile";
import Loader from "./Loader";

function Profile() {
  const [tickets, setTickets] = useState([] as TicketInterface[]);
  const [error, setError] = useState("" as string);
  const [loading, setLoading] = useState(true as boolean);

  const fetchTickets = async () => {
    try {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        throw new Error("Unable to retrieve email.");
      }
      const tickets: TicketInterface[] = await getTicketsByEmail(uid);
      setTickets(tickets);
      setLoading(false);
    } catch (err) {
      setError("Error fetching tickets.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  return (
    <main className="flex flex-col justify-around items-center gap-5 p-5">
      <div className="flex justify-center items-center w-full text-indigo-500 text-xl p-5 shadow-xl rounded-xl bg-white font-bold">
        <h1>Receipts</h1>
      </div>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Loader key="loader" />
        </div>
      ) : error ? (
        <div className="text-red-500 w-full flex justify-center items-center h-96">
          Error: {error}
        </div>
      ) : tickets.length > 0 ? (
        tickets.map((ticket: TicketInterface) => (
          <div
            key={ticket._id}
            className="rounded-xl shadow-xl bg-white p-5 flex flex-col justify-center items-start gap-1 text-indigo-500 w-full"
          >
            <div>
              <p>
                <span className="font-bold text-lg">ID:</span> {ticket._id}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold text-lg">Amount:</span> $
                {ticket.amount}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold text-lg">Code:</span> {ticket.code}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold text-lg">Date:</span>{" "}
                {ticket.purchase_datetime}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold text-lg">Purchaser:</span>{" "}
                {ticket.purchaser}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-indigo-500 w-full flex justify-center items-center h-96">
          You don't have any receipts.
        </div>
      )}
    </main>
  );
}

export default Profile;
