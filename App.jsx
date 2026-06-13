const { useState, useEffect } = React;
const {
  BookOpen, Award, Trophy, Settings, RotateCcw, CheckCircle, XCircle, Play,
  ChevronRight, ChevronLeft, Activity, Heart, Plus, FileText, Sparkles,
  HelpCircle, User, ArrowRight, ShieldAlert, Dna, RefreshCw, Search, Eye,
  Check, Star, Compass
} = lucideReact;

function App() {
  // State Management
  const [activeTab, setActiveTab] = useState('home');
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('med_tech_student_name') || '';
  });
  const [showNameModal, setShowNameModal] = useState(!studentName);
  const [progress, setProgress] = useState({
    preTestCompleted: false,
    preTestScore: null,
    lesson1Read: false,
    lesson1QuizScore: null,
    lesson2Read: false,
    lesson2QuizScore: null,
    lesson3Read: false,
    lesson3QuizScore: null,
    finalTestScore: null,
    gamesPlayed: {
      match: false,
      memory: false,
      wheel: false,
    },
    badges: []
  });

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('med_tech_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress helper
  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('med_tech_progress', JSON.stringify(newProgress));
  };

  // Student level based on scores
  const getScorePercentage = () => {
    let completedSteps = 0;
    let totalSteps = 7; // preTest, L1 read, L1 quiz, L2 read, L2 quiz, L3 read, final test
    if (progress.preTestCompleted) completedSteps++;
    if (progress.lesson1Read) completedSteps++;
    if (progress.lesson1QuizScore !== null) completedSteps++;
    if (progress.lesson2Read) completedSteps++;
    if (progress.lesson2QuizScore !== null) completedSteps++;
    if (progress.lesson3Read) completedSteps++;
    if (progress.finalTestScore !== null) completedSteps++;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  // Badges Earned Helper
  const getBadges = () => {
    let badgesList = [];
    if (progress.preTestCompleted) badgesList.push({ id: 'explorer', name: 'المستكشف الأول', icon: '🔍', desc: 'لإتمام الاختبار القبلي' });
    if (progress.lesson1QuizScore >= 80) badgesList.push({ id: 'pharmacist', name: 'مكتشف الدواء', icon: '💊', desc: 'لتفوقك في درس صناعة الدواء' });
    if (progress.lesson2QuizScore >= 80) badgesList.push({ id: 'biomed', name: 'خبير الأجهزة', icon: '⚡', desc: 'لتفوقك في درس الأجهزة الطبية' });
    if (progress.lesson3QuizScore >= 80) badgesList.push({ id: 'prosthetics', name: 'بطل العون', icon: '🦾', desc: 'لتفوقك في درس الأجهزة التعويضية' });
    if (progress.finalTestScore >= 90) badgesList.push({ id: 'genius', name: 'ابن سينا الصغير', icon: '👑', desc: 'للحصول على درجة ممتازة بالامتحان النهائي' });
    return badgesList;
  };

  // Handle Name Submission
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (studentName.trim()) {
      localStorage.setItem('med_tech_student_name', studentName.trim());
      setShowNameModal(false);
    }
  };

  // Reset Progress helper
  const resetAllProgress = () => {
    const fresh = {
      preTestCompleted: false,
      preTestScore: null,
      lesson1Read: false,
      lesson1QuizScore: null,
      lesson2Read: false,
      lesson2QuizScore: null,
      lesson3Read: false,
      lesson3QuizScore: null,
      finalTestScore: null,
      gamesPlayed: {
        match: false,
        memory: false,
        wheel: false,
      },
      badges: []
    };
    saveProgress(fresh);
    localStorage.removeItem('med_tech_student_name');
    setStudentName('');
    setShowNameModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased selection:bg-teal-500 selection:text-white" dir="rtl">
      
      {/* Name Input Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-slate-900/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border-4 border-teal-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full -mr-16 -mt-16 -z-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100 rounded-full -ml-16 -mb-16 -z-10 opacity-50"></div>
            
            <div className="text-6xl mb-4">🧑‍⚕️</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">أهلاً بك يا بطل المستقبل!</h2>
            <p className="text-slate-600 mb-6 text-sm">
              مرحباً بك في رحلة "التكنولوجيا الطبية" الممتعة للصف السادس الأساسي حسب المنهاج الفلسطيني. اكتب اسمك لنبدأ المغامرة معاً!
            </p>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="اكتب اسمك الثلاثي هنا..."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-center text-lg font-bold transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-l from-teal-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-teal-600 hover:to-emerald-700 shadow-md transform hover:-translate-y-0.5 transition-all text-lg flex items-center justify-center gap-2"
              >
                <span>ابدأ رحلة التعلم التفاعلية</span>
                <ChevronLeft className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Top Banner (Palestine Ministry of Education & Mascot Greeting) */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white shadow-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇵🇸</span>
            <div>
              <h1 className="text-sm font-semibold tracking-wide opacity-90">وزارة التربية والتعليم الفلسطينية</h1>
              <p className="text-xs opacity-75">موقع تفاعلي مساند للمنهاج الفلسطيني - الصف السادس الأساسي</p>
            </div>
          </div>
          {studentName && (
            <div className="bg-white/10 hover:bg-white/15 transition-all px-4 py-1.5 rounded-full flex items-center gap-2 text-sm backdrop-blur-sm border border-white/20">
              <span className="animate-bounce">👋</span>
              <span>أهلاً بك يا بطل المشفى: <strong className="text-amber-300 font-extrabold">{studentName}</strong></span>
              <button 
                onClick={resetAllProgress} 
                className="text-xs text-red-200 hover:text-red-100 mr-2 border-r border-white/20 pr-2 flex items-center gap-1"
                title="إعادة تعيين الرحلة وتغيير الاسم"
              >
                <RotateCcw className="w-3 h-3" /> إعادة الضبط
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation & Brand Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-teal-100 text-teal-600 p-3 rounded-2xl animate-pulse">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-800 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">التكنولوجيا الطبية</span>
                <div className="text-[10px] text-slate-500 font-bold tracking-wider">الوحدة الثالثة - الصف السادس الأساسي</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden lg:flex space-x-reverse space-x-1 items-center">
              <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<BookOpen className="w-4 h-4" />}>الرئيسية</NavButton>
              <NavButton active={activeTab === 'pretest'} onClick={() => setActiveTab('pretest')} icon={<Compass className="w-4 h-4 text-orange-500" />}>الاختبار القبلي</NavButton>
              <NavButton active={activeTab === 'lesson1'} onClick={() => setActiveTab('lesson1')} icon={<Dna className="w-4 h-4 text-teal-500" />}>صناعة الدواء</NavButton>
              <NavButton active={activeTab === 'lesson2'} onClick={() => setActiveTab('lesson2')} icon={<Activity className="w-4 h-4 text-blue-500" />}>الأجهزة الطبية</NavButton>
              <NavButton active={activeTab === 'lesson3'} onClick={() => setActiveTab('lesson3')} icon={<Heart className="w-4 h-4 text-rose-500" />}>الأطراف البديلة</NavButton>
              <NavButton active={activeTab === 'games'} onClick={() => setActiveTab('games')} icon={<Sparkles className="w-4 h-4 text-amber-500" />}>واحة الألعاب</NavButton>
              <NavButton active={activeTab === 'finaltest'} onClick={() => setActiveTab('finaltest')} icon={<Trophy className="w-4 h-4 text-indigo-500" />}>الامتحان النهائي</NavButton>
              <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<User className="w-4 h-4 text-purple-500" />}>لوحتي</NavButton>
            </nav>

            {/* Mobile Menu Trigger Icon */}
            <div className="flex items-center lg:hidden">
              <select 
                value={activeTab} 
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-slate-100 text-slate-800 font-bold rounded-xl px-3 py-2 border-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="home">🏠 الرئيسية</option>
                <option value="pretest">🔍 الاختبار القبلي</option>
                <option value="lesson1">💊 درس 1: الدواء</option>
                <option value="lesson2">⚡ درس 2: الأجهزة</option>
                <option value="lesson3">🦾 درس 3: التعويضات</option>
                <option value="games">🎮 واحة الألعاب</option>
                <option value="finaltest">🏆 الامتحان النهائي</option>
                <option value="dashboard">📊 لوحة تقدمي</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Educational Interface Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Progress Tracker Card */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl">🌟</div>
            <div>
              <h4 className="font-bold text-slate-700 text-sm">معدل الإنجاز في وحدة التكنولوجيا الطبية:</h4>
              <p className="text-xs text-slate-400">أكمل الأنشطة والدروس لترفع رصيدك وتكسب الشارة الذهبية!</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center gap-3">
            <div className="w-full bg-slate-100 rounded-full h-4 relative overflow-hidden">
              <div 
                className="bg-gradient-to-l from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${getScorePercentage()}%` }}
              ></div>
            </div>
            <span className="font-bold text-teal-600 text-lg whitespace-nowrap">{getScorePercentage()}%</span>
          </div>
        </div>

        {/* Dynamic Navigation Pages/Tabs */}
        <div className="animate-fade-in">
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} studentName={studentName} progress={progress} />}
          {activeTab === 'pretest' && <PreTestView progress={progress} saveProgress={saveProgress} />}
          {activeTab === 'lesson1' && <LessonOneView progress={progress} saveProgress={saveProgress} />}
          {activeTab === 'lesson2' && <LessonTwoView progress={progress} saveProgress={saveProgress} />}
          {activeTab === 'lesson3' && <LessonThreeView progress={progress} saveProgress={saveProgress} />}
          {activeTab === 'games' && <GamesView progress={progress} saveProgress={saveProgress} />}
          {activeTab === 'finaltest' && <FinalTestView studentName={studentName} progress={progress} saveProgress={saveProgress} />}
          {activeTab === 'dashboard' && <DashboardView studentName={studentName} progress={progress} resetAllProgress={resetAllProgress} />}
        </div>
      </main>

      {/* Mascot Assistant Floating Bubble */}
      <div className="bg-teal-50 border-t border-teal-100 py-4 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-4xl animate-bounce">🧑‍⚕️</span>
          <div className="text-right">
            <h5 className="font-bold text-teal-800 text-sm">المرشد الذكي: الحكيم سمير</h5>
            <p className="text-xs text-teal-600">"أهلاً بكم يا فرسان المستقبل، التكنولوجيا الطبية ليست مجرد علم، بل هي الأداة التي ننقذ بها حياة الإنسان ونرسم بها الابتسامة على وجوه المرضى في فلسطين والعالم!"</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
        <p className="font-bold text-slate-300">موقع المناهج التفاعلية - فلسطين الحبيبة 🇵🇸</p>
        <p className="text-xs mt-1 text-slate-500">تم التطوير لأغراض تعليمية لطلبة المدارس لتسهيل فهم مادة التكنولوجيا الطبية للصف السادس الأساسي.</p>
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <span>مدرسة دكتور جلال الدين التفاعلية</span>
          <span>•</span>
          <span>تكنولوجيا التعليم والتعلم الذاتي</span>
        </div>
      </footer>
    </div>
  );
}

