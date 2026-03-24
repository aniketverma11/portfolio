import { PersonalData, Skill, Experience, Project, Achievement, BlogPost, Certification } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Debug: Log the API URL being used
console.log('API_BASE_URL:', API_BASE_URL);

export async function getPersonalData(): Promise<PersonalData> {
    const url = `${API_BASE_URL}/personal-data/`;
    console.log('Fetching from:', url);

    const res = await fetch(url, {
        signal: AbortSignal.timeout(30000), // 30 second timeout
    });
    if (!res.ok) throw new Error('Failed to fetch personal data');
    const data = await res.json();
    // Ensure nested fields are present even if API returns nulls/defaults
    // The serializer I wrote ensures 'about' and 'contact' keys exist.
    
    // Fix incorrect media URLs returned by the backend due to proxy config
    if (data?.contact?.resumeUrl && API_BASE_URL?.includes('aniketverma.xyz')) {
        data.contact.resumeUrl = data.contact.resumeUrl.replace('http://localhost:8000', 'https://aniketverma.xyz');
    }
    
    return data;
}

export async function getSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_BASE_URL}/skills/`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
}

export async function getExperience(): Promise<Experience[]> {
    const res = await fetch(`${API_BASE_URL}/experience/`);
    if (!res.ok) throw new Error('Failed to fetch experience');
    const data = await res.json();
    
    // Rewrite incorrect media URLs for experience logos
    if (API_BASE_URL?.includes('aniketverma.xyz')) {
        return data.map((exp: Experience) => {
            if (exp.company_logo_url) {
                exp.company_logo_url = (exp.company_logo_url as string).replace('http://localhost:8000', 'https://aniketverma.xyz');
            }
            return exp;
        });
    }
    
    return data;
}

export async function getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE_URL}/projects/`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    
    // Rewrite incorrect media URLs for projects
    if (API_BASE_URL?.includes('aniketverma.xyz')) {
        return data.map((project: Project) => {
            if (project.image_url) {
                project.image_url = (project.image_url as string).replace('http://localhost:8000', 'https://aniketverma.xyz');
            }
            return project;
        });
    }
    
    return data;
}

export async function getAchievements(): Promise<Achievement[]> {
    const res = await fetch(`${API_BASE_URL}/achievements/`);
    if (!res.ok) throw new Error('Failed to fetch achievements');
    return res.json();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const baseUrl = API_BASE_URL || 'http://localhost:8000/api';

    try {
        const res = await fetch(`${baseUrl}/blog/`);
        if (!res.ok) {
            console.error(`Failed to fetch blog posts: ${res.status}`);
            return [];
        }
        const data = await res.json();
        
        // Rewrite incorrect media URLs for blog featured images
        if (API_BASE_URL?.includes('aniketverma.xyz')) {
            return data.map((post: BlogPost) => {
                if (post.featured_image_url) {
                    post.featured_image_url = post.featured_image_url.replace('http://localhost:8000', 'https://aniketverma.xyz');
                }
                return post;
            });
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
    const baseUrl = API_BASE_URL || 'http://localhost:8000/api';

    const url = `${baseUrl}/blog/${slug}/`;

    console.log('Fetching blog post from:', url);

    const res = await fetch(url);

    if (!res.ok) {
        console.error(`Failed to fetch blog post: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to fetch blog post: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Rewrite incorrect media URL for blog post featured image
    if (data.featured_image_url && API_BASE_URL?.includes('aniketverma.xyz')) {
        data.featured_image_url = data.featured_image_url.replace('http://localhost:8000', 'https://aniketverma.xyz');
    }
    
    return data;
}

export async function getBlogCategories(): Promise<string[]> {
    const res = await fetch(`${API_BASE_URL}/blog/categories/`);
    if (!res.ok) throw new Error('Failed to fetch blog categories');
    const data = await res.json();
    return data.categories;
}

export async function getCertifications(): Promise<Certification[]> {
    const res = await fetch(`${API_BASE_URL}/certifications/`);
    if (!res.ok) throw new Error('Failed to fetch certifications');
    const data = await res.json();
    
    // Rewrite incorrect media URLs for certifications
    if (API_BASE_URL?.includes('aniketverma.xyz')) {
        return data.map((cert: Certification) => {
            if (cert.image_url) {
                cert.image_url = cert.image_url.replace('http://localhost:8000', 'https://aniketverma.xyz');
            }
            return cert;
        });
    }
    
    return data;
}

