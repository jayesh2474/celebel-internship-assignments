import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Charts from './pages/Charts';
import Settings from './pages/Settings';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
              <div className="container mx-auto px-6 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tables" element={<Tables />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/kanban" element={<Kanban />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
