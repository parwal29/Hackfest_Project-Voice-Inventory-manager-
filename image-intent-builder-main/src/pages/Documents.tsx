import { DashboardCard } from "@/components/DashboardCard";
import { FileText, Upload, File, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Documents() {
  const documents = [
    { name: "Invoice_2024_001.pdf", type: "Invoice", date: "2024-01-15", size: "245 KB" },
    { name: "Purchase_Order_Q1.xlsx", type: "Purchase Order", date: "2024-01-10", size: "128 KB" },
    { name: "Sales_Report_Dec.pdf", type: "Report", date: "2024-01-05", size: "512 KB" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">Manage invoices, reports, and files</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Documents</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <File className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{doc.size}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="space-y-6">
          <DashboardCard>
            <div className="text-center">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-lg font-semibold text-foreground mb-1">Storage</h3>
              <p className="text-2xl font-bold text-foreground mb-1">2.4 GB</p>
              <p className="text-sm text-muted-foreground">of 10 GB used</p>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 text-accent" />
              <h3 className="text-lg font-semibold text-foreground mb-1">Total Files</h3>
              <p className="text-2xl font-bold text-foreground">156</p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
