<?php

namespace App\Repositories;

use App\Models\Room;
use App\Repositories\Interfaces\RoomRepositoryInterface;

class RoomRepository implements RoomRepositoryInterface
{
    public function create(array $data)
    {
        return Room::create($data);
    }
    public function getAll()
    {
        return Room::all();
    }
    public function update($id, array $data)
    {
        $room = Room::findOrFail($id);
        $room->update($data);
        return $room;
    }
    public function delete($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();
        return $room;
    }
}
