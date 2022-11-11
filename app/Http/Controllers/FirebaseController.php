<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;

class FirebaseController extends Controller
{
    public function index()
    {
        $firebase = (new Factory)
            ->withServiceAccount(__DIR__.'/firebase.json')
            ->withDatabaseUri('https://esp32-firebase-75f9c-default-rtdb.asia-southeast1.firebasedatabase.app/');
 
        $database = $firebase->createDatabase();
 
        $result = $database
        ->getReference('test');
 
        echo '<pre>';
        print_r($result->getvalue());
        echo '</pre>';
    }
}
