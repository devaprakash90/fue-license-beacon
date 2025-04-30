
import React from "react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description?: string;
  link: string;
  icon?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, link, icon }) => {
  return (
    <Link to={link} className="feature-card group">
      <div className="feature-card-content">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-belize-100 p-3 text-belize-500 group-hover:bg-belize-500 group-hover:text-white transition-all">
            {icon}
          </div>
        </div>
        <h3 className="feature-card-title text-center">{title}</h3>
        {description && <p className="feature-card-description text-center">{description}</p>}
      </div>
    </Link>
  );
};

export default FeatureCard;
