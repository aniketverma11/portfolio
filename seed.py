import os
from datetime import datetime

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from django.db import transaction
from django.utils import timezone
from django.utils.dateparse import parse_datetime

from api.models import Achievement, BlogPost, Experience, PersonalData, Project, SkillCategory


PERSONAL_DATA = {
    "name": "Aniket Verma",
    "role": "Senior Software Engineer",
    "tagline": "Building Corporate AI Agents & Scalable Systems",
    "mission": "I build cinematic, high-performance web applications and intelligent AI agents that solve real-world problems.",
    "about_title": "Engineering Philosophy",
    "about_description": [
        "I specialize in building Corporate AI Agents using Python, LangGraph, and Microsoft Copilot Studio.",
        "My focus is on workflow automation, enterprise-grade AI integrations, and scalable cloud solutions.",
        "I am experienced in AWS, GCP, and Azure, ensuring high performance and resilience.",
        "I value clean code, rapid iteration, and delivering impact through technology.",
    ],
    "about_values": [
        "Innovation",
        "Scalability",
        "User Experience",
        "Reliability",
    ],
    "email": "aniketverma1103@gmail.com",
    "linkedin": "https://linkedin.com/in/aniketverma11",
    "github": "https://github.com/aniketverma11",
    "resume": "resumes/aniket-resume_3.pdf",
}

SKILL_CATEGORIES = [
    {
        "name": "Languages",
        "items": ["Python", "JavaScript", "Solidity", "SQL", "C++", "HTML/CSS"],
    },
    {
        "name": "Frameworks & Libraries",
        "items": ["Django", "FastAPI", "React.js", "Next.js", "Node.js", "LangChain", "TensorFlow", "PyTorch"],
    },
    {
        "name": "Cloud & DevOps",
        "items": ["AWS (EC2, S3, Lambda)", "Azure", "GCP", "Docker", "Nginx", "CI/CD", "Git"],
    },
    {
        "name": "Databases",
        "items": ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    },
    {
        "name": "AI & Blockchain",
        "items": ["LLMs", "RAG", "GenAI", "LangGraph", "Ethereum", "Smart Contracts"],
    },
]

EXPERIENCES = [
    {
        "company": "Coforge",
        "role": "Senior Software Engineer",
        "period": "Sep 2024 - Present",
        "color": "blue",
        "description": "Leading development of enterprise Copilot agents using Python, LangChain, and Azure AI. Architecting next-gen insurance solutions with Django, ReactJS, and CrewAI.",
        "achievements": [
            "Deployed enterprise Copilot agents for intelligent automation.",
            "Architected insurance solutions using Django & ReactJS.",
            "Integrated Microsoft Power Platform for workflows.",
        ],
    },
    {
        "company": "Benthon Labs",
        "role": "Full Stack Python Developer",
        "period": "Oct 2023 - July 2024",
        "color": "purple",
        "description": "Led development of PulseCRM-pro using Node.js and MongoDB. Spearheaded integration of PyTest and Django for Dalmia Bharat MM portal.",
        "achievements": [
            "Led PulseCRM-pro development (Node.js, Express, MongoDB).",
            "Improved response times and customer satisfaction for Dalmia Bharat.",
            "Developed data validation microservices.",
        ],
    },
    {
        "company": "CreateBytes",
        "role": "Software Developer Engineer 1",
        "period": "Jul 2022 - Sep 2023",
        "color": "red",
        "description": "Specialized in ML and AI products using Django. Contributed to video analytics platform and ML-based microservices.",
        "achievements": [
            "Optimized YugYog video analytics for 30% faster processing.",
            "Developed Motion Detector using FastAPI & Django.",
            "Deployed scalable services on AWS.",
        ],
    },
    {
        "company": "Rapid Innovation",
        "role": "Blockchain Developer",
        "period": "Mar 2022 - Jul 2022",
        "color": "green",
        "description": "Built decentralized applications (DApps) on Ethereum and Solana. Created Smart Contracts for Web3 business landscape.",
        "achievements": [
            "Developed DApps and Smart Contracts.",
            "Utilized Hardhat, Chai, and Brownie for testing.",
            "Bridged technology and creativity in Web3.",
        ],
    },
]