// Sub Component: Navigation Buttons
function NavButton({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
        active 
          ? 'bg-teal-500 text-white shadow-sm shadow-teal-500/25' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

// 1. HOME VIEW
function HomeView({ setActiveTab, studentName, progress }) {
  return (
    <div className="space-y-8">
      {/* Hero Showcase Block */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100/50 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>المنهاج الفلسطيني المطور</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 leading-tight">
            بوابة التكنولوجيا الطبية <br />
            <span className="text-teal-600">الصف السادس الأساسي</span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            مرحباً بك يا <strong className="text-teal-700">{studentName || 'صديقنا البطل'}</strong> في هذا العالم الرائع! سوف نستكشف معاً كيف ساهمت التكنولوجيا في تطور الدواء، وصناعة الأجهزة الطبية الفائقة، وابتكار الأطراف البديلة لمساعدة المرضى ومصابي الحروب في غزة وفلسطين الغالية.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveTab('pretest')} 
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>ابدأ الاختبار القبلي أولاً</span>
              <Compass className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('lesson1')} 
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-slate-200 shadow-sm transition-all flex items-center gap-2"
            >
              <span>تصفح الدرس الأول</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Creative SVG Illustration as Educational Banner */}
        <div className="flex-1 w-full max-w-sm lg:max-w-md bg-white p-6 rounded-2xl shadow-md border border-slate-100 relative">
          <div className="absolute top-2 left-2 bg-rose-100 text-rose-600 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Heart className="w-3 h-3 fill-rose-500" /> نبض تفاعلي
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="w-48 h-48 text-teal-500">
              {/* Central Heartbeat */}
              <path d="M 20,100 L 60,100 L 70,80 L 80,120 L 90,100 L 110,100 L 120,50 L 130,150 L 140,100 L 180,100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-dash" />
              {/* Floating Capsules */}
              <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                <rect x="30" y="30" width="15" height="30" rx="7.5" fill="#f43f5e" transform="rotate(30 30 30)" />
                <rect x="30" y="45" width="15" height="15" fill="#38bdf8" transform="rotate(30 30 30)" />
              </g>
              <g className="animate-bounce" style={{ animationDuration: '5s' }}>
                <circle cx="160" cy="40" r="12" fill="#10b981" />
                <path d="M 155,40 H 165 M 160,35 V 145" stroke="#fff" strokeWidth="2" />
              </g>
            </svg>
            {/* Overlay Character */}
            <div className="absolute bottom-3 right-3 bg-teal-600 text-white text-xs p-2.5 rounded-lg shadow-sm font-bold flex items-center gap-1.5">
              <span>🩺 د. مرح: جاهزة لمساعدتكم!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-500" />
          <span>ماذا سوف نتعلم في هذه الوحدة المتميزة؟</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100/50">
            <span className="text-2xl mb-2 block">1️⃣</span>
            <h4 className="font-bold text-slate-800 mb-1">تطور صناعة الأدوية</h4>
            <p className="text-xs text-slate-500 leading-relaxed">كيف تساهم تجارب البحث العلمي في علاج الأوبئة وابتكار الأدوية بفضل التكنولوجيا والمنهجية العلمية.</p>
          </div>
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
            <span className="text-2xl mb-2 block">2️⃣</span>
            <h4 className="font-bold text-slate-800 mb-1">أجهزة التشخيص والعلاج</h4>
            <p className="text-xs text-slate-500 leading-relaxed">التمييز بين الأجهزة التي تكشف الأمراض (الأشعة، الإيكو) والأجهزة التي تعالج كالفبريليتر لإنقاذ نبض القلوب.</p>
          </div>
          <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100/50">
            <span className="text-2xl mb-2 block">3️⃣</span>
            <h4 className="font-bold text-slate-800 mb-1">الأطراف والوسائل التعويضية</h4>
            <p className="text-xs text-slate-500 leading-relaxed">التعرف على معجزة الأطراف الصناعية الذكية والوسائل التعويضية التي تدعم همم الأبطال الذين واجهوا مصاعب الحياة.</p>
          </div>
        </div>
      </div>

      {/* Course Unit Map / Cards */}
      <h3 className="text-2xl font-black text-slate-800 mb-4">📚 دروس الوحدة الثالثة</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Lesson 1 Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col">
          <div className="h-4 bg-gradient-to-l from-emerald-400 to-teal-500"></div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">الدرس الأول</span>
                {progress.lesson1Read && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">مكتمل ✅</span>}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">البحث العلمي وتطور صناعة الدواء</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                تتبع مراحل تصنيع الدواء، ودور العلماء في كشف علاجات الأمراض من البنسلين حتى العصر الحديث في فلسطين.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('lesson1')} 
              className="w-full bg-slate-50 hover:bg-teal-500 hover:text-white transition-all text-teal-600 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1"
            >
              <span>دخول الدرس الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lesson 2 Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col">
          <div className="h-4 bg-gradient-to-l from-blue-400 to-indigo-500"></div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">الدرس الثاني</span>
                {progress.lesson2Read && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">مكتمل ✅</span>}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">تكنولوجيا الأجهزة الطبية</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                استكشف غرف المشافي الفلسطينية وتعرف على تصنيف الأجهزة الطبية إلى تشخيصية وعلاجية بدقة بالغة.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('lesson2')} 
              className="w-full bg-slate-50 hover:bg-blue-500 hover:text-white transition-all text-blue-600 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1"
            >
              <span>دخول الدرس الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lesson 3 Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col">
          <div className="h-4 bg-gradient-to-l from-rose-400 to-pink-500"></div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">الدرس الثالث</span>
                {progress.lesson3Read && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">مكتمل ✅</span>}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">الأجهزة التعويضية والوسائل المساعدة</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                تعرف على الأطراف الصناعية الذكية والوسائل التي تعيد الأمل لأفراد مجتمعنا وتعزز ثقتهم بأنفسهم.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('lesson3')} 
              className="w-full bg-slate-50 hover:bg-rose-500 hover:text-white transition-all text-rose-600 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1"
            >
              <span>دخول الدرس الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// 2. PRE-TEST VIEW (الاختبار القبلي)
function PreTestView({ progress, saveProgress }) {
  const questions = [
    {
      id: 1,
      q: "ما هي المهمة الأساسية للأجهزة الطبية التشخيصية؟",
      options: ["صرف الدواء للمريض تلقائياً", "مساعدة الطبيب في الكشف ومعرفة سبب المرض", "إجراء عمليات جراحية معقدة", "تصنيع الغذاء للمصابين"],
      ans: 1
    },
    {
      id: 2,
      q: "من هو مكتشف البنسلين الذي يعتبر أول مضاد حيوي في التاريخ؟",
      options: ["ابن سينا", "ألكسندر فلمنج", "توماس إديسون", "ألبرت أينشتاين"],
      ans: 1
    },
    {
      id: 3,
      q: "ما الهدف الأساسي من الأطراف التعويضية؟",
      options: ["تزيين شكل الإنسان فقط", "تعويض جزء مفقود من الجسم واستعادة وظيفته قدر الإمكان", "تخفيض وزن المريض", "علاج الأمراض المعدية بالكامل"],
      ans: 1
    }
  ];

  const [currentScore, setCurrentScore] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.ans) {
        score += 1;
      }
    });
    const finalScore = Math.round((score / questions.length) * 100);
    setCurrentScore(finalScore);
    setSubmitted(true);

    const updated = {
      ...progress,
      preTestCompleted: true,
      preTestScore: finalScore
    };
    saveProgress(updated);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 max-w-3xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <span className="text-4xl">🎯</span>
        <h2 className="text-2xl font-black text-slate-800">الاختبار التشخيصي القبلي</h2>
        <p className="text-slate-500 text-xs">دعنا نكتشف معلوماتك العامة والسابقة عن التكنولوجيا الطبية قبل البدء بالرحلة الممتعة!</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="font-bold text-slate-800 mb-3 flex gap-2">
                <span className="text-teal-600">{idx + 1}.</span>
                <span>{q.q}</span>
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt, optIdx) => (
                  <label key={optIdx} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    answers[q.id] === optIdx 
                      ? 'border-teal-500 bg-teal-50 text-teal-800 font-bold' 
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                  }`}>
                    <input 
                      type="radio" 
                      name={`pre_${q.id}`} 
                      required
                      checked={answers[q.id] === optIdx}
                      onChange={() => setAnswers({...answers, [q.id]: optIdx})}
                      className="hidden" 
                    />
                    <span className="w-5 h-5 rounded-full border-2 border-teal-500 flex items-center justify-center text-xs">
                      {answers[q.id] === optIdx && "✓"}
                    </span>
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>أرسل إجاباتي الآن</span>
            <Check className="w-5 h-5" />
          </button>
        </form>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 text-3xl mb-2 font-bold animate-pulse">
            %{currentScore}
          </div>
          <h3 className="text-xl font-bold text-slate-800">أحسنت يا بطل! تم تسليم الاختبار</h3>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            درجتك هي <strong className="text-teal-600">{currentScore}%</strong>. لا تقلق إن كانت هنالك إجابات خاطئة، فهذه مجرد جولة قبليّة والآن حان الوقت لنتعلم كل الإجابات الصحيحة في الدروس القادمة!
          </p>
          <div className="p-4 bg-emerald-50 rounded-xl max-w-sm mx-auto border border-emerald-100 text-emerald-800 text-xs">
            🎉 حصلت الآن على شارة <strong>"المستكشف الأول"</strong> في لوحة تحكمك!
          </div>
        </div>
      )}
    </div>
  );
}

// 3. LESSON 1 VIEW
function LessonOneView({ progress, saveProgress }) {
  const [activeStep, setActiveStep] = useState(1);
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [matchResult, setMatchResult] = useState(null);
  
  // Drag and Drop (Stages of Drug Industry) simulation using simple interactive clicks
  const [selectedStage, setSelectedStage] = useState(null);
  const [sortedStages, setSortedStages] = useState([]);
  const [dragFeedback, setDragFeedback] = useState("");

  const originalStages = [
    { id: '1', step: 'البحث والتحقق', desc: 'تحديد خصائص الميكروب المسبب للمرض ومعرفة المادة الفعالة لمعالجته.' },
    { id: '2', step: 'التجريب المخبري', desc: 'تجربة المادة الفعالة في المختبرات وعلى عينات الأنسجة لضمان كفاءتها الأولية.' },
    { id: '3', step: 'التجارب السريرية', desc: 'تجربة الدواء بجرعات دقيقة على متطوعين لمراقبة تأثيراته الجانبية وأمانه.' },
    { id: '4', step: 'الاعتماد والموافقة', desc: 'تقديم نتائج الأبحاث لجهات الرقابة والحصول على موافقة وزارة الصحة والنقابة.' },
    { id: '5', step: 'الإنتاج والبيع', desc: 'تصنيع الدواء في المصانع الكبرى بكميات كافية وتوزيعه بالصيدليات للمواطنين.' },
  ];

  // Handle stage sorting clicking
  const handleStageClick = (stage) => {
    if (sortedStages.find(s => s.id === stage.id)) return;
    const newSorted = [...sortedStages, stage];
    setSortedStages(newSorted);

    if (newSorted.length === originalStages.length) {
      // Check if order is correct
      const isCorrect = newSorted.every((s, idx) => s.id === originalStages[idx].id);
      if (isCorrect) {
        setDragFeedback("رائع! رتبت مراحل صناعة الدواء بشكل سليم وصحيح 100% 🧪✨");
        // Save progress for reading
        const updated = { ...progress, lesson1Read: true };
        saveProgress(updated);
      } else {
        setDragFeedback("الترتيب غير دقيق تماماً، حاول إعادة ترتيبها لتتبع التسلسل المنطقي الصحيح!");
      }
    }
  };

  const resetStageSort = () => {
    setSortedStages([]);
    setDragFeedback("");
  };

  // Lesson 1 Mini Quiz
  const [quizScore, setQuizScore] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  const lesson1Questions = [
    { id: 1, q: "ما هو العنصر الأساسي الذي تبدأ منه صناعة أي دواء جديد؟", opts: ["العلب البلاستيكية الفاخرة", "البحث العلمي والتحقق الطبي", "التسويق والإعلانات التجارية", "تصميم شعار الماركة"], ans: 1 },
    { id: 2, q: "لماذا نجري تجارب مخبرية وسريرية مكثفة قبل بيع الدواء؟", opts: ["لرفع سعر الدواء على المرضى", "لضمان أمان الدواء وسلامة المرضى من السمية", "لمجرد التسلية وتضييع الوقت", "لكي تنتهي صلاحيته بسرعة"], ans: 1 },
    { id: 3, q: "أي من مصانع الأدوية التالية يمثل فخراً للصناعة الدوائية الفلسطينية؟", opts: ["مصنع وادي جالا ودار الشفاء", "مصنع فولكس واجن الألماني", "مستشفى المقاصد كجهة صناعية", "محطات تحلية المياه بالكامل"], ans: 0 },
  ];

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    lesson1Questions.forEach(q => {
      if (quizAnswers[q.id] === q.ans) score++;
    });
    const pct = Math.round((score / lesson1Questions.length) * 100);
    setQuizScore(pct);
    setQuizSubmitted(true);
    
    const updated = {
      ...progress,
      lesson1QuizScore: pct
    };
    saveProgress(updated);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <span className="text-xs font-bold bg-teal-100 text-teal-800 px-3 py-1 rounded-full">الدرس الأول تفصيلياً</span>
        <h2 className="text-2xl font-black text-slate-800 mt-2 mb-4">البحث العلمي وتطور صناعة الدواء 💊</h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-4xl">
          هل تساءلت يوماً كيف تنقذ حبة دواء صغيرة حياة ملايين البشر؟ كان العالم قديماً يموت جراء التهاب بسيط أو جرح بسيط، حتى ظهرت التكنولوجيا الطبية وثورة البحث العلمي لتغير مجرى التاريخ البشري بالكامل!
        </p>

        {/* Lesson Sub Tabs */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          <button onClick={() => setActiveStep(1)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 1 ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>1. القصة والاكتشاف</button>
          <button onClick={() => setActiveStep(2)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 2 ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>2. مراحل صناعة الدواء التفاعلية</button>
          <button onClick={() => setActiveStep(3)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 3 ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>3. الدواء في فلسطين 🇵🇸</button>
          <button onClick={() => setActiveStep(4)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 4 ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>4. نشاط الترتيب والتقييم</button>
        </div>
      </div>

      {/* Content based on Active Step */}
      {activeStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-800 border-r-4 border-teal-500 pr-3">قصة اكتشاف أول مضاد حيوي (البنسلين)</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              في عام 1928، كان العالم الإسكتلندي <strong>ألكسندر فلمنج</strong> يجري تجارب على بكتيريا معينة في مختبره. ذهب في إجازة، وعند عودته لاحظ نمو فطر غريب يسمى (البنسليوم) على إحدى الأطباق، والمفاجأة الكبرى كانت أن البكتيريا حول الفطر قد تلاشت تماماً وماتت!
            </p>
            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 text-xs text-teal-800">
              💡 <strong>العبرة التربوية:</strong> البحث العلمي يرتكز على دقة الملاحظة، والتفكير المنطقي، فالفضول العلمي عند فلمنج حماه من إلقاء الطبق في النفايات، وصنع منه مكتشفاً لواحد من أعظم الأدوية التي أنقذت الملايين في الحرب العالمية الثانية!
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              الدواء عبارة عن مادة كيميائية تعطى للإنسان للوقاية من المرض، أو لتخفيف الأعراض، أو للقضاء الكامل على الكائن المسبب للمرض (بكتيريا، فيروسات).
            </p>
          </div>
          
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div>
              <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full font-bold">مختبر الفيديو الرقمي</span>
              <h4 className="text-base font-bold mt-2 text-teal-300">محاكاة مخبرية لاكتشاف فلمنج للبكتيريا</h4>
              <p className="text-xs text-slate-400 mt-2">شاهد هذه الرسوم البيانية التوضيحية لنمو الفطر ومحاربة البكتيريا:</p>
            </div>
            <div className="h-40 bg-slate-850 my-4 rounded-xl flex items-center justify-center border border-slate-800 relative">
              <div className="text-center space-y-2">
                <div className="flex justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 animate-ping">🦠</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-xl font-bold animate-pulse">🍄</div>
                </div>
                <div className="text-[11px] text-teal-400">الفطر يفرز مادة البنسلين ويقضي على البكتيريا الضارة!</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">ملاحظة: تساعد التكنولوجيا الحيوية اليوم في زراعة هذه الفطريات بكميات عملاقة داخل خزانات تخمير لإنتاج أطنان من المضادات الحيوية.</p>
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-r-4 border-teal-500 pr-3">المراحل الخمسة لصناعة الدواء بالتفصيل</h3>
          <p className="text-slate-600 text-xs">صناعة الدواء رحلة شاقة قد تستغرق 10 سنوات وتكلف ملايين الدولارات لضمان سلامتك! انقر على المراحل التالية للتعرف عليها بالتفصيل:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {originalStages.map((st, idx) => (
              <div key={st.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center hover:border-teal-500 transition-all cursor-pointer">
                <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mx-auto mb-2">{idx + 1}</span>
                <h4 className="font-bold text-slate-800 text-xs mb-1">{st.step}</h4>
                <p className="text-[10px] text-slate-500 line-clamp-3 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇵🇸</span>
            <h3 className="text-lg font-black text-slate-800">الصناعة الدوائية الوطنية الفلسطينية</h3>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            تمتلك فلسطين صناعة دوائية وطنية عريقة ومتميزة جداً برغم كل الصعاب والاحتلال الغاشم. تنتشر مصانع الأدوية في مدن مثل <strong>رام الله، بيت جالا، والبيرة</strong>، وتغطي أكثر من 50% من احتياجات السوق المحلي من الأدوية الأساسية والمضادات الحيوية، بل وتصدر لبعض الدول المجاورة وأوروبا!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100/80">
              <h4 className="font-bold text-emerald-800 text-xs mb-2">🏭 أهم الشركات الفلسطينية:</h4>
              <ul className="text-xs text-emerald-700 space-y-1.5 list-disc list-inside">
                <li>شركة بيت جالا لصناعة الأدوية (تأسست عام 1969).</li>
                <li>شركة دار الشفاء لصناعة الأدوية في رام الله والبيرة.</li>
                <li>شركة القدس للمستحضرات الطبية.</li>
              </ul>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100/80">
              <h4 className="font-bold text-amber-800 text-xs mb-2">🛡️ جودة الدواء الفلسطيني:</h4>
              <p className="text-xs text-amber-700 leading-relaxed">
                تلتزم المصانع الفلسطينية بأعلى معايير التصنيع الجيد العالمية (GMP) وتخضع لرقابة صارمة من وزارة الصحة الفلسطينية لضمان منافسة الأدوية الأجنبية بكل جدارة وأمان.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeStep === 4 && (
        <div className="space-y-6">
          {/* Stage Sorting Game */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-2">🧩 لعبة التحدي: ترتيب مراحل صناعة الدواء</h3>
            <p className="text-slate-500 text-xs mb-4">انقر على المراحل التالية بالترتيب الصحيح من اليمين لليسار (أو من البداية للنهاية):</p>
            
            {/* Unsorted Items Pool */}
            <div className="flex flex-wrap gap-2 mb-6">
              {originalStages.map((stage) => {
                const isSelected = sortedStages.some(s => s.id === stage.id);
                return (
                  <button
                    key={stage.id}
                    disabled={isSelected}
                    onClick={() => handleStageClick(stage)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected 
                        ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed' 
                        : 'bg-white text-slate-700 border-slate-300 hover:border-teal-500 hover:bg-teal-50'
                    }`}
                  >
                    {stage.step}
                  </button>
                );
              })}
            </div>

            {/* Sorted Items Bucket */}
            <div className="bg-slate-50 p-4 rounded-2xl min-h-24 border border-dashed border-slate-300 flex flex-wrap gap-3 items-center justify-center">
              {sortedStages.length === 0 ? (
                <span className="text-slate-400 text-xs">اضغط على الخيارات أعلاه للترتيب هنا...</span>
              ) : (
                sortedStages.map((st, idx) => (
                  <div key={st.id} className="bg-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
                    <span>{idx + 1}. {st.step}</span>
                  </div>
                ))
              )}
            </div>

            {dragFeedback && (
              <p className={`mt-3 text-xs font-bold ${dragFeedback.includes("رائع") ? 'text-emerald-600' : 'text-rose-500'}`}>
                {dragFeedback}
              </p>
            )}

            {sortedStages.length > 0 && (
              <button 
                onClick={resetStageSort}
                className="mt-4 text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> إعادة المحاولة
              </button>
            )}
          </div>

          {/* Lesson 1 Mini Quiz Form */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-2">📋 اختبر فهمك في الدرس الأول</h3>
            <p className="text-slate-500 text-xs mb-6">أجب عن الأسئلة التالية لتثبيت معلومات الدواء!</p>

            {!quizSubmitted ? (
              <form onSubmit={handleQuizSubmit} className="space-y-4">
                {lesson1Questions.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-xs mb-3">{q.q}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.opts.map((opt, oIdx) => (
                        <label key={oIdx} className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                          quizAnswers[q.id] === oIdx ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold' : 'bg-white border-slate-200 text-slate-600'
                        }`}>
                          <input 
                            type="radio" 
                            name={`l1q_${q.id}`} 
                            required 
                            checked={quizAnswers[q.id] === oIdx}
                            onChange={() => setQuizAnswers({...quizAnswers, [q.id]: oIdx})}
                            className="hidden" 
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm">إرسال إجابات الدرس الأول</button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-bold mx-auto">%{quizScore}</div>
                <h4 className="font-bold text-slate-800 text-sm">تم تقديم تقييم الدرس الأول!</h4>
                <p className="text-xs text-slate-500">حصلت على درجة {quizScore}% في هذا الاختبار القصير.</p>
                <button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }} className="text-xs text-teal-600 hover:underline">إعادة المحاولة</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 4. LESSON 2 VIEW (تكنولوجيا الأجهزة الطبية)
function LessonTwoView({ progress, saveProgress }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const devices = [
    { name: "جهاز الأشعة السينية (X-Ray)", type: "تشخيصي", desc: "يستخدم أشعة كهرومغناطيسية قصيرة لتصوير العظام والكسور في الجسم بدقة عالية.", img: "🦴" },
    { name: "جهاز الأمواج فوق الصوتية (الإيكو)", type: "تشخيصي", desc: "يعتمد على أمواج صوتية عالية التردد لتصوير الأجنة داخل الرحم وفحص حركة القلب وأوعية الدم دون ضرر.", img: "🔊" },
    { name: "مخطط كهربائية القلب (ECG)", type: "تشخيصي", desc: "يرصد الإشارات الكهربائية للقلب على شكل رسوم بيانية لمعرفة سلامة النبض والمشاكل العضلية بالقلب.", img: "📈" },
    { name: "جهاز الصدمة الكهربائية (Defibrillator)", type: "علاجي", desc: "يعطي صدمة كهربائية منقذة للقلب المتوقف لاستعادة إيقاع ضرباته الطبيعي على الفور.", img: "⚡" },
    { name: "جهاز غسيل الكلى الاصطناعية", type: "علاجي", desc: "يقوم بتنقية وتصفية دم المريض من السموم والفضلات المتراكمة بدلاً من الكلية الطبيعية المريضة.", img: "💧" },
    { name: "الحاضنة الاصطناعية لحديثي الولادة", type: "علاجي", desc: "توفر بيئة دافئة ومعقمة ومحمية للأطفال الخدج (المولودين قبل وقتهم) مع تزويدهم بالأكسجين اللازم.", img: "👶" },
  ];

  // Game: Match Device to Class
  const [scoreGame, setScoreGame] = useState(0);
  const [gameStep, setGameStep] = useState(0);
  const [gameFeedback, setGameFeedback] = useState("");

  const gameQuestions = [
    { name: "جهاز الأشعة السينية", correct: "تشخيصي", hint: "يستخدمه الطبيب لمعرفة إن كان هناك كسر في اليد." },
    { name: "جهاز غسيل الكلى", correct: "علاجي", hint: "يقوم بوظيفة الكلية المريضة وينظف السموم بشكل دوري." },
    { name: "الحاضنة للأطفال الخدج", correct: "علاجي", hint: "توفر بيئة معقمة ومحمية للطفل ليتحسن نموه." },
    { name: "جهاز الأمواج فوق الصوتية (الإيكو)", correct: "تشخيصي", hint: "يستخدم لتصوير الجنين ورؤية حركته في بطن أمه." }
  ];

  const handleGameAnswer = (answer) => {
    const currentQ = gameQuestions[gameStep];
    if (answer === currentQ.correct) {
      setScoreGame(scoreGame + 1);
      setGameFeedback("إجابة ممتازة وصحيحة! 🥳👏");
    } else {
      setGameFeedback("أوبس! حاول مرة أخرى، فكر بوظيفة الجهاز.");
    }

    setTimeout(() => {
      setGameFeedback("");
      if (gameStep + 1 < gameQuestions.length) {
        setGameStep(gameStep + 1);
      } else {
        // Finished game
        setGameStep(-1);
        const updated = { ...progress, lesson2Read: true };
        saveProgress(updated);
      }
    }, 1500);
  };

  const resetDeviceGame = () => {
    setGameStep(0);
    setScoreGame(0);
    setGameFeedback("");
  };

  // Lesson 2 Quiz
  const [quizScore, setQuizScore] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  const lesson2Questions = [
    { id: 1, q: "أي من الأجهزة التالية يعتبر جهازاً تشخيصياً بحتاً؟", opts: ["جهاز غسيل الكلى", "جهاز الأشعة السينية (X-Ray)", "جهاز الصدمة الكهربائية", "الحاضنة للأطفال"], ans: 1 },
    { id: 2, q: "ما وظيفة الحاضنة للأطفال حديثي الولادة؟", opts: ["تسجيل نبضات قلب الطبيب", "توفير بيئة دافئة ومعقمة للطفل الخديج لحين اكتمال نموه", "غسل السموم من دم الطفل", "إجراء فحوصات الدم المخبرية"], ans: 1 },
    { id: 3, q: "الجهاز الذي يعيد ضربات القلب المتوقفة عبر صدمة منقذة هو:", opts: ["جهاز الإيكو", "مخطط كهربائية القلب", "جهاز الصدمة الكهربائية (Defibrillator)", "جهاز قياس ضغط الدم العادي"], ans: 2 }
  ];

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    lesson2Questions.forEach(q => {
      if (quizAnswers[q.id] === q.ans) score++;
    });
    const pct = Math.round((score / lesson2Questions.length) * 100);
    setQuizScore(pct);
    setQuizSubmitted(true);
    
    const updated = {
      ...progress,
      lesson2QuizScore: pct
    };
    saveProgress(updated);
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">الدرس الثاني تفصيلياً</span>
        <h2 className="text-2xl font-black text-slate-800 mt-2 mb-4">تكنولوجيا الأجهزة الطبية ⚡</h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          تنقسم الأجهزة الطبية في المستشفيات الفلسطينية والعالمية إلى قسمين رئيسيين: <strong>الأجهزة التشخيصية</strong> (التي تبحث وتكشف عن المرض) و <strong>الأجهزة العلاجية</strong> (التي تساهم في شفاء المريض ومكافحة مرضه مباشرة). دعنا نكتشفها معاً!
        </p>

        {/* Sub Navigation */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          <button onClick={() => setActiveStep(1)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 1 ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>1. موسوعة الأجهزة التفاعلية</button>
          <button onClick={() => setActiveStep(2)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 2 ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>2. لعبة التصنيف السريعة</button>
          <button onClick={() => setActiveStep(3)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 3 ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>3. اختبار الدرس الثاني</button>
        </div>
      </div>

      {/* Step 1: Devices Encyclopedia */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            <button onClick={() => setSelectedCategory('all')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${selectedCategory === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'}`}>الكل</button>
            <button onClick={() => setSelectedCategory('تشخيصي')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${selectedCategory === 'تشخيصي' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-600 border-slate-200'}`}>أجهزة تشخيصية 🔍</button>
            <button onClick={() => setSelectedCategory('علاجي')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${selectedCategory === 'علاجي' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-200'}`}>أجهزة علاجية 💊</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.filter(d => selectedCategory === 'all' || d.type === selectedCategory).map((dev, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-3xl">{dev.img}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dev.type === 'تشخيصي' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>{dev.type}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2">{dev.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{dev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Interactive Game */}
      {activeStep === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-lg font-black text-slate-800">🎮 لعبة: صنف الأجهزة الطبية</h3>
          <p className="text-slate-500 text-xs">ساعد الحكيم سمير في تصنيف الأجهزة الطبية لتنظيم مستودع المشفى!</p>

          {gameStep !== -1 ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-4xl block animate-bounce">⚡</span>
              <h4 className="text-base font-bold text-slate-800">{gameQuestions[gameStep].name}</h4>
              <p className="text-xs text-amber-600 font-bold bg-amber-50 p-2 rounded-lg inline-block">💡 تلميح: {gameQuestions[gameStep].hint}</p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => handleGameAnswer('تشخيصي')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-xs transition-all"
                >
                  جهاز تشخيصي 🔍
                </button>
                <button 
                  onClick={() => handleGameAnswer('علاجي')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs transition-all"
                >
                  جهاز علاجي 💊
                </button>
              </div>

              {gameFeedback && (
                <p className="text-xs font-bold text-teal-600 mt-2 animate-pulse">{gameFeedback}</p>
              )}
            </div>
          ) : (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3">
              <span className="text-4xl">🏆</span>
              <h4 className="font-bold text-emerald-800 text-base">رائع جداً! أنهيت تصنيف الأجهزة بنجاح</h4>
              <p className="text-xs text-emerald-600">أجبت بشكل صحيح على {scoreGame} من أصل {gameQuestions.length} أجهزة طبية!</p>
              <button onClick={resetDeviceGame} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all">العب مجدداً</button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Quiz */}
      {activeStep === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-2xl mx-auto">
          <h3 className="text-lg font-black text-slate-800 mb-2">📋 تقييم الدرس الثاني</h3>
          <p className="text-slate-500 text-xs mb-6">أجب عن الأسئلة القصيرة للحصول على الشارة الفضية للأجهزة!</p>

          {!quizSubmitted ? (
            <form onSubmit={handleQuizSubmit} className="space-y-4">
              {lesson2Questions.map((q) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 text-xs mb-3">{q.q}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {q.opts.map((opt, oIdx) => (
                      <label key={oIdx} className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                        quizAnswers[q.id] === oIdx ? 'bg-blue-50 border-blue-500 text-blue-800 font-bold' : 'bg-white border-slate-200 text-slate-600'
                      }`}>
                        <input 
                          type="radio" 
                          name={`l2q_${q.id}`} 
                          required 
                          checked={quizAnswers[q.id] === oIdx}
                          onChange={() => setQuizAnswers({...quizAnswers, [q.id]: oIdx})}
                          className="hidden" 
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm">تسليم إجابات الدرس الثاني</button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mx-auto">%{quizScore}</div>
              <h4 className="font-bold text-slate-800 text-sm">تم تقديم تقييم الدرس الثاني!</h4>
              <p className="text-xs text-slate-500">حصلت على درجة {quizScore}% في هذا التقييم البسيط.</p>
              <button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }} className="text-xs text-blue-600 hover:underline">إعادة المحاولة</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 5. LESSON 3 VIEW (الأجهزة التعويضية والوسائل المساعدة)
function LessonThreeView({ progress, saveProgress }) {
  const [activeStep, setActiveStep] = useState(1);

  // Success Stories (قصص نجاح من فلسطين)
  const stories = [
    {
      title: "قصة البطل يوسف من غزة الصامدة",
      desc: "فقد يوسف قدمه اليمنى جراء القصف المستمر على مدينته. بفضل مركز الأطراف الصناعية والتأهيل وبمساعدة المهندسين المحليين، تم تركيب طرف صناعي هيدروليكي ذكي مكنه من العودة إلى مقاعد الدراسة وممارسة هوايته المفضلة في لعب كرة القدم ليمثل فلسطين في المحافل الدولية لأصحاب الهمم العالية!",
      tags: ["غزة", "عزيمة لا تلين", "كرة قدم"]
    },
    {
      title: "قصة المعلمة هدى من الخليل",
      desc: "هدى معلمة لغة عربية متميزة ولدت بضعف شديد بالسمع. كادت تفقد الأمل في التعليم لولا استخدامها لـ (السماعة الطبية التعويضية الرقمية) التي ترشح الأصوات وتضخمها، مما جعلها من أفضل المعلمات إلقاءً وتواصلاً مع طالباتها داخل الصف.",
      tags: ["الخليل", "سماعة طبية", "بناء الأجيال"]
    }
  ];

  // Drag and Drop puzzle for Assistive Tools
  const [dragMatches, setDragMatches] = useState({
    "فقد السمع الكلي أو الجزئي": "",
    "فقدان اليد أو الذراع": "",
    "عدم القدرة على المشي": "",
  });
  const [matchStatus, setMatchStatus] = useState("");

  const handleDragSelection = (problem, tool) => {
    const updated = { ...dragMatches, [problem]: tool };
    setDragMatches(updated);

    // Check correctness
    if (updated["فقد السمع الكلي أو الجزئي"] === "سماعة طبية رقمية" &&
        updated["فقدان اليد أو الذراع"] === "طرف علوي ذكي" &&
        updated["عدم القدرة على المشي"] === "كرسي متحرك أو عكازات") {
      setMatchStatus("رائع جداً! تم توصيل كل مشكلة بالوسيلة التعويضية الملائمة لها تماماً! 🦾✅");
      const saved = { ...progress, lesson3Read: true };
      saveProgress(saved);
    } else {
      setMatchStatus("أحد الاختيارات غير دقيقة، أكمل التوصيل بالشكل الصحيح.");
    }
  };

  // Lesson 3 Quiz
  const [quizScore, setQuizScore] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  const lesson3Questions = [
    { id: 1, q: "ما هي الوظيفة الأساسية للأطراف الصناعية الذكية؟", opts: ["تجميل المظهر فحسب", "مساعدة فاقدي الأطراف على استعادة الحركة والقيام بالوظائف اليومية", "علاج التهابات الرئة", "الاستغناء عن شرب الماء"], ans: 1 },
    { id: 2, q: "تعتبر السماعة الطبية الرقمية مثالاً على التكنولوجيا الطبية في فئة:", opts: ["الأدوات الجراحية الكبرى", "الأجهزة التعويضية والوسائل المساعدة", "أدوية المضادات الحيوية الكيميائية", "أجهزة كشف الأشعة التشخيصية"], ans: 1 },
    { id: 3, q: "أي من هذه المجموعات بحاجة ماسة للوسائل المساعدة في فلسطين؟", opts: ["جميع فئات المجتمع دون استثناء", "جرحى الحروب، كبار السن، وذوي الاحتياجات الخاصة", "الأطباء الجراحون في المشافي التخصصية فقط", "مهندسو الحاسوب المبرمجون"], ans: 1 }
  ];

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    lesson3Questions.forEach(q => {
      if (quizAnswers[q.id] === q.ans) score++;
    });
    const pct = Math.round((score / lesson3Questions.length) * 100);
    setQuizScore(pct);
    setQuizSubmitted(true);
    
    const updated = {
      ...progress,
      lesson3QuizScore: pct
    };
    saveProgress(updated);
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <span className="text-xs font-bold bg-rose-100 text-rose-800 px-3 py-1 rounded-full">الدرس الثالث تفصيلياً</span>
        <h2 className="text-2xl font-black text-slate-800 mt-2 mb-4">الأجهزة التعويضية والوسائل المساعدة 🦾</h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          يتعرض بعض الناس لحوادث، أو يولدون بعيوب خلقية تفقد أعضاءهم وظائفها. هنا تتدخل التكنولوجيا الطبية لتصنع لهم <strong>أجهزة تعويضية</strong> (كالأطراف الصناعية، سماعات الأذن، والعدسات الطبية) لتمنحهم الفرصة لعيش حياة سعيدة وطبيعية.
        </p>

        {/* Sub nav */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          <button onClick={() => setActiveStep(1)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 1 ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>1. شرح الأجهزة التعويضية</button>
          <button onClick={() => setActiveStep(2)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 2 ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>2. قصص أمل ونجاح فلسطينية 🇵🇸</button>
          <button onClick={() => setActiveStep(3)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeStep === 3 ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>3. نشاط المطابقة والاختبار</button>
        </div>
      </div>

      {/* Step 1 */}
      {activeStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
            <span className="text-4xl block mb-2">🦾</span>
            <h4 className="font-bold text-slate-800 text-sm mb-2">الأطراف الصناعية الذكية</h4>
            <p className="text-xs text-slate-500 leading-relaxed">أجهزة ميكانيكية وإلكترونية متطورة تعوض اليد أو القدم المفقودة. تعمل الأطراف الحديثة عبر قراءة الإشارات الكهربائية للعضلات لتتحرك كالأطراف الطبيعية!</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
            <span className="text-4xl block mb-2">🦻</span>
            <h4 className="font-bold text-slate-800 text-sm mb-2">سماعات الأذن الرقمية</h4>
            <p className="text-xs text-slate-500 leading-relaxed">أجهزة الكترونية صغيرة توضع خلف الأذن أو داخلها، تقوم بجمع الأصوات وتكبيرها وتنظيم جودتها ليتمكن ضعاف السمع من التواصل بكل يسر وسهولة.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
            <span className="text-4xl block mb-2">♿</span>
            <h4 className="font-bold text-slate-800 text-sm mb-2">الوسائل المساعدة للحركة</h4>
            <p className="text-xs text-slate-500 leading-relaxed">مثل العكازات، الكراسي المتحركة الكهربائية، والمشايات التي تسهل حركة كبار السن والمصابين لتمكينهم من التنقل باستقلالية كاملة.</p>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {activeStep === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, sIdx) => (
            <div key={sIdx} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-24 h-24 bg-rose-50 rounded-full -ml-12 -mt-12 opacity-50"></div>
              <div>
                <h4 className="font-black text-rose-800 text-sm mb-3 flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>{story.title}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{story.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {story.tags.map((tg, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold">{tg}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3 */}
      {activeStep === 3 && (
        <div className="space-y-6">
          {/* Match Game */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-2">🧩 تحدي المطابقة السريعة للوسائل المساعدة</h3>
            <p className="text-slate-500 text-xs mb-4">اختر الأداة المناسبة لكل حالة مرضية من القوائم المنسدلة:</p>

            <div className="space-y-3 max-w-xl mx-auto">
              {[
                { prob: "فقد السمع الكلي أو الجزئي", opts: ["", "سماعة طبية رقمية", "طرف علوي ذكي", "كرسي متحرك أو عكازات"] },
                { prob: "فقدان اليد أو الذراع", opts: ["", "سماعة طبية رقمية", "طرف علوي ذكي", "كرسي متحرك أو عكازات"] },
                { prob: "عدم القدرة على المشي", opts: ["", "سماعة طبية رقمية", "طرف علوي ذكي", "كرسي متحرك أو عكازات"] },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 gap-3">
                  <span className="text-xs font-bold text-slate-700">{item.prob}</span>
                  <select 
                    value={dragMatches[item.prob]}
                    onChange={(e) => handleDragSelection(item.prob, e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg text-xs p-1.5 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-slate-700"
                  >
                    {item.opts.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>{opt || "اختر الوسيلة المناسبة..."}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {matchStatus && (
              <p className={`mt-4 text-center text-xs font-bold ${matchStatus.includes("رائع") ? 'text-emerald-600' : 'text-rose-500'}`}>
                {matchStatus}
              </p>
            )}
          </div>

          {/* Quiz */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <h3 className="text-lg font-black text-slate-800 mb-2">📋 تقييم الدرس الثالث</h3>
            <p className="text-slate-500 text-xs mb-6">أجب وحقق العلامة الكاملة لإتمام الوحدة وبلوغ الامتحان النهائي!</p>

            {!quizSubmitted ? (
              <form onSubmit={handleQuizSubmit} className="space-y-4">
                {lesson3Questions.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-xs mb-3">{q.q}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {q.opts.map((opt, oIdx) => (
                        <label key={oIdx} className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                          quizAnswers[q.id] === oIdx ? 'bg-rose-50 border-rose-500 text-rose-800 font-bold' : 'bg-white border-slate-200 text-slate-600'
                        }`}>
                          <input 
                            type="radio" 
                            name={`l3q_${q.id}`} 
                            required 
                            checked={quizAnswers[q.id] === oIdx}
                            onChange={() => setQuizAnswers({...quizAnswers, [q.id]: oIdx})}
                            className="hidden" 
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm">تسليم إجابات الدرس الثالث</button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl font-bold mx-auto">%{quizScore}</div>
                <h4 className="font-bold text-slate-800 text-sm">تم تقديم تقييم الدرس الثالث!</h4>
                <p className="text-xs text-slate-500">حصلت على درجة {quizScore}% في هذا الاختبار التراكمي.</p>
                <button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }} className="text-xs text-rose-600 hover:underline">إعادة المحاولة</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 5. GAMES VIEW (واحة الألعاب التعليمية)
function GamesView({ progress, saveProgress }) {
  const [activeGame, setActiveGame] = useState('none');

  return (
    <div className="space-y-8">
      {/* Intro header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-center space-y-3">
        <span className="text-5xl animate-bounce block">🎮</span>
        <h2 className="text-2xl font-black text-slate-800">واحة الألعاب والترفيه التعليمي</h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto">
          العلم في الصغر كالنقش في الحجر، وتزداد متعة العلوم عندما نمارسها عبر ألعاب ذكية ممتعة. اختر اللعبة التي تفضلها الآن لتختبر سرعة ذهنك!
        </p>

        {activeGame !== 'none' && (
          <button 
            onClick={() => setActiveGame('none')} 
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold transition-all"
          >
            ← العودة لقائمة الألعاب
          </button>
        )}
      </div>

      {activeGame === 'none' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Memory Match Game Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center">
            <div>
              <span className="text-4xl block mb-2">🧠</span>
              <h4 className="font-black text-slate-800 text-sm mb-2">لعبة ذاكرة الأجهزة الطبية</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">اختبر قوة ذاكرتك بمطابقة الأجهزة المتشابهة مع بعضها البعض بأسرع وقت ممكن!</p>
            </div>
            <button onClick={() => setActiveGame('memory')} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-xl text-xs transition-all">العب الآن</button>
          </div>

          {/* Crossword / Find Words */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center">
            <div>
              <span className="text-4xl block mb-2">🔍</span>
              <h4 className="font-black text-slate-800 text-sm mb-2">البحث عن الكلمات الطبية المفقودة</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">ابحث عن الكلمات الهامة مثل (دواء، بنسلين، سماعة، علاج) المخبأة داخل شبكة الحروف التفاعلية.</p>
            </div>
            <button onClick={() => setActiveGame('words')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl text-xs transition-all">العب الآن</button>
          </div>

          {/* Lucky Wheel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center">
            <div>
              <span className="text-4xl block mb-2">🎡</span>
              <h4 className="font-black text-slate-800 text-sm mb-2">عجلة الحظ الدوارة للمعلومات</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">أدر العجلة واكتشف السؤال العشوائي الذي سيظهر لك وأجب عليه بسرعة فائقة لتكسب نقاط إضافية!</p>
            </div>
            <button onClick={() => setActiveGame('wheel')} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-xl text-xs transition-all">العب الآن</button>
          </div>
        </div>
      )}

      {/* Game 1: Memory Match */}
      {activeGame === 'memory' && <MemoryGame progress={progress} saveProgress={saveProgress} />}

      {/* Game 2: Find Words */}
      {activeGame === 'words' && <WordSearchGame progress={progress} saveProgress={saveProgress} />}

      {/* Game 3: Wheel of Fortune */}
      {activeGame === 'wheel' && <WheelOfFortuneGame progress={progress} saveProgress={saveProgress} />}

    </div>
  );
}

// Memory Game Implementation
function MemoryGame({ progress, saveProgress }) {
  const cardsData = [
    { id: 1, name: 'بنسلين', img: '💊' },
    { id: 2, name: 'أشعة', img: '🦴' },
    { id: 3, name: 'سماعة', img: '🦻' },
    { id: 4, name: 'حاضنة', img: '👶' },
    { id: 1, name: 'بنسلين', img: '💊' },
    { id: 2, name: 'أشعة', img: '🦴' },
    { id: 3, name: 'سماعة', img: '🦻' },
    { id: 4, name: 'حاضنة', img: '👶' },
  ];

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Shuffle cards
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((c, index) => ({ ...c, uniqueId: index })));
  }, []);

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || selectedCards.some(c => c.uniqueId === card.uniqueId) || matchedCards.includes(card.id)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);
      if (newSelected[0].id === newSelected[1].id) {
        setMatchedCards([...matchedCards, card.id]);
        setSelectedCards([]);
      } else {
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  };

  const isCompleted = matchedCards.length === cardsData.length / 2;

  useEffect(() => {
    if (isCompleted) {
      const updated = {
        ...progress,
        gamesPlayed: { ...progress.gamesPlayed, memory: true }
      };
      saveProgress(updated);
    }
  }, [isCompleted]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-md mx-auto text-center space-y-4">
      <h3 className="font-bold text-slate-800">🧠 لعبة مطابقة الأزواج للأجهزة والرموز</h3>
      <p className="text-slate-500 text-xs">عدد الحركات: {moves}</p>

      <div className="grid grid-cols-4 gap-3 pt-2">
        {cards.map((card) => {
          const isSelected = selectedCards.some(c => c.uniqueId === card.uniqueId);
          const isMatched = matchedCards.includes(card.id);
          const show = isSelected || isMatched;

          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              className={`h-20 rounded-2xl text-2xl flex items-center justify-center font-bold transition-all ${
                show ? 'bg-teal-500 text-white scale-105 shadow' : 'bg-slate-200 text-transparent hover:bg-slate-300'
              }`}
            >
              {show ? card.img : '❓'}
            </button>
          );
        })}
      </div>

      {isCompleted && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold animate-pulse mt-4">
          🎉 تهانينا! قمت بمطابقة جميع البطاقات بنجاح رائع في {moves} حركة!
        </div>
      )}
    </div>
  );
}

// Word Search Game Implementation
function WordSearchGame({ progress, saveProgress }) {
  const words = ["دواء", "بنسلين", "سماعة", "أشعة"];
  
  // Custom simple click-to-discover search
  const [foundWords, setFoundWords] = useState([]);
  
  const handleWordClick = (word) => {
    if (foundWords.includes(word)) return;
    const updated = [...foundWords, word];
    setFoundWords(updated);

    if (updated.length === words.length) {
      const saved = {
        ...progress,
        gamesPlayed: { ...progress.gamesPlayed, match: true }
      };
      saveProgress(saved);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-md mx-auto text-center space-y-4">
      <h3 className="font-bold text-slate-800">🔍 لعبة الكلمات الطبية التفاعلية المفقودة</h3>
      <p className="text-slate-500 text-xs">جد الكلمات التالية عبر النقر عليها لتكشف حروفها المخفية:</p>

      <div className="flex flex-wrap justify-center gap-3">
        {words.map((word, idx) => (
          <button 
            key={idx}
            onClick={() => handleWordClick(word)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              foundWords.includes(word) 
                ? 'bg-emerald-500 text-white line-through' 
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {foundWords.length === words.length && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold animate-pulse">
          🎯 بطل خارق! عثرت على جميع الكلمات الطبية الفلسطينية بدقة لا تضاهى!
        </div>
      )}
    </div>
  );
}

// Wheel of Fortune
function WheelOfFortuneGame({ progress, saveProgress }) {
  const wheelQuestions = [
    "ما هي الحاضنة الاصطناعية لحديثي الولادة؟",
    "اذكر اسم أول مضاد حيوي في العالم.",
    "ما الفرق الرئيسي بين الأجهزة العلاجية والتشخيصية؟",
    "سمّ شركة أدوية فلسطينية رائدة في هذا المجال.",
  ];

  const [question, setQuestion] = useState("");
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    setSpinning(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * wheelQuestions.length);
      setQuestion(wheelQuestions[randomIdx]);
      setSpinning(false);

      const updated = {
        ...progress,
        gamesPlayed: { ...progress.gamesPlayed, wheel: true }
      };
      saveProgress(updated);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-md mx-auto text-center space-y-4">
      <h3 className="font-bold text-slate-800">🎡 عجلة المعرفة المدرسية الدوارة</h3>
      <p className="text-slate-500 text-xs">أدر عجلة الحظ واحصل على سؤال لتردد إجابته مع زملائك في الغرفة الصفية!</p>

      <div className="relative flex justify-center py-4">
        <div className={`w-36 h-36 rounded-full border-8 border-indigo-500 flex items-center justify-center text-3xl font-extrabold text-indigo-600 bg-indigo-50 transition-all duration-1000 ${spinning ? 'rotate-[720deg]' : ''}`}>
          🌀
        </div>
      </div>

      <button 
        onClick={spinWheel} 
        disabled={spinning}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-2 px-6 rounded-xl text-xs transition-all"
      >
        {spinning ? "جاري تدوير العجلة..." : "انقر لتدوير العجلة 🚀"}
      </button>

      {question && !spinning && (
        <div className="p-4 bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-xl text-xs font-semibold animate-fade-in space-y-2">
          <p className="text-amber-600">❓ سؤالك العشوائي هو:</p>
          <p className="font-bold text-sm text-slate-800">{question}</p>
        </div>
      )}
    </div>
  );
}

// 6. FINAL TEST VIEW (الامتحان النهائي وحساب الشهادة المعتمدة)
function FinalTestView({ studentName, progress, saveProgress }) {
  const finalQuestions = [
    { id: 1, q: "تعتمد التكنولوجيا الطبية في عملها بالدرجة الأولى على:", opts: ["الاجتهادات الشخصية فقط", "البحث العلمي والتجارب والعلوم الهندسية والحيوية", "التسويق التجاري المجرد", "التخمين العشوائي للأمراض"], ans: 1 },
    { id: 2, q: "يعود الفضل في اكتشاف البنسلين الصيدلاني التاريخي إلى العالم الإسكتلندي:", opts: ["إسحاق نيوتن", "ألكسندر فلمنج", "توماس ألفا إديسون", "نيكولا تسلا"], ans: 1 },
    { id: 3, q: "من الأمثلة على الأجهزة الطبية التشخيصية المستخدمة في المشافي:", opts: ["جهاز الصدمة الكهربائية", "مخطط كهربائية القلب (ECG)", "جهاز غسيل الكلى الاصطناعية", "الحاضنات لحديثي الولادة"], ans: 1 },
    { id: 4, q: "ما هي أولى خطوات عملية تصنيع الدواء بحسب ما درسته؟", opts: ["الإنتاج الكثيف بالعلب والعبوات", "البحث والتحقق من خصائص المسبب للمرض", "التجارب السريرية على الإنسان مباشرة", "نشر الإعلانات في صيدليات فلسطين"], ans: 1 },
    { id: 5, q: "جهاز الصدمة الكهربائية المنقذ لضربات القلب يتبع فئة الأجهزة:", opts: ["التجميلية الترفيهية", "التشخيصية الدقيقة", "العلاجية المنقذة للحياة", "الهندسة الوراثية الشاملة"], ans: 2 },
    { id: 6, q: "تخضع مصانع الأدوية في بيت جالا ورام الله لرقابة وإشراف من قبل:", opts: ["وزارة الصحة الفلسطينية والمواصفات والمقاييس", "سلطة المياه وسلطة الطاقة حصراً", "شركات السيارات الدولية المعترف بها", "الجمعية الفلسطينية لزراعة الفاكهة"], ans: 0 },
    { id: 7, q: "تعد سماعات الأذن الرقمية التي يستعين بها ضعاف السمع من فئة:", opts: ["أدوات الجراحة المعقمة الكبرى", "الأجهزة التعويضية والوسائل المساعدة", "أجهزة الأشعة السينية الضخمة", "الأدوية والمستحضرات التجميلية"], ans: 1 },
    { id: 8, q: "تقوم الكلية الاصطناعية بدور هام وبارز في جسم المريض وهو:", opts: ["ضخ الدم المحمل بالأكسجين للرئتين", "تنقية وتصفية الدم من الفضلات والسموم المتراكمة فيه", "فرز الهرمونات لتنشيط عضلات الجسم", "المساعدة على النوم المريح والهادئ"], ans: 1 },
    { id: 9, q: "كيف تعمل الأطراف التعويضية الذكية الحديثة بنجاح؟", opts: ["عن طريق التخمين والتفكير العقلي للممرضين", "عبر قراءة الإشارات الكهربائية الدقيقة للعضلات والجسم", "تلقائياً بالبطارية التي لا تحتاج لأي شحن أبداً", "عن طريق توصيلها بحبل خارجي طويل ومكلف"], ans: 1 },
    { id: 10, q: "الهدف السامي من جميع تقنيات التكنولوجيا الطبية في العالم وفي بلدنا الحبيب فلسطين هو:", opts: ["زيادة مبيعات الهواتف الذكية بالأسواق", "توفير حياة كريمة وآمنة وصحية للإنسان ومساعدته على تجاوز آلام المرض والحروب", "الاستغناء عن الأطباء الماهرين في العيادات بالكامل", "تخفيض درجات المدارس التفاعلية"], ans: 1 }
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleTestSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;
    finalQuestions.forEach(q => {
      if (answers[q.id] === q.ans) correctCount++;
    });
    const finalScore = Math.round((correctCount / finalQuestions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);

    const updated = {
      ...progress,
      finalTestScore: finalScore
    };
    saveProgress(updated);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <span className="text-5xl">🏆</span>
        <h2 className="text-2xl font-black text-slate-800">الامتحان النهائي الشامل للوحدة</h2>
        <p className="text-slate-500 text-xs">لقد تعلمت واستكشفت الأسرار والآن حان وقت إظهار مهارتك للفوز بالشهادة الإلكترونية باسمك!</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleTestSubmit} className="space-y-6">
          {finalQuestions.map((q, idx) => (
            <div key={q.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-xs md:text-sm mb-3 flex gap-2">
                <span className="text-teal-600 font-extrabold">{idx + 1}.</span>
                <span>{q.q}</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.opts.map((opt, optIdx) => (
                  <label key={optIdx} className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                    answers[q.id] === optIdx ? 'bg-indigo-50 border-indigo-500 text-indigo-800 font-bold' : 'bg-white border-slate-200 text-slate-600'
                  }`}>
                    <input 
                      type="radio" 
                      name={`final_${q.id}`} 
                      required 
                      checked={answers[q.id] === optIdx}
                      onChange={() => setAnswers({...answers, [q.id]: optIdx})}
                      className="hidden" 
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md">أرسل الامتحان النهائي الشامل</button>
        </form>
      ) : (
        <div className="text-center space-y-6 py-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 text-4xl font-black animate-bounce mb-2">%{score}</div>
          <h3 className="text-2xl font-black text-slate-800">ألف مبروك التخرج من الوحدة بنجاح!</h3>
          <p className="text-slate-500 text-xs max-w-lg mx-auto">لقد أكملت اختبار التكنولوجيا الطبية للصف السادس الأساسي وحصلت على علامة <strong className="text-indigo-600 font-bold">%{score}</strong> بكل جدارة واستحقاق!</p>

          {score >= 60 ? (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-4 border-amber-300 p-8 rounded-3xl max-w-2xl mx-auto shadow-md relative overflow-hidden text-center">
              <div className="absolute top-2 right-2 text-2xl">🏆</div>
              <div className="absolute bottom-2 left-2 text-2xl">🇵🇸</div>
              
              <div className="text-slate-500 text-xs font-bold tracking-wider uppercase mb-2">وزارة التربية والتعليم والتعليم العالي الفلسطينية</div>
              <h4 className="text-2xl font-black text-slate-800 tracking-wide mb-1">شهادة تميز في التكنولوجيا الطبية</h4>
              <p className="text-xs text-slate-400 mb-6">تمنح مدرسة المناهج التفاعلية هذه الشهادة بكل فخر للطالب المتميز:</p>

              <p className="text-xl font-black text-teal-600 underline decoration-teal-300 decoration-double underline-offset-8 py-2 inline-block mb-4">
                {studentName || "طالب متميز للصف السادس"}
              </p>

              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                وذلك لاجتيازه كافة أنشطة، اختبارات، ودروس المادة الإلكترونية للوحدة الثالثة <strong>(التكنولوجيا الطبية)</strong> للصف السادس الأساسي وحصوله على نسبة نهائية ممتازة قدرها <strong>%{score}</strong>.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-between text-slate-400 text-[10px]">
                <span>التوقيع: الحكيم سمير و ومرح</span>
                <span>تاريخ الحصول: 2026/06/13م</span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-rose-50 text-rose-800 rounded-xl text-xs max-w-md mx-auto border border-rose-100">
              العلامة دون حد التميز (%60). لا عليك يا بطل! يمكنك دائماً إعادة تقديم الامتحان للوصول للعلامة الكاملة والحصول على الشهادة لتبهر بها عائلتك ومعلمك!
              <button onClick={() => { setSubmitted(false); setAnswers({}); }} className="block mt-2 font-bold text-rose-600 hover:underline mx-auto">أعد المحاولة الآن</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 7. DASHBOARD VIEW (لوحة متابعة الطالب)
function DashboardView({ studentName, progress, resetAllProgress }) {
  const badgeDetails = {
    explorer: { name: 'المستكشف الأول', icon: '🔍', desc: 'لإتمام الاختبار القبلي للمعلومات' },
    pharmacist: { name: 'مكتشف الدواء', icon: '💊', desc: 'لتفوقك في درس صناعة الدواء والعلاج' },
    biomed: { name: 'خبير الأجهزة', icon: '⚡', desc: 'لتفوقك في درس الأجهزة الطبية الرائدة' },
    prosthetics: { name: 'بطل العون واليسر', icon: '🦾', desc: 'لتفوقك في درس الأجهزة والوسائل التعويضية' },
    genius: { name: 'ابن سينا الصغير', icon: '👑', desc: 'للحصول على درجة ممتازة بالامتحان النهائي' }
  };

  // Compute earned badges based on current progress scores
  const earnedBadges = [];
  if (progress.preTestCompleted) earnedBadges.push('explorer');
  if (progress.lesson1QuizScore >= 80) earnedBadges.push('pharmacist');
  if (progress.lesson2QuizScore >= 80) earnedBadges.push('biomed');
  if (progress.lesson3QuizScore >= 80) earnedBadges.push('prosthetics');
  if (progress.finalTestScore >= 90) earnedBadges.push('genius');

  return (
    <div className="space-y-8">
      {/* Overview stats header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-3xl font-extrabold shadow-inner">🧑‍⚕️</div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">{studentName || 'البطل المجهول'}</h2>
            <p className="text-xs text-slate-400">الصف السادس الأساسي - دولة فلسطين الحبيبة</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="p-4 bg-emerald-50 text-center rounded-2xl border border-emerald-100 min-w-24">
            <span className="text-xs text-emerald-600 font-bold">الشارات المكتسبة</span>
            <p className="text-2xl font-black text-emerald-800">{earnedBadges.length} / 5</p>
          </div>
          <div className="p-4 bg-indigo-50 text-center rounded-2xl border border-indigo-100 min-w-24">
            <span className="text-xs text-indigo-600 font-bold">الامتحان النهائي</span>
            <p className="text-2xl font-black text-indigo-800">{progress.finalTestScore !== null ? `%${progress.finalTestScore}` : 'لم ينجز'}</p>
          </div>
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Progress Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">📊 إنجاز الدروس والتقييمات</h3>
          
          <div className="space-y-3">
            {[
              { name: "الاختبار القبلي التشخيصي", done: progress.preTestCompleted, score: progress.preTestScore },
              { name: "الدرس الأول: صناعة الدواء", done: progress.lesson1Read, score: progress.lesson1QuizScore },
              { name: "الدرس الثاني: الأجهزة الطبية", done: progress.lesson2Read, score: progress.lesson2QuizScore },
              { name: "الدرس الثالث: الأجهزة والوسائل التعويضية", done: progress.lesson3Read, score: progress.lesson3QuizScore },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-semibold text-slate-700">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full font-bold ${item.done ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                    {item.done ? 'مكتمل ✅' : 'غير مكتمل'}
                  </span>
                  {item.score !== null && (
                    <span className="font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">%{item.score}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges showcase */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">🏆 شارات الشرف والتميز التي كسبتها</h3>
          {earnedBadges.length === 0 ? (
            <p className="text-slate-400 text-xs text-center py-8">لا توجد شارات بعد، أكمل التقييمات والحصص لحصدها جميعاً!</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {earnedBadges.map((badgeId) => {
                const b = badgeDetails[badgeId];
                return (
                  <div key={badgeId} className="p-3 bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center gap-2.5 shadow-sm text-right animate-fade-in">
                    <span className="text-3xl">{b.icon}</span>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs">{b.name}</h4>
                      <p className="text-[10px] text-slate-500 leading-tight">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      <div className="text-center pt-4">
        <button 
          onClick={resetAllProgress} 
          className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold transition-all"
        >
          🗑️ تفريغ كافة البيانات والبدء كطالب جديد من البداية
        </button>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
