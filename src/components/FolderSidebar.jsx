import React from 'react';
import { Nav, Form } from 'react-bootstrap';

const FolderSidebar = ({ folders, activeFolder, setActiveFolder, toggleFolder, activeDocument, setActiveDocument }) => {
    return (
        <div className="border-end bg-light" style={{ width: '260px', height: '100%', overflowY: 'auto' }}>
            <div className="p-3">
                <h5 className="mb-3">Folders</h5>

                <Nav className="flex-column">
                    <Nav.Link
                        className={`d-flex align-items-center ${activeFolder === 'all' ? 'bg-primary text-white rounded' : ''}`}
                        onClick={() => setActiveFolder('all')}
                        style={{ padding: '0.5rem' }}
                    >
                        <span className="me-2">📁</span> All Documents
                    </Nav.Link>

                    {folders.map(folder => (
                        <div key={folder.id}>
                            <Nav.Link
                                className={`d-flex align-items-center ${activeFolder === folder.id ? 'bg-primary text-white rounded' : ''}`}
                                onClick={() => setActiveFolder(folder.id)}
                                style={{ padding: '0.5rem' }}
                            >
                                <span
                                    className="me-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFolder(folder.id);
                                    }}
                                >
                                    {folder.expanded ? '▼' : '▶'}
                                </span>
                                <span className="me-1">📁</span> {folder.name}
                                <span className="ms-auto text-white bg-secondary rounded-circle px-2">{folder.documents.length}</span>
                            </Nav.Link>

                            {folder.expanded && folder.documents.map(doc => (
                                <Nav.Link
                                    key={doc.id}
                                    className={`d-flex align-items-center ps-4 ${activeDocument === doc.id ? 'bg-light border' : 'text-primary'}`}
                                    style={{ padding: '0.35rem 0.5rem' }}
                                    onClick={() => setActiveDocument(doc.id)}
                                >
                                    <span className="me-2">📄</span> {doc.name}
                                </Nav.Link>
                            ))}
                        </div>
                    ))}
                </Nav>
            </div>

            <div className="p-3 border-top">
                <h5 className="mb-3">Filters</h5>

                <Form className="mb-3">
                    <Form.Control
                        placeholder="Search documents..."
                        aria-label="Search documents"
                        className="mb-3"
                    />

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select>
                            <option value="all">All Documents</option>
                            <option value="parsed">Parsed</option>
                            <option value="unparsed">Unparsed</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Sort By</Form.Label>
                        <Form.Select>
                            <option value="name">Name</option>
                            <option value="date">Last Updated</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default FolderSidebar;