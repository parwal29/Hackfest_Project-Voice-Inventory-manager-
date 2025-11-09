import { useTranslation } from "react-i18next";
import { useDocuments } from "@/contexts/DocumentsContext";
import { DashboardCard } from "@/components/DashboardCard";
import { FileText, Upload, File, FolderOpen, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Documents() {
  const { t } = useTranslation();
  const { documents, loading, uploadDocument, deleteDocument, getTotalSize, getTotalFiles } = useDocuments();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadDocument(files[i]);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
    }
  };

  const handleDownload = (doc: any) => {
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      a.click();
      URL.revokeObjectURL(url);
    } else if (doc.url) {
      const a = document.createElement('a');
      a.href = doc.url;
      a.download = doc.name;
      a.click();
    }
  };

  const totalSize = getTotalSize();
  const totalFiles = getTotalFiles();
  const storageUsed = (totalSize / 1024).toFixed(1); // Convert KB to MB
  const storageTotal = 10; // 10 GB
  const storagePercent = ((totalSize / 1024 / 1024) / storageTotal * 100).toFixed(1);

  if (loading) {
    return (
      <div className="p-6 space-y-6 relative z-10 animate-in fade-in duration-500">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading documents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 relative z-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">Manage invoices, reports, and files</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
          />
          <Button 
            className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Documents</h3>
          {documents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p>No documents yet. Upload your first document to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={cn(
                    "flex items-center justify-between p-4 bg-secondary rounded-lg",
                    "hover:bg-secondary/80 transition-all hover:scale-[1.01]",
                    "animate-in fade-in slide-in-from-left"
                  )}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <File className="w-8 h-8 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{doc.size}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                      className="hover:bg-primary/10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(doc.id)}
                      className="hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>

        <div className="space-y-6">
          <DashboardCard>
            <div className="text-center">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-lg font-semibold text-foreground mb-1">Storage</h3>
              <p className="text-2xl font-bold text-foreground mb-1">
                {parseFloat(storageUsed) > 1024 
                  ? `${(parseFloat(storageUsed) / 1024).toFixed(2)} GB` 
                  : `${storageUsed} MB`}
              </p>
              <p className="text-sm text-muted-foreground">of {storageTotal} GB used</p>
              <div className="mt-3 w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(parseFloat(storagePercent), 100)}%` }}
                />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h3 className="text-lg font-semibold text-foreground mb-1">Total Files</h3>
              <p className="text-2xl font-bold text-foreground">{totalFiles}</p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
