import { useState } from 'react';
import { parts, bom } from '../data/mockData';
import { analyzeBOM } from '../services/gemini';
import Markdown from 'react-markdown';
import { Loader2, ChevronRight, ChevronDown, Cpu, Network } from 'lucide-react';

// Build BOM Tree
function buildTree(parentId: string) {
  const children = bom.filter(b => b.parent === parentId);
  return children.map(child => {
    const partDetails = parts.find(p => p.id === child.child);
    return {
      ...child,
      partDetails,
      children: buildTree(child.child)
    };
  });
}

const BOMNode = ({ node, level = 0 }: { node: any, level?: number }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-2 px-3 hover:bg-slate-50 rounded-md cursor-pointer ${level === 0 ? 'font-medium' : 'text-slate-600'}`}
        style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-5 h-5 flex items-center justify-center mr-2 text-slate-400">
          {hasChildren ? (expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />) : <Cpu className="w-4 h-4 opacity-50" />}
        </div>
        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm font-mono text-slate-500">{node.child}</span>
          <span className="text-sm text-slate-900">{node.partDetails?.name}</span>
          <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">Qty: {node.qty}</span>
          <span className="text-xs text-slate-400 ml-auto">{node.partDetails?.supplier}</span>
        </div>
      </div>
      {expanded && hasChildren && (
        <div className="border-l border-slate-200 ml-5">
          {node.children.map((child: any) => (
            <BOMNode key={child.child} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Project1BOM() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rootAssembly = parts.find(p => p.category === 'Assembly');
  const tree = rootAssembly ? buildTree(rootAssembly.id) : [];

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeBOM(JSON.stringify(bom, null, 2), JSON.stringify(parts, null, 2));
      setAnalysis(result || 'No analysis returned.');
    } catch (error) {
      console.error(error);
      setAnalysis('Error analyzing BOM. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">AI BOM Analyzer</h1>
        <p className="text-slate-500 mt-1">Analyze BOM complexity and suggest optimizations using GenAI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Left: BOM Tree */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="font-medium text-slate-800">Product Structure (BOM)</h2>
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Analyze with AI
            </button>
          </div>
          <div className="p-4 overflow-auto flex-1">
            {rootAssembly && (
              <div className="mb-2 flex items-center py-2 px-3 bg-slate-50 rounded-md font-medium text-slate-900 border border-slate-200">
                <Cpu className="w-5 h-5 mr-3 text-indigo-500" />
                <span className="font-mono text-slate-500 mr-3">{rootAssembly.id}</span>
                {rootAssembly.name}
              </div>
            )}
            {tree.map(node => (
              <BOMNode key={node.child} node={node} />
            ))}
          </div>
        </div>

        {/* Right: AI Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-medium text-slate-800">AI Analysis Report</h2>
          </div>
          <div className="p-6 overflow-auto flex-1 prose prose-slate prose-sm max-w-none">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
                <p>Analyzing BOM complexity and supplier data...</p>
              </div>
            ) : analysis ? (
              <div className="markdown-body">
                <Markdown>{analysis}</Markdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Network className="w-12 h-12 mb-4 opacity-20" />
                <p>Click "Analyze with AI" to generate a report.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
