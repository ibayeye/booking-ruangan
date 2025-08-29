<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ApiResponse;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Booking;

class UpdateBookingRequest extends FormRequest
{
    use ApiResponse;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'purpose' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'purpose.required'=> 'Keperluan/Keterangan wajib diisi',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(
            $this->error("Data tidak valid", 400, $validator->errors())
        );
    }
}
