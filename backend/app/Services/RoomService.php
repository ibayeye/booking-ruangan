<?php

namespace App\Services;

use App\Repositories\Interfaces\RoomRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RoomService
{
    protected $roomRepository;

    public function __construct(RoomRepositoryInterface $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    public function create(array $data)
    {
        return $this->roomRepository->create($data);
    }
    public function getAll()
    {
        return $this->roomRepository->getAll();
    }
    public function update($id, array $data)
    {
        return $this->roomRepository->update($id, $data);
    }
    public function delete($id)
    {
        return $this->roomRepository->delete($id);
    }
}