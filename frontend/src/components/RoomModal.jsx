import React, { useState, useEffect } from "react";
import FormInputFile from "./FormInputFile";
import FormTextArea from "./FormTextArea";
import FormInput from "./FormInput";

const RoomModal = ({ isOpen, onClose, room, onConfirm }) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (room) {
      setFormData({
        image: room.image || "",
        name: room.name || "",
        description: room.description || "",
      });
    }
  }, [room]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); // simpan File object
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Buat FormData biar bisa upload file
    const fd = new FormData();
    fd.append("id", room.id);
    fd.append("name", formData.name);
    fd.append("description", formData.description);

    if (formData.image instanceof File) {
      fd.append("image", formData.image); // hanya kalau upload file baru
    }

    onConfirm(fd);
  };

  if (typeof value === "string" && value.startsWith("http")) {
    return (
      <div className="mt-2">
        <img
          src={value}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-md border"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-bold mb-4">Edit Room</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <FormInputFile
            label="Foto Ruangan"
            name="image"
            onChange={handleFileChange}
            value={formData.image}
            accept="image/*"
          />

          <FormInput
            label="Nama Ruangan"
            placeholder="Masukkan nama ruangan"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          <FormTextArea
            label="Deskripsi"
            placeholder="Masukkan deskripsi ruangan"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomModal;
