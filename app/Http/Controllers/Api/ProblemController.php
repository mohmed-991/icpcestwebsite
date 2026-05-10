<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Problem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProblemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Problem::with(['lesson.level']);

        // Filter by lesson if provided
        if ($request->has('lesson_id')) {
            $query->where('lesson_id', $request->lesson_id);
        }

        // Filter by level if provided
        if ($request->has('level_id')) {
            $query->whereHas('lesson', function($q) use ($request) {
                $q->where('level_id', $request->level_id);
            });
        }

        // Filter by difficulty
        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        $problems = $query->get();

        return response()->json([
            'success' => true,
            'data' => $problems,
            'message' => 'Problems retrieved successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $problem = Problem::with(['lesson.level'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $problem,
            'message' => 'Problem retrieved successfully'
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
