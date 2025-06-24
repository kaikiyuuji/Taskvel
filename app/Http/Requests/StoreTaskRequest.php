<?php

namespace App\Http\Requests;

use App\Models\TaskList;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
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
            'description' => [
                'nullable',
                'string'
            ],
            'due_date' => [
                'nullable',
                'date',
                'after_or_equal:today'
            ],
            'list_id' => [
                'required',
                'exists:lists,id'
            ],
            'is_completed' => [
                'boolean'
            ]
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Verificar se a lista pertence ao usuário autenticado
            if ($this->list_id) {
                $list = TaskList::find($this->list_id);
                if (!$list || $list->user_id !== auth()->id()) {
                    $validator->errors()->add('list_id', 'A lista selecionada não existe ou não pertence a você.');
                }
            }
        });
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
            // Garantir que is_completed seja boolean
            'is_completed' => $this->boolean('is_completed', false),
        ]);
    }
}
