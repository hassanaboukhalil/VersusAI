<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function payment()
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
        $stripe->charges->create([
            'amount' => 1000,
            'currency' => 'usd',
            'source' => 'tok_mastercard',
            'description' => 'My First Test Charge',
        ]);
    }
}
