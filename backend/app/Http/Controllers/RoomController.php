<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use App\Services\RoomService;
use App\Traits\ApiResponse;
use Illuminate\Routing\Controller;

class RoomController extends Controller
{
    use ApiResponse;
    protected $roomService;

    public function __construct(RoomService $roomService)
    {
        $this->roomService = $roomService;
    }

    public function create(CreateRoomRequest $request)
    {
        $data = $request->all();

        $path = $request->file('image')->store('image', 'public');
        $data['image'] = asset('storage/' . $path);

        $room = $this->roomService->create($data);

        return $this->success($room, "Berhasil tambahkan room", 201);
    }

    public function getAll()
    {
        $room = $this->roomService->getAll();
        return $this->success($room, "Data room berhasil ditemukan", 200);
    }

    public function update(UpdateRoomRequest $request, $id)
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('image', 'public');
            $data['image'] = asset('storage/' . $path);
        }

        $room = $this->roomService->update($id, $data);

        return $this->success($room, "Berhasil update room", 200);
    }
    public function destroy($id)
    {
        $room = $this->roomService->delete($id);
        return $this->success($room, "Berhasil delete room", 200);
    }
}
