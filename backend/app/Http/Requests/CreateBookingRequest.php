<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ApiResponse;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Booking;

class CreateBookingRequest extends FormRequest
{
    use ApiResponse;

    public function authorize(): bool
    {
        return true;
    }

    /**
     * Normalisasi input sebelum validasi.
     */
    protected function prepareForValidation()
    {
        if ($this->date) {
            try {
                $this->merge([
                    'date' => \Carbon\Carbon::createFromFormat('d-m-Y', $this->date)->format('Y-m-d'),
                ]);
            } catch (\Exception $e) {
            }
        }
    }

    public function rules(): array
    {
        return [
            'room_id' => [
                'required',
                'exists:rooms,id',
                function ($attribute, $value, $fail) {
                    $date = $this->input('date');
                    $start_time = $this->input('start_time');
                    $duration = (int) $this->input('duration');

                    if ($date && $start_time && $duration) {
                        try {
                            $start = \Carbon\Carbon::createFromFormat('Y-m-d H:i', "$date $start_time");
                            $end = $start->copy()->addMinutes($duration);
                        } catch (\Exception $e) {
                            $fail("Format tanggal atau waktu tidak valid. Gunakan format dd-mm-YYYY untuk tanggal dan HH:ii untuk waktu.");
                            return;
                        }

                        $conflict = Booking::where('room_id', $value)
                            ->where('status', 'approved')
                            ->whereDate('date', $date)
                            ->where(function ($query) use ($start, $end) {
                                $query->whereBetween('start_time', [$start->format('H:i:s'), $end->format('H:i:s')])
                                    ->orWhereRaw('? between start_time and ADDTIME(start_time, SEC_TO_TIME(duration*60))', [$start->format('H:i:s')]);
                            })
                            ->exists();

                        if ($conflict) {
                            $fail("Ruangan sudah dibooking dengan status Approved.");
                        }
                    }
                }
            ],
            'date' => 'required|date_format:Y-m-d', // setelah prepareForValidation, pasti format Y-m-d
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:1',
            'purpose' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'room_id.required' => 'Nama ruangan wajib dipilih',
            'room_id.exists' => 'Ruangan tidak ditemukan',
            'date.required' => 'Tanggal wajib diisi',
            'date.date_format' => 'Format tanggal harus dd-mm-YYYY',
            'start_time.required' => 'Waktu mulai wajib diisi',
            'duration.required' => 'Durasi wajib diisi',
            'purpose.required' => 'Keperluan/Keterangan wajib diisi',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(
            $this->error("Data tidak valid", 400, $validator->errors())
        );
    }
}
