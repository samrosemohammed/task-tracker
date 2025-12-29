# Task Tracker

A modern, minimalist task management application built with React, TypeScript, and Vite.

## Features

- Create, edit, and delete tasks
- Search and filter tasks by status
- Sort tasks by title or due date
- Local storage persistence
- Beautiful UI with Tailwind CSS


## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **React Hook Form** - Form management
- **date-fns** - Date formatting
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/
│   ├── create-task-dialog.tsx  # Task creation/edit dialog
│   ├── header.tsx              # App header with new task button
│   └── task-list.tsx           # Task list with filters
├── context/
│   └── task-context-provider.tsx  # Task state management
├── lib/
│   ├── task-api.ts             # Task storage API
│   └── utils.ts                # Utility functions
└── wrapper/
    └── max-width-wrapper.tsx   # Layout wrapper
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/samrosemohammed/task-tracker.git
cd task-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Creating a Task

1. Click the "New Task" button in the header
2. Fill in the task title, due date, and status
3. Click "Confirm" to save

### Managing Tasks

- **Toggle Status**: Click the circle icon to mark as done/todo
- **Edit Task**: Hover over a task and click the edit icon
- **Delete Task**: Hover over a task and click the trash icon
- **Search**: Use the search bar to filter by title
- **Filter**: Switch between All, Pending, and Done tasks
- **Sort**: Toggle between sorting by date or title

## Customization

### Styling

The app uses Tailwind CSS with custom theme variables defined in [`src/index.css`](src/index.css). Colors and spacing can be customized through CSS variables.

