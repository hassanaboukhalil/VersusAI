<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function pay(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        $charge = $stripe->charges->create([
            'amount' => 1000, // cents ($10.00)
            'currency' => 'usd',
            'source' => 'tok_mastercard',
            'description' => 'My First Test Charge',
        ]);

        // Store in DB
        Payment::create([
            'user_id' => Auth::id(),
            'plan_name' => 'Premium',
            'amount' => $charge->amount / 100,
            'payment_status' => $charge->status === 'succeeded' ? 'success' : 'failed',
            'transaction_id' => $charge->id,
            'paid_at' => Carbon::createFromTimestamp($charge->created),
        ]);

        return response()->json($charge);
    }
}
