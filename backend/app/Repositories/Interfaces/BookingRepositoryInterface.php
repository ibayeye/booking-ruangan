<?php

namespace App\Repositories\Interfaces;

interface BookingRepositoryInterface
{
    public function create($userId, array $data);
    public function getByUser($userId);
    public function getAll();
    public function updateBooking($id, array $data);
    public function deleteBooking($id, $userId);
    public function findByIdAndUser($id, $userId);
    public function updateStatus($id, $status);
}
