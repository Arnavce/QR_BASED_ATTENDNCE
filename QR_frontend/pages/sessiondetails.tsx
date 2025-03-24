import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to read the session_id from URL

const SessionDetails = () => {
  const { session_id } = useParams(); // Fetch session_id from URL
  const [sessionData, setSessionData] = useState<any>(null); // To store session data
  const [loading, setLoading] = useState<boolean>(true); // Loading state to show loading indicator

  // Extract date and time from session_id
  const sessionDate = session_id!.slice(0, 8); // First 8 digits (DDMMYYYY)
  const sessionStartTime = session_id!.slice(8, 12); // Next 4 digits (HHMM)
  const sessionEndTime = session_id!.slice(12, 16); // Next 4 digits (HHMM)

  // Format date and time
  const formattedDate = `${sessionDate.slice(0, 2)}/${sessionDate.slice(2, 4)}/${sessionDate.slice(4, 8)}`;
  const formattedStartTime = `${sessionStartTime.slice(0, 2)}:${sessionStartTime.slice(2, 4)}`;
  const formattedEndTime = `${sessionEndTime.slice(0, 2)}:${sessionEndTime.slice(2, 4)}`;

  // Fetch session data when the component mounts or when session_id changes
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/session/${session_id}`);
        //@ts-ignore
        setSessionData(response.data.session);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session data:', error);
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [session_id]);

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return <div>Error: Session data not found</div>;
  }

  return (
    <div className="bg-[#ebe2d4] h-screen text-[#2a1613]">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Session Details</h2>

        {/* Display the extracted date and time at the top */}
        <div className="mb-4">
          <div className="text-lg font-semibold">Date: {formattedDate}</div>
          <div className="text-lg font-semibold">Time: {formattedStartTime} - {formattedEndTime}</div>
        </div>

        {/* Check if sessionData is available */}
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
              {/* Render each studentId and student_name pair in a row */}
              {sessionData.studentId.map((studentId: string, index: number) => (
                <tr key={index}>
                  <td className="border-b px-4 py-3">{studentId}</td>
                  <td className="border-b px-4 py-3">{sessionData.student_name[index]}</td>
                  <td className="border-b px-4 py-3">{sessionData.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
