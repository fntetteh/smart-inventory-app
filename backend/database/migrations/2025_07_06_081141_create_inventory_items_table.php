<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('inventory_items', function (Blueprint $table) {
        $table->id(); // Auto-incrementing ID
        $table->string('name'); // Item name (e.g., "Laptop")
        $table->integer('quantity'); // Quantity (e.g., 15)
        $table->string('location'); // Storage location (e.g., "Warehouse A")
        $table->string('supplier'); // Supplier name (e.g., "TechCorp")
        $table->string('condition'); // Condition (e.g., "New", "Used - Good")
        $table->timestamps(); // Adds 'created_at' and 'updated_at' columns automatically
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_items');
    }
};
