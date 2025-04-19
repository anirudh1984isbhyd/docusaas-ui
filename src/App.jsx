import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import FolderSidebar from './components/FolderSidebar';
import DocumentList from './components/DocumentList';
import DocumentViewer from './components/DocumentViewer';
import MetadataPanel from './components/MetadataPanel';
import AnalysisView from './components/AnalysisView';

function App() {
  // State management
  const [viewMode, setViewMode] = useState('standard');
  const [theme, setTheme] = useState('light');
  const [activeFolder, setActiveFolder] = useState('1');
  const [activeDocument, setActiveDocument] = useState(null);

  // Mock data for folders
  const [folders, setFolders] = useState([
    {
      id: '1',
      name: 'Project A',
      expanded: true,
      documents: [
        { id: 'd1', name: 'Requirements.gdoc', lastUpdated: '2023-04-15', parsed: true },
        { id: 'd2', name: 'Architecture.gdoc', lastUpdated: '2023-04-16', parsed: true },
        { id: 'd3', name: 'Timeline.gdoc', lastUpdated: '2023-04-17', parsed: false }
      ]
    },
    {
      id: '2',
      name: 'Project B',
      expanded: false,
      documents: [
        { id: 'd4', name: 'Roadmap.gdoc', lastUpdated: '2023-04-10', parsed: true },
        { id: 'd5', name: 'Budget.gdoc', lastUpdated: '2023-04-12', parsed: true }
      ]
    },
    {
      id: '3',
      name: 'Research',
      expanded: false,
      documents: [
        { id: 'd6', name: 'Literature Review.gdoc', lastUpdated: '2023-04-05', parsed: true },
        { id: 'd7', name: 'Methodology.gdoc', lastUpdated: '2023-04-07', parsed: true }
      ]
    }
  ]);

  // Toggle folder expanded state
  const toggleFolder = (folderId) => {
    setFolders(folders.map(folder =>
      folder.id === folderId
        ? { ...folder, expanded: !folder.expanded }
        : folder
    ));
  };

  // Get active folder object
  const getActiveFolder = () => {
    return folders.find(folder => folder.id === activeFolder);
  };

  // Get documents for active folder
  const getActiveDocuments = () => {
    if (activeFolder === 'all') {
      return folders.flatMap(folder => folder.documents);
    }
    const folder = getActiveFolder();
    return folder ? folder.documents : [];
  };

  // Get active document - improved to search through all folders
  const getActiveDocument = () => {
    if (!activeDocument) return null;

    // Look through all folders to find the document
    for (const folder of folders) {
      const document = folder.documents.find(doc => doc.id === activeDocument);
      if (document) {
        // Return a combined object with the document data and its folder info
        return {
          ...document,
          folder: folder.id,
          folderName: folder.name
        };
      }
    }

    return null;
  };

  // Render content based on view mode
  const renderContent = () => {
    const activeDocuments = getActiveDocuments();
    const folder = getActiveFolder();

    if (viewMode === 'standard') {
      return (
        <>
          <DocumentList
            documents={activeDocuments}
            activeDocument={activeDocument}
            setActiveDocument={setActiveDocument}
            folder={folder}
          />
          {activeDocument && (
            <>
              <DocumentViewer document={getActiveDocument()} />
              <MetadataPanel document={getActiveDocument()} />
            </>
          )}
        </>
      );
    } else if (viewMode === 'focus') {
      // Focus mode - just show document viewer
      return (
        <DocumentViewer document={getActiveDocument()} />
      );
    } else if (viewMode === 'analysis') {
      // Analysis mode
      return (
        <>
          <DocumentList
            documents={activeDocuments}
            activeDocument={activeDocument}
            setActiveDocument={setActiveDocument}
            folder={folder}
          />
          <AnalysisView folder={folder} documents={activeDocuments} />
        </>
      );
    }
  };

  return (
    <div className={`d-flex flex-column vh-100 ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="d-flex flex-grow-1">
        <FolderSidebar
          folders={folders}
          activeFolder={activeFolder}
          setActiveFolder={setActiveFolder}
          toggleFolder={toggleFolder}
          activeDocument={activeDocument}  // Added this prop
          setActiveDocument={setActiveDocument}  // Added this prop
        />

        <div className="flex-grow-1 p-3 overflow-auto">
          {renderContent()}
        </div>
      </div>

      <div className="border-top p-2 bg-light text-muted small">
        <div className="d-flex justify-content-between">
          <div>
            <span className="me-3">{getActiveDocuments().length} documents</span>
            <span className="me-3">{getActiveDocuments().filter(d => d.parsed).length} parsed</span>
            <span>{getActiveDocuments().filter(d => !d.parsed).length} unparsed</span>
          </div>
          <div>Last sync: 5 minutes ago</div>
        </div>
      </div>
    </div>
  );
}

export default App;