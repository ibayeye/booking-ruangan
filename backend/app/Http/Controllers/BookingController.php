<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBookingRequest;
use App\Http\Requests\CreateRoomRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Booking;
use App\Models\Room;
use App\Services\BookingService;
use App\Services\RoomService;
use App\Traits\ApiResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class BookingController extends Controller
{
    use ApiResponse;
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function create(CreateBookingRequest $request)
    {
        $userId = Auth::id();
        $data = $request->validated();

        $booking = $this->bookingService->create($userId, $data);

        return $this->success($booking, "Booking berhasil dibuat");
    }

    public function getAll()
    {
        $booking = $this->bookingService->getBooking(Auth::user());
        if ($booking->isEmpty()) {
            return $this->error("Data booking tidak ditemukan", 404);
        }
        return $this->success($booking, "Data booking berhasil ditemukan", 200);
    }

    public function update(UpdateBookingRequest $request, $id)
    {
        $userId = Auth::id();
        $data = $request->validated();

        try {
            $booking = $this->bookingService->updateBooking($id, $data, $userId);
            return $this->success($booking, "Booking berhasil diubah", 200);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function destroy($id)
    {
        $userId = Auth::id();

        try {
            $this->bookingService->deleteBooking($id, $userId);
            return $this->success(null, "Booking berhasil dihapus", 200);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function approve($id)
    {
        $booking = $this->bookingService->approve($id);
        return $this->success($booking, "Booking berhasil diapprove", 200);
    }

    public function reject($id)
    {
        $booking = $this->bookingService->reject($id);
        return $this->success($booking, "Booking ditolak", 200);
    }
}
