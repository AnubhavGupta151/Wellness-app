import React, { useState, useEffect } from 'react';
import { sessionService } from '../../services/sessionService';
import { toast } from 'react-toastify';
import LoadingSpinner from '../Common/LoadingSpinner';
import SessionCard from '../Dashboard/SessionCard';
import { useNavigate } from 'react-router-dom';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, [statusFilter]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionService.getMySessions(statusFilter);
      setSessions(response.data.sessions);
    } catch (error) {
      toast.error('Failed to fetch your sessions');
      console.error('Fetch sessions error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/session-editor/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await sessionService.deleteSession(id);
        toast.success('Session deleted successfully');
        fetchSessions();
      } catch (error) {
        toast.error('Failed to delete session');
        console.error('Delete session error', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Statuses</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select>
          <button
            onClick={() => navigate('/session-editor')}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create New Session
          </button>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {statusFilter === 'draft' 
              ? 'You have no draft sessions' 
              : statusFilter === 'published' 
                ? 'You have no published sessions' 
                : 'You have not created any sessions yet'}
          </h3>
          <p className="text-gray-600">
            Get started by creating your first wellness session
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;