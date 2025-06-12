# Functional Requirements for Foot Strengthening App

# 1. Overview

The Foot Strengthening App is a mobile-first Progressive Web App (PWA) built with React, Next.js, and Tailwind CSS, deployed on Vercel. It guides users through a 5-week foot and calf strengthening program, displaying exercises by week, guiding users through routines with countdown timers, tracking progress, limiting strengthening sessions, and providing local storage and notifications.

## 2. Functional Requirements

| Requirement ID | Description | User Story | Expected Behavior/Outcome |
| --- | --- | --- | --- |
| FR-1 | Display exercises for a 5-week program, grouped into daily routines (performed daily) and strengthening programs (performed 3x per week). | As a user, I want to view all exercises for the current week, grouped by daily routines and strengthening programs, so that I can easily follow my program. | The app displays a list of exercises for the selected week, separated into "Daily Routine" and "Strengthening Program" sections, with details like exercise name, duration, sets, reps, and description. Users can switch between weeks. |
| FR-2 | Guide users through the daily routine in sequence, displaying one exercise at a time with a countdown timer, optional sound, and customizable duration. | As a user, I want to start the daily routine and follow exercises in sequence, so that I can complete them without managing the order manually. | The app starts the daily routine, showing one exercise at a time in sequence, automatically advancing to the next exercise upon completion. |
| FR-3 | Display a countdown timer for each exercise in the daily routine with a default duration. | As a user, I want each exercise to display a countdown timer with the default duration, so that I know how long to perform it. | Each exercise screen shows a countdown timer starting at the default duration (e.g., 30 seconds), counting down in real-time. |
| FR-4 | Play an optional sound when the countdown timer ends. | As a user, I want to hear an optional sound when the countdown ends, so that I’m alerted without looking at the screen. | When the countdown reaches zero, an optional sound (e.g., a beep) plays if enabled by the user. |
| FR-5 | Allow users to adjust the duration of an exercise in the daily routine. | As a user, I want to adjust the duration of an exercise, so that I can customize it to my needs. | The exercise screen includes an input field to modify the countdown duration, updating the timer accordingly. |
| FR-6 | Automatically move to the next exercise when the current one is complete. | As a user, I want to automatically move to the next exercise when the current one is complete, so that I can focus on exercising. | After the countdown timer reaches zero, the app automatically displays the next exercise in the sequence or ends the routine if complete. |
| FR-7 | Guide users through the strengthening program (3x per week) similarly to the daily routine. | As a user, I want to start the strengthening program and follow exercises in sequence, so that I can complete it efficiently. | The app starts the strengthening program, showing one exercise at a time (with sets/reps instead of duration), advancing to the next exercise upon completion. |
| FR-8 | Warn users if they’ve completed the strengthening program 3 times in a week. | As a user, I want to be warned if I’ve already completed the strengthening program 3 times in a week, so that I avoid overexertion. | The app checks completion history and displays a warning modal if the user attempts to start the strengthening program after reaching the 3x weekly limit. |
| FR-9 | Track strengthening program completions. | As a user, I want the app to track my strengthening program completions, so that I can stay within the recommended limit. | The app records each strengthening program completion in local storage, including the date, to enforce the 3x weekly limit. |
| FR-10 | Allow users to mark exercises as completed and display their status. | As a user, I want to mark exercises as completed and see which ones I’ve finished, so that I can track my progress within a session or week. | Users can mark exercises as completed (e.g., via a checkbox), and the app displays a visual indicator (e.g., a green checkmark) next to completed exercises. Completion status persists across sessions. |
| FR-11 | Allow users to complete a week’s program and progress to the next week’s exercises. | As a user, I want to mark a week as complete and view the next week’s exercises, so that I can continue the 5-week program seamlessly. | After completing all exercises in a week (or via a manual "Complete Week" button), the app unlocks and displays the next week’s exercises, updating the current week in local storage. |
| FR-12 | Store progress and completion dates locally. | As a user, I want my progress and completion dates saved locally, so that I can resume where I left off even after closing the app. | The app saves exercise completions, strengthening program counts, and current week in local storage, allowing users to resume progress after closing and reopening the app. |
| FR-13 | Allow users to set a daily reminder for routines. | As a user, I want to set a daily reminder for my routines, so that I’m prompted to exercise at a consistent time. | The app provides a form to set a daily reminder time, storing it locally and scheduling notifications accordingly. |
| FR-14 | Send notifications for scheduled routines. | As a user, I want to receive notifications for my scheduled routines, so that I don’t forget to exercise. | The app sends browser notifications at the scheduled time, provided the user has granted notification permissions and the browser/app is open. |

## 3. Non-Functional Requirements

- **Mobile-First**: The app must be optimized for mobile devices with a responsive design using Tailwind CSS.
- **PWA**: The app must function as a Progressive Web App, supporting offline access and installation on mobile devices.
- **Deployment**: The app must be deployable on Vercel’s free tier.
- **Accessibility**: The app must support basic accessibility features (e.g., keyboard navigation, ARIA labels) for users with mobility issues.
- **Performance**: The app must load quickly, leveraging Next.js Static Site Generation for exercise data.

## 4. Assumptions

- Exercise data is static and stored in a JSON file within the app.
- No backend is required; all data is stored in `localStorage`.
- Notifications are limited to when the browser or app is open, unless a backend is added later for push notifications.
- The app targets individual users, not requiring user accounts or cross-device sync.

## 5. Constraints

- The app must avoid native mobile app development to bypass app store approvals.
- Notifications are subject to browser permissions and PWA limitations.
- Storage is limited to `localStorage` capacity (typically 5-10 MB).

## 6. Future Considerations

- Add a backend (e.g., Firebase) for cross-device sync or push notifications.
- Include exercise videos or images if storage and performance allow.
- Allow users to export progress or share achievements.