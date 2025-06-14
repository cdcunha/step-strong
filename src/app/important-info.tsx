'use client';

import React, { useState } from "react";
import Link from "next/link";

const keyMessage =
  "The key is consistent daily movement and gradual progression. If your existing strength base is good, so focus on endurance and addressing the specific weaknesses in your feet and calves. If pain persists or worsens after 4-6 weeks, consider seeing a physical therapist for personalized assessment.";

const sections = [
  {
    title: "Progressive Standing/Walking Protocol",
    content: [
      "Start with your current tolerance and add 2-3 minutes weekly:",
      "Week 1: Stand 5 minutes, walk 0.25 miles",
      "Week 2: Stand 8 minutes, walk 0.4 miles",
      "Week 3: Stand 12 minutes, walk 0.6 miles",
      "Continue progressing gradually"
    ]
  },
  {
    title: "Immediate Relief Strategies",
    content: [
      "Ice massage for Achilles after activity (5-10 minutes)",
      "Supportive shoes with good arch support",
      "Consider heel cups or arch supports temporarily",
      "Elevate feet when sitting for long periods"
    ]
  },
  {
    title: "Workplace Modifications",
    content: [
      "Set hourly reminders to stand and do calf raises",
      "Use a standing desk converter for 15-30 minutes at a time",
      "Keep a tennis ball under your desk for foot rolls",
      "Do ankle pumps while coding",
      "Start with the daily routine immediately, and begin the strengthening program at a comfortable level. The burning Achilles pain should improve as you build strength and flexibility in your calves."
    ]
  },
  {
    title: "Form Tips & Safety Notes",
    content: [
      "Start slowly: Begin with shorter holds and fewer reps",
      "Quality over quantity: Perfect form prevents injury",
      "Listen to your body: Some discomfort is normal, sharp pain is not",
      "Progress gradually: Don't rush to advanced exercises",
      "Stay consistent: Daily routine is more important than intensity",
      "Warm up: Always do ankle circles before strengthening exercises",
      "Cool down: Always stretch after strengthening exercises"
    ]
  },
  {
    title: "Modifications for Beginners",
    content: [
      "Use wall or chair for balance on all standing exercises",
      "Reduce repetitions by half if exercises feel too challenging",
      "Hold stretches for 15 seconds instead of 30 if very tight",
      "Take rest days if experiencing unusual soreness",
      "Focus on form over speed or repetitions"
    ]
  },
  {
    title: "When to Progress",
    content: [
      "Move to next week when current exercises feel comfortable",
      "You should be able to complete all sets and reps with good form",
      "Mild muscle fatigue is normal, joint pain is not",
      "If an exercise becomes easy, it's time to progress"
    ]
  }
];

export default function ImportantInfo() {
  const [openPanels, setOpenPanels] = useState(Array(sections.length).fill(false));

  const handleToggle = (idx: number) => {
    setOpenPanels((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const expandAll = () => setOpenPanels(Array(sections.length).fill(true));
  const collapseAll = () => setOpenPanels(Array(sections.length).fill(false));

  const allExpanded = openPanels.every(Boolean);
  const allCollapsed = openPanels.every((v) => !v);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link
        href="/"
        className="inline-block mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Important Program Information</h1>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mb-6 rounded shadow-sm dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-400">
        <span className="font-semibold"></span> {keyMessage}
      </div>
      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={expandAll}
          disabled={allExpanded}
          aria-disabled={allExpanded}
        >
          Expand All
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={collapseAll}
          disabled={allCollapsed}
          aria-disabled={allCollapsed}
        >
          Collapse All
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="border rounded shadow-sm bg-white dark:bg-gray-800">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold focus:outline-none focus:ring hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              onClick={() => handleToggle(idx)}
              aria-expanded={openPanels[idx]}
              aria-controls={`panel-${idx}`}
            >
              <span>{section.title}</span>
              <span className="ml-2">{openPanels[idx] ? "-" : "+"}</span>
            </button>
            {openPanels[idx] && (
              <div id={`panel-${idx}`} className="px-6 pb-4 pt-2">
                <ul className="list-disc ml-6 space-y-1">
                  {section.content.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

