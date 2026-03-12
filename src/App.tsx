/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Project1BOM from './components/Project1BOM';
import Project2Impact from './components/Project2Impact';
import Project3Chat from './components/Project3Chat';
import Project4Dashboard from './components/Project4Dashboard';

export default function App() {
  const [activeProject, setActiveProject] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeProject={activeProject} setActiveProject={setActiveProject} />
      <main className="flex-1 overflow-hidden p-8">
        {activeProject === 'bom' && <Project1BOM />}
        {activeProject === 'impact' && <Project2Impact />}
        {activeProject === 'chat' && <Project3Chat />}
        {activeProject === 'dashboard' && <Project4Dashboard />}
      </main>
    </div>
  );
}
