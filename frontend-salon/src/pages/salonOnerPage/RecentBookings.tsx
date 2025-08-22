import { Card, Badge, Table } from 'react-bootstrap';

interface Booking {
  id: string;
  client: string;
  service: string;
  time: string;
  status: "Confirmed" | "Pending";
}

const mockBookings: Booking[] = [
  {
    id: "1",
    client: "Emma Johnson",
    service: "Hair Coloring",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: "2",
    client: "Michael Brown",
    service: "Haircut",
    time: "11:30 AM",
    status: "Pending"
  },
  {
    id: "3",
    client: "Olivia Martinez",
    service: "Manicure",
    time: "2:00 PM",
    status: "Confirmed"
  }
];

export const RecentBookings = () => {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Header className="bg-white border-bottom">
        <h6 className="mb-0 fw-bold text-dark">Recent Bookings</h6>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="border-0 py-3 px-4 fw-semibold text-muted">Client</th>
              <th className="border-0 py-3 px-4 fw-semibold text-muted">Service</th>
              <th className="border-0 py-3 px-4 fw-semibold text-muted">Time</th>
              <th className="border-0 py-3 px-4 fw-semibold text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-3 px-4 fw-medium text-dark border-0">{booking.client}</td>
                <td className="py-3 px-4 text-muted border-0">{booking.service}</td>
                <td className="py-3 px-4 text-muted border-0">{booking.time}</td>
                <td className="py-3 px-4 border-0">
                  <Badge 
                    bg={booking.status === "Confirmed" ? "success" : "warning"}
                    className="px-3 py-2"
                  >
                    {booking.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};