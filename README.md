# Step Strong

Step Strong is a mobile-first Progressive Web App (PWA) that guides users through a 5-week foot and calf strengthening program. The app helps users reduce foot soreness by providing structured daily routines and strengthening exercises, with features like countdown timers, progress tracking, and local storage for offline use. Built with Next.js, React, and Tailwind CSS, it's designed for optimal performance and user experience.

## Features

- **5-Week Program**: Structured exercises spread across 5 weeks with progressive intensity
- **Daily Routines**: Morning and evening exercises to improve flexibility and mobility
- **Guided Workouts**: Step-by-step exercise instructions with visual guidance
- **Progress Tracking**: Monitor your completion rate and streak
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Offline Support**: Continue your program without an internet connection
- **No Login Required**: All data is stored locally in your browser

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Heroicons
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/step-strong.git
   cd step-strong
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── daily-routine/      # Daily exercise routines
│   ├── progress/           # User progress tracking
│   └── week/               # Weekly strengthening programs
├── components/             # Reusable UI components
├── data/                   # Exercise data and content
└── hooks/                  # Custom React hooks
```

## Data Model

The application uses a JSON-based data model for exercises, stored in `src/data/exercises.json`. This file contains:

- Daily routines (morning and evening)
- 5-week strengthening program
- Exercise instructions and metadata
- Progressive standing/walking protocol

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
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
For questions or feedback, open an issue on GitHub or reach out to [cdcunha@gmail.com].
