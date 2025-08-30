import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import RoomModal from "../../components/RoomModal";

const ListRoomAdmin = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

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

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/room/${selectedRoom.id}`);
      toast.error("Room dihapus!");
      setIsDeleteModalOpen(false);
      setSelectedRoom(null);
      fetchRooms();
    } catch (err) {
      console.error("Error deleting room:", err);
      toast.error("Gagal menghapus room!");
    }
  };

  const handleRoomModal = (room) => {
    setSelectedRoom(room);
    setIsRoomModalOpen(true);
  };

  const confirmRoom = async (formData) => {
    try {
      await api.post(`/room/${formData.get("id")}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Room berhasil diperbarui!");
      fetchRooms();
      setIsRoomModalOpen(false);
      setSelectedRoom(null);
    } catch (err) {
      console.error("Gagal update room", err);
      toast.error("Gagal update room!");
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Daftar Room</h1>

      <div className="bg-white shadow-md rounded-md p-4">
        <div className="h-[400px] overflow-y-auto rounded-md border border-base-300">
          <table className="table table-md table-pin-rows table-pin-cols">
            <thead>
              <tr className="text-md font-bold">
                <td>No</td>
                <td>Foto Ruangan</td>
                <td>Nama Ruangan</td>
                <td>Deskripsi</td>
                <td>Aksi</td>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-4">
                    <div className="flex justify-center items-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : rooms.length > 0 ? (
                rooms.map((item, index) => (
                  <tr key={item.id} className="hover:bg-base-300">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="grid gap-2">
                        <button
                          className="btn btn-xs btn-primary"
                          onClick={() => {
                            handleRoomModal(item);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => {
                            setSelectedRoom(item);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <RoomModal
            isOpen={isRoomModalOpen}
            onClose={() => setIsRoomModalOpen(false)}
            room={selectedRoom}
            onConfirm={confirmRoom}
          />
          <Modal
            isOpen={isDeleteModalOpen}
            title="Konfirmasi Hapus"
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedRoom(null);
            }}
          >
            <p>
              Apakah yakin ingin menghapus room <b>{selectedRoom?.name}</b>?
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Batal
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Hapus
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ListRoomAdmin;
