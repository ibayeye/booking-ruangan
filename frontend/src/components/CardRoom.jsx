import React from "react";

const CardRoom = ({ image, name, description, onBook }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden">
      {/* Image */}
      <figure className="h-40 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/300x200"} // fallback kalau image kosong
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>

      {/* Content */}
      <div className="card-body">
        <h2 className="card-title text-lg font-bold text-primary">{name}</h2>
        <p className="text-sm text-gray-500 line-clamp-3">{description}</p>

        {/* Action */}
        <div className="mt-4">
          <button
            onClick={onBook}
            className="btn btn-primary w-full hover:scale-105 transition-transform"
          >
            Booking Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
