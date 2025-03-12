import React from 'react';

const Dashboard = () => {
    // Inline styles
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f4',
        },
        section: {
            backgroundColor: '#fff',
            marginBottom: '20px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            marginTop: '0',
            color: '#333',
        },
        checkboxList: {
            listStyle: 'none',
            padding: '0',
        },
        checkboxItem: {
            marginBottom: '10px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        tableHeader: {
            backgroundColor: '#f4f4f4',
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        tableCell: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Student Details System</h1>

            {/* Student Details Overview */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Student Details Overview</h2>
                <div>
                    <strong>Name:</strong>
                    <ul style={styles.checkboxList}>
                        <li style={styles.checkboxItem}><input type="checkbox" /> Start Date</li>
                    </ul>
                </div>
                <div>
                    <strong>Statement:</strong>
                    <ul style={styles.checkboxList}>
                        <li style={styles.checkboxItem}><input type="checkbox" /> Postgraduate</li>
                    </ul>
                </div>
                <div>
                    <strong>A Course</strong>
                </div>
            </div>

            {/* Year of Report */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Year of Report</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Year Name</th>
                            <th style={styles.tableHeader}>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.tableCell}>A (1) Year</td>
                            <td style={styles.tableCell}>A (2) Year</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Year/Year */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Year/Year</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> Start Date</li>
                </ul>
            </div>

            {/* Year/Student */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Year/Student</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 100% to complete</li>
                </ul>
            </div>

            {/* Placement Size */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Placement Size</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 100% to complete</li>
                </ul>
            </div>

            {/* Study Position */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Study Position</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 100% to complete</li>
                </ul>
            </div>

            {/* Academic Achievement */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Academic Achievement</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 100% to complete</li>
                </ul>
            </div>

            {/* Students by Department */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Students by Department</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 94</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 64</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 36</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 0</li>
                </ul>
            </div>

            {/* Students’ Performance */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Students’ Performance</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 150</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 200</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 0</li>
                </ul>
            </div>

            {/* Students’ Relationship Distribution */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Students’ Relationship Distribution</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 0</li>
                </ul>
            </div>

            {/* Students’ Participation by Activity */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Students’ Participation by Activity</h2>
                <ul style={styles.checkboxList}>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 300</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 100</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 80</li>
                    <li style={styles.checkboxItem}><input type="checkbox" /> 0</li>
                </ul>
            </div>

            {/* Student 25% */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Student 25%</h2>
                <p>Product 35%</p>
                <p>Product 25%</p>
            </div>

            {/* Notes */}
            <div style={styles.section}>
                <h2 style={styles.heading}>Notes</h2>
                <p>Reviews at GCAP & score + Professional</p>
                <p>Reviews at GPAS</p>
                <p>Reviews at GPAS</p>
            </div>
        </div>
    );
};

export default Dashboard;