import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import {getDeliveries } from "@/http/api";
import { capitalize } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const DeliveryPage = () => {
  // todo: add loading spinner, and error message
  // @ts-ignore

  const { data, isLoading, isError } = useQuery({
    queryKey: ["deliveries"],
    queryFn: getDeliveries,
    staleTime: 10000, // in Milli-seconds
  });
  

  return (
    <div>
      <Toaster/>

      <Card>
        <CardHeader>
            <div className="flex justify-between">
            <CardTitle>Deliveries</CardTitle>
          <Link to="/dashboard/delivery/create">
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add delivery</span>
          </Button>
        </Link>
            </div>
          
        </CardHeader>
        <CardContent>
        <Table>
    <TableHeader>
        <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Plan Start Date</TableHead>
            <TableHead>Plan End Date</TableHead>
            <TableHead>
                <span className="sr-only">Actions</span>
            </TableHead>
        </TableRow>
    </TableHeader>

    <TableBody>
        {data?.data?.map((item: any) => {
            return (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{capitalize(item.name)}</TableCell>
                    <TableCell className="font-medium">{item.effective_price}</TableCell>
                    <TableCell className="font-medium">
                        {new Date(item.plan_startdate * 1000).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                        {new Date(item.plan_enddate * 1000).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                <DropdownMenuItem>Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            );
        })}
    </TableBody>
</Table>


        </CardContent>
     
      </Card>
    </div>
  );
};

export default DeliveryPage;
