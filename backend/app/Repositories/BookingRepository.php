<?php

namespace App\Repositories;

use App\Models\Booking;
use App\Models\User;
use App\Repositories\Interfaces\BookingRepositoryInterface;

class BookingRepository implements BookingRepositoryInterface
{
    public function create($userId, array $data)
    {
        $data["user_id"] = $userId;

        $data['status'] = $data['status'] ?? 'submit';
        return Booking::create($data);
    }
    public function getAll()
    {
        return Booking::with(['user', 'room'])->get();
    }

    public function getByUser($userId)
    {
        return Booking::with(['room']) // tambahin user juga kalau perlu
            ->where('user_id', $userId)
            ->get();
    }

    public function updateBooking($id, array $data)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($data);
        return $booking;
    }

    public function deleteBooking($id, $userId)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();

        $booking->delete();
        return true;
    }

    public function findByIdAndUser($id, $userId)
    {
        return Booking::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();
    }

    public function updateStatus($id, $status)
    {
        $loan = Booking::findOrFail($id);
        $loan->status = $status;
        $loan->save();
        return $loan;
    }
}
