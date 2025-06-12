# StepStrong

StepStrong is a mobile-first Progressive Web App (PWA) that guides users through a 5-week foot and calf strengthening program. The app helps users reduce foot soreness by providing structured daily routines and strengthening exercises, with features like countdown timers, progress tracking, and local storage for offline use. Built with React, Next.js, and Tailwind CSS, it is deployed on Vercel for fast, scalable performance.

## Features
- **Weekly Exercise Display**: View exercises grouped by week, split into daily routines and strengthening programs (3x per week).
- **Guided Routines**: Follow exercise sequences with countdown timers, optional sound alerts, and customizable durations.
- **Progress Tracking**: Mark exercises as completed and track progress using local storage.
- **Strengthening Limit**: Receive warnings if attempting the strengthening program more than 3 times per week.
- **Week Progression**: Complete a week's program to unlock the next week's exercises.
- **Local Storage & Notifications**: Save progress locally and set daily reminders for routines (browser notifications).
- **PWA**: Installable on mobile devices with offline support via service workers.

## Tech Stack
- **Language**: JavaScript/TypeScript
- **Framework**: React + Next.js (Static Site Generation for performance)
- **Styling**: Tailwind CSS
- **Build Tool**: Next.js with `next-pwa` for PWA support
- **Deployment**: Vercel (free tier)

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/stepstrong.git
   cd stepstrong
   ```

2. **Install Dependencies**
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Or:
   ```bash
   yarn dev
   ```
   Open `http://localhost:3000` in your browser to view the app.

4. **Build for Production**
   ```bash
   npm run build
   ```
   This generates an optimized build with static assets and service workers for PWA functionality.

5. **Deploy to Vercel**
   - Push the repository to GitHub.
   - Connect the repository to Vercel via the Vercel dashboard.
   - Deploy with Vercel’s CLI or GitHub integration:
     ```bash
     vercel
     ```
   - Ensure `next-pwa` is configured in `next.config.js` for PWA support.

## Project Structure
```
stepstrong/
├── data/
│   └── exercises.json           # Static JSON file with 5-week exercise data
├── public/
│   ├── icon.png                # App icon for PWA
│   └── beep.mp3                # Sound file for countdown alerts
├── src/
│   ├── components/
│   │   ├── WeekSelector.tsx    # Component for switching weeks
│   │   ├── RoutinePlayer.tsx   # Component for guiding exercise sequences
│   │   ├── Countdown.tsx       # Countdown timer component
│   │   └── ExerciseList.tsx    # Component for displaying exercises
│   ├── pages/
│   │   ├── index.tsx           # Main app page
│   │   └── _app.tsx            # Custom App component
│   ├── styles/
│   │   └── globals.css         # Global styles with Tailwind CSS
├── next.config.js              # Next.js configuration with next-pwa
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Usage
1. **View Exercises**: Select a week to view daily routines and strengthening programs.
2. **Start Routine**: Begin a daily or strengthening routine, following the guided sequence with countdown timers.
3. **Customize Duration**: Adjust exercise durations via input fields during routines.
4. **Track Progress**: Mark exercises as completed; progress is saved in `localStorage`.
5. **Receive Warnings**: Get alerted if attempting the strengthening program more than 3 times per week.
6. **Set Reminders**: Schedule daily notifications for routines (requires browser permission).
7. **Install PWA**: Add the app to your mobile device’s home screen for offline access.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit changes (`git commit -m "Add my feature"`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Future Improvements
- Add a backend (e.g., Firebase) for cross-device sync and push notifications.
- Include exercise videos or images for visual guidance.
- Allow users to export progress or share achievements.
- Enhance accessibility with advanced ARIA support.

## Contact
For questions or feedback, open an issue on GitHub or reach out to [your-email@example.com].
