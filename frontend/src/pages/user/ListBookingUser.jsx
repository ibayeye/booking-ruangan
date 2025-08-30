import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import ModalEditBooking from "../../components/ModalEditBooking";

const ListBookingUser = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/booking");
      setBookings(res.data.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get("/room");
      setRooms(res.data.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setRooms([]);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const handleDelete = async () => {
    try {
      await api.delete(`/booking/${selectedBooking.id}`);
      setIsDeleteModalOpen(false);
      setSelectedBooking(null);
      fetchBookings();
      toast.error("Booking dihapus!");
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Gagal menghapus booking!");
    }
  };

  const handleEditModal = (booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  const confirmBooking = async (updatedBooking) => {
    try {
      const apiData = {
        room_id: updatedBooking.room_id,
        start_time: updatedBooking.start_time,
        duration: updatedBooking.duration,
        date: updatedBooking.date,
        purpose: updatedBooking.purpose,
        status: updatedBooking.status || "submit",
      };

      const response = await api.put(`/booking/${updatedBooking.id}`, apiData);
      setIsEditModalOpen(false);
      setSelectedBooking(null);

      setTimeout(async () => {
        await fetchBookings();
      }, 500);

      toast.success("Booking berhasil diperbarui!");
    } catch (err) {
      console.error("Gagal update booking", err);
      console.error("Error response:", err.response?.data);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Gagal memperbarui booking!");
      }
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Daftar Booking</h1>

      <div className="bg-white shadow-md rounded-md p-4">
        <div className="h-[400px] overflow-y-auto rounded-md border border-base-300">
          <table className="table table-md table-pin-rows table-pin-cols">
            <thead>
              <tr className="text-md font-bold">
                <td>No</td>
                <td>Nama Ruangan</td>
                <td>Tanggal</td>
                <td>Durasi</td>
                <td>Keperluan/Keterangan</td>
                <td>Status</td>
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
              ) : bookings.length > 0 ? (
                bookings.map((item, index) => (
                  <tr key={item.id} className="hover:bg-base-300">
                    <td>{index + 1}</td>
                    <td>{item.room?.name}</td>
                    <td>{item.date ? formatDate(item.date) : "-"}</td>
                    <td>{`${item.duration} Menit`}</td>
                    <td>{item.purpose}</td>
                    <td className="capitalize">{item.status}</td>
                    <td>
                      <div className="grid gap-2">
                        <button
                          className="btn btn-xs btn-error text-white"
                          onClick={() => {
                            setSelectedBooking(item);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Hapus
                        </button>
                        <button
                          className="btn btn-xs btn-primary"
                          onClick={() => handleEditModal(item)}
                        >
                          Edit
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
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Konfirmasi Hapus"
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <p>
          Apakah yakin ingin menghapus booking{" "}
          <b>{selectedBooking?.room?.name}</b>?
        </p>
        <div className="modal-action">
          <button className="btn" onClick={() => setIsDeleteModalOpen(false)}>
            Batal
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Hapus
          </button>
        </div>
      </Modal>

      <ModalEditBooking
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        booking={selectedBooking}
        rooms={rooms}
        onConfirm={confirmBooking}
      />
    </div>
  );
};

export default ListBookingUser;
