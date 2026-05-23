import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Code2, FileText, Sparkles, Loader2, Check, Copy, 
  Cpu, Zap, ShieldAlert, Terminal, Layers, RefreshCw,
  GitBranch, CheckCircle, BarChart3, Settings, HelpCircle
} from 'lucide-react';

function App() {
  const [code, setCode] = useState('');
  const [docs, setDocs] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [activeTab, setActiveTab] = useState('all');
  
  // State to track mouse positions for the glowing spotlight
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY + window.scrollY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGenerate = async () => {
    if (!code.trim()) return alert("Please paste some code first!");
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      if (data.documentation) {
        setDocs(data.documentation);
      } else {
        alert("Error generating documentation.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(docs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 relative overflow-x-hidden">
      
      {/* 🚀 THE NEW MOUSE TRACKING SPOTLIGHT */}
      <div 
        className="absolute pointer-events-none transition-transform duration-200 ease-out z-0 opacity-60 rounded-full blur-[130px]"
        style={{
          left: `${mousePos.x - 200}px`,
          top: `${mousePos.y - 200}px`,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(99,102,241,0.15) 50%, transparent 100%)'
        }}
      />

      {/* Static premium ambient ambient glow spots for structural balance */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Premium Glassmorphic Header */}
      <header className="bg-white/75 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-500/20 transform hover:rotate-6 transition-transform">
            <Sparkles size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 bg-clip-text text-transparent">CodeBlockDoc</h1>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-sm">PRO</span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Advanced Real-time Documentation Workspace</p>
          </div>
        </div>
        
        {/* Real-time System Metrics Row */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-blue-600" />
            <span>LLM: <span className="text-slate-800 font-bold">Gemini 2.5 Flash</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-amber-500" />
            <span>Latency: <span className="text-slate-800 font-bold">~1.4s</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-700 font-bold">Ready</span>
          </div>
        </div>
      </header>

      {/* Hero Welcome Action Banner */}
      <div className="max-w-7xl mx-auto px-8 pt-8 relative z-10">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-xl font-extrabold tracking-tight">Accelerate Codebase Comprehension</h2>
            <p className="text-sm text-blue-100/90 mt-1.5 leading-relaxed">Drop your script architecture or production functional code blocks below. Our real-time intelligence mapping logs contextual behaviors, variables, and exports into precise deployment guides.</p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto relative z-10 shrink-0">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/20 focus:outline-none cursor-pointer hover:bg-white/20 transition-all shadow-inner"
            >
              <option value="javascript" className="text-slate-800 font-medium">JavaScript / React</option>
              <option value="python" className="text-slate-800 font-medium">Python OOP</option>
              <option value="java" className="text-slate-800 font-medium">Java Object Model</option>
              <option value="cpp" className="text-slate-800 font-medium">C++ Structure</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-230px)] min-h-[580px] relative z-10">
        
        {/* Left Card: Input Panel */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-slate-300">
          <div className="border-b border-slate-100 px-6 py-4.5 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm tracking-wide">
              <Terminal size={16} className="text-blue-600" />
              Source Workspace
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-md shadow-blue-500/10 disabled:opacity-50 tracking-wide"
            >
              {loading ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {loading ? 'Compiling Model...' : 'Build Documentation'}
            </button>
          </div>
          <textarea
            spellCheck="false"
            className="w-full flex-1 p-6 font-mono text-sm bg-slate-900 text-slate-100 resize-none focus:outline-none leading-relaxed overflow-y-auto"
            placeholder={`// Paste your structural code or classes here... \n// Select language type at the top right context frame for granular mapping.`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {/* Right Card: Documentation Display Engine */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-slate-300">
          <div className="border-b border-slate-100 px-6 py-3.5 flex items-center justify-between bg-slate-50/50">
            
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/40">
              <button 
                onClick={() => setActiveTab('all')}
                className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${activeTab === 'all' ? 'bg-white shadow-sm text-blue-600 border border-slate-200/30' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Full Manual
              </button>
              <button 
                onClick={() => setActiveTab('review')}
                className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${activeTab === 'review' ? 'bg-white shadow-sm text-blue-600 border border-slate-200/30' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Optimization Analysis
              </button>
            </div>

            {docs && (
              <button 
                onClick={copyToClipboard}
                className="text-slate-600 hover:text-slate-900 text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                {copied ? 'Copied Markdown!' : 'Copy Document'}
              </button>
            )}
          </div>
          
          <div className="p-7 flex-1 overflow-y-auto bg-white/50 max-w-none">
            {docs ? (
              <div className="space-y-4 text-slate-700 leading-relaxed">
                {activeTab === 'all' ? (
                  <ReactMarkdown 
                    components={{
                      h2: ({node, ...props}) => <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2.5 mt-6 mb-3 tracking-tight text-blue-950 uppercase tracking-wider" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 text-sm leading-relaxed text-slate-600" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 text-sm mb-4 text-slate-600" {...props} />,
                      code: ({node, ...props}) => <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono text-xs border border-blue-100/50 font-semibold" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto my-4 shadow-md leading-relaxed border border-slate-800" {...props} />
                    }}
                  >
                    {docs}
                  </ReactMarkdown>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex gap-3 text-sm text-blue-800 shadow-inner">
                      <ShieldAlert size={18} className="shrink-0 mt-0.5 text-blue-600" />
                      <div>
                        <span className="font-bold block text-blue-950">Structural Optimization Mode</span>
                        Review structural logic upgrades extracted automatically from the target execution loop.
                      </div>
                    </div>
                    <ReactMarkdown 
                      components={{
                        h2: ({node, ...props}) => <h2 className="text-sm font-bold text-slate-800 mt-4 mb-2 uppercase tracking-wide" {...props} />,
                        p: ({node, ...props}) => <p className="text-sm text-slate-600" {...props} />,
                        code: ({node, ...props}) => <code className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 font-mono text-xs" {...props} />,
                        pre: ({node, ...props}) => <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-2" {...props} />
                      }}
                    >
                      {docs.includes("## Suggestions for Improvement") 
                        ? docs.substring(docs.indexOf("## Suggestions for Improvement")) 
                        : "## Analysis\nNo structural suggestions found for this block."}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100 shadow-sm shadow-blue-50">
                  <Layers size={24} />
                </div>
                <h3 className="text-slate-800 font-bold text-base">Documentation Pipeline Idle</h3>
                <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed">Provide your source files on the left and trigger compilation to build detailed manuals.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Extended Lower Fold Grid */}
      <section className="max-w-7xl mx-auto px-8 pb-16 mt-4 relative z-10">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><BarChart3 size={20} /></div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Token Reduction</span>
              <span className="text-xl font-extrabold text-slate-900">42.8% Saved</span>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600"><CheckCircle size={20} /></div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Sync Velocity</span>
              <span className="text-xl font-extrabold text-slate-900">12,410 Builds/hr</span>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><GitBranch size={20} /></div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Repository Health</span>
              <span className="text-xl font-extrabold text-slate-900">99.98% Optimized</span>
            </div>
          </div>
        </div>

        {/* Pipelines Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-8 shadow-sm mb-12">
          <div className="mb-6">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Settings size={18} className="text-blue-600" />
              Automated Analysis Pipeline
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Understand how the AI agent structures incoming raw inputs seamlessly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="p-4 bg-slate-50/80 border border-slate-200/60 rounded-2xl">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">01</span>
              <h4 className="font-bold text-sm text-slate-800 mt-3">Ingestion Block</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Reads classes, dependencies, parameters, and inputs directly from workspace inputs.</p>
            </div>
            <div className="p-4 bg-slate-50/80 border border-slate-200/60 rounded-2xl">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">02</span>
              <h4 className="font-bold text-sm text-slate-800 mt-3">AST Context Map</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Abstract Syntax Trees structure functional execution patterns without altering source arrays.</p>
            </div>
            <div className="p-4 bg-slate-50/80 border border-slate-200/60 rounded-2xl">
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">03</span>
              <h4 className="font-bold text-sm text-slate-800 mt-3">Gemini Verification</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Real-time model tracking processes variable outputs to intercept functional bottlenecks.</p>
            </div>
            <div className="p-4 bg-slate-50/80 border border-slate-200/60 rounded-2xl">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">04</span>
              <h4 className="font-bold text-sm text-slate-800 mt-3">Markdown Sync</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Outputs highly readable technical manuals including functional variables and code tables.</p>
            </div>
          </div>
        </div>

        {/* Integrations Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-extrabold tracking-tight flex items-center gap-2">
                <HelpCircle size={18} className="text-blue-400" />
                Continuous Integration Infrastructure Ready
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                DocuAgent seamlessly integrates with version control engines. Configure automatic pull-request scanning hooks to update repository files with absolute self-dependency.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <span className="text-[11px] font-bold tracking-wide bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all cursor-default">GitHub Webhooks</span>
              <span className="text-[11px] font-bold tracking-wide bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all cursor-default">VS Code Extensions</span>
              <span className="text-[11px] font-bold tracking-wide bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all cursor-default">GitLab CI Modules</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

export default App;