// import { useEffect, useState, useRef } from 'react';

// import { NavLink, Navigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';
// import { motion } from 'framer-motion';
// import { FaCode, FaUser, FaCog, FaSignOutAlt, FaTrophy, FaFilter, FaCheck } from 'react-icons/fa';
// import { SiLeetcode } from 'react-icons/si';
// import bdi_hero from '../assets/leetcode_1.webp'
// // New color palette
// const COLORS = {
//   primary: '#355C7D',     // Navy blue
//   secondary: '#6C5B7B',   // Purple
//   accent: '#C06C84',      // Rose
//   highlight: '#F67280',   // Coral
//   light: '#F8B195'        // Peach
// };

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState(() => {
//     const stored = localStorage.getItem("filters");
//     return stored ? JSON.parse(stored) : {
//       difficulty: 'all',
//       tag: 'all',
//       status: 'all'
//     };
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const problemSectionRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem("filters", JSON.stringify(filters));
//   }, [filters]);

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//         setLoading(false);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   if (!user) return <Navigate to="/login" />;

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]);
//   };

//   const scrollToProblems = () => {
//     problemSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || (Array.isArray(problem.tags) ? problem.tags.includes(filters.tag) : problem.tags === filters.tag);
//     const statusMatch = filters.status === 'all' || 
//                         (filters.status === 'solved' && solvedProblems.some(sp => sp._id === problem._id));
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   const getDifficultyBadgeColor = (difficulty) => {
//     switch (difficulty) {
//       case 'easy':
//         return `bg-[${COLORS.light}] text-[#333]`;
//       case 'medium':
//         return `bg-[${COLORS.highlight}] text-white`;
//       case 'hard':
//         return `bg-[${COLORS.accent}] text-white`;
//       default:
//         return 'bg-gray-200 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#355C7D] to-[#6C5B7B] text-white overflow-hidden">
//       {/* Header */}
//       <header 
//         className="fixed top-0 w-full z-50 bg-[#355C7D] backdrop-blur-sm shadow-lg py-3 px-4 flex justify-between items-center"
//         style={{ background: COLORS.primary }}
//       >
//         <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold">
//           <SiLeetcode className="text-3xl" style={{ color: COLORS.light }} />
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F8B195] to-[#F67280]">
//             Code_Decode
//           </span>
//         </NavLink>

//         <div className="flex items-center gap-4">
//           <motion.button 
//             whileHover={{ scale: 1.05 }} 
//             whileTap={{ scale: 0.95 }} 
//             className="md:hidden p-2 rounded-lg"
//             style={{ background: COLORS.accent }}
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <FaFilter className="text-xl" />
//           </motion.button>

//           <div className="relative group">
//             <motion.button 
//               whileHover={{ scale: 1.05 }} 
//               className="flex items-center gap-2 px-4 py-2 rounded-lg"
//               style={{ background: COLORS.accent }}
//             >
//               <FaUser />
//               <span>{user?.firstName || 'Guest'}</span>
//             </motion.button>

//             <ul 
//               className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300"
//               style={{ background: COLORS.primary }}
//             >
//               <li>
//                 <NavLink 
//                   to="/profile" 
//                   className="flex items-center gap-2 px-4 py-3 hover:opacity-90 text-base"
//                   style={{ background: COLORS.secondary }}
//                 >
//                   <FaUser />Profile
//                 </NavLink>
//               </li>
//               {user?.role === 'admin' && (
//                 <li>
//                   <NavLink 
//                     to="/admin" 
//                     className="flex items-center gap-2 px-4 py-3 hover:opacity-90 text-base"
//                     style={{ background: COLORS.secondary }}
//                   >
//                     <FaCog />Admin
//                   </NavLink>
//                 </li>
//               )}
//               <li>
//                 <button 
//                   onClick={handleLogout} 
//                   className="w-full flex items-center gap-2 text-left px-4 py-3 hover:opacity-90 text-base"
//                   style={{ background: COLORS.secondary }}
//                 >
//                   <FaSignOutAlt />Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section 
//         className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden pt-16   bg-cover bg-center bg-no-repeat"
//          style={{
//     backgroundImage: `
//       linear-gradient(to bottom right, rgba(53,92,125,0.7), rgba(255,165,0,0.7)),
//       url(${bdi_hero}) 
//     `
//   }}

//    >
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.8 }} 
//             className="text-4xl md:text-5xl font-bold mb-6"
//           >
//             <span className="block mb-2">Master Coding Challenges</span>
//             <span className="text-xl md:text-2xl font-normal">Level up your skills with curated problems</span>
//           </motion.h1>
          
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ delay: 0.3, duration: 0.8 }} 
//             className="flex flex-col sm:flex-row gap-4 mt-8"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-3 rounded-full font-semibold shadow-lg"
//               style={{ background: COLORS.primary, color: 'white' }}
//               onClick={scrollToProblems}
//             >
//               Start Solving
//             </motion.button>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-3 rounded-full font-semibold shadow-lg border-2"
//               style={{ borderColor: COLORS.primary, color: COLORS.primary }}
//             >
//               View Leaderboard
//             </motion.button>
//           </motion.div>
//         </div>
        
