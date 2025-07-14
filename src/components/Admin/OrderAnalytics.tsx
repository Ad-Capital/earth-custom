import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Order {
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  artworkType: string;
  createdAt?: string;
  orderDate?: string;
}

interface OrderAnalyticsProps {
  orders: Order[];
}

interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface TypeData {
  name: string;
  count: number;
  color: string;
}

interface ChartDataItem {
  date: Date;
  name: string;
  new: number;
  in_progress: number;
  completed: number;
  cancelled: number;
  total: number;
}

type TimeRange = 'week' | 'month' | 'year';

const OrderAnalytics: React.FC<OrderAnalyticsProps> = ({ orders }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [typeData, setTypeData] = useState<TypeData[]>([]);

  // Colors for charts
  const COLORS: string[] = [
    '#0088FE', // Blue
    '#FFBB28', // Yellow
    '#00C49F', // Teal
    '#FF8042', // Orange
    '#8884D8', // Purple
    '#82CA9D', // Green
    '#FF6384', // Pink
    '#36A2EB', // Light Blue
    '#FFCE56', // Soft Yellow
    '#4BC0C0'  // Turquoise
  ];

  const STATUS_COLORS: Record<string, string> = {
    new: '#3B82F6', // blue
    in_progress: '#FBBF24', // yellow
    completed: '#10B981', // green
    cancelled: '#EF4444' // red
  };

  useEffect(() => {
    if (!orders || orders.length === 0) return;
    
    // Process orders for time-based chart
    generateTimeSeriesData(orders, timeRange);
    
    // Process orders for status pie chart
    const statusCounts = orders.reduce<Record<string, number>>((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    
    const statusChartData = Object.keys(statusCounts).map(status => ({
      name: status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: statusCounts[status],
      color: STATUS_COLORS[status] || '#999999'
    }));
    setStatusData(statusChartData);
    
    // Process orders for artwork type chart with unique colors
    const typeCounts = orders.reduce<Record<string, number>>((acc, order) => {
      acc[order.artworkType] = (acc[order.artworkType] || 0) + 1;
      return acc;
    }, {});
    
    const typeChartData = Object.keys(typeCounts)
      .map((type, index) => ({
        name: type,
        count: typeCounts[type],
        color: COLORS[index % COLORS.length] // Cycle through colors
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Get top 5 types
      
    setTypeData(typeChartData);
  }, [orders, timeRange]);

  const generateTimeSeriesData = (orders: Order[], range: TimeRange): void => {
    const now = new Date();
    let timeFormat: (d: Date) => string;
    let dateGroups: Date[];
    
    // Set date format and time units based on selected range
    switch(range) {
      case 'week':
        timeFormat = (d: Date) => {
          const day = d.getDay();
          return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
        };
        dateGroups = Array(7).fill(null).map((_, i) => {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          return d;
        }).reverse();
        break;
      case 'month':
        timeFormat = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
        dateGroups = Array(30).fill(null).map((_, i) => {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          return d;
        }).reverse();
        break;
      case 'year':
        timeFormat = (d: Date) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
        dateGroups = Array(12).fill(null).map((_, i) => {
          const d = new Date(now);
          d.setMonth(d.getMonth() - i);
          return d;
        }).reverse();
        break;
      default:
        timeFormat = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
        dateGroups = Array(7).fill(null).map((_, i) => {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          return d;
        }).reverse();
    }
    
    // Initialize counts
    const dateMap: ChartDataItem[] = dateGroups.map(date => ({
      date,
      name: timeFormat(date),
      new: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
      total: 0
    }));
    
    // Count orders by date and status
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt || order.orderDate || '');
      
      let groupIndex = -1;
      
      if (range === 'week') {
        // Group by day of week
        for (let i = 0; i < dateGroups.length; i++) {
          if (dateGroups[i].getDay() === orderDate.getDay() &&
              dateGroups[i].getDate() >= orderDate.getDate()) {
            groupIndex = i;
            break;  
          }
        }
      } else if (range === 'month') {
        // Group by day of month
        for (let i = 0; i < dateGroups.length; i++) {
          if (dateGroups[i].getDate() === orderDate.getDate() && 
              dateGroups[i].getMonth() === orderDate.getMonth()) {
            groupIndex = i;
            break;
          }
        }
      } else if (range === 'year') {
        // Group by month
        for (let i = 0; i < dateGroups.length; i++) {
          if (dateGroups[i].getMonth() === orderDate.getMonth()) {
            groupIndex = i;
            break;
          }
        }
      }
      
      if (groupIndex !== -1) {
        dateMap[groupIndex][order.status] += 1;
        dateMap[groupIndex].total += 1;
      }
    });
    
    setChartData(dateMap);
  };

  // Custom tooltip for status pie chart
  const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`Orders: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8 mb-12">
      <h2 className="text-2xl font-bold mb-6">Order Analytics</h2>
      
      <Tabs defaultValue="timeline" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="status">Status Distribution</TabsTrigger>
            <TabsTrigger value="types">Popular Artwork Types</TabsTrigger>
          </TabsList>
          
          <Select value={timeRange} onValueChange={(value: string) => setTimeRange(value as TimeRange)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <TabsContent value="timeline" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Volume</CardTitle>
              <CardDescription>
                Track order submissions over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line type="monotone" dataKey="new" stroke="#3B82F6" />
                  <Line type="monotone" dataKey="in_progress" stroke="#FBBF24" />
                  <Line type="monotone" dataKey="completed" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
              <CardDescription>
                Breakdown of orders by current status
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name: string; percent: number }) => 
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="types" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Artwork Types</CardTitle>
              <CardDescription>
                Most popular artwork types ordered
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={typeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count">
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderAnalytics;