import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  file?: File;
  url?: string;
}

interface DocumentsContextType {
  documents: Document[];
  loading: boolean;
  uploadDocument: (file: File) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  getTotalSize: () => number;
  getTotalFiles: () => number;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  // Load documents from localStorage or Supabase
  const loadDocuments = async () => {
    if (!isAuthenticated || !user) {
      // Fallback to localStorage
      const stored = localStorage.getItem('documents');
      if (stored) {
        try {
          setDocuments(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load documents:', e);
        }
      }
      setLoading(false);
      return;
    }

    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formatted: Document[] = data.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          type: doc.type,
          date: new Date(doc.created_at).toLocaleDateString(),
          size: doc.size,
          url: doc.url,
        }));
        setDocuments(formatted);
      }
    } catch (error) {
      console.warn('Failed to load from Supabase, using localStorage:', error);
      const stored = localStorage.getItem('documents');
      if (stored) {
        try {
          setDocuments(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load documents:', e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [isAuthenticated, user?.id]);

  const uploadDocument = async (file: File) => {
    const fileSize = (file.size / 1024).toFixed(0) + ' KB';
    const fileType = file.type.split('/')[1]?.toUpperCase() || 'FILE';
    const docType = file.name.includes('invoice') ? 'Invoice' : 
                   file.name.includes('order') ? 'Purchase Order' :
                   file.name.includes('report') ? 'Report' : 'Document';

    const newDoc: Document = {
      id: crypto.randomUUID(),
      name: file.name,
      type: docType,
      date: new Date().toLocaleDateString(),
      size: fileSize,
      file: file,
    };

    const updatedDocs = [newDoc, ...documents];
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));

    // Try to save to Supabase
    if (isAuthenticated && user) {
      try {
        // Convert file to base64 or upload to storage
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          const { error } = await supabase
            .from('documents')
            .insert({
              id: newDoc.id,
              user_id: user.id,
              name: newDoc.name,
              type: newDoc.type,
              size: newDoc.size,
              url: base64, // Store as base64 for now
            });

          if (error) {
            console.warn('Failed to save to Supabase:', error);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.warn('Failed to upload to Supabase:', error);
      }
    }
  };

  const deleteDocument = async (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));

    if (isAuthenticated && user) {
      try {
        await supabase.from('documents').delete().eq('id', id);
      } catch (error) {
        console.warn('Failed to delete from Supabase:', error);
      }
    }
  };

  const getTotalSize = () => {
    return documents.reduce((total, doc) => {
      const size = parseFloat(doc.size) || 0;
      return total + size;
    }, 0);
  };

  const getTotalFiles = () => {
    return documents.length;
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        loading,
        uploadDocument,
        deleteDocument,
        getTotalSize,
        getTotalFiles,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
}

