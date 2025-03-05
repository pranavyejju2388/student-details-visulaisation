import { Bar } from "recharts";

const TechnicalEventsPage = () => {
  const eventData = [
    { name: "Hackathon", value: 1 },
    { name: "Workshop", value: 1 },
    { name: "Competitions", value: 1 },
    { name: "TechnicalFest", value: 1 },
    { name: "Other", value: 1 }
  ];

  const achievementData = [
    { name: "First Place", value: 1 },
    { name: "Second Place", value: 1 },
    { name: "Third Place", value: 1 },
    { name: "Participation", value: 2 },
    { name: "Other", value: 0 }
  ];

  const eventDetails = [
    { event: "CodeFest 2023", host: "Tech Institute", category: "Hackathon", achievement: "First Place", date: "2023-05-15" },
    { event: "WebDev Workshop", host: "CS Department", category: "Workshop", achievement: "Participation", date: "2023-06-22" },
    { event: "Algorithm Challenge", host: "CodeChef", category: "Competitions", achievement: "Third Place", date: "2023-07-10" },
    { event: "Tathva Hackathon", host: "NIT Calicut", category: "TechnicalFest - Tathva", achievement: "Second Place", date: "2023-10-05" },
    { event: "ML Competition", host: "IIT Madras", category: "TechnicalFest of other colleges", achievement: "Participation", date: "2023-11-12" }
  ];

  return (
    <div className="flex">
      <aside className="w-1/5 bg-gray-100 p-4">
        <ul>
          <li className="p-2">Technical Events</li>
          <li className="p-2">Cultural Events</li>
          <li className="p-2">Sports Events</li>
        </ul>
      </aside>

      <main className="w-4/5 p-6">
        <h1 className="text-2xl font-bold">Technical Events Visualization</h1>

        <div className="bg-white rounded-lg shadow p-4 my-4">
          <div className="grid grid-cols-2 gap-4">
            <select className="p-2 border rounded-lg"><option>All Departments</option></select>
            <select className="p-2 border rounded-lg"><option>All Companies</option></select>
            <select className="p-2 border rounded-lg"><option>All Years</option></select>
            <select className="p-2 border rounded-lg"><option>All Event Types</option></select>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-gray-300 px-4 py-2 rounded-lg mr-2">Reset Filters</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Export Data</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold">Events by Category</h2>
            <Bar data={eventData} dataKey="value" fill="blue" />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold">Achievement Distribution</h2>
            <Bar data={achievementData} dataKey="value" fill="green" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mt-6">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Host</th>
                <th>Category</th>
                <th>Achievement</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {eventDetails.map((event, index) => (
                <tr key={index}>
                  <td>{event.event}</td>
                  <td>{event.host}</td>
                  <td>{event.category}</td>
                  <td>{event.achievement}</td>
                  <td>{event.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TechnicalEventsPage;
