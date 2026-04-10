import React, { useState, useEffect } from 'react';
import logo from './assets/compile.journey.jpg';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:8000/tasks' 
  : 'https://task-manager-phi-flame-93.vercel.app/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority, completed: false }),
      });
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
      setPriority('Medium');
    } catch (err) {
      setError('Could not add task');
    }
  };

  const toggleStatus = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updated = await response.json();
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      setError('Update failed');
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Delete failed');
    }
  };

  const updateNote = async (id, note) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completionNote: note }),
      });
      const updated = await response.json();
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError('Failed to save note');
    }
  };

  const filteredTasks = Array.isArray(tasks) ? tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  }) : [];

  const stats = {
    total: tasks?.length || 0,
    active: (tasks || []).filter(t => !t.completed).length,
    completed: (tasks || []).filter(t => t.completed).length,
    high: (tasks || []).filter(t => t && t.priority === 'High' && !t.completed).length,
  };

  return (
    <div className="container">
      <header>
        <div className="logo-container">
          {logo ? (
            <img src={logo} alt="Planify" className="logo-img" onError={(e) => e.target.style.display = 'none'} />
          ) : (
            <div className="logo-placeholder">P</div>
          )}
          <h1 className="brand-name">Planify</h1>
        </div>
        <div className="task-meta-inputs">
          {['All', 'Active', 'Completed'].map(f => (
            <button 
              key={f} 
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <section className="stats-bar">
        <div className="stat-item glass">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Missions</span>
        </div>
        <div className="stat-item glass">
          <span className="stat-value" style={{color: 'var(--primary)'}}>{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item glass">
          <span className="stat-value" style={{color: 'var(--success)'}}>{stats.completed}</span>
          <span className="stat-label">Concluded</span>
        </div>
        <div className="stat-item glass">
          <span className="stat-value" style={{color: 'var(--danger)'}}>{stats.high}</span>
          <span className="stat-label">Critical</span>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="add-task-panel glass">
        <div className="input-row">
          <input 
            type="text" 
            className="main-input" 
            placeholder="Plan your next move..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button type="submit" className="btn-primary">Deploy</button>
        </div>
        <textarea 
          placeholder="Add details and strategic notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>

      {error && <div className="error-message glass">{error}</div>}

      <div className="task-grid">
        {loading ? (
           <div className="loading-sensors">
            Initializing sensors...
           </div>
        ) : filteredTasks.length === 0 ? (
          <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)'}}>
            No strategic tasks scheduled.
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              toggleStatus={toggleStatus} 
              updateNote={updateNote} 
              deleteTask={deleteTask} 
            />
          ))
        )}
      </div>
    </div>
  );
}

function TaskItem({ task, toggleStatus, updateNote, deleteTask }) {
  const [localNote, setLocalNote] = useState(task.completionNote || '');

  // Sync local state if task changes from outside
  useEffect(() => {
    setLocalNote(task.completionNote || '');
  }, [task.completionNote]);

  const handleNoteChange = (e) => {
    setLocalNote(e.target.value);
  };

  const handleBlur = () => {
    if (localNote !== task.completionNote) {
      updateNote(task.id, localNote);
    }
  };

  return (
    <div className={`task-card glass priority-${(task.priority || 'Medium').toLowerCase()} ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <span className="priority-tag" style={{color: `var(--priority-${(task.priority || 'Medium').toLowerCase()})`}}>
          {task.priority || 'Medium'}
        </span>
        <button 
          className={`btn-complete btn-circle ${task.completed ? 'active' : ''}`}
          onClick={() => toggleStatus(task)}
        >
          {task.completed ? '✓' : ''}
        </button>
      </div>
      
      <h3 className="task-title">{task.title}</h3>
      <p className="task-desc">{task.description || 'No additional intelligence provided.'}</p>
      
      {task.completed && (
        <div className="completion-section">
          <label className="stat-label" style={{fontSize: '0.65rem', marginBottom: '4px', display: 'block'}}>Mission Debrief</label>
          <input 
            type="text"
            className="debrief-input"
            placeholder="Briefly state how you finished..."
            value={localNote}
            onChange={handleNoteChange}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          />
        </div>
      )}

      <div className="task-footer">
        <span style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>
          {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
        </span>
        <button className="btn-circle btn-delete" onClick={() => deleteTask(task.id)}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default App;
