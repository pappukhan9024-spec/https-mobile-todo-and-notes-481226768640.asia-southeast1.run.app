import React, { useState, useEffect, useMemo } from 'react';
import { 
  Check, 
  Trash, 
  Plus, 
  Search, 
  Folder, 
  Calendar as CalendarIcon, 
  Timer, 
  Settings, 
  User, 
  Mail, 
  Bell, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Hourglass, 
  AlertCircle, 
  Edit2, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  ClipboardList,
  ChevronRight,
  UserCircle2,
  Tag,
  Smile,
  CheckSquare,
  Square,
  X,
  Send
} from 'lucide-react';
import { Task, Subtask, Note, CustomTimer } from './types';

export default function App() {
  // ---------- ACTIVE TAB & ACCENTS ----------
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nooter' | 'calendar' | 'timer' | 'settings'>('dashboard');

  // ---------- AI COPILOT STATES ----------
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'assistant', text: string, error?: boolean }>>([
    { role: 'assistant', text: "Hey! I am your Companion Workspace Copilot. You can tell me to create task items (with priorities, categories, and subtasks), draft notes, create note folders, or add custom focus timers. What can I set up for you today? 🚀" }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  
  // Color Accent Preferences
  const [themeAccent, setThemeAccent] = useState<'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple'>(() => {
    return (localStorage.getItem('todo_theme_accent') as any) || 'indigo';
  });

  useEffect(() => {
    localStorage.setItem('todo_theme_accent', themeAccent);
  }, [themeAccent]);

  // Accent helper classes mapping
  const accentClasses = useMemo(() => {
    const maps = {
      indigo: {
        bg: 'bg-indigo-600 hover:bg-indigo-700',
        text: 'text-indigo-600',
        border: 'border-indigo-200 focus:border-indigo-600 focus:ring-indigo-100',
        badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400',
        ring: 'ring-indigo-500',
        subText: 'text-indigo-500'
      },
      emerald: {
        bg: 'bg-emerald-600 hover:bg-emerald-700',
        text: 'text-emerald-600',
        border: 'border-emerald-200 focus:border-emerald-600 focus:ring-emerald-100',
        badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
        ring: 'ring-emerald-500',
        subText: 'text-emerald-500'
      },
      amber: {
        bg: 'bg-amber-500 hover:bg-amber-600',
        text: 'text-amber-600',
        border: 'border-amber-200 focus:border-amber-500 focus:ring-amber-100',
        badge: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400',
        ring: 'ring-amber-500',
         subText: 'text-amber-500'
      },
      rose: {
        bg: 'bg-rose-600 hover:bg-rose-700',
        text: 'text-rose-600',
        border: 'border-rose-200 focus:border-rose-600 focus:ring-rose-100',
        badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',
        ring: 'ring-rose-500',
         subText: 'text-rose-500'
      },
      sky: {
        bg: 'bg-sky-500 hover:bg-sky-600',
        text: 'text-sky-500',
        border: 'border-sky-200 focus:border-sky-500 focus:ring-sky-100',
        badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400',
        ring: 'ring-sky-400',
         subText: 'text-sky-400'
      },
      purple: {
        bg: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600',
        border: 'border-purple-200 focus:border-purple-600 focus:ring-purple-100',
        badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
        ring: 'ring-purple-500',
         subText: 'text-purple-500'
      }
    };
    return maps[themeAccent] || maps.indigo;
  }, [themeAccent]);

  // ---------- USER PROFILE STATE ----------
  const [username, setUsername] = useState(() => localStorage.getItem('todo_user_name') || 'Productive Champ');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('todo_user_email') || 'hero@student.ceo');
  const [userAvatar, setUserAvatar] = useState(() => localStorage.getItem('todo_user_avatar') || '🚀');

  useEffect(() => {
    localStorage.setItem('todo_user_name', username);
    localStorage.setItem('todo_user_email', userEmail);
    localStorage.setItem('todo_user_avatar', userAvatar);
  }, [username, userEmail, userAvatar]);

  // ---------- TASKS STORAGE STATE ----------
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('todo_user_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    return [
      {
        id: 'task-1',
        title: 'Complete React Dashboard layouts',
        description: 'Verify color accents bind correctly on mobile screen viewports and trigger micro animations.',
        completed: false,
        priority: 'high',
        dueDate: todayStr,
        category: 'Work',
        subtasks: [
          { id: 'subtask-1-1', title: 'Verify responsive bottom tabs layout', completed: true },
          { id: 'subtask-1-2', title: 'Integrate SVG count down timer widget', completed: false },
          { id: 'subtask-1-3', title: 'Compile visual stickers grid', completed: false }
        ]
      },
      {
        id: 'task-2',
        title: 'Drink 3.5 Liters of pure hydration',
        description: 'Stay focused and highly energized throughout the sprint by staying crisp and healthy.',
        completed: true,
        priority: 'medium',
        dueDate: todayStr,
        category: 'Personal',
        subtasks: []
      },
      {
        id: 'task-3',
        title: 'Schedule project standup sync',
        description: 'Discuss database rules, state persistence triggers, and aesthetic design improvements.',
        completed: false,
        priority: 'medium',
        dueDate: tomorrowStr,
        category: 'Work',
        subtasks: []
      },
      {
        id: 'task-4',
        title: 'Stretching workout challenge',
        description: '15 minutes of dynamic yoga stretches to release muscular workspace fatigue.',
        completed: false,
        priority: 'low',
        dueDate: todayStr,
        category: 'Personal',
        subtasks: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('todo_user_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ---------- NOTES STORAGE STATE ----------
  const [folders, setFolders] = useState<string[]>(() => {
    const saved = localStorage.getItem('todo_nooter_folders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return ['All', 'Work', 'Personal', 'Ideas', 'Urgent'];
  });

  useEffect(() => {
    localStorage.setItem('todo_nooter_folders', JSON.stringify(folders));
  }, [folders]);

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('todo_user_notes');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return [
      {
        id: 'note-1',
        title: '💡 App Design Philosophy',
        content: 'We must build lightweight client applications with zero clutter. Focus heavily on layout rhythm - uneven padding, clean shadows, cozy light colors, and highly dynamic browser interactions.',
        folder: 'Ideas',
        color: 'purple',
        updatedAt: 'May 25, 2:32 PM',
        tags: ['Aesthetic', 'Visuals']
      },
      {
        id: 'note-2',
        title: '🛒 Grocery List Essentials',
        content: 'Organic sourdough wheat bread, ripe avocado fruit, organic milk carton, roasted almond slices, medium dark-roast coffee ground, and mountain clover raw honey.',
        folder: 'Personal',
        color: 'amber',
        updatedAt: 'May 24, 6:45 PM',
        tags: ['Home', 'Shopping']
      },
      {
        id: 'note-3',
        title: '📝 Standup Milestones list',
        content: 'Compile visual layouts, configure client-side LocalStorage databases, integrate retro sound chime oscillators, and fix TypeScript linter constraints gracefully.',
        folder: 'Work',
        color: 'sky',
        updatedAt: 'May 25, 9:20 AM',
        tags: ['Sprint', 'Work']
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('todo_user_notes', JSON.stringify(notes));
  }, [notes]);

  // ---------- TIMER STATES & LOGIC ----------
  const [customTimers, setCustomTimers] = useState<CustomTimer[]>(() => {
    const saved = localStorage.getItem('todo_custom_timers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 't1', name: 'Pomodoro Focus', minutes: 25, seconds: 0, color: 'indigo' },
      { id: 't2', name: 'Short Break', minutes: 5, seconds: 0, color: 'emerald' },
      { id: 't3', name: 'Long Break', minutes: 15, seconds: 0, color: 'sky' },
      { id: 't4', name: 'Power Hour Sprint', minutes: 45, seconds: 0, color: 'purple' },
      { id: 't5', name: 'One-Minute Breathing', minutes: 1, seconds: 0, color: 'amber' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('todo_custom_timers', JSON.stringify(customTimers));
  }, [customTimers]);

  const [activeTimerId, setActiveTimerId] = useState<string | null>('t1');
  const [timerDisplayName, setTimerDisplayName] = useState<string>('Pomodoro Focus');
  const [timerSecondsRemaining, setTimerSecondsRemaining] = useState<number>(25 * 60);
  const [timerTotalDuration, setTimerTotalDuration] = useState<number>(25 * 60);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
  const [timerColor, setTimerColor] = useState<'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple'>('indigo');

  // Chime settings
  const [timerSoundEnabled, setTimerSoundEnabled] = useState<boolean>(true);
  const [timerNotificationEnabled, setTimerNotificationEnabled] = useState<boolean>(false);

  // Finished timer overlay
  const [finishedTimer, setFinishedTimer] = useState<{ name: string; duration: number } | null>(null);

  // New Custom Timer state
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerMin, setNewTimerMin] = useState<number>(25);
  const [newTimerSec, setNewTimerSec] = useState<number>(0);
  const [newTimerColor, setNewTimerColor] = useState<'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple'>('indigo');

  const playCompletionSound = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const audioCtx = new AudioCtxClass();
      const playTone = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      
      const now = audioCtx.currentTime;
      // Arpeggio chord sweet C major sweep (C5 -> E5 -> G5 -> C6)
      playTone(523.25, now, 0.45);
      playTone(659.25, now + 0.15, 0.45);
      playTone(783.99, now + 0.3, 0.45);
      playTone(1046.50, now + 0.45, 0.75);
    } catch (error) {
      console.warn("Web Audio chime play initialized blocked by browser permissions.", error);
    }
  };

  const triggerBrowserNotification = (title: string, body: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification(title, { body });
        } catch (e) {
          console.error("Native push error", e);
        }
      }
    }
  };

  const requestNotificationPermission = () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        setTimerNotificationEnabled(permission === 'granted');
        if (permission === 'granted') {
          triggerBrowserNotification("Alert Enabled", "Focus intervals will alert you instantly!");
        }
      });
    } else {
      alert("In-App notifications are active. Native push permission requires browser support.");
    }
  };

  // Timer Countdown dynamic ticker hook
  useEffect(() => {
    let intervalId: any = null;
    if (timerIsRunning && timerSecondsRemaining > 0) {
      intervalId = setInterval(() => {
        setTimerSecondsRemaining((prev: number) => {
          if (prev <= 1) {
            setTimerIsRunning(false);
            
            if (timerSoundEnabled) {
              playCompletionSound();
            }
            if (timerNotificationEnabled) {
              triggerBrowserNotification("Focus Finished!", `"${timerDisplayName}" has ended! Excellent work.`);
            }
            
            setFinishedTimer({
              name: timerDisplayName,
              duration: timerTotalDuration
            });
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerIsRunning, timerSecondsRemaining, timerSoundEnabled, timerNotificationEnabled, timerDisplayName, timerTotalDuration]);

  // Handle active preset selection
  const handleSelectTimer = (timer: CustomTimer) => {
    setTimerIsRunning(false);
    setActiveTimerId(timer.id);
    setTimerDisplayName(timer.name);
    const secs = (timer.minutes * 60) + timer.seconds;
    setTimerSecondsRemaining(secs);
    setTimerTotalDuration(secs);
    setTimerColor(timer.color);
  };

  // Handle deleting timer
  const handleDeleteTimer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomTimers((prev: CustomTimer[]) => prev.filter((t: CustomTimer) => t.id !== id));
    if (activeTimerId === id) {
      setActiveTimerId(null);
    }
  };

  // Handle creating custom timer
  const handleCreateTimer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimerName.trim()) return;

    const totalSec = (Number(newTimerMin) * 60) + Number(newTimerSec);
    if (totalSec <= 0) {
      alert("Please specify a duration of 1 second or more.");
      return;
    }

    const newTimer: CustomTimer = {
      id: `timer-${Date.now()}-${Math.random()}`,
      name: newTimerName.trim(),
      minutes: Number(newTimerMin),
      seconds: Number(newTimerSec),
      color: newTimerColor
    };

    setCustomTimers((prev: CustomTimer[]) => [...prev, newTimer]);
    handleSelectTimer(newTimer);

    // Reset composer
    setNewTimerName('');
    setNewTimerMin(25);
    setNewTimerSec(0);
    setNewTimerColor('indigo');
  };

  // ---------- AI COPILOT LOGICAL ACTIONS & SEND HANDLERS ----------
  const handleExecuteAiActions = (actions: Array<{ type: string, data: any }>) => {
    actions.forEach(action => {
      try {
        if (action.type === 'createTask') {
          const d = action.data;
          const subList: Subtask[] = [];
          if (Array.isArray(d.subtasks)) {
            d.subtasks.forEach((stTitle: string, idx: number) => {
              subList.push({
                id: `subtask-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
                title: stTitle,
                completed: false
              });
            });
          }
          const newTask: Task = {
            id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            title: d.title || "Untitled AI Task",
            description: d.description || "Automatically drafted via AI Copilot.",
            completed: false,
            priority: d.priority || "medium",
            dueDate: d.dueDate || new Date().toISOString().split('T')[0],
            category: d.category || "Work",
            subtasks: subList
          };
          setTasks((prev: Task[]) => [newTask, ...prev]);
          
        } else if (action.type === 'createNote') {
          const d = action.data;
          const parsedTags = Array.isArray(d.tags) ? d.tags : d.tags ? [d.tags] : [];
          const nowStr = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          const newNote: Note = {
            id: `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            title: d.title || "Untitled AI Note",
            content: d.content || "Draft content...",
            folder: d.folder || "Ideas",
            color: d.color || "slate",
            updatedAt: nowStr,
            tags: parsedTags
          };
          setNotes((prev: Note[]) => [newNote, ...prev]);

        } else if (action.type === 'createFolder') {
          const d = action.data;
          const folderClean = d.name?.trim();
          if (folderClean) {
            setFolders((prev: string[]) => {
              if (prev.map(f => f.toLowerCase()).includes(folderClean.toLowerCase())) {
                return prev;
              }
              return [...prev, folderClean];
            });
          }

        } else if (action.type === 'createTimer') {
          const d = action.data;
          const newTimer: CustomTimer = {
            id: `t-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: d.name || "AI Timer",
            minutes: Number(d.minutes) || 25,
            seconds: Number(d.seconds) || 0,
            color: d.color || "indigo"
          };
          setCustomTimers((prev: CustomTimer[]) => [...prev, newTimer]);
        }
      } catch (err) {
        console.error("Failed to execute AI action", action, err);
      }
    });
  };

  const handleSendAiMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = aiInputText.trim();
    if (!prompt || isAiLoading) return;

    const newUserMessage = { role: 'user' as const, text: prompt };
    const updatedHistory = [...aiMessages, newUserMessage];
    setAiMessages(updatedHistory);
    setAiInputText('');
    setIsAiLoading(true);
    setAiFeedback(null);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: updatedHistory })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Communication failure.");
      }

      setAiMessages(prev => [...prev, { role: 'assistant', text: data.text }]);

      if (data.actions && data.actions.length > 0) {
        handleExecuteAiActions(data.actions);
        const actionCount = data.actions.length;
        setAiFeedback(`Executed ${actionCount} automated workspace action${actionCount > 1 ? 's' : ''}!`);
        playCompletionSound();
      }
    } catch (err: any) {
      console.error("AI Assistant error:", err);
      setAiMessages(prev => [...prev, { 
        role: 'assistant', 
        text: err.message || "Failed to communicate with AI server. Please check your setup and try again.",
        error: true
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // ---------- DASHBOARD TAB STATES & FILTERS ----------
  const [taskCategoryFilter, setTaskCategoryFilter] = useState<string>('All');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<string>('All');
  const [taskSearchQuery, setTaskSearchQuery] = useState<string>('');
  
  // Create New Task Composer inline
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Work');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newTaskDate, setNewTaskDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newTaskSubtasksRaw, setNewTaskSubtasksRaw] = useState<string>('');

  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [modalSubtaskText, setModalSubtaskText] = useState('');

  // Extract list of all unique categories from current tasks
  const taskCategories = useMemo(() => {
    const list = new Set<string>();
    tasks.forEach(t => {
      if (t.category) list.add(t.category);
    });
    return ['All', ...Array.from(list)];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchCat = taskCategoryFilter === 'All' || t.category === taskCategoryFilter;
      const matchPrio = taskPriorityFilter === 'All' || t.priority === taskPriorityFilter;
      const matchSearch = t.title.toLowerCase().includes(taskSearchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(taskSearchQuery.toLowerCase());
      return matchCat && matchPrio && matchSearch;
    });
  }, [tasks, taskCategoryFilter, taskPriorityFilter, taskSearchQuery]);

  // Stats calculation
  const completedTaskCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);
  const completionRatio = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedTaskCount / tasks.length) * 100);
  }, [tasks, completedTaskCount]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    // Parse subtasks separated by commas
    const subList: Subtask[] = [];
    if (newTaskSubtasksRaw.trim()) {
      newTaskSubtasksRaw.split(',').forEach((sub, index) => {
        const titleClean = sub.trim();
        if (titleClean) {
          subList.push({
            id: `subtask-${Date.now()}-${index}`,
            title: titleClean,
            completed: false
          });
        }
      });
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: 'Quickly logged via primary composer.',
      completed: false,
      priority: newTaskPriority,
      dueDate: newTaskDate,
      category: newTaskCategory.trim(),
      subtasks: subList
    };

    setTasks((prev: Task[]) => [newTask, ...prev]);

    // reset forms
    setNewTaskTitle('');
    setNewTaskSubtasksRaw('');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev: Task[]) => 
      prev.map((t: Task) => t.id === taskId ? { ...t, completed: !t.completed } : t)
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev: Task[]) => prev.filter((t: Task) => t.id !== taskId));
    if (viewingTask?.id === taskId) {
      setViewingTask(null);
    }
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev: Task[]) => 
      prev.map((t: Task) => {
        if (t.id === taskId) {
          const updatedSubs = t.subtasks.map((st: Subtask) => 
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          const updatedTask = { ...t, subtasks: updatedSubs };
          
          if (viewingTask && viewingTask.id === taskId) {
            setViewingTask(updatedTask);
          }
          return updatedTask;
        }
        return t;
      })
    );
  };

  const handleAddSubtaskModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingTask || !modalSubtaskText.trim()) return;

    const newSub: Subtask = {
      id: `subtask-${Date.now()}`,
      title: modalSubtaskText.trim(),
      completed: false
    };

    setTasks((prev: Task[]) => 
      prev.map((t: Task) => {
        if (t.id === viewingTask.id) {
          const updatedSubs = [...t.subtasks, newSub];
          const updatedTask = { ...t, subtasks: updatedSubs };
          setViewingTask(updatedTask);
          return updatedTask;
        }
        return t;
      })
    );
    setModalSubtaskText('');
  };

  // ---------- NOOTER (STICKY NOTES) TAB STATES ----------
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [noteSearchQuery, setNoteSearchQuery] = useState<string>('');
  const [selectedNoteTag, setSelectedNoteTag] = useState<string>('All');

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteFolder, setNewNoteFolder] = useState('Ideas');
  const [newNoteColor, setNewNoteColor] = useState('yellow');
  const [newNoteTagsRaw, setNewNoteTagsRaw] = useState('');
  
  // Custom folder composer
  const [newFolderInput, setNewFolderInput] = useState('');
  
  // Inspecting Note Detail modal
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [editNoteFolder, setEditNoteFolder] = useState('Ideas');
  const [editNoteColor, setEditNoteColor] = useState('slate');
  const [editNoteTags, setEditNoteTags] = useState<string[]>([]);
  const [newTagInputValue, setNewTagInputValue] = useState('');

  const handleSelectNoteForViewing = (note: Note) => {
    setViewingNote(note);
    setIsEditingNote(false);
    setEditNoteTitle(note.title);
    setEditNoteContent(note.content);
    setEditNoteFolder(note.folder);
    setEditNoteColor(note.color);
    setEditNoteTags(note.tags || []);
    setNewTagInputValue('');
  };

  const handleRemoveEditTag = (tagToRemove: string) => {
    setEditNoteTags(prev => prev.filter(t => t !== tagToRemove));
  };

  const handleAddEditTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const t = newTagInputValue.trim().toLowerCase();
    if (t && !editNoteTags.includes(t)) {
      setEditNoteTags(prev => [...prev, t]);
    }
    setNewTagInputValue('');
  };

  const handleSaveNoteEdit = () => {
    if (!viewingNote) return;
    if (!editNoteTitle.trim()) return;

    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const updatedNote: Note = {
      ...viewingNote,
      title: editNoteTitle.trim(),
      content: editNoteContent.trim() || 'No content.',
      folder: editNoteFolder,
      color: editNoteColor,
      tags: editNoteTags.map(t => t.trim()).filter(t => t.length > 0),
      updatedAt: nowStr
    };

    setNotes((prev: Note[]) => prev.map((n: Note) => n.id === viewingNote.id ? updatedNote : n));
    setViewingNote(updatedNote);
    setIsEditingNote(false);
    playCompletionSound();
  };

  // Extract all unique tags list
  const noteTags = useMemo(() => {
    const list = new Set<string>();
    notes.forEach(n => {
      if (n.tags) {
        n.tags.forEach(tg => list.add(tg));
      }
    });
    return ['All', ...Array.from(list)];
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchFolder = selectedFolder === 'All' || n.folder === selectedFolder;
      const matchTag = selectedNoteTag === 'All' || (n.tags && n.tags.includes(selectedNoteTag));
      const matchSearch = n.title.toLowerCase().includes(noteSearchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(noteSearchQuery.toLowerCase());
      return matchFolder && matchTag && matchSearch;
    });
  }, [notes, selectedFolder, selectedNoteTag, noteSearchQuery]);

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const parsedTags = newNoteTagsRaw.split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim() || 'No description summary.',
      folder: newNoteFolder,
      color: newNoteColor,
      updatedAt: nowStr,
      tags: parsedTags
    };

    setNotes((prev: Note[]) => [newNote, ...prev]);

    // reset forms
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTagsRaw('');
  };

  const handleDeleteNote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotes((prev: Note[]) => prev.filter((n: Note) => n.id !== id));
    if (viewingNote?.id === id) {
      setViewingNote(null);
    }
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    const folderClean = newFolderInput.trim();
    if (!folderClean) return;
    if (folders.map(f => f.toLowerCase()).includes(folderClean.toLowerCase())) {
      alert("Folder already exists.");
      return;
    }
    setFolders((prev: string[]) => [...prev, folderClean]);
    setNewFolderInput('');
    setSelectedFolder(folderClean);
  };


  // ---------- CALENDAR TAB STATES & LOGIC ----------
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth()); // 0-indexed
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  const monthsList = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentMonth((prev: number) => {
      if (prev === 0) {
        setCurrentYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev: number) => {
      if (prev === 11) {
        setCurrentYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Monthly dates computer
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const cells: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];
    
    // Previous month filler days
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const day = prevMonthDays - i;
      const dStr = `${prevYear}-${(prevMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      cells.push({ dateStr: dStr, dayNum: day, isCurrentMonth: false });
    }

    // Active month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      cells.push({ dateStr: dStr, dayNum: day, isCurrentMonth: true });
    }

    // Next month filler days
    const remainingSlots = 42 - cells.length; // We match 6 rows setup (42 cells)
    for (let i = 1; i <= remainingSlots; i++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dStr = `${nextYear}-${(nextMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      cells.push({ dateStr: dStr, dayNum: i, isCurrentMonth: false });
    }

    return cells;
  }, [currentYear, currentMonth]);

  // Calendar dates with indicators
  const tasksDueOnDateSelected = useMemo(() => {
    return tasks.filter(t => t.dueDate === selectedCalendarDate);
  }, [tasks, selectedCalendarDate]);

  // Quick stats computed helper
  const notesByFolderCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    notes.forEach(n => {
      counts[n.folder] = (counts[n.folder] || 0) + 1;
    });
    return counts;
  }, [notes]);


  // ---------- QUICK PRESET INJECTOR FOR DEV ----------
  const handleInjectedTestData = () => {
    // Inject clean sample events and custom metrics 
    const todayStr = new Date().toISOString().split('T')[0];
    const testTasks: Task[] = [
      {
        id: `inject-${Date.now()}-1`,
        title: '🔥 Complete final project presentation slides',
        description: 'Prepare beautiful graphics, metrics charts, and highlight user-experience milestones.',
        completed: false,
        priority: 'high',
        dueDate: todayStr,
        category: 'Work',
        subtasks: []
      },
      {
        id: `inject-${Date.now()}-2`,
        title: '🥦 Drink green smoothie',
        description: 'Kale, spinach, kiwi, fresh ginger roots, chia seeds, and filtered coconut water.',
        completed: true,
        priority: 'low',
        dueDate: todayStr,
        category: 'Personal',
        subtasks: []
      }
    ];

    setTasks((prev: Task[]) => [...testTasks, ...prev]);
    alert("Sample testing chores successfully injected!");
  };

  const handleClearEverything = () => {
    if (window.confirm("Are you sure you want to flush all custom tasks, persistent session timer configurations, and notes sticky pads back to default presets?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      {/* Visual Workspace Container Frame */}
      <div className="max-w-md mx-auto bg-white dark:bg-slate-950 min-h-screen relative flex flex-col shadow-2xl border-x border-slate-100 dark:border-slate-800 pb-24">
        
        {/* TOP STATUS HEADER BAR */}
        <header className="px-5 pt-6 pb-4 border-b border-rose-50/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-lg shadow-sm hover:scale-115 transition-transform duration-200 cursor-pointer`}>
              {userAvatar}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-mono">CEO WORKSPACE</p>
              <h1 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-1">
                {username}
                <Sparkles className={`w-3.5 h-3.5 ${accentClasses.text} animate-pulse`} />
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick status dots */}
            <div className="flex flex-col items-end">
              <span className={`text-[10px] font-black uppercase tracking-widest ${accentClasses.text}`}>
                {completionRatio}% Tasks Done
              </span>
              <span className="text-[9px] text-slate-400 font-mono font-medium">Local Saved data</span>
            </div>
          </div>
        </header>

        {/* CONTAINER VIEWPORTS PORTALS */}
        <main className="p-4 flex-1 overflow-y-auto space-y-4">
          
          {/* ========================================================= */}
          {/*                     DASHBOARD TAB                         */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div id="dashboard-tab-panel" className="space-y-4 animate-fadeIn">
              
              {/* Dynamic Welcome & Completion Progress */}
              <div className="bg-slate-50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Daily focus statistics</span>
                  <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-mono font-extrabold flex items-center gap-0.5 bg-indigo-500/10 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3" /> Today
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                  You resolved <strong className={`font-black ${accentClasses.text}`}>{completedTaskCount}</strong> out of {tasks.length} total active objectives.
                </h2>
                
                {/* Slim progress bar indicator */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-semibold uppercase">Daily Streak Status</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{completionRatio}%</span>
                  </div>
                  <div className="w-full bg-slate-200/50 dark:bg-slate-800/70 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${accentClasses.bg}`} 
                      style={{ width: `${completionRatio}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Grid Mini-stats Panels */}
              <div className="grid grid-cols-2 gap-3" id="stats-grid">
                <div 
                  className="bg-slate-50 dark:bg-slate-800/20 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-all flex items-center justify-between"
                  onClick={() => setActiveTab('nooter')}
                >
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Notes Written</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{notes.length}</p>
                  </div>
                  <BookOpen className="w-5 h-5 text-indigo-505 dark:text-indigo-400" />
                </div>

                <div 
                  className="bg-slate-50 dark:bg-slate-800/20 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-all flex items-center justify-between"
                  onClick={() => setActiveTab('timer')}
                >
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Timer Focus</p>
                    <p className="text-xl font-bold text-slate-850 dark:text-slate-100">
                      {Math.floor(timerTotalDuration / 60)}m
                    </p>
                  </div>
                  <Timer className="w-5 h-5 text-emerald-505 dark:text-emerald-400" />
                </div>
              </div>

              {/* AI Copilot Widget Banner Card */}
              <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-5 rounded-3xl text-left border border-indigo-500/10 shadow-lg relative overflow-hidden space-y-3">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/25 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center space-x-2">
                  <div className="bg-indigo-500/20 p-1.5 rounded-lg text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Workspace AI Copilot</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white">Automate Your Task Setup</h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                    Chat with our smart backend agent to quickly log complex checklists, events, tags, and workspace timers on the fly!
                  </p>
                </div>
                <button 
                  onClick={() => setIsAiModalOpen(true)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-bold text-xs text-white py-2.5 rounded-2xl flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Launch Chatbot Copilot
                </button>
              </div>

              {/* Inline Quick Add Task Module Form */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Quick-Add Objectives</h3>
                <form onSubmit={handleAddTask} className="space-y-2">
                  <div className="flex gap-2">
                    <input 
                      id="quick-task-title-input"
                      type="text" 
                      required
                      placeholder="e.g. Brainstorm team assets, buy gym juice..."
                      value={newTaskTitle}
                      onChange={e => setNewTaskTitle(e.target.value)}
                      className="flex-1 bg-white dark:bg-slate-900 text-xs px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button 
                      type="submit" 
                      className={`px-3 py-2 text-white rounded-xl flex items-center justify-center ${accentClasses.bg} transition-all active:scale-95`}
                      title="Add task objective"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Auxiliary Options Row */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Category</label>
                      <input 
                        type="text" 
                        placeholder="Work, Personal, etc." 
                        value={newTaskCategory}
                        onChange={e => setNewTaskCategory(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Subtasks (commas separated)</label>
                      <input 
                        type="text" 
                        placeholder="Step A, Step B..." 
                        value={newTaskSubtasksRaw}
                        onChange={e => setNewTaskSubtasksRaw(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-slate-800 dark:text-slate-202"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100/50">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 font-bold">Priority:</span>
                      {(['low', 'medium', 'high'] as const).map(prio => (
                        <button
                          key={prio}
                          type="button"
                          onClick={() => setNewTaskPriority(prio)}
                          className={`px-2 py-0.5 rounded uppercase font-extrabold tracking-wider ${
                            newTaskPriority === prio 
                              ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' 
                              : 'bg-slate-200/50 text-slate-500 dark:bg-slate-800/50'
                          }`}
                        >
                          {prio}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-1">
                      <span className="text-slate-400 font-bold">Due:</span>
                      <input 
                        type="date"
                        value={newTaskDate}
                        onChange={e => setNewTaskDate(e.target.value)}
                        className="bg-transparent border-none text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-none font-bold font-mono text-[10px]"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Tasks Filters HUD */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <ClipboardList className="w-3.5 h-3.5" />
                    Tasks List ({filteredTasks.length})
                  </h3>

                  {/* Simple text search input */}
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Search tasks..."
                      value={taskSearchQuery}
                      onChange={e => setTaskSearchQuery(e.target.value)}
                      className="pl-6 pr-2 py-0.5 max-w-28 text-[11px] bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 border-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <Search className="w-3 h-3 text-slate-450 absolute left-2 top-1.5" />
                  </div>
                </div>

                {/* Filter chip tabs */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[10px]">
                  {taskCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTaskCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-xl font-bold truncate ${
                        taskCategoryFilter === cat 
                          ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' 
                          : 'bg-slate-150/80 text-slate-505 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200/50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 flex-shrink-0" />
                  {['All', 'high', 'medium', 'low'].map(prio => (
                    <button
                      key={prio}
                      type="button"
                      onClick={() => setTaskPriorityFilter(prio)}
                      className={`px-3 py-1 rounded-xl font-bold uppercase tracking-wider ${
                        taskPriorityFilter === prio 
                          ? 'bg-indigo-50 font-black text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400'
                          : 'bg-slate-150/80 text-slate-505 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200/50'
                      }`}
                    >
                      {prio}
                    </button>
                  ))}
                </div>

                {/* Tasks loop iterator list */}
                <div className="space-y-2.5 max-h-[28rem] overflow-y-auto pr-0.5">
                  {filteredTasks.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-2">
                      <Smile className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-450 italic font-medium">No tasks match your filters. Great time to list fresh plans!</p>
                    </div>
                  ) : (
                    filteredTasks.map(task => {
                      const completedSubs = task.subtasks?.filter(s => s.completed).length || 0;
                      const hasSubs = task.subtasks && task.subtasks.length > 0;
                      
                      return (
                        <div 
                          key={task.id}
                          className={`p-3.5 rounded-2xl border transition-all ${
                            task.completed 
                              ? 'bg-slate-50/50 dark:bg-slate-850/40 border-slate-100 dark:border-slate-900/40 opacity-70' 
                              : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800/80 shadow-xs hover:shadow-xs'
                          } hover:border-slate-300 dark:hover:border-slate-705 flex flex-col space-y-2`}
                        >
                          {/* Inner Row info */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start space-x-3 min-w-0">
                              <button 
                                type="button" 
                                onClick={() => handleToggleTask(task.id)}
                                className="mt-0.5 text-slate-400 hover:text-indigo-650 transition-colors"
                              >
                                {task.completed ? (
                                  <CheckSquare className={`w-5 h-5 ${accentClasses.text}`} />
                                ) : (
                                  <Square className="w-5 h-5" />
                                )}
                              </button>
                              
                              <div className="min-w-0" onClick={() => setViewingTask(task)}>
                                <h4 className={`text-xs font-black cursor-pointer leading-tight truncate ${
                                  task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'
                                }`}>
                                  {task.title}
                                </h4>
                                
                                <div className="flex items-center space-x-2 mt-1.5 flex-wrap gap-y-1">
                                  {/* Priority indicator flag */}
                                  <span className={`text-[8px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded ${
                                    task.priority === 'high' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-450' :
                                    task.priority === 'medium' ? 'bg-amber-50 text-amber-805 dark:bg-amber-950/40 dark:text-amber-450' :
                                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                  }`}>
                                    {task.priority}
                                  </span>

                                  {/* Category label */}
                                  {task.category && (
                                    <span className="text-[9px] text-slate-400 font-mono font-medium truncate max-w-20">
                                      📁 {task.category}
                                    </span>
                                  )}

                                  {/* Date marker */}
                                  <span className="text-[9px] text-slate-400 font-mono font-medium">
                                    📅 {task.dueDate}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Options Row */}
                            <div className="flex items-center space-x-1.5 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => setViewingTask(task)}
                                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                title="Expand subtasks checklist"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-1 text-slate-400 hover:text-rose-550 transition-colors"
                                title="Delete objective"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Interactive Subtask status indicator block */}
                          {hasSubs && (
                            <div className="pt-2 border-t border-slate-100/60 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                              <span>Checklist Step Progress</span>
                              <span className="font-mono font-bold text-slate-600 dark:text-slate-350">{completedSubs}/{task.subtasks.length} Done</span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/*                     NOOTER (STICKY NOTES) TAB             */}
          {/* ========================================================= */}
          {activeTab === 'nooter' && (
            <div id="nooter-tab-panel" className="space-y-4 animate-fadeIn">
              
              {/* Folder Selector Sidebar Scroll horizontal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase font-black text-slate-400 dark:text-slate-500 tracking-widest flex items-center gap-1">
                    <Folder className="w-3.5 h-3.5" />
                    Notebook Folders
                  </span>
                  
                  {/* Inline folder adder */}
                  <form onSubmit={handleCreateFolder} className="flex gap-1.5">
                    <input 
                      type="text"
                      placeholder="New binder..."
                      value={newFolderInput}
                      onChange={e => setNewFolderInput(e.target.value)}
                      className="bg-slate-100 dark:bg-slate-800 text-[10px] px-2 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-24 text-slate-800 dark:text-slate-100"
                    />
                    <button 
                      type="submit" 
                      className={`text-[10px] text-white px-2 py-0.5 rounded ${accentClasses.bg}`}
                      title="Add folder container"
                    >
                      Add
                    </button>
                  </form>
                </div>

                {/* Horizontal scroll lists */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-[11px]">
                  {['All', ...folders.filter(f => f !== 'All')].map(fold => {
                    const isSelected = selectedFolder === fold;
                    const count = notesByFolderCounts[fold] || (fold === 'All' ? notes.length : 0);
                    
                    return (
                      <button
                        key={fold}
                        type="button"
                        onClick={() => setSelectedFolder(fold)}
                        className={`px-3 py-1.5 rounded-xl font-bold flex-shrink-0 flex items-center gap-1.5 transition-all ${
                          isSelected 
                            ? 'bg-slate-800 text-white dark:bg-indigo-650 dark:text-indigo-50 shadow-sm' 
                            : 'bg-white/40 dark:bg-slate-800/40 text-slate-500 hover:bg-white dark:hover:bg-slate-800 border border-slate-205 dark:border-transparent'
                        }`}
                      >
                        {fold}
                        <span className={`text-[9px] px-1 rounded-sm ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Note Search Hud Grid Filter */}
              <div className="bg-slate-50 dark:bg-slate-800/10 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search sticky note contents..."
                    value={noteSearchQuery}
                    onChange={e => setNoteSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-450 absolute left-2.5 top-2.5" />
                </div>

                {/* Note tag filtering chips */}
                <div className="flex items-center space-x-1.5 overflow-x-auto text-[9px] pb-1">
                  <span className="text-slate-400 uppercase font-black tracking-wide shrink-0">Tags filter:</span>
                  {noteTags.map(tg => (
                    <button
                      key={tg}
                      type="button"
                      onClick={() => setSelectedNoteTag(tg)}
                      className={`px-2 py-0.5 rounded font-extrabold ${
                        selectedNoteTag === tg 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white dark:bg-slate-900 text-slate-450 border border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      {tg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sticky Note Grid Cards Visualizer */}
              <div className="space-y-1">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Sticky Notebook Pages ({filteredNotes.length})
                </h3>

                <div className="grid grid-cols-2 gap-3" id="sticky-notes-grid">
                  {filteredNotes.length === 0 ? (
                    <div className="col-span-2 p-8 text-center bg-slate-50 dark:bg-slate-850 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-450 italic">No notepad pages match. Add a sticky note below!</p>
                    </div>
                  ) : (
                    filteredNotes.map(note => {
                      // Custom pastel color overrides
                      const bgStyle = 
                        note.color === 'amber' ? 'bg-amber-100 text-amber-950 border-amber-200/60' :
                        note.color === 'sky' ? 'bg-sky-100 text-sky-950 border-sky-200/60' :
                        note.color === 'rose' ? 'bg-rose-100 text-rose-950 border-rose-200/60' :
                        note.color === 'emerald' ? 'bg-emerald-100 text-emerald-950 border-emerald-200/60' :
                        note.color === 'purple' ? 'bg-purple-100 text-purple-950 border-purple-200/60' :
                        'bg-slate-50 text-slate-850 dark:bg-slate-800 dark:text-slate-100 border-slate-150';

                      return (
                        <div
                          key={note.id}
                          onClick={() => handleSelectNoteForViewing(note)}
                          className={`p-4 rounded-3xl border shadow-xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between h-40 relative ${bgStyle}`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1.5 mb-1">
                              <h4 className="text-xs font-black truncate max-w-28 text-slate-900 dark:text-slate-200">
                                {note.title}
                              </h4>
                              <button
                                type="button"
                                onClick={(e) => handleDeleteNote(note.id, e)}
                                className="text-rose-600 hover:text-rose-900 bg-white/40 hover:bg-white/80 p-1 rounded-lg transition-colors"
                                title="Trash sticky"
                              >
                                <Trash className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-[11px] line-clamp-4 leading-normal opacity-85 font-mono">
                              {note.content}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[8px] opacity-75 font-mono pt-2 border-t border-black/5 dark:border-white/5">
                            <span className="truncate max-w-20 font-bold uppercase tracking-wider">📁 {note.folder}</span>
                            <span>{note.updatedAt}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Advanced Note Composer Sticky Pad Form */}
              <div className="bg-slate-50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3.5">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Draft New Sticky Note</h3>
                <form onSubmit={handleCreateNote} className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      id="new-note-title-input"
                      type="text"
                      required
                      placeholder="Note Title *..."
                      value={newNoteTitle}
                      onChange={e => setNewNoteTitle(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none"
                    />

                    <select
                      value={newNoteFolder}
                      onChange={e => setNewNoteFolder(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      {folders.filter(f => f !== 'All').map(fold => (
                        <option key={fold} value={fold}>{fold}</option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    id="new-note-content-input"
                    rows={3}
                    placeholder="Enter thoughts, metrics, schedule details, standup items..."
                    value={newNoteContent}
                    onChange={e => setNewNoteContent(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl p-2.5 text-slate-800 dark:text-slate-200 focus:outline-none"
                  />

                  {/* Note specs color select & tag log */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] text-slate-400 font-bold">Paper Color:</span>
                        <div className="flex items-center space-x-1">
                          {(['amber', 'sky', 'rose', 'emerald', 'purple', 'slate'] as const).map(col => (
                            <button
                              key={col}
                              type="button"
                              onClick={() => setNewNoteColor(col)}
                              className={`w-4 h-4 rounded-full border border-black/10 transition-transform ${
                                newNoteColor === col ? 'scale-125 ring-1 ring-slate-805' : 'hover:scale-110'
                              } ${
                                col === 'amber' ? 'bg-amber-100' :
                                col === 'sky' ? 'bg-sky-100' :
                                col === 'rose' ? 'bg-rose-100' :
                                col === 'emerald' ? 'bg-emerald-100' :
                                col === 'purple' ? 'bg-purple-100' :
                                'bg-slate-100'
                              }`}
                              title={col}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] text-slate-400 font-bold shrink-0">Tags (commas):</span>
                        <input
                          type="text"
                          placeholder="ideas, daily..."
                          value={newNoteTagsRaw}
                          onChange={e => setNewNoteTagsRaw(e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded px-1.5 py-0.5 text-[9px] max-w-24 text-slate-800 dark:text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      id="save-new-note-btn"
                      type="submit"
                      className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold font-mono text-[11px] uppercase tracking-wider transition-all shadow-xs"
                    >
                      Stick Note to Board
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/*                     CALENDAR TAB                          */}
          {/* ========================================================= */}
          {activeTab === 'calendar' && (
            <div id="calendar-tab-panel" className="space-y-4 animate-fadeIn">
              
              {/* Month HUD controller header */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl flex items-center justify-between">
                <button
                  id="calendar-prev-month"
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 px-2 hover:bg-slate-200/50 dark:hover:bg-slate-850 rounded-lg transition-colors text-slate-650"
                  title="Previous Month"
                >
                  <ArrowLeft className="w-5 h-5 mx-auto" />
                </button>
                <div className="text-center">
                  <h3 className="text-base font-black text-slate-805 dark:text-slate-100 tracking-tight leading-none uppercase">
                    {monthsList[currentMonth]} {currentYear}
                  </h3>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 block">Plotting chore deadlines / note revisions</span>
                </div>
                <button
                  id="calendar-next-month"
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 px-2 hover:bg-slate-200/50 dark:hover:bg-slate-850 rounded-lg transition-colors text-slate-650"
                  title="Next Month"
                >
                  <ArrowRight className="w-5 h-5 mx-auto" />
                </button>
              </div>

              {/* Days Grid header label */}
              <div className="grid grid-cols-7 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/10 p-2 rounded-xl">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Month dates matching grid (7 columns * 6 rows) */}
              <div className="grid grid-cols-7 gap-1" id="calendar-dates-grid">
                {calendarDays.map((cell, idx) => {
                  const tasksForDay = tasks.filter(t => t.dueDate === cell.dateStr);
                  const hasTasks = tasksForDay.length > 0;
                  const isSelected = selectedCalendarDate === cell.dateStr;

                  // Date styles
                  let dateClass = "bg-white/40 dark:bg-slate-900/40 text-slate-400 border-transparent";
                  if (cell.isCurrentMonth) {
                    if (isSelected) {
                      dateClass = "bg-slate-800 text-white dark:bg-indigo-650 dark:text-indigo-50 border-slate-800 font-extrabold";
                    } else {
                      dateClass = "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-100 dark:border-slate-800/80";
                    }
                  }

                  return (
                    <div
                      key={cell.dateStr + '-' + idx}
                      onClick={() => setSelectedCalendarDate(cell.dateStr)}
                      className={`h-11 rounded-xl border flex flex-col justify-between p-1 cursor-pointer transition-all hover:scale-[1.05] relative select-none ${dateClass}`}
                    >
                      <span className="text-[10px] font-semibold">{cell.dayNum}</span>
                      
                      {/* indicator dots row */}
                      {hasTasks && (
                        <div className="flex justify-center space-x-0.5">
                          {tasksForDay.map((t, tIdx) => (
                            <span 
                              key={t.id + '-' + tIdx} 
                              className={`w-1 h-1 rounded-full ${t.completed ? 'bg-emerald-400' : 'bg-rose-500'}`} 
                              title={t.title}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Date Inspection auxiliary Tray Drawer */}
              <div className="bg-slate-50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className={`w-4 h-4 ${accentClasses.text}`} />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-450">
                      Deadlines inspection
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-405 dark:text-slate-350 font-mono font-bold">
                    📅 {selectedCalendarDate}
                  </span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-0.5">
                  {tasksDueOnDateSelected.length === 0 ? (
                    <p className="text-xs text-slate-450 italic text-center py-5">
                      No matching tasks due on this date. Use the Dashboard to set deadlines!
                    </p>
                  ) : (
                    tasksDueOnDateSelected.map(task => (
                      <div 
                        key={task.id}
                        onClick={() => setViewingTask(task)}
                        className="p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-400/50 text-xs gap-3"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            task.completed ? 'bg-emerald-500' : 'bg-rose-500'
                          }`} />
                          <span className={`font-semibold truncate max-w-44 ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            {task.title}
                          </span>
                        </div>
                        <span className="text-[9px] uppercase font-black bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded flex-shrink-0">
                          {task.priority}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/*                     TIMER TAB                             */}
          {/* ========================================================= */}
          {activeTab === 'timer' && (
            <div id="timer-tab-panel" className="space-y-4 animate-fadeIn">
              
              {/* Active Timer Display Card */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-center space-y-1 mb-2 z-10 w-full">
                  <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest inline-block mb-1">
                    🎯 Active Focus Session
                  </span>
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-200 truncate max-w-xs mx-auto">
                    {timerDisplayName || 'Custom Focus Timer'}
                  </h3>
                </div>

                {/* SVG Countdown Ring */}
                <div id="countdown-ring-container" className="relative w-44 h-44 flex items-center justify-center my-3.5 select-none animate-fadeIn">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Ring background track */}
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      className="stroke-slate-100 dark:stroke-slate-800/60 fill-transparent"
                      strokeWidth="8"
                    />
                    {/* Ring progress circle */}
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      className={`fill-transparent transition-all duration-1000 ${
                        timerColor === 'indigo' ? 'stroke-indigo-500' :
                        timerColor === 'emerald' ? 'stroke-emerald-500' :
                        timerColor === 'amber' ? 'stroke-amber-500' :
                        timerColor === 'rose' ? 'stroke-rose-500' :
                        timerColor === 'sky' ? 'stroke-sky-400' : 'stroke-purple-500'
                      }`}
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 76}
                      strokeDashoffset={2 * Math.PI * 76 * (1 - (timerSecondsRemaining / (timerTotalDuration || 1)))}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Text Overlay inside circular ring */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
                    <span className="text-3xl font-mono font-black text-slate-800 dark:text-slate-50 tracking-tight">
                      {Math.floor(timerSecondsRemaining / 60)}:{(timerSecondsRemaining % 60).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase font-sans">
                      {timerIsRunning ? 'Running' : 'Paused'}
                    </span>
                  </div>
                </div>

                {/* Micro Action Buttons Row */}
                <div className="flex items-center space-x-4 z-10">
                  <button
                    id="timer-reset-btn"
                    type="button"
                    onClick={() => {
                      setTimerIsRunning(false);
                      setTimerSecondsRemaining(timerTotalDuration);
                    }}
                    className="p-3 text-slate-500 hover:text-slate-705 dark:text-slate-400 bg-white dark:bg-slate-805 rounded-full border border-slate-200 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 animate-fadeIn"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    id="timer-play-pause-btn"
                    type="button"
                    onClick={() => setTimerIsRunning(!timerIsRunning)}
                    className={`p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 text-white ${
                      timerColor === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700' :
                      timerColor === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                      timerColor === 'amber' ? 'bg-amber-500 hover:bg-amber-600' :
                      timerColor === 'rose' ? 'bg-rose-600 hover:bg-rose-700' :
                      timerColor === 'sky' ? 'bg-sky-505 hover:bg-sky-600' : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    title={timerIsRunning ? 'Pause Session' : 'Start Session'}
                  >
                    {timerIsRunning ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    id="timer-sound-toggle-btn"
                    type="button"
                    onClick={() => setTimerSoundEnabled(!timerSoundEnabled)}
                    className={`p-3 rounded-full border transition-all duration-200 hover:scale-110 active:scale-95 ${
                      timerSoundEnabled 
                        ? 'bg-slate-100 border-slate-300 text-slate-800' 
                        : 'bg-white border-slate-200 text-slate-300'
                    }`}
                    title={timerSoundEnabled ? 'Buzzer Enabled' : 'Buzzer Muted'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Browser Alert Trigger Config */}
                <div className="mt-4 pt-4 border-t border-slate-150 dark:border-slate-800/80 w-full flex items-center justify-between text-[10px] z-10">
                  <span className="text-slate-400 flex items-center gap-1 font-semibold uppercase">
                    <Bell className="w-3 h-3" />
                    Desktop Notifications
                  </span>
                  {timerNotificationEnabled ? (
                    <span className="text-emerald-500 font-bold">✓ Active</span>
                  ) : (
                    <button
                      type="button"
                      onClick={requestNotificationPermission}
                      className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline"
                    >
                      Enable
                    </button>
                  )}
                </div>
              </div>

              {/* Grid: 1. Presets / Custom Saved, 2. Create Custom form */}
              <div className="grid grid-cols-1 gap-4">
                {/* 1. Timer Selection & Management Panel */}
                <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3">
                  <div className="flex items-center space-x-2">
                    <Hourglass className={`w-4 h-4 ${accentClasses.text}`} />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      My Timer Library ({customTimers.length})
                    </h4>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {customTimers.map(t => {
                      const isSelected = activeTimerId === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => handleSelectTimer(t)}
                          className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white dark:bg-slate-900 border-indigo-500 ring-1 ring-indigo-500 shadow-xs'
                              : 'bg-white/40 hover:bg-white dark:bg-slate-900/30 border-slate-150 dark:border-transparent'
                          }`}
                        >
                          <div className="flex items-center space-x-2 w-full min-w-0">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                              t.color === 'indigo' ? 'bg-indigo-500' :
                              t.color === 'emerald' ? 'bg-emerald-500' :
                              t.color === 'amber' ? 'bg-amber-500' :
                              t.color === 'rose' ? 'bg-rose-500' :
                              t.color === 'sky' ? 'bg-sky-400' : 'bg-purple-500'
                            }`} />
                            <div className="min-w-0 pr-2">
                              <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                                {t.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold font-mono">
                                {t.minutes}m {t.seconds}s
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 flex-shrink-0">
                            {isSelected && (
                              <span className="text-[8px] font-black bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-mono uppercase tracking-widest">
                                Loaded
                              </span>
                            )}
                            {t.id.startsWith('timer-') && (
                              <button
                                type="button"
                                onClick={(e) => handleDeleteTimer(t.id, e)}
                                className="p-1 text-slate-450 hover:text-rose-600 rounded"
                                title="Delete preset"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Create Custom Timer Composer Form */}
                <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3">
                  <div className="flex items-center space-x-2">
                    <Plus className={`w-4 h-4 ${accentClasses.text}`} />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Create Custom Focus block
                    </h4>
                  </div>

                  <form onSubmit={handleCreateTimer} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-450">Timer Label</label>
                      <input
                        id="new-timer-name-input"
                        type="text"
                        placeholder="e.g. Brainstorm layout, stretch workout..."
                        value={newTimerName}
                        onChange={e => setNewTimerName(e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-850 dark:text-slate-100 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-455">Minutes</label>
                        <input
                          id="new-timer-min-input"
                          type="number"
                          min="0"
                          max="180"
                          value={newTimerMin}
                          onChange={e => setNewTimerMin(Math.max(0, Number(e.target.value)))}
                          required
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-850 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-455">Seconds</label>
                        <input
                          id="new-timer-sec-input"
                          type="number"
                          min="0"
                          max="59"
                          value={newTimerSec}
                          onChange={e => setNewTimerSec(Math.min(59, Math.max(0, Number(e.target.value))))}
                          required
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-850 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Accent selection color */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-455 block mb-1">UI Color Accent</label>
                      <div className="flex items-center space-x-2">
                        {(['indigo', 'emerald', 'amber', 'rose', 'sky', 'purple'] as const).map(col => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setNewTimerColor(col)}
                            className={`w-5 h-5 rounded-full border border-black/10 transition-transform ${
                              newTimerColor === col ? 'scale-125 ring-2 ring-slate-805' : 'hover:scale-110'
                            } ${
                              col === 'indigo' ? 'bg-indigo-500' :
                              col === 'emerald' ? 'bg-emerald-500' :
                              col === 'amber' ? 'bg-amber-500' :
                              col === 'rose' ? 'bg-rose-500' :
                              col === 'sky' ? 'bg-sky-400' : 'bg-purple-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      id="save-new-timer-btn"
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all shadow-xs"
                    >
                      Save and Load to Active Slot
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/*                     SETTINGS TAB                          */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div id="settings-tab-panel" className="space-y-4 animate-fadeIn">
              
              {/* Profile Config */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3">
                <div className="flex items-center space-x-2.5">
                  <User className={`w-4 h-4 ${accentClasses.text}`} />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Profile Configurations
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-405 block mb-1">Username Name</label>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-405 block mb-1">Email Coordinates</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 focus:outline-none"
                    />
                  </div>

                  {/* Avatar Select list */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-405 block mb-1">In-App Emoji Avatar</label>
                    <div className="flex items-center space-x-1.5">
                      {['🚀', '⚡', '💻', '🧘', '🔥', '🎨', '🦁', '🌟'].map(av => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setUserAvatar(av)}
                          className={`w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border text-base flex items-center justify-center transition-all ${
                            userAvatar === av ? 'border-indigo-600 scale-110 bg-indigo-50/10' : 'border-slate-150 hover:scale-105'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Settings Accent */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Workspace Color Accents</span>
                <p className="text-[10px] text-slate-450 font-bold leading-normal">
                  Update active tab indicators, checkboxes, completion dials, icons, and overlays instantaneously.
                </p>
                
                <div className="grid grid-cols-6 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  {(['indigo', 'emerald', 'amber', 'rose', 'sky', 'purple'] as const).map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setThemeAccent(color)}
                      className={`h-9 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        themeAccent === color 
                          ? 'border-indigo-550 ring-2 ring-indigo-500 bg-white/50' 
                          : 'border-slate-200 dark:border-slate-800 hover:scale-[1.05]'
                      }`}
                      title={color}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${
                        color === 'indigo' ? 'bg-indigo-600' :
                        color === 'emerald' ? 'bg-emerald-600' :
                        color === 'amber' ? 'bg-amber-500' :
                        color === 'rose' ? 'bg-rose-500' :
                        color === 'sky' ? 'bg-sky-400' : 'bg-purple-600'
                      }`} />
                      <span className="text-[8px] font-bold uppercase mt-1 tracking-wider text-slate-500 dark:text-slate-450">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Persistent Cache Administration controls */}
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl space-y-3.5">
                <div className="flex items-center space-x-2 text-rose-550">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Developer cache dashboard</span>
                </div>
                
                <p className="text-[10px] text-slate-450 leading-normal">
                  Inject dummy testing chores for testing schedules inside monthly grids, or wipe client states clean to restore default items.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={handleInjectedTestData}
                    className="py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                  >
                    Inject Dummy Chores
                  </button>

                  <button
                    type="button"
                    onClick={handleClearEverything}
                    className="py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700/80 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border border-rose-100/50"
                  >
                    Wipe State Data
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* ========================================================= */}
        {/*           MODAL POPUPS OVERLAYS (TASK, NOTE, TIMER)       */}
        {/* ========================================================= */}
        
        {/* 1. Completed Timer Overlay alarm */}
        {finishedTimer && (
          <div 
            id="timer-completion-overlay" 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={() => setFinishedTimer(null)}
          >
            <div 
              id="timer-completion-modal" 
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative text-center animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-indigo-500/10 dark:bg-indigo-950/40 flex items-center justify-center mb-3">
                <Bell className="w-7 h-7 stroke-[2.5] text-indigo-505 dark:text-indigo-400 animate-bounce" />
              </div>

              <h3 className="text-lg font-black text-slate-800 tracking-tight">Focus Block Composed!</h3>
              <p className="text-xs text-slate-450 mt-1.5">
                Your focused slot <strong className="font-extrabold text-slate-800 dark:text-slate-100">"{finishedTimer.name}"</strong> has successfully finished. Take a quick desk break!
              </p>

              <div className="my-4 p-3 bg-slate-50 dark:bg-slate-800/40 text-[10px] rounded-xl text-slate-405 leading-relaxed">
                🔔 Built-in chime buzzer sweep has sounded. Repeat the block or close the alarm to update logs.
              </div>

              <div className="flex flex-col space-y-1.5 mt-2">
                <button
                  id="timer-completion-restart-btn"
                  type="button"
                  onClick={() => {
                    setFinishedTimer(null);
                    setTimerSecondsRemaining(timerTotalDuration);
                    setTimerIsRunning(true);
                  }}
                  className="w-full py-2 bg-indigo-650 hover:bg-indigo-755 text-white rounded-xl text-xs font-black transition-all"
                >
                  Repeat Focus Session
                </button>
                <button
                  id="timer-completion-dismiss-btn"
                  type="button"
                  onClick={() => setFinishedTimer(null)}
                  className="w-full py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-xl"
                >
                  Dismiss Alert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Task checklist details expansion modal */}
        {viewingTask && (
          <div 
            id="view-task-modal-overlay"
            className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-55 p-4 animate-fadeIn"
            onClick={() => setViewingTask(null)}
          >
            <div 
              id="view-task-modal-content"
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xl relative text-left animate-scaleUp"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80 mb-3 text-xs">
                <span className={`text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${accentClasses.badge}`}>
                  📁 {viewingTask.category || 'General'}
                </span>
                <span className="text-[10px] text-slate-400 font-bold font-mono">📅 {viewingTask.dueDate}</span>
              </div>

              <h3 className="text-base font-black text-slate-808 dark:text-slate-100 leading-tight">
                {viewingTask.title}
              </h3>
              
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-2 font-medium">
                {viewingTask.description || 'No complementary description details listed.'}
              </p>

              {/* Priority badge */}
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Priority:</span>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                  viewingTask.priority === 'high' ? 'bg-rose-50 text-rose-700 dark:bg-rose-955' :
                  viewingTask.priority === 'medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-955' :
                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                }`}>
                  {viewingTask.priority}
                </span>

                <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider ml-auto">Outcome:</span>
                <button
                  type="button"
                  onClick={() => {
                    handleToggleTask(viewingTask.id);
                    setViewingTask(prev => prev ? { ...prev, completed: !prev.completed } : null);
                  }}
                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    viewingTask.completed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {viewingTask.completed ? 'Completed' : 'Pending'}
                </button>
              </div>

              {/* Subtask micro checklists */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Objective checklist</span>
                
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {(!viewingTask.subtasks || viewingTask.subtasks.length === 0) ? (
                    <p className="text-[11px] text-slate-400 italic py-2">No key steps specified yet. Draft one below!</p>
                  ) : (
                    viewingTask.subtasks.map(st => (
                      <div 
                        key={st.id}
                        onClick={() => handleToggleSubtask(viewingTask.id, st.id)}
                        className="flex items-center space-x-2.5 p-1.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg cursor-pointer hover:bg-slate-100"
                      >
                        {st.completed ? (
                          <CheckSquare className={`w-4 h-4 ${accentClasses.text}`} />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                        <span className={`text-[11px] font-semibold text-slate-700 dark:text-slate-200 ${st.completed ? 'line-through text-slate-400' : ''}`}>
                          {st.title}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Inline checklist step creator inside details */}
                <form onSubmit={handleAddSubtaskModal} className="flex gap-1.5 pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Add step descriptor..."
                    value={modalSubtaskText}
                    onChange={e => setModalSubtaskText(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-850 px-2.5 py-1.5 text-[11px] rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                  <button
                    type="submit"
                    className={`px-3 py-1.5 text-white text-[11px] font-bold rounded-lg ${accentClasses.bg} transition-all`}
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Close Button */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewingTask(null)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all"
                >
                  OK Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Note detail inspector modal view */}
        {viewingNote && (
          <div 
            id="view-note-modal-overlay"
            className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-55 p-4 animate-fadeIn"
            onClick={() => {
              setViewingNote(null);
              setIsEditingNote(false);
            }}
          >
            <div 
              id="view-note-modal-content"
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xl relative text-left animate-scaleUp"
              onClick={e => e.stopPropagation()}
            >
              {isEditingNote ? (
                /* Note EDITING Dynamic Customizer Theme Mode View */
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-850">
                    <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-black">
                      <Edit2 className="w-4 h-4 animate-pulse" />
                      <span className="text-xs uppercase tracking-wider">Note Editor & Tools</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Customizing Mode</span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Title input */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Note Title *</label>
                      <input 
                        type="text"
                        required
                        value={editNoteTitle}
                        onChange={e => setEditNoteTitle(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-150 focus:outline-none"
                        placeholder="Untitled note..."
                      />
                    </div>

                    {/* Folder selector and color picker row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Binder Folder</label>
                        <select
                          value={editNoteFolder}
                          onChange={e => setEditNoteFolder(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                        >
                          {folders.filter(f => f !== 'All').map(fold => (
                            <option key={fold} value={fold}>{fold}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Page Canvas Color</label>
                        <div className="flex items-center space-x-1.5 pt-1.5">
                          {(['amber', 'sky', 'rose', 'emerald', 'purple', 'slate'] as const).map(col => (
                            <button
                              key={col}
                              type="button"
                              onClick={() => setEditNoteColor(col)}
                              className={`w-5 h-5 rounded-full border border-black/10 transition-transform flex items-center justify-center ${
                                editNoteColor === col ? 'scale-110 ring-2 ring-indigo-500' : 'hover:scale-110'
                              } ${
                                col === 'amber' ? 'bg-amber-100' :
                                col === 'sky' ? 'bg-sky-100' :
                                col === 'rose' ? 'bg-rose-100' :
                                col === 'emerald' ? 'bg-emerald-100' :
                                col === 'purple' ? 'bg-purple-100' :
                                'bg-slate-150 dark:bg-slate-700'
                              }`}
                              title={col}
                            >
                              {editNoteColor === col && <Check className="w-2.5 h-2.5 text-slate-805" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Notecontent text area description */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Thoughts Content</label>
                      <textarea
                        rows={4}
                        value={editNoteContent}
                        onChange={e => setEditNoteContent(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs leading-relaxed text-slate-800 dark:text-slate-205 focus:outline-none font-sans"
                        placeholder="Log detailed tasks list, grocery draft, daily standups..."
                      />
                    </div>

                    {/* Tag customizer logs */}
                    <div className="flex flex-col space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-855/40 border border-slate-100 dark:border-slate-800">
                      <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center justify-between">
                        <span>Tag Customization Tool</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-normal">({editNoteTags.length} active)</span>
                      </label>
                      
                      <div className="flex flex-wrap gap-1">
                        {editNoteTags.length === 0 ? (
                          <span className="text-[10px] text-slate-450 italic py-0.5">No tags yet. Add quick chips below!</span>
                        ) : (
                          editNoteTags.map(tg => (
                            <span 
                              key={tg} 
                              className="text-[9px] font-black uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-650 dark:text-slate-300 px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0"
                            >
                              #{tg}
                              <button 
                                type="button" 
                                onClick={() => handleRemoveEditTag(tg)} 
                                className="hover:bg-rose-100 dark:hover:bg-rose-950/40 p-0.5 rounded text-slate-500 hover:text-rose-600 font-bold transition-all"
                                title={`Remove ${tg}`}
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>

                      <div className="flex gap-1.5 mt-1">
                        <input
                          type="text"
                          placeholder="Type tag (e.g., shopping, api) and press Add..."
                          value={newTagInputValue}
                          onChange={e => setNewTagInputValue(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddEditTag(); } }}
                          className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-855 rounded-lg px-2.5 py-1 text-[11px] text-slate-805 dark:text-slate-200 focus:outline-none animate-fadeIn"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddEditTag()}
                          className="px-2.5 py-1 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg font-bold text-[10px] uppercase tracking-wide transition-all"
                        >
                          Add Chip
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Save/Cancel Footing action buttons */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setIsEditingNote(false)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
                    >
                      Discard & Exit
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveNoteEdit}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* Note VIEWING Mode View (Original visual but enhanced with customization shortcuts) */
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-850 mb-3 text-xs">
                    <span className="text-[10px] uppercase font-black text-indigo-550 dark:text-indigo-400 tracking-wide bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                      📁 {viewingNote.folder}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold font-sans">📅 {viewingNote.updatedAt}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-black text-slate-800 dark:text-slate-100 leading-tight">
                      {viewingNote.title}
                    </h4>
                    
                    <button
                      type="button"
                      onClick={() => setIsEditingNote(true)}
                      className="text-indigo-600 hover:text-indigo-850 dark:text-indigo-450 dark:hover:text-indigo-300 font-bold border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/50 dark:bg-indigo-950/20 px-2.5 py-1 rounded-xl text-[10px] flex items-center gap-1 transition-all shrink-0 uppercase tracking-widest cursor-pointer"
                      title="Toggle Editing Mode"
                    >
                      <Edit2 className="w-3 h-3" /> Customize Note
                    </button>
                  </div>

                  {/* Sticky style color note layout preview */}
                  <div className={`my-3.5 p-4 rounded-3xl text-xs font-sans leading-relaxed border whitespace-pre-wrap ${
                    viewingNote.color === 'amber' ? 'bg-amber-100/90 text-amber-950 border-amber-200/50 shadow-sm' :
                    viewingNote.color === 'sky' ? 'bg-sky-100/90 text-sky-950 border-sky-200/50 shadow-sm' :
                    viewingNote.color === 'rose' ? 'bg-rose-100/90 text-rose-950 border-rose-200/50 shadow-sm' :
                    viewingNote.color === 'emerald' ? 'bg-emerald-100/90 text-emerald-950 border-emerald-200/50 shadow-sm' :
                    viewingNote.color === 'purple' ? 'bg-purple-100/90 text-purple-950 border-purple-200/50 shadow-sm' :
                    'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 shadow-xs'
                  }`}>
                    {viewingNote.content}
                  </div>

                  {/* Tags panel display */}
                  {viewingNote.tags && viewingNote.tags.length > 0 && (
                    <div className="flex items-center space-x-1 flex-wrap my-3.5">
                      <Tag className="w-3 h-3 text-slate-400 shrink-0" />
                      {viewingNote.tags.map(tg => (
                        <span 
                          key={tg} 
                          className="text-[8px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded cursor-pointer hover:bg-indigo-50 hover:text-indigo-650"
                          onClick={() => { setSelectedNoteTag(tg); setViewingNote(null); }}
                          title={`Click to filter by #${tg}`}
                        >
                          #{tg}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Controls footer */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteNote(viewingNote.id);
                      }}
                      className="text-rose-600 hover:text-rose-950 font-bold border border-rose-100 hover:bg-rose-50 px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Trash className="w-3.5 h-3.5" />
                      Trash Page
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setViewingNote(null);
                        setIsEditingNote(false);
                      }}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      OK Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* 4. AI Copilot Chatbot Modal Overlay */}
        {isAiModalOpen && (
          <div 
            id="ai-copilot-modal-overlay"
            className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-55 p-4 animate-fadeIn"
            onClick={() => setIsAiModalOpen(false)}
          >
            <div 
              id="ai-copilot-modal-content"
              className="w-full max-w-md bg-white dark:bg-slate-950 rounded-[32px] border border-slate-200 dark:border-slate-850 shadow-2xl overflow-hidden relative text-left flex flex-col max-h-[90vh] animate-scaleUp"
              onClick={e => e.stopPropagation()}
            >
              {/* Title Header bar */}
              <div className="p-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-indigo-500/10 p-2 rounded-xl text-indigo-400">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-tight leading-tight">Workspace AI Copilot</h3>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Natural chat automation</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAiModalOpen(false)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer text-slate-350"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat conversations space */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[50vh] min-h-[30vh] bg-slate-50/50 dark:bg-slate-900/30">
                {aiMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Role Avatar Badge */}
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 select-none ${
                      msg.role === 'user' 
                        ? 'bg-slate-200 text-slate-700 font-bold dark:bg-slate-800 dark:text-slate-300' 
                        : 'bg-indigo-600 text-white font-serif font-black'
                    }`}>
                      {msg.role === 'user' ? 'ME' : 'AI'}
                    </div>

                    {/* Chat Bubble card text */}
                    <div className={`p-3 rounded-2xl text-[11px] leading-relaxed font-medium md:text-xs max-w-[80%] whitespace-pre-wrap font-sans ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none ml-auto'
                        : msg.error 
                          ? 'bg-rose-50 dark:bg-rose-950/20 border border-rose-100 text-rose-700 dark:text-rose-450 rounded-tl-none'
                          : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 text-slate-800 dark:text-slate-150 shadow-xs rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* Loader status */}
                {isAiLoading && (
                  <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-bold tracking-widest uppercase pl-10">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span>Analyzing Request...</span>
                  </div>
                )}

                {/* Automation feedback alert banner */}
                {aiFeedback && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-2xl border border-emerald-100 dark:border-emerald-900 text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 select-none font-bold animate-fadeIn">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{aiFeedback}</span>
                  </div>
                )}
              </div>

              {/* Sample Templates Suggestions Quick Links */}
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-850 bg-slate-100/50 dark:bg-slate-900/50 space-y-1.5">
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Try speaking to me like this:</p>
                <div className="flex flex-wrap gap-1.5 max-h-[12vh] overflow-y-auto pr-0.5">
                  <button 
                    onClick={() => setAiInputText("Add a high priority task for Tomorrow: 'Verify OAuth and compile codebase layout' under category Work")}
                    className="text-[10px] px-2.5 py-1 bg-white hover:bg-indigo-50 dark:bg-slate-900 dark:hover:bg-slate-850 hover:text-indigo-600 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800 rounded-lg transition-all text-left font-medium"
                  >
                    📝 Create due task明天
                  </button>
                  <button 
                    onClick={() => setAiInputText("Create a Shopping list note called 'Office Pantry Grocery' with content 'Oat milk, coffee bags, organic snacks, sweet chocolate' with amber color")}
                    className="text-[10px] px-2.5 py-1 bg-white hover:bg-indigo-50 dark:bg-slate-900 dark:hover:bg-slate-850 hover:text-indigo-600 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800 rounded-lg transition-all text-left font-medium"
                  >
                    💡 Draft elegant folder notes
                  </button>
                  <button 
                    onClick={() => setAiInputText("Add a custom focus Pomodoro timer named 'Sprint Code Challenge' for 30 minutes with emerald color accent")}
                    className="text-[10px] px-2.5 py-1 bg-white hover:bg-indigo-50 dark:bg-slate-900 dark:hover:bg-slate-850 hover:text-indigo-600 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800 rounded-lg transition-all text-left font-medium"
                  >
                    ⏱️ Setup new Focus Timers
                  </button>
                </div>
              </div>

              {/* Message composer input bar */}
              <form onSubmit={handleSendAiMessage} className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2">
                <input 
                  type="text" 
                  required
                  disabled={isAiLoading}
                  placeholder="Ask Copilot: 'Remind me to call CEO tomorrow'..."
                  value={aiInputText}
                  onChange={e => setAiInputText(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-xs rounded-2xl border-none focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
                />
                <button 
                  type="submit"
                  disabled={isAiLoading || !aiInputText.trim()}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center transition-all disabled:opacity-40 disabled:scale-100 cursor-pointer active:scale-95 text-xs font-bold shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* BOTTOM FIXED FLOATING NAVIGATION TABS RAIL MENU */}
        <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-150 dark:border-slate-800/80 px-2 py-2.5 flex items-center justify-around z-40 shadow-xl rounded-t-3xl">
          
          {/* Dashboard tab */}
          <button
            id="tab-dashboard"
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all scale-press ${
              activeTab === 'dashboard' 
                ? accentClasses.badge + ' font-black scale-105 shadow-xs' 
                : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-350'
            }`}
          >
            <UserCircle2 className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Workspace</span>
          </button>

          {/* Sticky Notepad tab */}
          <button
            id="tab-nooter"
            type="button"
            onClick={() => setActiveTab('nooter')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all scale-press ${
              activeTab === 'nooter' 
                ? accentClasses.badge + ' font-black scale-105 shadow-xs' 
                : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-350'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Nooter</span>
          </button>

          {/* Monthly Calendar tab */}
          <button
            id="tab-calendar"
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all scale-press ${
              activeTab === 'calendar' 
                ? accentClasses.badge + ' font-black scale-105 shadow-xs' 
                : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-350'
            }`}
          >
            <CalendarIcon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Calendar</span>
          </button>

          {/* Pomodoro Timer tab */}
          <button
            id="tab-timer"
            type="button"
            onClick={() => setActiveTab('timer')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all scale-press ${
              activeTab === 'timer' 
                ? accentClasses.badge + ' font-black scale-105 shadow-xs' 
                : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-355'
            }`}
          >
            <Timer className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Timer</span>
          </button>

          {/* Profiles and theme settings tab */}
          <button
            id="tab-settings"
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all scale-press ${
              activeTab === 'settings' 
                ? accentClasses.badge + ' font-black scale-105 shadow-xs' 
                : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-350'
            }`}
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Settings</span>
          </button>

        </nav>
      </div>
    </div>
  );
}
