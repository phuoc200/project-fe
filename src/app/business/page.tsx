import Layout from "../components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const businessActivities = [
  {
    id: 1,
    sector: "Educational",
    transaction: "Seminar Equipment",
    amount: 15000,
  },
  {
    id: 2,
    sector: "Medicine",
    transaction: "Antibiotics Supply",
    amount: 50000,
  },
  {
    id: 3,
    sector: "Machines",
    transaction: "MRI Scanner Purchase",
    amount: 500000,
  },
  {
    id: 4,
    sector: "Educational",
    transaction: "Training Materials",
    amount: 5000,
  },
];

const profitReport = [
  { id: 1, year: 2022, revenue: 1000000, expenses: 800000, profit: 200000 },
  { id: 2, year: 2023, revenue: 1200000, expenses: 900000, profit: 300000 },
  { id: 3, year: 2024, revenue: 1500000, expenses: 1100000, profit: 400000 },
];

export default function BusinessPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Business Application</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore business opportunities and partnerships with Providence
          Clinic, and view our financial reports.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Recent Business Activities
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sector</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Amount ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.sector}</TableCell>
                  <TableCell>{activity.transaction}</TableCell>
                  <TableCell>{activity.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Profit Report</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Revenue ($)</TableHead>
                <TableHead>Expenses ($)</TableHead>
                <TableHead>Profit ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profitReport.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.year}</TableCell>
                  <TableCell>{report.revenue.toLocaleString()}</TableCell>
                  <TableCell>{report.expenses.toLocaleString()}</TableCell>
                  <TableCell>{report.profit.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </Layout>
  );
}
