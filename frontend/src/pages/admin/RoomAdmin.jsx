import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import FormInputFile from "../../components/FormInputFile";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";

const RoomAdmin = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("name", formData.name);
      data.append("description", formData.description);

      await api.post("/room", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Room berhasil ditambahkan!");
      setFormData({ image: null, name: "", description: "" });
    } catch (err) {
      console.error("Error tambah room:", err);
      toast.error("Gagal menambahkan room!");
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Tambah Room</h1>

      <div className="bg-white shadow-md rounded-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
          <FormInputFile
            label="Foto Ruangan"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            value={formData.image}
            required
          />

          <FormInput
            label="Nama Ruangan"
            name="name"
            type="text"
            placeholder="Masukkan nama ruangan"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormTextArea
            label="Deskripsi"
            name="description"
            placeholder="Masukkan deskripsi ruangan"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-2">
            <button type="reset" className="btn btn-ghost">
              Reset
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

export default RoomAdmin;
