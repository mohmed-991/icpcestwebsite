<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $levels = Level::with(['lessons.problems'])->get();

        return response()->json([
            'success' => true,
            'data' => $levels,
            'message' => 'Levels retrieved successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $level = Level::with(['lessons.problems'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $level,
            'message' => 'Level retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
