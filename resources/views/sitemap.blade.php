{!! '<'.'?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    {{-- Static Core Pages --}}
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ url('/about') }}</loc>
        <lastmod>{{ now()->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/projects') }}</loc>
        <lastmod>{{ now()->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/packs') }}</loc>
        <lastmod>{{ now()->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/blog') }}</loc>
        <lastmod>{{ now()->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/contact') }}</loc>
        <lastmod>{{ now()->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    {{-- Dynamic Project Case Studies --}}
    @foreach ($projects as $project)
        @if (!empty($project->slug))
            <url>
                <loc>{{ url('/projects/' . $project->slug) }}</loc>
                <lastmod>{{ ($project->updated_at ?? now())->tz('UTC')->toAtomString() }}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        @endif
    @endforeach

    {{-- Dynamic Published Blog Posts --}}
    @foreach ($blogs as $blog)
        @if (!empty($blog->slug))
            <url>
                <loc>{{ url('/blog/' . $blog->slug) }}</loc>
                <lastmod>{{ ($blog->updated_at ?? $blog->published_at ?? now())->tz('UTC')->toAtomString() }}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        @endif
    @endforeach
</urlset>
