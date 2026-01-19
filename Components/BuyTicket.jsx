"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyTicket({data}) {
  const [quantity, setQuantity] = useState(1);
  const ticketPrice = data.ticket_price;
  const total = ticketPrice * quantity;
//   const [event, setEvent] = useState("");

  const router = useRouter();

  const handleBuy = () => {
    router.push(`/checkout?quantity=${quantity}&total=${total}`);
  };

  return (
    <div className="from-blue-50 to-white flex justify-center px-4 py-12 h-[35vh]">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Tickets</h1>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700 text-md">Ticket Price:</p>
            <p className="text-sm font-medium w-[8vh]">Tk {(ticketPrice>0)?ticketPrice.toFixed(2):0}</p>
          </div>

          <div>
            <p className="text-gray-700 text-sm">Quantity:</p>
            <div className="flex items-center space-x-3">
              <button
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="text-md font-semibold w-[3vh] text-center">{quantity}</span>
              <button
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                onClick={() => setQuantity(Math.min(20,quantity + 1))}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* <div className="mb-6">
          <p className="text-gray-700 text-md">Total:</p>
          <p className="text-md text-black">Tk {total.toFixed(2)}</p>
        </div> */}

        <button
          onClick={handleBuy}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white text-md py-3 rounded shadow-md transition duration-300"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}