//         {/* Animated floating elements */}
//         {[...Array(10)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute opacity-80"
//             style={{
//               fontSize: '2rem',
//               color: COLORS.light,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, 30, 0],
//               x: [0, 20, 0],
//               rotate: [0, 360]
//             }}
//             transition={{
//               duration: 10 + Math.random() * 20,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             {['{', '}', '(', ')', '<', '>', ';', '=','%','&','{', '}', '(', ')', '<', '>','%',,'%','&'][Math.floor(Math.random() * 20)]}
//           </motion.div>
//         ))}
//       </section>

//       {/* Filters Section */}
//      <div>
//        <div 
//         className={`sticky top-16 z-40 w-full py-4 transition-all duration-300 ${showFilters ? 'h-auto' : 'h-16'}`}
//         style={{ background: COLORS.secondry }}
//       >
//         <div className=" container mx-auto px-4">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-xl font-semibold flex items-center gap-2">
//               <FaFilter style={{ color: COLORS.light }} /> 
//               <span>Problem Filters</span>
//             </h2>
//             <button 
//               className="md:hidden"
//               style={{ color: COLORS.light }}
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               {showFilters ? 'Hide Filters' : 'Show Filters'}
//             </button>
//           </div>
          
//           <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ${showFilters ? 'block' : 'hidden md:block'}`}>
//             <div>
//               <label className="block mb-2">Status</label>
//               <select
//                 className="w-full p-2 rounded-lg border-0 shadow-md"
//                 style={{ background: COLORS.secondary, color: 'white' }}
//                 value={filters.status}
//                 onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               >
//                 <option value="all">All Problems</option>
//                 <option value="solved">Solved Problems</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block mb-2">Difficulty</label>
//               <select
//                 className="w-full p-2 rounded-lg border-0 shadow-md"
//                 style={{ background: COLORS.secondary, color: 'white' }}
//                 value={filters.difficulty}
//                 onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
//               >
//                 <option value="all">All Difficulties</option>
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block mb-2">Tags</label>
//               <select
//                 className="w-full p-2 rounded-lg border-0 shadow-md"
//                 style={{ background: COLORS.secondary, color: 'white' }}
//                 value={filters.tag}
//                 onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//               >
//                 <option value="all">All Tags</option>
//                 <option value="array">Array</option>
//                 <option value="linkedList">Linked List</option>
//                 <option value="graph">Graph</option>
//                 <option value="dp">Dynamic Programming</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//      </div>

//       {/* Problem Cards Section */}
//       <section 
//         ref={problemSectionRef}
//         className="py-8 min-h-screen"
//         style={{ background: COLORS.secondary }}
//       >
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.light }}>
//             Coding Challenges
//             <span className="text-lg ml-2 opacity-80">
//               ({filteredProblems.length} problems)
//             </span>
//           </h2>
          
