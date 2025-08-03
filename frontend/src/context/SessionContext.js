import React, { createContext, useContext, useState, useEffect } from 'react';
import { sessionService } from '../services/sessionService';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionService.getSessions();
      setSessions(response.data.sessions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMySessions = async () => {
    try {
      setLoading(true);
      const response = await sessionService.getMySessions();
      setSessions(response.data.sessions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSession = async (id) => {
    try {
      setLoading(true);
      const response = await sessionService.getSession(id);
      setCurrentSession(response.data.session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (sessionData) => {
    try {
      setLoading(true);
      const response = await sessionService.saveDraft(sessionData);
      return response.data.session;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const publishSession = async (sessionData) => {
    try {
      setLoading(true);
      const response = await sessionService.publishSession(sessionData);
      return response.data.session;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (id) => {
    try {
      setLoading(true);
      await sessionService.deleteSession(id);
      await fetchMySessions();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        currentSession,
        sessions,
        loading,
        error,
        fetchSessions,
        fetchMySessions,
        getSession,
        saveDraft,
        publishSession,
        deleteSession,
        setCurrentSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};