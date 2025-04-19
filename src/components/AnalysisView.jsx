import React from 'react';
import { Card, Row, Col, Form, Dropdown } from 'react-bootstrap';

const AnalysisView = ({ folder, documents }) => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Document Analysis</h4>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary">
                        Topics
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Topics</Dropdown.Item>
                        <Dropdown.Item>Entities</Dropdown.Item>
                        <Dropdown.Item>Timeline</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="mb-3">Topic Distribution</div>

            <Row className="mb-4">
                <Col md={6}>
                    <div className="border rounded p-5 text-center bg-light mb-3">
                        <p className="mb-1">Chart Placeholder</p>
                        <p className="text-muted mb-0">Topic Distribution Chart</p>
                    </div>
                </Col>

                <Col md={6}>
                    <div className="border rounded p-5 text-center bg-light mb-3">
                        <p className="mb-1">Chart Placeholder</p>
                        <p className="text-muted mb-0">Document Timeline Chart</p>
                    </div>
                </Col>
            </Row>

            <h5 className="mb-3">Key Insights</h5>

            <div className="mb-3 p-3 rounded bg-primary bg-opacity-10">
                <h6>Topic Correlation</h6>
                <p className="mb-0">Documents with architecture topics frequently also mention system design and APIs.</p>
            </div>

            <div className="mb-3 p-3 rounded bg-success bg-opacity-10">
                <h6>Recent Updates</h6>
                <p className="mb-0">3 documents were updated in the last week, mostly related to project requirements.</p>
            </div>

            <div className="mb-3 p-3 rounded bg-info bg-opacity-10">
                <h6>Entity Connections</h6>
                <p className="mb-0">System Design appears in 5 documents across 2 different folders.</p>
            </div>
        </div>
    );
};

export default AnalysisView;