PROJECTS = [
    {
        "title": "Labops.in / Orinn.ai",
        "category": "HealthTech",
        "description": "Medical Lab Management System designed to handle patient tests, checkups, and payment history efficiently.",
        "tech": ["Django", "PostgreSQL", "AWS EC2", "Gunicorn"],
        "link": "#",
    },
    {
        "title": "PulseCRM-pro",
        "category": "SaaS",
        "description": "A comprehensive CRM solution built for scalability and performance.",
        "tech": ["Node.js", "Express", "MongoDB", "AWS"],
        "link": "#",
    },
    {
        "title": "YugYog Video Analytics",
        "category": "AI/ML",
        "description": "Video analytics platform with optimized processing speeds.",
        "tech": ["Django", "AWS", "Machine Learning"],
        "link": "#",
    },
    {
        "title": "CB-Vision Motion Detector",
        "category": "AI/ML",
        "description": "ML-based microservice for identifying object motion and suspicious activity.",
        "tech": ["FastAPI", "Django", "Computer Vision"],
        "link": "#",
    },
]

ACHIEVEMENTS = [
    {
        "metric": "30%",
        "label": "Faster Processing",
        "description": "Optimized video analytics platform performance.",
    },
    {
        "metric": "50%",
        "label": "Cost Reduction",
        "description": "Reduced AWS deployment expenses through optimization.",
    },
    {
        "metric": "4+",
        "label": "Major Projects",
        "description": "Delivered enterprise-scale applications from scratch.",
    },
]

BLOG_POSTS = [
    {
        "title": "Building Scalable Microservices with Django and Docker",
        "slug": "building-scalable-microservices-with-django-and-docker",
        "excerpt": "Learn how to architect and deploy production-ready microservices using Django REST Framework and Docker containers.",
        "content": """
                <h2>Introduction to Microservices</h2>
                <p>Microservices architecture has become the de facto standard for building scalable applications. In this post, we'll explore how to leverage Django and Docker to create robust microservices.</p>

                <h3>Why Microservices?</h3>
                <ul>
                    <li>Independent deployment and scaling</li>
                    <li>Technology diversity</li>
                    <li>Fault isolation</li>
                    <li>Better team organization</li>
                </ul>

                <h3>Setting Up Django for Microservices</h3>
                <p>First, let's create a lightweight Django service:</p>

                <pre><code class="language-python">
# settings.py
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'your_app',
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}
                </code></pre>

                <h3>Dockerizing Your Service</h3>
                <p>Create a Dockerfile for your Django service:</p>

                <pre><code class="language-dockerfile">
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
                </code></pre>

                <h3>Conclusion</h3>
                <p>Microservices with Django and Docker provide a powerful combination for building modern applications. Start small, iterate, and scale as needed.</p>
            """.strip(),
        "featured_image": "",
        "author": "Aniket Verma",
        "tags": ["Django", "Docker", "Microservices", "Python"],
        "category": "Backend Development",
        "status": "published",
        "read_time": 8,
        "views": 1,
        "created_at": "2026-01-31 11:05:49.729342+00:00",
        "updated_at": "2026-01-31 11:05:49.729398+00:00",
        "published_at": "2026-01-31 11:05:49.722301+00:00",
        "meta_description": "Learn how to architect and deploy production-ready microservices using Django REST Framework and Docker containers.",
        "meta_keywords": "",
    },
    {
        "title": "AI-Powered Chatbots: From Concept to Production",
        "slug": "ai-powered-chatbots-from-concept-to-production",
        "excerpt": "A comprehensive guide to building intelligent chatbots using Google Gemini API and modern web technologies.",
        "content": """
                <h2>The Rise of AI Chatbots</h2>
                <p>AI chatbots have revolutionized customer service and user engagement. Let's build one from scratch using Google's Gemini API.</p>

                <h3>Architecture Overview</h3>
                <p>Our chatbot will consist of:</p>
                <ul>
                    <li>Frontend: React/Next.js with WebSocket support</li>
                    <li>Backend: Django with Channels for real-time communication</li>
                    <li>AI: Google Gemini API for natural language processing</li>
                </ul>

                <h3>Implementing the Backend</h3>
                <pre><code class="language-python">
from google import genai
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

    async def receive(self, text_data):
        message = json.loads(text_data)
        response = await self.get_ai_response(message['text'])
        await self.send(text_data=json.dumps({'response': response}))
                </code></pre>

                <h3>Best Practices</h3>
                <ol>
                    <li>Implement rate limiting to prevent abuse</li>
                    <li>Add context management for better conversations</li>
                    <li>Handle errors gracefully</li>
                    <li>Monitor API usage and costs</li>
                </ol>
            """.strip(),
        "featured_image": "",
        "author": "Aniket Verma",
        "tags": ["AI", "Chatbot", "Gemini", "WebSocket", "Django"],
        "category": "AI & Machine Learning",
        "status": "published",
        "read_time": 10,
        "views": 1,
        "created_at": "2026-01-31 11:05:49.736226+00:00",
        "updated_at": "2026-01-31 11:05:49.736265+00:00",
        "published_at": "2026-01-31 11:05:49.722315+00:00",
        "meta_description": "A comprehensive guide to building intelligent chatbots using Google Gemini API and modern web technologies.",
        "meta_keywords": "",
    },
    {
        "title": "Next.js 14: Server Components and App Router Deep Dive",
        "slug": "nextjs-14-server-components-and-app-router-deep-dive",
        "excerpt": "Explore the latest features in Next.js 14 including Server Components, streaming, and the new App Router.",
        "content": """
                <h2>Next.js 14: A Game Changer</h2>
                <p>Next.js 14 introduces revolutionary features that change how we build React applications. Let's explore the most impactful ones.</p>

                <h3>Server Components</h3>
                <p>Server Components allow you to render components on the server, reducing JavaScript bundle size:</p>

                <pre><code class="language-typescript">
// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
                </code></pre>

                <h3>App Router Benefits</h3>
                <ul>
                    <li>Nested layouts and templates</li>
                    <li>Improved data fetching</li>
                    <li>Streaming and Suspense support</li>
                    <li>Built-in error handling</li>
                </ul>

                <h3>Performance Optimization</h3>
                <p>Use the new Image component with automatic optimization:</p>

                <pre><code class="language-typescript">
import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority
    />
  )
}
                </code></pre>
            """.strip(),
        "featured_image": "",
        "author": "Aniket Verma",
        "tags": ["Next.js", "React", "TypeScript", "Performance"],
        "category": "Frontend Development",
        "status": "published",
        "read_time": 7,
        "views": 13,
        "created_at": "2026-01-31 11:05:49.741840+00:00",
        "updated_at": "2026-01-31 11:05:49.741880+00:00",
        "published_at": "2026-01-31 11:05:49.722318+00:00",
        "meta_description": "Explore the latest features in Next.js 14 including Server Components, streaming, and the new App Router.",
        "meta_keywords": "",
    },
]


