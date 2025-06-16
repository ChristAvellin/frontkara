// // Add/Edit Modal Component
// import { useState, useRef } from 'react';
// import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

// export default function AddEditModal({ type, item, onClose, onSubmit }) {
//  const [formData, setFormData] = useState(
//     item || (type === 'songs' 
//       ? { 
//           title: '', 
//           artist: '', 
//           genre: '', 
//           duration: '', 
//           imageFile: null, 
//           audioFile: null, 
//           lyrics: '' 
//         } 
//       : { name: '', imageFile: null })
//   );
//   const imageInputRef = useRef(null);
//   const audioInputRef = useRef(null);
//   const [previewImage, setPreviewImage] = useState(item?.imageFile || null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData(prev => ({ ...prev, [name]: files[0] }));
//     if (name === 'imageFile' && files[0]) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(files[0]);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const dataToSubmit = new FormData();
//     dataToSubmit.append('title', formData.title);
//     dataToSubmit.append('artist', formData.artist);
//     dataToSubmit.append('genre', formData.genre);
//     dataToSubmit.append('duration', formData.duration);
//     dataToSubmit.append('lyrics', formData.lyrics || '');
//     dataToSubmit.append('imageFile', formData.imageFile || '');
//     dataToSubmit.append('audioFile', formData.audioFile || '');
//     dataToSubmit.append('playCount', 0);
//     dataToSubmit.append('isActive', true);
//     if (item?.id) dataToSubmit.append('id', item.id);

//     onSubmit(dataToSubmit);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overlay-modal" onClick={onClose}>
//       <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl sm:max-w-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-[#3a5157]">
//             {item ? 'Modifier' : 'Ajouter'} {type === 'songs' ? 'Chanson' : 'Artiste'}
//           </h3>
//           <button 
//             onClick={onClose} 
//             className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
//           >
//             ×
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {type === 'songs' ? (
//             <div className="fields-container overflow-y-auto max-h-[70vh] sm:max-h-full">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Titre <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Artiste <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     name="artist"
//                     value={formData.artist}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Genre <span className="text-red-500">*</span></label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     required
//                   >
//                     <option value="">Sélectionner un genre</option>
//                     <option value="Pop">Pop</option>
//                     <option value="Rock">Rock</option>
//                     <option value="Hip Hop">Hip Hop</option>
//                     <option value="R&B">R&B</option>
//                     <option value="Country">Country</option>
//                     <option value="Jazz">Jazz</option>
//                     <option value="Electronic">Electronic</option>
//                     <option value="Classical">Classical</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Durée <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     placeholder="ex: 3:45"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Image <span className="text-red-500">*</span></label>
//                   <input
//                     type="file"
//                     name="imageFile"
//                     ref={imageInputRef}
//                     onChange={handleFileChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     accept="image/*"
//                     required={!item?.imageFile}
//                   />
//                   {previewImage && (
//                     <div className="mt-1 w-24 h-24 overflow-hidden rounded-lg">
//                       <img src={previewImage} alt="Aperçu" className="w-full h-full object-cover" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Fichier audio <span className="text-red-500">*</span></label>
//                   <input
//                     type="file"
//                     name="audioFile"
//                     ref={audioInputRef}
//                     onChange={handleFileChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     accept="audio/*"
//                     required={!item?.audioFile}
//                   />
//                 </div>
//                 <div className="mb-2 col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Paroles (optionnel)</label>
//                   <textarea
//                     name="lyrics"
//                     value={formData.lyrics}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all h-24 resize-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="fields-container overflow-y-auto max-h-[70vh] sm:max-h-full">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Image <span className="text-red-500">*</span></label>
//                   <input
//                     type="file"
//                     name="imageFile"
//                     ref={imageInputRef}
//                     onChange={handleFileChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
//                     accept="image/*"
//                     required={!item?.imageFile}
//                   />
//                   {previewImage && (
//                     <div className="mt-1 w-24 h-24 overflow-hidden rounded-lg">
//                       <img src={previewImage} alt="Aperçu" className="w-full h-full object-cover" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//           <div className="flex justify-end space-x-3 gap-3 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//               style={{
//                 marginLeft: "auto"
//               }}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-gradient-to-r from-[#3a5157] to-[#2a3d42] text-white rounded-xl hover:shadow-lg transition-all submit-button"
//             >
//               {item ? 'Mettre à jour' : 'Ajouter'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




import { useState, useRef } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function AddEditModal({ type, item, onClose, onSubmit }) {
  const [formData, setFormData] = useState(
    item || (type === 'songs'
      ? {
          title: '',
          artist: '',
          genre: '',
          duration: '',
          imageFile: null,
          audioFile: null,
          lyrics: ''
        }
      : { name: '', imageFile: null })
  );
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(item?.imageFile || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
    if (name === 'imageFile' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    dataToSubmit.append('title', formData.title);
    dataToSubmit.append('artist', formData.artist);
    dataToSubmit.append('genre', formData.genre);
    dataToSubmit.append('duration', formData.duration);
    dataToSubmit.append('lyrics', formData.lyrics || '');
    dataToSubmit.append('imageFile', formData.imageFile || '');
    dataToSubmit.append('audioFile', formData.audioFile || '');
    dataToSubmit.append('playCount', 0);
    dataToSubmit.append('isActive', true);
    if (item?.id) dataToSubmit.append('id', item.id);

    onSubmit(dataToSubmit);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overlay-modal" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl sm:max-w-xl modal-resize"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#3a5157]">
            {item ? 'Modifier' : 'Ajouter'} {type === 'songs' ? 'Chanson' : 'Artiste'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'songs' ? (
            <div className="fields-container overflow-y-auto max-h-[70vh] sm:max-h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Artiste <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre <span className="text-red-500">*</span></label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Sélectionner un genre</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="R&B">R&B</option>
                    <option value="Country">Country</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Classical">Classical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    placeholder="ex: 3:45"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    name="imageFile"
                    ref={imageInputRef}
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    accept="image/*"
                    required={!item?.imageFile}
                  />
                  {previewImage && (
                    <div className="mt-1 w-24 h-24 overflow-hidden rounded-lg">
                      <img src={previewImage} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fichier audio <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    name="audioFile"
                    ref={audioInputRef}
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    accept="audio/*"
                    required={!item?.audioFile}
                  />
                </div>
                <div className="mb-2 col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paroles (optionnel)</label>
                  <textarea
                    name="lyrics"
                    value={formData.lyrics}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all h-24 resize-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="fields-container overflow-y-auto max-h-[70vh] sm:max-h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    name="imageFile"
                    ref={imageInputRef}
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                    accept="image/*"
                    required={!item?.imageFile}
                  />
                  {previewImage && (
                    <div className="mt-1 w-24 h-24 overflow-hidden rounded-lg">
                      <img src={previewImage} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-3 gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ marginLeft: "auto" }}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#3a5157] to-[#2a3d42] text-white rounded-xl hover:shadow-lg transition-all submit-button"
            >
              {item ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}