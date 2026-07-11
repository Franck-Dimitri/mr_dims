<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Blog;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Mr Dim\'s',
            'email' => 'franckimitrio009@gmail.com',
            'password' => bcrypt('Lapersonne2020'),
            'role' => 'mr_dims',
        ]);

        Project::create([
            'title' => 'Blueprint Architecture System',
            'slug' => 'blueprint-architecture-system',
            'excerpt' => 'A robust monolithic system for high-performance enterprise applications.',
            'description_markdown' => 'Detailed architecture implementation with Laravel and React.',
            'tech_stack' => json_encode(['Laravel', 'React', 'Tailwind', 'Inertia']),
            'is_featured' => true,
        ]);
        
        Project::create([
            'title' => 'DevOps MCP AI Agent',
            'slug' => 'devops-mcp-ai-agent',
            'excerpt' => 'Automated server management using Model Context Protocol.',
            'description_markdown' => 'Integration of AI directly into the deployment pipeline.',
            'tech_stack' => json_encode(['Node.js', 'Python', 'Docker']),
            'is_featured' => true,
        ]);

        Blog::create([
            'title' => 'Why the Monolith is Not Dead',
            'slug' => 'why-monolith-not-dead',
            'markdown_content' => 'Microservices add complexity. Monoliths are simpler to manage...',
            'meta_description' => 'A technical dive into modern monolithic architectures.',
            'status' => 'published',
            'published_at' => now(),
        ]);
        
        Blog::create([
            'title' => 'Mastering Eager Loading in Laravel',
            'slug' => 'mastering-eager-loading-laravel',
            'markdown_content' => 'N+1 queries can kill your performance. Here is how to fix them...',
            'meta_description' => 'Optimizing Eloquent queries for massive performance gains.',
            'status' => 'published',
            'published_at' => now(),
        ]);
    }
}
