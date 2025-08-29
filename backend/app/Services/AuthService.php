<?php

namespace App\Services;

use App\Repositories\Interfaces\AuthRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function create(array $data)
    {
        return $this->authRepository->create($data);
    }

    public function login(array $credentials)
    {
        $user = $this->authRepository->findByEmail($credentials['email']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return null;
        }
        return $user;
    }

    public function getAuthenticatedUser()
    {
        return Auth::user();
    }
}