<?php

namespace App\Services;

use App\Repositories\Interfaces\BookingRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class BookingService
{
    protected $bookingRepository;

    public function __construct(BookingRepositoryInterface $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function create($userId, array $data)
    {
        return $this->bookingRepository->create($userId, $data);
    }

    public function getBooking($user)
    {
        if ($user->role === 'admin') {
            return $this->bookingRepository->getAll();
        }
        return $this->bookingRepository->getByUser($user->id);
    }
    

    public function updateBooking($id, array $data, $userId)
    {
        $booking = $this->bookingRepository->findByIdAndUser($id, $userId);

        if ($booking->status !== 'submit') {
            throw new \Exception("Booking dengan status: {$booking->status} tidak bisa diubah");
        }

        return $this->bookingRepository->updateBooking($id, $data);
    }

    public function deleteBooking($id, $userId)
    {
        $booking = $this->bookingRepository->findByIdAndUser($id, $userId);

        if ($booking->status !== 'submit') {
            throw new \Exception("Booking dengan status: {$booking->status} tidak bisa dihapus");
        }

        return $this->bookingRepository->deleteBooking($id, $userId);
    }

    public function approve($id)
    {
        return $this->bookingRepository->updateStatus($id, 'approved');
    }

    public function reject($id)
    {
        return $this->bookingRepository->updateStatus($id, 'rejected');
    }
}
