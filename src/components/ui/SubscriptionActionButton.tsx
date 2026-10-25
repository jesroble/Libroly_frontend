import React from 'react';

interface Props {
  onClick: () => void;
  planName: string;
  price: string;
  description: string[];
  isActive?: boolean;
  highlight?: boolean;
}

const SubscriptionActionButton: React.FC<Props> = ({ 
  onClick,
  planName,
  price,
  description,
  isActive = false,
  highlight = false 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
        isActive 
          ? 'border-coral-500 bg-coral-50' 
          : highlight 
            ? 'border-coral-300 hover:border-coral-400' 
            : 'border-gray-200 hover:border-coral-200'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-900">{planName}</p>
          <p className="text-sm text-gray-600">€{price}/mes</p>
          <ul className="mt-2 space-y-1">
            {description.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-green-500"><i className="fas fa-check"></i></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {isActive && (
          <span className="text-coral-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </div>
    </button>
  );
};

export default SubscriptionActionButton;
