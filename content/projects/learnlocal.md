---
title: "Learn Local"
description: "A comprehensive Flutter mobile application designed to help users learn local languages through interactive lessons, practice exercises, and engaging quizzes."
date: 2025-06-22
draft: false
featured: false
technologies:
    [
      "Flutter",
      "Dart"
    ]
github: "https://github.com/s4ndm4n82/learn_local"
demo: ""
image: "/images/projects/ll_ss.png"
---

## Overview

A comprehensive Flutter mobile application designed to help users learn local languages through interactive lessons, practice exercises, and engaging quizzes. The app focuses on making language learning accessible and enjoyable with features like pronunciation practice, progress tracking, and offline capabilities.

## Key Features

- **Home Dashboard**: Quick access to lessons and support for 4 languages.
- **Interactive Lessons**: Speech practice and audio pronunciation guide.
- **Comprehensive Quizzes**: Multiple difficulty levels, question count, performance tracking with best scores and attempt history.
- **User Profile & Progress**: Personal learning statistics, achievements, lesson completion tracking and streak counters with points system.
- **Settings & Customization**: User preference configuration.
- **Offline Capabilities**: Lessons can be downloaded for offline studying and progress will be synced when back online.

## Technical Implementation

### WPF Architecture

The application developed using Flutter:

```csharp
void main() {
  runApp(LearnLocal());
}

class ThemeNotifier extends ChangeNotifier {
  bool _isDarkMode = false;

  bool get isDarkMode => _isDarkMode;

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;

    notifyListeners();
  }
}
```

## Future Enhancements

- Cloud synchronization
- Social features and leaderboards
- Advanced pronunciation analysis
- More language support
- Gamification elements
