import React, { useState, useEffect } from "react";

const ModalEditBooking = ({ isOpen, onClose, booking, rooms, onConfirm }) => {
  const [formData, setFormData] = useState({
    room_id: "",
    start_time: "",
    duration: "",
    date: "",
    purpose: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        room_id: booking.room_id || "",
        start_time: booking.start_time || "",
        duration: booking.duration || "",
        date: booking.date
          ? new Date(booking.date).toISOString().split("T")[0]
          : "",
        purpose: booking.purpose || "",
      });
    }
  }, [booking]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.room_id || !formData.date || !formData.duration) {
      alert("Mohon lengkapi semua field yang wajib!");
      return;
    }

    const updatedData = {
      room_id: parseInt(formData.room_id),
      start_time: formData.start_time,
      duration: parseInt(formData.duration),
      date: formData.date,
      purpose: formData.purpose,
    };

    onConfirm({
      ...updatedData,
      id: booking.id,
    });
  };

  const handleClose = () => {
    setFormData({
      room_id: "",
      start_time: "",
      duration: "",
      date: "",
      purpose: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Pilih Ruangan *
            </label>
            <select
              name="room_id"
              value={formData.room_id}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">-- Pilih Ruangan --</option>
              {rooms?.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tanggal *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Waktu Mulai
            </label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Durasi (menit) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Contoh: 60"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Keperluan/Keterangan
            </label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Masukkan keperluan atau keterangan"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditBooking;
