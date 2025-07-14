import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Image, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Printer,
  MessageSquare,
  RefreshCw,
  Trash2,
  Check,
  Menu,
  X
} from 'lucide-react';
import OrderAnalytics from './OrderAnalytics';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Define interfaces for order data structure
interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  preferredCommunication: "email" | "phone";
  artworkType: string;
  medium: string;
  size: string;
  colorPalette: string;
  imageUrls: string[];
  purpose: string;
  shippingAddress: ShippingAddress;
  additionalNotes?: string;
  newsletter: boolean;
  orderDate: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

const formatMongooseDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Define status options and colors
const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-500" },
  { value: "completed", label: "Completed", color: "bg-green-500" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-500" }
];

// Admin Dashboard Component
const AdminDashboard: React.FC = () => {
  // State management
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const ordersPerPage = 10;

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/orders');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter orders based on search term and status
  useEffect(() => {
    let result = orders;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.fullName.toLowerCase().includes(term) ||
        order.email.toLowerCase().includes(term) ||
        order._id.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, orders]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle status change
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        // Parse the error response
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update order status');
      }
      
      const data = await response.json();
      
      // Update orders state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, status: newStatus as Order['status'] } 
            : order
        )
      );
      
      // Update selected order if it's the one being modified
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus as Order['status'] });
      }
      
    } catch (err) {
      console.error('Error updating order status:', err);
      // Optionally show a user-friendly error message
      alert(err instanceof Error ? err.message : 'Failed to update order status');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status badge
  const getStatusBadge = (status: Order['status']) => {
    const statusOption = statusOptions.find(option => option.value === status);
    
    return (
      <Badge 
        className={`${statusOption?.color} text-white`}
      >
        {statusOption?.label || status}
      </Badge>
    );
  };

  // Handle order detail view
  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setImageIndex(0);
    setIsDetailOpen(true);
  };

  // Image navigation
  const nextImage = () => {
    if (selectedOrder && imageIndex < selectedOrder.imageUrls.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const prevImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <RefreshCw className="w-12 h-12 animate-spin text-purple-600 mb-4" />
          <p className="text-lg font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Calculate visible pagination buttons based on screen size
  const getVisiblePages = () => {
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const exportToExcel = () => {
    try {
      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(
        orders.map(order => ({
          'Order ID': order._id,
          'Full Name': order.fullName,
          'Email': order.email,
          'Phone': order.phone,
          'Artwork Type': order.artworkType,
          'Medium': order.medium,
          'Size': order.size,
          'Status': order.status,
          'Order Date': formatMongooseDate(order.createdAt || order.orderDate),
          'Purpose': order.purpose,
          'Color Palette': order.colorPalette
        }))
      );

      // Create a workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

      // Generate and download the Excel file
      XLSX.writeFile(workbook, `custom_orders_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  // Generate Order Report PDF
  const generateOrderReport = () => {
    try {
      const doc = new jsPDF();
      
      // Report Title
      doc.setFontSize(18);
      doc.text('Custom Orders Report', 14, 22);
      
      // Subtitle with date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Summary Statistics
      const statusSummary = statusOptions.map(status => ({
        status: status.label,
        count: orders.filter(order => order.status === status.value).length
      }));
      
      doc.setFontSize(12);
      doc.text('Order Status Summary', 14, 40);
      
      const summaryData = statusSummary.map(item => [
        item.status, 
        item.count.toString()
      ]);
      
      (doc as any).autoTable({
        startY: 45,
        head: [['Status', 'Count']],
        body: summaryData,
        theme: 'plain',
      });
      
      // Detailed Orders Table
      (doc as any).autoTable({
        startY: 80,
        head: [['Order ID', 'Customer', 'Artwork Type', 'Status', 'Date']],
        body: orders.map(order => [
          order._id.substring(0, 8),
          order.fullName,
          order.artworkType,
          statusOptions.find(s => s.value === order.status)?.label || order.status,
          formatMongooseDate(order.createdAt || order.orderDate)
        ]),
        theme: 'striped',
      });
      
      // Save the PDF
      doc.save(`orders_report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  // Print Shipping Label
  const printShippingLabel = (order: Order) => {
    try {
      const doc = new jsPDF();
      
      // Shipping Label Header
      doc.setFontSize(16);
      doc.text('Shipping Label', 14, 22);
      
      // Order Information
      doc.setFontSize(12);
      doc.text(`Order ID: ${order._id.substring(0, 8)}`, 14, 32);
      doc.text(`Date: ${formatMongooseDate(order.createdAt || order.orderDate)}`, 14, 40);
      
      // Recipient Details
      doc.setFontSize(14);
      doc.text('Shipping To:', 14, 55);
      
      doc.setFontSize(12);
      doc.text(order.fullName, 14, 65);
      doc.text(order.shippingAddress.addressLine1, 14, 72);
      if (order.shippingAddress.addressLine2) {
        doc.text(order.shippingAddress.addressLine2, 14, 79);
      }
      doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`, 14, order.shippingAddress.addressLine2 ? 86 : 79);
      doc.text(order.shippingAddress.country, 14, order.shippingAddress.addressLine2 ? 93 : 86);
      
      // Artwork Details
      doc.setFontSize(12);
      doc.text('Artwork Details:', 14, order.shippingAddress.addressLine2 ? 108 : 101);
      doc.text(`Type: ${order.artworkType}`, 14, order.shippingAddress.addressLine2 ? 115 : 108);
      doc.text(`Medium: ${order.medium}`, 14, order.shippingAddress.addressLine2 ? 122 : 115);
      doc.text(`Size: ${order.size}`, 14, order.shippingAddress.addressLine2 ? 129 : 122);
      
      // Save the PDF
      doc.save(`shipping_label_${order._id.substring(0, 8)}.pdf`);
    } catch (error) {
      console.error('Error printing shipping label:', error);
      alert('Failed to generate shipping label. Please try again.');
    }
  };

  return (
    <div className='relative'>
        {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu} />
        )}
        
        {/* Mobile Menu */}
        <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center p-4 border-b mt-4">
                <h2 className="font-bold text-lg m-0">Dashboard Menu</h2>
                <button onClick={toggleMobileMenu} className="p-1">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4 space-y-4">
            <div className="font-medium">Filter by Status</div>
            <div className="space-y-2">
                <button 
                className={`w-full text-left px-3 py-2 rounded-md ${statusFilter === 'all' ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'}`}
                onClick={() => {
                    setStatusFilter('all');
                    setIsMobileMenuOpen(false);
                }}
                >
                All Statuses
                </button>
                {statusOptions.map(status => (
                <button
                    key={status.value}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${statusFilter === status.value ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'}`}
                    onClick={() => {
                    setStatusFilter(status.value);
                    setIsMobileMenuOpen(false);
                    }}
                >
                    <div className={`w-3 h-3 rounded-full ${status.color} mr-2`} />
                    {status.label}
                </button>
                ))}
            </div>
            <div className="p-4 space-y-2">
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={generateOrderReport}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Report
              </Button>
              <Button 
                className="w-full" 
                onClick={exportToExcel}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            {/* Header with responsive layout */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-1">
                <button className="md:hidden mr-2" onClick={toggleMobileMenu}>
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl md:text-3xl font-bold m-0">Custom Orders Dashboard</h1>
            </div>
            <div className="flex gap-2 md:gap-4 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="hidden md:flex"
                onClick={generateOrderReport}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Report
              </Button>
              <Button 
                className="w-full md:w-auto hidden md:flex"
                onClick={exportToExcel}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
          {statusOptions.map((status) => {
            const count = orders.filter(order => order.status === status.value).length;
            return (
              <Card key={status.value}>
                <CardContent className="pt-4 md:pt-6 px-2 md:px-6">
                  <div className="flex justify-between items-start">
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-gray-500 truncate">{status.label} Orders</p>
                      <p className="text-xl md:text-3xl font-bold mt-1">{count}</p>
                    </div>
                    <Badge className={`${status.color} text-white text-xs md:text-sm`}>{count}</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      <OrderAnalytics orders={orders} />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name, email, or order ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={18} className="text-gray-500 hidden md:block" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${status.color} mr-2`} />
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

      {/* Orders Table */}
      <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Artwork</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <TableRow key={order._id} className="cursor-pointer hover:bg-gray-50" onClick={() => openOrderDetail(order)}>
                        <TableCell className="font-medium text-xs md:text-sm">
                          {order._id.toString().substring(0, 6)}...
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs md:text-sm">
                          {formatDate(order.createdAt || order.orderDate)}
                        </TableCell>
                        <TableCell className="max-w-[150px] md:max-w-none">
                          <div className="truncate">
                            <p className="font-medium text-xs md:text-sm truncate">{order.fullName}</p>
                            <p className="text-xs text-gray-500 truncate">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs md:text-sm">{order.artworkType}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${statusOptions.find(s => s.value === order.status)?.color}`}></div>
                            <span className="hidden sm:inline text-xs md:text-sm">
                              {statusOptions.find(s => s.value === order.status)?.label}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right p-0 pr-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {statusOptions.map((status) => (
                                <DropdownMenuItem 
                                  key={status.value}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(order._id.toString(), status.value);
                                  }}
                                  disabled={order.status === status.value}
                                >
                                  <div className="flex items-center">
                                    {order.status === status.value && <Check className="mr-2 h-4 w-4" />}
                                    <span className={order.status === status.value ? "font-medium" : ""}>
                                      Mark as {status.label}
                                    </span>
                                  </div>
                                </DropdownMenuItem>
                              ))}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`mailto:${order.email}`, '_blank');
                                }}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm('Are you sure you want to delete this order?')) {
                                    // Implement delete logic here
                                  }
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
            </p>
            <div className="flex items-center gap-1 order-1 sm:order-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {getVisiblePages().map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 text-xs"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

      {/* Order Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-3 sm:p-4 md:p-6">
                {selectedOrder && (
                <>
                    <DialogHeader>
                    <DialogTitle className="text-xl md:text-2xl">
                        Order Details: {selectedOrder._id.substring(0, 8)}...
                    </DialogTitle>
                    <DialogDescription>
                        Created on {formatDate(selectedOrder.createdAt || selectedOrder.orderDate)}
                    </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="overview" className="mt-4 md:mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="artwork">Artwork Details</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4 py-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                        <h3 className="text-lg font-medium">Order Status</h3>
                        <Select 
                            value={selectedOrder.status} 
                            onValueChange={(value) => handleStatusChange(selectedOrder._id, value)}
                        >
                            <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                            {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full ${status.color} mr-2`} />
                                    {status.label}
                                </div>
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                            <CardTitle className="text-base">Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="space-y-2">
                                <div>
                                <p className="font-semibold">{selectedOrder.fullName}</p>
                                </div>
                                <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-gray-500" />
                                <a href={`mailto:${selectedOrder.email}`} className="text-blue-600 hover:underline break-all">
                                    {selectedOrder.email}
                                </a>
                                </div>
                                {selectedOrder.phone && (
                                <div className="flex items-center text-sm">
                                    <Phone className="mr-2 h-4 w-4 text-gray-500" />
                                    <a href={`tel:${selectedOrder.phone}`} className="text-blue-600 hover:underline">
                                    {selectedOrder.phone}
                                    </a>
                                </div>
                                )}
                                <div className="flex items-center text-sm pt-2">
                                <p className="text-gray-500">
                                    Preferred contact method: <span className="font-medium">{selectedOrder.preferredCommunication}</span>
                                </p>
                                </div>
                                <div className="flex items-center text-sm">
                                <p className="text-gray-500">
                                    Newsletter: <span className="font-medium">{selectedOrder.newsletter ? 'Yes' : 'No'}</span>
                                </p>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader className="pb-2">
                            <CardTitle className="text-base">Artwork Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-sm text-gray-500">Type</p>
                                    <p className="font-medium">{selectedOrder.artworkType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Medium</p>
                                    <p className="font-medium">{selectedOrder.medium}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Size</p>
                                    <p className="font-medium">{selectedOrder.size}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Purpose</p>
                                    <p className="font-medium">{selectedOrder.purpose}</p>
                                </div>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        </div>
                        
                        {/* Reference Images */}
                        {selectedOrder.imageUrls && selectedOrder.imageUrls.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium mb-4">Reference Images</h3>
                            <div className="relative">
                            <div className="bg-gray-100 rounded-lg overflow-hidden">
                                <img 
                                src={selectedOrder.imageUrls[imageIndex]} 
                                alt={`Reference ${imageIndex + 1}`}
                                className="object-contain w-full h-48 md:h-64"
                                />
                            </div>
                            
                            <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none">
                                <Button 
                                variant="outline" 
                                size="icon" 
                                className="rounded-full bg-white shadow-md pointer-events-auto w-8 h-8"
                                onClick={prevImage}
                                disabled={imageIndex === 0}
                                >
                                <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button 
                                variant="outline" 
                                size="icon" 
                                className="rounded-full bg-white shadow-md pointer-events-auto w-8 h-8"
                                onClick={nextImage}
                                disabled={imageIndex === selectedOrder.imageUrls.length - 1}
                                >
                                <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            </div>
                            
                            <div className="flex gap-2 mt-3 overflow-x-auto py-2">
                            {selectedOrder.imageUrls.map((url, idx) => (
                                <button
                                key={idx}
                                onClick={() => setImageIndex(idx)}
                                className={`w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                                    imageIndex === idx ? 'border-purple-600' : 'border-transparent'
                                }`}
                                >
                                <img 
                                    src={url} 
                                    alt={`Thumbnail ${idx + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                                </button>
                            ))}
                            </div>
                        </div>
                        )}
                        
                        {/* Color Palette */}
                        <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Color Palette</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="break-words">{selectedOrder.colorPalette}</p>
                        </CardContent>
                        </Card>
                        
                        {/* Additional Notes */}
                        {selectedOrder.additionalNotes && (
                        <Card>
                            <CardHeader className="pb-2">
                            <CardTitle className="text-base">Additional Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="break-words">{selectedOrder.additionalNotes}</p>
                            </CardContent>
                        </Card>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="artwork" className="space-y-4 py-4">
                        <Card>
                        <CardHeader>
                            <CardTitle>Artwork Specifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6">
                            <div>
                                <h4 className="font-medium mb-2">Type & Medium</h4>
                                <dl className="space-y-2">
                                <div className="flex flex-wrap justify-between">
                                    <dt className="text-gray-500">Artwork Type:</dt>
                                    <dd className="font-medium">{selectedOrder.artworkType}</dd>
                                </div>
                                <div className="flex flex-wrap justify-between">
                                    <dt className="text-gray-500">Medium:</dt>
                                    <dd className="font-medium">{selectedOrder.medium}</dd>
                                </div>
                                <div className="flex flex-wrap justify-between">
                                    <dt className="text-gray-500">Size:</dt>
                                    <dd className="font-medium">{selectedOrder.size}</dd>
                                </div>
                                <div className="flex flex-wrap justify-between">
                                    <dt className="text-gray-500">Purpose:</dt>
                                    <dd className="font-medium">{selectedOrder.purpose}</dd>
                                </div>
                                </dl>
                            </div>
                            
                            <div>
                                <h4 className="font-medium mb-2">Color Specifications</h4>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="break-words">{selectedOrder.colorPalette}</p>
                                </div>
                            </div>
                            </div>
                            
                            <div className="mt-6">
                            <h4 className="font-medium mb-4">Reference Images</h4>
                            {selectedOrder.imageUrls && selectedOrder.imageUrls.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedOrder.imageUrls.map((url, idx) => (
                                    <a 
                                    key={idx} 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="block group"
                                    >
                                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                        <img 
                                        src={url} 
                                        alt={`Reference ${idx + 1}`} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                        <p className="text-white font-medium">View Full Size</p>
                                        </div>
                                    </div>
                                    </a>
                                ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No reference images provided</p>
                            )}
                            </div>
                        </CardContent>
                        </Card>
                        
                        {selectedOrder.additionalNotes && (
                        <Card>
                            <CardHeader>
                            <CardTitle>Additional Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="break-words">{selectedOrder.additionalNotes}</p>
                            </div>
                            </CardContent>
                        </Card>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="shipping" className="space-y-4 py-4">
                        <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-4">
                            <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                            <div className="break-words">
                                <p className="font-medium">{selectedOrder.fullName}</p>
                                <p>{selectedOrder.shippingAddress.addressLine1}</p>
                                {selectedOrder.shippingAddress.addressLine2 && (
                                <p>{selectedOrder.shippingAddress.addressLine2}</p>
                                )}
                                <p>
                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                                </p>
                                <p>{selectedOrder.shippingAddress.country}</p>
                            </div>
                            </div>
                            
                            <div className="mt-6">
                            <h4 className="font-medium mb-2">Contact Information</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                <a href={`mailto:${selectedOrder.email}`} className="text-blue-600 hover:underline break-all">
                                    {selectedOrder.email}
                                </a>
                                </div>
                                {selectedOrder.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                    <a href={`tel:${selectedOrder.phone}`} className="text-blue-600 hover:underline">
                                    {selectedOrder.phone}
                                    </a>
                                </div>
                                )}
                            </div>
                            </div>
                            
                            <div className="mt-6">
                            <h4 className="font-medium mb-2">Preferred Communication Method</h4>
                            <Badge className="bg-purple-100 text-purple-800">
                                {selectedOrder.preferredCommunication === "email" ? (
                                <Mail className="h-4 w-4 mr-1" />
                                ) : (
                                <Phone className="h-4 w-4 mr-1" />
                                )}
                                {selectedOrder.preferredCommunication}
                            </Badge>
                            </div>
                        </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Shipping Actions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Button 
                                className="w-full" 
                                onClick={() => selectedOrder && printShippingLabel(selectedOrder)}
                              >
                                <Printer className="mr-2 h-4 w-4" />
                                Print Shipping Label
                              </Button>
                              <Button variant="outline" className="w-full">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Contact Customer
                              </Button>
                            </div>
                        </CardContent>
                        </Card>
                    </TabsContent>
                    </Tabs>
                    
                    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDetailOpen(false)} className="w-full sm:w-auto">
                        Close
                    </Button>
                    {/* <Button className="w-full sm:w-auto">
                        Update Order
                    </Button> */}
                    </div>
                </>
                )}
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;