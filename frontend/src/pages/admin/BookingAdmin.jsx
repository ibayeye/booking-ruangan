import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-toastify";

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: null,
    bookingId: null,
  });

  useEffect(() => {
    fetchBookings();
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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
                <td>Atas Nama</td>
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
                    <td>{item.user?.name}</td>
                    <td>{item.date ? formatDate(item.date) : "-"}</td>
                    <td>{`${item.duration} Menit`}</td>
                    <td>{item.purpose}</td>
                    <td className="capitalize">{item.status}</td>
                    <td>
                      <div className="grid gap-2">
                        <button
                          className="btn btn-xs btn-primary"
                          onClick={() =>
                            setConfirmModal({
                              open: true,
                              type: "approve",
                              bookingId: item.id,
                            })
                          }
                          disabled={
                            item.status === "approved" ||
                            item.status === "rejected"
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-xs btn-error"
                          onClick={() =>
                            setConfirmModal({
                              open: true,
                              type: "reject",
                              bookingId: item.id,
                            })
                          }
                          disabled={
                            item.status === "approved" ||
                            item.status === "rejected"
                          }
                        >
                          Reject
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
          <ConfirmModal
            isOpen={confirmModal.open}
            title={`Konfirmasi ${
              confirmModal.type === "approve" ? "Approve" : "Reject"
            } Booking`}
            message={`Apakah Anda yakin ingin ${
              confirmModal.type === "approve" ? "menyetujui" : "menolak"
            } Booking ini?`}
            onCancel={() =>
              setConfirmModal({ open: false, type: null, bookingId: null })
            }
            onConfirm={async () => {
              try {
                if (confirmModal.type === "approve") {
                  await api.post(`/booking/approve/${confirmModal.bookingId}`);
                  toast.success("Booking berhasil diapprove!");
                } else {
                  await api.post(`/booking/reject/${confirmModal.bookingId}`);
                  toast.error("Booking direject!");
                }
                fetchBookings();
                setConfirmModal({
                  open: false,
                  type: null,
                  bookingId: null,
                });
              } catch (err) {
                console.error("Gagal update pelunasan", err);
              }
            }}
            confirmText="Konfirmasi"
            cancelText="Batal"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingAdmin;
