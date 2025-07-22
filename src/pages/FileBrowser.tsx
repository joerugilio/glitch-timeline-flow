import React, { useState } from 'react';
import { Download, FileText, Folder, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSystemItem, getFileStructure } from '@/utils/fileSystem';
import { exportAllData } from '@/utils/dataExporter';

const FileBrowser = () => {
  const [fileStructure, setFileStructure] = useState<FileSystemItem[]>(getFileStructure());
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = fileStructure.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = (item: FileSystemItem) => (
    <Card key={item.name} className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
        {item.type === 'file' ? (
          <Badge variant="secondary">File</Badge>
        ) : (
          <Badge variant="outline">Folder</Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm">
          {item.type === 'file' ? (
            <>
              <FileText className="h-4 w-4 opacity-70" />
              <span className="text-muted-foreground">Size: {item.size}</span>
            </>
          ) : (
            <>
              <Folder className="h-4 w-4 opacity-70" />
              <span className="text-muted-foreground">Contains: {item.children?.length} items</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderGrid = () => (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredFiles.map(item => renderItem(item))}
    </div>
  );

  const renderList = () => (
    <div className="divide-y divide-border">
      {filteredFiles.map(item => (
        <div key={item.name} className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            {item.type === 'file' ? (
              <FileText className="h-5 w-5" />
            ) : (
              <FolderOpen className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <div>
            {item.type === 'file' ? (
              <Badge variant="secondary">File</Badge>
            ) : (
              <Badge variant="outline">Folder</Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>File Browser</CardTitle>
          <CardDescription>Explore and manage your files.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Input
              type="search"
              placeholder="Search files..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="flex space-x-2">
              <Button onClick={() => exportAllData()}>
                <Download className="mr-2 h-4 w-4" />
                Export All
              </Button>
            </div>
          </div>
          <Tabs defaultValue="grid" className="mt-4">
            <TabsList>
              <TabsTrigger value="grid" onClick={() => setViewMode('grid')}>Grid</TabsTrigger>
              <TabsTrigger value="list" onClick={() => setViewMode('list')}>List</TabsTrigger>
            </TabsList>
            <TabsContent value="grid">
              {renderGrid()}
            </TabsContent>
            <TabsContent value="list">
              {renderList()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileBrowser;
