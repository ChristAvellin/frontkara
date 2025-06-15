// import { useState } from 'react';
// import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

// // Container Component
// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('songs');
//   const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
//   const [songs, setSongs] = useState([
//     { 
//       "id": 1, 
//       "title": "Bohemian Rhapsody", 
//       "artist": "Queen", 
//       "duration": "5:55", 
//       "language": "English",
//       "image": "https://picsum.photos/300/300?random=1",
//       "color": "#Face6b"
//     },
//     { 
//       "id": 2, 
//       "title": "Sweet Child O'Mine", 
//       "artist": "Guns N' Roses", 
//       "duration": "5:56", 
//       "language": "English",
//       "image": "https://picsum.photos/300/300?random=2",
//       "color": "#30454a"
//     },
//     { 
//       "id": 3, 
//       "title": "La Vie En Rose", 
//       "artist": "Édith Piaf", 
//       "duration": "3:07", 
//       "language": "French",
//       "image": "https://picsum.photos/300/300?random=3",
//       "color": "#Face6b"
//     }
//   ]);
//   const [artists, setArtists] = useState([
//     { "id": 1, "name": "Queen", "songsCount": 32, "image": "https://picsum.photos/300/300?random=4" },
//     { "id": 2, "name": "Guns N' Roses", "songsCount": 28, "image": "https://picsum.photos/300/300?random=5" },
//     { "id": 3, "name": "Édith Piaf", "songsCount": 15, "image": "https://picsum.photos/300/300?random=6" }
//   ]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredSongs = songs.filter(song => 
//     song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     song.artist.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredArtists = artists.filter(artist => 
//     artist.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddItem = (newItem) => {
//     if (activeTab === 'songs') {
//       setSongs([...songs, { 
//         ...newItem, 
//         id: songs.length + 1,
//         image: newItem.image || "https://picsum.photos/300/300?random=" + (songs.length + 10),
//         color: ['#Face6b', '#30454a'][Math.floor(Math.random() * 2)]
//       }]);
//     } else {
//       setArtists([...artists, { 
//         ...newItem, 
//         id: artists.length + 1, 
//         songsCount: 0,
//         image: newItem.image || "https://picsum.photos/300/300?random=" + (artists.length + 20)
//       }]);
//     }
//     setIsAddModalOpen(false);
//   };

//   const handleEditItem = (updatedItem) => {
//     if (activeTab === 'songs') {
//       setSongs(songs.map(song => song.id === updatedItem.id ? updatedItem : song));
//     } else {
//       setArtists(artists.map(artist => artist.id === updatedItem.id ? updatedItem : artist));
//     }
//     setIsEditModalOpen(false);
//   };

