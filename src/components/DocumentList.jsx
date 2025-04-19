import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const DocumentList = ({ documents, activeDocument, setActiveDocument, folder }) => {
    return (
        <div className="mb-4">
            <h2 className="mb-3">{folder?.name || 'All Documents'}</h2>
            <Table hover className="border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr
                            key={doc.id}
                            className={activeDocument === doc.id ? 'table-primary' : ''}
                            onClick={() => setActiveDocument(doc.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>
                                <span className="me-2">📄</span>
                                {doc.name}
                            </td>
                            <td>{doc.lastUpdated}</td>
                            <td>
                                <Badge bg={doc.parsed ? 'success' : 'warning'} className="rounded-pill">
                                    {doc.parsed ? 'Parsed' : 'Unparsed'}
                                </Badge>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-link p-0 me-2">👁️</button>
                                {!doc.parsed && (
                                    <button className="btn btn-sm btn-link p-0">🔄</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DocumentList;