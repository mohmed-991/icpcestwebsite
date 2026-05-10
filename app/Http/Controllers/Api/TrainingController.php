<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        return response()->json(Training::all());
    }

    public function store(Request $request)
    {
        $training = Training::create($request->all());
        return response()->json($training);
    }
}
