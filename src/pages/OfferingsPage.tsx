import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { getOfferings, getUsers } from "@/http/api";
import { capitalize, formatCreatedAt } from "@/lib/utils";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const OfferingsPage = () => {
  // todo: add loading spinner, and error message
  // @ts-ignore

  const { data, isLoading, isError } = useQuery({
    queryKey: ["offerings"],
    queryFn: getOfferings,
    staleTime: 10000, // in Milli-seconds
  });


  return (
    <div>
      <Toaster/>

      <Card>
        <CardHeader>
            <div className="flex justify-between">
            <CardTitle>Offerings</CardTitle>
          <Link to="/dashboard/offerings/create">
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add Offering</span>
          </Button>
        </Link>
            </div>
          
        </CardHeader>
        <CardContent>
        <Table>
    <TableHeader>
        <TableRow>
            <TableHead>Name</TableHead>
            {/* <TableHead>Org. Id</TableHead> */}
            {/* <TableHead>Created At</TableHead> */}
            <TableHead>Default Price</TableHead>
            <TableHead>Default Effort</TableHead>
            <TableHead>Default Duration</TableHead>
            <TableHead>Default Cost</TableHead>
            <TableHead>Is Recurring</TableHead>
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
                    {/* <TableCell className="font-medium">{item.org_id}</TableCell> */}
                    {/* <TableCell className="font-medium">
                        {formatCreatedAt(item.created_at)}
                    </TableCell> */}
                    <TableCell className="font-medium">{item.default_price}</TableCell>
                    <TableCell className="font-medium">{item.default_effort}</TableCell>
                    <TableCell className="font-medium">{item.default_duration}</TableCell>
                    <TableCell className="font-medium">{item.default_cost}</TableCell>
                    <TableCell className="font-medium">
                        {item.is_recurring ? "Yes" : "No"}
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

export default OfferingsPage;
