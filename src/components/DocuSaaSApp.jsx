import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import FolderSidebar from './FolderSidebar';
import DocumentList from './DocumentList';
import DocumentViewer from './DocumentViewer';
import MetadataPanel from './MetadataPanel';
import AnalysisView from './AnalysisView';

const DocuSaaSApp = () => {
    // State management
    const [viewMode, setViewMode] = useState('standard'); // 'standard', 'focus', 'analysis'
    const [activeFolder, setActiveFolder] = useState('1'); // ID of active folder
    const [activeDocument, setActiveDocument] = useState(null); // ID of active document
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'

    // Mock data for folders
    const folders = [
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
                { id: 'd7', name: 'Methodology.gdoc', lastUpdated: '2023-04-07', parsed: true },
                { id: 'd8', name: 'Results.gdoc', lastUpdated: '2023-04-09', parsed: true },
                { id: 'd9', name: 'Conclusions.gdoc', lastUpdated: '2023-04-11', parsed: false }
            ]
        }
    ];

    // Get all documents across all folders
    const getAllDocuments = () => {
        let allDocs = [];
        folders.forEach(folder => {
            folder.documents.forEach(doc => {
                allDocs.push({ ...doc, folder: folder.id, folderName: folder.name });
            });
        });
        return allDocs;
    };

    // Get documents for the active folder
    const getActiveDocuments = () => {
        if (activeFolder === 'all') {
            return getAllDocuments();
        }

        const folder = folders.find(f => f.id === activeFolder);
        if (!folder) return [];

        return folder.documents.map(doc => ({ ...doc, folder: folder.id, folderName: folder.name }));
    };

    // Get document details
    const getDocumentDetails = (docId) => {
        const allDocs = getAllDocuments();
        return allDocs.find(doc => doc.id === docId) || null;
    };

    // Toggle folder expanded state
    const toggleFolder = (folderId) => {
        const updatedFolders = folders.map(folder =>
            folder.id === folderId
                ? { ...folder, expanded: !folder.expanded }
                : folder
        );
        // In a real app, you'd update state here
    };

    // Render different layouts based on view mode
    const renderContent = () => {
        const activeDocDetails = activeDocument ? getDocumentDetails(activeDocument) : null;
        const activeDocuments = getActiveDocuments();

        switch (viewMode) {
            case 'standard':
                return (
                    <Row className="flex-grow-1">
                        <Col md={9} className="d-flex flex-column">
                            <DocumentList
                                documents={activeDocuments}
                                activeDocument={activeDocument}
                                setActiveDocument={setActiveDocument}
                            />
                            {activeDocument && (
                                <>
                                    <DocumentViewer document={activeDocDetails} />
                                    <MetadataPanel document={activeDocDetails} />
                                </>
                            )}
                        </Col>
                    </Row>
                );

            case 'focus':
                return (
                    <Row className="flex-grow-1">
                        <Col className="d-flex flex-column">
                            {activeDocument ? (
                                <DocumentViewer document={activeDocDetails} fullscreen={true} />
                            ) : (
                                <div className="text-center p-5">
                                    <p>Select a document to view</p>
                                </div>
                            )}
                        </Col>
                    </Row>
                );

            case 'analysis':
                return (
                    <Row className="flex-grow-1">
                        <Col className="d-flex flex-column">
                            <DocumentList
                                documents={activeDocuments}
                                activeDocument={activeDocument}
                                setActiveDocument={setActiveDocument}
                                compact={true}
                            />
                            <AnalysisView folder={activeFolder} documents={activeDocuments} />
                        </Col>
                    </Row>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`d-flex flex-column vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light'}`}>
            <Header
                viewMode={viewMode}
                setViewMode={setViewMode}
                theme={theme}
                setTheme={setTheme}
            />

            <Container fluid className="flex-grow-1 d-flex p-0">
                <FolderSidebar
                    folders={folders}
                    activeFolder={activeFolder}
                    setActiveFolder={setActiveFolder}
                    toggleFolder={toggleFolder}
                    theme={theme}
                />

                <div className="flex-grow-1 d-flex flex-column">
                    {renderContent()}

                    <div className="border-top p-1 small text-muted d-flex justify-content-between">
                        <div>
                            <span className="me-3">{getActiveDocuments().length} documents</span>
                            <span className="me-3">{getActiveDocuments().filter(d => d.parsed).length} parsed</span>
                            <span>{getActiveDocuments().filter(d => !d.parsed).length} unparsed</span>
                        </div>
                        <div>Last sync: 5 minutes ago</div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default DocuSaaSApp;