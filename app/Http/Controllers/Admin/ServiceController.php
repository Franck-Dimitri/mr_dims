<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::latest()->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'description_markdown' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'base_price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['ref_id'] = 'SRV_' . strtoupper(Str::random(5));

        Service::create($validated);

        return back()->with('success', 'Service créé avec succès.');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'description_markdown' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'base_price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $service->update($validated);

        return back()->with('success', 'Service mis à jour.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return back()->with('success', 'Service supprimé.');
    }
}
