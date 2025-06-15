// Stats Card Component
export default function StatsCard({ title, value, icon: Icon, color, growth }) {
 return (
    <div className="stats-card" style={{ '--card-color': color }}>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <h3 className="card-value">{value}</h3>
        <div className="card-growth">
          <span className="growth-value">{growth}</span>
          <span className="growth-period">ce mois</span>
        </div>
      </div>
      <div className="card-icon">
        <Icon size={24} />
      </div>
    </div>
  );
}