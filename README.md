# Task Manager App

A modern, responsive task management web application built with vanilla HTML, CSS, and JavaScript. Features a beautiful UI with dark/light theme toggle, task categorization, and local storage persistence.

![Task Manager App](https://img.shields.io/badge/Status-Complete-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with custom text and categories
- ✅ **Edit Tasks** - Modify existing tasks with a beautiful modal interface
- ✅ **Delete Tasks** - Remove tasks with confirmation dialog
- ✅ **Mark Complete** - Toggle task completion status
- ✅ **Task Categories** - Organize tasks by Work, Personal, Shopping, Health, and Other

### User Experience
- 🌙 **Dark/Light Theme** - Toggle between themes with persistent preference
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- 🔍 **Filter Tasks** - View tasks by category or see all tasks
- 📊 **Task Statistics** - Real-time count of total, completed, and pending tasks

### Technical Features
- 💾 **Local Storage** - All data persists in browser local storage
- ⌨️ **Keyboard Shortcuts** - Ctrl/Cmd + Enter to add tasks, Escape to close modals
- 🎯 **Accessibility** - Proper ARIA labels and keyboard navigation
- 🚀 **Performance** - Optimized for fast loading and smooth interactions

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required!

### Installation
1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Start managing tasks** immediately!

```bash
# If you have a local server (optional)
# Navigate to the project directory and run:
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## 📖 How to Use

### Adding Tasks
1. Type your task in the input field
2. Select a category from the dropdown
3. Click "Add Task" or press Ctrl/Cmd + Enter
4. Your task appears at the top of the list

### Managing Tasks
- **Complete a task**: Click the checkbox or anywhere on the task
- **Edit a task**: Click the edit button (pencil icon)
- **Delete a task**: Click the delete button (trash icon)
- **Filter tasks**: Use the category filter buttons

### Theme Toggle
- Click the moon/sun icon in the top-right corner
- Your theme preference is automatically saved

## 🎨 Design Features

### Color Scheme
- **Light Theme**: Clean whites and grays with purple accents
- **Dark Theme**: Deep blues and grays with bright purple accents
- **Category Colors**: Each category has its own distinct color

### Responsive Breakpoints
- **Desktop**: Full layout with side-by-side elements
- **Tablet**: Optimized spacing and touch-friendly buttons
- **Mobile**: Stacked layout with full-width elements

### Animations
- Smooth hover effects on interactive elements
- Subtle scale animations for task completion
- Modal slide-in animations
- Theme transition effects

## 🛠️ Technical Details

### File Structure
```
task-manager/
├── index.html          # Main HTML structure
├── styles.css          # All styling and themes
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Local Storage Schema
```javascript
{
  "tasks": [
    {
      "id": "timestamp",
      "text": "Task description",
      "category": "work|personal|shopping|health|other",
      "completed": false,
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string",
      "completedAt": "ISO date string"
    }
  ],
  "theme": "light|dark"
}
```

## 🔧 Customization

### Adding New Categories
1. Update the `categorySelect` options in `index.html`
2. Add corresponding filter buttons
3. Add CSS styles for the new category in `styles.css`
4. Update the category validation in `script.js`

### Styling Modifications
- All colors are defined as CSS custom properties in `:root`
- Modify the color variables to change the entire theme
- Animation durations can be adjusted in the CSS transition properties

### Feature Extensions
- Add due dates for tasks
- Implement task priorities
- Add search functionality
- Export/import tasks
- Add task notes or descriptions

## 🐛 Troubleshooting

### Common Issues
1. **Tasks not saving**: Check if local storage is enabled in your browser
2. **Theme not persisting**: Ensure cookies/local storage is not blocked
3. **Mobile layout issues**: Clear browser cache and refresh

### Browser Compatibility
- If animations don't work, your browser may not support CSS transitions
- For older browsers, consider adding polyfills for modern JavaScript features

## 📱 Mobile Experience

The app is fully responsive and optimized for mobile devices:
- Touch-friendly button sizes (minimum 44px)
- Swipe gestures for task completion (future enhancement)
- Optimized typography for small screens
- Collapsible navigation on mobile

## 🚀 Future Enhancements

- [ ] Task due dates and reminders
- [ ] Task priorities and sorting
- [ ] Search and filter by text
- [ ] Task notes and descriptions
- [ ] Export/import functionality
- [ ] Drag and drop reordering
- [ ] Task templates
- [ ] Progress tracking
- [ ] Collaboration features
- [ ] Offline sync capabilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue in the project repository.

---

**Made with ❤️ using vanilla HTML, CSS, and JavaScript**
