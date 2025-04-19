import React from 'react';
import { Navbar, Nav, Button, ButtonGroup } from 'react-bootstrap';

const Header = ({ viewMode, setViewMode, theme, setTheme }) => {
    return (
        <Navbar bg={theme === 'dark' ? 'dark' : 'light'}
            variant={theme === 'dark' ? 'dark' : 'light'}
            className="border-bottom">
            <div className="container-fluid">
                <Navbar.Brand className="fw-bold">DocuSaaS</Navbar.Brand>

                <Nav className="mx-auto">
                    <ButtonGroup>
                        <Button
                            variant={viewMode === 'standard' ? 'primary' : 'outline-secondary'}
                            onClick={() => setViewMode('standard')}
                        >
                            Standard
                        </Button>
                        <Button
                            variant={viewMode === 'focus' ? 'primary' : 'outline-secondary'}
                            onClick={() => setViewMode('focus')}
                        >
                            Focus
                        </Button>
                        <Button
                            variant={viewMode === 'analysis' ? 'primary' : 'outline-secondary'}
                            onClick={() => setViewMode('analysis')}
                        >
                            Analysis
                        </Button>
                    </ButtonGroup>
                </Nav>

                <Button
                    variant="link"
                    className="text-decoration-none"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </Button>
            </div>
        </Navbar>
    );
};

export default Header;