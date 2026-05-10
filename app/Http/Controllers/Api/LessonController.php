<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Lesson::with(['level', 'problems']);

        // Filter by level if provided
        if ($request->has('level_id')) {
            $query->where('level_id', $request->level_id);
        }

        $lessons = $query->get();

        return response()->json([
            'success' => true,
            'data' => $lessons,
            'message' => 'Lessons retrieved successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $lesson = Lesson::with(['level', 'problems'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $lesson,
            'message' => 'Lesson retrieved successfully'
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
