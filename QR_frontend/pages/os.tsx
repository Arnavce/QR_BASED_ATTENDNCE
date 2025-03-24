import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OSAttendanceList = () => {
  const [sessionData, setSessionData] = useState<any[]>([]); // Store all attendance data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Error handling

  // Fetch attendance data when the component mounts
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response: any = await axios.get('http://localhost:3000/api/v1/session/os');
        setSessionData(response.data.os_attendance); // Set the attendance data correctly
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError('Failed to fetch attendance data'); // Handle error
        setLoading(false); // Set loading to false
      }
    };

    fetchSessionData();
  }, []); // Empty array ensures this effect runs only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#ebe2d4] h-screen text-[#2a1613]">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Operating System</h2>
        <h2 className="text-2xl font-bold mb-4">Total Attendance List</h2>

        {/* Display the attendance data in a table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-800">
            <thead>
              <tr>
                <th className="border-b px-4 py-3 text-left">Student ID</th>
                <th className="border-b px-4 py-3 text-left">Student Name</th>
                <th className="border-b px-1 py-3 text-left">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {/* Render each student's attendance data */}
              {sessionData.map((attendance: any, index: number) => (
                <tr key={index}>
                  <td className="border-b px-4 py-3">{attendance.studentId[0]}</td> {/* Display first studentId */}
                  <td className="border-b px-4 py-3">{attendance.student_name[0]}</td> {/* Display first student_name */}
                  <td className="border-b px-4 py-3">{attendance.attendence}</td> {/* Display attendance */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OSAttendanceList; // Export the component