//           {loading ? (
//             <div className="flex justify-center items-center h-40">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: COLORS.light }}></div>
//             </div>
//           ) : filteredProblems.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-5xl mb-4" style={{ color: COLORS.light }}>👨‍💻</div>
//               <h3 className="text-xl" style={{ color: COLORS.light }}>No problems match your filters</h3>
//               <p className="mt-2 opacity-80">Try adjusting your filters to see more challenges</p>
//             </div>
//           ) : (
//             <div className="space-y-3 max-w-3xl mx-auto">
//               {filteredProblems.map((problem) => (
//                 <motion.div
//                   key={problem._id}
//                   className="rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
//                   style={{ background: COLORS.primary }}
//                   whileHover={{ y: -3 }}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <NavLink 
//                         to={`/problem/${problem._id}`}
//                         className="text-lg font-semibold hover:underline block"
//                         style={{ color: COLORS.light }}
//                       >
//                         {problem.title}
//                       </NavLink>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         <span 
//                           className="text-xs px-2 py-1 rounded-full capitalize"
//                           style={{ 
//                             background: problem.difficulty === 'easy' 
//                               ? COLORS.light 
//                               : problem.difficulty === 'medium'
//                                 ? COLORS.highlight
//                                 : COLORS.accent,
//                             color: problem.difficulty === 'easy' ? '#333' : 'white'
//                           }}
//                         >
//                           {problem.difficulty}
//                         </span>
//                         <span 
//                           className="text-xs px-2 py-1 rounded-full border"
//                           style={{ 
//                             borderColor: COLORS.light,
//                             color: COLORS.light
//                           }}
//                         >
//                           {problem.tags}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2">
//                       {solvedProblems.some(sp => sp._id === problem._id) && (
//                         <div 
//                           className="p-1 rounded-full"
//                           style={{ background: COLORS.highlight }}
//                           title="Solved"
//                         >
//                           <FaCheck size={14} />
//                         </div>
//                       )}
//                       <NavLink 
//                         to={`/problem/${problem._id}`}
//                         className="text-sm flex items-center gap-1 px-3 py-1 rounded-full"
//                         style={{ 
//                           background: COLORS.accent,
//                           color: 'white'
//                         }}
//                       >
//                         Solve <FaCode size={12} />
//                       </NavLink>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer 
//         className="py-6 text-center"
//         style={{ background: COLORS.primary }}
//       >
//         <div className="container mx-auto px-4">
//           <p className="opacity-80">
//             &copy; {new Date().getFullYear()} Code_Decode. All rights reserved.
//           </p>
//           <div className="flex justify-center gap-4 mt-3">
//             <NavLink to="/about" className="opacity-80 hover:opacity-100">About</NavLink>
//             <NavLink to="/contact" className="opacity-80 hover:opacity-100">Contact</NavLink>
//             <NavLink to="/terms" className="opacity-80 hover:opacity-100">Terms</NavLink>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Homepage;

