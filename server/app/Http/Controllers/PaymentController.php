<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    // public function pay(Request $request)
    // {
    //     $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

    //     $charge = $stripe->charges->create([
    //         'amount' => 1000, // cents ($10.00)
    //         'currency' => 'usd',
    //         'source' => 'tok_mastercard',
    //         'description' => 'My First Test Charge',
    //     ]);

    //     // Store in DB
    //     Payment::create([
    //         'user_id' => Auth::id(),
    //         'plan_name' => 'Premium',
    //         'amount' => $charge->amount / 100,
    //         'payment_status' => $charge->status === 'succeeded' ? 'success' : 'failed',
    //         'transaction_id' => $charge->id,
    //         'paid_at' => Carbon::createFromTimestamp($charge->created),
    //     ]);

    //     return response()->json($charge);
    // }

    public function pay(Request $request)
    {
        $response = $this->createCheckoutSession($request);

        if ($response->status() !== 200) {
            return response()->json(['error' => 'Failed to create checkout session'], $response->status());
        }

        return $response;
    }

    public function createCheckoutSession(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        $session = $stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'mode' => 'payment',
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'VersusAI Premium Plan',
                    ],
                    'unit_amount' => 1000,
                ],
                'quantity' => 1,
            ]],
            'customer_email' => Auth::user()->email,
            'success_url' => url('${process.env.APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}'),
            'cancel_url' => url('${process.env.APP_URL}/payment-cancel'),
        ]);

        return response()->json([
            'url' => $session->url,
            'id' => $session->id
        ]);
    }

    public function paymentSuccess(Request $request)
    {
        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            return response()->json(['error' => 'Missing session_id'], 400);
        }

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        $session = $stripe->checkout->sessions->retrieve($sessionId);
        $paymentIntent = $stripe->paymentIntents->retrieve($session->payment_intent);

        if ($paymentIntent->status !== 'succeeded') {
            return response()->json(['error' => 'Payment not successful'], 400);
        }

        // Save to database
        Payment::create([
            'user_id' => Auth::id(), // You may need to re-authenticate the user on this page
            'plan_name' => 'Premium',
            'amount' => $paymentIntent->amount / 100,
            'payment_status' => 'success',
            'transaction_id' => $paymentIntent->id,
            'paid_at' => Carbon::createFromTimestamp($paymentIntent->created),
        ]);

        return response()->json(['message' => 'Payment recorded successfully.']);
    }
}