def dt(value: str | None):
    if not value:
        return None
    parsed = parse_datetime(value)
    if parsed is None:
        parsed = datetime.fromisoformat(value)
    if timezone.is_naive(parsed):
        parsed = timezone.make_aware(parsed, timezone.utc)
    return parsed


@transaction.atomic
def seed():
    PersonalData.objects.all().delete()
    SkillCategory.objects.all().delete()
    Experience.objects.all().delete()
    Project.objects.all().delete()
    Achievement.objects.all().delete()
    BlogPost.objects.all().delete()

    PersonalData.objects.create(**PERSONAL_DATA)

    SkillCategory.objects.bulk_create([SkillCategory(**item) for item in SKILL_CATEGORIES])
    Experience.objects.bulk_create([Experience(**item) for item in EXPERIENCES])
    Project.objects.bulk_create([Project(**item) for item in PROJECTS])
    Achievement.objects.bulk_create([Achievement(**item) for item in ACHIEVEMENTS])

    for item in BLOG_POSTS:
        payload = item.copy()
        created_at = dt(payload.pop("created_at"))
        updated_at = dt(payload.pop("updated_at"))
        published_at = dt(payload["published_at"])

        post = BlogPost.objects.create(**payload)
        BlogPost.objects.filter(pk=post.pk).update(
            created_at=created_at,
            updated_at=updated_at,
            published_at=published_at,
        )

    print("Seeded portfolio data successfully.")


if __name__ == "__main__":
    seed()
