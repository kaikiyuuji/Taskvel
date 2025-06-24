<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreListRequest;
use App\Http\Requests\UpdateListRequest;
use App\Models\TaskList;
use Inertia\Inertia;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lists = TaskList::where('user_id', auth()->id())->with('tasks')->get();
        return Inertia::render('Lists/Index', [
            'lists' => $lists,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            TaskList::create([
                ...$validated,
                'user_id' => auth()->id(),
            ]);

            return redirect()
                ->route('lists.index')
                ->with('success', 'Lista criada com sucesso!');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Erro ao criar a lista. Tente novamente.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListRequest $request, TaskList $list): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $list->update($validated);

            return redirect()
                ->route('lists.index')
                ->with('success', 'Lista editada com sucesso!');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Erro ao editar a lista. Tente novamente.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskList $list)
    {
        $list->delete();
        return redirect()->route('lists.index')->with('success', 'Lista deletada com sucesso!');;
    }
}
