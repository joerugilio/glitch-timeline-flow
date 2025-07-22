
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFileStructure, getCategoryIcon, getCategoryColor, type FileItem } from '@/utils/fileSystem';
import { Search, Download, Eye, Copy, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FileBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const files = getFileStructure();
  
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(files.map(f => f.category)))];
  
  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(window.location.origin + path);
    toast({
      title: "Copied!",
      description: "File URL copied to clipboard",
    });
  };

  const handleViewFile = (file: FileItem) => {
    window.open(file.path, '_blank');
  };

  const handleDownloadFile = (file: FileItem) => {
    const link = document.createElement('a');
    link.href = file.path;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const FileCard: React.FC<{ file: FileItem }> = ({ file }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon(file.category)}</span>
            <div>
              <CardTitle className="text-base">{file.name}</CardTitle>
              <CardDescription className="text-xs font-mono">
                {file.path}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getCategoryColor(file.category)}>
            {file.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {file.description && (
          <p className="text-sm text-muted-foreground mb-3">
            {file.description}
          </p>
        )}
        {file.size && (
          <p className="text-xs text-muted-foreground mb-3">
            Size: {file.size}
          </p>
        )}
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewFile(file)}
            className="flex items-center gap-1 text-xs"
          >
            <Eye className="w-3 h-3" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDownloadFile(file)}
            className="flex items-center gap-1 text-xs"
          >
            <Download className="w-3 h-3" />
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopyPath(file.path)}
            className="flex items-center gap-1 text-xs"
          >
            <Copy className="w-3 h-3" />
            Copy URL
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6" />
            <h1 className="text-3xl font-bold">Site Files</h1>
          </div>
          <p className="text-muted-foreground">
            Browse and download individual files from the compiled site. 
            This page provides direct access to all static assets, compiled bundles, and resources.
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mb-6">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === 'all' ? 'All Files' : `${getCategoryIcon(category as FileItem['category'])} ${category}`}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory}>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFiles.map((file) => (
                <FileCard key={file.path} file={file} />
              ))}
            </div>
            
            {filteredFiles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No files found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FileBrowser;
