<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_dashboard(): void
    {
        $response = $this->get('/admin/dashboard');
        $response->assertRedirect('/login');
    }

    public function test_mr_dims_user_can_access_dashboard(): void
    {
        $user = User::factory()->create([
            'role' => 'mr_dims',
            'email_verified_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/admin/dashboard');
        $response->assertStatus(200);
    }
}
