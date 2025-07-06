<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;

    // Define the table name if it's not the plural form of the model name
    protected $table = 'inventory_items';

    // Define which attributes are mass assignable
    protected $fillable = [
        'name',
        'quantity',
        'location',
        'supplier',
        'condition',
    ];
}
}
