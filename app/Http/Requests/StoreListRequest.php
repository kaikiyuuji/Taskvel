<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreListRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
                'min:3'
            ],
            'description' =>
                'nullable',
                'string'
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            // Tirar espaços extras do início e fim
            'title' => trim($this->title ?? ''),
            // Se description tiver espaços vazios, transforma em null
            'description' => $this->description && trim($this->description)
                ? trim($this->description)
                : null,
        ]);
    }
}
