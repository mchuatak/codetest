<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => ['auth', 'verified']], function(){
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/attendees/list', [\App\Http\Controllers\CreateAttendeesController::class, 'index'])
    ->name('attendees.get');

    Route::get('/dashboard/attendees', function () {
        return Inertia::render('CreateAttendees');
    })->name('attendees');

    // Route::view('/dashboard/attendees', 'attendees')->name('attendees');
    Route::post('/dashboard/attendees', [\App\Http\Controllers\CreateAttendeesController::class, 'store'])
    // Route::post('/dashboard/attendees', '\App\Http\Controllers\CreateAttendeesController@store')
        ->name('attendees.create');
    // Route::get('/dashboard/create_attendees', [CreateAttendeesController::class, 'create'])
    // ->name('create_attendees');    

});
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
