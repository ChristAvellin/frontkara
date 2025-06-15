import { Users, Image as ImageIcon, } from 'lucide-react';

// Users Content Component
export default function UsersContent() {
   return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-[#3a5157] mb-4">Utilisateurs</h3>
      <div className="text-gray-500 flex items-center justify-center h-64">
        <div className="text-center">
          <Users className="mx-auto text-[#Face6b] mb-4" size={48} />
          <p>Gestion des utilisateurs (Placeholder)</p>
          <p className="text-sm mt-2">Cette section sera implémentée pour afficher et gérer les utilisateurs.</p>
        </div>
      </div>
    </div>
  );
}