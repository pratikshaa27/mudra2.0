import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExportButtons({ data }) {
  const handleExportExcel = () => {
    // Create CSV content (Excel can open CSV files)
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + "Total Loans Sanctioned,50.12 Cr\n"
      + "Amount Disbursed,₹33.89 L Cr\n"
      + "Active Users,2.45 Lac\n"
      + "Success Rate,98.5%\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MUDRA_Dashboard_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleExportExcel}
        className="flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 border-2 border-white"
        size="sm"
      >
        <FileSpreadsheet size={18} />
        <span className="font-semibold">Export to Excel</span>
      </Button>
    </div>
  );
}