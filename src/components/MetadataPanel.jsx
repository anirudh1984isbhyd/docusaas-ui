import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';

const MetadataPanel = ({ document }) => {
    if (!document) return null;

    // Mock metadata for demonstration
    const topics = ['Documentation', 'Architecture'];
    const entities = ['System Design', 'API'];

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="mb-0">Document Metadata</h5>
            </div>
            <div className="card-body">
                <Row>
                    <Col md={6}>
                        <h6 className="mb-3">Basic Information</h6>
                        <div className="mb-2">
                            <strong className="me-2">Name:</strong>
                            <span>{document.name}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="me-2">Last Updated:</strong>
                            <span>{document.lastUpdated}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="me-2">Status:</strong>
                            <Badge bg={document.parsed ? 'success' : 'warning'}>
                                {document.parsed ? 'Parsed' : 'Unparsed'}
                            </Badge>
                        </div>
                    </Col>

                    <Col md={6}>
                        <h6 className="mb-3">Content Analysis</h6>
                        <div className="mb-2">
                            <strong className="me-2">Topics:</strong>
                            <div>
                                {topics.map(topic => (
                                    <Badge key={topic} bg="primary" className="me-1 mb-1">{topic}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <strong className="me-2">Entities:</strong>
                            <div>
                                {entities.map(entity => (
                                    <Badge key={entity} bg="info" className="me-1 mb-1">{entity}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <strong className="me-2">Created By:</strong>
                            <span>User Example</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MetadataPanel;