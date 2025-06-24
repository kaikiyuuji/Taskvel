<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateListRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $list = $this->route('list');
        return auth()->check() && $list && $list->user_id === auth()->id();
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
            'description' => [
                'nullable',
                'string',
                'max:1000'
            ]
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => trim($this->title),
            'description' => $this->description ? trim($this->description) : null,
        ]);
    }
}