import { useEffect, useState, useRef } from 'react';
import { NavLink, Navigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { motion } from 'framer-motion';
import { FaCode, FaUser, FaSignOutAlt, FaFilter, FaCheck ,FaCog} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import heroImg from '../assets/leetcode_1.webp';
import Header from "../components/Header";
import LandingAnimation from'../UI_Design/landingSteps'
import Leaderboard from './Leadboard'
// 🖌️ Dark Neon Color Theme
const COLORS = {
  bg: '#0B1120',
  primary: '#0F172A',
  secondary: '#1E293B',
  accent: '#3B82F6',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  gray: '#94A3B8',
  highlight: '#A855F7',
};

export default function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

  const problemSectionRef = useRef(null);

  // 🧠 Authentication protection
  if (!user) return <Navigate to="/login" />;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (err) {
        console.error('Error loading problems', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSolved = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (err) {
        console.error('Error fetching solved problems:', err);
      }
    };

    fetchProblems();
    if (user) fetchSolved();
  }, [user]);

  // 🧠 Filter logic
  const filtered = problems.filter((p) => {
    const d = filters.difficulty === 'all' || p.difficulty === filters.difficulty;
    const t = filters.tag === 'all' || (p.tags && p.tags.includes(filters.tag));
    const s =
      filters.status === 'all' ||
      (filters.status === 'solved' && solvedProblems.some((sp) => sp._id === p._id));
    return d && t && s;
  });

  const scrollToProblems = () => {
    problemSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getDiffColor = (level) => {
    switch (level) {
      case 'easy': return COLORS.success;
      case 'medium': return COLORS.warning;
      case 'hard': return COLORS.danger;
      default: return COLORS.gray;
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: COLORS.bg }}>
      {/* HEADER */}

<Header
  user={user}
  COLORS={COLORS}
  handleLogout={handleLogout}
/>

      {/* HERO */}
      <section className="relative pt-28 pb-20 text-center px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Master Your Coding Journey
        </motion.h1>
        <p className="text-gray-400 text-lg mt-3">Sharpen your skills. Track your growth. Beat every challenge.</p>

        <motion.div
          className="flex justify-center gap-6 mt-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button onClick={scrollToProblems} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition">
            Start Solving
          </button>
         <Link to="/leaderboard">
  <button className="border border-blue-400 hover:bg-blue-800 px-6 py-2 rounded-full transition font-semibold">
    Leaderboard
  </button>
</Link>
        </motion.div>

        {/* Floating Code Symbols */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-indigo-400 text-lg font-mono select-none"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.07 + Math.random() * 0.3,
            }}
            animate={{
              y: [0, 25, 0],
              x: [0, 15, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
            }}
          >
            {['{', '}', '<', '>', '=', ';'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </section>
<LandingAnimation></LandingAnimation>
      {/* FILTERS */}
      <section className="bg-[#111827] py-6 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {['status', 'difficulty', 'tag'].map((filter) => (
            <div key={filter}>
              <label className="block mb-1 text-gray-300 capitalize">{filter}</label>
              <select
                className="w-full rounded-md px-3 py-2 bg-gray-900 text-white border border-gray-700"
                value={filters[filter]}
                onChange={(e) => setFilters({ ...filters, [filter]: e.target.value })}
              >
                {filter === 'status' && (
                  <>
                    <option value="all">All</option>
                    <option value="solved">Solved</option>
                  </>
                )}
                {filter === 'difficulty' && (
                  <>
                    <option value="all">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </>
                )}
                {filter === 'tag' && (
                  <>
                    <option value="all">All</option>
                    <option value="array">Array</option>
                    <option value="linkedList">Linked List</option>
                    <option value="graph">Graph</option>
                      <option value="stack">Stack</option>
                    <option value="queue">Queue</option>
                    <option value="dp">Dynamic Programming</option>
                  </>
                )}
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMS LIST */}
      <section className="py-10 px-4" ref={problemSectionRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">🚀 Problems ({filtered.length})</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading problems...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500">No problems match current filters.</p>
          ) : (
            <div className="space-y-6">
              {filtered.map((problem) => (
                <motion.div
                  key={problem._id}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#1e293b] border border-gray-700 p-4 rounded-lg shadow-sm flex justify-between items-start"
                >
                  <div>
                    <NavLink to={`/problem/${problem._id}`} className="text-lg font-semibold hover:underline">
                      {problem.title}
                    </NavLink>
                    <div className="flex gap-2 mt-1 flex-wrap text-sm">
                      <span style={{ backgroundColor: getDiffColor(problem.difficulty) }} className="px-2 py-0.5 rounded-full text-black font-semibold capitalize">
                        {problem.difficulty}
                      </span>
                      {problem.tags && problem.tags.length > 0 && (
                        <span className="text-xs text-gray-400 border border-gray-600 px-2 py-0.5 rounded-full">
                          {/* {problem.tags.join(', ')} */}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-2">
                    {solvedProblems.some((sp) => sp._id === problem._id) && (
                      <FaCheck className="text-green-400" title="Solved" />
                    )}
                    <NavLink to={`/problem/${problem._id}`} className="text-sm px-3 py-1 bg-blue-600 rounded-full hover:bg-blue-700 transition">
                      Solve
                    </NavLink>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] py-6 text-center text-gray-400 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Code_Decode • Practice. Compete. Conquer 💪</p>
      </footer>
    </div>
  );
}
   //



   //header
//          <header className="fixed top-0 w-full z-50 px-6 py-4 bg-opacity-80 backdrop-blur border-b border-gray-700 flex justify-between items-center" style={{ background: COLORS.primary }}>
//         <NavLink to="/" className="flex items-center gap-2 text-xl font-bold">
//           <SiLeetcode className="text-yellow-400" />
//           <span className="text-white">Code_Decode</span>
//         </NavLink>

//        <div className="relative group">
//   <motion.button 
//     whileHover={{ scale: 1.05 }} 
//     className="flex items-center gap-2 px-4 py-2 rounded-lg"
//     style={{ background: COLORS.accent }}
//   >
//     <FaUser />
//     <span>{user?.firstName || 'Guest'}</span>
//   </motion.button>

//   <ul 
//     className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300"
//     style={{ background: COLORS.primary }}
//   >
//     {/* Profile Link (Always visible) */}
//     <li>
//       <NavLink 
//         to="/profile" 
//         className="flex items-center gap-2 px-4 py-3 hover:opacity-90 text-base"
//         style={{ background: COLORS.secondary }}
//       >
//         <FaUser /> Profile
//       </NavLink>
//     </li>

//     {/* Admin Link (Only for admin) */}
//     {user?.role === 'admin' && (
//       <li>
//         <NavLink 
//           to="/admin" 
//           className="flex items-center gap-2 px-4 py-3 hover:opacity-90 text-base"
//           style={{ background: COLORS.secondary }}
//         >
//           <FaCog /> Admin
//         </NavLink>
//       </li>
//     )}

//     {/* Logout Button (Always visible) */}
//     <li>
//       <button 
//         onClick={handleLogout} 
//         className="w-full flex items-center gap-2 text-left px-4 py-3 hover:opacity-90 text-base"
//         style={{ background: COLORS.secondary }}
//       >
//         <FaSignOutAlt /> Logout
//       </button>
//     </li>
//   </ul>
// </div>

//       </header>