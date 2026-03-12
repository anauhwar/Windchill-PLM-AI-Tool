import { useState } from 'react';
import { parts, bom } from '../data/mockData';
import { analyzeImpact } from '../services/gemini';
import Markdown from 'react-markdown';
import { Loader2, ArrowUpRight, AlertCircle, GitPullRequest } from 'lucide-react';

// Find where-used (parents)
function findUpstreamImpact(partId: string, visited = new Set<string>()): any[] {
  if (visited.has(partId)) return [];
  visited.add(partId);
  
  const parents = bom.filter(b => b.child === partId);
  let impact: any[] = [];
  
  for (const p of parents) {
    const parentPart = parts.find(pt => pt.id === p.parent);
    impact.push({
      parent: parentPart,
      qty: p.qty,
      upstream: findUpstreamImpact(p.parent, visited)
    });
  }
  return impact;
}

export default function Project2Impact() {
  const [selectedPart, setSelectedPart] = useState<string>('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedPart) return;
    setLoading(true);
    try {
      const part = parts.find(p => p.id === selectedPart);
      const impactGraph = findUpstreamImpact(selectedPart);
      const result = await analyzeImpact(selectedPart, part?.name || '', JSON.stringify(impactGraph, null, 2));
      setAnalysis(result || 'No analysis returned.');
    } catch (error) {
      console.error(error);
      setAnalysis('Error analyzing impact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const impactGraph = selectedPart ? findUpstreamImpact(selectedPart) : [];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Engineering Change Impact Analyzer</h1>
        <p className="text-slate-500 mt-1">Predict affected products and suppliers when a part changes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Left: Selection & Graph */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Part to Change</label>
            <select 
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              value={selectedPart}
              onChange={(e) => {
                setSelectedPart(e.target.value);
                setAnalysis(null);
              }}
            >
              <option value="">-- Select a Part --</option>
              {parts.filter(p => p.category !== 'Assembly').map(p => (
                <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
              ))}
            </select>
            
            <button 
              onClick={handleAnalyze}
              disabled={!selectedPart || loading}
              className="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Analyze Impact
            </button>
          </div>

          {selectedPart && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-medium text-slate-800 flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-indigo-500" />
                  Upstream Dependencies
                </h2>
              </div>
              <div className="p-4 overflow-auto flex-1">
                {impactGraph.length === 0 ? (
                  <p className="text-sm text-slate-500">No upstream dependencies found. This is a top-level assembly.</p>
                ) : (
                  <pre className="text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(impactGraph, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: AI Analysis */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="font-medium text-slate-800">Impact Prediction Report</h2>
          </div>
          <div className="p-6 overflow-auto flex-1 prose prose-slate prose-sm max-w-none">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
                <p>Traversing graph and predicting impact...</p>
              </div>
            ) : analysis ? (
              <div className="markdown-body">
                <Markdown>{analysis}</Markdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <GitPullRequest className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a part and click "Analyze Impact" to generate a report.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
