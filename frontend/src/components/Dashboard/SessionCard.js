import React from 'react';
import { Link } from 'react-router-dom';

const SessionCard = ({ session, showAuthor = false, onEdit, onDelete, showActions = false }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      yoga: '🧘‍♀️',
      meditation: '🧘',
      breathing: '💨',
      mindfulness: '🌸',
      other: '✨'
    };
    return icons[category] || '✨';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getCategoryIcon(session.category)}</span>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(session.difficulty)}`}>
                {session.difficulty}
              </span>
              {showActions && (
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                  {session.status}
                </span>
              )}
            </div>
          </div>
          {session.duration > 0 && (
            <span className="text-sm text-gray-500">{session.duration} min</span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {session.title}
        </h3>

        {session.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {session.description}
          </p>
        )}

        {session.tags && session.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {session.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
            {session.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{session.tags.length - 3} more</span>
            )}
          </div>
        )}

        {showAuthor && session.user_id && (
          <div className="flex items-center mt-4">
            <div className="text-sm text-gray-500">
              Created by {session.user_id.name || session.user_id.email}
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => onEdit(session._id)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(session._id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;