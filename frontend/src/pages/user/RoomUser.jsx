import React, { useCallback, useEffect, useState } from "react";
import CardRoom from "../../components/CardRoom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const RoomUser = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBook = (room) => {
    navigate("/add-booking", { state: { room } });
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await api.get("/room");
        // console.log("rooms response:", res.data);

        setRooms(res.data.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">List Room</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <CardRoom
              key={room.id}
              image={room.image}
              name={room.name}
              description={room.description}
              onBook={() => handleBook(room)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <span className="text-gray-500 text-lg">Tidak ada data</span>
        </div>
      )}
    </div>
  );
};

export default RoomUser;
