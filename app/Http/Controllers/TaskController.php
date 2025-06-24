<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::with('list')
            ->whereHas('list', function ($query) {
                $query->where('user_id', auth()->id());
            })->orderBy('created_at', 'desc');

        if ($request->has('search'))
        {
            $search = $request->get('search');
            $query->where(function ($q) use ($search)
            {
                $q->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('filter') && $request->get('filter') == 'all')
        {
            $query->where('is_completed', request('filter') === 'completed');
        }

        $tasks = $query->paginate(10);
        $lists = TaskList::where('user_id', auth()->id())->get();
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'lists' => $lists,
            'filters' => [
                'search' => request('search', ''),
                'filter' => request('filter', ''),

            ],
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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
