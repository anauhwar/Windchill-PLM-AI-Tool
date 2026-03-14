import { useState } from 'react';
import { parts, bom } from '../data/mockData';
import { analyzeBOM } from '../services/gemini';
import Markdown from 'react-markdown';
import { Loader2, ChevronRight, ChevronDown, Network, Box, Zap, Settings, Layers, Wrench, CircleDashed } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Assembly': return <Box className="w-4 h-4 text-indigo-500" />;
    case 'Electrical': return <Zap className="w-4 h-4 text-amber-500" />;
    case 'Mechanical': return <Settings className="w-4 h-4 text-slate-500" />;
    case 'Structural': return <Layers className="w-4 h-4 text-emerald-500" />;
    case 'Hardware': return <Wrench className="w-4 h-4 text-cyan-500" />;
    default: return <CircleDashed className="w-4 h-4 text-slate-400" />;
  }
};

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
  const p = node.partDetails;

  return (
    <div className="relative">
      <div 
        className={`flex items-center py-2 pr-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 transition-colors group`}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Expand/Collapse Icon */}
        <div className="w-5 h-5 flex items-center justify-center mr-1 text-slate-400 shrink-0 group-hover:text-indigo-500 transition-colors">
          {hasChildren ? (expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />) : <span className="w-4 h-4" />}
        </div>
        
        {/* Category Icon */}
        <div className="mr-3 shrink-0" title={p?.category}>
          {getCategoryIcon(p?.category)}
        </div>

        {/* Part Info */}
        <div className="flex-1 flex items-center gap-3 min-w-0">
          <span className="text-sm font-mono font-semibold text-slate-700 shrink-0 w-24">{node.child}</span>
          <span className="text-sm text-slate-900 truncate font-medium flex-1">{p?.name}</span>
          <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full shrink-0 border border-slate-200 w-16 text-center">Qty: {node.qty}</span>
          
          {/* Extra badges for large screens */}
          <div className="hidden md:flex items-center gap-4 ml-auto shrink-0">
            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider w-20 text-center ${p?.lifecycle === 'RELEASED' ? 'bg-emerald-100 text-emerald-700' : p?.lifecycle === 'IN_WORK' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
              {p?.lifecycle}
            </span>
            <span className="text-xs text-slate-500 w-24 truncate">{p?.supplier}</span>
            <span className="text-xs font-mono text-slate-600 w-16 text-right font-medium">${p?.cost?.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Children */}
      {expanded && hasChildren && (
        <div className="relative">
          {/* Vertical line connecting children */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" style={{ marginLeft: `${level * 1.5 + 1.125}rem` }}></div>
          <div>
            {node.children.map((child: any) => (
              <BOMNode key={child.child} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Project1BOM() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Find the root assembly (EV-1000)
  const rootAssembly = parts.find(p => p.category === 'Assembly' && p.id === 'EV-1000');
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
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">AI BOM Analyzer</h1>
          <p className="text-slate-500 mt-1">Visualize product structure and analyze complexity using GenAI.</p>
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Network className="w-4 h-4" />}
          Analyze BOM with AI
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 flex-1 min-h-0">
        {/* Left: BOM Tree */}
        <div className="xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center">
            <h2 className="font-medium text-slate-800 flex-1">Product Structure (eBOM)</h2>
            <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider pr-4">
              <span className="w-16 text-center">Qty</span>
              <span className="w-20 text-center">Lifecycle</span>
              <span className="w-24">Supplier</span>
              <span className="w-16 text-right">Cost</span>
            </div>
          </div>
          <div className="overflow-auto flex-1 p-2">
            {rootAssembly && (
              <div className="relative">
                <div className="flex items-center py-2 px-3 bg-indigo-50/50 rounded-md border border-indigo-100 mb-1">
                  <div className="w-5 h-5 flex items-center justify-center mr-1 text-indigo-500 shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="mr-3 shrink-0">
                    <Box className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 flex items-center gap-3 min-w-0">
                    <span className="text-sm font-mono font-bold text-indigo-900 shrink-0 w-24">{rootAssembly.id}</span>
                    <span className="text-sm text-indigo-900 truncate font-bold flex-1">{rootAssembly.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full shrink-0 border border-indigo-200 w-16 text-center">Qty: 1</span>
                    
                    <div className="hidden md:flex items-center gap-4 ml-auto shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider w-20 text-center ${rootAssembly.lifecycle === 'RELEASED' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {rootAssembly.lifecycle}
                      </span>
                      <span className="text-xs text-indigo-700 w-24 truncate">{rootAssembly.supplier}</span>
                      <span className="text-xs font-mono text-indigo-900 w-16 text-right font-bold">${rootAssembly.cost?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" style={{ marginLeft: '1.125rem' }}></div>
                  <div>
                    {tree.map((node) => (
                      <BOMNode key={node.child} node={node} level={1} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Analysis */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-900 text-white">
            <h2 className="font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              AI Analysis Report
            </h2>
          </div>
          <div className="p-6 overflow-auto flex-1 prose prose-slate prose-sm max-w-none bg-slate-50/50">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
                <p>Analyzing BOM complexity and supplier data...</p>
                <p className="text-xs mt-2 text-slate-400">This may take a few seconds.</p>
              </div>
            ) : analysis ? (
              <div className="markdown-body">
                <Markdown>{analysis}</Markdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center px-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Network className="w-8 h-8 text-slate-300" />
                </div>
                <p className="font-medium text-slate-600 mb-1">No Analysis Generated</p>
                <p className="text-sm">Click the "Analyze BOM with AI" button above to generate insights on cost, supply chain, and structure.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
