import { LayoutDashboard, Network, GitPullRequest, MessageSquare, Database } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeProject: string;
  setActiveProject: (project: string) => void;
}

export default function Sidebar({ activeProject, setActiveProject }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'PLM Data Lake', icon: Database },
    { id: 'bom', label: 'AI BOM Analyzer', icon: Network },
    { id: 'impact', label: 'Impact Analyzer', icon: GitPullRequest },
    { id: 'chat', label: 'PLM Assistant', icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 text-white font-semibold text-lg">
          <LayoutDashboard className="w-6 h-6 text-indigo-400" />
          Windchill Studio
        </div>
        <p className="text-xs text-slate-500 mt-2">Data Engineering & GenAI</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeProject === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveProject(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-indigo-500/10 text-indigo-400" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-slate-800">
        <div className="text-xs text-slate-500">
          Powered by Gemini 3.1 Pro
        </div>
      </div>
    </div>
  );
}
