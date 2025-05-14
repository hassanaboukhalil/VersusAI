<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function createCheckoutSession($user)
    {
        return Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'VersusAI Premium Plan',
                    ],
                    'unit_amount' => 1000, // $10
                ],
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'success_url' => config('app.url') . '/payment/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => config('app.url') . '/payment/cancel',
            'metadata' => [
                'user_id' => $user->id,
            ],
        ]);
    }
}
