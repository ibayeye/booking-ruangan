<?php

namespace App\Repositories\Interfaces;

interface RoomRepositoryInterface
{
    public function create(array $data);
    public function getAll();
    public function update($id, array $data);
    public function delete($id);
}
