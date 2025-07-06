<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryItemController; // Add this line

Route::get('/user', function (Request $request) {
    return $request->user();
});

// Add these routes for your inventory items
Route::apiResource('inventory', InventoryItemController::class);
