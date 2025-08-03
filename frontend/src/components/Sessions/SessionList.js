import React from 'react';
import SessionCard from '../Dashboard/SessionCard';

const SessionList = ({ sessions, loading, error, onSessionSelect }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading sessions: {error.message}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
        <p className="text-gray-600">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <div 
          key={session._id} 
          onClick={() => onSessionSelect && onSessionSelect(session)}
          className="cursor-pointer"
        >
          <SessionCard session={session} showAuthor={true} />
        </div>
      ))}
    </div>
  );
};

export default SessionList;