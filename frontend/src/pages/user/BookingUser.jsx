import React, { useEffect, useState } from "react";
import FormTextArea from "../../components/FormTextArea";
import FormDateInput from "../../components/FormDateInput";
import FormInput from "../../components/FormInput";
import api from "../../services/api";
import Dropdown from "../../components/Dropdown";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BookingUser = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const selectedRoomFromList = location.state?.room || null;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(selectedRoomFromList);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await api.get("/room");
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

  useEffect(() => {
    if (selectedRoomFromList) {
      setSelectedRoom(selectedRoomFromList);
    }
  }, [selectedRoomFromList]);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room); // simpan object, bukan id
  };

  const formatDateForBackend = (dateString) => {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return "";
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRoom) {
      toast.error("Pilih ruangan terlebih dahulu!");
      return;
    }

    const formattedDate = formatDateForBackend(date);
    if (!formattedDate) {
      toast.error("Format tanggal tidak valid!");
      return;
    }

    const payload = {
      user_id: user.id,
      room_id: selectedRoom.id,
      date: formattedDate,
      start_time: startTime,
      duration: parseInt(duration, 10),
      purpose,
    };

    console.log("Payload to backend:", payload);

    try {
      await api.post("/booking", payload);
      toast.success("Booking berhasil ditambahkan!");

      setSelectedRoom(null);
      setDate("");
      setStartTime("");
      setDuration("");
      setPurpose("");
    } catch (err) {
      // console.log("Error message:", err.response?.data?.errors?.room_id);
      toast.error(err.response?.data?.errors?.room_id?.[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2">
        <h1 className="text-3xl font-bold mb-4">Tambah Booking</h1>

        <div className="bg-white shadow-md rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              label="Pilih Ruangan"
              items={rooms}
              value={selectedRoom?.name}
              onSelect={handleSelectRoom}
            />

            <FormInput
              label="Waktu Mulai"
              type="time"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Masukkan waktu mulai"
            />

            <FormDateInput
              label="Tanggal Booking"
              name="booking_date"
              value={date}
              placeholder="Pilih Tanggal (YYYY-MM-DD)"
              onChange={(e) => setDate(e.target.value)}
            />

            <FormInput
              label="Durasi (menit)"
              type="number"
              value={duration}
              name="duration"
              placeholder="Masukkan durasi"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <FormTextArea
              label="Keperluan/Keterangan"
              name="purpose"
              value={purpose}
              placeholder="Masukkan keperluan/keterangan"
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Tambah
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingUser;
