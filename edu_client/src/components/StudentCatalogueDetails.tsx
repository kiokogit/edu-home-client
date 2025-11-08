'use client';

import React, { useState } from 'react';
import { PlayCircle, ArrowRight, Star, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WebDevPathDetails() {
  const router = useRouter();
  const path = {
    id: 'web-dev',
    title: 'Web Development Learning Path',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80',
    summary:
      'HTML → CSS → JavaScript → Frameworks → Deployments. Build real web apps and a deployable portfolio.',
    category: 'Web Development',
    stages: [
      {
        id: 's1',
        title: 'HTML Fundamentals',
        priceKES: 800,
        modules: [
          { id: 'm1', title: 'Intro to HTML', done: true },
          { id: 'm2', title: 'Text & Structure', done: true },
          { id: 'm3', title: 'Links & Images', done: true },
          { id: 'm4', title: 'Forms & Accessibility', done: true },
          { id: 'm5', title: 'Semantic HTML & SEO basics', done: true },
          { id: 'm6', title: 'Mini Project: Static Landing Page', done: true },
        ],
        resources: 4,
        assignments: 2,
        projects: 1,
        sandbox: 1,
        purchased: true,
      },
      {
        id: 's2',
        title: 'CSS & Layouts',
        priceKES: 800,
        modules: [
          { id: 'm1', title: 'CSS Basics', done: true },
          { id: 'm2', title: 'Box Model & Positioning', done: true },
          { id: 'm3', title: 'Flexbox', done: true },
          { id: 'm4', title: 'Grid Layout', done: false, is_current: true },
          { id: 'm5', title: 'Responsive Design', done: false },
          { id: 'm6', title: 'Mini Project: Responsive Landing', done: false },
        ],
        resources: 5,
        assignments: 2,
        projects: 1,
        sandbox: 1,
        purchased: true,
        progress: 45,
      },
      {
        id: 's3',
        title: 'JS & DOM',
        priceKES: 900,
        modules: [
          { id: 'm1', title: 'JS Syntax & Types', done: false },
          { id: 'm2', title: 'Functions & Scope', done: false },
          { id: 'm3', title: 'DOM Manipulation', done: false },
          { id: 'm4', title: 'Events & UI', done: false },
          { id: 'm5', title: 'Async JS & Fetch', done: false },
          { id: 'm6', title: 'Mini Project: Interactive App', done: false },
        ],
        resources: 3,
        assignments: 1,
        projects: 1,
        sandbox: 1,
        purchased: false,
      },
      {
        id: 's4',
        title: 'React / Frameworks',
        priceKES: 1200,
        modules: [
          { id: 'm1', title: 'React Basics', done: false },
          { id: 'm2', title: 'Components & Props', done: false },
          { id: 'm3', title: 'State & Hooks', done: false },
          { id: 'm4', title: 'Routing & Data', done: false },
          { id: 'm5', title: 'Testing & Best Practices', done: false },
          { id: 'm6', title: 'Project: SPA Portfolio', done: false },
        ],
        resources: 6,
        assignments: 2,
        projects: 1,
        sandbox: 1,
        purchased: false,
      },
      {
        id: 's5',
        title: 'Deploy & Portfolio',
        priceKES: 1000,
        modules: [
          { id: 'm1', title: 'Build Tools & Bundling', done: false },
          { id: 'm2', title: 'Hosting Options', done: false },
          { id: 'm3', title: 'CI/CD Basics', done: false },
          { id: 'm4', title: 'Analytics & SEO', done: false },
          { id: 'm5', title: 'Polish & Publish Portfolio', done: false },
          { id: 'm6', title: 'Capstone: Publish your App', done: false },
        ],
        resources: 2,
        assignments: 1,
        projects: 1,
        sandbox: 1,
        purchased: false,
      },
    ],
    totalModules: 30,
    stagesCount: 5,
    priceKES: 4500, // full path bundle price
    includesCertificate: true,
    isPremiumIncluded: false,
    startDate: 'Dec 1, 2025',
    teachers: [
      {
        id: 't1',
        name: 'Aisha K.',
        role: 'Senior Frontend Engineer',
        photo: 'https://i.pravatar.cc/150?img=47',
        bio: 'Ex-startup frontend lead, loves React and teaching students build portfolio projects.',
      },
      {
        id: 't2',
        name: 'Daniel M.',
        role: 'Full-Stack Developer',
        photo: 'https://i.pravatar.cc/150?img=12',
        bio: 'Experienced with deployment pipelines and web performance.',
      },
    ],
    reviews: [
      { id: 'r1', student: 'Lina N.', text: 'I built my first website through this path — instructors are great!' },
      { id: 'r2', student: 'James O.', text: 'Practical and project-focused. Highly recommended.' },
    ],
    faq: [
      { q: 'Do I need prior experience?', a: 'No — we start at the basics and ramp you up.' },
      { q: 'How long does the path take?', a: 'Typical learners finish in 8–12 weeks with 5–7 hours/week.' },
      { q: 'Can I pay per course?', a: 'Yes — each stage is purchasable individually, or buy the full path at a discount.' },
    ],
  };

  // --- UI state ---
  const [expandedStage, setExpandedStage] = useState<string | null>('s2'); // expand CSS stage by default
  const [currentModule, setCurrentModule] = useState<{ stageId: string; moduleId: string } | null>(null);

  // small helper handlers (replace with real flows)
  function handleBuyStage(stage: any) {
    alert(`Purchase flow: Buy stage "${stage.title}" for KES ${stage.priceKES}`);
  }
  function handleEnrollFullPath() {
    alert(`Purchase flow: Enroll Full Path for KES ${path.priceKES}`);
  }
  function handlePremium() {
    alert('Open Premium subscription purchase modal');
  }
  function handleResume(stageId: string, moduleId: string) {
    setCurrentModule({ stageId, moduleId });
    router.push(`/student/catalog/${path.id}/learning/${stageId}`);
  }

  // pulse keyframes (one-time, light)
  const pulseStyle = (
    <style jsx global>{`
      @keyframes softPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.04); opacity: 0.85; }
        100% { transform: scale(1); opacity: 1; }
      }
    `}</style>
  );

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      {pulseStyle}

      {/* HERO */}
      <section className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-3">{path.title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{path.summary}</p>

            <div className="flex flex-wrap gap-3 items-center mb-4">
              <span className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs">
                {path.stagesCount} Courses
              </span>
              <span className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs">
                {path.totalModules}+ Modules
              </span>
              {path.includesCertificate && (
                <span className="px-3 py-1 rounded-md bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-xs flex items-center gap-1">
                  <Star size={12} className="text-yellow-500" /> Certificate
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={handleEnrollFullPath}
                className="px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold flex items-center gap-2"
              >
                Enroll Full Path — KES {path.priceKES}
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handlePremium}
                className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
              >
                Join Premium (Unlimited access)
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Next cohort starts: <span className="font-medium text-gray-700 dark:text-gray-100">{path.startDate}</span>
            </p>
          </div>

          <div className="rounded-xl overflow-hidden h-56 shadow-md">
            <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-start justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold">Courses in this Path</h2>

          <div className="text-sm text-gray-500">Purchase individual course/stage or the full path</div>
        </div>

        <div className="space-y-4">
          {path.stages.map((stage) => {
            const isOpen = expandedStage === stage.id;
            return (
              <div key={stage.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      {/* status icon */}
                      {stage.purchased ? (
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm">✓</div>
                      ) : stage === path.stages[1] ? (
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900">▶</div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                      )}

                      <div className="min-w-0">
                        <div className="text-lg font-semibold leading-snug">{stage.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {Array.isArray(stage.modules) ? stage.modules.length : stage.modules} modules · {stage.resources} resources · {stage.assignments} assignments · {stage.projects} projects
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {/* price or enrolled badge */}
                    {stage.purchased ? (
                      <div className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-md">Purchased</div>
                    ) : (
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">KES {stage.priceKES}</div>
                    )}

                    {/* CTA group */}
                    <div className="flex flex-col gap-2">
                      {stage.purchased ? (
                        <Link
                          href={`/student/catalog/${path.id}/learning/${stage.id}`}
                          className="px-3 py-2 rounded-md bg-green-600 text-white text-sm flex items-center gap-2"
                        >
                          Continue <PlayCircle size={14} />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleBuyStage(stage)}
                          className="px-3 py-2 rounded-md bg-white text-green-600 border border-gray-200 dark:border-gray-700 text-sm"
                        >
                          Buy Stage (KES {stage.priceKES})
                        </button>
                      )}

                      <button
                        onClick={() => setExpandedStage(isOpen ? null : stage.id)}
                        className="text-xs text-gray-500 hover:underline self-end"
                      >
                        {isOpen ? 'Collapse' : 'View Modules'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* modules list (collapsible) */}
                {isOpen && (
                  <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                    {stage.modules.map((m) => {
                      const isCurrent = (m as any).is_current;
                      return (
                        <div key={m.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {m.done ? (
                              <Check size={16} className="text-green-600" />
                            ) : isCurrent ? (
                              <div style={{ animation: 'softPulse 1.6s ease-in-out infinite' }} className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-[10px]">▶</div>
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
                            )}

                            <div>
                              <div className="text-sm">{m.title}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">~ 20–45 mins</div>
                            </div>
                          </div>

                          <div>
                            {isCurrent ? (
                              <button
                                onClick={() => handleResume(stage.id, m.id)}
                                className="px-3 py-1 rounded-md bg-green-600 text-white text-xs"
                              >
                                Resume
                              </button>
                            ) : m.done ? (
                              <button className="px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-200 text-xs">Review</button>
                            ) : (
                              <button
                                onClick={() => alert('Open module preview')}
                                className="px-3 py-1 rounded-md bg-white text-green-600 border border-gray-200 text-xs"
                              >
                                Preview
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TEACHERS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-xl font-bold mb-4">Teachers</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {path.teachers.map((t) => (
            <div key={t.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex gap-3 items-start">
              <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">{t.bio}</div>
                <div className="mt-3">
                  <button className="px-3 py-1 rounded-md bg-white text-green-600 border border-gray-200 text-xs">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-xl font-bold mb-4">Student Reviews</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {path.reviews.map((r) => (
            <div key={r.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <p className="text-sm mb-2">“{r.text}”</p>
              <div className="text-xs text-gray-500">— {r.student}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-10 pb-24">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>

        <div className="space-y-3">
          {path.faq.map((q) => (
            <details key={q.q} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="cursor-pointer font-medium">{q.q}</summary>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">{q.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
