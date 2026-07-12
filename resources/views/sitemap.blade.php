<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ url('/') }}</loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ url('/about') }}</loc>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/services') }}</loc>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/packs') }}</loc>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/projects') }}</loc>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/blogs') }}</loc>
        <priority>0.9</priority>
    </url>
    
    @foreach ($services as $service)
        <url>
            <loc>{{ url('/services/' . $service->slug) }}</loc>
            <priority>0.8</priority>
        </url>
    @endforeach

    @foreach ($projects as $project)
        <url>
            <loc>{{ url('/projects/' . $project->id) }}</loc>
            <priority>0.7</priority>
        </url>
    @endforeach
</urlset>
