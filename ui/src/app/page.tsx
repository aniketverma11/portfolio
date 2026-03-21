
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Achievements from "@/components/Achievements";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getPersonalData, getSkills, getExperience, getProjects, getAchievements, getBlogPosts } from "@/lib/api";
import {
  personalData as fallbackPersonalData,
  skills as fallbackSkills,
  experience as fallbackExperience,
  projects as fallbackProjects,
  achievements as fallbackAchievements,
} from "@/lib/data";
import type { PersonalData, Skill, Experience as ExperienceType, Project, Achievement, BlogPost } from "@/lib/types";

export default function Home() {
  // Initialize with fallback data so the page renders instantly
  const [personalData, setPersonalData] = useState<PersonalData>(fallbackPersonalData as PersonalData);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills as Skill[]);
  const [experience, setExperience] = useState<ExperienceType[]>(fallbackExperience as ExperienceType[]);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects as Project[]);
  const [achievements, setAchievements] = useState<Achievement[]>(fallbackAchievements as Achievement[]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch real data in the background and update silently
    async function fetchData() {
      try {
        const [personalDataRes, skillsRes, experienceRes, projectsRes, achievementsRes, blogPostsRes] = await Promise.all([
          getPersonalData(),
          getSkills(),
          getExperience(),
          getProjects(),
          getAchievements(),
          getBlogPosts(),
        ]);

        setPersonalData(personalDataRes);
        setSkills(skillsRes);
        setExperience(experienceRes);
        setProjects(projectsRes);
        setAchievements(achievementsRes);
        setBlogPosts(blogPostsRes);
      } catch (err) {
        console.error('Error fetching data:', err);
        // Fallback data is already displayed, so no need to show an error
      }
    }

    fetchData();
  }, []);

  return (
    <main className="page-shell min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero data={personalData} />
      <Skills data={skills} />
      <Experience data={experience} />
      <Projects data={projects} />
      <Blog data={blogPosts} />
      <Achievements data={achievements} />
      <About data={personalData} />
      <Contact data={personalData} />
      <Footer />
    </main>
  );
}
