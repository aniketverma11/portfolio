
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.conf import settings
from .admin_overrides import send_brevo_query_emails

from rest_framework.permissions import AllowAny
from django.db.models import F
from django.core.mail import send_mail
from .models import PersonalData, SkillCategory, Experience, Project, Achievement, BlogPost, ServiceQuery, ValentineResponse, Certification
import requests
from .serializers import (
    PersonalDataSerializer, SkillCategorySerializer, ExperienceSerializer, 
    ProjectSerializer, AchievementSerializer, BlogPostListSerializer, BlogPostDetailSerializer,
    ServiceQuerySerializer, ValentineResponseSerializer, CertificationSerializer
)

# Configure Gemini
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# client initialized inside view or globally? 
# Best to initialize lazily or globally. 
gemini_client = genai.Client(api_key=GEMINI_API_KEY)

class PersonalDataView(APIView):
    def get(self, request):
        data = PersonalData.objects.first()
        if data:
            serializer = PersonalDataSerializer(data, context={'request': request})
            return Response(serializer.data)
        return Response({})

class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for blog posts
    - List: Returns all published blog posts
    - Retrieve: Returns a single blog post by slug and increments view count
    - Categories: Returns list of unique categories
    """
    queryset = BlogPost.objects.filter(status='published').order_by('-published_at')
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        BlogPost.objects.filter(pk=instance.pk).update(views=F('views') + 1)
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all unique blog categories"""
        categories = BlogPost.objects.filter(status='published').values_list('category', flat=True).distinct()
        return Response({'categories': list(categories)})
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Filter blog posts by category"""
        category = request.query_params.get('category')
        if not category:
            return Response({'error': 'Category parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        posts = self.queryset.filter(category=category)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

class ChatBotView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        user_query = request.data.get('query')
        if not user_query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Gather Live context
            personal_data = PersonalData.objects.first()
            skills = SkillCategory.objects.all()
            experiences = Experience.objects.all()
            projects = Project.objects.all()
            certs = Certification.objects.all()
            blogs = BlogPost.objects.filter(status='published')

            # Build a structured data string
            import json
            context_data = {
                "personal": {
                    "name": personal_data.name if personal_data else "Aniket Verma",
                    "role": personal_data.role if personal_data else "N/A",
                    "mission": personal_data.mission if personal_data else "",
                    "about": personal_data.about_description if personal_data else []
                },
                "skills": [{"category": s.name, "items": s.items} for s in skills],
                "experience": [{
                    "role": e.role, "company": e.company, "period": e.period, 
                    "description": e.description, "achievements": e.achievements
                } for e in experiences],
                "projects": [{
                    "title": p.title, "category": p.category, "tech": p.tech,
                    "description": p.description, "link": p.link
                } for p in projects],
                "certifications": [{
                    "name": c.name, "issued_by": c.issued_by, "date": str(c.issued_date)
                } for c in certs],
                "blog_posts": [{
                    "title": b.title, "excerpt": b.excerpt, "category": b.category
                } for b in blogs]
            }

            # Read resume content as fallback/extra
            resume_content = ""
            try:
                resume_path = os.path.join(settings.BASE_DIR, 'resume.txt')
                if os.path.exists(resume_path):
                    with open(resume_path, 'r') as f:
                        resume_content = f.read()
            except:
                pass

            # Construct prompt
            system_prompt = f"""
            You are NANCE, the highly advanced AI digital nervous system of Aniket Verma.
            Your persona is calm, professional, and slightly futuristic.
            
            PORTFOLIO LIVE CONTEXT:
            {json.dumps(context_data, indent=2)}

            RESUME TEXT (Reference):
            {resume_content}

            RULES:
            1. You are responding to queries about Aniket's work, skills, and background.
            2. Be extremely accurate based on the provided PORTFOLIO LIVE CONTEXT.
            3. Answer in the persona of Nance - call the user "Sir/Ma'am" or keep it very professional.
            4. Keep responses concise and focused.
            5. If asked about something not present in the context, politely state that you are only programmed with Aniket's professional data.
            """
            
            chat = gemini_client.chats.create(
                model='gemini-2.5-flash', 
                history=[
                    types.Content(
                        role="user", 
                        parts=[types.Part.from_text(text=system_prompt)]
                    ),
                    types.Content(
                        role="model", 
                        parts=[types.Part.from_text(text="NANCE online. Systems initialized. I am ready to facilitate your inquiries regarding Mr. Verma's professional assets.")]
                    )
                ]
            )
            
            response = chat.send_message(user_query)
            return Response({"response": response.text})

        except Exception as e:
            print(f"Gemini Error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ServiceQueryView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        serializer = ServiceQuerySerializer(data=request.data)
        if serializer.is_valid():
            query = serializer.save()
            
            # Get admin email from PersonalData or settings
            personal_data = PersonalData.objects.first()
            admin_email = personal_data.email if personal_data and personal_data.email else settings.DEFAULT_FROM_EMAIL
            
            # Send emails via Brevo
            try:
                send_brevo_query_emails(query, admin_email)
            except Exception as e:
                print(f"Brevo Service Error: {e}")
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ValentineResponseView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        response_type = request.data.get('response') # 'Yes' or 'No'
        device_model = request.data.get('device_model')
        message = request.data.get('message', '')
        
        # Get client IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        
        # Get location from IP (using ip-api.com - free for non-commercial)
        location_str = "Unknown"
        try:
            geo_res = requests.get(f"http://ip-api.com/json/{ip}", timeout=5).json()
            if geo_res.get('status') == 'success':
                location_str = f"{geo_res.get('city')}, {geo_res.get('regionName')}, {geo_res.get('country')}"
        except Exception as e:
            print(f"Geo IP Error: {e}")

        valentine_obj, created = ValentineResponse.objects.get_or_create(
            ip_address=ip,
            defaults={
                'response': response_type,
                'device_model': device_model,
                'location': location_str,
                'message': message
            }
        )
        if not created:
            valentine_obj.response = response_type
            valentine_obj.device_model = device_model
            valentine_obj.location = location_str
            valentine_obj.message = message
            valentine_obj.save()
        
        # Send email via Brevo if there's a message
        if message:
            try:
                from .admin_overrides import send_valentine_message_email
                send_valentine_message_email(
                    message=message,
                    location=location_str,
                    device=device_model,
                    timestamp=valentine_obj.created_at
                )
            except Exception as e:
                print(f"Email Error: {e}")
        
        return Response({"status": "success", "message": "Response recorded"}, status=status.HTTP_201_CREATED)