//   const handleDeleteItem = (id) => {
//     if (activeTab === 'songs') {
//       setSongs(songs.filter(song => song.id !== id));
//     } else {
//       setArtists(artists.filter(artist => artist.id !== id));
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar with new color scheme */}
//       <div className="w-64 bg-[#30454a] text-white p-4">
//         <h1 className="text-2xl font-bold mb-8 text-[#Face6b]">KaraArema Admin</h1>
//         <nav className="space-y-2">
//           <button 
//             onClick={() => setActiveTab('dashboard')}
//             className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-[#3a5157] text-[#Face6b]' : 'hover:bg-[#3a5157] hover:text-[#Face6b]'}`}
//           >
//             <Home className="mr-3" size={18} />
//             Dashboard
//           </button>
//           <button 
//             onClick={() => {
//               setActiveTab('songs');
//               setViewMode('list');
//             }}
//             className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'songs' ? 'bg-[#3a5157] text-[#Face6b]' : 'hover:bg-[#3a5157] hover:text-[#Face6b]'}`}
//           >
//             <Music className="mr-3" size={18} />
//             Songs
//           </button>
//           <button 
//             onClick={() => {
//               setActiveTab('artists');
//               setViewMode('list');
//             }}
//             className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'artists' ? 'bg-[#3a5157] text-[#Face6b]' : 'hover:bg-[#3a5157] hover:text-[#Face6b]'}`}
//           >
//             <Mic2 className="mr-3" size={18} />
//             Artists
//           </button>
//           <button 
//             onClick={() => setActiveTab('users')}
//             className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'users' ? 'bg-[#3a5157] text-[#Face6b]' : 'hover:bg-[#3a5157] hover:text-[#Face6b]'}`}
//           >
//             <Users className="mr-3" size={18} />
//             Users
//           </button>
//           <button 
//             onClick={() => setActiveTab('settings')}
//             className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'settings' ? 'bg-[#3a5157] text-[#Face6b]' : 'hover:bg-[#3a5157] hover:text-[#Face6b]'}`}
//           >
//             <Settings className="mr-3" size={18} />
//             Settings
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold capitalize text-[#30454a]">{activeTab}</h2>
//             <div className="flex items-center space-x-4">
//               {activeTab === 'songs' && (
//                 <div className="flex border rounded-lg overflow-hidden">
//                   <button 
//                     onClick={() => setViewMode('list')}
//                     className={`px-3 py-1 ${viewMode === 'list' ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a]'}`}
//                   >
//                     List
//                   </button>
//                   <button 
//                     onClick={() => setViewMode('grid')}
//                     className={`px-3 py-1 ${viewMode === 'grid' ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a]'}`}
//                   >
//                     Grid
//                   </button>
//                 </div>
//               )}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#30454a]"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <button 
//                 onClick={() => {
//                   setCurrentItem(null);
//                   setIsAddModalOpen(true);
//                 }}
//                 className="flex items-center bg-[#30454a] text-white px-4 py-2 rounded-lg hover:bg-[#3a5157]"
//               >
//                 <Plus className="mr-2" size={18} />
//                 Add {activeTab === 'songs' ? 'Song' : 'Artist'}
//               </button>
//             </div>
//           </div>

//           {/* Content Area */}
//           {activeTab === 'songs' && viewMode === 'list' && (
//             <SongsTable 
//               songs={filteredSongs} 
//               onEdit={(song) => {
//                 setCurrentItem(song);
//                 setIsEditModalOpen(true);
//               }}
//               onDelete={handleDeleteItem}
//             />
//           )}

//           {activeTab === 'songs' && viewMode === 'grid' && (
//             <SongsGrid songs={filteredSongs} />
//           )}

//           {activeTab === 'artists' && (
//             <ArtistsTable 
//               artists={filteredArtists} 
//               onEdit={(artist) => {
//                 setCurrentItem(artist);
//                 setIsEditModalOpen(true);
//               }}
//               onDelete={handleDeleteItem}
//             />
//           )}

//           {activeTab === 'dashboard' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//               <DashboardCard 
//                 title="Total Songs" 
//                 value={songs.length} 
//                 icon={<Music className="text-[#30454a]" size={24} />} 
//               />
//               <DashboardCard 
//                 title="Total Artists" 
//                 value={artists.length} 
//                 icon={<Mic2 className="text-[#30454a]" size={24} />} 
//               />
//               <DashboardCard 
//                 title="Active Users" 
//                 value="1,245" 
//                 icon={<Users className="text-[#30454a]" size={24} />} 
//               />
//               <DashboardCard 
//                 title="Languages" 
//                 value="12" 
//                 icon={<Settings className="text-[#30454a]" size={24} />} 
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {isAddModalOpen && (
//         <AddEditModal 
//           type={activeTab}
//           onClose={() => setIsAddModalOpen(false)}
//           onSubmit={handleAddItem}
//         />
//       )}

//       {isEditModalOpen && (
//         <AddEditModal 
//           type={activeTab}
//           item={currentItem}
//           onClose={() => setIsEditModalOpen(false)}
//           onSubmit={handleEditItem}
//         />
//       )}
//     </div>
//   );
// }

// // UI Components
// function SongsTable({ songs, onEdit, onDelete }) {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedSongs = [...songs].sort((a, b) => {
//     if (sortConfig.key) {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//     }
//     return 0;
//   });

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Cover
//             </th>
//             <th 
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//               onClick={() => requestSort('title')}
//             >
//               <div className="flex items-center">
//                 Title
//                 {sortConfig.key === 'title' && (
//                   sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
//                 )}
//               </div>
//             </th>
//             <th 
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//               onClick={() => requestSort('artist')}
//             >
//               <div className="flex items-center">
//                 Artist
//                 {sortConfig.key === 'artist' && (
//                   sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
//                 )}
//               </div>
//             </th>
//             <th 
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//               onClick={() => requestSort('duration')}
//             >
//               <div className="flex items-center">
//                 Duration
//                 {sortConfig.key === 'duration' && (
//                   sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
//                 )}
//               </div>
//             </th>
//             <th 
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//               onClick={() => requestSort('language')}
//             >
//               <div className="flex items-center">
//                 Language
//                 {sortConfig.key === 'language' && (
//                   sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
//                 )}
//               </div>
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {sortedSongs.map((song) => (
//             <tr key={song.id}>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-10 h-10 rounded overflow-hidden">
//                   <img 
//                     src={song.image} 
//                     alt={`Album cover for ${song.title} by ${song.artist}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{song.title}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.artist}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.duration}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.language}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <div className="flex space-x-2">
//                   <button 
//                     onClick={() => onEdit(song)}
//                     className="text-[#30454a] hover:text-[#3a5157]"
//                   >
//                     <Edit size={16} />
//                   </button>
//                   <button 
//                     onClick={() => onDelete(song.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function SongsGrid({ songs }) {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//       {songs.map(song => (
//         <div 
//           key={song.id} 
//           className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//           style={{ backgroundColor: song.color }}
//         >
//           <div className="relative pt-[100%]">
//             <img 
//               src={song.image} 
//               alt={`Album cover for ${song.title} by ${song.artist}`}
//               className="absolute top-0 left-0 w-full h-full object-cover"
//             />
//           </div>
//           <div className="p-3">
//             <h3 className="font-semibold text-white truncate">{song.title}</h3>
//             <p className="text-sm text-white opacity-80 truncate">{song.artist}</p>
//             <div className="flex justify-between items-center mt-2">
//               <span className="text-xs text-white opacity-70">{song.duration}</span>
//               <span className="text-xs text-white opacity-70">{song.language}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function ArtistsTable({ artists, onEdit, onDelete }) {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedArtists = [...artists].sort((a, b) => {
//     if (sortConfig.key) {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//     }
//     return 0;
//   });

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Image
//             </th>
//             <th 
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//               onClick={() => requestSort('name')}
//             >
//               <div className="flex items-center">
//                 Name
//                 {sortConfig.key === 'name' && (
//                   sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
//                 )}
//               </div>
//             </th>
//             <th 
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//               onClick={() => requestSort('songsCount')}
//             >
//               <div className="flex items-center">
//                 Songs Count
//                 {sortConfig.key === 'songsCount' && (
//                   sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
//                 )}
//               </div>
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {sortedArtists.map((artist) => (
//             <tr key={artist.id}>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="w-10 h-10 rounded-full overflow-hidden">
//                   <img 
//                     src={artist.image} 
//                     alt={`Profile of ${artist.name}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{artist.name}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{artist.songsCount}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <div className="flex space-x-2">
//                   <button 
//                     onClick={() => onEdit(artist)}
//                     className="text-[#30454a] hover:text-[#3a5157]"
//                   >
//                     <Edit size={16} />
//                   </button>
//                   <button 
//                     onClick={() => onDelete(artist.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function DashboardCard({ title, value, icon }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-500 text-sm">{title}</p>
//           <h3 className="text-2xl font-bold mt-1 text-[#30454a]">{value}</h3>
//         </div>
//         <div className="p-3 rounded-full bg-[#Face6b] bg-opacity-20">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function AddEditModal({ type, item, onClose, onSubmit }) {
//   const [formData, setFormData] = useState(
//     item || (type === 'songs' 
//       ? { title: '', artist: '', duration: '', language: '', image: '' } 
//       : { name: '', image: '' })
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium text-[#30454a]">
//             {item ? 'Edit' : 'Add New'} {type === 'songs' ? 'Song' : 'Artist'}
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             &times;
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {type === 'songs' ? (
//             <>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
//                 <input
//                   type="text"
//                   name="artist"
//                   value={formData.artist}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
//                 <input
//                   type="text"
//                   name="language"
//                   value={formData.language}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
//                     placeholder="https://example.com/image.jpg"
//                   />
//                   <ImageIcon className="ml-2 text-[#30454a]" size={20} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
//                     placeholder="https://example.com/image.jpg"
//                   />
//                   <ImageIcon className="ml-2 text-[#30454a]" size={20} />
//                 </div>
//               </div>
//             </>
//           )}
//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#30454a] text-white rounded-md hover:bg-[#3a5157]"
//             >
//               {item ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';
import AddEditModal from '../components/admin/AddEditModal';
import SettingsContent from '../components/admin/SettingsContent';
import UsersContent from '../components/admin/UsersContent';
import ArtistsContent from '../components/admin/ArtistsContent';
import SongsContent from '../components/admin/SongsContent';
import DashboardContent from '../components/admin/DashboardContent';
import Header from '../components/admin/HeaderDashboard';
import Sidebar from '../components/admin/Sidebar';
import '../styles/DashboardContent.css';
import '../styles/Sidebar.css';
import '../styles/Header.css';

// Main Component
export default function AdminDashboard() {
 const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('grid');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [songs, setSongs] = useState([
    { 
      id: 1, 
      title: "Bohemian Rhapsody", 
      artist: "Queen", 
      duration: "5:55", 
      language: "English",
      image: "https://picsum.photos/400/400?random=1",
      color: "#Face6b",
      plays: 12540,
      likes: 892,
      trending: true
    },
    { 
      id: 2, 
      title: "Sweet Child O'Mine", 
      artist: "Guns N' Roses", 
      duration: "5:56", 
      language: "English",
      image: "https://picsum.photos/400/400?random=2",
      color: "#3a5157",
      plays: 8234,
      likes: 654,
      trending: false
    },
    { 
      id: 3, 
      title: "La Vie En Rose", 
      artist: "Édith Piaf", 
      duration: "3:07", 
      language: "French",
      image: "https://picsum.photos/400/400?random=3",
      color: "#Face6b",
      plays: 5476,
      likes: 423,
      trending: true
    }
  ]);
  
  const [artists, setArtists] = useState([
    { id: 1, name: "Queen", songsCount: 32, image: "https://picsum.photos/400/400?random=4", verified: true, followers: 125000 },
    { id: 2, name: "Guns N' Roses", songsCount: 28, image: "https://picsum.photos/400/400?random=5", verified: true, followers: 98000 },
    { id: 3, name: "Édith Piaf", songsCount: 15, image: "https://picsum.photos/400/400?random=6", verified: false, followers: 67000 }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSticky, setIsSticky] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (newItem) => {
    if (activeTab === 'songs') {
      setSongs([...songs, { 
        ...newItem, 
        id: songs.length + 1,
        image: newItem.image || `https://picsum.photos/400/400?random=${songs.length + 10}`,
        color: ['#Face6b', '#3a5157'][Math.floor(Math.random() * 2)],
        plays: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 1000),
        trending: Math.random() > 0.5
      }]);
    } else {
      setArtists([...artists, { 
        ...newItem, 
        id: artists.length + 1, 
        songsCount: 0,
        image: newItem.image || `https://picsum.photos/400/400?random=${artists.length + 20}`,
        verified: Math.random() > 0.5,
        followers: Math.floor(Math.random() * 100000)
      }]);
    }
    setIsAddModalOpen(false);
  };

  const handleEditItem = (updatedItem) => {
    if (activeTab === 'songs') {
      setSongs(songs.map(song => song.id === updatedItem.id ? updatedItem : song));
    } else {
      setArtists(artists.map(artist => artist.id === updatedItem.id ? updatedItem : artist));
    }
    setIsEditModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    if (activeTab === 'songs') {
      setSongs(songs.filter(song => song.id !== id));
    } else {
      setArtists(artists.filter(artist => artist.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewMode={setViewMode}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''} w-full flex-1 transition-all duration-300 overflow-y-auto z-30`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <Header 
            activeTab={activeTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddClick={() => {
              setCurrentItem(null);
              setIsAddModalOpen(true);
            }}
            isSticky={isSticky}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'dashboard' && (
              <DashboardContent songs={songs} artists={artists} />
            )}

            {activeTab === 'songs' && (
              <SongsContent 
                songs={filteredSongs}
                viewMode={viewMode}
                onEdit={(song) => {
                  setCurrentItem(song);
                  setIsEditModalOpen(true);
                }}
                onDelete={handleDeleteItem}
              />
            )}

            {activeTab === 'artists' && (
              <ArtistsContent 
                artists={filteredArtists}
                viewMode={viewMode}
                onEdit={(artist) => {
                  setCurrentItem(artist);
                  setIsEditModalOpen(true);
                }}
                onDelete={handleDeleteItem}
              />
            )}

            {activeTab === 'users' && (
              <UsersContent />
            )}

            {activeTab === 'settings' && (
              <SettingsContent />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddEditModal 
          type={activeTab}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddItem}
        />
      )}

      {isEditModalOpen && (
        <AddEditModal 
          type={activeTab}
          item={currentItem}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditItem}
        />
      )}
    </div>
  );
}