// Replace the team members grid section with this updated version:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
  {teamMembers.map((member) => (
    <div 
      key={member.id} 
      className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 transform transition duration-300 hover:shadow-2xl ${activeTeamMember === member.id ? 'ring-4 ring-blue-400 scale-105' : 'hover:scale-105'}`}
      onClick={() => handleTeamMemberClick(member.id)}
    >
      <div className="relative h-72 overflow-hidden group cursor-pointer">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/400x500?text=${member.name.replace(/\s+/g, '+')}`;
          }}
        />
        {/* Modified overlay and text positioning */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 group-hover:opacity-90 transition-opacity"></div>
        <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-300">
          <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-blue-200 text-sm mb-2">{member.role}</p>
          <div className="h-0.5 w-12 bg-blue-400 mb-2"></div>
          <p className="text-gray-200 text-xs">{member.department} | {member.year}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center">
            <Mail size={16} className="text-blue-500 mr-2" />
            <span className="text-gray-700 text-xs overflow-hidden overflow-ellipsis">{member.email}</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="text-blue-500 mr-2" />
            <span className="text-gray-700 text-xs">{member.phone}</span>
          </div>
          <div className="flex items-center">
            <Github size={16} className="text-blue-500 mr-2" />
            <a href={`https://${member.github}`} className="text-blue-600 hover:underline text-xs">{member.github}</a>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>