'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Code,
  Cpu,
  Gamepad,
  User,
  Wallet,
  CreditCard,
  Users,
  Check,
  Mail,
  Phone,
  Star,
  ArrowRight,
  Gift,
  PlusCircle
} from 'lucide-react';

/**
 * WelcomeDashboardContent.tsx
 * - Content-only dashboard welcome component for a freshly registered student.
 * - NOTE: ignore navbars/sidebars/footers (this component is only the content area)
 * - Uses the color system and UI language from the provided page.tsx
 * - Replace image src values with your assets or PNGs as required.
 */

export default function WelcomeDashboardContent() {
  const journeys = [
    {
      id: 'basic-coding',
      title: 'Basic Coding (by Age)',
      summary: 'Age-tailored fundamentals: logic, Scratch, block-based and text basics',
      icon: Code,
      stages: ['Intro & Logic', 'Blocks & Scratch', 'Intro to Python', 'Mini Projects', 'Assessment']
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      summary: 'HTML → CSS → JavaScript → Frameworks → Deployments',
      icon: BookOpen,
      stages: ['HTML Fundamentals', 'CSS & Layouts', 'JS & DOM', 'React / Frameworks', 'Deploy & Portfolio']
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      summary: 'Start from data & algorithms, progress to models and inference',
      icon: Cpu,
      stages: ['Math & Python', 'Data Wrangling', 'ML Basics', 'Deep Learning', 'Projects & Ethics']
    },
    {
      id: 'game-dev',
      title: 'Gaming & Game Development',
      summary: 'Design, code, and publish games across platforms',
      icon: Gamepad,
      stages: ['Game Design', '2D Engines', '3D Basics', 'Scripting & AI', 'Publish & Iterate']
    }
  ];

  // Pricing constants (from user's brief)
  const PRICE_PER_COURSE = 10; // USD
  const PRICE_PER_MODULE = 2; // USD
  const PRICE_PER_PATH = 20; // USD
  const SUB_MONTHLY = 25; // USD (from attached file)
  const SUB_ANNUAL = 250; // USD (from attached file)

  // local UI state
  const [selectedJourney, setSelectedJourney] = useState(journeys[0]);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);
  const [paymentChoice, setPaymentChoice] = useState<'course' | 'module' | 'path' | 'subscription' | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<'monthly' | 'annual' | null>(null);
  const [selfPaced, setSelfPaced] = useState(true);
  const [preferredTeacher, setPreferredTeacher] = useState<string | null>(null);
  const [isMinor, setIsMinor] = useState(false);
  const [guardianContact, setGuardianContact] = useState({ name: '', email: '', phone: '' });
  const [requestSent, setRequestSent] = useState(false);
  const [buyForAnother, setBuyForAnother] = useState({ enabled: false, recipientEmail: '' });

  const teachers = [
    { id: 't1', name: 'Aisha K.' },
    { id: 't2', name: 'Daniel M.' },
    { id: 't3', name: 'Priya R.' }
  ];

  function priceForSelection() {
    if (paymentChoice === 'course') return PRICE_PER_COURSE;
    if (paymentChoice === 'module') return PRICE_PER_MODULE;
    if (paymentChoice === 'path') return PRICE_PER_PATH;
    if (paymentChoice === 'subscription') return subscriptionPlan === 'monthly' ? SUB_MONTHLY : SUB_ANNUAL;
    return 0;
  }

  function handleSendGuardianRequest() {
    // In a real app: call API to create a payment request and send email/SMS.
    setRequestSent(true);
    // simulate side-effect
    setTimeout(() => {
      alert('Payment request sent to guardian — this is a simulated action in the demo.');
    }, 200);
  }

  function handleBuy() {
    if (isMinor && !requestSent) {
      alert('You must send a payment request to your guardian.');
      return;
    }

    const amount = priceForSelection();
    if (amount <= 0) {
      alert('Select what you want to buy first.');
      return;
    }

    // Normally: open payment modal / redirect to checkout
    if (buyForAnother.enabled && buyForAnother.recipientEmail) {
      alert(`Proceeding to buy for ${buyForAnother.recipientEmail} — Amount: $${amount}`);
    } else {
      alert(`Proceeding to payment — Amount: $${amount}`);
    }
  }

  return (
    <main className="max-w-6xl mx-auto">
      {/* Welcome header */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome to MyPath 🎉</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
              Your learning journey is ready. Pick a path, choose where to start, and decide how you want to learn — self-paced or with a teacher. Everything appears on this dashboard.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Course: ${PRICE_PER_COURSE}</span>
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Module: ${PRICE_PER_MODULE}</span>
              <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Path: ${PRICE_PER_PATH}</span>
              <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm">Monthly: ${SUB_MONTHLY}</span>
            </div>
          </div>

          <div className="w-48 h-48 relative flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1584697964154-7f2e1f1d5a6f?w=800&q=80"
              alt="Welcome illustration"
              fill
              className="object-cover rounded-xl shadow-2xl"
            />
            
          </div>
        </div>
      </section>

      {/* Journey Selector */}
      <section className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Choose a Learning Journey</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Select a path below. Journeys are connected — you can always transition from basics to advanced tracks like AI.</p>

            <div className="grid md:grid-cols-2 gap-4">
              {journeys.map((j) => {
                const Icon = j.icon;
                const active = selectedJourney.id === j.id;
                return (
                  <button
                    key={j.id}
                    onClick={() => { setSelectedJourney(j); setSelectedStageIndex(null); }}
                    className={`text-left p-4 rounded-lg border ${active ? 'border-green-600 bg-green-50 dark:bg-green-900/40' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'} hover:shadow-sm transition`}
                  >
                    <div className="flex items-start gap-4">
                      <Icon size={36} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{j.title}</h3>
                          {active && <span className="text-green-600 text-sm font-medium">Selected</span>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{j.summary}</p>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{j.stages.length} stages • starts from basics</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stages & Start Point */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Where would you like to start in <span className="text-green-600">{selectedJourney.title}</span>?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Pick any stage as your starting point. The platform will adapt the subsequent recommendations.</p>

            <div className="flex flex-col gap-3">
              {selectedJourney.stages.map((stage, idx) => (
                <div key={stage} className={`p-4 rounded-lg border ${selectedStageIndex === idx ? 'border-green-600 bg-green-50' : 'border-gray-100 dark:border-gray-700'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-gray-900 dark:text-white">{stage}</strong>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Stage {idx + 1}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Short description for {stage}. Covers essentials and hands-on projects.</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Price: <strong>${PRICE_PER_COURSE}</strong> per course • Modules available at ${PRICE_PER_MODULE} each</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelectedStageIndex(idx)} className={`px-4 py-2 rounded-lg font-semibold ${selectedStageIndex === idx ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'}`}>
                          Start Here
                        </button>
                      </div>
                      <button onClick={() => { setPaymentChoice('course'); setSelectedStageIndex(idx); }} className="text-sm text-green-600 hover:underline">Buy Course</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Payment, Teacher, Options */}
        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-green-600" />
              <h4 className="font-bold text-gray-900 dark:text-white">Learning Mode</h4>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={selfPaced} onChange={() => setSelfPaced(!selfPaced)} className="checkbox" />
                <span className="text-sm">Self-paced</span>
              </label>
              <label className="inline-flex items-center gap-2 ml-4">
                <input type="checkbox" checked={!selfPaced} onChange={() => setSelfPaced(!selfPaced)} className="checkbox" />
                <span className="text-sm">With Teacher</span>
              </label>
            </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md ">

            <div className="mt-4 border-t pt-4">
              <h5 className="font-semibold text-gray-900 dark:text-white">Payment Options</h5>

              <div className="mt-3 space-y-2">

                <div className="mt-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={buyForAnother.enabled} onChange={(e) => setBuyForAnother({ ...buyForAnother, enabled: e.target.checked })} />
                    <span>Buy this for another user</span>
                  </label>

                  {buyForAnother.enabled && (
                    <div className="mt-2">
                      <input placeholder="Recipient's email" value={buyForAnother.recipientEmail} onChange={(e) => setBuyForAnother({ ...buyForAnother, recipientEmail: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700" />
                    </div>
                  )}
                </div>
                

                <label className={`flex items-center gap-3 p-3 rounded-lg border ${paymentChoice === 'path' ? 'border-green-600 bg-green-50' : 'border-gray-100 dark:border-gray-700'}`}>
                  <input type="radio" name="paymentChoice" checked={paymentChoice === 'path'} onChange={() => setPaymentChoice('path')} />
                  <div>
                    <div className="text-sm font-medium">Buy full learning path</div>
                    <div className="text-xs text-gray-500">${PRICE_PER_PATH} for entire path</div>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-lg border ${paymentChoice === 'subscription' ? 'border-green-600 bg-green-50' : 'border-gray-100 dark:border-gray-700'}`}>
                  <input type="radio" name="paymentChoice" checked={paymentChoice === 'subscription'} onChange={() => { setPaymentChoice('subscription'); setSubscriptionPlan('monthly'); }} />
                  <div>
                    <div className="text-sm font-medium">Platform subscription</div>
                    <div className="text-xs text-gray-500">${SUB_MONTHLY}/month or ${SUB_ANNUAL}/year</div>
                  </div>
                </label>

                {paymentChoice === 'subscription' && (
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => setSubscriptionPlan('monthly')} className={`px-3 py-2 rounded ${subscriptionPlan === 'monthly' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'}`}>Monthly</button>
                    <button onClick={() => setSubscriptionPlan('annual')} className={`px-3 py-2 rounded ${subscriptionPlan === 'annual' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'}`}>Annual</button>
                  </div>
                )}

                {/* Guardian / Parent flow */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Star className="text-green-600" />
              <h4 className="font-bold text-gray-900 dark:text-white">Account Type & Guardians</h4>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Indicate whether you are signing up as a minor (under parent/guardian) or an adult student. Minors cannot complete payments directly; use the guardian request flow below.</p>

            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={isMinor} onChange={() => setIsMinor(!isMinor)} />
              <span className="text-sm">I am under a parent/guardian</span>
            </label>

            {isMinor && (
              <div className="space-y-2 mt-3">
                <input placeholder="Guardian name" value={guardianContact.name} onChange={(e) => setGuardianContact({ ...guardianContact, name: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700" />
                <input placeholder="Guardian email" value={guardianContact.email} onChange={(e) => setGuardianContact({ ...guardianContact, email: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700" />
                <input placeholder="Guardian phone" value={guardianContact.phone} onChange={(e) => setGuardianContact({ ...guardianContact, phone: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700" />

                {requestSent && (
                  <div className="mt-2 text-sm text-green-700">Payment request queued — guardian will receive an email/SMS with payment link (simulated).</div>
                )}
              </div>
            )}
          </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Total: <strong>${priceForSelection()}</strong></div>
                  {isMinor ?  <button onClick={handleSendGuardianRequest} className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">Send Payment Request</button>
                  : <button onClick={handleBuy} className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">Proceed to Payment</button>}
                </div>
              </div>
            </div>
          </div>

          

          {/* Quick actions */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md flex flex-col gap-3">
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50">
              <div className="flex items-center gap-3"><Gift /><span className="font-medium">Claim Welcome Bonus</span></div>
              <ArrowRight />
            </button>

            <button onClick={() => alert('Redirect to Course Catalog (demo)')} className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50">
              <div className="flex items-center gap-3"><PlusCircle /><span className="font-medium">Browse All Courses</span></div>
              <ArrowRight />
            </button>
          </div>
        </aside>
      </section>

      {/* Promotional long section - marketing copy + details */}
      <section className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Why choose MyPath?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">MyPath adapts to where you are. Start at any point in a journey and we will intelligently recommend the next steps. Want to go from Basic Coding → Web Development → AI? It’s seamless — your progress, projects and portfolio travel with you.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2">Connected Journeys</h4>
            <p className="text-sm text-gray-600">Paths are interconnected — your learning history informs recommended next courses and projects.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2">Flexible Payments</h4>
            <p className="text-sm text-gray-600">Buy single modules, courses, full paths, or subscribe monthly/annually. Gift courses to others.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2">Teacher & Self-Paced</h4>
            <p className="text-sm text-gray-600">Choose self-paced learning or hand-pick a teacher for live sessions and mentorship.</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600">Promotional: Enroll in a full learning path today for <strong>${PRICE_PER_PATH}</strong> — includes 5+ stages, project work, assessments, and a certificate on completion.</p>
        </div>
      </section>

      {/* Empty state CTA when nothing booked */}
      <section className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">You haven't booked or paid for a course yet</h3>
            <p className="text-gray-600 dark:text-gray-300">Get started now — pick a path, select a stage and complete your payment. Or grab the platform subscription for unlimited access.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setPaymentChoice('subscription'); setSubscriptionPlan('monthly'); }} className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold">Get Unlimited Access (${SUB_MONTHLY}/mo)</button>
            <button onClick={() => alert('Go to catalog (demo)')} className="border border-gray-200 px-5 py-3 rounded-lg">Browse Courses</button>
          </div>
        </div>
      </section>

      {/* Tips / Next Steps */}
      <section className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
          <h4 className="font-semibold">Next Steps</h4>
          <ol className="text-sm text-gray-600 mt-2 space-y-2">
            <li>1. Choose a learning journey</li>
            <li>2. Pick where to start (Stage)</li>
            <li>3. Decide payment option or send guardian request</li>
            <li>4. Start learning — projects & portfolio included</li>
          </ol>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
          <h4 className="font-semibold">Support</h4>
          <p className="text-sm text-gray-600 mt-2">Need help? Contact support at <a className="text-green-600">support@mypath.example</a> or call <span className="font-medium">0703618918</span>.</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
          <h4 className="font-semibold">Gift & Share</h4>
          <p className="text-sm text-gray-600 mt-2">Buy a course or entire path for a friend or family member. They will receive a redemption link via email.</p>
        </div>
      </section>
    </main>
  );
}
