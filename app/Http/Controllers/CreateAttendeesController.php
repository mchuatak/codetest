<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Models\Attendees;

class CreateAttendeesController extends Controller
{
    public function index()
    {
        $data = Attendees::all();
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('CreateAttendees',[
            'message' => session('message'),
            'status' => session('status')
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255'
        ]);

        $attendee = Attendees::where('email', $request->email)->first();
        if(!$attendee){
            $user = Attendees::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'approved' => $request->approved,
            ]);
            return redirect()->back()->with('message','Attendees Saved.')->with('status','Success');
        } else { 
            return redirect()->back()->with('message','Email already exists')->with('status','Info');
        }
        
    }

}
