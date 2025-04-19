// Update DocumentViewer.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

const DocumentViewer = ({ document }) => {
    if (!document) {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <p className="text-center text-muted my-5">
                        Select a document to view its content
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{document.name}</h5>
                <div>
                    <Button variant="outline-secondary" size="sm" className="me-2">
                        ✏️ Edit
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="me-2">
                        💾 Save
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                        ⤢ Fullscreen
                    </Button>
                </div>
            </div>
            <div className="card-body">
                <div className="border rounded p-3" style={{ minHeight: "200px" }}>
                    <p>Document content would appear here...</p>
                    <p className="text-muted mt-3">
                        This is a placeholder for the document content. In a real implementation,
                        this would display the actual content of the selected Google Doc.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentViewer;