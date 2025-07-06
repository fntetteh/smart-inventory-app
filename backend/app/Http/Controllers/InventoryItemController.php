<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem; // Add this line
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // For logging errors

class InventoryItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all inventory items from the database
        $items = InventoryItem::all();
        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'quantity' => 'required|integer|min:0',
                'location' => 'required|string|max:255',
                'supplier' => 'required|string|max:255',
                'condition' => 'required|string|max:255',
            ]);

            // Create a new inventory item using the validated data
            $item = InventoryItem::create($validatedData);

            // Return the newly created item with a 201 Created status
            return response()->json($item, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log validation errors for debugging
            Log::error('Validation error when storing item: ' . $e->getMessage(), ['errors' => $e->errors()]);
            return response()->json(['errors' => $e->errors()], 422); // Unprocessable Entity
        } catch (\Exception $e) {
            // Log any other unexpected errors
            Log::error('Error storing inventory item: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to add item.'], 500); // Internal Server Error
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Find an item by its ID, or return 404 if not found
        $item = InventoryItem::findOrFail($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            // Find the item to update
            $item = InventoryItem::findOrFail($id);

            // Validate the incoming request data
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'quantity' => 'required|integer|min:0',
                'location' => 'required|string|max:255',
                'supplier' => 'required|string|max:255',
                'condition' => 'required|string|max:255',
            ]);

            // Update the item with validated data
            $item->update($validatedData);

            // Return the updated item
            return response()->json($item);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error when updating item: ' . $e->getMessage(), ['errors' => $e->errors()]);
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error updating inventory item: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update item.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Find the item and delete it
            $item = InventoryItem::findOrFail($id);
            $item->delete();

            // Return a 204 No Content status for successful deletion
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting inventory item: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete item.'], 500);
        }
    }
}